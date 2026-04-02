'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Send } from 'lucide-react';

const categories = ['Match Reports', 'Transfers', 'Opinion', 'Interviews', 'Fixtures', 'Analysis'];

export default function NewArticlePage() {
  const [title, setTitle]       = useState('');
  const [excerpt, setExcerpt]   = useState('');
  const [body, setBody]         = useState('');
  const [category, setCategory] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc]   = useState('');
  const [saving, setSaving]     = useState(false);
  const [status, setStatus]     = useState<'idle'|'saved'|'published'>('idle');

  const handleSave = async (publish: boolean) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800)); // replace with API call
    setStatus(publish ? 'published' : 'saved');
    setSaving(false);
  };

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/writer" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">New Article</h1>
            <p className="text-sm text-muted-foreground">Draft your article and publish when ready</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {status === 'saved'     && <span className="text-sm text-green-600 font-medium">✓ Saved as draft</span>}
          {status === 'published' && <span className="text-sm text-green-600 font-medium">✓ Published!</span>}
          <button onClick={() => handleSave(false)} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-sm font-medium hover:bg-muted transition-colors disabled:opacity-50 text-sm">
            <Save size={15} />{saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button onClick={() => handleSave(true)} disabled={saving || !title || !body || !category}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-accent transition-colors disabled:opacity-50 text-sm">
            <Send size={15} />Publish
          </button>
        </div>
      </div>
      {/* Form */}
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Article Title *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter a compelling title..."
            className="w-full px-4 py-3 text-xl font-bold border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Select a category</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Excerpt</label>
          <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2}
            placeholder="A short summary shown in article cards..."
            className="w-full px-4 py-2 border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
        </div>

        {/* Body */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Article Body *</label>
          <textarea value={body} onChange={e => setBody(e.target.value)} rows={20}
            placeholder="Write your article here..."
            className="w-full px-4 py-2 border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm resize-y" />
          <p className="text-xs text-muted-foreground mt-1">Rich text editor coming soon. Plain text supported now.</p>
        </div>

        {/* SEO */}
        <div className="border border-border rounded-sm p-6 space-y-4 bg-muted/20">
          <h3 className="font-semibold text-foreground">SEO Settings</h3>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">SEO Title</label>
            <input value={seoTitle} onChange={e => setSeoTitle(e.target.value)}
              placeholder="Defaults to article title if empty"
              className="w-full px-4 py-2 border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">SEO Description</label>
            <textarea value={seoDesc} onChange={e => setSeoDesc(e.target.value)} rows={2}
              placeholder="Defaults to excerpt if empty"
              className="w-full px-4 py-2 border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
