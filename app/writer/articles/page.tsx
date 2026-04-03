'use client'

import Link from 'next/link'
import { Plus, Edit2, Trash2, Eye } from 'lucide-react'
import { useEffect, useState } from 'react'

const CAT: Record<string, string> = {
  'Match Reports': '#E8000D', Transfers: '#FF6B00', Opinion: '#7B2FBE',
  Interviews: '#0066CC', Fixtures: '#00875A', Analysis: '#334155',
}

type ArticleRow = {
  id: string
  title: string
  slug?: string
  category?: { title?: string; color?: string }
  status: 'draft' | 'published'
  publishedAt?: string
  _updatedAt?: string
}

export default function WriterArticlesPage() {
  const [articles, setArticles] = useState<ArticleRow[]>([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/articles?mine=true')
      if (!res.ok) return
      const data = await res.json()
      setArticles(data.items || [])
    }
    load().catch(() => null)
  }, [])

  const remove = async (id: string) => {
    await fetch(`/api/articles/${id}`, { method: 'DELETE' })
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Articles</h1>
          <p className="text-muted-foreground mt-1">{articles.length} articles</p>
        </div>
        <Link href="/writer/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-accent transition-colors text-sm">
          <Plus size={15} /> New Article
        </Link>
      </div>

      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              {['Title', 'Category', 'Status', 'Views', 'Date', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles.map((a, i) => (
              <tr key={a.id} className={`hover:bg-muted/10 ${i < articles.length - 1 ? 'border-b border-border' : ''}`}>
                <td className="px-5 py-4 max-w-[260px]">
                  <p className="font-medium text-foreground text-sm truncate">{a.title}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="px-2 py-1 rounded text-white text-xs font-bold"
                    style={{ background: a.category?.color || CAT[a.category?.title || ''] ?? '#888' }}>
                    {a.category?.title || 'Category'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${a.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-foreground">—</td>
                <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">{a.publishedAt || a._updatedAt || '—'}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-1.5">
                    <Link href={`/article/${a.slug || a.id}`} className="p-1.5 bg-muted hover:bg-muted/80 rounded transition-colors text-muted-foreground">
                      <Eye size={13}/>
                    </Link>
                    <Link href={`/writer/new?id=${a.id}`} className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-xs font-semibold transition-colors">
                      <Edit2 size={11}/> Edit
                    </Link>
                    <button onClick={() => remove(a.id)}
                      className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors">
                      <Trash2 size={13}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
