import React from 'react'
import { Container } from '@/components/ui'

import { PAGE_HERO_IMAGES } from '@/constants/pageHeroImages'

export { PAGE_HERO_IMAGES } from '@/constants/pageHeroImages'

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
      {/* Top padding clears the transparent header that floats over this banner */}
      <section className="relative isolate min-h-[300px] overflow-hidden  pb-20 pt-[104px] sm:min-h-[330px] sm:pb-24 sm:pt-[116px] lg:min-h-[370px] lg:pb-28 lg:pt-[130px]">
        {/* Background — clipped to the banner */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031f18]/90 via-[#063b24]/65 to-[#063b24]/25" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/35 to-transparent" />
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

      {/* Larger negative margin lifts the widget higher over the banner.
          Adjust the -mt-* values to nudge it up or down. */}
      {children && (
        <Container as="div" className="relative z-10 -mt-16 sm:-mt-20">
          {children}
        </Container>
      )}
    </>
  )
}