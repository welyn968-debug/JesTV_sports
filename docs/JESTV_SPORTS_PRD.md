# PRD: JESTV SPORTS — Multi-Author Football Blogging Platform

**Version:** 2.0
**Last Updated:** 2026-03-19

---

## Problem Statement

There is no dedicated, high-quality football blogging platform serving the Kenyan audience that combines local league coverage (KPL) with international football content. Existing global platforms (BBC Sport, Goal.com) don't prioritize Kenyan football, while local alternatives lack editorial quality, writer management infrastructure, and monetization tooling needed to build a sustainable content business.

Writers who want to cover football for a Kenyan audience have no dedicated home to publish, build an audience, or track their performance. Admins of such platforms have no unified tool to manage writers, content, categories, and community. Readers have no single trusted destination for both local and global football content.

---

## Solution

Build **JESTV SPORTS** — a mobile-first, multi-author football blogging platform targeting Kenyan readers. The platform consists of three surfaces:

1. **Public Site** (`jestvsports.com`) — article reading, guest commenting, email subscriptions
2. **Writer Dashboard** (`author.jestvsports.com`) — custom CMS for invited writers: write, publish, manage profile, track personal analytics
3. **Admin Dashboard** (`admin.jestvsports.com`) — full platform management: writers, content, categories, comments, platform-wide analytics

Both dashboards are fully custom-built — no Sanity Studio. Sanity v3 remains the content store; all reads and writes go through the Sanity API. Auth is unified under Supabase Auth with role-based access control.

**Tech Stack:**
- **Frontend + Dashboards:** Next.js 15 (App Router, TypeScript) — single app, three surfaces
- **Content Store:** Sanity v3 (headless API only, no Studio)
- **Rich Text Editor:** `@sanity/portable-text-editor` (embedded in custom UI)
- **Database & Auth:** Supabase (PostgreSQL + Supabase Auth)
- **Subdomain Routing:** Vercel middleware rewrites (single Next.js app, multiple subdomains)
- **Email:** Resend (invites, subscriptions)
- **Deployment:** Vercel
- **Ads:** Google AdSense
- **Analytics Charts:** Recharts
- **SEO:** Next.js Metadata API + `@vercel/og` (dynamic OG images)

---

## User Stories

### Reader (jestvsports.com)
1. As a reader, I want to browse the homepage and see featured and latest football articles, so that I can quickly find content worth reading.
2. As a reader, I want to filter articles by category (Match Reports, Transfers, Opinion, Interviews, Fixtures), so that I can find the type of content I'm interested in.
3. As a reader, I want to read a full article with a clean, mobile-optimized layout, so that I can enjoy content on my phone without frustration.
4. As a reader, I want to see auto-generated SEO meta and OG preview images when sharing articles on WhatsApp/Twitter, so that links look professional and clickable.
5. As a reader, I want to subscribe to the JESTV SPORTS email list, so that I receive new article notifications in my inbox.
6. As a reader, I want to confirm my email subscription via a link sent to my inbox, so that I only receive emails I explicitly opted into.
7. As a reader, I want to leave a comment on an article as a guest (name + email only), so that I can engage without needing to create an account.
8. As a reader, I want to create an optional account with email/password or Google OAuth, so that my commenting identity is persistent across sessions.
9. As a reader, I want to reply to other comments in a thread, so that I can engage in discussions.
10. As a reader, I want to view an author's profile page with their bio, social links, and article history, so that I can follow writers I like.
11. As a reader, I want articles to load fast on 3G/4G mobile networks, so that I don't abandon pages due to slow load times.
12. As a reader, I want to see contextually placed affiliate links within articles, so that I can find relevant products or services mentioned in content.

### Writer (author.jestvsports.com)
13. As an invited writer, I want to receive an invite link via email from the admin, so that I can register and gain access to the writer dashboard.
14. As a writer, I want to log in to the writer dashboard using my Supabase account, so that I have a secure, branded publishing experience.
15. As a writer, I want to see all platform articles (mine and others) in a feed, so that I understand what content is being published across the platform.
16. As a writer, I want to create a new article using a rich portable-text editor with headings, images, links, and embeds, so that I can produce high-quality formatted content.
17. As a writer, I want to assign a category, featured image, excerpt, and SEO fields to my article, so that each post is discoverable and well-presented.
18. As a writer, I want to add affiliate links to my articles as structured fields, so that they are tracked and rendered consistently on the public site.
19. As a writer, I want to save articles as drafts and return to edit them before publishing, so that I'm not forced to publish incomplete work.
20. As a writer, I want to edit or delete my own published articles, so that I can correct errors or remove outdated content.
21. As a writer, I want to publish my articles directly without editorial review, so that I can work independently and efficiently.
22. As a writer, I want to manage my own profile (bio, photo, social links), so that my author page on the public site is always current.
23. As a writer, I want to moderate (hide) comments on my own articles from the dashboard, so that I can manage discussions without relying on the admin.
24. As a writer, I want to see my personal analytics — total article views and views broken down by category — so that I can understand what content resonates with readers.
25. As a writer, I want a chart of my article view trends over time, so that I can track my growth on the platform.

### Admin (admin.jestvsports.com)
26. As an admin, I want to log in to a dedicated admin dashboard, so that I have a single place to manage the entire platform.
27. As an admin, I want to generate and send writer invite links, so that I can onboard new writers without a public signup flow.
28. As an admin, I want to revoke or deactivate a writer's publishing access, so that I can remove bad actors without deleting their content.
29. As an admin, I want to see all writers with their status (active/revoked) and article count, so that I have full visibility over the author roster.
30. As an admin, I want to create, edit, and delete content categories, so that the editorial taxonomy stays consistent.
31. As an admin, I want to view and moderate all comments across the platform (hide or delete), so that I can maintain community standards.
32. As an admin, I want to create, edit, and publish articles myself, so that I can contribute content or fix errors when needed.
33. As an admin, I want to see platform-wide analytics — total article views and traffic broken down by category — so that I understand what drives readership.
34. As an admin, I want analytics displayed as simple charts (line, bar) in a TikTok-style creator dashboard, so that I can read data at a glance.
35. As an admin, I want to see the total confirmed subscriber count on the analytics dashboard, so that I can track email list growth.
36. As an admin, I want all admin routes protected so that only users with the admin role can access them.
37. As an admin, I want `admin.jestvsports.com` to route seamlessly to the admin section of the app, so that the dashboard feels like a standalone product.
38. As an admin, I want `author.jestvsports.com` to route to the writer dashboard, so that writers have a clean, branded authoring experience.

---

## Implementation Decisions

### 1. Subdomain Routing — Vercel Middleware
- Single Next.js 15 app handles all three surfaces
- `middleware.ts` inspects the `host` request header:
  - `admin.jestvsports.com` → rewrites to `/admin/**`
  - `author.jestvsports.com` → rewrites to `/writer/**`
  - `jestvsports.com` → serves `/(site)/**` as normal
- Vercel project configured with all three subdomains on the same deployment
- Middleware enforces role-based auth guards per rewrite target:
  - `/admin/**` → requires `role = admin`
  - `/writer/**` → requires `role = writer` or `role = admin`
  - `/(site)/**` → public (optional session for authenticated commenters)

### 2. Route Architecture
```
app/
├── (site)/                  # jestvsports.com — public
│   ├── page.tsx             # Homepage (hero + category strips + ads)
│   ├── [category]/page.tsx  # Category listing (paginated)
│   ├── article/[slug]/      # Full article + comments + ads
│   ├── author/[slug]/       # Public author profile + articles
│   └── layout.tsx           # Nav, footer, AdSense script
│
├── writer/                  # author.jestvsports.com
│   ├── dashboard/           # All platform articles feed
│   ├── articles/            # Writer's own articles list
│   ├── articles/new/        # Create article (portable text editor)
│   ├── articles/[id]/edit/  # Edit article
│   ├── profile/             # Manage bio, photo, social links
│   ├── comments/            # Moderate own article comments
│   ├── analytics/           # Personal views + category chart
│   └── layout.tsx           # Sidebar nav, writer session context
│
├── admin/                   # admin.jestvsports.com
│   ├── dashboard/           # Platform analytics (KPIs + charts)
│   ├── writers/             # List, invite, revoke writers
│   ├── articles/            # All platform articles
│   ├── articles/new/        # Admin creates article
│   ├── articles/[id]/edit/  # Admin edits any article
│   ├── categories/          # Manage categories (CRUD)
│   ├── comments/            # Platform-wide comment moderation
│   ├── subscribers/         # Subscriber count + export
│   └── layout.tsx           # Sidebar nav, admin session context
│
├── api/
│   ├── invite/route.ts          # Generate + email invite token
│   ├── comments/route.ts        # Create comment
│   ├── comments/[id]/route.ts   # PATCH hide/unhide
│   ├── subscribe/route.ts       # Subscribe + confirm
│   ├── views/route.ts           # Record article view
│   └── og/route.tsx             # Dynamic OG image
│
└── middleware.ts                # Subdomain rewrite + auth guard
```

### 3. Content Store — Sanity API (Headless)
- Sanity v3 used as headless API only — no Studio, no `/studio` route
- All reads: `@sanity/client` GROQ queries, server-side in Next.js Server Components
- All writes: Sanity Mutations API called from Next.js API routes (server-side only)
- Write token stored in environment variables, never exposed to client
- **Schemas:** `article`, `author`, `category`, `siteSettings`
- **Article fields:** title, slug, author (reference), category (reference), mainImage, excerpt, body (Portable Text array), publishedAt, status (`draft` | `published`), seoTitle, seoDescription, affiliateLinks (array of `{ label, url }`)
- **Author fields:** name, slug, photo, bio, twitter, instagram, supabaseUserId
- **Category fields:** title, slug, description, color (for UI badges)

### 4. Rich Text Editor — `@sanity/portable-text-editor`
- Installed as a standalone React package, rendered inside the custom write UI
- No dependency on Sanity Studio — runs entirely within the Next.js app
- Supported block types: paragraph, H2, H3, blockquote, code block
- Supported marks: bold, italic, underline, link
- Image upload: client calls a Next.js API route which proxies to Sanity Assets API → returns asset reference inserted into the Portable Text array
- On save/publish: the Portable Text array is sent to Sanity via the Mutations API

### 5. Authentication & Role System — Supabase
- Supabase Auth is the single auth system for all user types
- `profiles.role` column: `reader` | `writer` | `admin`
- Login page shared; post-login redirect based on role:
  - `admin` → `admin.jestvsports.com/dashboard`
  - `writer` → `author.jestvsports.com/dashboard`
  - `reader` → `jestvsports.com`
- Middleware reads the Supabase session JWT from cookies, extracts role claim, enforces access
- Admin account seeded manually or via one-time migration script

### 6. Writer Invite System
- Admin fills email in `/admin/writers` → POST `/api/invite`
- Server: generates UUID token → inserts into `writer_invites` → sends branded email via Resend
- Invite link: `author.jestvsports.com/register?token=<token>`
- Writer clicks link → token validated (not used, not expired) → Supabase account created → `profiles.role` set to `writer` → Sanity `author` document created via Mutations API
- Tokens: single-use, 7-day expiry

### 7. Analytics System
- **View ingestion:** Article page (`/(site)/article/[slug]`) fires POST to `/api/views` on load
- Payload: `{ article_slug, category_slug, author_sanity_id }`
- No PII — no IP address, no user ID stored
- `article_views` table: `id, article_slug, category_slug, author_sanity_id, viewed_at`
- **Writer analytics queries:**
  - Total views: COUNT WHERE `author_sanity_id = <writer>`
  - Views over time: GROUP BY DATE(`viewed_at`) WHERE `author_sanity_id = <writer>`
  - Category breakdown: GROUP BY `category_slug` WHERE `author_sanity_id = <writer>`
- **Admin analytics queries:** same without author filter = platform totals
- **Charts:** Recharts — `LineChart` for views over time, `BarChart` for category traffic
- **Dashboard layout:** KPI cards at top (total views, total subscribers, total articles), charts below — inspired by TikTok creator analytics

### 8. Comments System — Supabase
- `comments`: id, article_slug, parent_id (nullable), guest_name, guest_email, user_id (nullable), body, is_hidden, created_at
- Guest comments: name + email required, no account needed
- Authenticated comments: name from `profiles`
- Comments are live immediately (no approval queue)
- Threaded replies: one level deep (parent_id references top-level comment)
- Hide permission: article author (matched via `author.supabaseUserId`) OR admin role
- PATCH `/api/comments/[id]` with `{ is_hidden: true/false }` — server checks permission before update

### 9. SEO & Performance
- `generateMetadata()` on each article page pulls `seoTitle` + `seoDescription` from Sanity
- Dynamic OG image at `/api/og?slug=...` using `@vercel/og` `ImageResponse`
- OG card renders: article title, category badge, JESTV SPORTS logo
- JSON-LD `Article` structured data on every article page
- All images: Sanity CDN + `next/image` (WebP, responsive `sizes`, lazy loading)
- AdSense: `<Script strategy="lazyOnload">` — never blocks render
- Ad placements: below hero image, mid-article, sidebar (desktop only), footer
- Target: Lighthouse mobile performance ≥ 85

---

## Supabase Schema

```sql
profiles (
  id          uuid references auth.users primary key,
  username    text,
  avatar_url  text,
  role        text default 'reader',   -- 'reader' | 'writer' | 'admin'
  created_at  timestamptz default now()
)

article_views (
  id                uuid primary key default gen_random_uuid(),
  article_slug      text not null,
  category_slug     text,
  author_sanity_id  text,              -- Sanity author._id
  viewed_at         timestamptz default now()
)

comments (
  id            uuid primary key default gen_random_uuid(),
  article_slug  text not null,
  parent_id     uuid references comments(id),
  guest_name    text,
  guest_email   text,
  user_id       uuid references profiles(id),
  body          text not null,
  is_hidden     boolean default false,
  created_at    timestamptz default now()
)

subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  confirmed   boolean default false,
  token       text unique,
  created_at  timestamptz default now()
)

writer_invites (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  token       text unique not null,
  used        boolean default false,
  expires_at  timestamptz,
  created_at  timestamptz default now()
)
```

---

## Testing Decisions

**Philosophy:** Test external behavior only — what a module does, not how it does it internally. Tests must survive implementation refactors without breaking. All tests should be fast, isolated, and deterministic.

| Module | Test Type | What to Test |
|---|---|---|
| Middleware (subdomain rewrite + role guard) | Unit | Admin host rejects writer/reader role; writer host rejects reader role; correct internal rewrites applied per host header; unauthenticated requests redirected to login |
| Writer Invite API | Integration | Token generated and stored; invite email triggered via Resend; duplicate email returns 409; expired token rejected at registration; used token rejected at registration |
| Registration flow (invite → account) | Integration | Valid token → Supabase account created → role set to writer → Sanity author document created via mutation |
| Comments API (create) | Integration | Guest comment stored with name + email; authenticated comment stores user_id; missing required fields returns 400 |
| Comments API (moderation) | Integration | Article author can hide own article's comment; admin can hide any comment; reader gets 403; toggle works both directions |
| Subscribe API | Integration | New email inserts unconfirmed row; confirmation email sent; GET confirm validates token and sets confirmed=true; duplicate email returns 409 |
| Views API | Integration | View recorded with correct slug, category, author_sanity_id; no PII fields stored |
| Analytics queries | Unit (mock Supabase) | Writer query returns only views where author_sanity_id matches; admin query returns all; category grouping correct; date grouping correct |
| Sanity article mutations | Integration | Article created with all required fields; draft status preserved; published article queryable via GROQ; update mutates correct document |
| OG Image route | Integration | Returns valid ImageResponse for known slug; handles unknown slug without 500 |

---

## Out of Scope

- Native Sanity Studio — replaced entirely by custom dashboards
- Revenue sharing for writers — all ad revenue goes to the platform
- Newsletter broadcast UI — subscriptions collected, sending is post-launch
- Affiliate link click tracking — links are static hrefs at launch
- Writer leaderboard — post-launch
- Top performing articles ranking — post-launch
- Live scores / fixture data API — editorial content only at launch
- Social sharing buttons — readers share manually
- Push notifications — email list only
- Mobile app — web only at launch
- Video content — text and image only at launch
- Paid subscriptions / paywalled content — all content free at launch

---

## Further Notes

- **Brand:** JESTV SPORTS. Bold sports energy. Red / black / white palette. BBC Sport-inspired layout.
- **Audience:** Kenyan football fans. Primary device: mobile Android on 3G/4G.
- **Subdomains:**
  - `jestvsports.com` — public site
  - `author.jestvsports.com` — writer dashboard
  - `admin.jestvsports.com` — admin dashboard
- **Vercel config:** All three subdomains on same deployment. Middleware routes internally.
- **Sanity project:** `jestvs-sports` — API only, no Studio deployment
- **Supabase project:** `jestvs-sports`
- **Vercel project:** `jestvs-sports`
- **Domain recommendation:** `jestvsports.co.ke` (Kenyan identity) or `jestvsports.com`
- **Pre-launch content:** Admin seeds minimum 5 articles across 3 categories before go-live
- **Launch writer capacity:** 3–5 approved writers for launch week
- **Launch timeline:** 2 weeks from project start, solo developer
