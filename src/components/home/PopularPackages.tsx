import Image from 'next/image'
import Link from 'next/link'
import { Container, SectionHeading, Card } from '@/components/ui'
import { searchPackages } from '@/services/packageService'
import { popularPackages as fallbackPackages } from '@/data/packages'
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react'

/**
 * PopularPackages — Figma "Featured packages" look:
 * photo with the name + price over it, a small badge chip,
 * highlight chips, and a yellow "View Details" button.
 * Data / fetching logic is unchanged.
 */

export async function PopularPackages() {
  let packages = fallbackPackages
  try {
    packages = (await searchPackages({})).packages
  } catch {
    // Keep the homepage renderable while the catalog API recovers.
  }
  return (
    <section className="section-gap bg-[var(--color-background-soft)]">
      <Container>
        <p className="eyebrow mb-2">Handpicked for you</p>
        <SectionHeading
          title="Popular Holiday Packages"
          description="Handpicked travel packages for your perfect getaway."
          action={{ label: 'Explore Packages', href: '/packages' }}
        />

        <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 3).map((pkg) => (
            <Card
              key={pkg.id}
              hover
              padding="none"
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] !shadow-[var(--shadow-md)] hover:!shadow-[var(--shadow-xl)]"
            >
              <div className={`relative h-56 w-full overflow-hidden ${pkg.imageFallbackColor}`}>
                {pkg.imageUrl && (
                  <Image
                    src={pkg.imageUrl}
                    alt={`${pkg.destination} travel package`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,59,36,0.85)] via-[rgba(6,59,36,0.15)] to-transparent" />

                {pkg.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--color-primary)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[var(--green-dark)]">
                    {pkg.badge}
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="text-xl font-extrabold leading-tight">{pkg.destination}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-white/85">
                    <Clock size={13} aria-hidden="true" />
                    {pkg.duration}
                  </p>
                </div>
              </div>

              <div className="flex flex-grow flex-col p-5">
                <p className="mb-4 line-clamp-2 flex-grow text-body-sm text-[var(--color-text-secondary)]">
                  {pkg.description}
                </p>

                <ul className="mb-5 flex flex-wrap gap-2">
                  {pkg.highlights.slice(0, 3).map((highlight, i) => (
                    <li
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-[11px] font-semibold text-[var(--color-text-primary)]"
                    >
                      <CheckCircle2 size={12} className="shrink-0 text-[var(--color-success)]" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--color-border-light)] pt-4">
                  <div>
                    <p className="eyebrow !text-[10px]">Starting from</p>
                    <p className="text-base font-extrabold leading-snug text-[var(--green-dark)]">{pkg.startingPrice}</p>
                  </div>
                  <Link
                    href={`/packages/${pkg.id}`}
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-5 text-sm font-bold text-[var(--green-dark)] transition-colors hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-2)] focus-visible:ring-offset-2"
                  >
                    View Details <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}