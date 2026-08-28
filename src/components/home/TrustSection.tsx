import React from 'react'
import { Container } from '@/components/ui'
import { Lock, CreditCard, LifeBuoy, Tag } from 'lucide-react'

export function TrustSection() {
  return (
    <section className="py-10 border-t border-b border-[var(--color-border-light)] bg-[var(--color-surface)]">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center p-4">
            <Lock className="text-[var(--color-primary)] mb-2" size={28} />
            <h4 className="font-semibold text-sm text-[var(--color-text-primary)] mb-0.5">Secure Booking</h4>
            <p className="text-caption text-[var(--color-text-secondary)]">Your data is protected</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <CreditCard className="text-[var(--color-primary)] mb-2" size={28} />
            <h4 className="font-semibold text-sm text-[var(--color-text-primary)] mb-0.5">Protected Payments</h4>
            <p className="text-caption text-[var(--color-text-secondary)]">Safe & encrypted</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <LifeBuoy className="text-[var(--color-primary)] mb-2" size={28} />
            <h4 className="font-semibold text-sm text-[var(--color-text-primary)] mb-0.5">Travel Support</h4>
            <p className="text-caption text-[var(--color-text-secondary)]">Assistance when needed</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <Tag className="text-[var(--color-primary)] mb-2" size={28} />
            <h4 className="font-semibold text-sm text-[var(--color-text-primary)] mb-0.5">Transparent Pricing</h4>
            <p className="text-caption text-[var(--color-text-secondary)]">No hidden fees</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
