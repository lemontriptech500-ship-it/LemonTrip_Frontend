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
    <nav aria-label="Desktop Main Navigation" className="hidden lg:flex items-center gap-1">
      {desktopItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
              isActive
                ? 'text-[var(--color-primary)]'
                :             'text-[#263746] hover:text-[#FAD311] hover:bg-[rgba(44,62,80,0.04)]'
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
