import React from 'react';
import { Info } from 'lucide-react';

interface BookingStatusNoticeProps {
  title?: string;
  message?: string;
}

export function BookingStatusNotice({
  title = 'Payment verified',
  message = 'Your payment was verified successfully and your booking has been confirmed.',
}: BookingStatusNoticeProps) {
  return (
    <div className="mb-8 flex items-start gap-4 rounded-[var(--radius-xl)] border border-[rgba(39,174,96,0.20)] bg-[rgba(39,174,96,0.10)] p-6">
      <Info className="text-[var(--color-primary)] shrink-0 mt-0.5" size={24} />
      <div>
        <h3 className="font-bold text-[var(--color-primary)] mb-1">{title}</h3>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}
