'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Building, Check, CheckCircle2, Copy } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { BookingProgress, HOTEL_BOOKING_STEPS } from '@/components/booking/BookingProgress'
import { BookingStatusNotice } from '@/components/booking/BookingStatusNotice'
import { HotelConfirmationDetails } from '@/components/hotels/HotelConfirmationDetails'
import { getHotel } from '@/services/hotelService'
import type { Hotel, HotelBookingData } from '@/types/hotels'
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
  if (recovery === 'results') return 'Back to hotels'
  if (recovery === 'guests') return 'Edit guest details'
  return 'Select rooms again'
}

function createReference(): string {
  const value = Math.floor(Math.random() * 0xffffff)
    .toString(36)
    .toUpperCase()
    .padStart(6, '0')
    .slice(-6)
  return `LT-HOTEL-${value}`
}

function HotelConfirmationContent({ hotelId }: { hotelId: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = getHotelSearchFromUrl(searchParams)
  const query = serializeHotelSearchParams(search).toString()
  const [hotel, setHotel] = useState<Hotel | null | undefined>(undefined)
  const [booking, setBooking] = useState<HotelBookingData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let active = true
    getHotel(hotelId).then((result) => { if (active) setHotel(result) })
    try {
      const raw = sessionStorage.getItem(hotelBookingStorageKey(hotelId))
      const parsed = parseHotelBookingFromStorage(raw)
      if (hotel && validateHotelBooking(hotel, parsed) === null && parsed) {
        if (!parsed.confirmationReference) {
          const confirmed = { ...parsed, confirmationReference: createReference() }
          sessionStorage.setItem(hotelBookingStorageKey(hotelId), JSON.stringify(confirmed))
          setBooking(confirmed)
        } else {
          setBooking(parsed)
        }
      } else {
        setBooking(parsed)
      }
    } catch {
      setBooking(null)
    } finally {
      setIsLoaded(true)
    }
    return () => { active = false }
  }, [hotelId])

  if (!isLoaded || hotel === undefined) return <div className="section-gap min-h-[40vh]" aria-busy="true" />

  const issue = hotel ? validateHotelBooking(hotel, booking) : null
  if (issue || !hotel || !booking) {
    const recovery = issue?.recovery ?? (hotel ? 'rooms' : 'results')
    return (
      <div className="section-gap min-h-[60vh] flex items-center">
        <Container>
          <EmptyState
            title="Confirmation is not available"
            description={issue?.message ?? 'Your hotel booking is incomplete or invalid.'}
            icon={hotel ? <Building /> : <CheckCircle2 />}
            action={{
              label: recoveryLabel(recovery),
              onClick: () => router.push(recoveryHref(recovery, hotelId, query)),
            }}
          />
        </Container>
      </div>
    )
  }

  const handleCopy = async () => {
    if (!booking.confirmationReference) return
    try {
      await navigator.clipboard.writeText(booking.confirmationReference)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="section-gap pb-20 bg-[var(--color-background)] min-h-screen">
      <Container>
        <div className="mb-8 max-w-3xl mx-auto print:hidden">
          <BookingProgress currentStep="confirmation" steps={HOTEL_BOOKING_STEPS} />
        </div>

        <div className="mb-6 print:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/hotels?${query}`)}
            icon={<ArrowLeft size={16} />}
          >
            Back to Hotels
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full min-w-0">
            <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center shadow-sm sm:p-8" role="status" aria-live="polite">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(39, 174, 96, 0.10) text-[var(--color-success)]">
                <CheckCircle2 size={32} aria-hidden="true" />
              </div>
              <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Hotel stay flow completed</h1>
              <p className="mx-auto mt-2 max-w-xl text-[var(--color-text-secondary)]">
                Your LemonTrip demo payment flow completed successfully. This page is a frontend demonstration; no real reservation was made.
              </p>
              <div className="mx-auto mt-6 flex max-w-sm items-center justify-between gap-4 rounded-lg bg-[var(--color-surface-secondary)] px-4 py-3 text-left sm:px-6 sm:py-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Demo booking reference</p>
                  <p className="mt-1 break-all font-mono text-xl font-bold text-[var(--color-text-primary)]">{booking.confirmationReference}</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="shrink-0 rounded-full p-2 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                  aria-label={copied ? 'Booking reference copied' : 'Copy booking reference'}
                  title="Copy booking reference"
                >
                  {copied ? <Check size={20} className="text-[var(--color-success)]" aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}
                </button>
              </div>
            </section>

            <div className="mt-6">
              <BookingStatusNotice
                title="Demo stay details ready"
                message="Your hotel stay details are available for this browser session. No real payment was processed and no external reservation was created."
              />
            </div>

            <HotelConfirmationDetails hotel={hotel} booking={booking} />
          </div>

          <aside className="w-full shrink-0 space-y-4 lg:w-[350px] lg:sticky lg:top-24">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h2 className="font-bold text-[var(--color-text-primary)]">Next actions</h2>
              <div className="mt-4 flex flex-col gap-3">
                <Button fullWidth onClick={() => router.push('/hotels')}>Plan another stay</Button>
                <Button fullWidth variant="outline" onClick={() => router.push(`/hotels/${hotel.id}?${query}`)}>View this hotel again</Button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  )
}

export default function HotelConfirmationPage({ params }: { params: Promise<{ hotelId: string }> }) {
  const { hotelId } = React.use(params)

  return (
    <Suspense fallback={<div className="section-gap min-h-[40vh]" />}>
      <HotelConfirmationContent hotelId={hotelId} />
    </Suspense>
  )
}
