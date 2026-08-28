'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Button } from '@/components/ui';
import { Checkbox } from '@/components/ui/Checkbox';
import { MOCK_FLIGHTS } from '@/data/flights';
import { Flight } from '@/types/flights';
import { EmptyState } from '@/components/common';
import { BookingTravellerData } from '@/types/booking';

import { BookingProgress } from '@/components/booking/BookingProgress';
import { FlightDetailsHeader } from '@/components/flights/FlightDetailsHeader';
import { ReviewFareSummary } from '@/components/booking/ReviewFareSummary';
import { ReviewTravellers } from '@/components/booking/ReviewTravellers';
import { ReviewContact } from '@/components/booking/ReviewContact';
import { BookingImportantInfo } from '@/components/booking/BookingImportantInfo';
import { FlightBookingSummary } from '@/components/flights/FlightBookingSummary';

export default function BookingReviewPage({ params }: { params: Promise<{ flightId: string }> }) {
  const { flightId } = React.use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [flight, setFlight] = useState<Flight | null>(null);
  const [bookingData, setBookingData] = useState<BookingTravellerData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState<string | undefined>(undefined);

  const fareId = searchParams.get('fareId');

  useEffect(() => {
    // 1. Fetch Flight
    const found = MOCK_FLIGHTS.find(f => f.id === flightId);
    if (found) setFlight(found);

    // 2. Hydrate from session storage
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

  if (!isLoaded) return null;

  // Handling Incomplete States
  if (!flight) {
    return (
      <div className="section-gap min-h-[60vh] flex items-center">
        <Container>
          <EmptyState 
            title="Flight Not Found" 
            description="We couldn't find the flight you're looking for." 
            action={{ label: "Back to Search", onClick: () => router.push('/') }} 
          />
        </Container>
      </div>
    );
  }

  if (!fareId) {
    return (
      <div className="section-gap min-h-[60vh] flex items-center">
        <Container>
          <EmptyState 
            title="Fare Not Selected" 
            description="Please select a fare before proceeding." 
            action={{ label: "Go to Flight Details", onClick: () => router.push(`/flights/${flight.id}?${searchParams.toString()}`) }} 
          />
        </Container>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="section-gap min-h-[60vh] flex items-center">
        <Container>
          <EmptyState 
            title="Missing Traveller Information" 
            description="Please complete the traveller and contact details to proceed with the booking review." 
            action={{ label: "Complete Details", onClick: () => router.push(`/flights/${flight.id}/travellers?${searchParams.toString()}`) }} 
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

  const handleContinue = () => {
    if (!termsAccepted) {
      setTermsError("You must acknowledge the terms to proceed.");
      return;
    }
    setTermsError(undefined);
    router.push(`/flights/${flight.id}/payment?${searchParams.toString()}`);
  };

  const handleEditFlight = () => {
    router.push(`/flights/${flight.id}?${searchParams.toString()}`);
  };

  const handleEditTravellers = () => {
    router.push(`/flights/${flight.id}/travellers?${searchParams.toString()}`);
  };

  return (
    <div className="section-gap pb-20 bg-[var(--color-background)] min-h-screen">
      <Container>
        
        {/* Progress Indicator */}
        <div className="mb-8 max-w-3xl mx-auto">
          <BookingProgress currentStep="review" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Content Area */}
          <div className="flex-1 w-full min-w-0">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
              Review Your Booking
            </h1>

            {/* Flight Summary */}
            <div className="mb-6 relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Flight Summary</h3>
                <Button variant="ghost" size="sm" onClick={handleEditFlight} className="text-[var(--color-primary)]">
                  Edit Flight
                </Button>
              </div>
              <FlightDetailsHeader flight={flight} />
            </div>

            {/* Fare Summary */}
            <ReviewFareSummary fare={selectedFare} onChangeFare={handleEditFlight} />

            {/* Traveller Summary */}
            <ReviewTravellers travellers={bookingData.travellers} onEdit={handleEditTravellers} />

            {/* Contact Summary */}
            <ReviewContact contact={bookingData.contact} onEdit={handleEditTravellers} />

            {/* Important Info */}
            <BookingImportantInfo />

            {/* Terms Acknowledgement */}
            <div className="mb-8">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  if (e.target.checked) setTermsError(undefined);
                }}
                label="I confirm that the traveller details provided are correct and I agree to the applicable booking and fare conditions."
                error={termsError}
              />
            </div>
          </div>

          {/* Sticky Booking Summary */}
          <div className="w-full lg:w-[350px] shrink-0">
            <FlightBookingSummary 
              flight={flight}
              selectedFare={selectedFare}
              travellersCount={bookingData.travellers.length}
              onContinue={handleContinue}
            />
          </div>

        </div>

      </Container>
    </div>
  );
}
