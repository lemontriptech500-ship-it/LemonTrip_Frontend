import type { Metadata } from 'next'
import WalletContent from '@/components/wallet/WalletContent'

export const metadata: Metadata = {
  title: 'Wallet',
  description: 'Manage your LemonTrip wallet balance and transactions.',
}

export default function WalletPage() {
  return <WalletContent />
}
