import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Card } from '@/components/ui'
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
    <section id="featured-offers" aria-labelledby="offers-title" className="bg-[var(--color-surface)] py-6 sm:py-8 lg:pb-0 lg:pt-5">
      <Container>
        <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end lg:mb-2">
          <div className="min-w-0">
            <h2 id="offers-title" className="font-heading text-[clamp(1.65rem,7vw,2.25rem)] font-semibold leading-none tracking-tight text-[var(--color-text-primary)]">
              Exclusive Offers
            </h2>
            <p className="mt-2 text-sm leading-snug text-[var(--color-text-muted)]">
              Save on your next journey with these limited-time deals.
            </p>
          </div>
          <Link href="/offers" className="mb-0.5 inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[var(--green-dark)] sm:text-sm">
            View All <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-3 lg:grid-cols-4">
          {activeOffers.map((offer) => (
            <Card
              key={offer.id}
              hover
              padding="none"
              className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] !shadow-[var(--shadow-sm)] transition hover:!shadow-[var(--shadow-lg)]"
            >
              <div className={`relative h-44 w-full shrink-0 overflow-hidden sm:h-36 lg:h-32 2xl:h-36 ${offer.imageColor}`}>
                {offer.imageUrl ? (
                  <Image
                    src={offer.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
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
                <span className="absolute left-3 top-3 rounded-full bg-[var(--yellow)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[var(--green-dark)]">
                  {offer.category}
                </span>
              </div>

              <div className="flex flex-grow flex-col p-4">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                  <h3 className="min-w-0 flex-1 text-base font-bold leading-snug text-[var(--green-dark)]">{getOfferTitle(offer.title)}</h3>
                  {offer.discount && <span className="shrink-0 rounded-full bg-[var(--color-primary-soft)] px-2 py-1 text-xs font-extrabold text-[var(--green-2)]">{offer.discount}</span>}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {offer.description}
                </p>

                {offer.code && (
                  <div className="mt-auto flex items-center justify-between rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3">
                    <span className="text-xs text-[var(--color-text-muted)]">Code</span>
                    <span className="break-all font-mono text-xs font-bold text-[var(--color-text-primary)]">
                      {offer.code}
                    </span>
                  </div>
                )}
                <Link
                  href={getOfferHref(offer.category)}
                  className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--yellow)] px-4 text-xs font-bold text-[var(--green-dark)] transition duration-200 hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-2)]"
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
