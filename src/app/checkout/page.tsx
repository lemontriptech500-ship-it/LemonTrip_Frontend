import type { Metadata } from 'next'
import { Container, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your travel booking on LemonTrip.',
}

export default function CheckoutPage() {
  return (
    <Container className="section-gap">
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <Badge variant="warning">Coming Soon</Badge>
        <h1 className="text-h1 text-[var(--color-text-primary)]">Checkout</h1>
        <p className="text-body text-[var(--color-text-secondary)] max-w-md">
          The Checkout module is under construction. Check back soon.
        </p>
      </div>
    </Container>
  )
}
