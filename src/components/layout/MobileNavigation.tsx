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
    <div className="flex items-center xl:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        aria-label="Open mobile menu"
        aria-expanded={isOpen}
        className="px-2 text-[#FFD21A] hover:text-[#ffe36b] hover:bg-[#0a4b2c]"
      >
        <Menu size={22} className="text-[#FFD21A]" />
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
          'fixed left-0 top-0 z-[60] flex h-screen min-h-screen w-[min(86vw,360px)] transform flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="flex items-center justify-between border-b border-[var(--green)]/20 bg-[var(--green-dark)] px-4 py-3">
          <span className="text-lg font-bold text-[var(--yellow)]">Menu</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close mobile menu"
            className="px-2 text-white hover:bg-white/10"
          >
            <X size={22} className="text-white" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto bg-white px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'block rounded-[var(--radius-md)] px-4 py-3 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-[var(--yellow)] text-[var(--green-dark)]'
                    : 'text-[var(--green-dark)] hover:bg-[var(--yellow-soft)]'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-col gap-2 border-t border-[var(--green)]/15 bg-white p-4">
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
