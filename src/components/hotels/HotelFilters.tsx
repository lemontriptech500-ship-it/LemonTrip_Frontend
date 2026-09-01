'use client'

import React from 'react'
import type { HotelAmenity, HotelFiltersState, PropertyType } from '@/types/hotels'
import { AMENITY_LABELS, PROPERTY_TYPE_LABELS } from '@/types/hotels'
import { Button, Checkbox, Radio, Select } from '@/components/ui'
import { Filter } from 'lucide-react'
import { DEFAULT_HOTEL_PRICE_MAX } from '@/hooks/useHotelFilters'

interface HotelFiltersProps {
  filters: HotelFiltersState
  updateFilter: <K extends keyof HotelFiltersState>(key: K, value: HotelFiltersState[K]) => void
  resetFilters: () => void
  hasActiveFilters: boolean
}

const STAR_OPTIONS = [5, 4, 3, 2]
const PROPERTY_OPTIONS: PropertyType[] = ['hotel', 'resort', 'boutique', 'hostel', 'villa', 'apartment']
const AMENITY_OPTIONS: HotelAmenity[] = [
  'wifi',
  'pool',
  'gym',
  'spa',
  'restaurant',
  'parking',
  'breakfast',
  'airport_shuttle',
]

function toggleValue<T>(list: T[], value: T, checked: boolean): T[] {
  if (checked) return [...list, value]
  return list.filter((item) => item !== value)
}

export function HotelFilters({
  filters,
  updateFilter,
  resetFilters,
  hasActiveFilters,
}: HotelFiltersProps) {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
      <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-surface-secondary)]">
        <div className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
          <Filter size={18} aria-hidden />
          Filters
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-sm text-[var(--color-primary)] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="p-4 flex flex-col gap-6">
        <fieldset>
          <legend className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Price per night</legend>
          <Select
            aria-label="Maximum price per night"
            value={String(filters.priceRange[1])}
            onChange={(e) => updateFilter('priceRange', [0, Number(e.target.value)])}
          >
            <option value={String(DEFAULT_HOTEL_PRICE_MAX)}>Any price</option>
            <option value="3000">Under ₹3,000</option>
            <option value="5000">Under ₹5,000</option>
            <option value="8000">Under ₹8,000</option>
            <option value="12000">Under ₹12,000</option>
          </Select>
        </fieldset>

        <div className="h-px bg-[var(--color-border-light)] w-full" />

        <fieldset>
          <legend className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Star rating</legend>
          <div className="flex flex-col gap-2">
            {STAR_OPTIONS.map((stars) => (
              <Checkbox
                key={stars}
                label={`${stars} star${stars === 1 ? '' : 's'}`}
                checked={filters.starRating.includes(stars)}
                onChange={(e) => updateFilter('starRating', toggleValue(filters.starRating, stars, e.target.checked))}
              />
            ))}
          </div>
        </fieldset>

        <div className="h-px bg-[var(--color-border-light)] w-full" />

        <fieldset>
          <legend className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Guest rating</legend>
          <div className="flex flex-col gap-2">
            <Radio
              name="hotel-guest-rating"
              label="Any rating"
              checked={filters.guestRatingMin === null}
              onChange={() => updateFilter('guestRatingMin', null)}
            />
            <Radio
              name="hotel-guest-rating"
              label="4.0 and above"
              checked={filters.guestRatingMin === 4}
              onChange={() => updateFilter('guestRatingMin', 4)}
            />
            <Radio
              name="hotel-guest-rating"
              label="4.5 and above"
              checked={filters.guestRatingMin === 4.5}
              onChange={() => updateFilter('guestRatingMin', 4.5)}
            />
          </div>
        </fieldset>

        <div className="h-px bg-[var(--color-border-light)] w-full" />

        <fieldset>
          <legend className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Property type</legend>
          <div className="flex flex-col gap-2">
            {PROPERTY_OPTIONS.map((type) => (
              <Checkbox
                key={type}
                label={PROPERTY_TYPE_LABELS[type]}
                checked={filters.propertyType.includes(type)}
                onChange={(e) => updateFilter('propertyType', toggleValue(filters.propertyType, type, e.target.checked))}
              />
            ))}
          </div>
        </fieldset>

        <div className="h-px bg-[var(--color-border-light)] w-full" />

        <fieldset>
          <legend className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Amenities</legend>
          <div className="flex flex-col gap-2">
            {AMENITY_OPTIONS.map((amenity) => (
              <Checkbox
                key={amenity}
                label={AMENITY_LABELS[amenity]}
                checked={filters.amenities.includes(amenity)}
                onChange={(e) => updateFilter('amenities', toggleValue(filters.amenities, amenity, e.target.checked))}
              />
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  )
}

interface HotelMobileFiltersProps extends HotelFiltersProps {
  isOpen: boolean
  onClose: () => void
}

export function HotelMobileFilters({ isOpen, onClose, ...filterProps }: HotelMobileFiltersProps) {
  const closeButtonRef = React.useRef<HTMLButtonElement>(null)
  const previouslyFocusedElement = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    previouslyFocusedElement.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocusedElement.current?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex bg-[rgba(44,62,80,0.50)] backdrop-blur-sm lg:hidden">
      <button
        type="button"
        className="flex-1"
        aria-label="Close filters"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="hotel-mobile-filters-title"
        className="w-[min(100%,20rem)] h-full bg-[var(--color-surface)] shadow-2xl overflow-y-auto"
      >
        <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between sticky top-0 bg-[var(--color-surface)] z-10">
          <h2 id="hotel-mobile-filters-title" className="font-bold text-lg text-[var(--color-text-primary)]">
            Filters
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-8 items-center justify-center rounded-[var(--radius-md)] px-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border-light)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
          >
            Close
          </button>
        </div>
        <div className="p-2">
          <HotelFilters {...filterProps} />
        </div>
      </div>
    </div>
  )
}
