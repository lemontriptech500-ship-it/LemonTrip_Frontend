import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import { Container, SectionHeading } from '@/components/ui'

const destinations = [
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    note: 'A city of skyline views and desert escapes',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85',
    badge: 'Popular destination',
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    note: 'Find your next adventure in Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=85',
    badge: 'LemonTrip favourite',
  },
]

export function PopularDestinations() {
  return (
    <section
      id="popular-destinations"
      aria-label="Popular destinations and travel offers"
      className="section-gap bg-[var(--color-background-soft)]"
    >
      <Container>
        <SectionHeading
          eyebrow="Where to next"
          title="Popular Destinations"
          description="Explore places travellers love and find an offer for your next getaway."
          action={{ label: 'Explore all packages', href: '/packages' }}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.name}
              href="/packages"
              aria-label={`Explore LemonTrip trips to ${destination.name}, ${destination.country}`}
              className="group relative flex min-h-[380px] items-end overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--green-dark)] shadow-[var(--shadow-md)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-xl)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-2)] focus-visible:ring-offset-2"
            >
              <Image
                src={destination.image}
                alt={`${destination.name}, ${destination.country}`}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[rgba(11,58,41,0.92)] via-[rgba(11,58,41,0.25)] to-transparent" />

              <span className="absolute left-5 top-5 rounded-full bg-[var(--color-primary)] px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[var(--green-dark)] shadow-[var(--shadow-sm)]">
                {destination.badge}
              </span>

              <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur transition-colors duration-200 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--green-dark)]">
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>

              <span className="relative z-10 block p-6 text-white sm:p-7">
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
                  <MapPin size={13} aria-hidden="true" />
                  {destination.country}
                </span>
                <span className="mt-2 block text-3xl font-extrabold leading-tight">{destination.name}</span>
                <span className="mt-2 block max-w-xs text-sm leading-snug text-white/75">{destination.note}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)]">
                  Explore trips
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </span>
            </Link>
          ))}

          <Link
            href="/offers"
            aria-label="Browse current LemonTrip travel offers"
            className="group surface-dark relative flex min-h-[380px] items-end overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-md)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-xl)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-2)] focus-visible:ring-offset-2 md:col-span-2 xl:col-span-1"
          >
            <Image
              src="/hero.png"
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 100vw, 33vw"
              className="object-cover object-right opacity-40 transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[var(--green-dark)] via-[rgba(11,58,41,0.7)] to-[rgba(11,58,41,0.35)]" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[rgba(255,210,0,0.22)] blur-3xl"
            />

            <span className="relative z-10 block max-w-sm p-6 sm:p-8">
              <span className="eyebrow">LemonTrip offers</span>
              <span className="mt-3 block text-3xl font-extrabold leading-tight">
                A little more adventure, for a little <span className="text-highlight">less.</span>
              </span>
              <span className="mt-6 inline-flex h-12 items-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-6 text-sm font-bold text-[var(--green-dark)] transition-colors group-hover:bg-white">
                Browse current offers <ArrowRight size={15} aria-hidden="true" />
              </span>
            </span>
          </Link>
        </div>
      </Container>
    </section>
  )
}