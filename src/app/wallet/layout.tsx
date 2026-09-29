import React from 'react'
import { FlightPageHero } from '@/components/flights/FlightPageHero' // generic banner, reused

/**
 * Save as: src/app/wallet/layout.tsx
 * Banner behind the transparent header on the wallet page.
 * If you already have a wallet/layout.tsx that exports `metadata`,
 * keep the metadata and use the same wrapper markup below.
 */
export default function WalletLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FlightPageHero
        compact
        title="My wallet"
        subtitle="Manage your LemonTrip balance and payments."
      />
      <div className="bg-[var(--color-background)] pt-10">{children}</div>
    </>
  )
}