import React from 'react';
import { FareOption } from '@/types/flights';
import { AccordionItem } from '@/types';
import { Accordion } from '@/components/ui';

interface FlightImportantInfoProps {
  fareOption?: FareOption | null;
}

export function FlightImportantInfo({ fareOption }: FlightImportantInfoProps) {
  
  const cancellationPolicy = fareOption?.cancellationPolicy || "Please select a fare to view cancellation policies.";
  const changePolicy = fareOption?.changePolicy || "Please select a fare to view date change policies.";
  const baggageInfo = fareOption?.baggageAllowance || "Please select a fare to view baggage allowance.";

  const items: AccordionItem[] = [
    {
      id: 'cancellation',
      title: 'Cancellation Policy',
      content: <p className="text-sm text-[var(--color-text-secondary)]">{cancellationPolicy}</p>
    },
    {
      id: 'change',
      title: 'Date Change Policy',
      content: <p className="text-sm text-[var(--color-text-secondary)]">{changePolicy}</p>
    },
    {
      id: 'baggage',
      title: 'Baggage Allowance',
      content: <p className="text-sm text-[var(--color-text-secondary)]">{baggageInfo}</p>
    },
    {
      id: 'disclaimer',
      title: 'Important Travel Information',
      content: (
        <ul className="text-sm text-[var(--color-text-secondary)] list-disc pl-4 flex flex-col gap-1">
          <li>Ensure your passport is valid for at least 6 months from the date of travel.</li>
          <li>Visa requirements are the responsibility of the traveller.</li>
          <li>Check-in counters close 60 minutes before departure.</li>
        </ul>
      )
    }
  ];

  return (
    <div className="mt-8 mb-8">
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Important Information</h3>
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-sm border border-[var(--color-border)] overflow-hidden">
        {/* We use Accordion assuming it maps these items correctly based on our knowledge of UI components */}
        <Accordion items={items} />
      </div>
    </div>
  );
}
