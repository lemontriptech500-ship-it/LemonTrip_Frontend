import React from 'react'
import { FlightPageHero } from '@/components/flights/FlightPageHero'

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FlightPageHero
        compact
        title="Your cart"
        subtitle="Review your selected trips before checkout."
      />
      <div className="bg-[var(--color-background)] pb-20">{children}</div>
    </>
  )
}