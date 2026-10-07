import { BadgePercent, Headset, LockKeyhole, ClipboardCheck } from 'lucide-react'
import { Container } from '@/components/ui'

const trustPoints = [
  { icon: BadgePercent, title: 'Best Price Guarantee', detail: 'Find the best deals' },
  { icon: Headset, title: '24/7 Customer Support', detail: "We're here to help" },
  { icon: LockKeyhole, title: 'Secure Booking', detail: 'Your data is protected' },
  { icon: ClipboardCheck, title: 'Flexible Options', detail: 'Change with ease' },
]

export function TrustSection() {
  return (
    <section aria-label="LemonTrip booking benefits" className="bg-white py-5 sm:py-6">
      <Container>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-4 lg:gap-6">
          {trustPoints.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex items-center justify-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--yellow)] text-[var(--green-dark)] sm:h-11 sm:w-11">
                <Icon size={20} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold leading-tight text-[var(--green-dark)] sm:text-sm">{title}</span>
                <span className="mt-0.5 block text-[10px] leading-snug text-[var(--color-text-secondary)] sm:text-[11px]">{detail}</span>
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
