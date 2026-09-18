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
 * BUG FIX (same root cause as FlightSearchForm): the field row
 * used `md:flex-row` / `md:basis-0`, which switches to a single
 * row based on VIEWPORT width. Inside <Modal> (Modify Hotel
 * Search) the container is much narrower than the viewport, so
 * Destination/Check-In/Check-Out/Rooms/Adults/Children all tried
 * to squeeze into one row and overlapped ("Check-InCheck-Out
 * Destination" rendering on top of itself).
 *
 * Switched to `flex-wrap` with a `min-w` per field instead of a
 * viewport breakpoint, matching the fix already applied to
 * FlightSearchForm — this responds to the actual rendered width
 * of the immediate container (hero widget vs. modal), not the
 * viewport, so it wraps cleanly instead of overlapping.
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
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[180px] flex-[2] basis-[220px]">
          <Input
            name="destination"
            label="Destination"
            placeholder="City, Hotel, or Landmark"
            leadingIcon={<MapPin size={16} />}
            defaultValue={defaults?.destination ?? ''}
            required
          />
        </div>

        <div className="min-w-[140px] flex-1 basis-[140px]">
          <DatePicker
            label="Check-In"
            value={checkIn}
            onChange={setCheckIn}
            placeholder="Select date"
            minDate={today}
            required
          />
        </div>

        <div className="min-w-[140px] flex-1 basis-[140px]">
          <DatePicker
            label="Check-Out"
            value={checkOut}
            onChange={setCheckOut}
            placeholder="Select date"
            minDate={checkIn || today}
            required
          />
        </div>

        <div className="w-[92px] shrink-0">
          <Select name="rooms" label="Rooms" defaultValue={String(defaults?.rooms ?? 1)}>
            {ROOM_OPTIONS.map((count) => (
              <option key={count} value={String(count)}>
                {count}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-[92px] shrink-0">
          <Select name="adults" label="Adults" defaultValue={String(defaults?.adults ?? 2)}>
            {ADULT_OPTIONS.map((count) => (
              <option key={count} value={String(count)}>
                {count}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-[92px] shrink-0">
          <Select name="children" label="Children" defaultValue={String(defaults?.children ?? 0)}>
            {CHILD_OPTIONS.map((count) => (
              <option key={count} value={String(count)}>
                {count}
              </option>
            ))}
          </Select>
        </div>

        <div className="shrink-0">
          <Button
            type="submit"
            size="lg"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            className="w-full px-5 sm:w-auto"
          >
            Search Hotels
          </Button>
        </div>
      </div>
    </form>
  )
}