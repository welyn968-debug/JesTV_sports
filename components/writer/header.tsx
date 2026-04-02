'use client'

import { Bell, Settings, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WriterHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 hover:bg-muted rounded-lg">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-foreground hidden md:block">
          Writer Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition">
          <Settings className="w-5 h-5" />
        </button>
        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
