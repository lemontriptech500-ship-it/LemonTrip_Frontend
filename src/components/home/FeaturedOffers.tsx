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
    <section className="bg-[var(--color-surface)] py-6 sm:py-8 lg:pb-0 lg:pt-5">
      <Container>
        <div className="mb-5 flex items-end justify-between gap-2 lg:mb-2">
          <div className="min-w-0">
            <h2 className="font-heading text-[clamp(1.65rem,7vw,2.25rem)] font-semibold leading-none tracking-tight text-[var(--color-text-primary)]">
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

        <div className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-3 lg:grid-cols-4">
          {activeOffers.map((offer) => (
            <Card
              key={offer.id}
              hover
              padding="none"
              className="group relative flex h-[218px] w-[84vw] max-w-[360px] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] !bg-neutral-900 !shadow-[var(--shadow-sm)] transition hover:!shadow-[var(--shadow-lg)] sm:h-full sm:w-auto sm:max-w-none sm:shrink sm:!bg-white sm:hover:!shadow-[var(--shadow-lg)]"
            >
              <div className={`absolute inset-0 h-full w-full overflow-hidden sm:relative sm:h-36 lg:h-32 2xl:h-36 ${offer.imageColor}`}>
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
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,25,20,0.9)] via-[rgba(3,25,20,0.18)] to-transparent sm:from-[rgba(6,59,36,0.55)]" />

                {/* Category as a solid badge pill, like the reference's "BEST SELLER" tag */}
                <span className="absolute left-3 top-3 rounded-full bg-[var(--yellow)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[var(--green-dark)]">
                  {offer.category}
                </span>
              </div>

                <div className="relative z-10 mt-auto flex flex-grow flex-col p-4 text-white sm:mt-0 sm:text-inherit">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-1 sm:gap-2">
                  <h3 className="line-clamp-1 text-sm font-bold text-white sm:text-[var(--green-dark)]">{getOfferTitle(offer.title)}</h3>
                  {offer.discount && <span className="shrink-0 text-xs font-extrabold text-[var(--yellow)] sm:text-[var(--green-2)]">{offer.discount}</span>}
                </div>
                <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-white/90 sm:text-[var(--color-text-secondary)]">
                  {offer.description}
                </p>

                {offer.code && (
                  <div className="mt-auto flex items-center justify-between rounded-[var(--radius-sm)] border border-dashed border-white/70 bg-black/10 p-2 sm:border-[var(--color-border)] sm:bg-[var(--color-surface-secondary)]">
                    <span className="text-[10px] text-white/80 sm:text-[var(--color-text-muted)]">Code</span>
                    <span className="font-mono text-[11px] font-bold text-white sm:text-[var(--color-text-primary)]">
                      {offer.code}
                    </span>
                  </div>
                )}
                <Link
                  href={getOfferHref(offer.category)}
                  className="mt-3 inline-flex min-h-9 items-center justify-center gap-2 self-start rounded-full bg-[var(--yellow)] px-4 text-xs font-bold text-[var(--green-dark)] transition duration-200 hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-2)] sm:self-auto"
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
