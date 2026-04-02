import Header from '@/components/public/header';
import Footer from '@/components/public/footer';
export const metadata = { title: 'Contact - JESTV SPORTS' };
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="max-w-xl mx-auto px-6 space-y-8">
          <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
          <p className="text-muted-foreground">
            Email us at{' '}
            <a href="mailto:hello@jestvsports.com" className="text-primary hover:underline">
              hello@jestvsports.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
