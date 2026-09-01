'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Building, CreditCard, Loader2 } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { BookingProgress, HOTEL_BOOKING_STEPS } from '@/components/booking/BookingProgress'
import { PaymentMethodSelector, type PaymentMethod } from '@/components/booking/PaymentMethodSelector'
import { UpiPaymentForm } from '@/components/booking/UpiPaymentForm'
import { CardPaymentForm } from '@/components/booking/CardPaymentForm'
import { NetBankingForm } from '@/components/booking/NetBankingForm'
import { WalletPaymentForm } from '@/components/booking/WalletPaymentForm'
import { PaymentSecurityNotice } from '@/components/booking/PaymentSecurityNotice'
import { HotelBookingSummary } from '@/components/hotels/HotelBookingSummary'
import { getHotelById } from '@/data/hotels'
import type { HotelBookingData } from '@/types/hotels'
import {
  getHotelSearchFromUrl,
  hotelBookingStorageKey,
  parseHotelBookingFromStorage,
  serializeHotelSearchParams,
  validateHotelBooking,
  type HotelBookingRecovery,
} from '@/lib/hotelUtils'

function recoveryHref(recovery: HotelBookingRecovery, hotelId: string, query: string): string {
  if (recovery === 'results') return query ? `/hotels?${query}` : '/hotels'
  if (recovery === 'guests') return `/hotels/${hotelId}/guests?${query}`
  return `/hotels/${hotelId}?${query}`
}

function recoveryLabel(recovery: HotelBookingRecovery): string {
  if (recovery === 'results') return 'Back to hotel results'
  if (recovery === 'guests') return 'Edit guest details'
  return 'Select rooms'
}

function HotelPaymentContent({ hotelId }: { hotelId: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = getHotelSearchFromUrl(searchParams)
  const query = serializeHotelSearchParams(search).toString()
  const hotel = getHotelById(hotelId)
  const [booking, setBooking] = useState<HotelBookingData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [methodError, setMethodError] = useState<string | undefined>()
  const [upiId, setUpiId] = useState('')
  const [upiError, setUpiError] = useState<string | undefined>()
  const [cardData, setCardData] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' })
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({})
  const [bank, setBank] = useState('')
  const [bankError, setBankError] = useState<string | undefined>()
  const [wallet, setWallet] = useState('')
  const [walletError, setWalletError] = useState<string | undefined>()
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(hotelBookingStorageKey(hotelId))
      setBooking(parseHotelBookingFromStorage(raw))
    } catch {
      setBooking(null)
    } finally {
      setIsLoaded(true)
    }
  }, [hotelId])

  if (!isLoaded) return <div className="section-gap min-h-[40vh]" aria-busy="true" />

  const issue = validateHotelBooking(hotel, booking)

  if (issue || !hotel || !booking) {
    const recovery = issue?.recovery ?? (hotel ? 'rooms' : 'results')
    return (
      <div className="section-gap min-h-[60vh] flex items-center">
        <Container>
          <EmptyState
            title="Payment is not available"
            description={issue?.message ?? 'Your hotel booking is incomplete or invalid.'}
            icon={hotel ? <CreditCard /> : <Building />}
            action={{
              label: recoveryLabel(recovery),
              onClick: () => router.push(recoveryHref(recovery, hotelId, query)),
            }}
          />
        </Container>
      </div>
    )
  }

  const clearErrors = () => {
    setMethodError(undefined)
    setUpiError(undefined)
    setCardErrors({})
    setBankError(undefined)
    setWalletError(undefined)
  }

  const handlePayment = () => {
    clearErrors()
    let isValid = true

    if (!selectedMethod) {
      setMethodError('Please select a payment method.')
      isValid = false
    } else if (selectedMethod === 'upi') {
      if (!/^[^\s@]+@[^\s@]+$/.test(upiId.trim())) {
        setUpiError('Enter a valid UPI ID.')
        isValid = false
      }
    } else if (selectedMethod === 'card') {
      const errors: Record<string, string> = {}
      const cardNumber = cardData.cardNumber.replace(/\s/g, '')
      if (!cardData.cardName.trim()) errors.cardName = 'Cardholder name is required.'
      if (cardNumber.length < 15 || cardNumber.length > 19) errors.cardNumber = 'Enter a valid card number.'
      if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) errors.expiry = 'Enter expiry as MM/YY.'
      if (!/^\d{3,4}$/.test(cardData.cvv)) errors.cvv = 'Enter a valid CVV.'
      if (Object.keys(errors).length) {
        setCardErrors(errors)
        isValid = false
      }
    } else if (selectedMethod === 'netbanking' && !bank) {
      setBankError('Please select a bank.')
      isValid = false
    } else if (selectedMethod === 'wallet' && !wallet) {
      setWalletError('Please select a wallet.')
      isValid = false
    }

    if (!isValid) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setIsProcessing(true)
    window.setTimeout(() => {
      setSelectedMethod(null)
      setCardData({ cardName: '', cardNumber: '', expiry: '', cvv: '' })
      setUpiId('')
      setBank('')
      setWallet('')
      router.push(`/hotels/${hotel.id}/confirmation?${query}`)
    }, 1500)
  }

  return (
    <div className="section-gap pb-20 bg-[var(--color-background)] min-h-screen">
      <Container>
        <div className="mb-8 max-w-3xl mx-auto">
          <BookingProgress currentStep="payment" steps={HOTEL_BOOKING_STEPS} />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/hotels/${hotel.id}/review?${query}`)}
          icon={<ArrowLeft size={16} />}
        >
          Back to Review
        </Button>

        <div className="mt-6 flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full min-w-0">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Pay for your stay</h1>
            <PaymentSecurityNotice />

            {methodError && (
              <div className="mb-4 p-3 rounded-md bg-[rgba(192, 57, 43, 0.10) text-[var(--color-error)] text-sm font-medium" role="alert">
                {methodError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5">
                <PaymentMethodSelector
                  selected={selectedMethod as PaymentMethod}
                  onSelect={(method) => {
                    setSelectedMethod(method)
                    setMethodError(undefined)
                  }}
                />
              </div>
              <div className="md:col-span-7">
                {!selectedMethod && (
                  <div className="h-full min-h-36 flex items-center justify-center p-8 border border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)] text-[var(--color-text-muted)] text-sm">
                    Select a payment method to continue
                  </div>
                )}
                {selectedMethod === 'upi' && <UpiPaymentForm upiId={upiId} onChange={setUpiId} error={upiError} />}
                {selectedMethod === 'card' && (
                  <CardPaymentForm
                    cardName={cardData.cardName}
                    cardNumber={cardData.cardNumber}
                    expiry={cardData.expiry}
                    cvv={cardData.cvv}
                    onChange={(field, value) => setCardData((current) => ({ ...current, [field]: value }))}
                    errors={cardErrors}
                  />
                )}
                {selectedMethod === 'netbanking' && <NetBankingForm bank={bank} onChange={setBank} error={bankError} />}
                {selectedMethod === 'wallet' && <WalletPaymentForm wallet={wallet} onChange={setWallet} error={walletError} />}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[350px] shrink-0">
            <HotelBookingSummary
              hotel={hotel}
              booking={booking}
              query={query}
              continueAction={{
                label: isProcessing ? 'Processing...' : 'Pay securely',
                onClick: handlePayment,
                disabled: isProcessing,
                hint: 'Demo payment only. No reservation is confirmed here.',
              }}
            />
            {isProcessing && (
              <p className="mt-3 flex items-center justify-center gap-2 text-sm text-[var(--color-text-secondary)]" role="status" aria-live="polite">
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                Simulating secure payment processing...
              </p>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default function HotelPaymentPage({
  params,
}: {
  params: Promise<{ hotelId: string }>
}) {
  const { hotelId } = React.use(params)

  return (
    <Suspense fallback={<div className="section-gap min-h-[40vh]" />}>
      <HotelPaymentContent hotelId={hotelId} />
    </Suspense>
  )
}
