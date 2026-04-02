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
  MessageSquare,
  Pencil,
  Plus,
  TrendingUp,
  User,
  BarChart3,
  Eye,
  Trash2,
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

const kpis = [
  { label: 'My Total Views', value: '6,862', badge: '+8%', icon: Eye, iconColor: RED, iconBg: 'rgba(232,0,13,0.1)' },
  { label: 'My Articles', value: '24', badge: '4 new', icon: FileText, iconColor: '#0066CC', iconBg: 'rgba(0,102,204,0.1)' },
  { label: 'Comments', value: '47', badge: '+12%', icon: MessageSquare, iconColor: '#7B2FBE', iconBg: 'rgba(123,47,190,0.1)' },
  { label: 'Views This Week', value: '921', badge: 'vs last wk', icon: TrendingUp, iconColor: '#00875A', iconBg: 'rgba(0,135,90,0.1)' },
];

const writerViews = [
  { label: 'Mon', views: 340 },
  { label: 'Tue', views: 520 },
  { label: 'Wed', views: 410 },
  { label: 'Thu', views: 680 },
  { label: 'Fri', views: 890 },
  { label: 'Sat', views: 760 },
  { label: 'Sun', views: 921 },
];

const writerCategories = [
  { label: 'Match Rep.', views: 3200 },
  { label: 'Interviews', views: 2341 },
  { label: 'Opinion', views: 1321 },
];

const allArticles = [
  { title: 'Gor Mahia Clinch Title With Stunning 3-0 Win', category: 'Match Reports', author: 'James Ochieng', status: 'published', views: '4,521', date: '19 Mar' },
  { title: 'Victor Wanyama Returns to KPL - Official', category: 'Transfers', author: 'Amina Said', status: 'published', views: '8,932', date: '18 Mar' },
  { title: 'Why Kenya Will Qualify for AFCON 2027', category: 'Opinion', author: 'Kevin Mwangi', status: 'draft', views: '-', date: '17 Mar' },
  { title: 'AFC Leopards New Signing: Press Conference', category: 'Interviews', author: 'James Ochieng', status: 'published', views: '2,341', date: '16 Mar' },
];

const myArticles = [
  { title: 'Gor Mahia Clinch Title With Stunning 3-0 Win', category: 'Match Reports', status: 'published', views: '4,521', date: '19 Mar' },
  { title: 'AFC Leopards New Signing: Press Conference', category: 'Interviews', status: 'published', views: '2,341', date: '16 Mar' },
];

const comments = [
  { initials: 'PK', name: 'Peter Kamau', ref: 'Gor Mahia Clinch Title...', body: 'Great match analysis! Gor Mahia was dominant throughout.', time: '1h ago' },
  { initials: 'SN', name: 'Sarah Njoki', ref: 'Victor Wanyama Returns...', body: 'The Wanyama return is huge for Kenyan football. Great piece.', time: '3h ago' },
  { initials: 'DO', name: 'Denis Otieno', ref: 'Gor Mahia Clinch Title...', body: 'I agree with most points but the midfield work was underrated.', time: '5h ago' },
];

const navItems = [
  { label: 'Dashboard', icon: LayoutGrid, active: true },
  { label: 'My Articles', icon: FileText, badge: '24' },
  { label: 'New Article', icon: Pencil },
  { label: 'Comments', icon: MessageSquare, badge: '7' },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'My Profile', icon: User },
];

export default function WriterDashboard() {
  const [tab, setTab] = useState<'all' | 'mine'>('all');

  return (
    <div className="dash-layout">
      <aside className="sidebar">
        <div className="sb-logo">
          <div className="sb-bar" />
          <div>
            <div className="sb-title">
              JESTV <span>SPORTS</span>
            </div>
            <div className="sb-sub">Writer Portal</div>
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
            <div className="sb-avatar">JO</div>
            <div>
              <div className="sb-name">James Ochieng</div>
              <div className="sb-role">Sports Writer</div>
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
            <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--black)' }}>Good morning, James</div>
            <div className="topbar-sub">Thursday, 19 March 2026</div>
          </div>
          <div className="topbar-right">
            <button className="btn-red" type="button">
              <Plus size={13} strokeWidth={2.5} />
              New Article
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
                  <div className="chart-title">My Views</div>
                  <div className="chart-sub">Last 7 days</div>
                </div>
                <div className="trend-badge up">
                  <TrendingUp size={13} strokeWidth={2.5} />
                  <span style={{ fontWeight: 700, fontSize: 12 }}>+8% vs last week</span>
                </div>
              </div>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <AreaChart data={writerViews} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="writerViewsFill" x1="0" y1="0" x2="0" y2="1">
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
                    <Area type="monotone" dataKey="views" stroke={RED} strokeWidth={2.5} fill="url(#writerViewsFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-title">My Traffic by Category</div>
              <div className="chart-sub" style={{ marginBottom: 20 }}>
                All time
              </div>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={writerCategories} layout="vertical" margin={{ left: 20, right: 20 }}>
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
              <div className="tab-row">
                <button
                  className={`tab-btn${tab === 'all' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setTab('all')}
                >
                  All Articles
                </button>
                <button
                  className={`tab-btn${tab === 'mine' ? ' active' : ''}`}
                  type="button"
                  onClick={() => setTab('mine')}
                >
                  My Articles
                </button>
              </div>
              <button className="btn-red" type="button">
                <Plus size={12} strokeWidth={2.5} />
                New Article
              </button>
            </div>
            <div className="table-scroll">
              {tab === 'all' ? (
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
                    {allArticles.map((article) => (
                      <tr key={article.title}>
                        <td style={{ maxWidth: 240 }}>
                          <p style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
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
                        <td style={{ fontFamily: 'var(--fd)', fontSize: 20, lineHeight: 1 }}>{article.views}</td>
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
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Views</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myArticles.map((article) => (
                      <tr key={article.title}>
                        <td style={{ maxWidth: 280 }}>
                          <p style={{ fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
                            {article.title}
                          </p>
                        </td>
                        <td>
                          <span className="cat-badge" style={{ background: CAT_COLORS[article.category] ?? RED }}>
                            {article.category}
                          </span>
                        </td>
                        <td>
                          <span className={`status-pill ${article.status}`}>{article.status}</span>
                        </td>
                        <td style={{ fontFamily: 'var(--fd)', fontSize: 20, lineHeight: 1 }}>{article.views}</td>
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
              )}
            </div>
          </div>

          <div className="data-card">
            <div className="data-card-header">
              <span className="data-card-title">Recent Comments on My Articles</span>
            </div>
            {comments.map((comment) => (
              <div key={comment.body} className="comment-item">
                <div style={{ display: 'flex', gap: 12, flex: 1 }}>
                  <div className="avatar" style={{ background: '#f0f0f0', color: 'var(--muted-foreground)' }}>
                    {comment.initials}
                  </div>
                  <div>
                    <div className="comment-meta">
                      <span className="comment-name">{comment.name}</span>
                      <span className="comment-ref">
                        on <span>{comment.ref}</span>
                      </span>
                    </div>
                    <div className="comment-body">{comment.body}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, marginLeft: 16, flexShrink: 0 }}>
                  <span className="text-xs text-muted">{comment.time}</span>
                  <button className="btn-danger-soft" type="button">
                    Hide
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
