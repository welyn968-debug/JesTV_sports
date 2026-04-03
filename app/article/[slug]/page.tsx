import Header from '@/components/public/header'
import Footer from '@/components/public/footer'
import { Eye, Share2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { publicClient } from '@/lib/sanity/client'
import { ARTICLE_QUERY } from '@/lib/sanity/queries'
import { PortableTextRenderer } from '@/components/public/portable-text'
import { ViewTracker } from '@/components/public/view-tracker'
import { CommentsSection } from '@/components/public/comments'

type ArticlePageProps = {
  params: Promise<{ slug: string }>
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

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await publicClient.fetch(ARTICLE_QUERY, { slug }, { perspective: 'published' })
  if (!article) return {}
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt || 'Read the latest football analysis and commentary',
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await publicClient.fetch(ARTICLE_QUERY, { slug }, { perspective: 'published' })
  const moreStories = await publicClient.fetch(
    `*[_type == "article" && slug.current != $slug][0...3]{ title, "slug": slug.current }`,
    { slug },
    { perspective: 'published' }
  )

  if (!article) notFound()

  const readTime = estimateReadTime(article.body)
  const published = article.publishedAt ? format(new Date(article.publishedAt), 'dd MMM yyyy') : 'Draft'

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4' }}>
      <Header />

      <main style={{ maxWidth: '1180px', margin: '0 auto', padding: '28px 20px 48px', display: 'grid', gridTemplateColumns: '1fr 288px', gap: '28px', alignItems: 'start' }}>
        <article>
          <ViewTracker
            articleSlug={article.slug}
            categorySlug={article.category?.slug}
            authorSanityId={article.author?.supabaseUserId}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ background: article.category?.color || '#E8000D', color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '2px' }}>
              {article.category?.title || 'Category'}
            </span>
            <span style={{ fontSize: '12px', color: '#888' }}>{published}</span>
            <span style={{ fontSize: '12px', color: '#888' }}>•</span>
            <span style={{ fontSize: '12px', color: '#888' }}>{readTime} min read</span>
            <span style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '3px', marginLeft: 'auto' }}>
              <Eye size={12} /> views
            </span>
          </div>

          <h1 className="font-display" style={{ fontSize: '52px', color: '#0A0A0A', lineHeight: 1.05, letterSpacing: '0.02em', marginBottom: '16px' }}>
            {article.title?.toUpperCase()}
          </h1>

          {article.excerpt && (
            <p style={{ fontSize: '18px', color: '#555', lineHeight: 1.6, marginBottom: '24px', fontWeight: 500, borderLeft: '4px solid #E8000D', paddingLeft: '16px' }}>
              {article.excerpt}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid #E4E4E4', borderBottom: '1px solid #E4E4E4', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#E8000D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '14px' }}>
                {(article.author?.name || 'A').split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <p style={{ fontWeight: 700, color: '#0A0A0A', fontSize: '14px' }}>{article.author?.name || 'Author'}</p>
                <p style={{ fontSize: '12px', color: '#888' }}>Football Analyst</p>
              </div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', border: '1px solid #E4E4E4', background: '#fff', borderRadius: '4px', fontSize: '13px', fontWeight: 600, color: '#555', cursor: 'pointer' }}>
              <Share2 size={14} /> Share
            </button>
          </div>

          <div style={{ fontSize: '16px', lineHeight: 1.8, color: '#333' }}>
            <PortableTextRenderer value={article.body} />
          </div>

          <CommentsSection articleSlug={article.slug} />
        </article>

        <aside>
          <div style={{ background: '#fff', border: '1px solid #E4E4E4', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ background: '#0A0A0A', padding: '12px 16px' }}>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>More Stories</span>
            </div>
            {(Array.isArray(moreStories) ? moreStories : []).map((t: any, i: number) => (
              <div key={t.slug || i} style={{ padding: '12px 16px', borderBottom: i < 2 ? '1px solid #F0F0F0' : 'none' }}>
                <a href={`/article/${t.slug}`} style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A', lineHeight: 1.4, cursor: 'pointer' }}>
                  {t.title}
                </a>
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
