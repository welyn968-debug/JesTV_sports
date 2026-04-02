import Header from '@/components/public/header'
import Footer from '@/components/public/footer'
import Link from 'next/link'

export const metadata = {
  title: 'Categories - JESTV SPORTS',
  description: 'Browse football articles by category.',
}

const categories = [
  { id: '1', name: 'Match Reports',      description: 'Full-time reports from KPL and international fixtures',         articleCount: 22,  color: '#E8000D' },
  { id: '2', name: 'Transfers',          description: 'Breaking news on player movements and transfer market updates',  articleCount: 18,  color: '#FF6B00' },
  { id: '3', name: 'Opinion',            description: 'Expert perspectives, debates and commentary',                   articleCount: 15,  color: '#7B2FBE' },
  { id: '4', name: 'Interviews',         description: 'Exclusive interviews with players, coaches and officials',       articleCount: 9,   color: '#0066CC' },
  { id: '5', name: 'Fixtures',           description: 'Upcoming match schedules for KPL and global competitions',      articleCount: 6,   color: '#00875A' },
  { id: '6', name: 'Tournament Coverage',description: 'AFCON, Champions League, World Cup and cup competition coverage',articleCount: 14,  color: '#334155' },
]

export default function CategoriesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4' }}>
      <Header />

      <main style={{ maxWidth: '1180px', margin: '0 auto', padding: '32px 20px 48px' }}>
        {/* Page header */}
        <div style={{ marginBottom: '28px', borderBottom: '3px solid #0A0A0A', paddingBottom: '16px' }}>
          <h1 className="font-display" style={{ fontSize: '48px', color: '#0A0A0A', letterSpacing: '0.02em', lineHeight: 1 }}>
            CATEGORIES
          </h1>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {categories.map(cat => (
            <Link key={cat.id} href={`/category/${cat.id}`} style={{ textDecoration: 'none' }}>
              <div className="category-card">
                {/* Color bar */}
                <div style={{ height: '5px', background: cat.color }} />
                <div style={{ padding: '20px 22px 22px' }}>
                  <h3 className="font-display" style={{ fontSize: '28px', color: '#0A0A0A', letterSpacing: '0.02em', lineHeight: 1, marginBottom: '8px' }}>
                    {cat.name.toUpperCase()}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.5, marginBottom: '16px' }}>
                    {cat.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0F0F0', paddingTop: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#888', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {cat.articleCount} articles
                    </span>
                    <span style={{ fontSize: '18px', color: cat.color, fontWeight: 700 }}>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
