import Header from '@/components/public/header'
import Footer from '@/components/public/footer'
import Link from 'next/link'
import { publicClient } from '@/lib/sanity/client'
import { CATEGORIES_QUERY } from '@/lib/sanity/queries'

export const metadata = {
  title: 'Categories - JESTV SPORTS',
  description: 'Browse football articles by category.',
}

export default async function CategoriesPage() {
  const categories = await publicClient.fetch(CATEGORIES_QUERY, {}, { perspective: 'published' })

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4' }}>
      <Header />

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 20px 48px' }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-2">Browse football articles by category.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((cat: any) => (
            <Link key={cat._id} href={`/category/${cat.slug}`}>
              <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition space-y-3 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full" style={{ background: cat.color || '#E8000D' }} />
                  <h3 className="text-lg font-bold text-foreground">{cat.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{cat.description || 'Latest coverage and analysis.'}</p>
                <div className="text-xs text-muted-foreground">{cat.articleCount ?? 0} articles</div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
