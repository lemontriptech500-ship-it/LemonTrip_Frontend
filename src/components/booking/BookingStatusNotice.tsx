import React from 'react';
import { Info } from 'lucide-react';

interface BookingStatusNoticeProps {
  title?: string;
  message?: string;
}

export function BookingStatusNotice({
  title = 'Demo Booking Completed',
  message = 'Your frontend booking flow has completed successfully. Please note that this is a simulated demo environment. No real payment was processed and no actual reservation has been made. Real confirmation would require backend and payment gateway integration.',
}: BookingStatusNoticeProps) {
  return (
    <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-[var(--radius-xl)] p-6 mb-8 flex items-start gap-4">
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
