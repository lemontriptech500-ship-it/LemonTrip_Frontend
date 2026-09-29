import React from 'react'
import { FlightPageHero } from '@/components/flights/FlightPageHero' // generic banner, reused

/**
 * Save as: src/app/visa/[serviceId]/layout.tsx
 * Banner behind the transparent header on the visa details / application page.
 * Nested inside your existing src/app/visa/layout.tsx (metadata only).
 */
export default function VisaServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="print:hidden">
        <FlightPageHero
          compact
          title="Apply for your visa"
          subtitle="Check the requirements and submit your application."
        />
      </div>
      <div className="bg-[var(--color-background)] pt-10 print:pt-0">{children}</div>
    </>
  )
}