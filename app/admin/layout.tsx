import type { Metadata } from 'next';
import AdminSidebar from '@/components/admin/sidebar';

export const metadata: Metadata = {
  title: 'Admin Dashboard - JESTV Sports',
  description: 'Manage platform, writers, and content',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
