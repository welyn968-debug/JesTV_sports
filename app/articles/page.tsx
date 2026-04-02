import Header from '@/components/public/header'
import Footer from '@/components/public/footer'
import Link from 'next/link'
import { Eye, MessageCircle } from 'lucide-react'

export const metadata = {
  title: 'All Articles - JESTV SPORTS',
  description: 'Browse all football articles, match reports, transfers and more.',
}

const CAT_COLORS: Record<string, string> = {
  'Analysis': '#334155', 'Transfer News': '#FF6B00', 'Talent Scouting': '#7B2FBE',
  'Team Reports': '#0066CC', 'Opinion': '#E8000D', 'Match Reports': '#E8000D',
}

const articles = [
  { id: '1', title: 'Manchester City Dominates Europa: Season Analysis',     excerpt: "Breaking down how Guardiola's tactical innovations secured another championship.",         category: 'Analysis',      author: 'Sarah Williams',  readTime: 8,  views: 12400, comments: 234, date: 'Mar 15, 2026' },
  { id: '2', title: 'Rising Stars: Young Talents Reshaping Football',        excerpt: 'Discover the emerging players who are poised to dominate the next decade.',              category: 'Talent Scouting', author: 'James Rodriguez', readTime: 6, views: 8900, comments: 156, date: 'Mar 14, 2026' },
  { id: '3', title: 'Transfer Market Predictions: Summer 2026',              excerpt: 'Expert predictions on the biggest moves happening this summer transfer window.',          category: 'Transfer News', author: 'Emma Johnson',    readTime: 7,  views: 15600, comments: 342, date: 'Mar 13, 2026' },
  { id: '4', title: "Liverpool's New Era: Tactics Under New Leadership",     excerpt: 'How Liverpool is adapting to a fresh tactical approach this season.',                    category: 'Analysis',      author: 'Marcus Chen',     readTime: 9,  views: 11200, comments: 289, date: 'Mar 12, 2026' },
  { id: '5', title: 'Gor Mahia Clinch KPL Title With Stunning 3-0 Win',     excerpt: 'Gor Mahia secured the league title in dramatic fashion against AFC Leopards.',          category: 'Match Reports', author: 'James Ochieng',   readTime: 5,  views: 4521,  comments: 67,  date: 'Mar 19, 2026' },
  { id: '6', title: 'Victor Wanyama Returns to KPL — Official Confirmation', excerpt: 'The Kenyan legend is set to make a sensational return to domestic football.',           category: 'Transfer News', author: 'Amina Said',      readTime: 4,  views: 8932,  comments: 112, date: 'Mar 18, 2026' },
]


export default function ArticlesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4' }}>
      <Header />

      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 20px 48px' }}>
        {/* Page header */}
        <div style={{ marginBottom: '28px', borderBottom: '3px solid #0A0A0A', paddingBottom: '16px' }}>
          <h1 className="font-display" style={{ fontSize: '48px', color: '#0A0A0A', letterSpacing: '0.02em', lineHeight: 1, marginBottom: '8px' }}>
            ALL ARTICLES
          </h1>
          <p style={{ fontSize: '14px', color: '#888', fontWeight: 500 }}>
            {articles.length} articles — football coverage, analysis &amp; commentary
          </p>
        </div>

        {/* Articles list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#E4E4E4' }}>
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
              <article style={{ background: '#fff', padding: '20px 24px', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ background: CAT_COLORS[article.category] ?? '#888', color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '2px' }}>
                    {article.category}
                  </span>
                  <span style={{ fontSize: '12px', color: '#888' }}>{article.date}</span>
                  <span style={{ fontSize: '12px', color: '#888' }}>•</span>
                  <span style={{ fontSize: '12px', color: '#888' }}>{article.readTime} min read</span>
                </div>

                {/* Title */}
                <h2 className="font-display" style={{ fontSize: '26px', color: '#0A0A0A', lineHeight: 1.1, letterSpacing: '0.02em', marginBottom: '8px' }}>
                  {article.title.toUpperCase()}
                </h2>

                {/* Excerpt */}
                <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6, marginBottom: '12px' }}>
                  {article.excerpt}
                </p>

                {/* Bottom row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid #F0F0F0', paddingTop: '10px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#E8000D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '9px', fontWeight: 700 }}>
                    {article.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>{article.author}</span>
                  <span style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Eye size={11} />{(article.views / 1000).toFixed(1)}K
                  </span>
                  <span style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <MessageCircle size={11} />{article.comments}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
