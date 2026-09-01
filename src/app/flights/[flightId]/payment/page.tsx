'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Button } from '@/components/ui';
import { MOCK_FLIGHTS } from '@/data/flights';
import { Flight } from '@/types/flights';
import { EmptyState } from '@/components/common';
import { BookingTravellerData } from '@/types/booking';

import { BookingProgress } from '@/components/booking/BookingProgress';
import { PaymentMethodSelector, PaymentMethod } from '@/components/booking/PaymentMethodSelector';
import { UpiPaymentForm } from '@/components/booking/UpiPaymentForm';
import { CardPaymentForm } from '@/components/booking/CardPaymentForm';
import { NetBankingForm } from '@/components/booking/NetBankingForm';
import { WalletPaymentForm } from '@/components/booking/WalletPaymentForm';
import { PaymentSecurityNotice } from '@/components/booking/PaymentSecurityNotice';
import { FlightBookingSummary } from '@/components/flights/FlightBookingSummary';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function PaymentPage({ params }: { params: Promise<{ flightId: string }> }) {
  const { flightId } = React.use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [flight, setFlight] = useState<Flight | null>(null);
  const [bookingData, setBookingData] = useState<BookingTravellerData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const fareId = searchParams.get('fareId');

  // Local, non-persisted payment state
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [methodError, setMethodError] = useState<string | undefined>(undefined);
  
  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState<string | undefined>(undefined);
  
  const [cardData, setCardData] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});
  
  const [bank, setBank] = useState('');
  const [bankError, setBankError] = useState<string | undefined>(undefined);
  
  const [wallet, setWallet] = useState('');
  const [walletError, setWalletError] = useState<string | undefined>(undefined);

  const [isProcessing, setIsProcessing] = useState(false);

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
  if (!flight || !fareId || !bookingData) {
    return (
      <div className="section-gap min-h-[60vh] flex items-center">
        <Container>
          <EmptyState 
            title="Incomplete Booking" 
            description="Your booking context is incomplete. Please return to the review step." 
            action={{ label: "Go to Booking Review", onClick: () => router.push(`/flights/${flightId}/review?${searchParams.toString()}`) }} 
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

  const handleBack = () => {
    router.back();
  };

  const handleCompleteBooking = () => {
    let isValid = true;

    // Reset errors
    setMethodError(undefined);
    setUpiError(undefined);
    setCardErrors({});
    setBankError(undefined);
    setWalletError(undefined);

    if (!selectedMethod) {
      setMethodError('Please select a payment method.');
      isValid = false;
    } else {
      if (selectedMethod === 'upi') {
        if (!upiId.trim()) { setUpiError('UPI ID is required'); isValid = false; }
      } else if (selectedMethod === 'card') {
        const cErrors: Record<string, string> = {};
        if (!cardData.cardName.trim()) cErrors.cardName = 'Required';
        if (cardData.cardNumber.replace(/\s/g, '').length < 15) cErrors.cardNumber = 'Invalid card number';
        if (cardData.expiry.length < 5) cErrors.expiry = 'Invalid expiry';
        if (cardData.cvv.length < 3) cErrors.cvv = 'Invalid CVV';
        if (Object.keys(cErrors).length > 0) {
          setCardErrors(cErrors);
          isValid = false;
        }
      } else if (selectedMethod === 'netbanking') {
        if (!bank) { setBankError('Please select a bank'); isValid = false; }
      } else if (selectedMethod === 'wallet') {
        if (!wallet) { setWalletError('Please select a wallet'); isValid = false; }
      }
    }

    if (!isValid) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    // Simulate API call and redirect
    setTimeout(() => {
      // Clear sensitive temporary data (already in local state and not persisted, but to be safe)
      setSelectedMethod(null);
      setCardData({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
      setUpiId('');
      
      router.push(`/flights/${flight.id}/confirmation?${searchParams.toString()}`);
    }, 1500);
  };

  return (
    <div className="section-gap pb-20 bg-[var(--color-background)] min-h-screen">
      <Container>
        
        <div className="mb-8 max-w-3xl mx-auto">
          <BookingProgress currentStep="payment" />
        </div>

        <div className="mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Review
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="flex-1 w-full min-w-0">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
              Payment
            </h1>

            <PaymentSecurityNotice />

            {methodError && (
              <div className="mb-4 p-3 rounded-md bg-[rgba(192, 57, 43, 0.10) text-[var(--color-error)] text-sm font-medium">
                {methodError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
              {/* Payment Methods */}
              <div className="md:col-span-5">
                <PaymentMethodSelector 
                  selected={selectedMethod as PaymentMethod} 
                  onSelect={(m) => {
                    setSelectedMethod(m);
                    setMethodError(undefined);
                  }} 
                />
              </div>

              {/* Payment Details Area */}
              <div className="md:col-span-7">
                {!selectedMethod && (
                  <div className="h-full flex items-center justify-center p-8 border border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)] text-[var(--color-text-muted)] text-sm">
                    Select a payment method to continue
                  </div>
                )}
                {selectedMethod === 'upi' && (
                  <UpiPaymentForm upiId={upiId} onChange={setUpiId} error={upiError} />
                )}
                {selectedMethod === 'card' && (
                  <CardPaymentForm 
                    cardName={cardData.cardName}
                    cardNumber={cardData.cardNumber}
                    expiry={cardData.expiry}
                    cvv={cardData.cvv}
                    onChange={(f, v) => setCardData(prev => ({ ...prev, [f]: v }))}
                    errors={cardErrors} 
                  />
                )}
                {selectedMethod === 'netbanking' && (
                  <NetBankingForm bank={bank} onChange={setBank} error={bankError} />
                )}
                {selectedMethod === 'wallet' && (
                  <WalletPaymentForm wallet={wallet} onChange={setWallet} error={walletError} />
                )}
              </div>
            </div>

          </div>

          {/* Sticky Booking Summary */}
          <div className="w-full lg:w-[350px] shrink-0">
            <FlightBookingSummary 
              flight={flight}
              selectedFare={selectedFare}
              travellersCount={bookingData.travellers.length}
              onContinue={() => {}}
              hideButton
            />
            
            <div className="mt-4">
              <Button 
                fullWidth 
                size="lg" 
                onClick={handleCompleteBooking}
                disabled={isProcessing}
                className="flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Complete Booking"
                )}
              </Button>
            </div>
          </div>

        </div>

      </Container>
    </div>
  );
}
