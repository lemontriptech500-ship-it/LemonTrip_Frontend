import React from 'react'
import Image from 'next/image'
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

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trendingDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl shadow-[var(--shadow-md)] transition-shadow duration-300 hover:shadow-[var(--shadow-xl)]"
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
                <h3 className="text-h3 mb-0.5 font-bold text-white">{dest.name}</h3>
                <div className="mb-2 flex items-center gap-1 text-sm text-white/85">
                  <MapPin size={14} />
                  <span>{dest.country}</span>
                </div>
                <div className="flex translate-y-2 items-center gap-2 text-sm text-white/85 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span>{dest.description}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}