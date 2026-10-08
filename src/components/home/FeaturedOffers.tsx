import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, SectionHeading, Card } from '@/components/ui'
import { featuredOffers } from '@/data/offers'
import { ArrowRight, Tag, Ticket } from 'lucide-react'

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
 * FeaturedOffers — premium version:
 * tall photo with a yellow category pill, large discount figure,
 * dashed coupon strip and a dark-green "Book now" button.
 */
export function FeaturedOffers() {
  const today = new Date().toISOString().slice(0, 10)
  const activeOffers = featuredOffers.filter((offer) => !offer.validTill || offer.validTill >= today).slice(0, 4)

  return (
    <section className="section-gap bg-[var(--color-surface)]">
      <Container>
        <SectionHeading
          eyebrow="Limited-time deals"
          title="Exclusive Offers"
          description="Save on your next journey with these limited-time deals."
          action={{ label: 'View All Offers', href: '/offers' }}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {activeOffers.map((offer) => (
            <Card
              key={offer.id}
              hover
              padding="none"
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] !shadow-[var(--shadow-md)] hover:!shadow-[var(--shadow-xl)]"
            >
              <div className={`relative h-48 w-full overflow-hidden ${offer.imageColor}`}>
                {offer.imageUrl ? (
                  <Image
                    src={offer.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <Tag className="absolute inset-0 m-auto text-[var(--color-text-muted)]" size={40} aria-hidden="true" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,58,41,0.75)] via-transparent to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-[var(--color-primary)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[var(--green-dark)] shadow-[var(--shadow-sm)]">
                  {offer.category}
                </span>

                {offer.discount && (
                  <p className="absolute bottom-3 left-4 text-2xl font-extrabold leading-none text-white drop-shadow">
                    {offer.discount}
                  </p>
                )}
              </div>

              <div className="flex flex-grow flex-col p-5">
                <h3 className="text-lg font-extrabold leading-snug text-[var(--color-text-primary)]">
                  {getOfferTitle(offer.title)}
                </h3>
                <p className="text-body-sm mb-4 mt-2 flex-grow text-[var(--color-text-secondary)]">
                  {offer.description}
                </p>

                {offer.code && (
                  <div className="flex items-center justify-between gap-2 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-secondary)] px-3 py-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                      <Ticket size={13} aria-hidden="true" /> Code
                    </span>
                    <span className="font-mono text-xs font-bold text-[var(--green-dark)]">{offer.code}</span>
                  </div>
                )}

                <Link
                  href={getOfferHref(offer.category)}
                  className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--green-dark)] px-4 text-sm font-bold text-white transition-colors hover:bg-[var(--green)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
                >
                  Book now <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}