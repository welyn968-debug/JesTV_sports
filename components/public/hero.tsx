import Link from 'next/link';
import { Eye, ChevronRight, Mail } from 'lucide-react';

const CAT_COLORS: Record<string, string> = {
  'Match Reports': '#E8000D',
  Transfers: '#FF6B00',
  Opinion: '#7B2FBE',
  Interviews: '#0066CC',
  Fixtures: '#00875A',
  Analysis: '#334155',
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
    id: '2',
    title: 'VICTOR WANYAMA RETURNS TO KPL - OFFICIAL CONFIRMATION',
    category: 'Transfers',
    author: 'Amina Said',
    authorIni: 'AS',
    timeAgo: '4 hours ago',
    views: 8932,
    bg: 'linear-gradient(135deg, #1a0a2e 0%, #2d1255 100%)',
  },
  {
    id: '3',
    title: 'WHY KENYA WILL QUALIFY FOR AFCON 2027',
    category: 'Opinion',
    author: 'Kevin Mwangi',
    authorIni: 'KM',
    timeAgo: '6 hours ago',
    views: 3210,
    bg: 'linear-gradient(135deg, #0a2d0a 0%, #155224 100%)',
  },
];

const latestArticles: HeroArticle[] = [
  {
    id: '1',
    title: 'Gor Mahia Clinch Title With Stunning 3-0 Win',
    category: 'Match Reports',
    author: 'James Ochieng',
    authorIni: 'JO',
    timeAgo: '2h ago',
    views: 4521,
    bg: 'linear-gradient(135deg, #0f1b36, #1a2d5a)',
  },
  {
    id: '2',
    title: 'Victor Wanyama Returns to KPL - Official Confirmation',
    category: 'Transfers',
    author: 'Amina Said',
    authorIni: 'AS',
    timeAgo: '4h ago',
    views: 8932,
    bg: 'linear-gradient(135deg, #1a0a2e, #2d1255)',
  },
  {
    id: '4',
    title: 'AFC Leopards New Signing: Press Conference Transcript',
    category: 'Interviews',
    author: 'James Ochieng',
    authorIni: 'JO',
    timeAgo: '1d ago',
    views: 2341,
    bg: 'linear-gradient(135deg, #2d0000, #550a0a)',
  },
  {
    id: '5',
    title: 'Premier League GW29: Full Results and Highlights',
    category: 'Match Reports',
    author: 'Amina Said',
    authorIni: 'AS',
    timeAgo: '1d ago',
    views: 6102,
    bg: 'linear-gradient(135deg, #0f1b36, #1a2d5a)',
  },
];

export function Hero() {
  return (
    <section>
      <div className="site-body">
        <div className="site-grid">
          <div>
            <Link href={`/article/${heroArticle.id}`} style={{ textDecoration: 'none' }}>
              <div className="img-card" style={{ height: 400, background: heroArticle.bg, marginBottom: 12 }}>
                <div className="grid-tex" />
                <div className="overlay" />
                <div className="content" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, zIndex: 1 }}>
                  <span className="cat-badge" style={{ background: CAT_COLORS[heroArticle.category] ?? '#888' }}>
                    {heroArticle.category}
                  </span>
                  <h1 className="font-display" style={{ fontSize: 40, color: '#fff', margin: '8px 0 10px', lineHeight: 1.05, letterSpacing: '0.02em' }}>
                    {heroArticle.title}
                  </h1>
                  <div className="card-meta">
                    <div className="card-author-av">{heroArticle.authorIni}</div>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{heroArticle.author}</span>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{heroArticle.timeAgo}</span>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Eye size={13} />
                      {heroArticle.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="secondary-grid">
              {secondaryArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                  <div className="img-card" style={{ height: 200, background: article.bg }}>
                    <div className="grid-tex" />
                    <div className="overlay" />
                    <div className="content" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14, zIndex: 1 }}>
                      <span className="cat-badge" style={{ background: CAT_COLORS[article.category] ?? '#888' }}>
                        {article.category}
                      </span>
                      <h3 className="font-display" style={{ fontSize: 22, color: '#fff', margin: '6px 0', lineHeight: 1.1, letterSpacing: '0.02em' }}>
                        {article.title}
                      </h3>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{article.author}</span>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Eye size={11} />
                          {article.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="latest-header">
              <span className="latest-title">LATEST NEWS</span>
              <div className="latest-line" />
              <Link href="/articles" style={{ fontSize: 12, fontWeight: 700, color: '#E8000D', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, letterSpacing: '0.05em' }}>
                VIEW ALL <ChevronRight size={13} />
              </Link>
            </div>

            <div className="latest-grid">
              {latestArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.id}`} className="latest-card">
                  <div className="img-card" style={{ height: 110, background: article.bg }}>
                    <div className="grid-tex" />
                    <div className="overlay" />
                    <div className="content" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10, zIndex: 1 }}>
                      <span className="cat-badge" style={{ background: CAT_COLORS[article.category] ?? '#888' }}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="latest-card-body">
                    <p className="latest-card-title">{article.title}</p>
                    <div className="latest-card-meta">
                      <span>{article.author}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Eye size={10} />
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="widget">
              <div className="widget-header">
                <span className="widget-title">Trending Now</span>
              </div>
              {latestArticles.map((article, index) => (
                <Link key={article.id} href={`/article/${article.id}`} className="trending-item">
                  <span className="trending-num" style={{ color: index === 0 ? 'var(--red)' : '#ddd' }}>
                    {index + 1}
                  </span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--black)', lineHeight: 1.4, marginBottom: 4 }}>
                      {article.title}
                    </p>
                    <span style={{ fontSize: 11, color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Eye size={10} />
                      {article.views.toLocaleString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="newsletter-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Mail size={16} color="#E8000D" />
                <span className="font-display" style={{ fontSize: 18, color: '#fff', letterSpacing: '0.05em' }}>
                  DAILY DIGEST
                </span>
              </div>
              <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.5, marginBottom: 14 }}>
                Get the top Kenyan football stories every morning.
              </p>
              <div className="newsletter-input">your@email.com</div>
              <Link href="/signup" className="btn-red" style={{ width: '100%', justifyContent: 'center', borderRadius: 3 }}>
                Subscribe Free
              </Link>
            </div>

            <div className="ad-placeholder">
              <span style={{ fontSize: 10, color: 'var(--muted-foreground)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Advertisement
              </span>
              <span style={{ fontSize: 10, color: '#ccc', marginTop: 4 }}>300 x 250</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
