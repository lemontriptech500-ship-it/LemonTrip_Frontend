import React from 'react'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'

/**
 * Save as: src/app/offers/[offerId]/layout.tsx
 * Banner behind the transparent header on the offer details page.
 * Nested inside your existing src/app/offers/layout.tsx (metadata only).
 */
export default function OfferDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="print:hidden">
        <FlightPageHero
          compact
          backgroundImage={PAGE_HERO_IMAGES.offer}
          title="Offer details"
          subtitle="Check the promotion and apply it at checkout."
        />
      </div>
      <div className="bg-[var(--color-background)] pt-10 print:pt-0">{children}</div>
    </>
  )
}