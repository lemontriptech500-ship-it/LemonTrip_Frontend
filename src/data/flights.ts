import { Flight, FareOption, FlightSegment } from '@/types/flights'

const createDate = (daysAhead: number, hours: number, minutes: number) => {
  const d = new Date()
  d.setDate(d.getDate() + daysAhead)
  d.setHours(hours, minutes, 0, 0)
  return d.toISOString()
}

const generateFares = (basePrice: number, baseClass: string): FareOption[] => {
  return [
    {
      id: 'saver',
      name: 'Saver',
      price: basePrice,
      currency: 'INR',
      cabinClass: baseClass,
      refundable: false,
      baggageAllowance: '15kg Check-in, 7kg Cabin',
      cancellationPolicy: 'Non-refundable. Cancellation fee applies.',
      changePolicy: 'Change fee applies. Fare difference applicable.',
      benefits: ['Standard seat', 'Web check-in required']
    },
    {
      id: 'flex',
      name: 'Flex',
      price: basePrice + 1200,
      currency: 'INR',
      cabinClass: baseClass,
      refundable: true,
      baggageAllowance: '15kg Check-in, 7kg Cabin',
      cancellationPolicy: 'Refundable with nominal cancellation fee.',
      changePolicy: 'No change fee. Fare difference applicable.',
      benefits: ['Free seat selection', 'Complimentary meal', 'Priority boarding']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: basePrice + 3500,
      currency: 'INR',
      cabinClass: baseClass,
      refundable: true,
      baggageAllowance: '25kg Check-in, 10kg Cabin',
      cancellationPolicy: 'Fully refundable.',
      changePolicy: 'Free date change.',
      benefits: ['Premium seating', 'Hot meal included', 'Extra baggage', 'Lounge access where available']
    }
  ]
}

const rawFlights: Partial<Flight>[] = [
  {
    id: 'f1',
    airline: 'IndiGo',
    airlineCode: '6E',
    flightNumber: '6E-201',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: createDate(1, 6, 30),
    arrivalTime: createDate(1, 8, 45),
    durationMinutes: 135,
    stops: 0,
    price: 4500,
    currency: 'INR',
    travelClass: 'economy',
    refundable: false,
    baggageAllowance: '15kg Check-in, 7kg Cabin'
  },
  {
    id: 'f2',
    airline: 'Air India',
    airlineCode: 'AI',
    flightNumber: 'AI-101',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: createDate(1, 7, 0),
    arrivalTime: createDate(1, 9, 15),
    durationMinutes: 135,
    stops: 0,
    price: 5200,
    currency: 'INR',
    travelClass: 'economy',
    refundable: true,
    baggageAllowance: '20kg Check-in, 7kg Cabin'
  },
  {
    id: 'f3',
    airline: 'Vistara',
    airlineCode: 'UK',
    flightNumber: 'UK-994',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: createDate(1, 10, 0),
    arrivalTime: createDate(1, 12, 10),
    durationMinutes: 130,
    stops: 0,
    price: 6100,
    currency: 'INR',
    travelClass: 'economy',
    refundable: true,
    baggageAllowance: '15kg Check-in, 7kg Cabin'
  },
  {
    id: 'f4',
    airline: 'SpiceJet',
    airlineCode: 'SG',
    flightNumber: 'SG-819',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: createDate(1, 15, 45),
    arrivalTime: createDate(1, 19, 30),
    durationMinutes: 225,
    stops: 1,
    stopLocations: ['AMD'],
    price: 3800,
    currency: 'INR',
    travelClass: 'economy',
    refundable: false,
    baggageAllowance: '15kg Check-in, 7kg Cabin',
    segments: [
      {
        origin: 'DEL',
        destination: 'AMD',
        departureTime: createDate(1, 15, 45),
        arrivalTime: createDate(1, 17, 15),
        durationMinutes: 90,
        flightNumber: 'SG-819',
        airline: 'SpiceJet',
        airlineCode: 'SG'
      },
      {
        origin: 'AMD',
        destination: 'BOM',
        departureTime: createDate(1, 18, 15),
        arrivalTime: createDate(1, 19, 30),
        durationMinutes: 75,
        flightNumber: 'SG-820',
        airline: 'SpiceJet',
        airlineCode: 'SG'
      }
    ]
  },
  {
    id: 'f5',
    airline: 'Vistara',
    airlineCode: 'UK',
    flightNumber: 'UK-899',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: createDate(1, 18, 30),
    arrivalTime: createDate(1, 20, 45),
    durationMinutes: 135,
    stops: 0,
    price: 12500,
    currency: 'INR',
    travelClass: 'business',
    refundable: true,
    baggageAllowance: '30kg Check-in, 12kg Cabin'
  },
  {
    id: 'f6',
    airline: 'Air India',
    airlineCode: 'AI',
    flightNumber: 'AI-404',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: createDate(1, 22, 15),
    arrivalTime: createDate(2, 0, 30),
    durationMinutes: 135,
    stops: 0,
    price: 4900,
    currency: 'INR',
    travelClass: 'economy',
    refundable: false,
    baggageAllowance: '20kg Check-in, 7kg Cabin'
  },
  {
    id: 'f7',
    airline: 'Akasa Air',
    airlineCode: 'QP',
    flightNumber: 'QP-1120',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: createDate(1, 9, 30),
    arrivalTime: createDate(1, 11, 40),
    durationMinutes: 130,
    stops: 0,
    price: 4200,
    currency: 'INR',
    travelClass: 'economy',
    refundable: true,
    baggageAllowance: '15kg Check-in, 7kg Cabin'
  },
  {
    id: 'f8',
    airline: 'IndiGo',
    airlineCode: '6E',
    flightNumber: '6E-455',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: createDate(1, 13, 10),
    arrivalTime: createDate(1, 18, 50),
    durationMinutes: 340,
    stops: 1,
    stopLocations: ['JAI'],
    price: 4100,
    currency: 'INR',
    travelClass: 'economy',
    refundable: false,
    baggageAllowance: '15kg Check-in, 7kg Cabin',
    segments: [
      {
        origin: 'DEL',
        destination: 'JAI',
        departureTime: createDate(1, 13, 10),
        arrivalTime: createDate(1, 14, 10),
        durationMinutes: 60,
        flightNumber: '6E-455',
        airline: 'IndiGo',
        airlineCode: '6E'
      },
      {
        origin: 'JAI',
        destination: 'BOM',
        departureTime: createDate(1, 16, 50),
        arrivalTime: createDate(1, 18, 50),
        durationMinutes: 120,
        flightNumber: '6E-456',
        airline: 'IndiGo',
        airlineCode: '6E'
      }
    ]
  },
  {
    id: 'f9',
    airline: 'Air India',
    airlineCode: 'AI',
    flightNumber: 'AI-888',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: createDate(1, 5, 0),
    arrivalTime: createDate(1, 7, 10),
    durationMinutes: 130,
    stops: 0,
    price: 5500,
    currency: 'INR',
    travelClass: 'economy',
    refundable: true,
    baggageAllowance: '20kg Check-in, 7kg Cabin'
  },
  {
    id: 'f10',
    airline: 'Vistara',
    airlineCode: 'UK',
    flightNumber: 'UK-902',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: createDate(1, 8, 30),
    arrivalTime: createDate(1, 10, 45),
    durationMinutes: 135,
    stops: 0,
    price: 6800,
    currency: 'INR',
    travelClass: 'economy',
    refundable: true,
    baggageAllowance: '15kg Check-in, 7kg Cabin'
  },
  {
    id: 'f11',
    airline: 'IndiGo',
    airlineCode: '6E',
    flightNumber: '6E-771',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: createDate(1, 20, 0),
    arrivalTime: createDate(1, 23, 45),
    durationMinutes: 225,
    stops: 1,
    stopLocations: ['GOI'],
    price: 3900,
    currency: 'INR',
    travelClass: 'economy',
    refundable: false,
    baggageAllowance: '15kg Check-in, 7kg Cabin',
    segments: [
      {
        origin: 'DEL',
        destination: 'GOI',
        departureTime: createDate(1, 20, 0),
        arrivalTime: createDate(1, 22, 10),
        durationMinutes: 130,
        flightNumber: '6E-771',
        airline: 'IndiGo',
        airlineCode: '6E'
      },
      {
        origin: 'GOI',
        destination: 'BOM',
        departureTime: createDate(1, 22, 50),
        arrivalTime: createDate(1, 23, 45),
        durationMinutes: 55,
        flightNumber: '6E-772',
        airline: 'IndiGo',
        airlineCode: '6E'
      }
    ]
  },
  {
    id: 'f12',
    airline: 'Air India Express',
    airlineCode: 'IX',
    flightNumber: 'IX-221',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: createDate(1, 14, 20),
    arrivalTime: createDate(1, 16, 40),
    durationMinutes: 140,
    stops: 0,
    price: 4300,
    currency: 'INR',
    travelClass: 'economy',
    refundable: false,
    baggageAllowance: '15kg Check-in, 7kg Cabin'
  }
];

export const MOCK_FLIGHTS: Flight[] = rawFlights.map(f => {
  const flight = f as Flight;
  flight.fareOptions = generateFares(flight.price, flight.travelClass);
  // Auto-generate segments for non-stop flights
  if (flight.stops === 0 && !flight.segments) {
    flight.segments = [{
      origin: flight.origin,
      destination: flight.destination,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      durationMinutes: flight.durationMinutes,
      flightNumber: flight.flightNumber,
      airline: flight.airline,
      airlineCode: flight.airlineCode
    }];
  }
  return flight;
});
