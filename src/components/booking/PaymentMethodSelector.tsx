import React from 'react';
import { cn } from '@/lib/utils';
import { CreditCard, Smartphone, Building2, Wallet } from 'lucide-react';

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet';

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

const METHODS = [
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', icon: Building2 },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
] as const;

export function PaymentMethodSelector({ selected, onSelect }: PaymentMethodSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      {METHODS.map(({ id, label, icon: Icon }) => {
        const isSelected = selected === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id as PaymentMethod)}
            aria-pressed={isSelected}
            className={cn(
              "flex items-center gap-4 p-4 w-full text-left rounded-[var(--radius-lg)] border transition-all duration-200",
              isSelected 
                ? "border-[var(--color-primary)] bg-[rgba(39, 174, 96, 0.05)" 
                : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-secondary-hover)]"
            )}
          >
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200",
              isSelected ? "border-[var(--color-primary)]" : "border-[var(--color-text-muted)]"
            )}>
              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />}
            </div>
            
            <div className={cn(
              "p-2 rounded-full",
              isSelected ? "bg-[rgba(39, 174, 96, 0.10) text-[var(--color-primary)]" : "bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]"
            )}>
              <Icon size={20} />
            </div>
            
            <span className={cn(
              "font-medium",
              isSelected ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"
            )}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
