'use client';

import { useState } from 'react';
import { UserPlus, UserX, RefreshCw } from 'lucide-react';

const initialWriters = [
  { id: 1, name: 'James Ochieng',  email: 'james@jestvsports.com', articles: 24, joined: 'Jan 2026', status: 'active'  as const },
  { id: 2, name: 'Amina Said',     email: 'amina@jestvsports.com', articles: 18, joined: 'Feb 2026', status: 'active'  as const },
  { id: 3, name: 'Kevin Mwangi',   email: 'kevin@jestvsports.com', articles: 9,  joined: 'Mar 2026', status: 'active'  as const },
  { id: 4, name: 'Fatuma Hassan',  email: 'fatuma@jestvsports.com',articles: 5,  joined: 'Feb 2026', status: 'revoked' as const },
];

export default function AdminWritersPage() {
  const [writers, setWriters]     = useState(initialWriters);
  const [inviteEmail, setInvite]  = useState('');
  const [sending, setSending]     = useState(false);
  const [sent, setSent]           = useState(false);

  const toggle = (id: number) => {
    setWriters(prev => prev.map(w => w.id === id
      ? { ...w, status: w.status === 'active' ? 'revoked' : 'active' }
      : w
    ));
  };

  const sendInvite = async () => {
    if (!inviteEmail) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    setSending(false); setSent(true); setInvite('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Writers</h1>
        <p className="text-muted-foreground mt-1">Manage your platform writers</p>
      </div>

      {/* Invite */}
      <div className="bg-card border border-border rounded-sm p-6 mb-8">
        <h2 className="font-bold text-foreground mb-4 flex items-center gap-2"><UserPlus size={18} />Invite a Writer</h2>
        <div className="flex gap-3">
          <input value={inviteEmail} onChange={e => setInvite(e.target.value)}
            placeholder="writer@email.com" type="email"
            className="flex-1 px-4 py-2 border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
          <button onClick={sendInvite} disabled={sending || !inviteEmail}
            className="px-5 py-2 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-accent transition-colors disabled:opacity-50 text-sm">
            {sending ? 'Sending...' : sent ? '✓ Sent!' : 'Send Invite'}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">The writer will receive a registration link via email. Link expires in 7 days.</p>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-bold text-foreground">All Writers ({writers.length})</h2>
        </div>
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              {['Writer', 'Email', 'Articles', 'Joined', 'Status', 'Action'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {writers.map((w, i) => (
              <tr key={w.id} className={`border-b border-border hover:bg-muted/10 ${i === writers.length - 1 ? 'border-0' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${w.status === 'active' ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {w.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium text-foreground text-sm">{w.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{w.email}</td>
                <td className="px-6 py-4 text-2xl font-bold text-foreground leading-none">{w.articles}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{w.joined}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${w.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {w.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => toggle(w.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors ${w.status === 'active' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                    {w.status === 'active' ? <><UserX size={11}/> Revoke</> : <><RefreshCw size={11}/> Restore</>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
