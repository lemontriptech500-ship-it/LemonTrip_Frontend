import React from 'react';

export function FlightResultSkeleton() {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 flex flex-col md:flex-row items-center gap-6 shadow-sm border border-[var(--color-border)] animate-pulse">
      
      {/* Airline Info */}
      <div className="flex flex-row md:flex-col items-center gap-3 w-full md:w-32 shrink-0">
        <div className="w-12 h-12 rounded-full bg-[var(--color-border-light)]"></div>
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="h-4 bg-[var(--color-border-light)] rounded w-16"></div>
          <div className="h-3 bg-[var(--color-border-light)] rounded w-10"></div>
        </div>
      </div>

      {/* Flight Timeline */}
      <div className="flex-1 w-full flex items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-end gap-2 flex-1">
            <div className="h-6 bg-[var(--color-border-light)] rounded w-16"></div>
            <div className="h-4 bg-[var(--color-border-light)] rounded w-10"></div>
        </div>
        
        <div className="flex flex-col items-center px-4 flex-1 gap-2">
            <div className="h-3 bg-[var(--color-border-light)] rounded w-12"></div>
            <div className="w-full h-px bg-[var(--color-border-light)] my-1"></div>
            <div className="h-3 bg-[var(--color-border-light)] rounded w-16"></div>
        </div>
        
        <div className="flex flex-col items-center md:items-start gap-2 flex-1">
            <div className="h-6 bg-[var(--color-border-light)] rounded w-16"></div>
            <div className="h-4 bg-[var(--color-border-light)] rounded w-10"></div>
        </div>
      </div>

      {/* Price & Action */}
      <div className="flex flex-col md:items-end justify-between w-full md:w-48 shrink-0 gap-4">
        <div className="flex flex-col gap-2 w-full md:items-end">
            <div className="h-8 bg-[var(--color-border-light)] rounded w-24"></div>
            <div className="h-5 bg-[var(--color-border-light)] rounded w-20"></div>
            <div className="h-3 bg-[var(--color-border-light)] rounded w-24"></div>
        </div>
        <div className="h-10 bg-[var(--color-border-light)] rounded w-full md:w-28"></div>
      </div>
    </div>
  );
}
