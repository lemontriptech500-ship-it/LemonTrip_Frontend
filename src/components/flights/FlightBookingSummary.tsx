import React from 'react';
import { Flight, FareOption } from '@/types/flights';
import { Button } from '@/components/ui';

interface FlightBookingSummaryProps {
  flight: Flight;
  selectedFare: FareOption | null;
  travellersCount: number;
  onContinue: () => void;
  hideButton?: boolean;
}

export function FlightBookingSummary({ flight, selectedFare, travellersCount, onContinue, hideButton = false }: FlightBookingSummaryProps) {
  
  const basePrice = selectedFare ? selectedFare.price : flight.price;
  const totalBase = basePrice * travellersCount;
  
  // Minimal mock tax calculation for realism (e.g. 10% tax)
  const taxes = Math.round(totalBase * 0.1);
  const total = totalBase + taxes;

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-border)] p-6 sticky top-24">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Price Summary</h3>
      
      <div className="flex flex-col gap-3 text-sm mb-6">
        <div className="flex justify-between items-center text-[var(--color-text-secondary)]">
          <span>{travellersCount} Traveller{travellersCount > 1 ? 's' : ''}</span>
        </div>
        
        <div className="flex justify-between items-center text-[var(--color-text-secondary)]">
          <span>Base Fare ({selectedFare ? selectedFare.name : 'Lowest Fare'})</span>
          <span>{flight.currency} {totalBase.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center text-[var(--color-text-secondary)]">
          <span>Taxes & Fees</span>
          <span>{flight.currency} {taxes.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="h-px bg-[var(--color-border)] w-full mb-4"></div>
      
      <div className="flex justify-between items-end mb-6">
        <span className="text-[var(--color-text-primary)] font-bold">Total Amount</span>
        <div className="text-right">
          <span className="text-xs text-[var(--color-text-secondary)] block">Includes taxes</span>
          <span className="text-2xl font-bold text-[var(--color-text-primary)]">
            {flight.currency} {total.toLocaleString()}
          </span>
        </div>
      </div>

      {!hideButton && (
        <Button 
          fullWidth 
          size="lg" 
          onClick={onContinue}
          disabled={!selectedFare}
        >
          {selectedFare ? 'Continue' : 'Select a Fare'}
        </Button>
      )}
    </div>
  );
}
