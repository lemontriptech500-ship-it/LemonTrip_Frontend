export function buildSearchUrl(pathname: string, formData: FormData): string {
  const params = new URLSearchParams()
  
  formData.forEach((value, key) => {
    if (typeof value === 'string' && value.trim() !== '') {
      params.append(key, value.trim())
    }
  })

  const queryString = params.toString()
  return queryString ? `${pathname}?${queryString}` : pathname
}

// ----------------------------------------------------------------------
// URL Parameter Parsers
// ----------------------------------------------------------------------

export function parseFlightSearchParams(searchParams: URLSearchParams) {
  return {
    tripType: searchParams.get('tripType') || 'roundtrip',
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    departureDate: searchParams.get('departureDate') || '',
    returnDate: searchParams.get('returnDate') || '',
    travelClass: searchParams.get('travelClass') || '',
  }
}

export function parseHotelSearchParams(searchParams: URLSearchParams) {
  return {
    destination: searchParams.get('destination') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    rooms: searchParams.get('rooms') || '1',
    adults: searchParams.get('adults') || '2',
    children: searchParams.get('children') || '0',
  }
}

export function parseBusSearchParams(searchParams: URLSearchParams) {
  return {
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    travelDate: searchParams.get('travelDate') || '',
  }
}

export function parseTrainSearchParams(searchParams: URLSearchParams) {
  return {
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    journeyDate: searchParams.get('journeyDate') || '',
    travelClass: searchParams.get('travelClass') || '',
  }
}

export function parsePackageSearchParams(searchParams: URLSearchParams) {
  return {
    destination: searchParams.get('destination') || '',
    travelMonth: searchParams.get('travelMonth') || '',
    travellers: searchParams.get('travellers') || '',
  }
}

export function parseVisaSearchParams(searchParams: URLSearchParams) {
  return {
    destinationCountry: searchParams.get('destinationCountry') || '',
    visaType: searchParams.get('visaType') || '',
  }
}
