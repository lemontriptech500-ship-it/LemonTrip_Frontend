import React from 'react'
import { Container } from '@/components/ui'

export const PAGE_HERO_IMAGES = {
  flight: '/herosection_bgimage2.png?hero-v=20260908',
  hotel: '/hotels.webp',
  bus: '/bus.png',
  train: '/trains.png',
  package: '/packages.png',
  visa: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1800&q=85',
  offer: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=85',
  travel: '/hero_new.png',
} as const

interface FlightPageHeroProps {
  title: string
  subtitle?: string
  /** Kept for existing call sites; all page heroes now share one size. */
  compact?: boolean
  children?: React.ReactNode
  backgroundImage?: string
}

export function FlightPageHero({
  title,
  subtitle,
  children,
  backgroundImage = PAGE_HERO_IMAGES.flight,
}: FlightPageHeroProps) {
  return (
    <>
      <section className="relative isolate min-h-[250px] overflow-hidden bg-neutral-900 pb-10 pt-10 sm:min-h-[280px] sm:pb-12 sm:pt-12 lg:min-h-[300px] lg:pb-14">
        {/* Background — clipped to the banner */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031f18]/90 via-[#063b24]/65 to-[#063b24]/25" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/25 to-transparent" />
        </div>

        <Container as="div" className="relative z-10">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--yellow)] sm:text-[11px]">
            Explore · Book · Travel
          </p>
          <h1 className="max-w-3xl font-heading text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[0.98] tracking-tight text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">{subtitle}</p>
          )}
        </Container>
      </section>

      {children && (
        <Container as="div" className="relative z-10 -mt-10">
          {children}
        </Container>
      )}
    </>
  )
}
