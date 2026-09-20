import React from 'react';
import { SortOption } from '@/types/flights';
import { Select } from '@/components/ui';

interface FlightResultsHeaderProps {
  totalResults: number;
  filteredCount: number;
  sortOption: SortOption;
  onSortChange: (val: SortOption) => void;
}

export function FlightResultsHeader({
  totalResults,
  filteredCount,
  sortOption,
  onSortChange
}: FlightResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
          {filteredCount} {filteredCount === 1 ? 'Flight' : 'Flights'} Found
        </h2>
        {filteredCount !== totalResults && (
          <p className="text-sm text-[var(--color-text-secondary)]">
            Filtered from {totalResults} total options
          </p>
        )}
      </div>

      <div className="w-full sm:w-auto flex items-center gap-3">
        <label className="shrink-0 text-sm font-medium text-[var(--color-text-secondary)] whitespace-nowrap">
          Sort by:
        </label>
        <Select 
          value={sortOption} 
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="min-w-0 flex-1 sm:min-w-[180px] sm:flex-none"
        >
          <option value="recommended">Recommended</option>
          <option value="price_asc">Lowest Price</option>
          <option value="price_desc">Highest Price</option>
          <option value="duration_asc">Shortest Duration</option>
          <option value="departure_asc">Earliest Departure</option>
          <option value="departure_desc">Latest Departure</option>
        </Select>
      </div>
    </div>
  );
}
