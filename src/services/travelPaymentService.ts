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
}

export interface WalletPaymentResult {
  bookingReference: string | null
  status: string
}

export function createRazorpayTravelOrder(data: {
  itemType: TravelItemType
  itemId: string
  quantity: number
  details: { email: string; phone?: string; [key: string]: unknown }
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
  bookingReference: string
  amount: number
  itemType: TravelItemType
}): Promise<WalletPaymentResult> {
  return apiRequest<WalletPaymentResult>('/wallet/debit', {
    method: 'POST',
    body: JSON.stringify({
      amount: data.amount,
      bookingReference: data.bookingReference,
      description: `Booking payment for ${data.itemType}`
    })
  })
}
