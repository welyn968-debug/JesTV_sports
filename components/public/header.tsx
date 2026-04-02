'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV_CATS = [
  { label: 'KPL',               href: '/category/1' },
  { label: 'Premier League',    href: '/category/2' },
  { label: 'Champions League',  href: '/category/6' },
  { label: 'La Liga',           href: '/category/3' },
  { label: 'Transfers',         href: '/category/4' },
  { label: 'Opinion',           href: '/category/5' },
  { label: 'Interviews',        href: '/articles'   },
];

const TICKER = 'Gor Mahia clinch KPL title with 3-0 win \u00a0•\u00a0 Victor Wanyama confirmed for KPL return \u00a0•\u00a0 Harambee Stars AFCON 2027 qualifying squad named \u00a0•\u00a0 Man City vs Arsenal match preview \u00a0•\u00a0 Chelsea agree €45M deal for Michael Otieno \u00a0•\u00a0 ';

export default function Header() {
  const { user, profile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      {/* ── Black top nav ───────────────────────────────────── */}
      <nav style={{ background: '#0A0A0A', borderBottom: '3px solid #E8000D' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 20px' }}>
          {/* Logo row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '58px' }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <div style={{ background: '#E8000D', width: '7px', height: '38px', borderRadius: '1px', flexShrink: 0 }} />
              <span className="font-display" style={{ fontSize: '26px', color: '#fff', letterSpacing: '0.06em', lineHeight: 1 }}>
                JESTV <span style={{ color: '#E8000D' }}>SPORTS</span>
              </span>
            </Link>

            {/* Right side: search + auth */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {/* Search pill */}
              <div className="hidden md:flex" style={{ alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', padding: '6px 12px' }}>
                <Search size={14} color="#888" />
                <span style={{ fontSize: '13px', color: '#888' }}>Search articles…</span>
              </div>

              {/* Auth / dashboard links */}
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {profile?.role === 'writer' && (
                    <Link href="/writer" style={{ fontSize: '12px', fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.05em' }}>
                      DASHBOARD
                    </Link>
                  )}
                  {profile?.role === 'admin' && (
                    <Link href="/admin" style={{ fontSize: '12px', fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.05em' }}>
                      ADMIN
                    </Link>
                  )}
                  <button onClick={() => fetch('/api/auth/signout', { method: 'POST' }).then(() => window.location.href = '/')}
                    style={{ fontSize: '12px', color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link href="/login"
                  style={{ background: '#E8000D', color: '#fff', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', padding: '8px 20px', textDecoration: 'none', borderRadius: '2px', textTransform: 'uppercase' }}>
                  SIGN IN
                </Link>
              )}

              {/* Mobile hamburger */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Category tab strip — desktop */}
          <div className="hidden md:flex" style={{ overflowX: 'auto' }}>
            {NAV_CATS.map(cat => {
              const isActive = pathname === cat.href;
              return (
                <Link key={cat.href} href={cat.href}
                  style={{
                    color: isActive ? '#E8000D' : '#CCCCCC',
                    fontWeight: 600, fontSize: '13px', letterSpacing: '0.05em',
                    textTransform: 'uppercase', padding: '11px 18px',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    borderBottom: isActive ? '2px solid #E8000D' : '2px solid transparent',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}>
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── Breaking news ticker ────────────────────────────── */}
      <div style={{ background: '#E8000D', display: 'flex', alignItems: 'center', height: '34px', overflow: 'hidden' }}>
        <div style={{ background: '#980009', color: '#fff', fontWeight: 800, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0 16px', height: '100%', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          🔴 LIVE
        </div>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div className="ticker-animate" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: '12px', letterSpacing: '0.03em', padding: '0 20px' }}>
              {TICKER + TICKER}
            </span>
          </div>
        </div>
      </div>

      {/* ── Mobile nav menu ─────────────────────────────────── */}
      {menuOpen && (
        <div style={{ background: '#111', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '12px' }}>
            {NAV_CATS.map(cat => (
              <Link key={cat.href} href={cat.href} onClick={() => setMenuOpen(false)}
                style={{ color: '#ccc', fontWeight: 600, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', padding: '10px 4px', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {cat.label}
              </Link>
            ))}
          </div>
          {!user && (
            <Link href="/login" onClick={() => setMenuOpen(false)}
              style={{ display: 'block', background: '#E8000D', color: '#fff', fontWeight: 700, fontSize: '13px', textAlign: 'center', padding: '10px', textDecoration: 'none', borderRadius: '2px', textTransform: 'uppercase' }}>
              SIGN IN
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
