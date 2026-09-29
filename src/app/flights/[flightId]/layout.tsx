import React from 'react'
import { FlightPageHero } from '@/components/flights/FlightPageHero'

/**
 * Save as: src/app/flights/[flightId]/layout.tsx
 *
 * Wraps every booking step (details, travellers, review, payment,
 * confirmation) with the same dark banner behind the transparent header.
 * Nested inside your existing src/app/flights/layout.tsx (metadata),
 * which stays untouched.
 */
export default function FlightBookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hidden when printing the confirmation page */}
      <div className="print:hidden">
        <FlightPageHero
          compact
          title="Complete your booking"
          subtitle="Review your flight, add traveller details and pay securely."
        />
      </div>

      {/* Same background as the pages' own wrapper so no white strip shows between banner and content */}
      <div className="bg-[var(--color-background)] pt-10 print:pt-0">{children}</div>
    </>
  )
}