import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
export const metadata = { title: 'Terms of Service - JESTV SPORTS' };
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground text-sm">Last updated: March 2026</p>
          {[['Use of Content','All articles published on JESTV SPORTS are the intellectual property of their respective authors. You may not reproduce, distribute, or republish content without written permission.'],['User Accounts','Reader accounts are optional. You are responsible for maintaining the confidentiality of your account credentials.'],['Comments','By posting a comment, you grant JESTV SPORTS a licence to display it. We reserve the right to remove comments that violate community standards.'],['Disclaimer','Content is provided for informational purposes only. We make no warranties about accuracy or completeness of information.']].map(([h, p]) => (
            <div key={h as string} className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">{h as string}</h2>
              <p className="text-muted-foreground">{p as string}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
