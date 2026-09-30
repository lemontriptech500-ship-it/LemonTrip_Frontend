import React from 'react'
import { FlightPageHero } from '@/components/flights/FlightPageHero' // generic banner, reused

/**
 * Save as: src/app/bookings/layout.tsx
 * Banner behind the transparent header on the bookings page.
 * If you already have a bookings/layout.tsx that exports `metadata`,
 * keep the metadata and use the same wrapper markup below.
 */
export default function BookingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FlightPageHero
        compact
        title="My bookings"
        subtitle="Review your trips, payment status, and booking references in one place."
      />
      <div className="bg-[var(--color-background)] pt-10">{children}</div>
    </>
  )
}