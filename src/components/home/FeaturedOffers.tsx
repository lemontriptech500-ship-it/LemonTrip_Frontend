import React from 'react'
import Image from 'next/image'
import { Container, SectionHeading, Card } from '@/components/ui'
import { featuredOffers } from '@/data/offers'
import { Tag } from 'lucide-react'

/**
 * FeaturedOffers
 * ------------------------------------------------------------
 * Visual language brought in line with the reference index.html
 * ".packages" cards, while keeping your existing offer/code data
 * model (this section shows discount codes, not bookable
 * packages, so the content stays as-is):
 *  - category label becomes a solid badge pill over the image
 *    (top-left), instead of a centered icon-only placeholder
 *  - card corners/shadow deepened to --shadow-lg (now matches
 *    the reference's softer, larger-spread shadow token)
 *  - SectionHeading unchanged in usage — it now renders with the
 *    serif title from the updated globals.css
 */

export function FeaturedOffers() {
  return (
    <section className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading
          title="Exclusive Offers"
          description="Save on your next journey with these limited-time deals."
          action={{ label: 'View All Offers', href: '/offers' }}
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredOffers.map((offer) => (
            <Card
              key={offer.id}
              hover
              className="flex h-full flex-col overflow-hidden rounded-2xl !shadow-[var(--shadow-lg)]"
            >
              <div className={`relative h-36 w-full overflow-hidden ${offer.imageColor}`}>
                {offer.imageUrl ? (
                  <Image
                    src={offer.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  <Tag
                    className="absolute inset-0 m-auto text-[var(--color-text-muted)]"
                    size={40}
                    aria-hidden="true"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,62,80,0.30)] to-transparent" />

                {/* Category as a solid badge pill, like the reference's "BEST SELLER" tag */}
                <span className="absolute left-3 top-3 rounded-full bg-[var(--color-primary)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[var(--color-secondary)]">
                  {offer.category}
                </span>
              </div>

              <div className="flex flex-grow flex-col p-4">
                <h3 className="text-h4 mb-1.5">{offer.title}</h3>
                <p className="text-body-sm text-[var(--color-text-secondary)] mb-3 flex-grow">
                  {offer.description}
                </p>

                {offer.code && (
                  <div className="mt-auto flex items-center justify-between rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-2">
                    <span className="text-caption text-[var(--color-text-muted)]">Code:</span>
                    <span className="font-mono font-bold text-xs text-[var(--color-text-primary)]">
                      {offer.code}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}