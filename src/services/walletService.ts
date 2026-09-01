export interface WalletTransaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  date: string
  bookingId?: string
}

export interface WalletData {
  balance: number
  cashback: number
  refundCredits: number
  transactions: WalletTransaction[]
}

const MOCK_WALLET: WalletData = {
  balance: 2500,
  cashback: 350,
  refundCredits: 0,
  transactions: [
    {
      id: 't1',
      type: 'credit',
      amount: 500,
      description: 'Cashback on flight booking LT-FL-ABC123',
      date: '2026-08-20',
      bookingId: 'LT-FL-ABC123',
    },
    {
      id: 't2',
      type: 'debit',
      amount: 4500,
      description: 'Flight booking payment',
      date: '2026-08-18',
      bookingId: 'LT-FL-ABC123',
    },
    {
      id: 't3',
      type: 'credit',
      amount: 2000,
      description: 'Refund for cancelled booking LT-FL-XYZ789',
      date: '2026-08-15',
      bookingId: 'LT-FL-XYZ789',
    },
    {
      id: 't4',
      type: 'debit',
      amount: 8200,
      description: 'Hotel booking payment',
      date: '2026-08-10',
      bookingId: 'LT-HT-DEF456',
    },
    {
      id: 't5',
      type: 'credit',
      amount: 150,
      description: 'Cashback on hotel booking',
      date: '2026-08-10',
      bookingId: 'LT-HT-DEF456',
    },
  ],
}

export async function getWalletData(): Promise<WalletData> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return MOCK_WALLET
}

export async function useWalletBalance(
  amount: number
): Promise<{ success: boolean; usedAmount: number; remainingBalance: number }> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const available = MOCK_WALLET.balance + MOCK_WALLET.cashback
  const usedAmount = Math.min(amount, available)
  const remainingBalance = available - usedAmount

  return { success: true, usedAmount, remainingBalance }
}

export async function addToWallet(data: {
  amount: number
  type: 'cashback' | 'refund'
  description: string
  bookingId?: string
}): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const transaction: WalletTransaction = {
    id: `t${Date.now()}`,
    type: 'credit',
    amount: data.amount,
    description: data.description,
    date: new Date().toISOString().split('T')[0],
    bookingId: data.bookingId,
  }

  MOCK_WALLET.transactions.unshift(transaction)

  if (data.type === 'cashback') {
    MOCK_WALLET.cashback += data.amount
  } else {
    MOCK_WALLET.refundCredits += data.amount
  }
  MOCK_WALLET.balance += data.amount

  return { success: true }
}
