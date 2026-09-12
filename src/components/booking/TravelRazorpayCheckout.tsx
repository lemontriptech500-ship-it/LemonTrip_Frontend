'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'
import { createRazorpayTravelOrder, verifyRazorpayTravelPayment, type TravelItemType } from '@/services/travelPaymentService'

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void }
  }
}

function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Razorpay Checkout could not load.'))
    document.body.appendChild(script)
  })
}

interface TravelRazorpayCheckoutProps {
  itemType: TravelItemType
  itemId: string
  label: string
  quantityLabel: string
  initialEmail?: string
  initialPhone?: string
  initialQuantity?: number
  extraDetails?: Record<string, unknown>
  showQuantity?: boolean
}

export function TravelRazorpayCheckout({
  itemType,
  itemId,
  label,
  quantityLabel,
  initialEmail = '',
  initialPhone = '',
  initialQuantity = 1,
  extraDetails = {},
  showQuantity = true,
}: TravelRazorpayCheckoutProps) {
  const router = useRouter()
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState(initialPhone)
  const [quantity, setQuantity] = useState(String(initialQuantity))
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  async function handleCheckout() {
    setError(null)
    const numericQuantity = Number(quantity)
    if (!email || !email.includes('@') || !Number.isInteger(numericQuantity) || numericQuantity < 1) {
      setError('Enter a valid email and quantity to continue.')
      return
    }

    setProcessing(true)
    try {
      await loadRazorpayScript()
      const order = await createRazorpayTravelOrder({ itemType, itemId, quantity: numericQuantity, details: { ...extraDetails, email, phone } })
      if (!window.Razorpay) throw new Error('Razorpay Checkout is unavailable.')

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'LemonTrip',
        description: label,
        order_id: order.orderId,
        prefill: { email, contact: phone },
        theme: { color: '#ffd21a' },
        handler: async (payment: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          try {
            const verified = await verifyRazorpayTravelPayment({
              bookingId: order.bookingId,
              itemType: itemType === 'bus' ? 'bus' : 'travel',
              razorpayOrderId: payment.razorpay_order_id,
              razorpayPaymentId: payment.razorpay_payment_id,
              razorpaySignature: payment.razorpay_signature,
            })
            const query = new URLSearchParams({ itemType })
            if (verified.bookingReference) query.set('bookingReference', verified.bookingReference)
            router.push(`/payment-success?${query.toString()}`)
          } catch (verificationError) {
            setError(verificationError instanceof Error ? verificationError.message : 'Payment verification failed.')
            setProcessing(false)
          }
        },
        modal: { ondismiss: () => setProcessing(false) },
      })
      checkout.open()
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Unable to start Razorpay Checkout.')
      setProcessing(false)
    }
  }

  return (
    <div className="mt-6 border-t border-[var(--color-border-light)] pt-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="text-sm font-medium text-[var(--color-text-secondary)] sm:col-span-2">
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@example.com" className="mt-1 h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)]" />
        </label>
        {showQuantity && (
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">
            {quantityLabel}
            <input value={quantity} onChange={(event) => setQuantity(event.target.value)} type="number" min="1" className="mt-1 h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)]" />
          </label>
        )}
        <label className="text-sm font-medium text-[var(--color-text-secondary)] sm:col-span-2">
          Phone (optional)
          <input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" placeholder="+91 98765 43210" className="mt-1 h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)]" />
        </label>
      </div>
      {error && <p className="mt-3 text-sm font-medium text-[var(--color-error)]">{error}</p>}
      <Button className="mt-4" onClick={handleCheckout} disabled={processing} icon={processing ? <Loader2 size={16} className="animate-spin" /> : undefined}>
        {processing ? 'Processing...' : 'Pay securely with Razorpay'}
      </Button>
    </div>
  )
}
