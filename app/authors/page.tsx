import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import Link from 'next/link';

export const metadata = { title: 'Authors - JESTV SPORTS', description: 'Meet our writers.' };

const authors = [
  { name: 'James Ochieng',  role: 'Senior Writer',  bio: 'KPL and match analysis expert. 10+ years covering Kenyan football.',    articles: 24, ini: 'JO', slug: 'james-ochieng'  },
  { name: 'Amina Said',     role: 'Staff Writer',   bio: 'Transfers and tactical analysis. East African football correspondent.',  articles: 18, ini: 'AS', slug: 'amina-said'     },
  { name: 'Kevin Mwangi',   role: 'Staff Writer',   bio: 'Harambee Stars and African football coverage. Based in Nairobi.',       articles: 9,  ini: 'KM', slug: 'kevin-mwangi'   },
];

export default function AuthorsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Our Writers</h1>
            <p className="text-lg text-muted-foreground mt-3">The voices behind JESTV SPORTS</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {authors.map(a => (
              <Link key={a.slug} href={`/author/${a.slug}`}>
                <div className="bg-card border border-border rounded-xl p-6 space-y-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">{a.ini}</div>
                  <div>
                    <p className="font-bold text-foreground text-lg">{a.name}</p>
                    <p className="text-sm text-primary font-medium">{a.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.bio}</p>
                  <p className="text-xs text-muted-foreground font-semibold">{a.articles} articles →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
