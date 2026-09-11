'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import { Flight } from '@/types/flights';
import { getFlightById } from '@/services/flightService';
import { EmptyState } from '@/components/common';

import { BookingProgress } from '@/components/booking/BookingProgress';
import { TravellerForm } from '@/components/booking/TravellerForm';
import { ContactInformationForm } from '@/components/booking/ContactInformationForm';
import { FlightBookingSummary } from '@/components/flights/FlightBookingSummary';
import { useTravellerForm } from '@/hooks/useTravellerForm';

export default function TravellersPage({ params }: { params: Promise<{ flightId: string }> }) {
  const { flightId } = React.use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [flight, setFlight] = useState<Flight | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Extract context from URL
  const fareId = searchParams.get('fareId');
  const travelClassParam = searchParams.get('travelClass');
  const travellersParam = searchParams.get('travellers');

  // Simple parsing of counts
  let adultCount = 1;
  let childCount = 0;
  let infantCount = 0;

  if (travelClassParam && travelClassParam.includes('-')) {
    adultCount = parseInt(travelClassParam.split('-')[0], 10) || 1;
  } else if (travellersParam) {
    adultCount = parseInt(travellersParam, 10) || 1;
  }

  // Support for specific counts in future search context
  const adultsQuery = searchParams.get('adults');
  if (adultsQuery) adultCount = parseInt(adultsQuery, 10);
  const childrenQuery = searchParams.get('children');
  if (childrenQuery) childCount = parseInt(childrenQuery, 10);
  const infantsQuery = searchParams.get('infants');
  if (infantsQuery) infantCount = parseInt(infantsQuery, 10);

  const totalTravellersCount = adultCount + childCount + infantCount;

  const { 
    travellers, 
    contact, 
    errors, 
    updateTraveller, 
    updateContact, 
    validate, 
    saveToSession 
  } = useTravellerForm({ 
    adultCount, 
    childCount, 
    infantCount, 
    flightId 
  });

  useEffect(() => {
    getFlightById(flightId).then(setFlight);
    setIsLoaded(true);
  }, [flightId]);

  if (!isLoaded) return null;

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
            description="Please select a fare before proceeding to enter traveller information." 
            action={{ label: "Go to Flight Details", onClick: () => router.push(`/flights/${flight.id}?${searchParams.toString()}`) }} 
          />
        </Container>
      </div>
    );
  }

  const selectedFare = flight.fareOptions?.find(f => f.id === fareId) || null;

  const handleContinue = () => {
    if (validate()) {
      saveToSession();
      // Go to next module
      router.push(`/flights/${flight.id}/review?${searchParams.toString()}`);
    } else {
      // Scroll to top or first error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    saveToSession();
    router.back();
  };

  // Group forms by type for rendering
  const adults = travellers.filter(t => t.type === 'adult');
  const children = travellers.filter(t => t.type === 'child');
  const infants = travellers.filter(t => t.type === 'infant');

  return (
    <div className="section-gap pb-20 bg-[var(--color-background)] min-h-screen">
      <Container>
        
        {/* Progress Indicator */}
        <div className="mb-8 max-w-3xl mx-auto">
          <BookingProgress currentStep="travellers" />
        </div>

        {/* Back Navigation */}
        <div className="mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            <ArrowLeft size={16} />
            Change Fare / Flight
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Content Area */}
          <div className="flex-1 w-full min-w-0">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
              Traveller Information
            </h1>

            {/* Adult Forms */}
            {adults.map((traveller, idx) => (
              <TravellerForm 
                key={traveller.id} 
                index={idx} 
                traveller={traveller} 
                onChange={(field, value) => updateTraveller(traveller.id, field, value)}
                errors={errors.travellers[traveller.id]}
              />
            ))}

            {/* Child Forms */}
            {children.map((traveller, idx) => (
              <TravellerForm 
                key={traveller.id} 
                index={idx} 
                traveller={traveller} 
                onChange={(field, value) => updateTraveller(traveller.id, field, value)}
                errors={errors.travellers[traveller.id]}
              />
            ))}

            {/* Infant Forms */}
            {infants.map((traveller, idx) => (
              <TravellerForm 
                key={traveller.id} 
                index={idx} 
                traveller={traveller} 
                onChange={(field, value) => updateTraveller(traveller.id, field, value)}
                errors={errors.travellers[traveller.id]}
              />
            ))}

            {/* Contact Information */}
            <ContactInformationForm 
              contact={contact}
              onChange={updateContact}
              errors={errors.contact}
            />

          </div>

          {/* Sticky Booking Summary */}
          <div className="w-full lg:w-[350px] shrink-0">
            <FlightBookingSummary 
              flight={flight}
              selectedFare={selectedFare}
              travellersCount={totalTravellersCount}
              onContinue={handleContinue}
            />
          </div>

        </div>

      </Container>
    </div>
  );
}
