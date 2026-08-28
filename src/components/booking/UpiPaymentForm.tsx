import React from 'react';
import { Input } from '@/components/ui';

interface UpiPaymentFormProps {
  upiId: string;
  onChange: (value: string) => void;
  error?: string;
}

export function UpiPaymentForm({ upiId, onChange, error }: UpiPaymentFormProps) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Pay via UPI</h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6">
        Enter your UPI ID (VPA). Your payment method will be verified during secure payment processing.
      </p>

      <Input
        label="UPI ID"
        placeholder="e.g. yourname@bank"
        value={upiId}
        onChange={(e) => onChange(e.target.value)}
        error={error}
      />
    </div>
  );
}
