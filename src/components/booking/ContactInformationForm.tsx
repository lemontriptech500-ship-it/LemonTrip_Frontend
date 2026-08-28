import React from 'react';
import { Input } from '@/components/ui';
import { ContactInformation } from '@/types/booking';
import { Mail, Phone } from 'lucide-react';

interface ContactInformationFormProps {
  contact: ContactInformation;
  onChange: (field: keyof ContactInformation, value: string) => void;
  errors?: Partial<Record<keyof ContactInformation, string>>;
}

export function ContactInformationForm({ contact, onChange, errors = {} }: ContactInformationFormProps) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-sm mb-6">
      <div className="mb-6 pb-4 border-b border-[var(--color-border)]">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">Contact Information</h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Your ticket and flight updates will be sent to these details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. name@example.com"
          leadingIcon={<Mail size={16} />}
          value={contact.email}
          onChange={(e) => onChange('email', e.target.value)}
          error={errors.email}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-label text-[var(--color-text-primary)]">
            Phone Number
          </label>
          <div className="flex gap-2">
            <div className="w-24 shrink-0">
              <Input
                placeholder="+1"
                value={contact.phoneCode}
                onChange={(e) => onChange('phoneCode', e.target.value)}
                error={errors.phoneCode}
                aria-label="Country Code"
              />
            </div>
            <div className="flex-1">
              <Input
                type="tel"
                placeholder="e.g. 555 123 4567"
                leadingIcon={<Phone size={16} />}
                value={contact.phoneNumber}
                onChange={(e) => onChange('phoneNumber', e.target.value)}
                error={errors.phoneNumber}
                aria-label="Phone Number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
