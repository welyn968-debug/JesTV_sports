'use client';

import { Playfair_Display } from 'next/font/google';
import { Users, FileText, MessageSquare, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const playfair = Playfair_Display({ subsets: ['latin'] });

const platformStats = {
  totalWriters: 24,
  totalArticles: 856,
  totalComments: 12450,
  platformViews: 234560,
};

const revenueData = [
  { month: 'Jan', revenue: 2400 },
  { month: 'Feb', revenue: 3200 },
  { month: 'Mar', revenue: 2800 },
  { month: 'Apr', revenue: 3900 },
  { month: 'May', revenue: 5200 },
  { month: 'Jun', revenue: 6100 },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className={`${playfair.className} text-4xl font-bold text-foreground mb-2`}>
          Platform Dashboard
        </h1>
        <p className="text-muted-foreground">Monitor and manage your publishing platform</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Active Writers', value: platformStats.totalWriters, icon: Users },
          { label: 'Published Articles', value: platformStats.totalArticles, icon: FileText },
          { label: 'Total Comments', value: platformStats.totalComments, icon: MessageSquare },
          { label: 'Platform Views', value: platformStats.platformViews, icon: TrendingUp },
        ].map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-card border border-border p-6 rounded-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-foreground">
                    {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                  </p>
                </div>
                <Icon size={24} className="text-muted-foreground" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="md:col-span-2 bg-card border border-border p-6 rounded-sm">
          <h2 className={`${playfair.className} text-xl font-bold text-foreground mb-6`}>
            Platform Revenue Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border p-6 rounded-sm">
          <h2 className={`${playfair.className} text-xl font-bold text-foreground mb-6`}>
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-accent transition-colors text-sm">
              Approve Pending Articles
            </button>
            <button className="w-full px-4 py-3 border border-border text-foreground rounded-sm font-medium hover:bg-muted transition-colors text-sm">
              Review Comments
            </button>
            <button className="w-full px-4 py-3 border border-border text-foreground rounded-sm font-medium hover:bg-muted transition-colors text-sm">
              Manage Writers
            </button>
            <button className="w-full px-4 py-3 border border-border text-foreground rounded-sm font-medium hover:bg-muted transition-colors text-sm">
              Platform Settings
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-card border border-border p-6 rounded-sm">
        <h2 className={`${playfair.className} text-xl font-bold text-foreground mb-6`}>
          Recent Platform Activity
        </h2>
        <div className="space-y-4">
          {[
            { action: 'New article published', user: 'James Mitchell', time: '2 hours ago' },
            { action: 'Writer invited', user: 'Sarah Johnson', time: '4 hours ago' },
            { action: 'Comment flagged as spam', user: 'System', time: '6 hours ago' },
            { action: 'Platform settings updated', user: 'Admin', time: '1 day ago' },
            { action: 'New writer registered', user: 'Michael Chen', time: '2 days ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.user}</p>
              </div>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
