export interface BusOption {
  id: string
  operator: string
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  busType: string
  price: string
  seatsLeft: number
}

export const mockBuses: BusOption[] = [
  { id: 'bus-1', operator: 'LemonLine Express', from: 'Delhi', to: 'Jaipur', departure: '06:30', arrival: '11:15', duration: '4h 45m', busType: 'Volvo AC Sleeper', price: 'From INR 899', seatsLeft: 8 },
  { id: 'bus-2', operator: 'CityRide', from: 'Mumbai', to: 'Pune', departure: '08:00', arrival: '11:30', duration: '3h 30m', busType: 'AC Seater', price: 'From INR 549', seatsLeft: 14 },
  { id: 'bus-3', operator: 'Coastal Connect', from: 'Bengaluru', to: 'Goa', departure: '21:15', arrival: '07:00', duration: '9h 45m', busType: 'Premium Sleeper', price: 'From INR 1,299', seatsLeft: 5 },
]
