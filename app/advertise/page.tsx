import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
export const metadata = { title: 'Advertise - JESTV SPORTS' };
export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h1 className="text-4xl font-bold text-foreground">Advertise With Us</h1>
          <p className="text-muted-foreground text-lg">
            Reach Kenya's most engaged football audience. JESTV SPORTS delivers
            targeted exposure to passionate football fans across Kenya and East Africa.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[['1K+','Monthly Readers'],['50+','Articles'],['3','Expert Writers']].map(([v,l]) => (
              <div key={l} className="bg-card border border-border rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-foreground">{v}</p>
                <p className="text-sm text-muted-foreground mt-1">{l}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground">
            For advertising enquiries, contact{' '}
            <a href="mailto:ads@jestvsports.com" className="text-primary hover:underline">
              ads@jestvsports.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
