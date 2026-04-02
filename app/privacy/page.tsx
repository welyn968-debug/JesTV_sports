import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
export const metadata = { title: 'Privacy Policy - JESTV SPORTS' };
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-6 prose prose-sm text-foreground space-y-6">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Last updated: March 2026</p>
          {[['Information We Collect','We collect email addresses when you subscribe to our newsletter. We also collect anonymous article view data (no personally identifiable information is stored with view events).'],['How We Use Your Data','Your email is used only to send newsletters you opted into. You may unsubscribe at any time. We do not sell or share your personal data with third parties.'],['Cookies','We use essential cookies for authentication and Google AdSense cookies for advertising. You can manage cookie preferences in your browser settings.'],['Contact','For privacy enquiries email privacy@jestvsports.com']].map(([h, p]) => (
            <div key={h as string}>
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
