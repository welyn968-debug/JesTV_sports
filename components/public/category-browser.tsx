'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Category {
  id: string
  name: string
  description: string
  articleCount: number
  color: string
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Analysis',
    description: 'Deep-dive tactical and performance analysis',
    articleCount: 234,
    color: 'from-blue-500/10 to-transparent',
  },
  {
    id: '2',
    name: 'Transfer News',
    description: 'Latest updates on player movements',
    articleCount: 189,
    color: 'from-green-500/10 to-transparent',
  },
  {
    id: '3',
    name: 'Talent Scouting',
    description: 'Emerging players and young prospects',
    articleCount: 156,
    color: 'from-purple-500/10 to-transparent',
  },
  {
    id: '4',
    name: 'Team Reports',
    description: 'Season reviews and team performance',
    articleCount: 198,
    color: 'from-orange-500/10 to-transparent',
  },
  {
    id: '5',
    name: 'Opinion',
    description: 'Expert perspectives and debates',
    articleCount: 267,
    color: 'from-red-500/10 to-transparent',
  },
  {
    id: '6',
    name: 'Tournament Coverage',
    description: 'Champions League and cup competitions',
    articleCount: 145,
    color: 'from-yellow-500/10 to-transparent',
  },
]

export function CategoryBrowser() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Explore by Category
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse our content by topic
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <div className={`group relative h-full p-6 rounded-xl bg-gradient-to-br ${category.color} border border-border hover:border-primary/50 transition cursor-pointer overflow-hidden`}>
                  {/* Background accent */}
                  <div className="absolute inset-0 bg-card opacity-0 group-hover:opacity-5 transition" />
                  
                  <div className="relative space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {category.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {category.articleCount} articles
                      </span>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
