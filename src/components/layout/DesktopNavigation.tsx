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
    <nav aria-label="Desktop Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
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
            className={cn(
              'relative px-1.5 py-5 text-[11px] font-semibold transition-colors duration-200 xl:px-2.5 xl:py-6 xl:text-[13px]',
              isActive
                ? 'text-[var(--green)] after:absolute after:bottom-[10px] after:left-1.5 after:right-1.5 after:h-[3px] after:rounded-full after:bg-[var(--yellow)] xl:after:bottom-[12px] xl:after:left-2.5 xl:after:right-2.5'
                : 'text-[#10231a] hover:text-[var(--green)]'
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
