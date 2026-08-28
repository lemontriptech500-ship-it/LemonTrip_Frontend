import React from 'react'
import Link from 'next/link'
import { MapPin, Star } from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import type { Hotel, HotelSearchParams } from '@/types/hotels'
import { AMENITY_LABELS, PROPERTY_TYPE_LABELS } from '@/types/hotels'
import {
  calculateAccommodationTotal,
  getHotelStartingPrice,
  serializeHotelSearchParams,
} from '@/lib/hotelUtils'
import { formatCurrency, truncate } from '@/lib/utils'

interface HotelResultCardProps {
  hotel: Hotel
  nights: number
  search: HotelSearchParams
}

export function HotelResultCard({ hotel, nights, search }: HotelResultCardProps) {
  const image = hotel.images[0]
  const startingPrice = getHotelStartingPrice(hotel)
  const stayTotal =
    nights > 1
      ? calculateAccommodationTotal(startingPrice, nights, 1, hotel.currency)
      : null
  const detailsHref = `/hotels/${hotel.id}?${serializeHotelSearchParams(search).toString()}`
  const highlightAmenities = hotel.amenities.slice(0, 3)

  return (
    <article className="bg-white rounded-[var(--radius-lg)] overflow-hidden shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row min-w-0">
        <div className="relative w-full md:w-64 lg:w-72 shrink-0 aspect-[4/3] md:aspect-auto md:min-h-[220px] bg-[var(--color-surface-secondary)]">
          {image ? (
            // Native img keeps mock Unsplash URLs working without Next image config.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image.url}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--color-text-muted)]">
              No photo
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 p-5 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge variant="neutral">{PROPERTY_TYPE_LABELS[hotel.propertyType]}</Badge>
                <span className="inline-flex items-center gap-0.5 text-[var(--color-primary)]" aria-label={`${hotel.starRating} star property`}>
                  {Array.from({ length: hotel.starRating }).map((_, index) => (
                    <Star key={index} size={14} fill="currentColor" aria-hidden />
                  ))}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                {hotel.name}
              </h3>
              <p className="mt-1 flex items-start gap-1.5 text-sm text-[var(--color-text-secondary)]">
                <MapPin size={14} className="mt-0.5 shrink-0" aria-hidden />
                <span>
                  {hotel.location.area}, {hotel.location.city}
                </span>
              </p>
              <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {truncate(hotel.description, 140)}
              </p>

              {highlightAmenities.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {highlightAmenities.map((amenity) => (
                    <li key={amenity}>
                      <span className="inline-block text-xs font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-secondary)] px-2 py-1 rounded-[var(--radius-sm)]">
                        {AMENITY_LABELS[amenity]}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-row md:flex-col items-end justify-between gap-4 shrink-0 lg:w-44">
              <div className="text-right">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {hotel.guestRating.toFixed(1)} guest rating
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {hotel.guestReviewCount.toLocaleString('en-IN')} reviews
                </p>
                <p className="mt-3 text-2xl font-bold text-[var(--color-text-primary)]">
                  {formatCurrency(startingPrice, hotel.currency)}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">per night</p>
                {stayTotal && (
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {formatCurrency(stayTotal.accommodationTotal, hotel.currency)} for {nights} nights
                  </p>
                )}
              </div>

              <Button asChild className="w-full md:w-auto">
                <Link href={detailsHref}>View rooms</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
