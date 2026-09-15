'use client'

import { useState } from 'react'
import { Loader2, Wallet as WalletIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button, Alert } from '@/components/ui'
import { createRazorpayTravelOrder, verifyRazorpayTravelPayment, payWithWallet, type TravelItemType, type PaymentMethod } from '@/services/travelPaymentService'
import { createRazorpayHotelOrder, verifyRazorpayHotelPayment } from '@/services/hotelService'
import { WalletPaymentForm } from './WalletPaymentForm'
import { validateCoupon } from '@/services/couponService'

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
  amount?: number
  currency?: string
  initialEmail?: string
  initialPhone?: string
  initialQuantity?: number
  extraDetails?: Record<string, unknown>
  showQuantity?: boolean
  showPaymentMethod?: boolean
  bookingReference?: string
}

export function TravelRazorpayCheckout({
  itemType,
  itemId,
  label,
  quantityLabel,
  amount = 0,
  currency = 'INR',
  initialEmail = '',
  initialPhone = '',
  initialQuantity = 1,
  extraDetails = {},
  showQuantity = true,
  showPaymentMethod = true,
  bookingReference = '',
}: TravelRazorpayCheckoutProps) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay')
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState(initialPhone)
  const [quantity, setQuantity] = useState(String(initialQuantity))
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [couponMessage, setCouponMessage] = useState<string | null>(null)
  const [couponApplied, setCouponApplied] = useState(false)

  async function handleApplyCoupon() {
    setCouponMessage(null)
    setCouponApplied(false)
    const code = couponCode.trim()
    if (!code) {
      setCouponMessage('Enter a coupon code.')
      return
    }
    const numericQuantity = Number(quantity)
    const previewAmount = showQuantity ? amount * numericQuantity : amount
    const result = await validateCoupon(code, previewAmount, itemType)
    if (!result.valid) {
      setCouponMessage(result.error || 'Coupon could not be applied.')
      return
    }
    setCouponApplied(true)
    setCouponMessage(`Coupon applied. Discount: ${result.discountAmount ?? 0}`)
  }

  async function handleRazorpayCheckout() {
    setError(null)
    const numericQuantity = Number(quantity)
    if (!email || !email.includes('@') || !Number.isInteger(numericQuantity) || numericQuantity < 1) {
      setError('Enter a valid email and quantity to continue.')
      return
    }

    setProcessing(true)
    try {
      await loadRazorpayScript()
      const order = itemType === 'hotel'
        ? await createRazorpayHotelOrder({ hotelId: itemId, checkIn: String(extraDetails.checkIn || ''), checkOut: String(extraDetails.checkOut || ''), selections: Array.isArray(extraDetails.selections) ? extraDetails.selections : [], details: { ...extraDetails, email, phone }, couponCode: couponCode.trim() })
        : await createRazorpayTravelOrder({ itemType, itemId, quantity: numericQuantity, couponCode: couponCode.trim(), details: { ...extraDetails, email, phone } })
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
            const verified = itemType === 'hotel'
              ? await verifyRazorpayHotelPayment({ bookingId: order.bookingId, razorpayOrderId: payment.razorpay_order_id, razorpayPaymentId: payment.razorpay_payment_id, razorpaySignature: payment.razorpay_signature })
              : await verifyRazorpayTravelPayment({ bookingId: order.bookingId, itemType: itemType === 'bus' ? 'bus' : itemType === 'train' ? 'train' : 'travel', razorpayOrderId: payment.razorpay_order_id, razorpayPaymentId: payment.razorpay_payment_id, razorpaySignature: payment.razorpay_signature })
            const query = new URLSearchParams({ itemType })
            if (verified.bookingReference) query.set('bookingReference', verified.bookingReference)
            router.push(itemType === 'hotel' ? `/hotels/${itemId}/confirmation?${query.toString()}` : `/payment-success?${query.toString()}`)
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

  async function handleWalletPayment() {
    setError(null)
    const numericQuantity = Number(quantity)
    if (!email || !email.includes('@') || !Number.isInteger(numericQuantity) || numericQuantity < 1) {
      setError('Enter a valid email and quantity to continue.')
      return
    }

    setProcessing(true)
    try {
      const result = await payWithWallet({
        itemType,
        itemId,
        quantity: numericQuantity,
        couponCode: couponCode.trim(),
        details: { ...extraDetails, email, phone },
      })
      
      if (result.status === 'SUCCESS') {
        const query = new URLSearchParams({ itemType, paymentMethod: 'wallet' })
        if (result.bookingReference) query.set('bookingReference', result.bookingReference)
        router.push(`/payment-success?${query.toString()}`)
      } else {
        setError('Wallet payment failed. Please try again.')
        setProcessing(false)
      }
    } catch (walletError) {
      setError(walletError instanceof Error ? walletError.message : 'Unable to process wallet payment.')
      setProcessing(false)
    }
  }

  return (
    <div className="mt-6 border-t border-[var(--color-border-light)] pt-6">
      {showPaymentMethod && (
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-[var(--color-text-secondary)]">Payment Method</p>
          <div className="flex gap-3">
            <button
              onClick={() => setPaymentMethod('razorpay')}
              className={`flex-1 rounded-[var(--radius-md)] border-2 p-3 text-center font-medium transition ${
                paymentMethod === 'razorpay'
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                  : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]'
              }`}
            >
              💳 Card/Razorpay
            </button>
            <button
              onClick={() => setPaymentMethod('wallet')}
              className={`flex-1 rounded-[var(--radius-md)] border-2 p-3 text-center font-medium transition ${
                paymentMethod === 'wallet'
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                  : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]'
              }`}
            >
              <WalletIcon size={16} className="inline mr-1" /> Wallet
            </button>
          </div>
        </div>
      )}

      {paymentMethod === 'wallet' && (
        <div className="mb-6">
          <WalletPaymentForm amount={showQuantity ? amount * Number(quantity) : amount} currency={currency} isLoading={processing} error={error} />
        </div>
      )}

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
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input value={couponCode} onChange={(event) => { setCouponCode(event.target.value.toUpperCase()); setCouponApplied(false); setCouponMessage(null) }} placeholder="Coupon code" className="h-10 flex-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-text-primary)]" />
        <Button type="button" variant="outline" onClick={handleApplyCoupon}>Apply coupon</Button>
      </div>
      {couponMessage && <p className={`mt-2 text-sm ${couponApplied ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>{couponMessage}</p>}
      {error && <p className="mt-3 text-sm font-medium text-[var(--color-error)]">{error}</p>}
      <Button 
        className="mt-4" 
        onClick={paymentMethod === 'wallet' ? handleWalletPayment : handleRazorpayCheckout} 
        disabled={processing} 
        icon={processing ? <Loader2 size={16} className="animate-spin" /> : undefined}
      >
        {processing ? 'Processing...' : paymentMethod === 'wallet' ? 'Pay with Wallet' : 'Pay securely with Razorpay'}
      </Button>
    </div>
  )
}
