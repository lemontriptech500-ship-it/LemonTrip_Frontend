import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, SectionHeading, Card } from '@/components/ui'
import { featuredOffers } from '@/data/offers'
import { ArrowRight, Tag } from 'lucide-react'

function getOfferHref(category: string) {
  const normalizedCategory = category.toLowerCase()
  if (normalizedCategory.includes('hotel')) return '/hotels'
  if (normalizedCategory.includes('visa')) return '/visa'
  if (normalizedCategory.includes('train')) return '/trains'
  if (normalizedCategory.includes('bus')) return '/buses'
  if (normalizedCategory.includes('package')) return '/packages'
  if (normalizedCategory.includes('flight')) return '/flights'
  return '/offers'
}

function getOfferTitle(title: string) {
  return title.replace(/^(?:up to|flat)\s+(?:₹)?[\d,]+%?\s+off(?:\s+on)?\s+/i, '')
}

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
 *  - Section headings follow the shared Inter typography system.
 */

export function FeaturedOffers() {
  const today = new Date().toISOString().slice(0, 10)
  const activeOffers = featuredOffers.filter((offer) => !offer.validTill || offer.validTill >= today).slice(0, 4)

  return (
    <section className="section-gap bg-[var(--color-surface)]">
      <Container>
        <SectionHeading
          title="Exclusive Offers"
          description="Save on your next journey with these limited-time deals."
          action={{ label: 'View All Offers', href: '/offers' }}
        />

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {activeOffers.map((offer) => (
            <Card
              key={offer.id}
              hover
              padding="none"
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] !shadow-[var(--shadow-md)] hover:!shadow-[var(--shadow-lg)]"
            >
              <div className={`relative h-44 w-full overflow-hidden ${offer.imageColor}`}>
                {offer.imageUrl ? (
                  <Image
                    src={offer.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <Tag
                    className="absolute inset-0 m-auto text-[var(--color-text-muted)]"
                    size={40}
                    aria-hidden="true"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,59,36,0.55)] to-transparent" />

                {/* Category as a solid badge pill, like the reference's "BEST SELLER" tag */}
                <span className="absolute left-3 top-3 rounded-full bg-[var(--color-primary)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[var(--color-secondary)]">
                  {offer.category}
                </span>
              </div>

              <div className="flex flex-grow flex-col p-5">
                {offer.discount && <p className="mb-1 text-2xl font-bold leading-tight text-[var(--green-dark)]">{offer.discount}</p>}
                <h3 className="text-h3 mb-1.5">{getOfferTitle(offer.title)}</h3>
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
                <Link
                  href={getOfferHref(offer.category)}
                  className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--yellow)] px-4 text-sm font-bold text-[var(--green-dark)] transition duration-200 hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-2)]"
                >
                  Book now <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
