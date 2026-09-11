'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Button, Card, Container } from '@/components/ui'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const bookingReference = searchParams.get('bookingReference')
  const itemType = searchParams.get('itemType') || 'travel'
  const itemLabel = itemType === 'package' ? 'package' : `${itemType} booking`

  return (
    <div className="section-gap min-h-[70vh] bg-[var(--color-background)]">
      <Container className="max-w-2xl">
        <Card className="p-8 text-center sm:p-12">
          <CheckCircle2 size={56} className="mx-auto text-[var(--color-success)]" aria-hidden="true" />
          <h1 className="mt-6 text-h1 text-[var(--color-text-primary)]">Payment confirmed</h1>
          <p className="mx-auto mt-3 max-w-lg text-[var(--color-text-secondary)]">
            Your {itemLabel} has been confirmed. Keep this reference for your records.
          </p>
          {bookingReference && (
            <div className="mx-auto mt-6 max-w-sm rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">Booking reference</p>
              <p className="mt-1 font-mono text-xl font-bold text-[var(--color-text-primary)]">{bookingReference}</p>
            </div>
          )}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild><Link href="/">Plan another trip</Link></Button>
            <Button variant="outline" asChild><Link href="/bookings">View bookings</Link></Button>
          </div>
        </Card>
      </Container>
    </div>
  )
}

function PaymentSuccessFallback() {
  return (
    <div className="section-gap min-h-[70vh] bg-[var(--color-background)]">
      <Container className="max-w-2xl">
        <Card className="p-8 text-center sm:p-12">
          <p className="text-[var(--color-text-secondary)]">Loading payment confirmation...</p>
        </Card>
      </Container>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
