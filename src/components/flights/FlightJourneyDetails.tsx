import React from 'react';
import { Flight } from '@/types/flights';
import { MapPin, Clock } from 'lucide-react';

interface FlightJourneyDetailsProps {
  flight: Flight;
}

export function FlightJourneyDetails({ flight }: FlightJourneyDetailsProps) {
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  };
  const formatDuration = (mins: number) => {
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  };

  const segments = flight.segments || [];

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-border)] p-6 mb-6">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">Journey Details</h3>
      
      <div className="flex flex-col gap-0 relative">
        {segments.map((segment, index) => {
          const isLastSegment = index === segments.length - 1;
          let layoverMinutes = 0;
          if (!isLastSegment) {
            const nextSegment = segments[index + 1];
            layoverMinutes = (new Date(nextSegment.departureTime).getTime() - new Date(segment.arrivalTime).getTime()) / 60000;
          }

          return (
            <React.Fragment key={index}>
              {/* Segment Start */}
              <div className="flex gap-4 relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-primary)] ring-4 ring-[var(--color-surface)]"></div>
                  <div className="w-0.5 h-full bg-[var(--color-border)] my-1"></div>
                </div>
                <div className="pb-6 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-[var(--color-text-primary)]">{formatTime(segment.departureTime)}</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{formatDate(segment.departureTime)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[var(--color-text-primary)]">{segment.origin}</p>
                    </div>
                  </div>
                  
                  <div className="my-4 p-4 rounded-lg bg-[var(--color-surface-secondary)] border border-[var(--color-border-light)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-[var(--color-surface)] flex items-center justify-center font-bold text-xs text-[var(--color-primary)]">
                         {segment.airlineCode}
                       </div>
                       <div>
                         <p className="text-sm font-semibold">{segment.airline}</p>
                         <p className="text-xs text-[var(--color-text-secondary)]">Flight {segment.flightNumber}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                      <Clock size={14} />
                      <span>{formatDuration(segment.durationMinutes)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Segment End / Arrival */}
              <div className="flex gap-4 relative z-10">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ring-4 ring-[var(--color-surface)] ${isLastSegment ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border-strong)]'}`}></div>
                  {!isLastSegment && <div className="w-0.5 h-full bg-dashed bg-[var(--color-border-strong)] border-dashed border-l-2 border-[var(--color-border)] my-1"></div>}
                </div>
                <div className={`${isLastSegment ? 'pb-0' : 'pb-6'} w-full`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-[var(--color-text-primary)]">{formatTime(segment.arrivalTime)}</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{formatDate(segment.arrivalTime)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[var(--color-text-primary)]">{segment.destination}</p>
                    </div>
                  </div>

                  {/* Layover */}
                  {!isLastSegment && (
                    <div className="mt-4 py-2 px-4 rounded-md bg-[rgba(22, 160, 133, 0.10) text-[var(--color-warning)] text-sm font-medium inline-flex items-center gap-2">
                      <MapPin size={16} />
                      Layover in {segment.destination} - {formatDuration(layoverMinutes)}
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
