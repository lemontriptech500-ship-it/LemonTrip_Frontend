import React from 'react';
import { FareOption } from '@/types/flights';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FareSelectionProps {
  fareOptions: FareOption[];
  selectedFareId: string | null;
  onSelectFare: (fareId: string) => void;
}

export function FareSelection({ fareOptions, selectedFareId, onSelectFare }: FareSelectionProps) {
  if (!fareOptions || fareOptions.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Select Fare Option</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fareOptions.map((fare) => {
          const isSelected = selectedFareId === fare.id;
          
          return (
            <div 
              key={fare.id}
              onClick={() => onSelectFare(fare.id)}
              className={cn(
                "relative flex flex-col p-5 rounded-[var(--radius-xl)] border-2 cursor-pointer transition-all duration-200",
                isSelected 
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md scale-[1.02]" 
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:shadow-sm"
              )}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectFare(fare.id);
                }
              }}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 bg-[var(--color-primary)] text-white rounded-full p-1 shadow-sm">
                  <Check size={16} />
                </div>
              )}
              
              <div className="mb-4 pr-8">
                <h4 className="text-lg font-bold text-[var(--color-text-primary)]">{fare.name}</h4>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">{fare.currency}</span>
                  <span className="text-2xl font-bold text-[var(--color-text-primary)]">{fare.price.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                  <span className="text-[var(--color-text-secondary)]">{fare.baggageAllowance}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={16} className={cn("shrink-0 mt-0.5", fare.refundable ? "text-[var(--color-success)]" : "text-[var(--color-text-muted)]")} />
                  <span className="text-[var(--color-text-secondary)]">{fare.refundable ? 'Refundable Fare' : 'Non-refundable'}</span>
                </div>
                {fare.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                    <span className="text-[var(--color-text-secondary)]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
