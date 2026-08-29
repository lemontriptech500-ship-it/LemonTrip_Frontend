'use client'

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Button } from '@/components/ui';
import { MOCK_FLIGHTS } from '@/data/flights';
import { Flight } from '@/types/flights';
import { EmptyState } from '@/components/common';
import { BookingTravellerData } from '@/types/booking';

import { BookingProgress } from '@/components/booking/BookingProgress';
import { FlightDetailsHeader } from '@/components/flights/FlightDetailsHeader';
import { FlightBookingSummary } from '@/components/flights/FlightBookingSummary';
import { BookingStatusNotice } from '@/components/booking/BookingStatusNotice';
import { ConfirmationTravellers } from '@/components/booking/ConfirmationTravellers';
import { ConfirmationContact } from '@/components/booking/ConfirmationContact';
import { CheckCircle2, Copy, Check } from 'lucide-react';

export default function ConfirmationPage({ params }: { params: Promise<{ flightId: string }> }) {
  const { flightId } = React.use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [flight, setFlight] = useState<Flight | null>(null);
  const [bookingData, setBookingData] = useState<BookingTravellerData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const fareId = searchParams.get('fareId');

  useEffect(() => {
    // 1. Fetch Flight
    const found = MOCK_FLIGHTS.find(f => f.id === flightId);
    if (found) setFlight(found);

    // 2. Hydrate from session storage
    // If the data exists, we consider the frontend flow completed.
    const saved = sessionStorage.getItem(`bookingData_${flightId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.travellers && parsed.travellers.length > 0 && parsed.contact && parsed.contact.email) {
          setBookingData({
            flightId,
            fareId: fareId || '',
            travellers: parsed.travellers,
            contact: parsed.contact,
          });
        }
      } catch (e) {
        console.error("Failed to parse saved booking data", e);
      }
    }

    setIsLoaded(true);
  }, [flightId, fareId]);

  // Deterministic Demo Reference Generation
  const bookingReference = useMemo(() => {
    if (!flightId || !fareId) return 'LT-DEMO-XXXXX';
    return `LT-DEMO-${flightId.slice(0, 4).toUpperCase()}-${fareId.slice(0, 4).toUpperCase()}`;
  }, [flightId, fareId]);

  if (!isLoaded) return null;

  // Handling Incomplete States
  if (!flight || !fareId || !bookingData) {
    return (
      <div className="section-gap min-h-[60vh] flex items-center">
        <Container>
          <EmptyState 
            title="Booking Not Found" 
            description="We couldn't find a completed booking for this session. Please start a new search." 
            action={{ label: "Search Flights", onClick: () => router.push('/') }} 
          />
        </Container>
      </div>
    );
  }

  const selectedFare = flight.fareOptions?.find(f => f.id === fareId) || null;

  if (!selectedFare) {
    return (
      <div className="section-gap min-h-[60vh] flex items-center">
        <Container>
          <EmptyState 
            title="Invalid Fare" 
            description="The selected fare is no longer available." 
            action={{ label: "Go to Flight Details", onClick: () => router.push(`/flights/${flight.id}?${searchParams.toString()}`) }} 
          />
        </Container>
      </div>
    );
  }

  const handleCopyReference = () => {
    navigator.clipboard.writeText(bookingReference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetAndSearch = () => {
    // Clear booking state so it doesn't contaminate new searches
    sessionStorage.removeItem(`bookingData_${flightId}`);
    router.push('/');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="section-gap pb-20 bg-[var(--color-background)] min-h-screen">
      <Container>
        
        <div className="mb-8 max-w-3xl mx-auto print:hidden">
          <BookingProgress currentStep="confirmation" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="flex-1 w-full min-w-0">
            {/* Success Header */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 mb-8 text-center flex flex-col items-center shadow-sm">
              <div className="w-16 h-16 bg-[var(--color-success)]/10 text-[var(--color-success)] rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                Booking Flow Completed
              </h1>
              <p className="text-[var(--color-text-secondary)] mb-6 max-w-lg">
                Thank you for trying out the LemonTrip frontend demo!
              </p>
              
              <div className="bg-[var(--color-surface-secondary)] px-6 py-4 rounded-lg flex items-center gap-4">
                <div className="text-left">
                  <p className="text-xs text-[var(--color-text-secondary)] uppercase font-semibold tracking-wider mb-1">
                    Demo Booking Reference
                  </p>
                  <p className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">
                    {bookingReference}
                  </p>
                </div>
                <button 
                  onClick={handleCopyReference}
                  className="p-2 hover:bg-[var(--color-border)] rounded-full transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] print:hidden"
                  title="Copy Reference"
                >
                  {copied ? <Check size={20} className="text-[var(--color-success)]" /> : <Copy size={20} />}
                </button>
              </div>
            </div>

            <BookingStatusNotice />

            {/* Flight Summary */}
            <div className="mb-6 relative">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Flight Details</h3>
              <FlightDetailsHeader flight={flight} />
            </div>

            {/* Traveller Summary */}
            <ConfirmationTravellers travellers={bookingData.travellers} />

            {/* Contact Summary */}
            <ConfirmationContact contact={bookingData.contact} />

          </div>

          {/* Sticky Booking Summary & Actions */}
          <div className="w-full lg:w-[350px] shrink-0 space-y-6">
            <FlightBookingSummary 
              flight={flight}
              selectedFare={selectedFare}
              travellersCount={bookingData.travellers.length}
              onContinue={() => {}}
              hideButton
            />

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 shadow-sm print:hidden">
              <h3 className="font-bold text-[var(--color-text-primary)] mb-4">Next Steps</h3>
              
              <div className="flex flex-col gap-3">
                <Button 
                  fullWidth 
                  size="lg" 
                  onClick={handleResetAndSearch}
                >
                  Search Flights Again
                </Button>
                
                <Button 
                  fullWidth 
                  variant="outline" 
                  onClick={handlePrint}
                >
                  Print Booking Summary
                </Button>
                
                <Button 
                  fullWidth 
                  variant="ghost" 
                  onClick={handleResetAndSearch}
                  className="text-[var(--color-text-secondary)]"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>

        </div>

      </Container>
    </div>
  );
}
