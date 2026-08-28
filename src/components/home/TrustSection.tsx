import React from 'react'
import { Container } from '@/components/ui'
import { Lock, CreditCard, LifeBuoy, Tag } from 'lucide-react'

export function TrustSection() {
  return (
    <section className="py-12 border-t border-b border-[var(--color-border-light)] bg-white">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-[var(--color-border-light)]">
          <div className="flex flex-col items-center p-4">
            <Lock className="text-[var(--color-text-muted)] mb-3" size={32} />
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">Secure Booking</h4>
            <p className="text-caption text-[var(--color-text-secondary)]">Your data is protected</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <CreditCard className="text-[var(--color-text-muted)] mb-3" size={32} />
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">Protected Payments</h4>
            <p className="text-caption text-[var(--color-text-secondary)]">Safe & encrypted</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <LifeBuoy className="text-[var(--color-text-muted)] mb-3" size={32} />
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">Travel Support</h4>
            <p className="text-caption text-[var(--color-text-secondary)]">Assistance when needed</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <Tag className="text-[var(--color-text-muted)] mb-3" size={32} />
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">Transparent Pricing</h4>
            <p className="text-caption text-[var(--color-text-secondary)]">No hidden fees</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
