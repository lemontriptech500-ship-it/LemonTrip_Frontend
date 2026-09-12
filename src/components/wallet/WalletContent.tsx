'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowDownLeft, ArrowUpRight, CheckCircle2, Loader2, Wallet as WalletIcon } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { useAuthStore } from '@/store/authStore'
import { createWalletTopupOrder, getWalletData, getWalletTransactions, verifyWalletTopup, type WalletData, type WalletTransaction } from '@/services/walletService'

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void }
  }
}

function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Razorpay Checkout could not load.'))
    document.body.appendChild(script)
  })
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount)
}

export default function WalletContent() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)
  const [wallet, setWallet] = useState<WalletData | null>(null)
  const [transactions, setTransactions] = useState<WalletTransaction[]>([])
  const [amount, setAmount] = useState('1000')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  async function refresh() {
    const [walletResult, transactionResult] = await Promise.all([getWalletData(), getWalletTransactions()])
    setWallet(walletResult)
    setTransactions(transactionResult.transactions)
  }

  useEffect(() => {
    if (hasHydrated && !user) {
      router.replace('/login?callbackUrl=%2Fwallet')
      return
    }
    if (!hasHydrated || !user) return
    refresh().catch((reason) => setError(reason instanceof Error ? reason.message : 'Unable to load your wallet.')).finally(() => setLoading(false))
  }, [hasHydrated, user, router])

  async function handleTopup() {
    setError('')
    setNotice('')
    const numericAmount = Number(amount)
    if (!Number.isFinite(numericAmount) || numericAmount < 100 || numericAmount > 100000) {
      setError('Enter an amount between INR 100 and INR 100,000.')
      return
    }
    setProcessing(true)
    try {
      await loadRazorpayScript()
      const order = await createWalletTopupOrder(numericAmount)
      if (!window.Razorpay) throw new Error('Razorpay Checkout is unavailable.')
      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'LemonTrip Wallet',
        description: 'Wallet top-up',
        order_id: order.orderId,
        prefill: { email: user?.email },
        theme: { color: '#ffd21a' },
        handler: async (payment: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          try {
            const result = await verifyWalletTopup({
              razorpayOrderId: payment.razorpay_order_id,
              razorpayPaymentId: payment.razorpay_payment_id,
              razorpaySignature: payment.razorpay_signature,
            })
            setNotice(`Wallet credited successfully. New balance: ${formatMoney(result.balance, result.currency)}`)
            await refresh()
          } catch (verificationError) {
            setError(verificationError instanceof Error ? verificationError.message : 'Payment verification failed.')
          } finally {
            setProcessing(false)
          }
        },
        modal: { ondismiss: () => setProcessing(false) },
      })
      checkout.open()
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Unable to start wallet top-up.')
      setProcessing(false)
    }
  }

  if (!hasHydrated || !user || loading) return <div className="section-gap min-h-[60vh]" aria-busy="true" />

  return (
    <div className="section-gap min-h-screen bg-[var(--color-background)]">
      <Container className="max-w-5xl">
        <div className="flex items-center gap-3">
          <div className="rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] p-3 text-[var(--color-primary)]"><WalletIcon size={26} /></div>
          <div><h1 className="text-h1">Wallet</h1><p className="text-sm text-[var(--color-text-secondary)]">Manage your LemonTrip balance and payments.</p></div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-6">
            <p className="text-sm text-[var(--color-text-secondary)]">Available balance</p>
            <p className="mt-2 text-4xl font-bold text-[var(--color-text-primary)]">{formatMoney(wallet?.balance || 0, wallet?.currency || 'INR')}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-[var(--color-text-muted)]">{wallet?.status || 'active'} wallet</p>
            <div className="mt-8 border-t border-[var(--color-border-light)] pt-6">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Add money
                <input value={amount} onChange={(event) => setAmount(event.target.value)} type="number" min="100" max="100000" className="mt-2 h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-[var(--color-text-primary)]" />
              </label>
              <Button className="mt-4 w-full" onClick={handleTopup} disabled={processing} icon={processing ? <Loader2 size={16} className="animate-spin" /> : undefined}>{processing ? 'Processing...' : 'Add Money with Razorpay'}</Button>
              <p className="mt-2 text-xs text-[var(--color-text-muted)]">Top-ups are limited to INR 100–100,000 per transaction.</p>
            </div>
            {error && <p className="mt-4 text-sm font-medium text-[var(--color-error)]" role="alert">{error}</p>}
            {notice && <p className="mt-4 flex items-center gap-2 text-sm font-medium text-[var(--color-success)]" role="status"><CheckCircle2 size={16} />{notice}</p>}
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between"><h2 className="text-h3">Transaction history</h2><span className="text-xs text-[var(--color-text-muted)]">{transactions.length} recent</span></div>
            {transactions.length === 0 ? <p className="mt-6 text-sm text-[var(--color-text-muted)]">No wallet transactions yet.</p> : <div className="mt-5 divide-y divide-[var(--color-border-light)]">{transactions.map((transaction) => <div key={transaction.id} className="flex items-center justify-between gap-4 py-4 first:pt-0"><div className="flex min-w-0 items-center gap-3"><div className={`rounded-full p-2 ${transaction.type === 'CREDIT' ? 'bg-[rgba(39,174,96,0.12)] text-[var(--color-success)]' : 'bg-[rgba(192,57,43,0.10)] text-[var(--color-error)]'}`}>{transaction.type === 'CREDIT' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}</div><div className="min-w-0"><p className="truncate font-medium text-[var(--color-text-primary)]">{transaction.description}</p><p className="text-xs text-[var(--color-text-muted)]">{new Date(transaction.date).toLocaleString('en-IN')} · {transaction.status}</p>{transaction.bookingReference && <p className="text-xs text-[var(--color-text-muted)]">{transaction.bookingReference}</p>}</div></div><p className={`shrink-0 font-semibold ${transaction.type === 'CREDIT' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>{transaction.type === 'CREDIT' ? '+' : '-'}{formatMoney(transaction.amount, wallet?.currency || 'INR')}</p></div>)}</div>}
          </Card>
        </div>
      </Container>
    </div>
  )
}
