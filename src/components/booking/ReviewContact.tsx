import React from 'react';
import { ContactInformation } from '@/types/booking';
import { Button } from '@/components/ui';
import { Mail, Phone } from 'lucide-react';

interface ReviewContactProps {
  contact: ContactInformation;
  onEdit: () => void;
}

export function ReviewContact({ contact, onEdit }: ReviewContactProps) {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-border)] p-6 mb-6">
      <div className="flex items-center justify-between mb-4 border-b border-[var(--color-border)] pb-4">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Contact Information</h3>
        <Button variant="ghost" size="sm" onClick={onEdit} className="text-[var(--color-primary)]">
          Edit
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-sm text-[var(--color-text-primary)]">
          <Mail size={16} className="text-[var(--color-text-muted)]" />
          <span>{contact.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[var(--color-text-primary)]">
          <Phone size={16} className="text-[var(--color-text-muted)]" />
          <span>{contact.phoneCode} {contact.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
}
