'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Button } from '@/components/ui';
import { Flight } from '@/types/flights';
import { EmptyState } from '@/components/common';
import { BookingTravellerData } from '@/types/booking';

import { BookingProgress } from '@/components/booking/BookingProgress';
import { PaymentSecurityNotice } from '@/components/booking/PaymentSecurityNotice';
import { FlightBookingSummary } from '@/components/flights/FlightBookingSummary';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { createRazorpayFlightOrder, getFlightById, verifyRazorpayFlightPayment } from '@/services/flightService';

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Razorpay Checkout could not load.'));
    document.body.appendChild(script);
  });
}

export default function PaymentPage({ params }: { params: Promise<{ flightId: string }> }) {
  const { flightId } = React.use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [flight, setFlight] = useState<Flight | null>(null);
  const [bookingData, setBookingData] = useState<BookingTravellerData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const fareId = searchParams.get('fareId');

  // Local, non-persisted payment state
  const [methodError, setMethodError] = useState<string | undefined>(undefined);

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // 1. Fetch Flight
    getFlightById(flightId).then(setFlight);

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

  const handleCompleteBooking = async () => {
    setMethodError(undefined);

    setIsProcessing(true);
    try {
      await loadRazorpayScript();
      const order = await createRazorpayFlightOrder({
        flightId: flight.id,
        fareId,
        travellers: bookingData.travellers,
        contact: bookingData.contact,
      });
      if (!window.Razorpay) throw new Error('Razorpay Checkout is unavailable.');

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'LemonTrip',
        description: `${flight.airline} flight booking`,
        order_id: order.orderId,
        prefill: { email: bookingData.contact.email, contact: `${bookingData.contact.phoneCode}${bookingData.contact.phoneNumber}` },
        theme: { color: '#ffd21a' },
        handler: async (payment: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          try {
            const verified = await verifyRazorpayFlightPayment({
              bookingId: order.bookingId,
              razorpayOrderId: payment.razorpay_order_id,
              razorpayPaymentId: payment.razorpay_payment_id,
              razorpaySignature: payment.razorpay_signature,
            });
            const query = new URLSearchParams(searchParams.toString());
            if (verified.bookingReference) query.set('bookingReference', verified.bookingReference);
            router.push(`/flights/${flight.id}/confirmation?${query.toString()}`);
          } catch (error) {
            setMethodError(error instanceof Error ? error.message : 'Payment verification failed.');
            setIsProcessing(false);
          }
        },
        modal: { ondismiss: () => setIsProcessing(false) },
      });
      checkout.open();
    } catch (error) {
      setMethodError(error instanceof Error ? error.message : 'Unable to start Razorpay Checkout.');
      setIsProcessing(false);
    }
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

            <div className="mb-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Pay securely with Razorpay</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Razorpay securely supports UPI, cards, net banking, and wallets. Your payment details are entered directly in Razorpay Checkout and are never stored by LemonTrip.
              </p>
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
                  "Pay securely with Razorpay"
                )}
              </Button>
            </div>
          </div>

        </div>

      </Container>
    </div>
  );
}
