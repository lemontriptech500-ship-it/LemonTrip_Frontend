import { useState, useCallback, useEffect } from 'react';
import { Traveller, ContactInformation, TravellerType } from '@/types/booking';

interface UseTravellerFormProps {
  adultCount: number;
  childCount: number;
  infantCount: number;
  flightId: string;
}

export function useTravellerForm({ adultCount, childCount, infantCount, flightId }: UseTravellerFormProps) {
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [contact, setContact] = useState<ContactInformation>({
    email: '',
    phoneCode: '+1',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<{
    travellers: Record<string, Partial<Record<keyof Traveller, string>>>;
    contact: Partial<Record<keyof ContactInformation, string>>;
  }>({
    travellers: {},
    contact: {},
  });

  // Initialize or restore state
  useEffect(() => {
    // Attempt to restore from session storage
    const saved = sessionStorage.getItem(`bookingData_${flightId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTravellers(parsed.travellers || []);
        setContact(parsed.contact || { email: '', phoneCode: '+1', phoneNumber: '' });
        return;
      } catch (e) {
        console.error("Failed to parse saved booking data", e);
      }
    }

    // Initialize forms based on counts
    const initialTravellers: Traveller[] = [];
    let idCounter = 1;

    const addTravellerType = (count: number, type: TravellerType) => {
      for (let i = 0; i < count; i++) {
        initialTravellers.push({
          id: `t_${idCounter++}`,
          type,
          title: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          gender: '',
        });
      }
    };

    addTravellerType(adultCount, 'adult');
    addTravellerType(childCount, 'child');
    addTravellerType(infantCount, 'infant');

    setTravellers(initialTravellers);
  }, [adultCount, childCount, infantCount, flightId]);

  const updateTraveller = useCallback((id: string, field: keyof Traveller, value: string) => {
    setTravellers(prev => prev.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
    // Clear error for the field
    setErrors(prev => ({
      ...prev,
      travellers: {
        ...prev.travellers,
        [id]: {
          ...prev.travellers[id],
          [field]: undefined,
        }
      }
    }));
  }, []);

  const updateContact = useCallback((field: keyof ContactInformation, value: string) => {
    setContact(prev => ({ ...prev, [field]: value }));
    // Clear error for the field
    setErrors(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: undefined }
    }));
  }, []);

  const validate = useCallback(() => {
    let isValid = true;
    const newErrors = {
      travellers: {} as Record<string, Partial<Record<keyof Traveller, string>>>,
      contact: {} as Partial<Record<keyof ContactInformation, string>>,
    };

    const todayStr = new Date().toISOString().split('T')[0];

    // Validate travellers
    travellers.forEach(t => {
      const tErrors: Partial<Record<keyof Traveller, string>> = {};
      
      if (!t.title) tErrors.title = 'Required';
      if (!t.firstName.trim()) tErrors.firstName = 'Required';
      if (!t.lastName.trim()) tErrors.lastName = 'Required';
      if (!t.gender) tErrors.gender = 'Required';
      
      if (!t.dateOfBirth) {
        tErrors.dateOfBirth = 'Required';
      } else if (t.dateOfBirth > todayStr) {
        tErrors.dateOfBirth = 'Cannot be in future';
      }
      // Note: Can add more specific age validation for infant/child based on current date if needed.

      if (Object.keys(tErrors).length > 0) {
        isValid = false;
        newErrors.travellers[t.id] = tErrors;
      }
    });

    // Validate contact
    if (!contact.email.trim()) {
      newErrors.contact.email = 'Required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      newErrors.contact.email = 'Invalid email';
      isValid = false;
    }

    if (!contact.phoneCode.trim()) {
      newErrors.contact.phoneCode = 'Required';
      isValid = false;
    }
    if (!contact.phoneNumber.trim()) {
      newErrors.contact.phoneNumber = 'Required';
      isValid = false;
    } else if (!/^\d{5,15}$/.test(contact.phoneNumber.replace(/[\s-]/g, ''))) {
      newErrors.contact.phoneNumber = 'Invalid phone';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [travellers, contact]);

  // Expose a method to save to sessionStorage
  const saveToSession = useCallback(() => {
    sessionStorage.setItem(`bookingData_${flightId}`, JSON.stringify({ travellers, contact }));
  }, [flightId, travellers, contact]);

  return {
    travellers,
    contact,
    errors,
    updateTraveller,
    updateContact,
    validate,
    saveToSession
  };
}
