import React from 'react'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'

/** Retains the hotel artwork while sharing dimensions and typography with page heroes. */

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
      backgroundImage={PAGE_HERO_IMAGES.hotel}
    >
      {children}
    </FlightPageHero>
  )
}
