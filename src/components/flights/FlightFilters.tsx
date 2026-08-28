import React from 'react';
import { FlightFiltersState } from '@/types/flights';
import { Button, Checkbox, Radio, Accordion, Badge } from '@/components/ui';
import { Filter, X } from 'lucide-react';

interface FlightFiltersProps {
  filters: FlightFiltersState;
  updateFilter: <K extends keyof FlightFiltersState>(key: K, value: FlightFiltersState[K]) => void;
  resetFilters: () => void;
  availableAirlines: string[];
}

export function FlightFilters({
  filters,
  updateFilter,
  resetFilters,
  availableAirlines
}: FlightFiltersProps) {

  const handleStopChange = (stop: number, checked: boolean) => {
    if (checked) {
      updateFilter('stops', [...filters.stops, stop]);
    } else {
      updateFilter('stops', filters.stops.filter(s => s !== stop));
    }
  };

  const handleAirlineChange = (airline: string, checked: boolean) => {
    if (checked) {
      updateFilter('airlines', [...filters.airlines, airline]);
    } else {
      updateFilter('airlines', filters.airlines.filter(a => a !== airline));
    }
  };

  const handleTimeChange = (time: string, checked: boolean) => {
    if (checked) {
      updateFilter('departureTime', [...filters.departureTime, time]);
    } else {
      updateFilter('departureTime', filters.departureTime.filter(t => t !== time));
    }
  };

  const hasActiveFilters = 
    filters.stops.length > 0 || 
    filters.airlines.length > 0 || 
    filters.departureTime.length > 0 || 
    filters.refundable !== null ||
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 20000;

  return (
    <div className="bg-white rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
      
      {/* Header */}
      <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-surface-secondary)]">
        <div className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
          <Filter size={18} />
          Filters
        </div>
        {hasActiveFilters && (
          <button 
            onClick={resetFilters}
            className="text-sm text-[var(--color-primary)] font-medium hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="p-4 flex flex-col gap-6">
        
        {/* Stops */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Stops</h3>
          <div className="flex flex-col gap-2">
            <Checkbox 
              label="Non-stop" 
              checked={filters.stops.includes(0)} 
              onChange={(e) => handleStopChange(0, e.target.checked)} 
            />
            <Checkbox 
              label="1 Stop" 
              checked={filters.stops.includes(1)} 
              onChange={(e) => handleStopChange(1, e.target.checked)} 
            />
            <Checkbox 
              label="2+ Stops" 
              checked={filters.stops.includes(2)} 
              onChange={(e) => handleStopChange(2, e.target.checked)} 
            />
          </div>
        </div>

        <div className="h-px bg-[var(--color-border-light)] w-full"></div>

        {/* Departure Time */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Departure Time</h3>
          <div className="flex flex-col gap-2">
            <Checkbox 
              label="Early Morning (00:00 - 06:00)" 
              checked={filters.departureTime.includes('early_morning')} 
              onChange={(e) => handleTimeChange('early_morning', e.target.checked)} 
            />
            <Checkbox 
              label="Morning (06:00 - 12:00)" 
              checked={filters.departureTime.includes('morning')} 
              onChange={(e) => handleTimeChange('morning', e.target.checked)} 
            />
            <Checkbox 
              label="Afternoon (12:00 - 18:00)" 
              checked={filters.departureTime.includes('afternoon')} 
              onChange={(e) => handleTimeChange('afternoon', e.target.checked)} 
            />
            <Checkbox 
              label="Evening (18:00 - 00:00)" 
              checked={filters.departureTime.includes('evening')} 
              onChange={(e) => handleTimeChange('evening', e.target.checked)} 
            />
          </div>
        </div>

        <div className="h-px bg-[var(--color-border-light)] w-full"></div>

        {/* Price */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Price</h3>
          <div className="flex items-center gap-2">
            <select 
              className="flex-1 rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-transparent"
              value={filters.priceRange[1]}
              onChange={(e) => updateFilter('priceRange', [0, Number(e.target.value)])}
            >
              <option value="20000">Any Price</option>
              <option value="5000">Under 5,000</option>
              <option value="10000">Under 10,000</option>
              <option value="15000">Under 15,000</option>
            </select>
          </div>
        </div>

        <div className="h-px bg-[var(--color-border-light)] w-full"></div>

        {/* Refundable */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Refundability</h3>
          <div className="flex flex-col gap-2">
            <Radio 
              name="refundable"
              label="All Flights" 
              checked={filters.refundable === null} 
              onChange={() => updateFilter('refundable', null)} 
            />
            <Radio 
              name="refundable"
              label="Refundable Fares" 
              checked={filters.refundable === true} 
              onChange={() => updateFilter('refundable', true)} 
            />
            <Radio 
              name="refundable"
              label="Non-Refundable" 
              checked={filters.refundable === false} 
              onChange={() => updateFilter('refundable', false)} 
            />
          </div>
        </div>

        <div className="h-px bg-[var(--color-border-light)] w-full"></div>

        {/* Airlines */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Airlines</h3>
          <div className="flex flex-col gap-2">
            {availableAirlines.map(airline => (
              <Checkbox 
                key={airline}
                label={airline} 
                checked={filters.airlines.includes(airline)} 
                onChange={(e) => handleAirlineChange(airline, e.target.checked)} 
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
