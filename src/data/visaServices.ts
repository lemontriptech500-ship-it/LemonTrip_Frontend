export interface VisaService {
  id: string
  country: string
  visaType: string
  processingTime: string
  startingFrom: string
  imageUrl: string
}

export const mockVisaServices: VisaService[] = [
  { id: 'visa-1', country: 'United Kingdom', visaType: 'Standard Visitor Visa', processingTime: '15 to 30 working days', startingFrom: 'From INR 4,999', imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=85' },
  { id: 'visa-2', country: 'France', visaType: 'Schengen Tourist Visa', processingTime: '15 working days', startingFrom: 'From INR 3,499', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=85' },
  { id: 'visa-3', country: 'Australia', visaType: 'Visitor Visa', processingTime: '20 to 35 working days', startingFrom: 'From INR 5,499', imageUrl: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=900&q=85' },
]
