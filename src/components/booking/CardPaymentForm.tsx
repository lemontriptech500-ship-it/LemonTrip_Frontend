import React from 'react';
import { Input } from '@/components/ui';

interface CardPaymentFormProps {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export function CardPaymentForm({ cardName, cardNumber, expiry, cvv, onChange, errors = {} }: CardPaymentFormProps) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Pay via Credit / Debit Card</h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6">
        This is a frontend demonstration. No card details will be permanently stored or processed.
      </p>

      <div className="flex flex-col gap-4">
        <Input
          label="Cardholder Name"
          placeholder="As printed on the card"
          value={cardName}
          onChange={(e) => onChange('cardName', e.target.value)}
          error={errors.cardName}
        />

        <Input
          label="Card Number"
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
          onChange={(e) => {
            // Very basic auto-formatting for demo
            const val = e.target.value.replace(/\D/g, '');
            const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
            onChange('cardNumber', formatted);
          }}
          maxLength={19}
          error={errors.cardNumber}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry Date"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              let formatted = val;
              if (val.length > 2) {
                formatted = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
              }
              onChange('expiry', formatted);
            }}
            maxLength={5}
            error={errors.expiry}
          />

          <Input
            label="CVV"
            type="password"
            placeholder="123"
            value={cvv}
            onChange={(e) => onChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
            maxLength={4}
            error={errors.cvv}
          />
        </div>
      </div>
    </div>
  );
}
