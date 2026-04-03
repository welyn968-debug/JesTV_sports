'use client'

import { useEffect, useMemo, useState } from 'react'
import { MessageCircle } from 'lucide-react'

type Comment = {
  id: string
  guest_name?: string | null
  user_id?: string | null
  body: string
  created_at: string
}

export function CommentsSection({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [body, setBody] = useState('')
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const initials = useMemo(() => (name?: string | null) => {
    if (!name) return 'AN'
    return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  }, [])

  const load = async () => {
    const res = await fetch(`/api/comments?article_slug=${encodeURIComponent(articleSlug)}`)
    if (!res.ok) return
    const data = await res.json()
    setComments(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    if (!articleSlug) return
    load().catch(() => null)
  }, [articleSlug])

  const submit = async () => {
    if (!body.trim()) return
    setSubmitting(true)
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        article_slug: articleSlug,
        body: body.trim(),
        guest_name: guestName.trim() || undefined,
        guest_email: guestEmail.trim() || undefined,
      }),
    })
    setSubmitting(false)
    if (res.ok) {
      setBody('')
      await load()
    }
  }

  return (
    <div style={{ marginTop: '48px', borderTop: '3px solid #0A0A0A', paddingTop: '28px' }}>
      <h2 className="font-display" style={{ fontSize: '28px', color: '#0A0A0A', letterSpacing: '0.02em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <MessageCircle size={20} /> COMMENTS ({comments.length})
      </h2>

      <div style={{ background: '#fff', border: '1px solid #E4E4E4', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: 10 }}>
          <input
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Your name (optional)"
            style={{ flex: 1, padding: '10px 12px', border: '1px solid #E4E4E4', borderRadius: '4px', background: '#FAFAFA', fontSize: '14px', color: '#333' }}
          />
          <input
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="Email (optional)"
            style={{ flex: 1, padding: '10px 12px', border: '1px solid #E4E4E4', borderRadius: '4px', background: '#FAFAFA', fontSize: '14px', color: '#333' }}
          />
        </div>
        <textarea
          rows={4}
          placeholder="Share your thoughts on this article..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ width: '100%', padding: '10px 14px', border: '1px solid #E4E4E4', borderRadius: '4px', background: '#FAFAFA', fontSize: '14px', color: '#333', resize: 'none', outline: 'none', fontFamily: 'inherit', marginBottom: '12px' }}
        />
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setBody('')}
            style={{ padding: '8px 18px', border: '1px solid #E4E4E4', borderRadius: '4px', background: '#fff', fontSize: '13px', fontWeight: 600, color: '#555', cursor: 'pointer' }}
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={submitting || !body.trim()}
            style={{ padding: '8px 18px', background: '#E8000D', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase', opacity: submitting || !body.trim() ? 0.6 : 1 }}
            type="button"
          >
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#E4E4E4' }}>
        {comments.map((c) => (
          <div key={c.id} style={{ background: '#fff', padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '11px', fontWeight: 700 }}>
                {initials(c.guest_name)}
              </div>
              <span style={{ fontWeight: 700, fontSize: '14px', color: '#0A0A0A' }}>{c.guest_name || 'Anonymous'}</span>
              <span style={{ fontSize: '12px', color: '#888' }}>{new Date(c.created_at).toLocaleDateString()}</span>
            </div>
            <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.6, paddingLeft: '42px' }}>{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
