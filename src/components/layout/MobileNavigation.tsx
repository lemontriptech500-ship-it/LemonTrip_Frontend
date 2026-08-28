'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants'
import { Button } from '@/components/ui'

// ============================================================
// MobileNavigation — Drawer menu for mobile devices.
// ============================================================

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  return (
    <div className="lg:hidden flex items-center">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        aria-label="Open mobile menu"
        aria-expanded={isOpen}
        className="px-2"
      >
        <Menu size={24} className="text-[var(--color-text-primary)]" />
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-[var(--color-surface)] shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <span className="font-bold text-lg text-[var(--color-accent)]">Menu</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close mobile menu"
            className="px-2"
          >
            <X size={24} className="text-[var(--color-text-primary)]" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'px-4 py-3 rounded-[var(--radius-md)] text-base font-medium transition-colors',
                  isActive 
                    ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary-active)]' 
                    : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-[var(--color-border)] flex flex-col gap-3">
          <Link href="/login" className="w-full">
            <Button variant="outline" fullWidth>Login</Button>
          </Link>
          <Link href="/signup" className="w-full">
            <Button variant="primary" fullWidth>Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
