'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Button } from '@/components/ui';
import { Flight } from '@/types/flights';
import { EmptyState } from '@/components/common';
import { BookingTravellerData } from '@/types/booking';
import { validateCoupon } from '@/services/couponService';

import { BookingProgress } from '@/components/booking/BookingProgress';
import { PaymentSecurityNotice } from '@/components/booking/PaymentSecurityNotice';
import { FlightBookingSummary } from '@/components/flights/FlightBookingSummary';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { createRazorpayFlightOrder, getFlightById, verifyRazorpayFlightPayment } from '@/services/flightService';
import { payWithWalletFlight } from '@/services/travelPaymentService';
import { WalletPaymentForm } from '@/components/booking/WalletPaymentForm';

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
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);
  
  const fareId = searchParams.get('fareId');

  // Local, non-persisted payment state
  const [methodError, setMethodError] = useState<string | undefined>(undefined);

  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'wallet'>('razorpay');
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadBooking() {
      setIsLoading(true);
      setPageError(null);
      try {
        const [loadedFlight, savedBooking] = await Promise.all([
          getFlightById(flightId),
          Promise.resolve(sessionStorage.getItem(`bookingData_${flightId}`)),
        ]);

        if (cancelled) return;
        setFlight(loadedFlight);

        if (savedBooking) {
          const parsed = JSON.parse(savedBooking);
          if (parsed.travellers?.length > 0 && parsed.contact?.email) {
            setBookingData({
              flightId,
              fareId: fareId || '',
              travellers: parsed.travellers,
              contact: parsed.contact,
            });
          } else {
            setBookingData(null);
          }
        } else {
          setBookingData(null);
        }
      } catch (error) {
        if (!cancelled) setPageError(error instanceof Error ? error.message : 'Unable to load your payment details.')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    loadBooking();
    return () => {
      cancelled = true;
    };
  }, [flightId, fareId]);

  if (isLoading) {
    return (
      <div className="section-gap min-h-[60vh] flex items-center">
        <Container>
          <div className="mx-auto max-w-xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
            <Loader2 size={28} className="mx-auto animate-spin text-[var(--color-primary)]" />
            <p className="mt-4 font-medium text-[var(--color-text-primary)]">Loading your payment details...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (pageError) {
    return (
      <div className="section-gap min-h-[60vh] flex items-center">
        <Container>
          <EmptyState
            title="Payment details unavailable"
            description={pageError}
            action={{ label: 'Return to Flight Details', onClick: () => router.push(`/flights/${flightId}?${searchParams.toString()}`) }}
          />
        </Container>
      </div>
    );
  }

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

    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await loadRazorpayScript();
      const order = await createRazorpayFlightOrder({
        flightId: flight.id,
        fareId,
        travellers: bookingData.travellers,
        contact: bookingData.contact,
        couponCode: couponCode.trim(),
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

  const handleWalletBooking = async () => {
    setMethodError(undefined);
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      const result = await payWithWalletFlight({ flightId: flight.id, fareId, travellers: bookingData.travellers, contact: bookingData.contact, couponCode: couponCode.trim() });
      const query = new URLSearchParams(searchParams.toString());
      if (result.bookingReference) query.set('bookingReference', result.bookingReference);
      router.push(`/flights/${flight.id}/confirmation?${query.toString()}`);
    } catch (error) {
      setMethodError(error instanceof Error ? error.message : 'Unable to process wallet payment.');
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
              <div className="mb-4 rounded-md bg-[rgba(192,57,43,0.10)] p-3 text-sm font-medium text-[var(--color-error)]">
                {methodError}
              </div>
            )}

            <div className="mb-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Choose payment method</h2>
              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setPaymentMethod('razorpay')} className={paymentMethod === 'razorpay' ? 'flex-1 rounded-md border-2 border-[var(--color-primary)] p-3 font-medium text-[var(--color-primary)]' : 'flex-1 rounded-md border-2 border-[var(--color-border)] p-3 font-medium text-[var(--color-text-secondary)]'}>Card / Razorpay</button>
                <button type="button" onClick={() => setPaymentMethod('wallet')} className={paymentMethod === 'wallet' ? 'flex-1 rounded-md border-2 border-[var(--color-primary)] p-3 font-medium text-[var(--color-primary)]' : 'flex-1 rounded-md border-2 border-[var(--color-border)] p-3 font-medium text-[var(--color-text-secondary)]'}>Pay with Wallet</button>
              </div>
              {paymentMethod === 'wallet' ? <div className="mt-4"><WalletPaymentForm amount={Math.max(0, selectedFare.price * bookingData.travellers.length - couponDiscount)} currency={flight.currency} isLoading={isProcessing} error={methodError} /></div> : <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">Razorpay securely supports UPI, cards, net banking, and wallets.</p>}
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

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input value={couponCode} onChange={(event) => { setCouponCode(event.target.value.toUpperCase()); setCouponMessage(null) }} placeholder="Coupon code" className="h-10 flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm" />
              <Button variant="outline" onClick={async () => {
                const result = await validateCoupon(couponCode, selectedFare.price * bookingData.travellers.length, 'flight')
                setCouponDiscount(result.valid ? result.discountAmount ?? 0 : 0)
                setCouponMessage(result.valid ? `Coupon applied. Discount: ${result.discountAmount ?? 0}` : result.error || 'Coupon could not be applied.')
              }}>Apply coupon</Button>
            </div>
            {couponMessage && <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{couponMessage}</p>}
            
            <div className="mt-4">
              <Button 
                fullWidth 
                size="lg" 
                onClick={paymentMethod === 'wallet' ? handleWalletBooking : handleCompleteBooking}
                disabled={isProcessing}
                className="flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  paymentMethod === 'wallet' ? 'Pay with Wallet' : 'Pay securely with Razorpay'
                )}
              </Button>
            </div>
          </div>

        </div>

      </Container>
    </div>
  );
}
