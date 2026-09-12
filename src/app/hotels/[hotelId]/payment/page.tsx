'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Building, CreditCard } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { BookingProgress, HOTEL_BOOKING_STEPS } from '@/components/booking/BookingProgress'
import { PaymentSecurityNotice } from '@/components/booking/PaymentSecurityNotice'
import { TravelRazorpayCheckout } from '@/components/booking/TravelRazorpayCheckout'
import { HotelBookingSummary } from '@/components/hotels/HotelBookingSummary'
import { getHotelById } from '@/data/hotels'
import type { HotelBookingData } from '@/types/hotels'
import {
  getHotelSearchFromUrl,
  hotelBookingStorageKey,
  parseHotelBookingFromStorage,
  serializeHotelSearchParams,
  calculateSelectionsTotal,
  resolveSelection,
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

  const selected = booking.selections.flatMap((selection) => {
    const resolved = resolveSelection(hotel, selection)
    return resolved ? [{ ...resolved, quantity: selection.quantity }] : []
  })
  const accommodationTotal = calculateSelectionsTotal(
    selected.map((item) => ({ pricePerNight: item.rate.pricePerNight, quantity: item.quantity })),
    booking.nightCount,
    hotel.currency,
  ).accommodationTotal

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

            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Pay securely with Razorpay</h2>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">UPI, cards, net banking, and wallets are handled securely by Razorpay.</p>
            </div>
          </div>

          <div className="w-full lg:w-[350px] shrink-0">
            <HotelBookingSummary
              hotel={hotel}
              booking={booking}
              query={query}
            />
            <TravelRazorpayCheckout
              itemType="hotel"
              itemId={hotel.id}
              quantityLabel="Nights"
              initialQuantity={booking.nightCount}
              initialEmail={booking.contact?.email}
              initialPhone={`${booking.contact?.phoneCode || ''}${booking.contact?.phoneNumber || ''}`}
              amount={accommodationTotal}
              showQuantity={false}
              label={`${hotel.name} hotel booking`}
              extraDetails={{
                selections: booking.selections,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                guests: booking.guests || [],
              }}
            />
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
