import React from 'react'
import Link from 'next/link'
import { Container, Button } from '@/components/ui'
import { ArrowRight } from 'lucide-react'

/**
 * FinalCTA
 * ------------------------------------------------------------
 * Fixes + restyle:
 *  - Both decorative blur circles had malformed arbitrary values
 *    (`bg-[rgba(52, 152, 219, 0.20) rounded-full ...`) — missing
 *    closing bracket, spaces inside rgba() — so neither ever
 *    rendered. Fixed the bracket syntax on both.
 *  - The blue (rgba(52,152,219,...)) wasn't a token anywhere in
 *    your palette — swapped both blobs to your actual brand
 *    green/yellow tints, matching the same blurred-blob treatment
 *    used in VisaHighlight, so the site doesn't quietly introduce
 *    a fourth accent color nobody asked for.
 *  - Heading switched from `.text-display` (reserved for the hero,
 *    up to ~5.4rem) to `.text-h1` — display-scale type on a mid-page
 *    CTA read oversized next to everything else on the homepage.
 */

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-secondary-soft)] py-20">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[rgba(17,128,71,0.18)] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] -translate-x-1/3 translate-y-1/2 rounded-full bg-[rgba(255,210,26,0.16)] blur-3xl" />
      </div>

      <Container className="relative z-10 text-center">
        <h2 className="text-h1 mb-5 text-[var(--color-text-primary)]">
          Ready for your next adventure?
        </h2>
        <p className="text-body-lg mx-auto mb-8 max-w-2xl text-[var(--color-text-secondary)]">
          Join thousands of travelers who trust LemonTrip for their bookings. Start planning your
          journey today.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" icon={<ArrowRight size={16} />} iconPosition="right" asChild>
            <Link href="/flights">Explore Flights</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/packages">Explore Destinations</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}