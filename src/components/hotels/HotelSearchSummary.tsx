import React from 'react'
import { Button } from '@/components/ui'
import { Bed, Calendar, Users } from 'lucide-react'
import type { HotelSearchParams } from '@/types/hotels'
import { formatStayDate, getNightCount } from '@/lib/hotelUtils'

interface HotelSearchSummaryProps {
  search: HotelSearchParams
  onModifySearch: () => void
}

export function HotelSearchSummary({ search, onModifySearch }: HotelSearchSummaryProps) {
  const nights = getNightCount(search.checkIn, search.checkOut)
  const guestCount = search.adults + search.children
  const checkInLabel = formatStayDate(search.checkIn)
  const checkOutLabel = formatStayDate(search.checkOut)

  const occupancyParts = [
    nights > 0 ? `${nights} ${nights === 1 ? 'Night' : 'Nights'}` : null,
    `${search.rooms} ${search.rooms === 1 ? 'Room' : 'Rooms'}`,
    `${guestCount} ${guestCount === 1 ? 'Guest' : 'Guests'}`,
    search.children > 0 ? `${search.children} ${search.children === 1 ? 'Child' : 'Children'}` : null,
  ].filter(Boolean)

  return (
    <div className="bg-[var(--color-surface-secondary)] rounded-[var(--radius-lg)] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm border border-[var(--color-border-light)]">
      <div className="flex flex-col gap-2 min-w-0">
        <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
          <Bed size={18} className="text-[var(--color-primary)] shrink-0" aria-hidden />
          <h1 className="font-semibold text-lg truncate">
            {search.destination || 'Destination'}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-[var(--color-text-secondary)]">
          <div className="flex items-center gap-1.5">
            <Calendar size={16} aria-hidden />
            <span>
              {checkInLabel && checkOutLabel
                ? `${checkInLabel} – ${checkOutLabel}`
                : 'Add check-in and check-out dates'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} aria-hidden />
            <span>{occupancyParts.join(' · ')}</span>
          </div>
        </div>
      </div>

      <Button variant="outline" size="sm" onClick={onModifySearch} className="shrink-0 self-start md:self-center">
        Modify Search
      </Button>
    </div>
  )
}
