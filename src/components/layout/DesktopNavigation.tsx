'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants'

// ============================================================
// DesktopNavigation — Main horizontal nav links.
// Handles active state based on current route.
// ============================================================

export function DesktopNavigation() {
  const pathname = usePathname()

  // Filter out mobile-only items (like 'Home' if configured)
  const desktopItems = NAV_ITEMS.filter((item) => !('mobileOnly' in item && item.mobileOnly))

  return (
    <nav aria-label="Desktop Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
      {desktopItems.map((item) => {
        // Active if exact match OR if pathname starts with href/
        // e.g. /flights/search makes /flights active.
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
              isActive
                ? 'text-[var(--color-primary-active)] bg-[var(--color-primary-soft)]/50'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
