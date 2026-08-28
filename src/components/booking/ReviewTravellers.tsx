import React from 'react';
import { Traveller } from '@/types/booking';
import { Button } from '@/components/ui';
import { User, Baby } from 'lucide-react';

interface ReviewTravellersProps {
  travellers: Traveller[];
  onEdit: () => void;
}

export function ReviewTravellers({ travellers, onEdit }: ReviewTravellersProps) {
  // Group travellers for display, but keep original order/indices if needed, or just list them.
  // The simplest is just listing them.
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-border)] p-6 mb-6">
      <div className="flex items-center justify-between mb-4 border-b border-[var(--color-border)] pb-4">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Travellers</h3>
        <Button variant="ghost" size="sm" onClick={onEdit} className="text-[var(--color-primary)]">
          Edit
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {travellers.map((traveller, index) => (
          <div key={traveller.id} className="flex items-start gap-3">
            <div className="mt-1 text-[var(--color-text-muted)]">
              {traveller.type === 'infant' ? <Baby size={20} /> : <User size={20} />}
            </div>
            <div>
              <p className="font-semibold text-[var(--color-text-primary)]">
                {traveller.title} {traveller.firstName} {traveller.lastName}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] capitalize">
                {traveller.type} {index + 1} &bull; {traveller.gender} &bull; DOB: {traveller.dateOfBirth}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
