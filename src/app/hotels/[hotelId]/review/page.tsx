'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Building, ClipboardCheck } from 'lucide-react'
import { Alert, Button, Checkbox, Container } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { BookingProgress, HOTEL_BOOKING_STEPS } from '@/components/booking/BookingProgress'
import { HotelBookingSummary } from '@/components/hotels/HotelBookingSummary'
import { HotelReviewDetails } from '@/components/hotels/HotelReviewDetails'
import { getHotelById } from '@/data/hotels'
import type { HotelBookingData } from '@/types/hotels'
import type { HotelBookingRecovery } from '@/lib/hotelUtils'
import {
  getHotelSearchFromUrl,
  hotelBookingStorageKey,
  parseHotelBookingFromStorage,
  serializeHotelSearchParams,
  validateHotelBooking,
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

function HotelReviewContent({ hotelId }: { hotelId: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = getHotelSearchFromUrl(searchParams)
  const query = serializeHotelSearchParams(search).toString()
  const hotel = getHotelById(hotelId)

  const [booking, setBooking] = useState<HotelBookingData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [acknowledged, setAcknowledged] = useState(false)
  const [acknowledgeError, setAcknowledgeError] = useState<string | undefined>(undefined)

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

  if (!isLoaded) {
    return <div className="section-gap min-h-[40vh]" aria-busy="true" />
  }

  const issue = validateHotelBooking(hotel, booking)

  if (issue || !hotel || !booking) {
    const recovery = issue?.recovery ?? (hotel ? 'rooms' : 'results')
    return (
      <div className="section-gap min-h-[60vh] flex items-center">
        <Container>
          <EmptyState
            title="Booking cannot be reviewed"
            description={issue?.message ?? 'Your hotel booking is incomplete or invalid.'}
            icon={hotel ? <ClipboardCheck /> : <Building />}
            action={{
              label: recoveryLabel(recovery),
              onClick: () => router.push(recoveryHref(recovery, hotelId, query)),
            }}
          />
        </Container>
      </div>
    )
  }

  const handleContinue = () => {
    if (!acknowledged) {
      setAcknowledgeError('Confirm that you have reviewed your stay and guest details before continuing.')
      return
    }

    router.push(`/hotels/${hotel.id}/payment?${query}`)
  }

  return (
    <div className="section-gap pb-20 bg-[var(--color-background)] min-h-screen">
      <Container>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/hotels/${hotel.id}/guests?${query}`)}
          icon={<ArrowLeft size={16} />}
        >
          Back to guest details
        </Button>

        <div className="mb-8 max-w-3xl mx-auto">
          <BookingProgress currentStep="review" steps={HOTEL_BOOKING_STEPS} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full min-w-0">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Review your stay</h1>

            <Alert variant="info" title="Final check before payment" className="mb-6">
              Confirm the stay, rooms, and guest details below. No reservation is made until the demo payment step is
              completed.
            </Alert>

            <HotelReviewDetails hotel={hotel} booking={booking} query={query} />

            <div className="mt-6">
              <Checkbox
                id="hotel-review-acknowledgement"
                checked={acknowledged}
                onChange={(event) => {
                  setAcknowledged(event.target.checked)
                  if (event.target.checked) setAcknowledgeError(undefined)
                }}
                label="I have reviewed my stay and guest details."
                error={acknowledgeError}
              />
            </div>
          </div>

          <div className="w-full lg:w-[350px] shrink-0">
            <HotelBookingSummary
              hotel={hotel}
              booking={booking}
              query={query}
              continueAction={{
                label: 'Continue to payment',
                onClick: handleContinue,
                disabled: !acknowledged,
                hint: acknowledged
                  ? 'You can continue to the demo payment step.'
                  : 'Tick the acknowledgement to continue to payment.',
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default function HotelReviewPage({ params }: { params: Promise<{ hotelId: string }> }) {
  const { hotelId } = React.use(params)

  return (
    <Suspense fallback={<div className="section-gap min-h-[40vh]" />}>
      <HotelReviewContent hotelId={hotelId} />
    </Suspense>
  )
}
