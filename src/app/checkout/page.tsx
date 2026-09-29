'use client'

import { useState } from 'react'
import { Container, Card, Button } from '@/components/ui'
import { ShoppingBag, ShieldCheck, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { TravelRazorpayCheckout } from '@/components/booking/TravelRazorpayCheckout'

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.totalPrice())
  const removeItem = useCartStore((state) => state.removeItem)
  const [paymentReady, setPaymentReady] = useState(false)
  const paymentItem = items.length === 1 && items[0].type === 'package' ? items[0] : null
  const paymentItemId = paymentItem?.details?.packageId || paymentItem?.id.replace(/^package-/, '')

  return <div className="section-gap bg-[var(--color-background)]"><Container><div className="mx-auto max-w-4xl"><div className="mb-10 text-center"><h1 className="text-h1 mb-3">Checkout</h1><p className="text-body text-[var(--color-text-secondary)]">Review your selected travel services before payment.</p></div><div className="grid grid-cols-1 gap-6 lg:grid-cols-3"><Card className="p-6 lg:col-span-2"><h2 className="text-h3 mb-5 flex items-center gap-2"><ShoppingBag size={20} />Your Items</h2>{items.length === 0 ? <p className="text-sm text-[var(--color-text-muted)]">Your cart is empty.</p> : <div className="space-y-4">{items.map((item) => <div key={item.id} className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--color-border)] p-4"><div><p className="font-medium">{item.name}</p><p className="text-caption text-[var(--color-text-muted)]">{item.description} · Qty {item.quantity}</p></div><div className="flex items-center gap-3"><span className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span><button aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)}><Trash2 size={16} /></button></div></div>)}</div>}<div className="mt-6 flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-success-bg)] p-4 text-sm text-[var(--color-success)]"><ShieldCheck size={20} /><span>Payment will be processed securely by the backend payment provider.</span></div></Card><Card className="h-fit p-6 lg:sticky lg:top-24"><h2 className="text-h3 mb-5">Order Summary</h2><div className="mb-6 flex justify-between border-t border-[var(--color-border)] pt-3"><span className="font-semibold">Total</span><span className="text-lg font-bold">₹{total.toLocaleString('en-IN')}</span></div><Button fullWidth size="lg" disabled={!items.length || !paymentItemId} onClick={() => setPaymentReady(true)}>Continue to Payment</Button>{items.length > 0 && !paymentItemId && <p className="mt-3 text-sm text-[var(--color-error)]">Payment is currently available for one package item at a time.</p>}</Card></div>{paymentReady && paymentItem && paymentItemId && <Card className="mt-6 p-6"><h2 className="text-h3">Payment</h2><TravelRazorpayCheckout itemType="package" itemId={paymentItemId} amount={paymentItem.price} initialQuantity={paymentItem.quantity} quantityLabel="Travellers" label={`${paymentItem.name} package`} /></Card>}</div></Container></div>
}
