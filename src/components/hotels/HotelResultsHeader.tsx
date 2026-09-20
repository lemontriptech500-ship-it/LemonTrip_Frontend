import React from 'react'
import type { HotelSortOption } from '@/types/hotels'
import { Select } from '@/components/ui'

interface HotelResultsHeaderProps {
  totalResults: number
  filteredCount: number
  sortOption: HotelSortOption
  onSortChange: (value: HotelSortOption) => void
}

export function HotelResultsHeader({
  totalResults,
  filteredCount,
  sortOption,
  onSortChange,
}: HotelResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
          {filteredCount} {filteredCount === 1 ? 'stay' : 'stays'} found
        </h2>
        {filteredCount !== totalResults && (
          <p className="text-sm text-[var(--color-text-secondary)]">
            Filtered from {totalResults} matching {totalResults === 1 ? 'property' : 'properties'}
          </p>
        )}
      </div>

      <div className="w-full sm:w-auto flex items-center gap-3">
        <label htmlFor="hotel-sort" className="text-sm font-medium text-[var(--color-text-secondary)] whitespace-nowrap">
          Sort by
        </label>
        <Select
          id="hotel-sort"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as HotelSortOption)}
          className="min-w-0 flex-1 sm:min-w-[180px] sm:flex-none"
        >
          <option value="recommended">Recommended</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
          <option value="rating_desc">Guest rating</option>
          <option value="star_desc">Star rating</option>
        </Select>
      </div>
    </div>
  )
}
