'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui';
import { EmptyState } from '@/components/common';
import { ArrowLeft } from 'lucide-react';
import { MOCK_FLIGHTS } from '@/data/flights';
import { Flight } from '@/types/flights';

import { FlightDetailsHeader } from '@/components/flights/FlightDetailsHeader';
import { FlightJourneyDetails } from '@/components/flights/FlightJourneyDetails';
import { FareSelection } from '@/components/flights/FareSelection';
import { FlightBookingSummary } from '@/components/flights/FlightBookingSummary';
import { FlightImportantInfo } from '@/components/flights/FlightImportantInfo';

export default function FlightDetailsPage({ params }: { params: Promise<{ flightId: string }> }) {
  const { flightId } = React.use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [flight, setFlight] = useState<Flight | null>(null);
  const [selectedFareId, setSelectedFareId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Attempt to parse traveller count from URL (e.g. "1-economy", or just "2")
  const travelClassParam = searchParams.get('travelClass');
  let travellersCount = 1;
  if (travelClassParam && travelClassParam.includes('-')) {
    travellersCount = parseInt(travelClassParam.split('-')[0], 10) || 1;
  } else if (searchParams.get('travellers')) {
    travellersCount = parseInt(searchParams.get('travellers') || '1', 10);
  }

  useEffect(() => {
    // Find flight by ID
    const found = MOCK_FLIGHTS.find(f => f.id === flightId);
    if (found) {
      setFlight(found);
      // Default behavior: Select the lowest fare (first one in array)
      if (found.fareOptions && found.fareOptions.length > 0) {
        setSelectedFareId(found.fareOptions[0].id);
      }
    }
    setIsLoaded(true);
  }, [flightId]);

  if (!isLoaded) return null; // Avoid initial hydration mismatch

  if (!flight) {
    return (
      <div className="section-gap min-h-[60vh] flex items-center">
        <Container>
          <EmptyState 
            title="Flight Not Found" 
            description="We couldn't find the flight you're looking for. It may have expired or sold out." 
            action={{ label: "Back to Search", onClick: () => router.back() }} 
          />
        </Container>
      </div>
    );
  }

  const selectedFare = flight.fareOptions?.find(f => f.id === selectedFareId) || null;

  const handleContinue = () => {
    // Prepare search params to preserve context and add fareId
    const newParams = new URLSearchParams(searchParams.toString());
    if (selectedFareId) {
      newParams.set('fareId', selectedFareId);
    }
    router.push(`/flights/${flight.id}/travellers?${newParams.toString()}`);
  };

  return (
    <div className="section-gap pb-20 bg-[var(--color-background)] min-h-screen">
      <Container>
        
        {/* Back Navigation */}
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Search Results
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Content Area */}
          <div className="flex-1 w-full min-w-0">
            <FlightDetailsHeader flight={flight} />
            <FlightJourneyDetails flight={flight} />
            
            {flight.fareOptions && (
              <FareSelection 
                fareOptions={flight.fareOptions} 
                selectedFareId={selectedFareId} 
                onSelectFare={setSelectedFareId} 
              />
            )}
            
            <FlightImportantInfo fareOption={selectedFare} />
          </div>

          {/* Sticky Booking Summary */}
          <div className="w-full lg:w-[350px] shrink-0">
            <FlightBookingSummary 
              flight={flight}
              selectedFare={selectedFare}
              travellersCount={travellersCount}
              onContinue={handleContinue}
            />
          </div>

        </div>

      </Container>
    </div>
  );
}
