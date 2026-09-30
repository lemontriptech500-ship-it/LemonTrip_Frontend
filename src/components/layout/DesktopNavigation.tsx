'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/constants'

/**
 * Shorter labels for the desktop bar only. The header row is crowded
 * (logo + 10 links + 4 buttons), and the two longest labels were being
 * squeezed against their neighbours. Mobile menu and footer keep the
 * full names from NAV_ITEMS. Remove an entry to show the full label.
 */
const DESKTOP_LABELS: Record<string, string> = {
  'Tours & Packages': 'Packages',
  'Visa Services': 'Visa',
}

export function DesktopNavigation() {
  const pathname = usePathname()
  const desktopItems = NAV_ITEMS.filter((item) => !('mobileOnly' in item && item.mobileOnly))

  return (
    <nav
      aria-label="Desktop Main Navigation"
      className="hidden shrink-0 items-center gap-1 xl:flex xl:gap-3"
    >
      {desktopItems.map((item) => {
        const isActive =
          (item.href === '/' && pathname === '/') ||
          (item.href !== '/' && item.href.startsWith('/#') ? pathname === '/' : pathname === item.href) ||
          (item.href !== '/' && !item.href.includes('#') && pathname.startsWith(`${item.href}/`))

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.label}
            className={cn(
              'relative shrink-0 whitespace-nowrap px-1.5 py-5 text-[11px] font-semibold text-white/90 xl:px-2.5 xl:py-6 xl:text-[13px]',
              isActive
                ? 'after:absolute after:bottom-[10px] after:left-1.5 after:right-1.5 after:h-[3px] after:rounded-full after:bg-[var(--yellow)] xl:after:bottom-[12px] xl:after:left-2.5 xl:after:right-2.5'
                : ''
            )}
          >
            {DESKTOP_LABELS[item.label] ?? item.label}
          </Link>
        )
      })}
    </nav>
  )
}