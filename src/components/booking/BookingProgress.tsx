import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BookingStep = 'flight' | 'travellers' | 'review' | 'payment' | 'confirmation';

export interface BookingProgressStep {
  id: string;
  label: string;
}

export const FLIGHT_BOOKING_STEPS: BookingProgressStep[] = [
  { id: 'flight', label: 'Flight' },
  { id: 'travellers', label: 'Travellers' },
  { id: 'review', label: 'Review' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirmation', label: 'Confirmation' },
];

export const HOTEL_BOOKING_STEPS: BookingProgressStep[] = [
  { id: 'hotel', label: 'Hotel' },
  { id: 'guests', label: 'Guests' },
  { id: 'review', label: 'Review' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirmation', label: 'Confirmation' },
];

interface BookingProgressProps {
  currentStep: string;
  steps?: BookingProgressStep[];
  className?: string;
}

export function BookingProgress({
  currentStep,
  steps = FLIGHT_BOOKING_STEPS,
  className,
}: BookingProgressProps) {
  const currentIndex = Math.max(0, steps.findIndex(step => step.id === currentStep));

  return (
    <div className={cn("w-full py-6", className)}>
      <div className="flex items-center justify-between relative">
        {/* Background Track */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[var(--color-surface-secondary)] z-0 rounded-full" />
        
        {/* Active Track */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--color-primary)] z-0 transition-all duration-300 rounded-full"
          style={{ width: `${steps.length > 1 ? (currentIndex / (steps.length - 1)) * 100 : 0}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 border-2",
                  isCompleted ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-surface)]" :
                  isActive ? "bg-[var(--color-surface)] border-[var(--color-primary)] text-[var(--color-primary)]" :
                  "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-muted)]"
                )}
              >
                {isCompleted ? <Check size={16} /> : (index + 1)}
              </div>
              <span className={cn(
                "max-w-[4.5rem] text-center text-[10px] font-medium leading-tight sm:max-w-none sm:whitespace-nowrap sm:text-xs",
                isCompleted ? "text-[var(--color-text-primary)]" :
                isActive ? "text-[var(--color-primary)]" :
                "text-[var(--color-text-muted)]"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
