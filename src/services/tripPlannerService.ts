import { apiRequest } from '@/lib/apiClient'

export interface TripPreferences {
  destination: string
  startingCity: string
  departureDate: string
  returnDate: string
  duration: number
  travellers: number
  budget: number
  style: string
  interests: string
  request: string
}
export const costCategories = ['accommodation', 'transport', 'food', 'activities', 'other'] as const
export type CostCategory = typeof costCategories[number]
export interface PlannerDay {
  day: number
  title: string
  morning: string
  afternoon: string
  evening: string
  attractions: string[]
  costs: Record<CostCategory, { amount: number | null; basis: string }>
}
export interface PlannerItinerary { destination: string; overview: string; tips: string[]; days: PlannerDay[] }
export interface PlannerPackage {
  id: string; destination: string; location: string | null; duration: string; description: string
  imageUrl: string | null; priceAmount: number | null; startingPrice: string | null; currency: string
}
export interface TripPlan {
  preferences: TripPreferences
  itinerary: PlannerItinerary
  budget: { currency: string; categories: Record<CostCategory, number | null>; knownSubtotal: number; total: number | null; perPerson: number | null; remaining: number | null; disclaimer: string }
  packages: PlannerPackage[]
  packageStatus: 'available' | 'unavailable'
}
export function generateTrip(preferences: TripPreferences, previous?: TripPlan, dayNumber?: number) {
  return apiRequest<TripPlan>('/trip-planner', {
    method: 'POST', body: JSON.stringify({ preferences, ...(dayNumber ? { dayNumber, itinerary: previous?.itinerary } : {}) }),
    signal: AbortSignal.timeout(115000), suppressErrorLog: true,
  })
}

export function itineraryText(plan: TripPlan) {
  const money = (amount: number | null) => amount === null ? 'Unavailable' : `INR ${amount.toLocaleString('en-IN')}`
  return [
    `LemonTrip AI — ${plan.itinerary.destination}`, plan.itinerary.overview,
    `${plan.preferences.duration} days · ${plan.preferences.travellers} travellers · Budget ${money(plan.preferences.budget)}`,
    plan.preferences.departureDate ? `${plan.preferences.departureDate} to ${plan.preferences.returnDate}` : 'Dates flexible',
    ...plan.itinerary.days.map((day) => `\nDay ${day.day}: ${day.title}\nMorning: ${day.morning}\nAfternoon: ${day.afternoon}\nEvening: ${day.evening}\nAttractions: ${day.attractions.join(', ')}\n${costCategories.map((key) => `${key}: ${money(day.costs[key].amount)} — ${day.costs[key].basis}`).join('\n')}`),
    '\nEstimated budget', ...costCategories.map((key) => `${key}: ${money(plan.budget.categories[key])}`),
    `Total: ${money(plan.budget.total)}; per traveller: ${money(plan.budget.perPerson)}; remaining: ${money(plan.budget.remaining)}`,
    `Known subtotal: ${money(plan.budget.knownSubtotal)}`, plan.budget.disclaimer,
    '\nTravel tips', ...plan.itinerary.tips,
    '\nCatalogue recommendations (confirm price basis and availability with LemonTrip)',
    ...plan.packages.map((pkg) => `${pkg.destination} · ${pkg.duration} · ${pkg.priceAmount ? `${pkg.currency} ${pkg.priceAmount.toLocaleString('en-IN')}` : pkg.startingPrice || 'Price on enquiry'}\n${typeof window !== 'undefined' ? window.location.origin : ''}/packages/${encodeURIComponent(pkg.id)}`),
  ].join('\n')
}
