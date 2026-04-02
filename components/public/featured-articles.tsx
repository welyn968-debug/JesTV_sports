'use client'

import Link from 'next/link'
import { ArrowRight, Eye, MessageCircle } from 'lucide-react'

interface ArticleCard {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  readTime: number
  views: number
  comments: number
  date: string
}

const articles: ArticleCard[] = [
  {
    id: '1',
    title: 'Manchester City Dominates Europa: Season Analysis',
    excerpt: 'Breaking down how Guardiola\'s tactical innovations secured another championship.',
    category: 'Analysis',
    author: 'Sarah Williams',
    readTime: 8,
    views: 12400,
    comments: 234,
    date: 'Mar 15, 2025',
  },
  {
    id: '2',
    title: 'Rising Stars: Young Talents Reshaping Football',
    excerpt: 'Discover the emerging players who are poised to dominate the next decade.',
    category: 'Talent Scouting',
    author: 'James Rodriguez',
    readTime: 6,
    views: 8900,
    comments: 156,
    date: 'Mar 14, 2025',
  },
  {
    id: '3',
    title: 'Transfer Market Predictions: Summer 2025',
    excerpt: 'Expert predictions on the biggest moves happening this summer transfer window.',
    category: 'Transfer News',
    author: 'Emma Johnson',
    readTime: 7,
    views: 15600,
    comments: 342,
    date: 'Mar 13, 2025',
  },
]

export function FeaturedArticles() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Articles
            </h2>
            <p className="text-lg text-muted-foreground">
              Curated insights from our expert writers
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/article/${article.id}`}>
                <article className="group h-full bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition space-y-4 cursor-pointer">
                  {/* Category Tag */}
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                      {article.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.date}</span>
                      <span>{article.readTime} min read</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{(article.views / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{article.comments}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary rounded-full" />
                      <span className="text-xs font-medium text-foreground">{article.author}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/articles" className="inline-block">
              <button className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground hover:bg-muted rounded-sm font-medium transition-colors">
                View All Articles
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
