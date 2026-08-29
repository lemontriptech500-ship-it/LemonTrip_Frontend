'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants'

export function DesktopNavigation() {
  const pathname = usePathname()
  const desktopItems = NAV_ITEMS.filter((item) => !('mobileOnly' in item && item.mobileOnly))

  return (
    <nav aria-label="Desktop Main Navigation" className="hidden lg:flex items-center gap-0.5">
      {desktopItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'relative px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
              isActive
                ? 'text-[var(--color-primary)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
            )}
          >
            {item.label}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[var(--color-primary)]" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
