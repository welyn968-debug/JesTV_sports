import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
import Link from 'next/link';

export const metadata = {
  title: 'About - JESTV SPORTS',
  description: 'Learn about JESTV Sports — Kenya\'s home for football journalism.',
};

const team = [
  { name: 'James Ochieng',  role: 'Editor in Chief',    bio: 'Covering Kenyan and African football for over 10 years.' },
  { name: 'Amina Said',     role: 'Senior Writer',       bio: 'Transfers specialist and tactical analyst.' },
  { name: 'Kevin Mwangi',   role: 'Staff Writer',        bio: 'KPL and Harambee Stars coverage expert.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">About Us</p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Kenya's Home for Football Journalism
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              JESTV SPORTS is a multi-author football platform covering the Kenyan Premier League
              and global football with the depth and quality the game deserves.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe Kenyan football deserves world-class journalism. Our mission is to give
                KPL and the Harambee Stars the same analytical depth that global platforms
                give the Premier League — while also covering international football through
                a Kenyan lens.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are an invited network of writers — passionate, knowledgeable, and committed to
                accuracy. Every article published on JESTV SPORTS goes through our editorial
                standards.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '50+',   label: 'Articles Published' },
                { value: '3',     label: 'Expert Writers'     },
                { value: '1K+',   label: 'Monthly Readers'    },
                { value: '2026',  label: 'Founded'            },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Our Writers</h2>
              <p className="text-muted-foreground">The experts behind every article.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {team.map((member) => (
                <div key={member.name} className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg">{member.name}</p>
                    <p className="text-sm text-primary font-medium">{member.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Want to Write for Us?</h2>
            <p className="text-muted-foreground">
              We're always looking for passionate football writers. If you have a unique perspective
              on the beautiful game, reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-6 py-3 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-accent transition-colors">
                Get in Touch
              </Link>
              <Link href="/articles" className="px-6 py-3 border border-border text-foreground rounded-sm font-medium hover:bg-muted transition-colors">
                Read Our Work
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
