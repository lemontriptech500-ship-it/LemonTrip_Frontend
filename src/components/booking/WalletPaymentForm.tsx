'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle2, Wallet } from 'lucide-react'
import { Alert } from '@/components/ui'
import { getWalletData } from '@/services/walletService'

interface WalletPaymentFormProps {
  amount: number
  currency?: string
  isLoading?: boolean
  error?: string | null
}

export function WalletPaymentForm({ amount, currency = 'INR', isLoading = false, error }: WalletPaymentFormProps) {
  const [walletBalance, setWalletBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const wallet = await getWalletData()
        setWalletBalance(wallet.balance)
      } catch (err) {
        setFetchError(err instanceof Error ? err.message : 'Failed to load wallet balance')
      } finally {
        setLoading(false)
      }
    }
    fetchWallet()
  }, [])

  const hasInsufficientBalance = walletBalance !== null && walletBalance < amount
  const canProceed = walletBalance !== null && walletBalance >= amount && !isLoading
  const balanceAfter = walletBalance !== null ? walletBalance - amount : 0

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6">
      <div className="flex items-center gap-3 mb-4">
        <Wallet className="text-[var(--color-primary)]" size={24} />
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Pay with Wallet</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">Use your LemonTrip wallet balance</p>
        </div>
      </div>

      {fetchError && (
        <Alert variant="error" title="Wallet Error" className="mb-4">
          {fetchError}
        </Alert>
      )}

      {error && (
        <Alert variant="error" title="Payment Error" className="mb-4">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-12 bg-[var(--color-border)] rounded-[var(--radius-md)]" />
          <div className="h-12 bg-[var(--color-border)] rounded-[var(--radius-md)]" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[var(--color-background)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border)]">
              <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-1">Current Balance</p>
              <p className="text-2xl font-bold text-[var(--color-primary)]">
                {currency} {walletBalance?.toFixed(2) ?? '–'}
              </p>
            </div>

            <div className="bg-[var(--color-background)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border)]">
              <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-1">Amount to Pay</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {currency} {amount.toFixed(2)}
              </p>
            </div>
          </div>

          {hasInsufficientBalance && (
            <Alert variant="error" className="flex items-start gap-3">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Insufficient Balance</p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  You need {currency} {(amount - (walletBalance || 0)).toFixed(2)} more to complete this booking.
                </p>
              </div>
            </Alert>
          )}

          {!hasInsufficientBalance && walletBalance !== null && (
            <Alert variant="success" className="flex items-start gap-3">
              <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Ready to Pay</p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  After payment, your balance will be {currency} {balanceAfter.toFixed(2)}.
                </p>
              </div>
            </Alert>
          )}

          <div className="bg-[var(--color-primary)]/10 rounded-[var(--radius-md)] p-3 text-sm text-[var(--color-text-secondary)]">
            💡 This payment will be instantly deducted from your wallet balance and your booking will be confirmed immediately.
          </div>
        </div>
      )}
    </div>
  )
}
