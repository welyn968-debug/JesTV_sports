'use client'

import { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setEmail('')
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Content */}
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Get the Latest Analysis
            </h2>
            <p className="text-lg text-muted-foreground">
              Subscribe to our newsletter for weekly insights, breaking news, and expert commentary delivered directly to your inbox.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-sm border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-accent rounded-sm font-medium transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">100K+</p>
              <p className="text-xs text-muted-foreground mt-1">Subscribers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">Weekly</p>
              <p className="text-xs text-muted-foreground mt-1">Newsletter</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">95%</p>
              <p className="text-xs text-muted-foreground mt-1">Open Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
