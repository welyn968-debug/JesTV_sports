import type { Metadata } from 'next'
import WriterSidebar from '@/components/writer/sidebar'

export const metadata: Metadata = {
  title: 'Writer Dashboard - JESTV Sports',
  description: 'Create, edit, and manage your articles',
}

export default function WriterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <WriterSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
