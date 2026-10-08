import { Container } from '@/components/ui'
import { Compass, CalendarCheck, FileCheck2, ShieldCheck } from 'lucide-react'

const features = [
  {
    id: 1,
    icon: Compass,
    title: 'Every trip, one place',
    description: 'Flights, stays, trains, buses and holidays come together in one booking experience.',
  },
  {
    id: 2,
    icon: CalendarCheck,
    title: 'Easy from start to finish',
    description: 'Compare options clearly and book your journey in a few simple steps.',
  },
  {
    id: 3,
    icon: FileCheck2,
    title: 'Visa help when you need it',
    description: 'Get practical guidance and support through your visa application.',
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: 'Care you can count on',
    description: 'Our support team is ready to help before, during and after your trip.',
  },
]

/**
 * WhyChooseUs — premium version:
 * soft gradient backdrop, eyebrow + accent line, numbered cards with a
 * dark-green icon tile, yellow top bar and lift on hover.
 */
export function WhyChooseUs() {
  return (
    <section className="section-gap relative overflow-hidden bg-[var(--color-surface)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[var(--color-background-soft)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-[rgba(255,210,0,0.12)] blur-3xl"
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Why LemonTrip</p>
          <h2 className="text-h2 mt-3 text-[var(--color-text-primary)]">
            Why Choose <span className="text-[var(--green-2)]">LemonTrip</span>
          </h2>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
          <p className="text-body mt-5 text-[var(--color-text-secondary)]">
            We are committed to providing you with the best travel booking experience.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <article
                key={feature.id}
                className="group relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border-light)] bg-white p-7 shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-xl)]"
              >
                {/* yellow bar that slides in on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[var(--color-primary)] transition-transform duration-300 group-hover:scale-x-100"
                />

                {/* big faded number */}
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-4 select-none text-5xl font-extrabold leading-none text-[rgba(11,58,41,0.07)]"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--green-dark)] text-[var(--color-primary)] shadow-[var(--shadow-md)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                  <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                </div>

                <h3 className="mt-6 text-xl font-extrabold leading-snug text-[var(--color-text-primary)]">
                  {feature.title}
                </h3>
                <p className="text-body-sm mt-2.5 text-[var(--color-text-secondary)]">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}