import type { Metadata } from 'next'
import { TripPlanner } from '@/components/planner/TripPlanner'

export const metadata: Metadata = {
  title: 'LemonTrip AI — Smart Trip Planner',
  description: 'Plan a personalised holiday with LemonTrip AI. Explore day-by-day itineraries, transparent budget estimates and real LemonTrip packages.',
}
export default function TripPlannerPage() { return <TripPlanner /> }
