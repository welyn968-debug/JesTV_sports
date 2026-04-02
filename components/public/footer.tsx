import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  const cols = [
    {
      heading: 'Content',
      links: [
        { label: 'Articles',   href: '/articles'   },
        { label: 'Categories', href: '/categories' },
        { label: 'Authors',    href: '/authors'    },
      ],
    },
    {
      heading: 'About',
      links: [
        { label: 'About Us',  href: '/about'     },
        { label: 'Contact',   href: '/contact'   },
        { label: 'Advertise', href: '/advertise' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy',   href: '/privacy' },
        { label: 'Terms of Service', href: '/terms'   },
      ],
    },
  ];

  return (
    <footer style={{ background: '#0A0A0A', borderTop: '3px solid #E8000D', marginTop: '48px' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '40px 20px 24px' }}>
        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '32px', marginBottom: '40px' }}>
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div style={{ background: '#E8000D', width: '5px', height: '28px', borderRadius: '1px' }} />
              <span style={{ fontFamily: 'var(--font-bebas, "Bebas Neue", Impact, sans-serif)', fontSize: '22px', color: '#fff', letterSpacing: '0.05em' }}>
                JESTV <span style={{ color: '#E8000D' }}>SPORTS</span>
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6 }}>
              Kenya's home for football journalism. KPL, Harambee Stars & global football.
            </p>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '14px' }}>
                {col.heading}
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {col.links.map(l => (
                  <Link key={l.href} href={l.href}
                    style={{ color: '#888', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <p style={{ fontSize: '12px', color: '#555' }}>
            © {year} JESTV SPORTS. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Twitter', 'Instagram', 'Facebook'].map(s => (
              <a key={s} href={`https://${s.toLowerCase()}.com`}
                style={{ fontSize: '12px', color: '#555', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E8000D')}
                onMouseLeave={e => (e.currentTarget.style.color = '#555')}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
