import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, SectionHeading } from '@/components/ui'

const destinations = [
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    note: 'A city of skyline views and desert escapes',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=85',
    badge: 'Popular destination',
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    note: 'Find your next adventure in Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=85',
    badge: 'LemonTrip favourite',
  },
]

export function PopularDestinations() {
  return (
    <section id="popular-destinations" aria-label="Popular destinations and travel offers" className="section-gap bg-[var(--color-background-soft)]">
      <Container>
        <SectionHeading
          title="Popular Destinations"
          description="Explore places travellers love and find an offer for your next getaway."
          action={{ label: 'Explore all packages', href: '/packages' }}
        />
        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.name}
              href="/packages"
              aria-label={`Explore LemonTrip trips to ${destination.name}, ${destination.country}`}
              className="group grid min-h-[208px] grid-cols-[1fr_1fr] overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border-light)] bg-white shadow-[var(--shadow-md)] transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-2)]"
            >
              <span className="flex flex-col items-start justify-center p-4 sm:p-5">
                <span className="rounded-full bg-[var(--color-background-soft)] px-2.5 py-1 text-[9px] font-bold text-[var(--green-dark)] sm:text-[10px]">
                  {destination.badge}
                </span>
                <span className="mt-2 text-lg font-bold leading-tight text-[var(--green-dark)] sm:text-xl">
                  {destination.name}
                </span>
                <span className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                  {destination.country}
                </span>
                <span className="mt-2 text-xs leading-snug text-[var(--color-text-secondary)]">
                  {destination.note}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[var(--green)]">
                  Explore trips <ArrowRight size={14} aria-hidden="true" />
                </span>
              </span>
              <span className="relative min-h-full overflow-hidden bg-[var(--color-background-soft)]">
                <Image
                  src={destination.image}
                  alt={`${destination.name}, ${destination.country}`}
                  fill
                  sizes="(max-width: 767px) 55vw, (max-width: 1279px) 28vw, 18vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
            </Link>
          ))}

          <Link
            href="/offers"
            aria-label="Browse current LemonTrip travel offers"
            className="group relative flex min-h-[208px] items-end overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--green-dark)] p-5 text-white shadow-[var(--shadow-md)] transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-2)] sm:p-6"
          >
            <Image
              src="/hero.png"
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 28vw"
              className="object-cover object-right opacity-45 transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--green-dark)] via-[rgba(6,59,36,0.78)] to-[rgba(6,59,36,0.2)]" />
            <span className="relative z-10 max-w-[260px]">
              <span className="mb-2 inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white sm:text-[10px]">
                LemonTrip offers
              </span>
              <span className="block text-xl font-bold leading-tight sm:text-2xl">A little more adventure, for a little less.</span>
              <span className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[var(--yellow)] px-3.5 py-2 text-xs font-bold text-[var(--green-dark)] transition group-hover:bg-white">
                Browse current offers <ArrowRight size={14} aria-hidden="true" />
              </span>
            </span>
          </Link>
        </div>
      </Container>
    </section>
  )
}
