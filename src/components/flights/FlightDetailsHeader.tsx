import React from 'react';
import { Flight } from '@/types/flights';
import { Badge } from '@/components/ui';
import { Plane } from 'lucide-react';

interface FlightDetailsHeaderProps {
  flight: Flight;
}

export function FlightDetailsHeader({ flight }: FlightDetailsHeaderProps) {
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-border)] p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Airline Info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[var(--color-surface-secondary)] flex items-center justify-center font-bold text-[var(--color-primary)] text-xl shrink-0">
            {flight.airlineCode}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{flight.airline}</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">Flight {flight.flightNumber}</p>
          </div>
        </div>

        {/* Flight Summary */}
        <div className="flex-1 max-w-lg w-full flex items-center justify-between gap-4">
          <div className="text-right flex-1">
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">{formatTime(flight.departureTime)}</p>
            <p className="font-semibold text-[var(--color-text-primary)]">{flight.origin}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{formatDate(flight.departureTime)}</p>
          </div>

          <div className="flex flex-col items-center px-4 flex-1">
            <span className="text-sm text-[var(--color-text-secondary)] mb-1">
              {Math.floor(flight.durationMinutes / 60)}h {flight.durationMinutes % 60}m
            </span>
            <div className="w-full flex items-center gap-2">
              <div className="h-px bg-[var(--color-border-strong)] flex-1"></div>
              <Plane size={18} className="text-[var(--color-primary)] shrink-0" />
              <div className="h-px bg-[var(--color-border-strong)] flex-1"></div>
            </div>
            <span className="text-xs font-medium text-[var(--color-text-primary)] mt-1">
              {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
            </span>
          </div>

          <div className="text-left flex-1">
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">{formatTime(flight.arrivalTime)}</p>
            <p className="font-semibold text-[var(--color-text-primary)]">{flight.destination}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{formatDate(flight.arrivalTime)}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
