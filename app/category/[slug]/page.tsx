import Header from '@/components/public/header'
import Footer from '@/components/public/footer'
import Link from 'next/link'
import { Eye, MessageCircle } from 'lucide-react'
import { publicClient } from '@/lib/sanity/client'
import { CATEGORY_ARTICLES_QUERY } from '@/lib/sanity/queries'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'

type CategoryPageProps = {
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

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await publicClient.fetch(CATEGORY_ARTICLES_QUERY, { slug }, { perspective: 'published' })
  if (!category) return {}
  return {
    title: `${category.title} - JESTV SPORTS`,
    description: category.description || 'Browse football articles by category',
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await publicClient.fetch(CATEGORY_ARTICLES_QUERY, { slug }, { perspective: 'published' })
  if (!category) notFound()

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4' }}>
      <Header />

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 20px 48px' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">{category.title}</h1>
            <p className="text-muted-foreground mt-1">{category.description || 'Browse football articles by category'}</p>
          </div>
          <div className="px-4 py-2 rounded-full text-sm font-semibold text-white" style={{ background: category.color || '#E8000D' }}>
            {category.articles?.length ?? 0} articles
          </div>
        </div>

        <div className="space-y-4">
          {category.articles?.map((article: any) => {
            const dateLabel = article.publishedAt ? format(new Date(article.publishedAt), 'MMM dd, yyyy') : 'Draft'
            const readTime = estimateReadTime(article.body)
            return (
              <Link key={article._id} href={`/article/${article.slug}`}>
                <article className="group block p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition space-y-4 cursor-pointer">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="px-2 py-1 rounded text-white text-[10px] font-bold" style={{ background: article.category?.color || '#888' }}>
                      {article.category?.title || 'Category'}
                    </span>
                    <span>{dateLabel}</span>
                    <span>•</span>
                    <span>{readTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-muted-foreground">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{article.author?.name || 'Author'}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />—</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />—</span>
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
