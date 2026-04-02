import Header from '@/components/public/header'
import Footer from '@/components/public/footer'
import { Eye, Share2, MessageCircle } from 'lucide-react'

export const metadata = {
  title: 'Article - JESTV SPORTS',
  description: 'Read the latest football analysis and commentary',
}

const COMMENTS = [
  { name: 'Peter Kamau',   time: '2 hours ago', body: 'Excellent analysis! The point about positional fluidity is particularly insightful.' },
  { name: 'Sarah Njoki',   time: '5 hours ago', body: 'Great read. I think the pressing systems section deserved even more depth.' },
  { name: 'Denis Otieno',  time: '1 day ago',   body: 'I agree with most points but think the midfield contribution was underrated.' },
]

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await params; // Next.js 15 async params
  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4' }}>
      <Header />

      <main style={{ maxWidth: '1180px', margin: '0 auto', padding: '28px 20px 48px', display: 'grid', gridTemplateColumns: '1fr 288px', gap: '28px', alignItems: 'start' }}>

        {/* ── Article body ───────────────────────────────────── */}
        <article>
          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ background: '#E8000D', color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '2px' }}>Match Reports</span>
            <span style={{ fontSize: '12px', color: '#888' }}>19 Mar 2026</span>
            <span style={{ fontSize: '12px', color: '#888' }}>•</span>
            <span style={{ fontSize: '12px', color: '#888' }}>8 min read</span>
            <span style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '3px', marginLeft: 'auto' }}><Eye size={12}/>4,521 views</span>
          </div>

          {/* Title */}
          <h1 className="font-display" style={{ fontSize: '52px', color: '#0A0A0A', lineHeight: 1.05, letterSpacing: '0.02em', marginBottom: '16px' }}>
            THE EVOLUTION OF MODERN FOOTBALL TACTICS
          </h1>

          {/* Excerpt */}
          <p style={{ fontSize: '18px', color: '#555', lineHeight: 1.6, marginBottom: '24px', fontWeight: 500, borderLeft: '4px solid #E8000D', paddingLeft: '16px' }}>
            How top teams are adapting their strategies in the 2026 season and what it means for the future of the game.
          </p>

          {/* Author row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#E8000D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '14px' }}>SW</div>
              <div>
                <p style={{ fontWeight: 700, color: '#0A0A0A', fontSize: '14px' }}>Sarah Williams</p>
                <p style={{ fontSize: '12px', color: '#888' }}>Football Analyst</p>
              </div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', border: '1px solid #E4E4E4', background: '#fff', borderRadius: '4px', fontSize: '13px', fontWeight: 600, color: '#555', cursor: 'pointer' }}>
              <Share2 size={14}/> Share
            </button>
          </div>

          {/* Body */}
          <div style={{ fontSize: '16px', lineHeight: 1.8, color: '#333' }}>
            <p style={{ marginBottom: '20px' }}>The modern football landscape has undergone a dramatic transformation over the past few years. What once seemed like rigid, unchangeable tactical formations has evolved into a dynamic and fluid ecosystem of strategies.</p>

            <h2 className="font-display" style={{ fontSize: '30px', color: '#0A0A0A', letterSpacing: '0.02em', margin: '32px 0 14px' }}>THE RISE OF POSITIONAL FLUIDITY</h2>
            <p style={{ marginBottom: '20px' }}>Gone are the days when players strictly adhered to their traditional positions. Modern teams now employ a system where players constantly interchange roles during matches. This positional fluidity provides increased unpredictability and better space utilization.</p>

            <h2 className="font-display" style={{ fontSize: '30px', color: '#0A0A0A', letterSpacing: '0.02em', margin: '32px 0 14px' }}>PRESSING SYSTEMS AND COUNTER-PRESSING</h2>
            <p style={{ marginBottom: '20px' }}>The intensity of pressing has never been higher. Teams are now organized into structured pressing zones that activate automatically when the opposition gains possession. This represents a significant shift from traditional defensive tactics.</p>

            <h2 className="font-display" style={{ fontSize: '30px', color: '#0A0A0A', letterSpacing: '0.02em', margin: '32px 0 14px' }}>DATA-DRIVEN TACTICS</h2>
            <p style={{ marginBottom: '20px' }}>Perhaps the most significant change is the integration of advanced analytics into tactical planning. Teams now use real-time data analysis to inform in-match decisions, from player positioning to optimal passing angles.</p>
          </div>

          {/* Comments */}
          <div style={{ marginTop: '48px', borderTop: '3px solid #0A0A0A', paddingTop: '28px' }}>
            <h2 className="font-display" style={{ fontSize: '28px', color: '#0A0A0A', letterSpacing: '0.02em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MessageCircle size={20}/> COMMENTS ({COMMENTS.length})
            </h2>

            {/* Comment form */}
            <div style={{ background: '#fff', border: '1px solid #E4E4E4', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
              <textarea rows={4} placeholder="Share your thoughts on this article..."
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #E4E4E4', borderRadius: '4px', background: '#FAFAFA', fontSize: '14px', color: '#333', resize: 'none', outline: 'none', fontFamily: 'inherit', marginBottom: '12px' }}/>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button style={{ padding: '8px 18px', border: '1px solid #E4E4E4', borderRadius: '4px', background: '#fff', fontSize: '13px', fontWeight: 600, color: '#555', cursor: 'pointer' }}>Cancel</button>
                <button style={{ padding: '8px 18px', background: '#E8000D', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Post Comment</button>
              </div>
            </div>

            {/* Comment list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#E4E4E4' }}>
              {COMMENTS.map((c, i) => (
                <div key={i} style={{ background: '#fff', padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '11px', fontWeight: 700 }}>
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#0A0A0A' }}>{c.name}</span>
                    <span style={{ fontSize: '12px', color: '#888' }}>{c.time}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.6, paddingLeft: '42px' }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* ── Sidebar ────────────────────────────────────────── */}
        <aside>
          <div style={{ background: '#fff', border: '1px solid #E4E4E4', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ background: '#0A0A0A', padding: '12px 16px' }}>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>More Stories</span>
            </div>
            {['Gor Mahia Clinch KPL Title','Victor Wanyama Returns to KPL','Why Kenya Will Qualify for AFCON 2027'].map((t, i) => (
              <div key={i} style={{ padding: '12px 16px', borderBottom: i < 2 ? '1px solid #F0F0F0' : 'none' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A', lineHeight: 1.4, cursor: 'pointer' }}>{t}</p>
              </div>
            ))}
          </div>
          <div style={{ background: '#EEEEEE', borderRadius: '4px', height: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed #CCC' }}>
            <span style={{ fontSize: '10px', color: '#888', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Advertisement</span>
            <span style={{ fontSize: '10px', color: '#CCC', marginTop: '4px' }}>300 × 250</span>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  )
}
