import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function BookingImportantInfo() {
  return (
    <div className="bg-[var(--color-surface-secondary)] rounded-[var(--radius-xl)] p-6 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle size={18} className="text-[var(--color-text-primary)]" />
        <h3 className="font-bold text-[var(--color-text-primary)]">Important Information</h3>
      </div>
      <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--color-text-secondary)]">
        <li>Please ensure all traveller details match valid travel documents precisely.</li>
        <li>Fare conditions, including cancellation and change policies, apply based on your selected fare.</li>
        <li>Final booking confirmation is subject to successful payment processing.</li>
        <li>Standard check-in baggage allowances apply unless additional allowance is purchased.</li>
      </ul>
    </div>
  );
}
