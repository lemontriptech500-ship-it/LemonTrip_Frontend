import type { Metadata } from 'next'
import { Container, Card, Badge, Button } from '@/components/ui'
import { ShoppingBag, CreditCard, ShieldCheck, Truck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your travel booking on LemonTrip.',
}

export default function CheckoutPage() {
  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-h1 text-[var(--color-text-primary)] mb-3">Checkout</h1>
            <p className="text-body text-[var(--color-text-secondary)]">
              Complete your booking in just a few steps
            </p>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <StepIndicator step={1} label="Review" active />
            <div className="w-12 h-px bg-[var(--color-border)]" />
            <StepIndicator step={2} label="Payment" />
            <div className="w-12 h-px bg-[var(--color-border)]" />
            <StepIndicator step={3} label="Confirm" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <Card className="p-6">
                <h3 className="text-h3 mb-5 flex items-center gap-2">
                  <ShoppingBag size={20} className="text-[var(--color-primary)]" />
                  Your Items
                </h3>
                <div className="space-y-4">
                  <CheckoutItem
                    title="Delhi to Mumbai Flight"
                    subtitle="IndiGo 6E-201 • 15 Sep 2026"
                    price="₹4,500"
                  />
                  <CheckoutItem
                    title="The Grand Imperial, Delhi"
                    subtitle="2 Nights • 20-22 Sep 2026"
                    price="₹8,200"
                  />
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <h3 className="text-h3 mb-5 flex items-center gap-2">
                  <CreditCard size={20} className="text-[var(--color-primary)]" />
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <PaymentMethod label="UPI" active />
                  <PaymentMethod label="Card" />
                  <PaymentMethod label="Net Banking" />
                  <PaymentMethod label="Wallet" />
                </div>
              </Card>

              {/* Security Notice */}
              <div className="flex items-center gap-3 p-4 rounded-[var(--radius-md)] bg-[var(--color-success-bg)] border border-[var(--color-success)]/20">
                <ShieldCheck size={20} className="text-[var(--color-success)] shrink-0" />
                <p className="text-sm text-[var(--color-success)]">
                  Your payment is secured with 256-bit SSL encryption. This is a demo checkout — no real payment will be processed.
                </p>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-h3 mb-5">Order Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                    <span className="font-medium">₹12,700</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">Taxes (10%)</span>
                    <span className="font-medium">₹1,270</span>
                  </div>
                  <div className="flex justify-between text-sm text-[var(--color-success)]">
                    <span>Discount</span>
                    <span className="font-medium">-₹500</span>
                  </div>
                  <div className="border-t border-[var(--color-border)] pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-lg font-bold text-[var(--color-text-primary)]">₹13,470</span>
                  </div>
                </div>

                <Button fullWidth size="lg">
                  Pay ₹13,470
                </Button>

                <p className="text-caption text-[var(--color-text-muted)] text-center mt-3">
                  Demo checkout — no real payment
                </p>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

function StepIndicator({ step, label, active = false }: { step: number; label: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
        active
          ? 'bg-[var(--color-primary)] text-white'
          : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]'
      }`}>
        {step}
      </div>
      <span className={`text-sm font-medium ${active ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`}>
        {label}
      </span>
    </div>
  )
}

function CheckoutItem({ title, subtitle, price }: { title: string; subtitle: string; price: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-[var(--radius-md)] border border-[var(--color-border)]">
      <div>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">{title}</p>
        <p className="text-caption text-[var(--color-text-muted)] mt-0.5">{subtitle}</p>
      </div>
      <span className="text-sm font-semibold text-[var(--color-text-primary)]">{price}</span>
    </div>
  )
}

function PaymentMethod({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`p-3 rounded-[var(--radius-md)] border text-center text-sm font-medium transition-all ${
        active
          ? 'border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
          : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
      }`}
    >
      {label}
    </button>
  )
}
