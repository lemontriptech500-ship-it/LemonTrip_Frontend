'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants'
import { Button } from '@/components/ui'

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

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
        <Menu size={22} className="text-[#263746]" />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-[rgba(44,62,80,0.50)] backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-[rgba(44,62,80,0.08)]">
          <span className="font-bold text-lg text-[var(--color-primary)]">Menu</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close mobile menu"
            className="px-2"
          >
            <X size={22} className="text-[#263746]" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-0.5">
          {NAV_ITEMS.filter(item => !('mobileOnly' in item && item.mobileOnly)).map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                    : 'text-[#263746] hover:bg-[#F5F7F8]'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-[rgba(44,62,80,0.08)] flex flex-col gap-2">
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
