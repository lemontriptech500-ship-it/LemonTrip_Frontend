import React from 'react';
import { FareOption } from '@/types/flights';
import { Badge, Button } from '@/components/ui';

interface ReviewFareSummaryProps {
  fare: FareOption;
  onChangeFare: () => void;
}

export function ReviewFareSummary({ fare, onChangeFare }: ReviewFareSummaryProps) {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-border)] p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            Selected Fare: {fare.name}
            <Badge variant="info" className="capitalize">{fare.cabinClass}</Badge>
          </h3>
        </div>
        <Button variant="outline" size="sm" onClick={onChangeFare}>
          Change Fare
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[var(--color-text-secondary)]">Baggage Allowance</span>
          <span className="font-medium text-[var(--color-text-primary)]">{fare.baggageAllowance}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[var(--color-text-secondary)]">Refund Policy</span>
          <span className="font-medium text-[var(--color-text-primary)]">
            {fare.refundable ? 'Refundable' : 'Non-refundable'}
          </span>
        </div>
      </div>
    </div>
  );
}
