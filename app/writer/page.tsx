'use client';

import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { Eye, MessageSquare, Heart, Plus } from 'lucide-react';

const playfair = Playfair_Display({ subsets: ['latin'] });

// Mock data - replace with API calls
const writerStats = {
  totalViews: 15420,
  totalComments: 342,
  totalLikes: 1203,
  articlesPublished: 24,
};

const recentArticles = [
  {
    id: 1,
    title: 'The Evolution of Modern Football Tactics in 2025',
    status: 'published',
    views: 3420,
    comments: 42,
    likes: 156,
    publishedDate: '3 days ago',
  },
  {
    id: 2,
    title: 'Young Talent: The Next Generation of Elite Defenders',
    status: 'published',
    views: 2890,
    comments: 38,
    likes: 124,
    publishedDate: '1 week ago',
  },
  {
    id: 3,
    title: 'Draft Article: Transfer Window Analysis',
    status: 'draft',
    views: 0,
    comments: 0,
    likes: 0,
    publishedDate: '2 days ago',
  },
];

export default function WriterDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className={`${playfair.className} text-4xl font-bold text-foreground mb-2`}>
            Welcome Back
          </h1>
          <p className="text-muted-foreground">Manage your articles and track your performance</p>
        </div>
        <Link
          href="/writer/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-accent transition-colors"
        >
          <Plus size={20} />
          New Article
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Views', value: writerStats.totalViews, icon: Eye },
          { label: 'Total Comments', value: writerStats.totalComments, icon: MessageSquare },
          { label: 'Total Likes', value: writerStats.totalLikes, icon: Heart },
          { label: 'Published', value: writerStats.articlesPublished, icon: null },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-card border border-border p-6 rounded-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </p>
                </div>
                {Icon && <Icon size={24} className="text-muted-foreground" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Articles */}
      <div>
        <h2 className={`${playfair.className} text-2xl font-bold text-foreground mb-6`}>
          Recent Articles
        </h2>
        <div className="border border-border rounded-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-foreground">Views</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-foreground">Comments</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-foreground">Likes</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Published</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentArticles.map((article) => (
                <tr key={article.id} className="border-b border-border hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground text-sm text-pretty">{article.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-sm text-xs font-medium ${
                        article.status === 'published'
                          ? 'bg-green-100/20 text-green-700'
                          : 'bg-yellow-100/20 text-yellow-700'
                      }`}
                    >
                      {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                    {article.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                    {article.comments}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                    {article.likes}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{article.publishedDate}</td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      href={`/writer/articles/${article.id}`}
                      className="text-primary hover:text-accent text-sm font-medium"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
