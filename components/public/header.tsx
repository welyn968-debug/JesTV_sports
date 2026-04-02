'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV_CATS = [
  { label: 'KPL', href: '/category/1' },
  { label: 'Premier League', href: '/category/2' },
  { label: 'Champions League', href: '/category/6' },
  { label: 'La Liga', href: '/category/3' },
  { label: 'Transfers', href: '/category/4' },
  { label: 'Opinion', href: '/category/5' },
  { label: 'Interviews', href: '/articles' },
];

const TICKER_ITEMS = [
  'Gor Mahia clinch KPL title with 3-0 win',
  'Victor Wanyama confirmed for KPL return',
  'Harambee Stars AFCON 2027 qualifying squad named',
  'Man City vs Arsenal match preview',
  'Chelsea agree 45M deal for Michael Otieno',
  'AFC Leopards unveil new stadium plans',
];
const TICKER_TEXT = [...TICKER_ITEMS, ...TICKER_ITEMS].join(' | ') + ' | ';

export default function Header() {
  const { user, profile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      <nav className="site-nav">
        <div className="site-nav-inner">
          <div className="site-nav-top">
            <Link href="/" className="site-logo">
              <div className="site-logo-bar" />
              <div className="site-logo-text">
                JESTV <span>SPORTS</span>
              </div>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="site-search">
                <Search size={14} color="#888" />
                <span>Search articles...</span>
              </div>

              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {profile?.role === 'writer' && (
                    <Link href="/writer" className="btn-red">
                      Dashboard
                    </Link>
                  )}
                  {profile?.role === 'admin' && (
                    <Link href="/admin" className="btn-red">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => fetch('/api/auth/signout', { method: 'POST' }).then(() => window.location.href = '/')}
                    style={{ fontSize: '12px', color: '#888', background: 'none', border: 'none' }}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link href="/login" className="btn-red">
                  Sign In
                </Link>
              )}

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden"
                style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          <div className="hidden md:flex site-cats">
            {NAV_CATS.map((cat) => {
              const isActive = pathname === cat.href;
              return (
                <Link key={cat.href} href={cat.href} className={`site-cat${isActive ? ' active' : ''}`}>
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="site-ticker">
        <div className="ticker-label">LIVE</div>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            <span className="ticker-text">{TICKER_TEXT}</span>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: '#111', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '12px' }}>
            {NAV_CATS.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: '#ccc',
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  padding: '10px 4px',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                {cat.label}
              </Link>
            ))}
          </div>
          {!user && (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                background: '#E8000D',
                color: '#fff',
                fontWeight: 700,
                fontSize: '13px',
                textAlign: 'center',
                padding: '10px',
                textDecoration: 'none',
                borderRadius: '2px',
                textTransform: 'uppercase',
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
