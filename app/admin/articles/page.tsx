'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

const CAT_COLORS: Record<string, string> = {
  'Match Reports': '#E8000D', Transfers: '#FF6B00', Opinion: '#7B2FBE',
  Interviews: '#0066CC', Fixtures: '#00875A', Analysis: '#334155',
};

const initialArticles = [
  { id: '1', title: 'Gor Mahia Clinch Title With Stunning 3-0 Win Over AFC Leopards', category: 'Match Reports', author: 'James Ochieng',  status: 'published', views: 4521, date: '19 Mar 2026' },
  { id: '2', title: 'Victor Wanyama Returns to KPL — Official Confirmation',            category: 'Transfers',     author: 'Amina Said',    status: 'published', views: 8932, date: '18 Mar 2026' },
  { id: '3', title: 'Why Kenya WILL Qualify for AFCON 2027',                            category: 'Opinion',       author: 'Kevin Mwangi',  status: 'draft',     views: 0,    date: '17 Mar 2026' },
  { id: '4', title: 'AFC Leopards New Signing: Full Press Conference Transcript',        category: 'Interviews',    author: 'James Ochieng', status: 'published', views: 2341, date: '16 Mar 2026' },
  { id: '5', title: 'Premier League GW29: Full Results & Highlights',                   category: 'Match Reports', author: 'Amina Said',    status: 'published', views: 6102, date: '15 Mar 2026' },
];

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState(initialArticles);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState<'all'|'published'|'draft'>('all');

  const remove = (id: string) => setArticles(prev => prev.filter(a => a.id !== id));

  const shown = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                        a.author.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' ? true : a.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-8">
      {/* Header */}
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

      {/* Filters */}
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

      {/* Table */}
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
                    style={{ background: CAT_COLORS[a.category] ?? '#888' }}>
                    {a.category}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">{a.author}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${a.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-foreground">
                  {a.views > 0 ? a.views.toLocaleString() : '—'}
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">{a.date}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/article/${a.id}`}
                      className="p-1.5 bg-muted hover:bg-muted/80 rounded text-muted-foreground transition-colors">
                      <Eye size={13}/>
                    </Link>
                    <button className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-xs font-semibold transition-colors">
                      <Edit2 size={11}/> Edit
                    </button>
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
  );
}
