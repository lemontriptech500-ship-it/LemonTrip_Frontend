import { apiRequest } from '@/lib/apiClient'

export interface WalletTransaction {
  id: string
  transactionReference: string
  type: 'CREDIT' | 'DEBIT'
  source: 'TOPUP' | 'BOOKING' | 'REFUND' | 'ADJUSTMENT'
  amount: number
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REVERSED'
  description: string
  bookingReference?: string
  paymentReference?: string
  date: string
}

export interface WalletData {
  id: string
  balance: number
  currency: string
  status: 'active' | 'suspended' | 'closed'
}

export interface WalletTopupOrder {
  orderId: string
  amount: number
  currency: string
  keyId: string
  topupId: string
  topupReference: string
}

export function getWalletData(): Promise<WalletData> {
  return apiRequest<WalletData>('/wallet')
}

export function createWalletTopupOrder(amount: number): Promise<WalletTopupOrder> {
  return apiRequest<WalletTopupOrder>('/wallet/topup/order', {
    method: 'POST',
    body: JSON.stringify({ amount }),
  })
}

export function verifyWalletTopup(data: {
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
}): Promise<{ status: string; balance: number; currency: string }> {
  return apiRequest('/wallet/topup/verify', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getWalletTransactions(params: { page?: number; limit?: number } = {}) {
  const query = new URLSearchParams({
    page: String(params.page || 1),
    limit: String(params.limit || 20),
  })
  return apiRequest<{ transactions: WalletTransaction[]; page: number; limit: number; total: number }>(`/wallet/transactions?${query}`)
}
