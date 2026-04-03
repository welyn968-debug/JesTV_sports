'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Eye } from 'lucide-react'

const CAT_COLORS: Record<string, string> = {
  'Match Reports': '#E8000D', Transfers: '#FF6B00', Opinion: '#7B2FBE',
  Interviews: '#0066CC', Fixtures: '#00875A', Analysis: '#334155',
}

type ArticleRow = {
  id: string
  title: string
  slug?: string
  category?: { title?: string; color?: string }
  author?: { name?: string }
  status: 'draft' | 'published'
  publishedAt?: string
  _updatedAt?: string
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleRow[]>([])
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState<'all'|'published'|'draft'>('all')

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/articles')
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

  const shown = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                        (a.author?.name || '').toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' ? true : a.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Articles</h1>
          <p className="text-muted-foreground mt-1">{articles.length} articles total</p>
        </div>
        <Link href="/writer/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-accent transition-colors text-sm">
          <Plus size={15} /> New Article
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by title or author…"
          className="flex-1 min-w-[220px] px-4 py-2 border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
        <div className="flex gap-1">
          {(['all', 'published', 'draft'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-sm text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              {['Title', 'Category', 'Author', 'Status', 'Views', 'Date', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.length === 0 ? (
              <tr><td colSpan={7} className="px-5 py-10 text-center text-muted-foreground text-sm">No articles found.</td></tr>
            ) : shown.map((a, i) => (
              <tr key={a.id} className={`hover:bg-muted/10 transition-colors ${i < shown.length - 1 ? 'border-b border-border' : ''}`}>
                <td className="px-5 py-4 max-w-[240px]">
                  <p className="font-medium text-foreground text-sm truncate">{a.title}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="px-2 py-1 rounded text-white text-xs font-bold"
                    style={{ background: a.category?.color || CAT_COLORS[a.category?.title || ''] ?? '#888' }}>
                    {a.category?.title || 'Category'}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">{a.author?.name || 'Author'}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${a.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-foreground">—</td>
                <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">{a.publishedAt || a._updatedAt || '—'}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/article/${a.slug || a.id}`}
                      className="p-1.5 bg-muted hover:bg-muted/80 rounded text-muted-foreground transition-colors">
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
