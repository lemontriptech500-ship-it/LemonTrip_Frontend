export interface Coupon {
  id: string
  code: string
  discount: number
  discountType: 'percentage' | 'flat'
  minOrder: number
  maxDiscount: number
  validTill: string
  applicableOn: string[]
  description: string
}

const MOCK_COUPONS: Coupon[] = [
  {
    id: 'c1',
    code: 'FIRST10',
    discount: 10,
    discountType: 'percentage',
    minOrder: 1000,
    maxDiscount: 500,
    validTill: '2026-12-31',
    applicableOn: ['flights', 'hotels', 'bus', 'trains', 'packages'],
    description: 'Get 10% off on your first booking',
  },
  {
    id: 'c2',
    code: 'FLY500',
    discount: 500,
    discountType: 'flat',
    minOrder: 3000,
    maxDiscount: 500,
    validTill: '2026-11-30',
    applicableOn: ['flights'],
    description: 'Flat ₹500 off on flights',
  },
  {
    id: 'c3',
    code: 'HOLIDAY20',
    discount: 20,
    discountType: 'percentage',
    minOrder: 5000,
    maxDiscount: 2000,
    validTill: '2026-10-31',
    applicableOn: ['packages'],
    description: '20% off on holiday packages',
  },
  {
    id: 'c4',
    code: 'VISA100',
    discount: 100,
    discountType: 'flat',
    minOrder: 500,
    maxDiscount: 100,
    validTill: '2026-12-31',
    applicableOn: ['visa'],
    description: '₹100 off on visa services',
  },
]

export interface CouponValidationResult {
  valid: boolean
  coupon?: Coupon
  error?: string
  discountAmount?: number
}

export async function validateCoupon(
  code: string,
  orderAmount: number,
  serviceType: string
): Promise<CouponValidationResult> {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1'}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, serviceType, orderAmount }),
    })
    const payload = await result.json()
    if (!result.ok) return { valid: false, error: payload?.error?.message || 'Unable to validate coupon' }
    return payload.data
  } catch {
    return { valid: false, error: 'Unable to validate coupon' }
  }
}

export async function getAvailableCoupons(serviceType?: string): Promise<Coupon[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (serviceType) {
    return MOCK_COUPONS.filter((c) => c.applicableOn.includes(serviceType))
  }
  return MOCK_COUPONS
}
