import React from 'react';
import { Traveller } from '@/types/booking';
import { User, Baby } from 'lucide-react';

interface ConfirmationTravellersProps {
  travellers: Traveller[];
}

export function ConfirmationTravellers({ travellers }: ConfirmationTravellersProps) {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-border)] p-6 mb-6">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 border-b border-[var(--color-border)] pb-4">
        Travellers
      </h3>

      <div className="flex flex-col gap-4">
        {travellers.map((traveller, index) => (
          <div key={traveller.id} className="flex items-start gap-3">
            <div className="mt-1 text-[var(--color-text-muted)] shrink-0">
              {traveller.type === 'infant' ? <Baby size={20} /> : <User size={20} />}
            </div>
            <div>
              <p className="font-semibold text-[var(--color-text-primary)]">
                {traveller.title} {traveller.firstName} {traveller.lastName}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] capitalize">
                {traveller.type} {index + 1} &bull; {traveller.gender}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
