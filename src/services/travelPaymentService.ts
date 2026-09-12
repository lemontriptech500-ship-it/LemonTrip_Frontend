import { apiRequest } from '@/lib/apiClient'

export type TravelItemType = 'hotel' | 'bus' | 'train' | 'package'
export type PaymentMethod = 'razorpay' | 'wallet'

export interface RazorpayTravelOrder {
  orderId: string
  amount: number
  currency: string
  keyId: string
  bookingId: string
  bookingReference: string
  subtotal: number
  discount: number
}

export interface WalletPaymentResult {
  bookingReference: string | null
  status: string
  amount?: number
  discount?: number
  balance?: number
}

export function createRazorpayTravelOrder(data: {
  itemType: TravelItemType
  itemId: string
  quantity: number
  details: { email: string; phone?: string; [key: string]: unknown }
  couponCode?: string
}): Promise<RazorpayTravelOrder> {
  return apiRequest<RazorpayTravelOrder>('/payments/razorpay/travel/order', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function verifyRazorpayTravelPayment(data: {
  bookingId: string
  itemType: 'bus' | 'travel'
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
}): Promise<{ bookingReference: string | null; status: string }> {
  return apiRequest('/payments/razorpay/travel/verify', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function payWithWallet(data: {
  itemType: TravelItemType
  itemId: string
  quantity: number
  details: { email: string; phone?: string; [key: string]: unknown }
  couponCode?: string
}): Promise<WalletPaymentResult> {
  return apiRequest<WalletPaymentResult>('/wallet/travel-booking', {
    method: 'POST',
    body: JSON.stringify({
      itemType: data.itemType,
      itemId: data.itemId,
      quantity: data.quantity,
      details: data.details,
      couponCode: data.couponCode || '',
    })
  })
}

export function payWithWalletFlight(data: {
  flightId: string
  fareId: string
  travellers: unknown[]
  contact: unknown
  couponCode?: string
}): Promise<WalletPaymentResult> {
  return apiRequest<WalletPaymentResult>('/wallet/flight-booking', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
