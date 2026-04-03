'use client'

import { useEffect } from 'react'

export function ViewTracker({
  articleSlug,
  categorySlug,
  authorSanityId,
}: {
  articleSlug: string
  categorySlug?: string
  authorSanityId?: string
}) {
  useEffect(() => {
    if (!articleSlug) return
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        article_slug: articleSlug,
        category_slug: categorySlug,
        author_sanity_id: authorSanityId,
      }),
    }).catch(() => null)
  }, [articleSlug, categorySlug, authorSanityId])

  return null
}
