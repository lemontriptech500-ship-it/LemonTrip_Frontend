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
    <div className="bg-[var(--color-surface-secondary)] rounded-[var(--radius-lg)] p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm border border-[var(--color-border-light)]">
      <div className="flex flex-col md:flex-row items-center gap-4 text-[var(--color-text-primary)]">
        <div className="flex items-center gap-3 font-semibold text-lg">
          <span>{origin || 'Origin'}</span>
          <Plane size={18} className="text-[var(--color-primary)]" />
          <span>{destination || 'Destination'}</span>
        </div>
        
        <div className="hidden md:block w-px h-6 bg-[var(--color-border)]"></div>
        
        <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
          <div className="flex items-center gap-1.5">
            <Calendar size={16} />
            <span>{departureDate ? new Date(departureDate).toLocaleDateString() : 'Select Date'}</span>
            {tripType === 'roundtrip' && returnDate && (
              <>
                <span className="mx-1">-</span>
                <span>{new Date(returnDate).toLocaleDateString()}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} />
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
