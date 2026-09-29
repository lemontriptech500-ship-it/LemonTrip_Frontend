import React from 'react'
import { FlightPageHero } from '@/components/flights/FlightPageHero' // generic banner, reused

/**
 * Save as: src/app/profile/layout.tsx
 * Banner behind the transparent header on the profile page.
 * If you already have a profile/layout.tsx that exports `metadata`,
 * keep the metadata and use the same wrapper markup below.
 */
export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FlightPageHero
        compact
        title="My profile"
        subtitle="Keep your traveller details current and manage every trip from one place."
      />
      <div className="bg-[var(--color-background)] pt-10">{children}</div>
    </>
  )
}