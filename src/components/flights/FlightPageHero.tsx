'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui'
import { cn } from '@/lib/utils'
import { getPageBreadcrumb, getPageHeaderVariant, hasOverlayHeader } from '@/constants/pageHeaders'
import { PAGE_HERO_IMAGES } from '@/constants/pageHeroImages'

export { PAGE_HERO_IMAGES } from '@/constants/pageHeroImages'

interface FlightPageHeroProps {
  title: string
  subtitle?: string
  compact?: boolean
  children?: React.ReactNode
  backgroundImage?: string
}

/** Shared discovery, search and compact page banners. */
export function FlightPageHero({ title, subtitle, compact, children, backgroundImage = PAGE_HERO_IMAGES.flight }: FlightPageHeroProps) {
  const pathname = usePathname()
  const routeVariant = getPageHeaderVariant(pathname)
  // Discovery pages retain their imagery even at older call sites marked compact.
  const variant = routeVariant === 'discovery' ? 'discovery' : compact && routeVariant !== 'search' ? 'compact' : routeVariant
  const overlay = hasOverlayHeader(pathname)
  const breadcrumb = getPageBreadcrumb(pathname)
  const compactBanner = variant === 'compact'
  const Heading = breadcrumb.nested ? 'h2' : 'h1'
  const action = pathname === '/packages' ? { href: '/trip-planner', label: 'Plan my holiday with AI' }
    : pathname === '/services' ? { href: '/contact', label: 'Talk to our travel team' } : null

  return <>
    <section data-page-banner={variant} className={cn('relative isolate overflow-hidden', compactBanner ? 'border-b border-[var(--color-border)] bg-[var(--color-background-soft)] text-[var(--green-dark)]' : 'bg-[var(--green-dark)] text-white',
      variant === 'discovery' ? 'pb-12 sm:pb-16 lg:pb-20' : compactBanner ? 'py-7 sm:py-9' : 'pb-10 sm:pb-12',
      overlay ? 'pt-[calc(var(--site-header-height)+28px)] sm:pt-[calc(var(--site-header-height)+36px)]' : !compactBanner && 'pt-9',
      children && 'pb-20 sm:pb-24'
    )}>
      {!compactBanner && <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${backgroundImage}')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#031f18]/95 via-[#063b24]/80 to-[#063b24]/40" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#031f18]/50 to-transparent" />
      </div>}
      <Container>
        <nav aria-label="Breadcrumb" className={cn(cn('mb-4 text-xs sm:mb-5', variant === 'search' && 'hidden'), compactBanner ? 'text-[var(--color-text-secondary)]' : 'text-white/80')}>
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="inline-flex min-h-6 items-center underline-offset-4 hover:underline">Home</Link></li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li>{breadcrumb.nested ? <Link href={breadcrumb.href} className="inline-flex min-h-6 items-center underline-offset-4 hover:underline">{breadcrumb.label}</Link> : <span aria-current="page">{breadcrumb.label}</span>}</li>
            {breadcrumb.nested && <><li aria-hidden="true"><ChevronRight size={12} /></li><li aria-current="page">{title}</li></>}
          </ol>
        </nav>
        {variant === 'discovery' && <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--yellow)] sm:text-xs">A world of possibilities</p>}
        <Heading className={cn('max-w-3xl text-balance font-heading font-semibold leading-[1.05] tracking-tight', compactBanner ? 'text-[clamp(1.875rem,3vw,2.75rem)]' : 'text-[clamp(2.25rem,4.5vw,3.5rem)]')}>{title}</Heading>
        {subtitle && <p className={cn('mt-3 max-w-xl text-sm leading-relaxed sm:text-base', compactBanner ? 'text-[var(--color-text-secondary)]' : 'text-white/85')}>{subtitle}</p>}
        {action && <Link href={action.href} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--yellow)] px-5 text-sm font-bold text-[var(--green-dark)] transition hover:brightness-105">{action.label}<ArrowUpRight size={17} aria-hidden="true" /></Link>}
      </Container>
    </section>
    {children && <Container className="relative z-10 -mt-12 sm:-mt-16">{children}</Container>}
  </>
}
