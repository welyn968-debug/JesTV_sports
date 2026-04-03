import Header from '@/components/public/header'
import Footer from '@/components/public/footer'
import { publicClient } from '@/lib/sanity/client'
import { AUTHORS_QUERY } from '@/lib/sanity/queries'

export const metadata = {
  title: 'Authors - JESTV SPORTS',
  description: 'Meet the writers behind JESTV SPORTS.',
}

export default async function AuthorsPage() {
  const authors = await publicClient.fetch(AUTHORS_QUERY, {}, { perspective: 'published' })

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4' }}>
      <Header />

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 20px 48px' }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Authors</h1>
          <p className="text-muted-foreground mt-2">The experts behind every article.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {authors.map((author: any) => (
            <div key={author._id} className="p-6 bg-card border border-border rounded-xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  {(author.name || 'A').split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{author.name}</h3>
                  <p className="text-sm text-primary font-medium">Staff Writer</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{author.bio || 'Football analysis and match reporting.'}</p>
              <p className="text-xs text-muted-foreground font-semibold">{author.articles ?? 0} articles →</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
