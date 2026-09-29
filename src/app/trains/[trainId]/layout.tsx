import React from 'react'
import { FlightPageHero } from '@/components/flights/FlightPageHero' // generic banner, reused

/**
 * Save as: src/app/trains/[trainId]/layout.tsx
 * Banner behind the transparent header on the train route details page.
 * Nested inside your existing src/app/trains/layout.tsx (metadata only).
 */
export default function TrainRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="print:hidden">
        <FlightPageHero
          compact
          title="Book your train journey"
          subtitle="Review the route and continue to booking."
        />
      </div>
      <div className="bg-[var(--color-background)] pt-10 print:pt-0">{children}</div>
    </>
  )
}