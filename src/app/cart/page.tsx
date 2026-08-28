import type { Metadata } from 'next'
import { Container, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Your travel cart on LemonTrip.',
}

export default function CartPage() {
  return (
    <Container className="section-gap">
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <Badge variant="warning">Coming Soon</Badge>
        <h1 className="text-h1 text-[var(--color-text-primary)]">Cart</h1>
        <p className="text-body text-[var(--color-text-secondary)] max-w-md">
          The Cart module is under construction. Check back soon.
        </p>
      </div>
    </Container>
  )
}
