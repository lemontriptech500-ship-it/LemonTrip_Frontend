'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plane, Building2, TrainFront, BusFront, Palmtree, BookOpenCheck, MapPin, BadgePercent, BookOpenText, ConciergeBell, Headset } from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  { label: 'Flights', href: '/flights', icon: Plane },
  { label: 'Hotels', href: '/hotels', icon: Building2 },
  { label: 'Trains', href: '/trains', icon: TrainFront },
  { label: 'Buses', href: '/buses', icon: BusFront },
  { label: 'Holidays', href: '/packages', icon: Palmtree },
  { label: 'Visa', href: '/visa', icon: BookOpenCheck },
  { label: 'AI Trip Planner', shortLabel: 'AI Planner', href: '/trip-planner', icon: MapPin },
  { label: 'Offers', href: '/offers', icon: BadgePercent }, { label: 'Travel Stories', href: '/blog', icon: BookOpenText },
  { label: 'Services', href: '/services', icon: ConciergeBell }, { label: 'Contact & Help', href: '/contact', icon: Headset },
]

/** Service navigation stays visible on phones and scrolls to the current category. */
export function DesktopNavigation() {
  const pathname = usePathname()
  const strip = useRef<HTMLElement>(null)
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  useEffect(() => {
    const active = strip.current?.querySelector<HTMLElement>('[aria-current="page"]')
    if (active && strip.current) strip.current.scrollTo({ left: active.offsetLeft - strip.current.clientWidth / 2 + active.offsetWidth / 2 })
  }, [pathname])
  const itemClass = 'service-navigation-item group relative flex shrink-0 flex-col items-center justify-center gap-1 whitespace-nowrap px-3 text-xs font-semibold transition-colors hover:bg-[var(--color-background-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--green-2)] md:flex-1 lg:text-sm'

  return <nav ref={strip} aria-label="Travel services" className="service-navigation relative flex items-stretch border border-[var(--color-border)] bg-white text-[var(--green-dark)] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.35)] md:rounded-2xl">
    {services.map(({ href, label, shortLabel, icon: Icon }) => <Link key={href} href={href} aria-current={isActive(href) ? 'page' : undefined} className={cn(itemClass, isActive(href) ? 'bg-[var(--color-background-soft)] text-[var(--green-2)]' : 'text-[var(--green-dark)]/75', href === '/trip-planner' && !isActive(href) && 'text-[var(--green-2)]')}>
      <span className={cn('flex h-9 w-9 items-center justify-center rounded-xl', isActive(href) ? 'bg-[#e5f0eb]' : 'bg-[#f1f3f2]')} aria-hidden="true">
        <Icon className={cn('service-navigation-icon', isActive(href) ? 'text-[var(--green-dark)]' : 'text-[#343a37]')} strokeWidth={1.8} />
      </span>
      <span className={shortLabel ? 'hidden lg:inline' : undefined}>{label}</span>
      {shortLabel && <span className="lg:hidden">{shortLabel}</span>}
      {isActive(href) && <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-1 rounded-t-full bg-[var(--yellow)]" />}
    </Link>)}
  </nav>
}
