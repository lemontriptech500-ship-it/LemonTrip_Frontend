import { useState, useMemo } from 'react';
import { Flight, FlightFiltersState, SortOption } from '@/types/flights';

export function useFlightFilters(initialFlights: Flight[]) {
  const [filters, setFilters] = useState<FlightFiltersState>({
    stops: [],
    airlines: [],
    departureTime: [],
    priceRange: [0, 20000],
    refundable: null,
  });

  const [sortOption, setSortOption] = useState<SortOption>('recommended');

  const filteredFlights = useMemo(() => {
    return initialFlights.filter(flight => {
      if (filters.stops.length > 0 && !filters.stops.includes(flight.stops >= 2 ? 2 : flight.stops)) return false;
      if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) return false;
      if (filters.refundable !== null && flight.refundable !== filters.refundable) return false;
      if (flight.price < filters.priceRange[0] || flight.price > filters.priceRange[1]) return false;
      
      if (filters.departureTime.length > 0) {
        const hour = new Date(flight.departureTime).getHours();
        let timeCategory = '';
        if (hour >= 0 && hour < 6) timeCategory = 'early_morning';
        else if (hour >= 6 && hour < 12) timeCategory = 'morning';
        else if (hour >= 12 && hour < 18) timeCategory = 'afternoon';
        else timeCategory = 'evening';
        
        if (!filters.departureTime.includes(timeCategory)) return false;
      }
      
      return true;
    });
  }, [initialFlights, filters]);

  const sortedFlights = useMemo(() => {
    return [...filteredFlights].sort((a, b) => {
      switch (sortOption) {
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'duration_asc': return a.durationMinutes - b.durationMinutes;
        case 'departure_asc': return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
        case 'departure_desc': return new Date(b.departureTime).getTime() - new Date(a.departureTime).getTime();
        case 'recommended':
        default:
          return 0; // Mock recommendation, preserve original order
      }
    });
  }, [filteredFlights, sortOption]);

  const updateFilter = <K extends keyof FlightFiltersState>(key: K, value: FlightFiltersState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      stops: [],
      airlines: [],
      departureTime: [],
      priceRange: [0, 20000],
      refundable: null,
    });
  };

  return {
    filters,
    updateFilter,
    resetFilters,
    sortOption,
    setSortOption,
    results: sortedFlights,
    totalResults: initialFlights.length,
    filteredCount: sortedFlights.length,
  };
}
