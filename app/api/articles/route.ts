import { NextResponse, type NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { writeClient } from '@/lib/sanity/client'
import { slugify } from '@/lib/sanity/utils'

type Profile = {
  id: string
  role: 'reader' | 'writer' | 'admin'
  display_name?: string | null
  full_name?: string | null
  username?: string | null
  email?: string | null
}

async function getProfile() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { user: null, profile: null, supabase }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, display_name, full_name, username, email')
    .eq('id', user.id)
    .single()

  return { user, profile: profile as Profile | null, supabase }
}

async function getOrCreateAuthor(profile: Profile) {
  const existing = await writeClient.fetch(
    `*[_type == "author" && supabaseUserId == $id][0]{ _id, name, "slug": slug.current }`,
    { id: profile.id },
    { perspective: 'previewDrafts' }
  )

  if (existing?._id) return existing._id as string

  const name =
    profile.display_name ||
    profile.full_name ||
    profile.username ||
    profile.email ||
    'Author'

  const created = await writeClient.create({
    _type: 'author',
    name,
    slug: { _type: 'slug', current: slugify(name) },
    supabaseUserId: profile.id,
  })

  return created._id as string
}

function sanitizeArticle(doc: any) {
  return {
    _type: 'article',
    title: doc.title,
    slug: doc.slug,
    author: doc.author,
    category: doc.category,
    mainImage: doc.mainImage,
    excerpt: doc.excerpt,
    body: doc.body,
    publishedAt: doc.publishedAt,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    affiliateLinks: doc.affiliateLinks,
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const mine = searchParams.get('mine') === 'true'
  const id = searchParams.get('id')

  const { user, profile } = await getProfile()

  if (mine || id) {
    if (!user || !profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  if (id) {
    const doc = await writeClient.fetch(
      `*[_type == "article" && (_id == $id || _id == $draftId)][0]{
        _id,
        title,
        "slug": slug.current,
        mainImage,
        excerpt,
        body,
        seoTitle,
        seoDescription,
        affiliateLinks,
        publishedAt,
        _updatedAt,
        "category": category->{ _id, title, "slug": slug.current, color },
        "author": author->{ _id, name, supabaseUserId }
      }`,
      { id, draftId: `drafts.${id}` },
      { perspective: 'previewDrafts' }
    )

    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const baseId = doc._id.replace(/^drafts\./, '')
    return NextResponse.json({
      id: baseId,
      status: doc._id.startsWith('drafts.') ? 'draft' : 'published',
      ...doc,
    })
  }

  if (profile?.role === 'writer' && !mine) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const docs = await writeClient.fetch(
      `*[_type == "article" ${mine ? '&& author->supabaseUserId == $userId' : ''}]
      | order(_updatedAt desc){
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        _updatedAt,
        "category": category->{ title, "slug": slug.current, color },
        "author": author->{ name, supabaseUserId }
      }`,
    { userId: profile?.id },
    { perspective: 'previewDrafts' }
  )

  const map = new Map<string, any>()
  for (const doc of docs) {
    const baseId = doc._id.replace(/^drafts\./, '')
    const isDraft = doc._id.startsWith('drafts.')
    if (!map.has(baseId) || isDraft) {
      map.set(baseId, {
        id: baseId,
        status: isDraft ? 'draft' : 'published',
        ...doc,
      })
    }
  }

  return NextResponse.json({ items: Array.from(map.values()) })
}

export async function POST(request: Request) {
  const { user, profile } = await getProfile()
  if (!user || !profile || (profile.role !== 'writer' && profile.role !== 'admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json()
  const {
    title,
    slug,
    body,
    categoryId,
    excerpt,
    mainImage,
    seoTitle,
    seoDescription,
    affiliateLinks,
    publish,
  } = payload

  if (!title || !categoryId) {
    return NextResponse.json({ error: 'Title and category are required' }, { status: 400 })
  }

  const authorId = await getOrCreateAuthor(profile)
  const baseId = crypto.randomUUID()
  const slugValue = slug ? slugify(slug) : slugify(title)

  const doc = sanitizeArticle({
    title,
    slug: { _type: 'slug', current: slugValue },
    author: { _type: 'reference', _ref: authorId },
    category: { _type: 'reference', _ref: categoryId },
    mainImage,
    excerpt,
    body,
    seoTitle,
    seoDescription,
    affiliateLinks,
    publishedAt: publish ? new Date().toISOString() : undefined,
  })

  const created = await writeClient.create({
    _id: publish ? baseId : `drafts.${baseId}`,
    ...doc,
  })

  return NextResponse.json({ id: baseId, slug: slugValue, createdId: created._id }, { status: 201 })
}
