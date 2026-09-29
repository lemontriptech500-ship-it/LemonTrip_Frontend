import Image from 'next/image'
import Link from 'next/link'
import { Container, SectionHeading, Card, Button } from '@/components/ui'
import { searchPackages } from '@/services/packageService'
import { popularPackages as fallbackPackages } from '@/data/packages'
import { Clock, CheckCircle2 } from 'lucide-react'

/**
 * PopularPackages
 * ------------------------------------------------------------
 * Restyled to match the reference index.html "Featured
 * Experiences" package cards, which put the price and the CTA
 * side-by-side in a footer row rather than floating the price
 * over the photo and running a full-width outline button below:
 *
 *  - Removed the small price chip floating over the image.
 *  - Added an optional badge pill, top-left over the image
 *    (e.g. "Best Seller" / "Popular" / "Luxury") — only renders
 *    if `pkg.badge` exists in your data, so this is a no-op until
 *    you add that field; nothing breaks if it's absent.
 *  - Price moved to a "Starting from / ₹X" block in the footer,
 *    next to a solid (not outline) brand-yellow "View Details"
 *    button — this is the single biggest visual match to the
 *    reference's package cards.
 *  - Card corners/shadow bumped to rounded-2xl + --shadow-lg,
 *    consistent with FeaturedOffers and TrendingDestinations.
 *  - Duration + highlights checklist kept as-is — that's useful
 *    detail the reference doesn't have, no reason to drop it.
 */

export async function PopularPackages() {
  let packages = fallbackPackages
  try {
    packages = (await searchPackages({})).packages
  } catch {
    // Keep the homepage renderable while the catalog API recovers.
  }
  return (
    <section className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading
          title="Popular Holiday Packages"
          description="Handpicked travel packages for your perfect getaway."
          action={{ label: 'Explore Packages', href: '/packages' }}
        />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {packages.slice(0, 3).map((pkg) => (
            <Card
              key={pkg.id}
              hover
              className="flex h-full flex-col overflow-hidden rounded-2xl !shadow-[var(--shadow-lg)]"
            >
              <div className={`relative h-48 w-full ${pkg.imageFallbackColor}`}>
                {pkg.imageUrl && (
                  <Image
                    src={pkg.imageUrl}
                    alt={`${pkg.destination} travel package`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,62,80,0.40)] to-transparent" />

                {pkg.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-[var(--color-primary)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[var(--color-secondary)]">
                    {pkg.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-grow flex-col p-5">
                <div className="mb-2 flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <Clock size={14} />
                  <span className="text-xs font-medium">{pkg.duration}</span>
                </div>

                <h3 className="text-h3 mb-2">{pkg.destination}</h3>
                <p className="text-body-sm text-[var(--color-text-secondary)] mb-4 flex-grow">
                  {pkg.description}
                </p>

                <div className="mb-5 space-y-1.5">
                  {pkg.highlights.slice(0, 3).map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[var(--color-text-primary)]">
                      <CheckCircle2 size={14} className="text-[var(--color-success)] shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Price + CTA footer row, matching the reference's
                    package card layout */}
                <div className="mt-auto flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                  <div>
                    <p className="text-caption text-[var(--color-text-muted)]">Starting from</p>
                    <p className="text-base font-bold text-[var(--color-success)]">{pkg.startingPrice}</p>
                  </div>
                  <Button variant="primary" asChild>
                    <Link href={`/packages/${pkg.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}