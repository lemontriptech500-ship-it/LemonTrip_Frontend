import React from 'react'
import { Container } from '@/components/ui'

/**
 * HotelPageHero
 * ------------------------------------------------------------
 * Hotels' own banner (separate from FlightPageHero so each can be
 * styled independently). Sits behind the transparent header on
 * /hotels and every /hotels/[hotelId] step.
 *
 * Change HOTEL_HERO_IMAGE to swap the background. For faster loads,
 * convert public/hotels.png to /hotels.webp and update the path.
 */

const HOTEL_HERO_IMAGE = '/hotels.webp'

interface HotelPageHeroProps {
  title: string
  subtitle?: string
  /** Slimmer banner for booking steps */
  compact?: boolean
  /** Rendered over the banner's bottom edge (e.g. the search form card) */
  children?: React.ReactNode
}

export function HotelPageHero({ title, subtitle, compact = false, children }: HotelPageHeroProps) {
  return (
    <>
      <section
        className={`relative bg-neutral-900 ${
          compact
            ? 'pb-10 pt-[104px] sm:pt-[128px] lg:pt-[132px]'
            : 'pb-24 pt-[112px] sm:pt-[136px] lg:pt-[140px]'
        }`}
      >
        {/* Background — clipped to the banner */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${HOTEL_HERO_IMAGE}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#042d1b]/85 via-[#042d1b]/55 to-[#042d1b]/25" />
        </div>

        <Container as="div" className="relative z-10">
          <h1
            className={`font-semibold tracking-tight text-white ${
              compact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
            }`}
          >
            {title}
          </h1>
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
