import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Tag } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'
import { featuredOffers } from '@/data/offers'

export const metadata: Metadata = {
  title: 'Offers',
  description: 'Discover current promotions across flights, stays, packages, and visa support.',
}

export const dynamic = 'force-dynamic'

export default function OffersPage() {
  const today = new Date().toISOString().slice(0, 10)
  const activeOffers = featuredOffers.filter((offer) => !offer.validTill || offer.validTill >= today)

  return (
    <div className="bg-[var(--color-background)] pb-16 sm:pb-20">
      <FlightPageHero
        compact
        backgroundImage={PAGE_HERO_IMAGES.offer}
        title="Offers for your next getaway"
        subtitle="Find a little more room in your travel budget with deals across flights, stays, and experiences."
      />

      <section className="py-8 sm:py-12">
        <Container>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--green-2)]">LemonTrip exclusives</p>
              <h2 className="mt-1 font-heading text-3xl font-semibold leading-tight text-[var(--green-dark)] sm:text-4xl">A better deal is a better start</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">Browse available savings and apply the offer that fits your plans.</p>
            </div>
            <span className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--green-dark)]">
              {activeOffers.length} active {activeOffers.length === 1 ? 'offer' : 'offers'}
            </span>
          </div>

          {activeOffers.length ? (
            <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {activeOffers.map((offer) => (
                <Card key={offer.id} padding="none" hover className="group relative min-h-[390px] overflow-hidden border-0 !bg-[var(--green-dark)] !shadow-[var(--shadow-md)] sm:min-h-[420px]">
                  <div className={`absolute inset-0 ${offer.imageColor}`}>
                    {offer.imageUrl && <img src={offer.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031f18]/95 via-[#063b24]/45 to-[#031f18]/10" />

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#063b24]/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      <Tag size={13} aria-hidden="true" />{offer.category}
                    </span>
                    {offer.discount && <span className="rounded-full bg-[var(--yellow)] px-3 py-1.5 text-xs font-extrabold text-[var(--green-dark)] shadow-md">{offer.discount}</span>}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                    <h3 className="font-heading text-2xl font-semibold leading-tight sm:text-3xl">{offer.title}</h3>
                    <p className="mt-2 line-clamp-2 max-w-lg text-sm leading-relaxed text-white/80">{offer.description}</p>

                    {offer.code && (
                      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-dashed border-white/55 bg-black/15 px-4 py-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">Use code</span>
                        <span className="font-mono text-sm font-bold tracking-wide text-[var(--yellow)]">{offer.code}</span>
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      {offer.validTill ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-white/75">
                          <CalendarDays size={14} aria-hidden="true" />
                          Until {new Date(`${offer.validTill}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                      ) : <span />}
                      <Button size="sm" asChild icon={<ArrowRight size={14} />} iconPosition="right">
                        <Link href={`/offers/${offer.id}`}>View offer</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Tag className="mx-auto text-[var(--green-2)]" size={32} aria-hidden="true" />
              <h3 className="mt-3 font-heading text-2xl font-semibold text-[var(--green-dark)]">More offers are on the way</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Check back soon for new ways to save on your next trip.</p>
            </Card>
          )}
        </Container>
      </section>
    </div>
  )
}
