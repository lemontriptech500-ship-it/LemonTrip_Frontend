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
    <div className="mb-8 flex items-start gap-4 rounded-[var(--radius-xl)] border border-[var(--color-success)]/20 bg-[var(--color-success-bg)] p-6">
      <Info className="mt-0.5 shrink-0 text-[var(--color-success)]" size={24} />
      <div>
        <h3 className="mb-1 font-bold text-[var(--color-success)]">{title}</h3>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}
