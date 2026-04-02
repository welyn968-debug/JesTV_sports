'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const viewsData = [
  { day: 'Mon', views: 340 }, { day: 'Tue', views: 520 }, { day: 'Wed', views: 410 },
  { day: 'Thu', views: 680 }, { day: 'Fri', views: 890 }, { day: 'Sat', views: 760 },
  { day: 'Sun', views: 921 },
];

const categoryData = [
  { name: 'Match Reports', views: 3200 },
  { name: 'Interviews',    views: 2341 },
  { name: 'Opinion',       views: 1321 },
];

const kpis = [
  { label: 'Total Views',        value: '6,862' },
  { label: 'Views This Week',    value: '921'   },
  { label: 'Articles Published', value: '24'    },
  { label: 'Total Comments',     value: '47'    },
];

export default function WriterAnalyticsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">My Analytics</h1>
        <p className="text-muted-foreground mt-1">Track your article performance</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map(k => (
          <div key={k.label} className="bg-card border border-border rounded-sm p-5">
            <p className="text-sm text-muted-foreground mb-1">{k.label}</p>
            <p className="text-3xl font-bold text-foreground">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Views over time */}
        <div className="bg-card border border-border rounded-sm p-6">
          <h2 className="font-bold text-foreground mb-1">Views Over Time</h2>
          <p className="text-sm text-muted-foreground mb-4">Last 7 days</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '6px' }} />
              <Line type="monotone" dataKey="views" stroke="var(--primary)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic by category */}
        <div className="bg-card border border-border rounded-sm p-6">
          <h2 className="font-bold text-foreground mb-1">Traffic by Category</h2>
          <p className="text-sm text-muted-foreground mb-4">All time</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} layout="vertical" barSize={13}>
              <XAxis type="number" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" width={95} stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '6px' }} />
              <Bar dataKey="views" fill="var(--primary)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
