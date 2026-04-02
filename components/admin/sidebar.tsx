'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, FileText, MessageSquare,
  Settings, LogOut, Tag, Mail, BarChart2,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const menuItems = [
  { label: 'Dashboard',   href: '/admin',            icon: LayoutDashboard },
  { label: 'Articles',    href: '/admin/articles',   icon: FileText        },
  { label: 'Writers',     href: '/admin/writers',    icon: Users           },
  { label: 'Comments',    href: '/admin/comments',   icon: MessageSquare   },
  { label: 'Categories',  href: '/admin/categories', icon: Tag             },
  { label: 'Subscribers', href: '/admin/subscribers',icon: Mail            },
  { label: 'Settings',    href: '/admin/settings',   icon: Settings        },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <aside className="w-64 bg-[#0D0D0D] border-r border-white/5 h-screen sticky top-0 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/5 flex items-center gap-2.5">
        <div className="w-1 h-8 bg-red-600 rounded-sm flex-shrink-0" />
        <div>
          <div className="text-white font-bold text-base tracking-wide leading-none">
            JESTV <span className="text-red-500">SPORTS</span>
          </div>
          <div className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">Admin Portal</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                isActive
                  ? 'bg-red-600/20 text-red-500'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
              }`}>
              <Icon size={15} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            AD
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Admin</p>
            <p className="text-neutral-500 text-[10px]">Platform Admin</p>
          </div>
        </div>
        <button onClick={async () => { await signOut(); window.location.href = '/'; }}
          className="w-full flex items-center gap-2 px-3 py-2 text-neutral-500 hover:text-neutral-300 rounded-md hover:bg-white/5 transition-colors text-xs">
          <LogOut size={13} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
