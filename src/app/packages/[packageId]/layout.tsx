import React from 'react'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'

/**
 * Save as: src/app/packages/[packageId]/layout.tsx
 * Banner behind the transparent header on the package details page.
 */
export default function PackageDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="print:hidden">
        <FlightPageHero
          compact
          backgroundImage={PAGE_HERO_IMAGES.travel}
          title="Book your holiday"
          subtitle="Review the package highlights and pay securely."
        />
      </div>
      <div className="bg-[var(--color-background)] pt-10 print:pt-0">{children}</div>
    </>
  )
}
