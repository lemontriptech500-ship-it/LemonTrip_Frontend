// src/types/booking.ts

export type TravellerType = 'adult' | 'child' | 'infant';

export interface Traveller {
  id: string; // unique identifier for the form item
  type: TravellerType;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: string;
}

export interface ContactInformation {
  email: string;
  phoneCode: string;
  phoneNumber: string;
}

export interface BookingTravellerData {
  flightId: string;
  fareId: string;
  travellers: Traveller[];
  contact: ContactInformation;
}
