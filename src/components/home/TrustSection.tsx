import { BadgeCheck, Headset, LockKeyhole, RefreshCw } from 'lucide-react'
import { Container } from '@/components/ui'

const trustPoints = [
  { icon: BadgeCheck, title: 'Best price guarantee' },
  { icon: Headset, title: '24/7 travel support' },
  { icon: LockKeyhole, title: 'Safe & secure booking' },
  { icon: RefreshCw, title: 'Flexible options' },
]

export function TrustSection() {
  return (
    <section aria-label="LemonTrip booking benefits" className="hidden border-b border-[var(--color-border-light)] bg-white py-5 sm:py-6 lg:block">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-between">
          {trustPoints.map(({ icon: Icon, title }) => (
            <div key={title} className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--yellow-soft)] text-[var(--green-dark)]">
                <Icon size={16} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold text-[var(--green-dark)] sm:text-sm">{title}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
