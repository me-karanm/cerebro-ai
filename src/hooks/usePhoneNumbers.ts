
import { useState, useEffect } from 'react';

interface PhoneNumber {
  id: string;
  number: string;
  type: string;
  location: string;
  status: 'active' | 'pending';
  createdAt: string;
}

// Mock data - in a real app, this would come from an API
const mockPhoneNumbers: PhoneNumber[] = [
  { id: '1', number: '+1 (555) 123-4567', type: 'Local', location: 'New York, NY', status: 'active', createdAt: '2023-05-01' },
  { id: '2', number: '+1 (555) 987-6543', type: 'Toll-Free', location: 'US National', status: 'active', createdAt: '2023-06-15' },
  { id: '3', number: '+44 20 7946 0958', type: 'Local', location: 'London, UK', status: 'active', createdAt: '2023-07-22' }
];

export function usePhoneNumbers() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadNumbers = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      setPhoneNumbers(mockPhoneNumbers);
      setIsLoading(false);
    };

    loadNumbers();
  }, []);

  const purchaseNumber = async (country: string, type: string) => {
    setIsLoading(true);
    
    // Simulate API call to purchase number
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const countryMap: Record<string, string> = {
      'us': 'United States',
      'uk': 'United Kingdom',
      'ca': 'Canada',
      'au': 'Australia'
    };
    
    const newNumber: PhoneNumber = {
      id: Math.random().toString(36).substring(2, 9),
      number: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      type: type === 'toll-free' ? 'Toll-Free' : type === 'mobile' ? 'Mobile' : 'Local',
      location: type === 'toll-free' ? 'US National' : `${countryMap[country] || country}`,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setPhoneNumbers([...phoneNumbers, newNumber]);
    setIsLoading(false);
    return newNumber;
  };

  const deleteNumber = async (numberId: string) => {
    setIsLoading(true);
    
    // Simulate API call to delete number
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setPhoneNumbers(phoneNumbers.filter(number => number.id !== numberId));
    setIsLoading(false);
  };

  return {
    phoneNumbers,
    isLoading,
    purchaseNumber,
    deleteNumber
  };
}
