# JESTV SPORTS — System Architecture

**Version:** 1.0
**Last Updated:** 2026-03-19
**Status:** Pre-build reference document

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [High-Level Architecture Diagram](#2-high-level-architecture-diagram)
3. [Infrastructure & Deployment](#3-infrastructure--deployment)
4. [Subdomain Routing Architecture](#4-subdomain-routing-architecture)
5. [Application Layer — Next.js](#5-application-layer--nextjs)
6. [Content Layer — Sanity v3](#6-content-layer--sanity-v3)
7. [Data Layer — Supabase](#7-data-layer--supabase)
8. [Authentication & Authorization](#8-authentication--authorization)
9. [External Services](#9-external-services)
10. [Key Data Flows](#10-key-data-flows)
11. [API Contract Reference](#11-api-contract-reference)
12. [Database Schema](#12-database-schema)
13. [Sanity Schema Reference](#13-sanity-schema-reference)
14. [Security Model](#14-security-model)
15. [Performance Strategy](#15-performance-strategy)
16. [Environment Variables](#16-environment-variables)
17. [Monorepo File Structure](#17-monorepo-file-structure)

---

## 1. System Overview

JESTV SPORTS is a multi-author football blogging platform for Kenyan audiences. It is architected as a **single Next.js 15 application** serving three distinct surfaces via subdomain routing, backed by Sanity v3 as a headless content store and Supabase for transactional data and authentication.

### Three Surfaces

| Surface | Domain | Audience | Purpose |
|---|---|---|---|
| Public Site | `jestvsports.com` | All readers | Browse & read articles, comment, subscribe |
| Writer Dashboard | `author.jestvsports.com` | Invited writers | Write, publish, manage profile, view personal analytics |
| Admin Dashboard | `admin.jestvsports.com` | Platform admin | Manage writers, content, categories, comments, platform analytics |

### Core Design Principles

- **Single deployment** — one Vercel project, one Next.js app, three subdomains
- **Headless Sanity** — content store with Studio UI; writes can come from Studio or custom dashboards via the Sanity Mutations API
- **Supabase for everything transactional** — auth, comments, views, subscribers, invites
- **Server-first rendering** — article pages are fully server-rendered for SEO and performance
- **Mobile-first** — primary target is Android mobile on 3G/4G in Kenya

---

## 2. High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DNS / Vercel Edge                           │
│                                                                     │
│   jestvsports.com ──────┐                                           │
│   author.jestvsports.com─┼──► Single Vercel Deployment             │
│   admin.jestvsports.com ─┘         (Next.js 15)                    │
└──────────────────────────────────────┬──────────────────────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │     middleware.ts        │
                          │  (subdomain rewrite +    │
                          │   role-based auth guard) │
                          └──────┬──────┬──────┬────┘
                                 │      │      │
               ┌─────────────────┘      │      └─────────────────┐
               │                        │                         │
    ┌──────────▼──────────┐  ┌──────────▼──────────┐  ┌─────────▼───────────┐
    │    (site)/**        │  │    /writer/**        │  │    /admin/**        │
    │  Public Site        │  │  Writer Dashboard    │  │  Admin Dashboard    │
    │  jestvsports.com    │  │  author.jestv...com  │  │  admin.jestv...com  │
    └──────────┬──────────┘  └──────────┬───────────┘  └─────────┬───────────┘
               │                        │                         │
               └────────────────────────┼─────────────────────────┘
                                        │
              ┌─────────────────────────┼──────────────────────────┐
              │                         │                          │
   ┌──────────▼──────────┐   ┌──────────▼──────────┐   ┌──────────▼──────────┐
   │   Sanity v3 API     │   │  Supabase (Postgres) │   │  External Services  │
   │  (Content Store)    │   │  + Supabase Auth     │   │                     │
   │                     │   │                      │   │  • Resend (email)   │
   │  • Articles         │   │  • profiles          │   │  • Google AdSense   │
   │  • Authors          │   │  • comments          │   │  • @vercel/og       │
   │  • Categories       │   │  • subscribers       │   │                     │
   │  • Site Settings    │   │  • article_views     │   │                     │
   │                     │   │  • writer_invites    │   │                     │
   └─────────────────────┘   └──────────────────────┘   └─────────────────────┘
```

---

## 3. Infrastructure & Deployment

### Hosting

| Component | Provider | Notes |
|---|---|---|
| Next.js App | Vercel | Single project, all three subdomains |
| PostgreSQL Database | Supabase | Managed Postgres, connection pooling via Supabase |
| Auth | Supabase Auth | JWT-based, server-side session validation |
| Content Store | Sanity v3 (Sanity.io cloud) | API + Studio hosted |
| Email | Resend | Transactional — invites + subscription confirmations |
| Media / Image CDN | Sanity CDN | Article images, author photos |

### Vercel Configuration

```
Project: jestvs-sports
Framework: Next.js

Domains:
  jestvsports.com          → Production deployment
  author.jestvsports.com   → Same production deployment
  admin.jestvsports.com    → Same production deployment

Environment: Production
Node Version: 20.x
Build Command: next build
Output Directory: .next
```

### DNS Setup

```
Type    Name      Value
A       @         76.76.21.21   (Vercel)
CNAME   www       cname.vercel-dns.com
CNAME   author    cname.vercel-dns.com
CNAME   admin     cname.vercel-dns.com
```

---

## 4. Subdomain Routing Architecture

All routing is handled in a single `middleware.ts` at the root of the Next.js app. The middleware runs on every request at the Vercel Edge before it reaches any route handler.

### Routing Logic

```
Request arrives at Vercel Edge
        │
        ▼
middleware.ts reads host header
        │
        ├── host === "admin.jestvsports.com"
        │       │
        │       ├── No session → redirect to /login
        │       ├── role !== "admin" → redirect to /unauthorized
        │       └── role === "admin" → rewrite URL to /admin{pathname}
        │
        ├── host === "author.jestvsports.com"
        │       │
        │       ├── No session → redirect to /login
        │       ├── role === "reader" → redirect to /unauthorized
        │       └── role === "writer" | "admin" → rewrite URL to /writer{pathname}
        │
        └── host === "jestvsports.com"
                │
                └── Serve (site) route group as-is (public)
                    Session available but not required
```

### Middleware Implementation Notes

- Supabase session is validated server-side using `@supabase/ssr` cookie-based client
- Role extracted from `profiles.role` via a Supabase server client call
- Rewrites are transparent to the browser — URL in address bar stays as subdomain
- Login page lives at `jestvsports.com/login` — post-auth redirect uses role to determine destination subdomain
- Unauthorized page at `jestvsports.com/unauthorized`

---

## 5. Application Layer — Next.js

### Route Group Architecture

```
app/
│
├── middleware.ts                        # Subdomain rewrite + auth guard
│
├── (site)/                              # ← jestvsports.com (public)
│   ├── layout.tsx                       # Global nav, footer, AdSense <Script>
│   ├── page.tsx                         # Homepage: hero article + category strips
│   ├── [category]/
│   │   └── page.tsx                     # Category listing, paginated (ISR)
│   ├── article/
│   │   └── [slug]/
│   │       ├── page.tsx                 # Full article page (SSR)
│   │       └── loading.tsx              # Skeleton loader
│   └── author/
│       └── [slug]/
│           └── page.tsx                 # Public author profile (SSR)
│
├── writer/                              # ← author.jestvsports.com
│   ├── layout.tsx                       # Sidebar nav, writer session provider
│   ├── dashboard/
│   │   └── page.tsx                     # All platform articles feed
│   ├── articles/
│   │   ├── page.tsx                     # Writer's own articles list
│   │   ├── new/
│   │   │   └── page.tsx                 # Create article + portable text editor
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx             # Edit existing article
│   ├── profile/
│   │   └── page.tsx                     # Edit bio, photo, social links
│   ├── comments/
│   │   └── page.tsx                     # Comments on own articles
│   └── analytics/
│       └── page.tsx                     # Personal views chart + category breakdown
│
├── admin/                               # ← admin.jestvsports.com
│   ├── layout.tsx                       # Sidebar nav, admin session provider
│   ├── dashboard/
│   │   └── page.tsx                     # Platform KPIs + analytics charts
│   ├── writers/
│   │   └── page.tsx                     # Writer roster, invite, revoke
│   ├── articles/
│   │   ├── page.tsx                     # All platform articles
│   │   ├── new/
│   │   │   └── page.tsx                 # Admin creates article
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx             # Admin edits any article
│   ├── categories/
│   │   └── page.tsx                     # Category CRUD
│   ├── comments/
│   │   └── page.tsx                     # Platform-wide comment moderation
│   └── subscribers/
│       └── page.tsx                     # Subscriber count + export
│
├── (auth)/
│   ├── login/
│   │   └── page.tsx                     # Shared login (email + Google OAuth)
│   ├── register/
│   │   └── page.tsx                     # Invite-only writer registration
│   └── unauthorized/
│       └── page.tsx
│
└── api/
    ├── invite/
    │   └── route.ts                     # POST — generate + email invite token
    ├── comments/
    │   ├── route.ts                     # POST — create comment
    │   └── [id]/
    │       └── route.ts                 # PATCH — hide/unhide; DELETE — remove
    ├── subscribe/
    │   ├── route.ts                     # POST — subscribe email
    │   └── confirm/
    │       └── route.ts                 # GET — confirm subscription token
    ├── views/
    │   └── route.ts                     # POST — record article view
    ├── articles/
    │   ├── route.ts                     # POST — create article (Sanity mutation)
    │   └── [id]/
    │       └── route.ts                 # PATCH / DELETE — update or remove article
    ├── authors/
    │   └── [id]/
    │       └── route.ts                 # PATCH — update author profile
    ├── categories/
    │   ├── route.ts                     # POST — create category
    │   └── [id]/
    │       └── route.ts                 # PATCH / DELETE
    └── og/
        └── route.tsx                    # GET — dynamic OG image generation
```

### Rendering Strategy per Route

| Route | Strategy | Revalidation | Reason |
|---|---|---|---|
| Homepage | ISR | 60 seconds | High traffic, content changes frequently |
| Category listing | ISR | 60 seconds | New articles appear regularly |
| Article page | SSR | On-demand (tag-based) | Comments are dynamic; SEO critical |
| Author profile | ISR | 300 seconds | Profile changes are infrequent |
| Writer dashboard | CSR (client-side) | Real-time | Auth-gated, always fresh |
| Admin dashboard | CSR (client-side) | Real-time | Auth-gated, always fresh |
| Analytics pages | CSR (client-side) | Real-time | Live data from Supabase |

---

## 6. Content Layer — Sanity v3

Sanity is used as a **headless content API** with a Studio app available for editorial workflows. Content authoring can happen through Studio or the custom writer/admin dashboards, which call the Sanity Mutations API server-side.

### Content Access Pattern

```
Custom Dashboard (browser)
        │
        │  form submit / save / publish
        ▼
Next.js API Route (server)
        │
        │  Sanity write token (server-only env var)
        ▼
Sanity Mutations API
        │
        ▼
Sanity Content Lake (cloud)
        │
        │  GROQ queries (read)
        ▼
Next.js Server Components
        │
        ▼
Public Site Pages
```

### GROQ Query Patterns

```groq
// Homepage — featured + latest articles
*[_type == "article" && status == "published"] | order(publishedAt desc) {
  title, slug, excerpt, mainImage, publishedAt,
  "category": category->{ title, slug, color },
  "author": author->{ name, slug, photo }
}

// Article page — full content
*[_type == "article" && slug.current == $slug && status == "published"][0] {
  title, body, publishedAt, seoTitle, seoDescription,
  affiliateLinks,
  "category": category->{ title, slug },
  "author": author->{ name, slug, photo, bio, twitter, instagram, supabaseUserId }
}

// Author profile — writer articles
*[_type == "article" && author._ref == $authorId && status == "published"]
  | order(publishedAt desc) {
  title, slug, excerpt, mainImage, publishedAt,
  "category": category->{ title, slug }
}

// Writer dashboard — all articles (draft + published)
*[_type == "article"] | order(_updatedAt desc) {
  _id, title, slug, status, publishedAt, _updatedAt,
  "category": category->{ title, slug },
  "author": author->{ name, slug }
}
```

### Sanity Schemas Summary

```
article
  _id, title, slug, author (→author), category (→category),
  mainImage (image asset), excerpt, body (Portable Text),
  publishedAt, status ("draft" | "published"),
  seoTitle, seoDescription,
  affiliateLinks [{ label, url }]

author
  _id, name, slug, photo (image asset), bio,
  twitter, instagram, supabaseUserId (string)

category
  _id, title, slug, description, color (hex string)

siteSettings
  _id, siteName, logo, seoDescription, socialLinks
```

### Portable Text Editor Integration

```
@sanity/portable-text-editor  (standalone npm package)
        │
        │  Renders inside writer/admin article create/edit pages
        │  No dependency on Sanity Studio runtime
        ▼
Supported blocks:
  • Paragraph (default)
  • Heading H2, H3
  • Blockquote
  • Code block
  • Image (upload → Sanity Assets API → asset ref in PT array)

Supported marks:
  • Bold, Italic, Underline
  • Link (external URL)

On save/publish:
  Portable Text array  →  Next.js API Route  →  Sanity Mutations API
```

---

## 7. Data Layer — Supabase

Supabase handles all transactional data that is not content: auth, comments, views, subscribers, and invite tokens.

### Database Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Supabase PostgreSQL                   │
│                                                         │
│  auth.users (managed by Supabase Auth)                  │
│       │                                                 │
│       └──► profiles          ◄── role-based access      │
│                                                         │
│  article_views               ◄── analytics pipeline     │
│  comments                    ◄── community engagement   │
│  subscribers                 ◄── email list             │
│  writer_invites              ◄── onboarding flow        │
└─────────────────────────────────────────────────────────┘
```

### Row-Level Security (RLS) Policies

| Table | Policy | Rule |
|---|---|---|
| `profiles` | Read own profile | `auth.uid() = id` |
| `profiles` | Admin reads all | `role = 'admin'` |
| `comments` | Read visible comments | `is_hidden = false` |
| `comments` | Insert (guest or auth) | Always allowed |
| `comments` | Update (hide) | `auth.uid()` matches article author OR admin role |
| `article_views` | Insert | Always allowed (no auth required) |
| `article_views` | Read | Writer reads own; admin reads all |
| `subscribers` | Insert | Always allowed |
| `subscribers` | Read | Admin only |
| `writer_invites` | Read/Insert | Admin only |

### Supabase Client Instances

```typescript
// lib/supabase/server.ts   — Server Components, API Routes, Middleware
createServerClient(url, anonKey, { cookies })

// lib/supabase/client.ts   — Client Components (dashboards)
createBrowserClient(url, anonKey)
```

---

## 8. Authentication & Authorization

### User Roles

| Role | Created by | Can access |
|---|---|---|
| `reader` | Self-registration (optional) | Public site + authenticated commenting |
| `writer` | Admin invite only | `author.jestvsports.com` + public site |
| `admin` | Manual seed / migration script | `admin.jestvsports.com` + all routes |

### Auth Flow — Reader Registration

```
User visits jestvsports.com
        │
        ├── Optional: clicks "Login / Register"
        ▼
/login — Supabase Auth UI
  • Email + password
  • Google OAuth
        │
        ▼
Supabase creates auth.users record
        │
        ▼
Database trigger creates profiles row (role = "reader")
        │
        ▼
Redirect → jestvsports.com (reader stays on public site)
```

### Auth Flow — Writer Invite & Registration

```
Admin at admin.jestvsports.com/writers
        │
        │  Enters email → POST /api/invite
        ▼
Server generates UUID token
        │
        ├── Inserts into writer_invites { email, token, expires_at }
        │
        └── Resend sends branded invite email
                │
                │  Link: author.jestvsports.com/register?token=<uuid>
                ▼
Writer clicks link → /register page
        │
        │  Validates: token exists, not used, not expired
        ▼
Writer submits name + password
        │
        ├── Supabase Auth creates account
        ├── profiles row created (role = "writer")
        ├── writer_invites.used = true
        └── Sanity author document created via Mutations API
                │
                ▼
        Redirect → author.jestvsports.com/dashboard
```

### Auth Flow — Login & Role Redirect

```
POST /auth/login (Supabase Auth)
        │
        ▼
Session established (JWT in HTTP-only cookie)
        │
        ▼
Read profiles.role for user
        │
        ├── role = "admin"   → redirect admin.jestvsports.com/dashboard
        ├── role = "writer"  → redirect author.jestvsports.com/dashboard
        └── role = "reader"  → redirect jestvsports.com
```

### JWT & Session Strategy

- Supabase Auth issues JWTs stored in HTTP-only cookies via `@supabase/ssr`
- Middleware validates the JWT on every request to `/admin/**` and `/writer/**`
- JWT contains: `sub` (user ID), `email`, custom claim `role` (synced from `profiles.role`)
- Token refresh handled automatically by `@supabase/ssr` cookie client
- No client-side token storage (no localStorage)

---

## 9. External Services

### Resend (Email)

| Event | Template | Trigger |
|---|---|---|
| Writer invite | "You've been invited to write for JESTV SPORTS" | POST `/api/invite` |
| Subscription confirmation | "Confirm your JESTV SPORTS subscription" | POST `/api/subscribe` |

- All emails sent from `no-reply@jestvsports.com`
- Resend API key stored server-side only

### Google AdSense

- AdSense script loaded once in `(site)/layout.tsx` with `strategy="lazyOnload"`
- Ad units rendered via `<AdSenseUnit>` component (dynamically imported, client-only)
- Placement strategy:

```
Article page layout:
┌────────────────────────────────┐
│  Article Hero Image            │
├────────────────────────────────┤
│  [AD UNIT — below hero]        │  ← leaderboard / responsive
├──────────────────────┬─────────┤
│  Article Body        │ Sidebar │
│                      │ [AD]    │  ← desktop only
│  ... paragraph 1     │        │
│  ... paragraph 2     │        │
│  ... paragraph 3     │        │
│  [AD UNIT — mid]     │        │  ← in-article unit
│  ... paragraph 4+    │        │
├──────────────────────┴─────────┤
│  Comments section              │
├────────────────────────────────┤
│  [AD UNIT — footer]            │
└────────────────────────────────┘
```

### @vercel/og (Dynamic OG Images)

- Route: `GET /api/og?slug=<article-slug>`
- Fetches article from Sanity (title, category, author name)
- Returns `ImageResponse` — 1200×630px
- Used in `generateMetadata()` as `openGraph.images`

### Recharts (Analytics Charts)

- Installed client-side only in writer/admin analytics pages
- `LineChart` — article views over time (daily/weekly toggle)
- `BarChart` — views by category

---

## 10. Key Data Flows

### Flow 1 — Reader Views an Article

```
Browser requests jestvsports.com/article/kpl-round-10
        │
        ▼
Vercel Edge → middleware (public route, no auth check)
        │
        ▼
Next.js Server Component — article/[slug]/page.tsx
        │
        ├── GROQ query → Sanity API (article body, author, category)
        ├── Supabase query → comments (visible only)
        └── generateMetadata() → seoTitle, seoDescription, OG image URL
        │
        ▼
HTML streamed to browser
        │
        ▼
Client-side: POST /api/views { article_slug, category_slug, author_sanity_id }
        │
        ▼
Supabase inserts into article_views
```

### Flow 2 — Writer Creates & Publishes an Article

```
Writer at author.jestvsports.com/articles/new
        │
        │  Fills title, category, excerpt, SEO fields
        │  Types body in @sanity/portable-text-editor
        │  Uploads images → /api/upload → Sanity Assets API
        ▼
Clicks "Publish"
        │
        ▼
POST /api/articles
  Body: { title, slug, body (PT array), category, excerpt,
          mainImage, seoTitle, seoDescription, affiliateLinks,
          status: "published" }
        │
        ▼
API Route (server):
  1. Validates session (writer or admin role)
  2. Calls Sanity Mutations API with write token
  3. Creates article document in Sanity
        │
        ▼
Returns { _id, slug } to client
        │
        ▼
Client redirects to writer/articles (own articles list)
        │
        ▼
Public article live at jestvsports.com/article/<slug>
(ISR revalidates on next request or via on-demand revalidation tag)
```

### Flow 3 — Admin Invites a Writer

```
Admin at admin.jestvsports.com/writers
        │
        │  Enters email address
        ▼
POST /api/invite { email }
        │
        ▼
Server:
  1. Validates admin session
  2. Checks writer_invites — no active invite for this email
  3. Generates UUID token
  4. Inserts writer_invites { email, token, expires_at: now + 7 days }
  5. Calls Resend API — sends invite email with link
        │
        ▼
Response 200 { message: "Invite sent" }
        │
        ▼
Writer receives email → clicks link
        │
        ▼
author.jestvsports.com/register?token=<uuid>
  1. Validates token (exists, not used, not expired)
  2. Writer fills name + password
  3. Supabase Auth creates account
  4. profiles row inserted (role = "writer")
  5. writer_invites.used = true
  6. Sanity author document created via Mutations API
        │
        ▼
Redirect → author.jestvsports.com/dashboard
```

### Flow 4 — Analytics Data Pipeline

```
Article page loads in browser
        │
        ▼
POST /api/views
  { article_slug, category_slug, author_sanity_id }
        │
        ▼
Supabase INSERT into article_views
  { id, article_slug, category_slug, author_sanity_id, viewed_at }

                    ┌─────────────────────────────┐
                    │ Writer visits analytics page │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                    Supabase query: article_views
                    WHERE author_sanity_id = <writer>
                    GROUP BY date(viewed_at)          → LineChart data
                    GROUP BY category_slug            → BarChart data
                    COUNT(*)                          → Total views KPI

                    ┌─────────────────────────────┐
                    │ Admin visits analytics page  │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                    Same queries without author filter
                    + COUNT(subscribers WHERE confirmed)  → Subscribers KPI
                    + COUNT(articles WHERE published)     → Articles KPI
```

### Flow 5 — Guest Comment Submission

```
Reader on article page fills comment form
  { name, email, body } (no account required)
        │
        ▼
POST /api/comments
  { article_slug, guest_name, guest_email, body, parent_id? }
        │
        ▼
Server:
  1. Validates required fields
  2. Sanitizes body (strip HTML)
  3. Inserts into comments { article_slug, guest_name, guest_email,
                             body, is_hidden: false, created_at }
        │
        ▼
Response 201 { comment }
        │
        ▼
Client optimistically renders comment in thread
```

---

## 11. API Contract Reference

### POST `/api/invite`
**Auth:** admin role required

```
Request:  { email: string }
Response 200: { message: "Invite sent", token: string }
Response 409: { error: "Active invite already exists for this email" }
Response 403: { error: "Unauthorized" }
```

### POST `/api/articles`
**Auth:** writer or admin role required

```
Request: {
  title: string,
  slug: string,
  body: PortableTextBlock[],
  categoryId: string,         // Sanity category._id
  excerpt: string,
  mainImage: SanityImageRef,
  seoTitle?: string,
  seoDescription?: string,
  affiliateLinks?: { label: string, url: string }[],
  status: "draft" | "published"
}
Response 201: { _id: string, slug: string }
Response 400: { error: string }
Response 403: { error: "Unauthorized" }
```

### PATCH `/api/articles/[id]`
**Auth:** writer (own articles only) or admin (any article)

```
Request:  Partial article fields (same shape as POST)
Response 200: { _id: string }
Response 403: { error: "Unauthorized" }
Response 404: { error: "Article not found" }
```

### POST `/api/comments`
**Auth:** none required (guest allowed)

```
Request: {
  article_slug: string,
  body: string,
  guest_name?: string,        // required if not authenticated
  guest_email?: string,       // required if not authenticated
  parent_id?: string          // for replies
}
Response 201: { id: string, body: string, created_at: string }
Response 400: { error: string }
```

### PATCH `/api/comments/[id]`
**Auth:** article's author or admin

```
Request:  { is_hidden: boolean }
Response 200: { id: string, is_hidden: boolean }
Response 403: { error: "Unauthorized" }
Response 404: { error: "Comment not found" }
```

### POST `/api/subscribe`
**Auth:** none required

```
Request:  { email: string }
Response 200: { message: "Confirmation email sent" }
Response 409: { error: "Email already subscribed" }
```

### GET `/api/subscribe/confirm`
**Auth:** none (token in query param)

```
Query:    ?token=<uuid>
Response 200: { message: "Subscription confirmed" }
Response 400: { error: "Invalid or expired token" }
```

### POST `/api/views`
**Auth:** none required

```
Request: {
  article_slug: string,
  category_slug: string,
  author_sanity_id: string
}
Response 200: { recorded: true }
```

### GET `/api/og`
**Auth:** none required

```
Query:    ?slug=<article-slug>
Response: ImageResponse (1200x630 PNG)
```

---

## 12. Database Schema

```sql
-- Extends Supabase auth.users
CREATE TABLE profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username    TEXT,
  avatar_url  TEXT,
  role        TEXT NOT NULL DEFAULT 'reader'
                CHECK (role IN ('reader', 'writer', 'admin')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Fires on new Supabase Auth user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, avatar_url, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username', NULL, 'reader');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Article view events (analytics)
CREATE TABLE article_views (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug      TEXT NOT NULL,
  category_slug     TEXT,
  author_sanity_id  TEXT,
  viewed_at         TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_views_author ON article_views(author_sanity_id);
CREATE INDEX idx_views_slug ON article_views(article_slug);
CREATE INDEX idx_views_date ON article_views(viewed_at);

-- Article comments
CREATE TABLE comments (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug  TEXT NOT NULL,
  parent_id     UUID REFERENCES comments(id) ON DELETE CASCADE,
  guest_name    TEXT,
  guest_email   TEXT,
  user_id       UUID REFERENCES profiles(id) ON DELETE SET NULL,
  body          TEXT NOT NULL,
  is_hidden     BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT commenter_identity CHECK (
    guest_name IS NOT NULL OR user_id IS NOT NULL
  )
);
CREATE INDEX idx_comments_slug ON comments(article_slug);
CREATE INDEX idx_comments_parent ON comments(parent_id);

-- Email subscriptions
CREATE TABLE subscribers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  confirmed   BOOLEAN DEFAULT FALSE,
  token       TEXT UNIQUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Writer invite tokens
CREATE TABLE writer_invites (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL,
  token       TEXT UNIQUE NOT NULL,
  used        BOOLEAN DEFAULT FALSE,
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_invites_token ON writer_invites(token);
```

---

## 13. Sanity Schema Reference

### `article`

```typescript
{
  name: 'article',
  type: 'document',
  fields: [
    { name: 'title',          type: 'string',    required: true },
    { name: 'slug',           type: 'slug',      source: 'title', required: true },
    { name: 'author',         type: 'reference', to: [{ type: 'author' }], required: true },
    { name: 'category',       type: 'reference', to: [{ type: 'category' }], required: true },
    { name: 'mainImage',      type: 'image',     options: { hotspot: true } },
    { name: 'excerpt',        type: 'text',      rows: 3 },
    { name: 'body',           type: 'array',     of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'publishedAt',    type: 'datetime' },
    { name: 'status',         type: 'string',    options: { list: ['draft', 'published'] } },
    { name: 'seoTitle',       type: 'string' },
    { name: 'seoDescription', type: 'text', rows: 2 },
    {
      name: 'affiliateLinks',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'url',   type: 'url' }
        ]
      }]
    }
  ]
}
```

### `author`

```typescript
{
  name: 'author',
  type: 'document',
  fields: [
    { name: 'name',           type: 'string',   required: true },
    { name: 'slug',           type: 'slug',     source: 'name', required: true },
    { name: 'photo',          type: 'image',    options: { hotspot: true } },
    { name: 'bio',            type: 'text',     rows: 4 },
    { name: 'twitter',        type: 'string' },
    { name: 'instagram',      type: 'string' },
    { name: 'supabaseUserId', type: 'string' }  // links to profiles.id
  ]
}
```

### `category`

```typescript
{
  name: 'category',
  type: 'document',
  fields: [
    { name: 'title',       type: 'string', required: true },
    { name: 'slug',        type: 'slug',   source: 'title', required: true },
    { name: 'description', type: 'text' },
    { name: 'color',       type: 'string' }  // hex color for UI badge
  ]
}
```

### `siteSettings`

```typescript
{
  name: 'siteSettings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],  // singleton — no create/delete
  fields: [
    { name: 'siteName',       type: 'string' },
    { name: 'logo',           type: 'image' },
    { name: 'seoDescription', type: 'text' },
    { name: 'socialLinks',    type: 'object', fields: [
      { name: 'twitter',   type: 'string' },
      { name: 'instagram', type: 'string' },
      { name: 'facebook',  type: 'string' }
    ]}
  ]
}
```

---

## 14. Security Model

### Threat Surface & Mitigations

| Threat | Mitigation |
|---|---|
| Unauthorized dashboard access | Middleware role guard on every request; HTTP-only cookies; no client-side token storage |
| Writer accesses another writer's articles | Sanity mutation API routes verify `author_sanity_id` matches session user's Sanity ID before allowing write |
| Admin impersonation via subdomain | JWT role claim validated server-side on every middleware pass; role stored in Supabase, not client |
| Invite token brute force | UUID v4 tokens (122 bits of entropy); single-use; 7-day expiry; rate limit on `/api/invite` |
| Comment spam / injection | Body sanitized server-side before insert; HTML stripped; guest email not exposed publicly |
| Sanity write token leak | Token stored in Vercel environment variable; only accessed in server-side API routes; never sent to client |
| View count inflation | No authentication required for views (intentional for reach); mitigation deferred to post-launch (IP-based dedup or session dedup) |
| Email subscription abuse | Double opt-in (confirmation token required); unique constraint on email |
| Open redirect after login | Post-auth redirect destination hardcoded by role; no user-controlled redirect URL |

### Environment Variable Security

- All secret keys (Sanity write token, Resend API key, Supabase service role key) are **server-only** — never prefixed with `NEXT_PUBLIC_`
- Public vars (Supabase anon key, Sanity project ID) are safe to expose client-side
- Vercel environment variables encrypted at rest

---

## 15. Performance Strategy

### Rendering & Caching

- Article pages: SSR with `next/cache` tag-based revalidation — revalidate tag `article-<slug>` on publish/update
- Category + homepage: ISR with 60-second revalidation
- Sanity CDN caches GROQ query responses automatically

### Image Optimization

- All images served via Sanity CDN + `next/image`
- Format: WebP (auto-converted by Sanity)
- `sizes` attribute set per placement (hero, card, avatar)
- `loading="lazy"` on all below-fold images
- Author photos: 80×80px max, avatar crop

### Bundle Strategy

- `@sanity/portable-text-editor` — dynamically imported only on write pages (not shipped to public site)
- Recharts — dynamically imported only on analytics pages
- AdSense — `strategy="lazyOnload"` (never blocks render)
- `next/font` — system font fallback preferred; custom fonts loaded with `display: swap`

### Mobile Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Mobile Performance | ≥ 85 |
| Largest Contentful Paint (LCP) | < 2.5s on 4G |
| Cumulative Layout Shift (CLS) | < 0.1 |
| First Input Delay (FID) | < 100ms |
| Bundle size (initial JS) | < 150kB gzipped |

---

## 16. Environment Variables

```bash
# ─── Supabase ───────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>       # server-only

# ─── Sanity ─────────────────────────────────────────────
NEXT_PUBLIC_SANITY_PROJECT_ID=<project-id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<write-token>                     # server-only

# ─── Resend ─────────────────────────────────────────────
RESEND_API_KEY=<api-key>                           # server-only
RESEND_FROM_EMAIL=no-reply@jestvsports.com

# ─── App ────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://jestvsports.com
NEXT_PUBLIC_AUTHOR_URL=https://author.jestvsports.com
NEXT_PUBLIC_ADMIN_URL=https://admin.jestvsports.com

# ─── Google AdSense ─────────────────────────────────────
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-<id>
```

---

## 17. Monorepo File Structure

```
jestvs-sports/
│
├── app/                              # Next.js App Router
│   ├── (site)/                       # Public site
│   ├── (auth)/                       # Login, register, unauthorized
│   ├── writer/                       # Writer dashboard
│   ├── admin/                        # Admin dashboard
│   ├── api/                          # API routes
│   └── middleware.ts                 # Subdomain routing + auth guard
│
├── components/
│   ├── site/                         # Public site components
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleBody.tsx           # Portable Text renderer
│   │   ├── CommentForm.tsx
│   │   ├── CommentThread.tsx
│   │   ├── CategoryBadge.tsx
│   │   └── SubscribeForm.tsx
│   ├── editor/                       # Portable Text editor (dashboards only)
│   │   ├── ArticleEditor.tsx
│   │   └── ImageUploadButton.tsx
│   ├── dashboard/                    # Shared dashboard UI
│   │   ├── Sidebar.tsx
│   │   ├── ArticleTable.tsx
│   │   ├── AnalyticsCard.tsx
│   │   ├── ViewsLineChart.tsx
│   │   └── CategoryBarChart.tsx
│   ├── ads/
│   │   └── AdSenseUnit.tsx           # Lazy-loaded ad unit
│   └── ui/                           # Base design system
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       ├── Avatar.tsx
│       └── Modal.tsx
│
├── sanity/
│   ├── schemaTypes/
│   │   ├── article.ts
│   │   ├── author.ts
│   │   ├── category.ts
│   │   └── siteSettings.ts
│   ├── lib/
│   │   ├── client.ts                 # @sanity/client (read)
│   │   ├── mutations.ts              # Sanity Mutations API helpers (write)
│   │   └── queries.ts                # GROQ query definitions
│   └── sanity.config.ts              # Sanity project config (Studio + API)
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Browser client
│   │   └── server.ts                 # Server client (SSR + API routes)
│   ├── resend.ts                     # Resend email client
│   ├── analytics.ts                  # Supabase analytics query helpers
│   └── utils.ts                      # Shared utilities
│
├── types/
│   ├── article.ts                    # Article, Author, Category types
│   ├── supabase.ts                   # Supabase generated types
│   └── api.ts                        # API request/response types
│
├── public/
│   ├── logo.svg
│   └── og-default.png
│
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

*This document is the authoritative system architecture reference for JESTV SPORTS v1.0. It should be updated whenever a significant architectural decision changes.*
