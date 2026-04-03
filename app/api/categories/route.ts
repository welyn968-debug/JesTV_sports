import { NextResponse } from 'next/server'
import { publicClient, writeClient } from '@/lib/sanity/client'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { slugify } from '@/lib/sanity/utils'

export async function GET() {
  const categories = await publicClient.fetch(
    `*[_type == "category"] | order(title asc) { _id, title, "slug": slug.current, description, color }`,
    {},
    { perspective: 'published' }
  )
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { title, description, color } = await request.json()
  if (!title?.trim()) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }

  const slug = slugify(title)
  const doc = await writeClient.create({
    _type: 'category',
    title: title.trim(),
    slug: { _type: 'slug', current: slug },
    description: description || '',
    color: color || '#E8000D',
  })

  return NextResponse.json(doc, { status: 201 })
}
