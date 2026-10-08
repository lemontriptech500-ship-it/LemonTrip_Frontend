import { BadgePercent, Headset, LockKeyhole, ClipboardCheck } from 'lucide-react'
import { Container } from '@/components/ui'

const trustPoints = [
  { icon: BadgePercent, title: 'Best Price Guarantee', detail: 'Find the best deals' },
  { icon: Headset, title: '24/7 Customer Support', detail: "We're here to help" },
  { icon: LockKeyhole, title: 'Secure Booking', detail: 'Your data is protected' },
  { icon: ClipboardCheck, title: 'Flexible Options', detail: 'Change with ease' },
]

/** Premium trust strip: dark green band, yellow icon discs, thin dividers. */
export function TrustSection() {
  return (
    <section aria-label="LemonTrip booking benefits" className="relative bg-[var(--green-dark)] py-7 sm:py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,210,0,0.5)] to-transparent"
      />
      <Container>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
          {trustPoints.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex items-center gap-3 lg:justify-center lg:px-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--green-dark)] shadow-[0_6px_18px_rgba(255,210,0,0.25)] sm:h-12 sm:w-12">
                <Icon size={21} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold leading-tight text-white sm:text-sm">{title}</span>
                <span className="mt-0.5 block text-[11px] leading-snug text-white/65 sm:text-xs">{detail}</span>
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}