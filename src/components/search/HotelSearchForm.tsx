'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Calendar } from 'lucide-react'
import { Input, Button, Select } from '@/components/ui'
import type { HotelSearchParams } from '@/types/hotels'
import {
  HOTEL_SEARCH_LIMITS,
  buildHotelSearchUrl,
  normalizeHotelSearchParams,
  validateHotelSearch,
} from '@/lib/hotelUtils'

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)

    const params = normalizeHotelSearchParams({
      destination: String(formData.get('destination') || ''),
      checkIn: String(formData.get('checkIn') || ''),
      checkOut: String(formData.get('checkOut') || ''),
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

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
        <div className="lg:col-span-3">
          <Input
            name="destination"
            label="Destination"
            placeholder="City, Hotel, or Landmark"
            leadingIcon={<MapPin size={18} />}
            defaultValue={defaults?.destination ?? ''}
            required
          />
        </div>

        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          <Input
            name="checkIn"
            type="date"
            label="Check-In"
            leadingIcon={<Calendar size={18} />}
            defaultValue={defaults?.checkIn ?? ''}
            required
          />
          <Input
            name="checkOut"
            type="date"
            label="Check-Out"
            leadingIcon={<Calendar size={18} />}
            defaultValue={defaults?.checkOut ?? ''}
            required
          />
        </div>

        <div className="lg:col-span-5 grid grid-cols-3 gap-4">
          <Select name="rooms" label="Rooms" defaultValue={String(defaults?.rooms ?? 1)}>
            {ROOM_OPTIONS.map((count) => (
              <option key={count} value={String(count)}>
                {count}
              </option>
            ))}
          </Select>
          <Select name="adults" label="Adults" defaultValue={String(defaults?.adults ?? 2)}>
            {ADULT_OPTIONS.map((count) => (
              <option key={count} value={String(count)}>
                {count}
              </option>
            ))}
          </Select>
          <Select name="children" label="Children" defaultValue={String(defaults?.children ?? 0)}>
            {CHILD_OPTIONS.map((count) => (
              <option key={count} value={String(count)}>
                {count}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <Button type="submit" size="lg" className="w-full md:w-auto px-8">
          Search Hotels
        </Button>
      </div>
    </form>
  )
}
