import React from 'react';
import { Select } from '@/components/ui';

interface WalletPaymentFormProps {
  wallet: string;
  onChange: (value: string) => void;
  error?: string;
}

export function WalletPaymentForm({ wallet, onChange, error }: WalletPaymentFormProps) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Pay via Wallet</h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6">
        Select your preferred digital wallet.
      </p>

      <Select
        label="Select Wallet"
        value={wallet}
        onChange={(e) => onChange(e.target.value)}
        error={error}
      >
        <option value="">Choose a wallet...</option>
        <option value="travel_wallet">Travel Wallet</option>
        <option value="digital_wallet">Digital Wallet</option>
        <option value="other_wallet">Other Wallet</option>
      </Select>
    </div>
  );
}
