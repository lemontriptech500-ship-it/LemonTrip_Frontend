import React from 'react'
import { Container } from '@/components/ui'

/**
 * FlightPageHero
 * ------------------------------------------------------------
 * Dark photo banner that sits BEHIND the transparent header on
 * /flights and /flights/[id], so the header looks identical to
 * the home page (white text, glass layer).
 *
 * The header is `absolute`, so this banner has top padding equal
 * to the header height (contact strip 32px + nav 60/80/75px) to
 * keep the title from sliding underneath it.
 *
 * `children` (the search summary card) is rendered OUTSIDE the
 * overflow-hidden background layer and pulled up with a negative
 * margin, so it floats over the banner's bottom edge without
 * being clipped.
 */

interface FlightPageHeroProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export function FlightPageHero({ title, subtitle, children }: FlightPageHeroProps) {
  return (
    <>
      <section className="relative bg-neutral-900 pb-24 pt-[112px] sm:pt-[136px] lg:pt-[140px]">
        {/* Background — clipped to the banner */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/herosection_bgimage.webp?hero-v=20260908')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#042d1b]/90 via-[#042d1b]/60 to-[#042d1b]/30" />
        </div>

        <Container as="div" className="relative z-10">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">{subtitle}</p>
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