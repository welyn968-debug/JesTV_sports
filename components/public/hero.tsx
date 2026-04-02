import Link from 'next/link';
import { Eye } from 'lucide-react';

const CAT_COLORS: Record<string, string> = {
  'Match Reports': '#E8000D', Transfers: '#FF6B00', Opinion: '#7B2FBE',
  Interviews: '#0066CC', Fixtures: '#00875A', Analysis: '#334155',
};

interface HeroArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  authorIni: string;
  timeAgo: string;
  views: number;
  bg: string;
}

const heroArticle: HeroArticle = {
  id: '1',
  title: 'GOR MAHIA CLINCH TITLE WITH STUNNING 3-0 WIN OVER AFC LEOPARDS',
  category: 'Match Reports',
  author: 'James Ochieng',
  authorIni: 'JO',
  timeAgo: '2 hours ago',
  views: 4521,
  bg: 'linear-gradient(135deg, #0f1b36 0%, #1a2d5a 100%)',
};

const secondaryArticles: HeroArticle[] = [
  {
    id: '2', title: 'VICTOR WANYAMA RETURNS TO KPL — OFFICIAL CONFIRMATION',
    category: 'Transfers', author: 'Amina Said', authorIni: 'AS',
    timeAgo: '4 hours ago', views: 8932,
    bg: 'linear-gradient(135deg, #1a0a2e 0%, #2d1255 100%)',
  },
  {
    id: '3', title: 'WHY KENYA WILL QUALIFY FOR AFCON 2027',
    category: 'Opinion', author: 'Kevin Mwangi', authorIni: 'KM',
    timeAgo: '6 hours ago', views: 3210,
    bg: 'linear-gradient(135deg, #0a2d0a 0%, #155224 100%)',
  },
];

const latestArticles: HeroArticle[] = [
  { id: '1', title: 'Gor Mahia Clinch Title With Stunning 3-0 Win',          category: 'Match Reports', author: 'James Ochieng', authorIni: 'JO', timeAgo: '2h ago', views: 4521, bg: 'linear-gradient(135deg,#0f1b36,#1a2d5a)' },
  { id: '2', title: 'Victor Wanyama Returns to KPL — Official Confirmation', category: 'Transfers',    author: 'Amina Said',   authorIni: 'AS', timeAgo: '4h ago', views: 8932, bg: 'linear-gradient(135deg,#1a0a2e,#2d1255)' },
  { id: '4', title: 'AFC Leopards New Signing: Press Conference Transcript', category: 'Interviews',   author: 'James Ochieng',authorIni: 'JO', timeAgo: '1d ago', views: 2341, bg: 'linear-gradient(135deg,#2d0000,#550a0a)' },
  { id: '5', title: 'Premier League GW29: Full Results & Highlights',        category: 'Match Reports', author: 'Amina Said',   authorIni: 'AS', timeAgo: '1d ago', views: 6102, bg: 'linear-gradient(135deg,#0f1b36,#1a2d5a)' },
];

/* ── reusable card component ─────────────────────────────── */
function ImgCard({ article, height }: { article: HeroArticle; height: number }) {
  return (
    <Link href={`/article/${article.id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div className="img-card" style={{ height, background: article.bg, borderRadius: '4px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
        <div className="img-grid-tex" />
        <div className="img-overlay" />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px', zIndex: 1 }}>
          <span style={{ background: CAT_COLORS[article.category] ?? '#888', color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '2px' }}>
            {article.category}
          </span>
          {height >= 200 && (
            <h2 className="font-display" style={{ color: '#fff', margin: '8px 0 10px', lineHeight: 1.05, letterSpacing: '0.02em', fontSize: height >= 300 ? '38px' : '22px' }}>
              {article.title}
            </h2>
          )}
          {height < 200 && (
            <p style={{ color: '#fff', fontSize: '13px', fontWeight: 700, margin: '6px 0 4px', lineHeight: 1.3 }}>{article.title}</p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#E8000D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '9px', fontWeight: 700, flexShrink: 0 }}>
              {article.authorIni}
            </div>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>{article.author}</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{article.timeAgo}</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Eye size={11} />{article.views.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Hero() {
  return (
    <section style={{ background: '#F4F4F4' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '20px 20px 0' }}>
        {/* ── Two-column: content + sidebar ─────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 288px', gap: '20px' }}>

          {/* ── LEFT: hero + secondary + latest ──────────────── */}
          <div>
            {/* Hero card */}
            <div style={{ marginBottom: '12px' }}>
              <ImgCard article={heroArticle} height={400} />
            </div>

            {/* 2-col secondary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
              {secondaryArticles.map(a => <ImgCard key={a.id} article={a} height={200} />)}
            </div>

            {/* Latest header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '2px solid #0A0A0A', paddingBottom: '10px', marginBottom: '16px' }}>
              <span className="font-display" style={{ fontSize: '22px', color: '#0A0A0A', letterSpacing: '0.02em' }}>LATEST NEWS</span>
              <div style={{ flex: 1, height: '1px', background: '#E4E4E4' }} />
              <Link href="/articles" style={{ fontSize: '12px', fontWeight: 700, color: '#E8000D', textDecoration: 'none', letterSpacing: '0.05em' }}>
                VIEW ALL →
              </Link>
            </div>

            {/* 4-col latest grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '32px' }}>
              {latestArticles.map(a => (
                <Link key={a.id} href={`/article/${a.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}>
                    <div style={{ height: '110px', background: a.bg, position: 'relative', overflow: 'hidden' }}>
                      <div className="img-grid-tex" />
                      <div className="img-overlay" />
                      <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1 }}>
                        <span style={{ background: CAT_COLORS[a.category] ?? '#888', color: '#fff', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: '2px' }}>
                          {a.category}
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: '10px 12px 12px' }}>
                      <p style={{ fontWeight: 700, fontSize: '13px', lineHeight: 1.4, color: '#0A0A0A', marginBottom: '8px' }}>{a.title}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#888' }}>
                        <span>{a.author}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Eye size={10} />{a.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ─────────────────────────────────── */}
          <div>
            {/* Trending widget */}
            <div style={{ background: '#fff', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ background: '#0A0A0A', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '10px', color: '#E8000D' }}>🔥</span>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Trending Now</span>
              </div>
              {latestArticles.map((a, i) => (
                <Link key={a.id} href={`/article/${a.id}`} style={{ display: 'flex', gap: '12px', padding: '12px 16px', borderBottom: i < 3 ? '1px solid #E4E4E4' : 'none', textDecoration: 'none' }}>
                  <span className="font-display" style={{ fontSize: '26px', color: i === 0 ? '#E8000D' : '#DDD', lineHeight: 1, width: '22px', flexShrink: 0 }}>{i + 1}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '13px', color: '#0A0A0A', lineHeight: 1.4, marginBottom: '4px' }}>{a.title}</p>
                    <span style={{ fontSize: '11px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={10} />{a.views.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Newsletter CTA */}
            <div style={{ background: '#0A0A0A', borderRadius: '4px', padding: '20px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '16px' }}>✉️</span>
                <span className="font-display" style={{ fontSize: '18px', color: '#fff', letterSpacing: '0.05em' }}>DAILY DIGEST</span>
              </div>
              <p style={{ fontSize: '13px', color: '#AAAAAA', lineHeight: 1.5, marginBottom: '14px' }}>
                Get the top Kenyan football stories every morning.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '3px', padding: '10px 14px', fontSize: '13px', color: '#888', marginBottom: '10px' }}>
                your@email.com
              </div>
              <Link href="/signup" style={{ display: 'block', background: '#E8000D', color: '#fff', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', padding: '10px', textDecoration: 'none', textTransform: 'uppercase', textAlign: 'center', borderRadius: '3px' }}>
                SUBSCRIBE FREE
              </Link>
            </div>

            {/* Ad placeholder */}
            <div style={{ background: '#EEEEEE', borderRadius: '4px', height: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed #CCCCCC' }}>
              <span style={{ fontSize: '10px', color: '#888', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Advertisement</span>
              <span style={{ fontSize: '10px', color: '#CCC', marginTop: '4px' }}>300 × 250</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
