'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plane, Hotel, TrainFront, BusFront, Palmtree, FileCheck2, Sparkles, Grid2X2, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  { label: 'Flights', href: '/flights', icon: Plane },
  { label: 'Hotels', href: '/hotels', icon: Hotel },
  { label: 'Trains', href: '/trains', icon: TrainFront },
  { label: 'Buses', href: '/buses', icon: BusFront },
  { label: 'Holidays', href: '/packages', icon: Palmtree },
  { label: 'Visa', href: '/visa', icon: FileCheck2 },
  { label: 'AI Trip Planner', shortLabel: 'AI Planner', href: '/trip-planner', icon: Sparkles },
]
const moreItems = [
  { label: 'Offers', href: '/offers' }, { label: 'Travel Stories', href: '/blog' },
  { label: 'Services', href: '/services' }, { label: 'Contact & Help', href: '/contact' },
]

/** Service navigation stays visible on phones and scrolls to the current category. */
export function DesktopNavigation() {
  const pathname = usePathname()
  const menu = useRef<HTMLDetailsElement>(null)
  const strip = useRef<HTMLElement>(null)
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  const moreActive = moreItems.some((item) => isActive(item.href))
  useEffect(() => {
    if (menu.current) menu.current.open = false
    const active = strip.current?.querySelector<HTMLElement>('[aria-current="page"]')
    if (active && strip.current) strip.current.scrollTo({ left: active.offsetLeft - strip.current.clientWidth / 2 + active.offsetWidth / 2 })
  }, [pathname])
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (menu.current && !menu.current.contains(event.target as Node)) menu.current.open = false
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu.current?.open) {
        menu.current.open = false
        menu.current.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape) }
  }, [])
  const itemClass = 'service-navigation-item group relative flex shrink-0 flex-col items-center justify-center gap-1 whitespace-nowrap px-3 text-xs font-semibold transition-colors hover:bg-[var(--color-background-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--green-2)] md:flex-1 lg:text-sm'

  return <nav ref={strip} aria-label="Travel services" className="service-navigation relative flex items-stretch border border-[var(--color-border)] bg-white text-[var(--green-dark)] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.35)] md:rounded-2xl">
    {services.map(({ href, label, shortLabel, icon: Icon }) => <Link key={href} href={href} aria-current={isActive(href) ? 'page' : undefined} className={cn(itemClass, isActive(href) ? 'bg-[var(--color-background-soft)] text-[var(--green-2)]' : 'text-[var(--green-dark)]/75', href === '/trip-planner' && !isActive(href) && 'text-[var(--green-2)]')}>
      <Icon className="service-navigation-icon" strokeWidth={1.6} aria-hidden="true" />
      <span className={shortLabel ? 'hidden lg:inline' : undefined}>{label}</span>
      {shortLabel && <span className="lg:hidden">{shortLabel}</span>}
      {isActive(href) && <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-1 rounded-t-full bg-[var(--yellow)]" />}
    </Link>)}
    <details ref={menu} className="group relative hidden flex-1 md:block">
      <summary className={cn(itemClass, 'h-full cursor-pointer list-none [&::-webkit-details-marker]:hidden', moreActive ? 'bg-[var(--color-background-soft)] text-[var(--green-2)]' : 'text-[var(--green-dark)]/75')}>
        <Grid2X2 className="service-navigation-icon" strokeWidth={1.6} aria-hidden="true" />
        <span className="inline-flex items-center gap-1">More <ChevronDown size={13} className="transition group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" /></span>
        {moreActive && <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-1 rounded-t-full bg-[var(--yellow)]" />}
      </summary>
      <div className="absolute right-0 top-full mt-3 w-52 rounded-2xl border border-[var(--color-border)] bg-white p-2 text-[var(--green-dark)] shadow-xl">
        {moreItems.map((item) => <Link key={item.href} href={item.href} onClick={() => { if (menu.current) menu.current.open = false }} aria-current={isActive(item.href) ? 'page' : undefined} className={cn('flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold transition hover:bg-[var(--color-background-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-2)]', isActive(item.href) && 'bg-[var(--yellow-soft)]')}>{item.label}</Link>)}
      </div>
    </details>
  </nav>
}
