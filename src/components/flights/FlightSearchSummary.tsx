import React from 'react';
import { Button } from '@/components/ui';
import { Plane, Calendar, Users } from 'lucide-react';

interface FlightSearchSummaryProps {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  tripType: string;
  travelClass: string;
  onModifySearch: () => void;
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

export function FlightSearchSummary({
  origin,
  destination,
  departureDate,
  returnDate,
  tripType,
  travelClass,
  onModifySearch,
}: FlightSearchSummaryProps) {
  return (
    // White floating card: sits over the bottom edge of FlightPageHero
    <div className="flex flex-col items-stretch justify-between gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border-light)] bg-white p-4 shadow-lg md:flex-row md:items-center md:px-6 md:py-4">
      <div className="flex flex-col gap-3 text-[var(--color-text-primary)] md:flex-row md:items-center md:gap-6">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <span>{origin || 'Origin'}</span>
          <Plane size={18} className="text-[var(--color-primary)]" aria-hidden="true" />
          <span>{destination || 'Destination'}</span>
        </div>

        <div className="hidden h-6 w-px bg-[var(--color-border)] md:block" />

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--color-text-secondary)]">
          <div className="flex items-center gap-1.5">
            <Calendar size={16} aria-hidden="true" />
            <span>{departureDate ? formatDate(departureDate) : 'Select date'}</span>
            {tripType === 'roundtrip' && returnDate && (
              <>
                <span className="mx-1">–</span>
                <span>{formatDate(returnDate)}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} aria-hidden="true" />
            <span className="capitalize">{travelClass?.replace('-', ' ') || '1 Adult'}</span>
          </div>
        </div>
      </div>

      <Button variant="outline" size="sm" onClick={onModifySearch}>
        Modify Search
      </Button>
    </div>
  );
}