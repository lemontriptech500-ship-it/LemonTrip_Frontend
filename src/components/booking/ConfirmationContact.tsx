import React from 'react';
import { ContactInformation } from '@/types/booking';
import { Mail, Phone } from 'lucide-react';

interface ConfirmationContactProps {
  contact: ContactInformation;
}

export function ConfirmationContact({ contact }: ConfirmationContactProps) {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-border)] p-6 mb-6">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 border-b border-[var(--color-border)] pb-4">
        Contact Details
      </h3>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-sm text-[var(--color-text-primary)]">
          <Mail size={16} className="text-[var(--color-text-muted)] shrink-0" />
          <span>{contact.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[var(--color-text-primary)]">
          <Phone size={16} className="text-[var(--color-text-muted)] shrink-0" />
          <span>{contact.phoneCode} {contact.phoneNumber}</span>
        </div>
      </div>
      
      <p className="text-xs text-[var(--color-text-secondary)] mt-4 italic">
        In a production system, confirmation details and e-tickets would be sent to this contact.
      </p>
    </div>
  );
}
