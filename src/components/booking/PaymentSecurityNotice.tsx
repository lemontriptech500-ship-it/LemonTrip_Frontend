import React from 'react';
import { Lock } from 'lucide-react';

export function PaymentSecurityNotice() {
  return (
    <div className="bg-[var(--color-surface-secondary)] rounded-[var(--radius-xl)] p-6 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Lock size={18} className="text-[var(--color-text-primary)]" />
        <h3 className="font-bold text-[var(--color-text-primary)]">Secure Payment Demo</h3>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)]">
        This is a frontend payment flow demonstration. LemonTrip does not process real payments in this environment. 
        Any information entered above is temporary and will not be stored, logged, or securely transmitted to any payment gateway.
      </p>
    </div>
  );
}
