'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const supabase = createClient();
      if (!supabase) { setError('Auth is not configured.'); return; }
      const { data, error: authError } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
      if (authError) { setError(authError.message); return; }
      if (data?.user) router.push('/login?message=Check your email to confirm your account');
    } catch { setError('An unexpected error occurred'); }
    finally { setLoading(false); }
  }

  const inputStyle = { width: '100%', padding: '11px 14px', border: '1px solid #E4E4E4', borderRadius: '4px', background: '#FAFAFA', fontSize: '14px', color: '#0A0A0A', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.15s' };
  const labelStyle = { display: 'block' as const, fontSize: '12px', fontWeight: 700 as const, color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '6px' };

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: '#E8000D', width: '6px', height: '32px', borderRadius: '1px' }} />
            <span className="font-display" style={{ fontSize: '28px', color: '#0A0A0A', letterSpacing: '0.06em' }}>
              JESTV <span style={{ color: '#E8000D' }}>SPORTS</span>
            </span>
          </Link>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E4E4E4', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '4px', background: '#E8000D' }} />
          <div style={{ padding: '32px' }}>
            <h1 className="font-display" style={{ fontSize: '32px', color: '#0A0A0A', letterSpacing: '0.04em', marginBottom: '6px' }}>CREATE ACCOUNT</h1>
            <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px' }}>Join JESTV SPORTS — Kenya's football home</p>

            {error && (
              <div style={{ padding: '12px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '4px', color: '#991B1B', fontSize: '13px', marginBottom: '16px', borderLeft: '4px solid #E8000D' }}>{error}</div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="James Ochieng" style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = '#E8000D')} onBlur={e => (e.currentTarget.style.borderColor = '#E4E4E4')}/>
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = '#E8000D')} onBlur={e => (e.currentTarget.style.borderColor = '#E4E4E4')}/>
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = '#E8000D')} onBlur={e => (e.currentTarget.style.borderColor = '#E4E4E4')}/>
                <p style={{ fontSize: '12px', color: '#AAA', marginTop: '4px' }}>Minimum 6 characters</p>
              </div>
              <button type="submit" disabled={loading}
                style={{ background: '#E8000D', color: '#fff', border: 'none', borderRadius: '4px', padding: '13px', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, fontFamily: 'inherit' }}>
                {loading ? 'CREATING ACCOUNT…' : 'SIGN UP FREE'}
              </button>
            </form>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #F0F0F0' }}>
              <p style={{ fontSize: '13px', color: '#888' }}>
                Already have an account?{' '}
                <Link href="/login" style={{ color: '#E8000D', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
