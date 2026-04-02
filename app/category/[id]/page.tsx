import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import Link from 'next/link';
import { ArrowLeft, Eye, MessageCircle } from 'lucide-react';

const categories: Record<string, { name: string; description: string; color: string }> = {
  '1': { name: 'Analysis',           description: 'Deep-dive tactical and performance analysis', color: 'bg-blue-500/10'   },
  '2': { name: 'Transfer News',       description: 'Latest updates on player movements',          color: 'bg-green-500/10'  },
  '3': { name: 'Talent Scouting',     description: 'Emerging players and young prospects',        color: 'bg-purple-500/10' },
  '4': { name: 'Team Reports',        description: 'Season reviews and team performance',         color: 'bg-orange-500/10' },
  '5': { name: 'Opinion',             description: 'Expert perspectives and debates',             color: 'bg-red-500/10'    },
  '6': { name: 'Tournament Coverage', description: 'Champions League and cup competitions',       color: 'bg-yellow-500/10' },
};

const sampleArticles = [
  { id: '1', title: 'Manchester City Dominates Europa: Season Analysis',     excerpt: "Breaking down Guardiola's tactical innovations.",           author: 'Sarah Williams', views: 12400, comments: 234, date: 'Mar 15, 2025', readTime: 8 },
  { id: '2', title: 'Rising Stars: Young Talents Reshaping Football',        excerpt: 'Discover players poised to dominate the next decade.',       author: 'James Rodriguez', views: 8900,  comments: 156, date: 'Mar 14, 2025', readTime: 6 },
  { id: '3', title: 'Transfer Market Predictions: Summer 2025',              excerpt: 'Expert predictions on the biggest summer moves.',             author: 'Emma Johnson',   views: 15600, comments: 342, date: 'Mar 13, 2025', readTime: 7 },
  { id: '4', title: "Liverpool's New Era: Tactics Under New Leadership",     excerpt: 'How Liverpool is adapting to a fresh tactical approach.',    author: 'Marcus Chen',    views: 11200, comments: 289, date: 'Mar 12, 2025', readTime: 9 },
];

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cat = categories[id];
  return {
    title: cat ? `${cat.name} - JESTV SPORTS` : 'Category - JESTV SPORTS',
    description: cat?.description ?? 'Browse football articles by category',
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cat = categories[id];

  if (!cat) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Category Not Found</h1>
            <p className="text-muted-foreground">This category does not exist.</p>
            <Link href="/categories" className="text-primary hover:underline">Browse all categories →</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Back link */}
          <Link href="/categories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Categories
          </Link>

          {/* Category header */}
          <div className={`p-8 rounded-xl ${cat.color} border border-border space-y-3`}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{cat.name}</h1>
            <p className="text-lg text-muted-foreground">{cat.description}</p>
            <p className="text-sm font-semibold text-muted-foreground">{sampleArticles.length} articles</p>
          </div>

          {/* Articles list */}
          <div className="space-y-6">
            {sampleArticles.map((article) => (
              <Link key={article.id} href={`/article/${article.id}`}>
                <article className="group block p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-md transition space-y-4 cursor-pointer">
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground">{article.excerpt}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime} min read</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{(article.views / 1000).toFixed(1)}K</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{article.comments}</span>
                      <div className="flex items-center gap-2 ml-2">
                        <div className="w-5 h-5 bg-primary rounded-full" />
                        <span className="font-medium text-foreground">{article.author}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
