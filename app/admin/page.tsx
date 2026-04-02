'use client';

import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Bell,
  FileText,
  LayoutGrid,
  Mail,
  MessageSquare,
  Pencil,
  Plus,
  Shield,
  Tag,
  Trash2,
  Users,
  Eye,
} from 'lucide-react';

const RED = '#E8000D';
const MUTED = '#888';
const BORDER = '#E8E8E8';
const CAT_COLORS: Record<string, string> = {
  'Match Reports': '#E8000D',
  Transfers: '#FF6B00',
  Opinion: '#7B2FBE',
  Interviews: '#0066CC',
  Fixtures: '#00875A',
  Analysis: '#334155',
};

const viewDataMap = {
  '7d': [
    { label: 'Mon', views: 1240 },
    { label: 'Tue', views: 1890 },
    { label: 'Wed', views: 1560 },
    { label: 'Thu', views: 2340 },
    { label: 'Fri', views: 2890 },
    { label: 'Sat', views: 3240 },
    { label: 'Sun', views: 2780 },
  ],
  '30d': [
    { label: 'W1', views: 8460 },
    { label: 'W2', views: 9320 },
    { label: 'W3', views: 10120 },
    { label: 'W4', views: 8920 },
  ],
  '90d': [
    { label: 'Jan', views: 32000 },
    { label: 'Feb', views: 35600 },
    { label: 'Mar', views: 38400 },
  ],
};

const categoryData = [
  { label: 'Match Rep.', views: 4200 },
  { label: 'Transfers', views: 3100 },
  { label: 'Opinion', views: 1800 },
  { label: 'Interviews', views: 2400 },
  { label: 'Fixtures', views: 900 },
];

const writers = [
  { initials: 'JO', name: 'James Ochieng', email: 'james@jestvsports.com', articles: 24, joined: 'Jan 2026', status: 'published' },
  { initials: 'AS', name: 'Amina Said', email: 'amina@jestvsports.com', articles: 18, joined: 'Feb 2026', status: 'published' },
  { initials: 'KM', name: 'Kevin Mwangi', email: 'kevin@jestvsports.com', articles: 9, joined: 'Mar 2026', status: 'published' },
  { initials: 'FH', name: 'Fatuma Hassan', email: 'fatuma@jestvsports.com', articles: 5, joined: 'Feb 2026', status: 'revoked' },
];

const articles = [
  { title: 'Gor Mahia Clinch Title With Stunning 3-0 Win', category: 'Match Reports', author: 'James Ochieng', status: 'published', views: '4,521', date: '19 Mar 2026' },
  { title: 'Victor Wanyama Returns to KPL - Official Confirmation', category: 'Transfers', author: 'Amina Said', status: 'published', views: '8,932', date: '18 Mar 2026' },
  { title: 'Why Kenya Will Qualify for AFCON 2027', category: 'Opinion', author: 'Kevin Mwangi', status: 'draft', views: '-', date: '17 Mar 2026' },
  { title: 'Premier League GW29: Full Results and Highlights', category: 'Match Reports', author: 'Amina Said', status: 'published', views: '6,102', date: '15 Mar 2026' },
];

const navItems = [
  { label: 'Dashboard', icon: LayoutGrid, active: true },
  { label: 'Articles', icon: FileText, badge: '51' },
  { label: 'Writers', icon: Users },
  { label: 'Categories', icon: Tag },
  { label: 'Comments', icon: MessageSquare, badge: '12' },
  { label: 'Subscribers', icon: Mail },
  { label: 'Settings', icon: Shield },
];

const kpis = [
  { label: 'Total Views (7d)', value: '15,924', badge: '+12%', icon: Eye, iconColor: RED, iconBg: 'rgba(232,0,13,0.1)' },
  { label: 'Articles Published', value: '51', badge: '+8%', icon: FileText, iconColor: '#0066CC', iconBg: 'rgba(0,102,204,0.1)' },
  { label: 'Active Writers', value: '3', badge: '-', icon: Users, iconColor: '#7B2FBE', iconBg: 'rgba(123,47,190,0.1)' },
  { label: 'Subscribers', value: '892', badge: '+24%', icon: Mail, iconColor: '#00875A', iconBg: 'rgba(0,135,90,0.1)' },
];

export default function AdminDashboard() {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('7d');
  const viewData = viewDataMap[range];

  return (
    <div className="dash-layout">
      <aside className="sidebar">
        <div className="sb-logo">
          <div className="sb-bar" />
          <div>
            <div className="sb-title">
              JESTV <span>SPORTS</span>
            </div>
            <div className="sb-sub">Admin Portal</div>
          </div>
        </div>
        <nav className="sb-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} className={`sb-item${item.active ? ' active' : ''}`} type="button">
                <Icon className="sb-icon" size={16} strokeWidth={2} />
                {item.label}
                {item.badge && <span className="sb-badge">{item.badge}</span>}
              </button>
            );
          })}
        </nav>
        <div className="sb-user">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="sb-avatar">AD</div>
            <div>
              <div className="sb-name">Admin</div>
              <div className="sb-role">Platform Admin</div>
            </div>
          </div>
          <button className="sb-signout" type="button">
            Sign out
          </button>
        </div>
      </aside>

      <div className="dash-main">
        <div className="topbar">
          <div>
            <div className="topbar-title">PLATFORM DASHBOARD</div>
            <div className="topbar-sub">Thursday, 19 March 2026</div>
          </div>
          <div className="topbar-right">
            <button className="btn-red" type="button">
              <Plus size={13} strokeWidth={2.5} />
              Invite Writer
            </button>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell size={18} color="#333" />
              <div style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, background: RED, borderRadius: '50%' }} />
            </div>
          </div>
        </div>

        <div className="dash-body">
          <div className="kpi-grid">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.label} className="kpi-card">
                  <div className="kpi-top">
                    <div className="kpi-icon" style={{ background: kpi.iconBg }}>
                      <Icon size={17} strokeWidth={2} color={kpi.iconColor} />
                    </div>
                    <span className="kpi-badge up">{kpi.badge}</span>
                  </div>
                  <div className="kpi-label">{kpi.label}</div>
                  <div className="kpi-value">{kpi.value}</div>
                </div>
              );
            })}
          </div>

          <div className="chart-grid">
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <div className="chart-title">Platform Views</div>
                  <div className="chart-sub">Last 7 days</div>
                </div>
                <div className="chart-tabs">
                  {(['7d', '30d', '90d'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`chart-tab${range === tab ? ' active' : ''}`}
                      onClick={() => setRange(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <AreaChart data={viewData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={RED} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={RED} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#F3F3F3" vertical={false} />
                    <XAxis dataKey="label" tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 12 }}
                      labelStyle={{ color: '#111', fontWeight: 600 }}
                    />
                    <Area type="monotone" dataKey="views" stroke={RED} strokeWidth={2.5} fill="url(#viewsFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <div>
                <div className="chart-title">Traffic by Category</div>
                <div className="chart-sub" style={{ marginBottom: 20 }}>
                  All time
                </div>
              </div>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={categoryData} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <CartesianGrid stroke="#F3F3F3" horizontal={false} />
                    <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="label" tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 12 }}
                      labelStyle={{ color: '#111', fontWeight: 600 }}
                    />
                    <Bar dataKey="views" fill={RED} radius={[4, 4, 4, 4]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="data-card">
            <div className="data-card-header">
              <span className="data-card-title">Writers</span>
              <button className="btn-dark" type="button">
                <Plus size={12} strokeWidth={2.5} />
                Invite Writer
              </button>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Writer</th>
                    <th>Email</th>
                    <th>Articles</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {writers.map((writer) => (
                    <tr key={writer.email}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div
                            className="avatar"
                            style={{
                              background: writer.status === 'revoked' ? '#f0f0f0' : 'rgba(232,0,13,0.15)',
                              color: writer.status === 'revoked' ? MUTED : RED,
                            }}
                          >
                            {writer.initials}
                          </div>
                          <span style={{ fontWeight: 600, color: 'var(--black)' }}>{writer.name}</span>
                        </div>
                      </td>
                      <td className="text-muted">{writer.email}</td>
                      <td style={{ fontFamily: 'var(--fd)', fontSize: 22, color: 'var(--black)', lineHeight: 1 }}>
                        {writer.articles}
                      </td>
                      <td className="text-muted">{writer.joined}</td>
                      <td>
                        <span className={`status-pill ${writer.status}`}>{writer.status}</span>
                      </td>
                      <td>
                        {writer.status === 'revoked' ? (
                          <button
                            style={{
                              padding: '4px 12px',
                              background: '#ECFDF5',
                              color: '#065F46',
                              border: 'none',
                              cursor: 'pointer',
                              borderRadius: 4,
                              fontWeight: 600,
                              fontSize: 11,
                            }}
                            type="button"
                          >
                            Restore
                          </button>
                        ) : (
                          <button className="btn-danger-soft" type="button">
                            Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="data-card">
            <div className="data-card-header">
              <span className="data-card-title">All Articles</span>
              <button className="btn-red" type="button">
                <Plus size={12} strokeWidth={2.5} />
                New Article
              </button>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Views</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.title}>
                      <td style={{ maxWidth: 240 }}>
                        <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--black)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
                          {article.title}
                        </p>
                      </td>
                      <td>
                        <span className="cat-badge" style={{ background: CAT_COLORS[article.category] ?? RED }}>
                          {article.category}
                        </span>
                      </td>
                      <td className="text-muted">{article.author}</td>
                      <td>
                        <span className={`status-pill ${article.status}`}>{article.status}</span>
                      </td>
                      <td style={{ fontFamily: 'var(--fd)', fontSize: 20, color: 'var(--black)', lineHeight: 1 }}>
                        {article.views}
                      </td>
                      <td className="text-muted">{article.date}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn-blue" type="button">
                            <Pencil size={10} />
                            Edit
                          </button>
                          <button className="btn-icon-danger" type="button">
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
