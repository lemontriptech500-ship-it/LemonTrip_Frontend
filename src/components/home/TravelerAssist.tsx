import { Container, SectionHeading } from '@/components/ui'
import { Phone, MessageCircle, Clock, ShieldCheck, Headset } from 'lucide-react'

const perks = [
  {
    icon: Clock,
    title: 'Under 60 seconds',
    detail: 'Typical response from our India-based travel desk',
  },
  {
    icon: ShieldCheck,
    title: 'Safety assistance',
    detail: 'Real help on the ground if your plans change',
  },
  {
    icon: Headset,
    title: 'Before, during & after',
    detail: 'One team for your whole trip, start to finish',
  },
]

/**
 * TravelerAssist — premium "LemonTrip promises" panel:
 * dark green stage with glow + dot pattern, headline and CTAs on the left,
 * three glass info tiles on the right.
 */
export function TravelerAssist() {
  return (
    <section className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading eyebrow="Travel with confidence" title="LemonTrip promises" />

        <div className="surface-dark relative mt-10 overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-xl)]">
          {/* glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-[rgba(255,210,0,0.18)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[rgba(17,128,71,0.45)] blur-3xl"
          />
          {/* dot pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          <div className="relative grid gap-10 p-7 sm:p-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14">
            {/* Left: message + buttons */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-primary)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                </span>
                24/7 Traveler Assist
              </span>

              <h3 className="mt-6 text-3xl font-extrabold leading-[1.1] text-white sm:text-5xl">
                A real travel expert, whenever you <span className="text-highlight">need one.</span>
              </h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
                Call, WhatsApp or ask in-trip. A real person from our team picks up, so you are never left figuring it
                out alone.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+919812042030"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-white px-7 py-3.5 text-sm font-bold text-[var(--green-dark)] transition-colors hover:bg-[var(--yellow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--green-dark)]"
                >
                  <Phone size={16} aria-hidden="true" />
                  Call now
                </a>
                <a
                  href="https://wa.me/919812042030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-7 py-3.5 text-sm font-bold text-[var(--green-dark)] shadow-[0_10px_30px_rgba(255,210,0,0.25)] transition-colors hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--green-dark)]"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  WhatsApp us
                </a>
              </div>
            </div>

            {/* Right: glass tiles */}
            <ul className="grid gap-4">
              {perks.map(({ icon: Icon, title, detail }) => (
                <li
                  key={title}
                  className="flex items-center gap-4 rounded-[var(--radius-xl)] border border-white/15 bg-white/[0.07] p-5 backdrop-blur-md transition-colors duration-200 hover:bg-white/[0.12]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[var(--green-dark)] shadow-[0_8px_22px_rgba(255,210,0,0.25)]">
                    <Icon size={22} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-extrabold text-white">{title}</p>
                    <p className="mt-0.5 text-sm leading-snug text-white/65">{detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}