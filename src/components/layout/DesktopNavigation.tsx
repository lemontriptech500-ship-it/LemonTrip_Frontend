'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const primaryItems = [
  { label: 'Flights', href: '/flights' },
  { label: 'Hotels', href: '/hotels' },
  { label: 'Trains', href: '/trains' },
  { label: 'Buses', href: '/buses' },
  { label: 'Holidays', href: '/packages' },
  { label: 'Visa', href: '/visa' },
]

const moreItems = [
  { label: 'Offers', href: '/offers' },
  { label: 'Travel Stories', href: '/blog' },
  { label: 'Help', href: '/contact' },
]

export function DesktopNavigation() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav aria-label="Main navigation" className={cn(
      'col-start-2 hidden shrink-0 items-center justify-self-center gap-0.5 rounded-full border border-white/25 bg-white/15 px-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-md lg:flex lg:gap-1 lg:translate-y-4'
    )}>
      {primaryItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(item.href) ? 'page' : undefined}
          className={cn(
            cn(
              'relative whitespace-nowrap rounded-full px-2.5 py-2.5 text-[12px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition hover:bg-white/10 hover:text-white',
              isActive(item.href) && 'bg-white/15'
            )
          )}
        >
          {item.label}
        </Link>
      ))}
      <details className="group relative">
        <summary className={cn(
          'flex cursor-pointer list-none items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2.5 text-[12px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition hover:bg-white/10 hover:text-white [&::-webkit-details-marker]:hidden'
        )}>
          More <ChevronDown size={14} className="transition group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="absolute right-0 top-full z-50 w-48 rounded-2xl border border-white/20 bg-white p-2 text-[var(--green-dark)] shadow-[var(--shadow-lg)]">
          {moreItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'block rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-[var(--color-background-soft)]',
                isActive(item.href) && 'bg-[var(--color-background-soft)] text-[var(--green)]'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </details>
    </nav>
  )
}
