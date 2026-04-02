'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const supabase = createClient();
      if (!supabase) { setError('Auth is not configured.'); return; }
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) { setError(authError.message); return; }
      if (data?.user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
        if (profile?.role === 'admin')        router.push('/admin');
        else if (profile?.role === 'writer')  router.push('/writer');
        else                                  router.push('/');
      }
    } catch { setError('An unexpected error occurred'); }
    finally { setLoading(false); }
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px', border: '1px solid #E4E4E4', borderRadius: '4px',
    background: '#FAFAFA', fontSize: '14px', color: '#0A0A0A', outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.15s',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: '#E8000D', width: '6px', height: '32px', borderRadius: '1px' }} />
            <span className="font-display" style={{ fontSize: '28px', color: '#0A0A0A', letterSpacing: '0.06em' }}>
              JESTV <span style={{ color: '#E8000D' }}>SPORTS</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', border: '1px solid #E4E4E4', borderRadius: '4px', overflow: 'hidden' }}>
          {/* Red top bar */}
          <div style={{ height: '4px', background: '#E8000D' }} />
          <div style={{ padding: '32px' }}>
            <h1 className="font-display" style={{ fontSize: '32px', color: '#0A0A0A', letterSpacing: '0.04em', marginBottom: '6px' }}>SIGN IN</h1>
            <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px' }}>Access your JESTV SPORTS account</p>

            {error && (
              <div style={{ padding: '12px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '4px', color: '#991B1B', fontSize: '13px', marginBottom: '16px', borderLeft: '4px solid #E8000D' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="you@example.com" style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = '#E8000D')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#E4E4E4')}/>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••" style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = '#E8000D')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#E4E4E4')}/>
              </div>
              <button type="submit" disabled={loading}
                style={{ background: '#E8000D', color: '#fff', border: 'none', borderRadius: '4px', padding: '13px', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'opacity 0.15s, background 0.15s', fontFamily: 'inherit' }}
                onMouseEnter={e => { if (!loading) (e.currentTarget.style.background = '#CC0008') }}
                onMouseLeave={e => (e.currentTarget.style.background = '#E8000D')}>
                {loading ? 'SIGNING IN…' : 'SIGN IN'}
              </button>
            </form>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #F0F0F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ fontSize: '13px', color: '#888' }}>
                No account?{' '}
                <Link href="/signup" style={{ color: '#E8000D', fontWeight: 700, textDecoration: 'none' }}>Sign up free</Link>
              </p>
              <p style={{ fontSize: '13px', color: '#888' }}>
                <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>← Back to site</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
