import Link from 'next/link';
// We add Link to imports at top and fix the button below.
import { Flight } from '@/types/flights';
import { Button, Badge } from '@/components/ui';
import { Plane, Clock, Briefcase, Info } from 'lucide-react';

interface FlightResultCardProps {
  flight: Flight;
}

export function FlightResultCard({ flight }: FlightResultCardProps) {
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="bg-white rounded-[var(--radius-lg)] p-5 flex flex-col md:flex-row items-center gap-6 shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow">
      
      {/* Airline Info */}
      <div className="flex flex-row md:flex-col items-center gap-3 w-full md:w-32 shrink-0">
        <div className="w-12 h-12 rounded-full bg-[var(--color-surface-secondary)] flex items-center justify-center font-bold text-[var(--color-primary)] text-lg">
          {flight.airlineCode}
        </div>
        <div className="text-center">
          <p className="font-semibold text-[var(--color-text-primary)] text-sm">{flight.airline}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{flight.flightNumber}</p>
        </div>
      </div>

      {/* Flight Timeline */}
      <div className="flex-1 w-full flex items-center justify-between gap-4">
        {/* Departure */}
        <div className="text-center md:text-right flex-1">
          <p className="text-xl font-bold text-[var(--color-text-primary)]">{formatTime(flight.departureTime)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{flight.origin}</p>
        </div>

        {/* Duration / Stops */}
        <div className="flex flex-col items-center px-4 flex-1">
          <span className="text-xs text-[var(--color-text-secondary)] mb-1">{formatDuration(flight.durationMinutes)}</span>
          <div className="w-full flex items-center gap-2">
            <div className="h-px bg-[var(--color-border)] flex-1"></div>
            <Plane size={16} className="text-[var(--color-primary)] shrink-0" />
            <div className="h-px bg-[var(--color-border)] flex-1"></div>
          </div>
          <span className="text-xs font-medium text-[var(--color-primary)] mt-1">
            {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
          </span>
          {flight.stopLocations && flight.stopLocations.length > 0 && (
            <span className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
              via {flight.stopLocations.join(', ')}
            </span>
          )}
        </div>

        {/* Arrival */}
        <div className="text-center md:text-left flex-1">
          <p className="text-xl font-bold text-[var(--color-text-primary)]">{formatTime(flight.arrivalTime)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{flight.destination}</p>
        </div>
      </div>

      {/* Divider on Mobile */}
      <div className="w-full h-px bg-[var(--color-border-light)] md:hidden"></div>

      {/* Price & Action */}
      <div className="flex flex-col md:items-end justify-between w-full md:w-48 shrink-0 gap-4">
        <div className="flex flex-col gap-1 w-full md:items-end">
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">
            {flight.currency} {flight.price.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {flight.refundable ? (
              <Badge variant="success">Refundable</Badge>
            ) : (
              <Badge variant="neutral">Non-refundable</Badge>
            )}
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1 mt-1">
            <Briefcase size={12} /> {flight.baggageAllowance}
          </p>
        </div>
        
        <Button className="w-full md:w-auto" asChild>
          <Link href={`/flights/${flight.id}`}>View Flight</Link>
        </Button>
      </div>
    </div>
  );
}
