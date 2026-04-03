'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Send, ImagePlus } from 'lucide-react'
import type { PortableTextBlock } from '@sanity/types'
import { useSearchParams } from 'next/navigation'
import { PortableTextInput, type PortableTextInputHandle } from '@/components/editor/portable-text-input'

type Category = {
  _id: string
  title: string
}

type ArticleResponse = {
  id: string
  title?: string
  slug?: { current: string }
  excerpt?: string
  body?: PortableTextBlock[]
  seoTitle?: string
  seoDescription?: string
  category?: { _id: string }
  mainImage?: any
}

const createEmptyBody = (): PortableTextBlock[] => [
  {
    _type: 'block',
    _key: crypto.randomUUID(),
    children: [
      { _type: 'span', _key: crypto.randomUUID(), text: '', marks: [] },
    ],
    markDefs: [],
    style: 'normal',
  },
]

export default function NewArticlePage() {
  const searchParams = useSearchParams()
  const editingId = searchParams.get('id')

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [body, setBody] = useState<PortableTextBlock[]>(createEmptyBody())
  const [categoryId, setCategoryId] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDesc, setSeoDesc] = useState('')
  const [mainImage, setMainImage] = useState<any | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'saved' | 'published'>('idle')

  const editorRef = useRef<PortableTextInputHandle>(null)

  const canPublish = useMemo(() => !!title && !!categoryId && body.length > 0, [title, categoryId, body])

  useEffect(() => {
    const loadCategories = async () => {
      const res = await fetch('/api/categories')
      if (!res.ok) return
      const data = await res.json()
      setCategories(Array.isArray(data) ? data : [])
    }
    loadCategories().catch(() => null)
  }, [])

  useEffect(() => {
    if (!editingId) return
    const load = async () => {
      const res = await fetch(`/api/articles?id=${editingId}`)
      if (!res.ok) return
      const data: ArticleResponse = await res.json()
      setTitle(data.title || '')
      setExcerpt(data.excerpt || '')
      setBody(data.body && data.body.length ? data.body : createEmptyBody())
      setCategoryId(data.category?._id || '')
      setSeoTitle(data.seoTitle || '')
      setSeoDesc(data.seoDescription || '')
      setMainImage(data.mainImage || null)
    }
    load().catch(() => null)
  }, [editingId])

  const uploadImage = async (file: File) => {
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: form })
    if (!res.ok) return null
    return res.json()
  }

  const handleMainImage = async (file?: File | null) => {
    if (!file) return
    const uploaded = await uploadImage(file)
    if (uploaded?.image) setMainImage(uploaded.image)
  }

  const handleBodyImage = async (file?: File | null) => {
    if (!file) return
    const uploaded = await uploadImage(file)
    if (!uploaded?.image) return
    editorRef.current?.insertImage({
      image: uploaded.image,
      alt: file.name,
      caption: '',
    })
  }

  const handleSave = async (publish: boolean) => {
    setSaving(true)
    const payload = {
      title,
      excerpt,
      body,
      categoryId,
      mainImage,
      seoTitle,
      seoDescription: seoDesc,
      publish,
    }
    const res = await fetch(editingId ? `/api/articles/${editingId}` : '/api/articles', {
      method: editingId ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      setStatus(publish ? 'published' : 'saved')
    }
    setSaving(false)
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/writer" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{editingId ? 'Edit Article' : 'New Article'}</h1>
            <p className="text-sm text-muted-foreground">Draft your article and publish when ready</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {status === 'saved' && <span className="text-sm text-green-600 font-medium">✓ Saved as draft</span>}
          {status === 'published' && <span className="text-sm text-green-600 font-medium">✓ Published!</span>}
          <button onClick={() => handleSave(false)} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-sm font-medium hover:bg-muted transition-colors disabled:opacity-50 text-sm">
            <Save size={15} />{saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button onClick={() => handleSave(true)} disabled={saving || !canPublish}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-accent transition-colors disabled:opacity-50 text-sm">
            <Send size={15} />Publish
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Article Title *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter a compelling title..."
            className="w-full px-4 py-3 text-xl font-bold border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Select a category</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Excerpt</label>
          <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2}
            placeholder="A short summary shown in article cards..."
            className="w-full px-4 py-2 border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Main Image</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleMainImage(e.target.files?.[0])}
              className="block text-sm text-muted-foreground"
            />
            {mainImage && <span className="text-xs text-green-600">Image uploaded</span>}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-foreground">Article Body *</label>
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
              <ImagePlus size={14} />
              Insert image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleBodyImage(e.target.files?.[0])}
              />
            </label>
          </div>
          <PortableTextInput ref={editorRef} value={body} onChange={setBody} />
          <p className="text-xs text-muted-foreground mt-1">Portable Text editor with inline images.</p>
        </div>

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
  )
}
