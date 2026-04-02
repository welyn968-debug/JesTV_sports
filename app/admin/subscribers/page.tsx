import { Mail, Users, TrendingUp } from 'lucide-react';

export default function AdminSubscribersPage() {
  const stats = [
    { label: 'Total Subscribers', value: '892',  icon: Users,      color: '#00875A' },
    { label: 'Confirmed',         value: '834',  icon: Mail,       color: '#0066CC' },
    { label: 'This Month',        value: '+124', icon: TrendingUp, color: '#E8000D' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Subscribers</h1>
        <p className="text-muted-foreground mt-1">Email list overview</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-card border border-border rounded-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${s.color}18` }}>
                  <Icon size={18} style={{ color: s.color }} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{s.label}</p>
              <p className="text-3xl font-bold text-foreground">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-foreground">Recent Subscribers</h2>
          <button className="px-4 py-2 border border-border rounded-sm text-sm font-medium text-foreground hover:bg-muted transition-colors">
            Export CSV
          </button>
        </div>
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              {['Email', 'Status', 'Joined'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { email: 'peter@gmail.com',   confirmed: true,  joined: '19 Mar 2026' },
              { email: 'sarah@outlook.com', confirmed: true,  joined: '18 Mar 2026' },
              { email: 'john@yahoo.com',    confirmed: false, joined: '18 Mar 2026' },
              { email: 'amina@gmail.com',   confirmed: true,  joined: '17 Mar 2026' },
            ].map((s, i, arr) => (
              <tr key={s.email} className={`hover:bg-muted/10 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
                <td className="px-4 py-3 text-sm text-foreground font-medium">{s.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${s.confirmed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {s.confirmed ? 'Confirmed' : 'Pending'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{s.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
