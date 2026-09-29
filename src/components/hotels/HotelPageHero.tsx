import React from 'react'
import { FlightPageHero } from '@/components/flights/FlightPageHero'

/** Retains the hotel artwork while sharing dimensions and typography with page heroes. */

const HOTEL_HERO_IMAGE = '/hotels.webp'

interface HotelPageHeroProps {
  title: string
  subtitle?: string
  /** Rendered over the banner's bottom edge (e.g. the search form card) */
  children?: React.ReactNode
}

export function HotelPageHero({ title, subtitle, children }: HotelPageHeroProps) {
  return (
    <FlightPageHero
      title={title}
      subtitle={subtitle}
      backgroundImage={HOTEL_HERO_IMAGE}
    >
      {children}
    </FlightPageHero>
  )
}
