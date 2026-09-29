import React from 'react'
import { HotelPageHero } from '@/components/hotels/HotelPageHero'

/**
 * Save as: src/app/hotels/[hotelId]/layout.tsx
 *
 * Banner behind the transparent header for every hotel booking step:
 * details, guests, review, payment, confirmation.
 * Nested inside your existing src/app/hotels/layout.tsx (metadata only).
 */
export default function HotelBookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="print:hidden">
        <HotelPageHero
          title="Book your stay"
          subtitle="Choose your room, add guest details and pay securely."
        />
      </div>
      <div className="bg-[var(--color-background)] pt-10 print:pt-0">{children}</div>
    </>
  )
}