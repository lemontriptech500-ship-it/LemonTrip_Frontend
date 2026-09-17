'use client'

import React, { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Building, Calendar, Check, Clock3, MapPin, Star, Users } from 'lucide-react'
import { Badge, Button, Container } from '@/components/ui'
import { EmptyState } from '@/components/common'
import { HOTEL_BOOKING_STEPS, BookingProgress } from '@/components/booking/BookingProgress'
import { HotelModifySearch } from '@/components/hotels/HotelModifySearch'
import { RoomCard } from '@/components/hotels/RoomCard'
import { RoomSelectionSummary } from '@/components/hotels/RoomSelectionSummary'
import type { Hotel } from '@/types/hotels'
import { getHotel } from '@/services/hotelService'
import { AMENITY_LABELS, PROPERTY_TYPE_LABELS, type HotelSearchParams } from '@/types/hotels'
import { getHotelSearchFromUrl, getNightCount, hotelBookingStorageKey, isHotelSearchComplete, serializeHotelSearchParams } from '@/lib/hotelUtils'
import { useRoomSelection } from '@/hooks/useRoomSelection'

function HotelDetailsContent({ hotelId }: { hotelId: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = getHotelSearchFromUrl(searchParams)
  const [hotel, setHotel] = useState<Hotel | null | undefined>(undefined)
  const [isModifyOpen, setIsModifyOpen] = useState(false)
  useEffect(() => {
    let active = true
    getHotel(hotelId, search).then((result) => {
      if (active) setHotel(result)
    })
    return () => {
      active = false
    }
  }, [hotelId])
  if (hotel === undefined) return <div className="section-gap min-h-[40vh]" />
  if (hotel === null) return <div className="section-gap"><Container><EmptyState title="Hotel not found" description="This hotel is unavailable or the link is no longer valid." icon={<Building />} action={{ label: 'Back to hotel results', onClick: () => router.push(searchParams.toString() ? `/hotels?${searchParams}` : '/hotels') }} /></Container></div>
  if (!isHotelSearchComplete(search)) return <div className="section-gap"><Container><EmptyState title="Complete your stay details" description="Choose a destination, valid check-in and check-out dates, and guest details before selecting rooms." icon={<Calendar />} action={{ label: 'Modify search', onClick: () => setIsModifyOpen(true) }} /><HotelModifySearch isOpen={isModifyOpen} onClose={() => setIsModifyOpen(false)} currentSearch={search} /></Container></div>
  return <HotelDetails hotel={hotel} search={search} nights={getNightCount(search.checkIn, search.checkOut)} />
}

function HotelDetails({ hotel, search, nights }: { hotel: Hotel; search: HotelSearchParams; nights: number }) {
  const router = useRouter()
  const [isModifyOpen, setIsModifyOpen] = useState(false)
  const selection = useRoomSelection(hotel, nights, search)
  const query = serializeHotelSearchParams(search).toString()
  const continueToGuests = () => {
    if (!selection.isValid) return
    sessionStorage.setItem(hotelBookingStorageKey(hotel.id), JSON.stringify({ hotelId: hotel.id, checkIn: search.checkIn, checkOut: search.checkOut, nightCount: nights, roomsRequested: search.rooms, adults: search.adults, children: search.children, selections: selection.selections }))
    router.push(`/hotels/${hotel.id}/guests?${query}`)
  }
  return <div className="section-gap pb-20"><Container>
    <Link href={`/hotels?${query}`} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"><ArrowLeft size={16} />Back to hotel results</Link>
    <BookingProgress currentStep="hotel" steps={HOTEL_BOOKING_STEPS} className="mx-auto mb-5 max-w-3xl" />
    <header className="mb-6"><div className="flex flex-wrap items-center gap-2"><Badge variant="neutral">{PROPERTY_TYPE_LABELS[hotel.propertyType]}</Badge><span className="inline-flex text-[var(--color-primary)]" aria-label={`${hotel.starRating} star property`}>{Array.from({ length: hotel.starRating }).map((_, i) => <Star key={i} size={16} fill="currentColor" aria-hidden />)}</span></div><h1 className="mt-2 text-3xl font-bold text-[var(--color-text-primary)]">{hotel.name}</h1><p className="mt-2 flex items-center gap-1.5 text-[var(--color-text-secondary)]"><MapPin size={17} aria-hidden />{hotel.location.area}, {hotel.location.city}</p><p className="mt-2 text-sm font-medium text-[var(--color-text-secondary)]">Guest rating {hotel.guestRating.toFixed(1)} / 5</p></header>
    <section aria-label="Hotel image gallery" className="mb-8 grid grid-cols-2 gap-2 overflow-hidden rounded-[var(--radius-lg)] md:h-[360px] md:grid-cols-4">{hotel.images.slice(0, 4).map((image, index) => <img key={image.url} src={image.url} alt={image.alt} className={`h-40 w-full object-cover md:h-full ${index === 0 ? 'col-span-2 row-span-2' : ''}`} />)}</section>
    <section className="mb-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-5"><div className="flex flex-col justify-between gap-4 md:flex-row"><div><h2 className="font-bold text-[var(--color-text-primary)]">Your stay in {search.destination}</h2><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--color-text-secondary)]"><span className="inline-flex items-center gap-1"><Calendar size={16} />{search.checkIn} – {search.checkOut}</span><span>{nights} {nights === 1 ? 'night' : 'nights'} · {search.rooms} {search.rooms === 1 ? 'room' : 'rooms'}</span><span className="inline-flex items-center gap-1"><Users size={16} />{search.adults} adults{search.children ? ` · ${search.children} children` : ''}</span></div></div><Button variant="outline" size="sm" onClick={() => setIsModifyOpen(true)}>Modify Search</Button></div></section>
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]"><main className="min-w-0"><section className="mb-8"><h2 className="text-xl font-bold text-[var(--color-text-primary)]">About this property</h2><p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">{hotel.description}</p><div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--color-text-secondary)]"><span className="inline-flex items-center gap-1"><Clock3 size={16} />Check-in {hotel.checkInTime}</span><span className="inline-flex items-center gap-1"><Clock3 size={16} />Check-out {hotel.checkOutTime}</span></div></section><section className="mb-8"><h2 className="text-xl font-bold text-[var(--color-text-primary)]">Amenities</h2><div className="mt-4 flex flex-wrap gap-2">{hotel.amenities.map((amenity) => <Badge key={amenity} variant="neutral"><Check size={13} className="mr-1" aria-hidden />{AMENITY_LABELS[amenity]}</Badge>)}</div></section><section aria-labelledby="available-rooms"><h2 id="available-rooms" className="text-xl font-bold text-[var(--color-text-primary)]">Available rooms</h2><p className="mt-1 text-sm text-[var(--color-text-secondary)]">Select room rates until you have chosen {search.rooms} {search.rooms === 1 ? 'room' : 'rooms'}.</p><div className="mt-4 space-y-5">{hotel.rooms.map((room) => <RoomCard key={room.id} room={room} selections={selection.selections} onQuantityChange={selection.updateQuantity} selectedRoomCount={selection.selectedRoomCount} requestedRooms={search.rooms} />)}</div></section></main><RoomSelectionSummary hotel={hotel} selections={selection.selections} nights={nights} total={selection.total.accommodationTotal} validationMessage={selection.validationMessage} onContinue={continueToGuests} /></div>
    <HotelModifySearch isOpen={isModifyOpen} onClose={() => setIsModifyOpen(false)} currentSearch={search} />
  </Container></div>
}

export default function HotelDetailsPage({ params }: { params: Promise<{ hotelId: string }> }) { const { hotelId } = React.use(params); return <Suspense fallback={<div className="section-gap min-h-[40vh]" />}><HotelDetailsContent hotelId={hotelId} /></Suspense> }
