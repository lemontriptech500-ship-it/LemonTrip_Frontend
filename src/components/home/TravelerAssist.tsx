import Link from 'next/link'
import { Container } from '@/components/ui'
import { Phone, MessageCircle, Headset } from 'lucide-react'

/**
 * TravelerAssist — Figma "LemonTrip promises" card:
 * dark green panel, yellow 24/7 badge, Call + WhatsApp buttons.
 */
export function TravelerAssist() {
  return (
    <section className="section-gap bg-[var(--color-background)]">
      <Container>
        <p className="eyebrow mb-2">Travel with confidence</p>
        <h2 className="text-h2 mb-6 text-[var(--color-text-primary)]">LemonTrip promises</h2>

        <div className="surface-dark relative overflow-hidden rounded-[var(--radius-2xl)] p-6 shadow-[var(--shadow-xl)] sm:p-10">
          {/* Big faded icon in the corner, like the Figma phone */}
          <Headset
            size={180}
            strokeWidth={1.2}
            className="pointer-events-none absolute -bottom-6 right-6 hidden text-white/10 sm:block"
            aria-hidden="true"
          />

          <span className="absolute right-5 top-5 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-extrabold text-[var(--green-dark)] sm:right-8 sm:top-8">
            24/7
          </span>

          <div className="relative max-w-xl">
            <p className="eyebrow">Traveler assist</p>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-4xl">
              A real travel expert, <br className="hidden sm:block" />
              whenever you need one.
            </h3>
            <p className="mt-3 text-sm text-white/75">Call · WhatsApp · In-trip support</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+919812042030"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-white px-6 text-sm font-bold text-[var(--green-dark)] transition-colors hover:bg-[var(--yellow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--green-dark)]"
              >
                <Phone size={16} aria-hidden="true" />
                Call now
              </a>
              <a
                href="https://wa.me/919812042030"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-6 text-sm font-bold text-[var(--green-dark)] transition-colors hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--green-dark)]"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}