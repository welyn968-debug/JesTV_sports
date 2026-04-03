import { NextResponse, type NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { writeClient } from '@/lib/sanity/client'
import { slugify } from '@/lib/sanity/utils'

type Profile = {
  id: string
  role: 'reader' | 'writer' | 'admin'
}

async function getProfile() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { user: null, profile: null }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single()

  return { user, profile: profile as Profile | null }
}

async function ensureOwnership(id: string, profile: Profile) {
  if (profile.role === 'admin') return true

  const article = await writeClient.fetch(
    `*[_type == "article" && (_id == $id || _id == $draftId)][0]{
      "authorId": author->supabaseUserId
    }`,
    { id, draftId: `drafts.${id}` },
    { perspective: 'previewDrafts' }
  )

  if (!article) return false
  return article.authorId === profile.id
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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { user, profile } = await getProfile()
  if (!user || !profile || (profile.role !== 'writer' && profile.role !== 'admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = params.id
  const allowed = await ensureOwnership(id, profile)
  if (!allowed) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
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

  const draftId = `drafts.${id}`
  const existingDraft = await writeClient.getDocument(draftId)
  const existingPublished = await writeClient.getDocument(id)
  const base = existingDraft || existingPublished

  if (!base) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const slugValue = existingPublished?.slug?.current
    ? existingPublished.slug
    : slug
      ? { _type: 'slug', current: slugify(slug) }
      : base.slug || { _type: 'slug', current: slugify(title || base.title || 'article') }

  const nextDoc = sanitizeArticle({
    ...base,
    title: title ?? base.title,
    slug: slugValue,
    excerpt: excerpt ?? base.excerpt,
    body: body ?? base.body,
    mainImage: mainImage ?? base.mainImage,
    seoTitle: seoTitle ?? base.seoTitle,
    seoDescription: seoDescription ?? base.seoDescription,
    affiliateLinks: affiliateLinks ?? base.affiliateLinks,
    category: categoryId ? { _type: 'reference', _ref: categoryId } : base.category,
    publishedAt: base.publishedAt,
  })

  if (publish) {
    const publishedDoc = {
      _id: id,
      ...nextDoc,
      publishedAt: existingPublished?.publishedAt || new Date().toISOString(),
    }

    await writeClient
      .transaction()
      .createOrReplace(publishedDoc)
      .delete(draftId)
      .commit()

    return NextResponse.json({ id, status: 'published' })
  }

  const draftDoc = {
    _id: draftId,
    ...nextDoc,
  }

  await writeClient.createOrReplace(draftDoc)
  return NextResponse.json({ id, status: 'draft' })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { user, profile } = await getProfile()
  if (!user || !profile || (profile.role !== 'writer' && profile.role !== 'admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = params.id
  const allowed = await ensureOwnership(id, profile)
  if (!allowed) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const draftId = `drafts.${id}`
  await writeClient.transaction().delete(draftId).delete(id).commit()

  return NextResponse.json({ deleted: true })
}
