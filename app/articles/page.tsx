import Header from '@/components/public/header'
import Footer from '@/components/public/footer'
import Link from 'next/link'
import { Eye, MessageCircle } from 'lucide-react'
import { publicClient } from '@/lib/sanity/client'
import { ARTICLES_QUERY } from '@/lib/sanity/queries'
import { format } from 'date-fns'

export const metadata = {
  title: 'All Articles - JESTV SPORTS',
  description: 'Browse all football articles, match reports, transfers and more.',
}

function estimateReadTime(body: any[] | undefined) {
  if (!Array.isArray(body)) return 3
  const text = body
    .filter((b) => b?._type === 'block')
    .map((b) => (b.children || []).map((c: any) => c.text || '').join(' '))
    .join(' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(3, Math.ceil(words / 200))
}

export default async function ArticlesPage() {
  const articles = await publicClient.fetch(ARTICLES_QUERY, {}, { perspective: 'published' })

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4' }}>
      <Header />

      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 20px 48px' }}>
        <div style={{ marginBottom: '28px', borderBottom: '3px solid #0A0A0A', paddingBottom: '16px' }}>
          <h1 className="font-display" style={{ fontSize: '48px', color: '#0A0A0A', letterSpacing: '0.02em', lineHeight: 1, marginBottom: '8px' }}>
            ALL ARTICLES
          </h1>
          <p style={{ fontSize: '14px', color: '#888', fontWeight: 500 }}>
            {articles.length} articles — football coverage, analysis &amp; commentary
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#E4E4E4' }}>
          {articles.map((article: any) => {
            const readTime = estimateReadTime(article.body)
            const dateLabel = article.publishedAt ? format(new Date(article.publishedAt), 'MMM dd, yyyy') : 'Draft'
            return (
              <Link key={article._id} href={`/article/${article.slug}`} style={{ textDecoration: 'none' }}>
                <article className="article-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ background: article.category?.color ?? '#888', color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '2px' }}>
                      {article.category?.title || 'Category'}
                    </span>
                    <span style={{ fontSize: '12px', color: '#888' }}>{dateLabel}</span>
                    <span style={{ fontSize: '12px', color: '#888' }}>•</span>
                    <span style={{ fontSize: '12px', color: '#888' }}>{readTime} min read</span>
                  </div>

                  <h2 className="font-display" style={{ fontSize: '26px', color: '#0A0A0A', lineHeight: 1.1, letterSpacing: '0.02em', marginBottom: '8px' }}>
                    {article.title?.toUpperCase()}
                  </h2>

                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6, marginBottom: '12px' }}>
                    {article.excerpt || 'Read the latest football analysis and commentary.'}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid #F0F0F0', paddingTop: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#E8000D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '9px', fontWeight: 700 }}>
                      {(article.author?.name || 'A').split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{article.author?.name || 'Author'}</span>
                    <span style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Eye size={11} />—
                    </span>
                    <span style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <MessageCircle size={11} />—
                    </span>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}
