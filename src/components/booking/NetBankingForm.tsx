import React from 'react';
import { Select } from '@/components/ui';

interface NetBankingFormProps {
  bank: string;
  onChange: (value: string) => void;
  error?: string;
}

export function NetBankingForm({ bank, onChange, error }: NetBankingFormProps) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Pay via Net Banking</h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6">
        Select your bank to proceed with the secure checkout process.
      </p>

      <Select
        label="Select Bank"
        value={bank}
        onChange={(e) => onChange(e.target.value)}
        error={error}
      >
        <option value="">Choose a bank...</option>
        <option value="bank_a">Bank Option A</option>
        <option value="bank_b">Bank Option B</option>
        <option value="bank_c">Bank Option C</option>
        <option value="bank_other">Other Bank</option>
      </Select>
    </div>
  );
}
