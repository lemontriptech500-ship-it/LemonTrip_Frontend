'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, ArrowRight } from 'lucide-react'
import { Input, Button, Select } from '@/components/ui'
import { DatePicker } from '@/components/ui/DatePicker'
import type { HotelSearchParams } from '@/types/hotels'
import {
  HOTEL_SEARCH_LIMITS,
  buildHotelSearchUrl,
  normalizeHotelSearchParams,
  validateHotelSearch,
} from '@/lib/hotelUtils'

/**
 * HotelSearchForm
 * ------------------------------------------------------------
 * BUG FIX: this form previously laid its six fields out as three
 * stacked rows (Destination full-width, then Check-In/Check-Out,
 * then Rooms/Adults/Children) instead of one single line like
 * FlightSearchForm. That made it far taller than the ~40px the
 * hero reserves for the floating search widget to overlap into,
 * so the hero's `overflow-hidden` was clipping the bottom of the
 * form (the "Search Hotels" button) — not a style issue, a real
 * layout bug. Restructured to a single flex row (wrapping only on
 * small screens), matching the compact single-line layout used by
 * Flights/Buses/Trains/Packages/Visa, and matching the reference.
 */

const ROOM_OPTIONS = Array.from(
  { length: HOTEL_SEARCH_LIMITS.maxRooms - HOTEL_SEARCH_LIMITS.minRooms + 1 },
  (_, index) => HOTEL_SEARCH_LIMITS.minRooms + index
)
const ADULT_OPTIONS = Array.from(
  { length: HOTEL_SEARCH_LIMITS.maxAdults - HOTEL_SEARCH_LIMITS.minAdults + 1 },
  (_, index) => HOTEL_SEARCH_LIMITS.minAdults + index
)
const CHILD_OPTIONS = Array.from(
  { length: HOTEL_SEARCH_LIMITS.maxChildren - HOTEL_SEARCH_LIMITS.minChildren + 1 },
  (_, index) => HOTEL_SEARCH_LIMITS.minChildren + index
)

interface HotelSearchFormProps {
  defaults?: Partial<HotelSearchParams>
  onSuccess?: () => void
}

export function HotelSearchForm({ defaults, onSuccess }: HotelSearchFormProps) {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState(defaults?.checkIn ?? '')
  const [checkOut, setCheckOut] = useState(defaults?.checkOut ?? '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)

    const params = normalizeHotelSearchParams({
      destination: String(formData.get('destination') || ''),
      checkIn,
      checkOut,
      rooms: String(formData.get('rooms') || '1'),
      adults: String(formData.get('adults') || '2'),
      children: String(formData.get('children') || '0'),
    })

    const error = validateHotelSearch(params)
    if (error) {
      alert(error)
      return
    }

    router.push(buildHotelSearchUrl(params))
    onSuccess?.()
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-end lg:flex-nowrap">
        <div className="min-w-0 flex-[2] basis-full md:basis-0">
          <Input
            name="destination"
            label="Destination"
            placeholder="City, Hotel, or Landmark"
            leadingIcon={<MapPin size={16} />}
            defaultValue={defaults?.destination ?? ''}
            required
          />
        </div>

        <div className="min-w-0 flex-1 basis-[calc(50%-0.375rem)] md:basis-0">
          <DatePicker
            label="Check-In"
            value={checkIn}
            onChange={setCheckIn}
            placeholder="Select date"
            minDate={today}
            required
          />
        </div>

        <div className="min-w-0 flex-1 basis-[calc(50%-0.375rem)] md:basis-0">
          <DatePicker
            label="Check-Out"
            value={checkOut}
            onChange={setCheckOut}
            placeholder="Select date"
            minDate={checkIn || today}
            required
          />
        </div>

        <div className="min-w-0 w-[calc(33.333%-0.5rem)] shrink-0 md:w-[92px]">
          <Select name="rooms" label="Rooms" defaultValue={String(defaults?.rooms ?? 1)}>
            {ROOM_OPTIONS.map((count) => (
              <option key={count} value={String(count)}>
                {count}
              </option>
            ))}
          </Select>
        </div>



        <div className="min-w-0 w-[calc(33.333%-0.5rem)] shrink-0 md:w-[92px]">
          <Select name="adults" label="Adults" defaultValue={String(defaults?.adults ?? 2)}>
            {ADULT_OPTIONS.map((count) => (
              <option key={count} value={String(count)}>
                {count}
              </option>
            ))}
          </Select>
        </div>

        <div className="min-w-0 w-[calc(33.333%-0.5rem)] shrink-0 md:w-[92px]">
          <Select name="children" label="Children" defaultValue={String(defaults?.children ?? 0)}>
            {CHILD_OPTIONS.map((count) => (
              <option key={count} value={String(count)}>
                {count}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-full shrink-0 md:w-auto">
          <Button
            type="submit"
            size="lg"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            className="w-full px-5 md:w-auto"
          >
            Search Hotels
    <form onSubmit={handleSearch} className="min-h-[415px] w-full rounded-lg bg-[#063b24] p-3 md:min-h-[253px] lg:min-h-[120px]">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_.7fr_.7fr_.7fr_auto] lg:items-end lg:gap-2">
        <Input
          name="destination"
          label="Destination"
          placeholder="City, Hotel, or Landmark"
          leadingIcon={<MapPin size={16} />}
          defaultValue={defaults?.destination ?? ''}
          required
          theme="dark-green"
        />
        <DatePicker
          label="Check-In"
          value={checkIn}
          onChange={setCheckIn}
          placeholder="Select date"
          minDate={today}
          required
          theme="dark-green"
        />
        <DatePicker
          label="Check-Out"
          value={checkOut}
          onChange={setCheckOut}
          placeholder="Select date"
          minDate={checkIn || today}
          required
          theme="dark-green"
        />
        <Select name="rooms" label="Rooms" defaultValue={String(defaults?.rooms ?? 1)} theme="dark-green">
          {ROOM_OPTIONS.map((count) => <option key={count} value={String(count)}>{count}</option>)}
        </Select>
        <Select name="adults" label="Adults" defaultValue={String(defaults?.adults ?? 2)} theme="dark-green">
          {ADULT_OPTIONS.map((count) => <option key={count} value={String(count)}>{count}</option>)}
        </Select>
        <Select name="children" label="Children" defaultValue={String(defaults?.children ?? 0)} theme="dark-green">
          {CHILD_OPTIONS.map((count) => <option key={count} value={String(count)}>{count}</option>)}
        </Select>
        <div className="flex justify-end border-t border-white/15 pt-4 md:col-span-2 lg:col-span-1 lg:border-t-0 lg:pt-0">
          <Button type="submit" size="lg" className="w-full px-5 lg:w-auto">
          Search Hotels
          </Button>
        </div>
      </div>
    </form>
  )
}