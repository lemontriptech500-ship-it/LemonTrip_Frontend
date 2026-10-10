export interface VisaService {
  id: string
  country: string
  visaType: string
  processingTime: string
  startingFrom: string
  documents?: string[]
}

export const mockVisaServices: VisaService[] = [
  {
    id: 'visa-1',
    country: 'United Kingdom',
    visaType: 'Standard Visitor Visa',
    processingTime: '15 to 30 working days',
    startingFrom: 'From INR 4,999',
    documents: ['Passport', 'Bank Statement', 'Travel Itinerary', 'Hotel Booking'],
  },
  {
    id: 'visa-2',
    country: 'France',
    visaType: 'Schengen Tourist Visa',
    processingTime: '15 working days',
    startingFrom: 'From INR 3,499',
    documents: ['Passport', 'Travel Insurance', 'Flight Booking', 'Bank Statement'],
  },
  {
    id: 'visa-3',
    country: 'Australia',
    visaType: 'Visitor Visa (Subclass 600)',
    processingTime: '20 to 35 working days',
    startingFrom: 'From INR 5,499',
    documents: ['Passport', 'Bank Statement', 'Employment Letter', 'Travel Plan'],
  },
  {
    id: 'visa-4',
    country: 'United States',
    visaType: 'B1/B2 Tourist Visa',
    processingTime: '3 to 6 weeks',
    startingFrom: 'From INR 14,999',
    documents: ['Passport', 'DS-160 Confirmation', 'Photo', 'Bank Statement'],
  },
  {
    id: 'visa-5',
    country: 'Singapore',
    visaType: 'Tourist Visa',
    processingTime: '5 to 7 working days',
    startingFrom: 'From INR 2,499',
    documents: ['Passport', 'Photo', 'Bank Statement', 'Flight Booking'],
  },
  {
    id: 'visa-6',
    country: 'Thailand',
    visaType: 'Tourist Visa on Arrival',
    processingTime: '1 to 2 working days',
    startingFrom: 'From INR 1,999',
    documents: ['Passport', 'Photo', 'Return Ticket', 'Hotel Booking'],
  },
]
