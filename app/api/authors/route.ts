import { NextResponse } from 'next/server'
import { publicClient } from '@/lib/sanity/client'

export async function GET() {
  const authors = await publicClient.fetch(
    `*[_type == "author"] | order(name asc) { _id, name, "slug": slug.current, photo, bio, supabaseUserId }`,
    {},
    { perspective: 'published' }
  )
  return NextResponse.json(authors)
}
