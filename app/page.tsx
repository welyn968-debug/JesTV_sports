import Header from '@/components/public/header'
import { Hero } from '@/components/public/hero'
import Footer from '@/components/public/footer'

export const metadata = {
  title: 'JESTV SPORTS - Football News & Analysis',
  description: "Kenya's home for football analysis and commentary.",
}

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4' }}>
      <Header />
      <Hero />
      <Footer />
    </div>
  )
}
