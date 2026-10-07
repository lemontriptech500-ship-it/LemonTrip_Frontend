import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, SectionHeading } from '@/components/ui'
import { trendingDestinations } from '@/data/destinations'
import { MapPin, ArrowRight } from 'lucide-react'

/**
 * TrendingDestinations
 * ------------------------------------------------------------
 * Brought in line with the rest of the updated homepage:
 *  - Title/location text switched from var(--color-primary)
 *    (brand yellow) to white. Yellow-on-dark-gradient text is
 *    hard to read at small sizes and clashed with how
 *    PopularDestinations already renders its card text in white
 *    — this makes the two destination sections feel like one
 *    consistent system instead of two different treatments.
 *  - Corners bumped to rounded-2xl and shadows switched to the
 *    --shadow-md / --shadow-xl tokens (same deeper, softer
 *    shadow used across FeaturedOffers) instead of Tailwind's
 *    generic shadow-sm/shadow-lg utilities.
 *  - Added a small "Trending" badge pill, top-left, matching the
 *    category-badge pattern already used in FeaturedOffers — so
 *    every card grid on the homepage now shares the same badge
 *    language.
 *  - Gradient deepened slightly and extended further up the card
 *    so the hover-revealed description line stays legible over
 *    any photo.
 */

export function TrendingDestinations() {
  return (
    <section className="section-gap bg-[var(--color-surface)]">
      <Container>
        <SectionHeading
          title="Trending Destinations"
          description="Explore the most popular places to visit right now."
        />

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trendingDestinations.map((dest) => (
            <Link
              key={dest.id}
              href="/packages"
              aria-label={`Explore trips to ${dest.name}, ${dest.country}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-md)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-2)]"
            >
              {dest.imageUrl ? (
                <Image
                  src={dest.imageUrl}
                  alt={`${dest.name}, ${dest.country}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className={`absolute inset-0 h-full w-full ${dest.imageFallbackColor}`} />
              )}

              {/* Deeper, taller gradient so the hover-revealed
                  description stays legible over any photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <span className="absolute left-4 top-4 rounded-full bg-[var(--color-primary)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[var(--color-secondary)]">
                Trending
              </span>

              <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                <h3 className="text-h3 mb-0.5 text-white">{dest.name}</h3>
                <div className="mb-2 flex items-center gap-1 text-xs text-white/85">
                  <MapPin size={16} />
                  <span>{dest.country}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <span className="line-clamp-2">{dest.description}</span>
                  <ArrowRight className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
