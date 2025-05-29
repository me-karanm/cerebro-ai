
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIntegrationsStore } from '@/store/integrationsStore';

interface PurchaseNumberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
];

const numberTypes = [
  { type: 'Local', price: '$5/month', description: 'Local area code numbers' },
  { type: 'Toll-Free', price: '$15/month', description: 'Toll-free numbers (800, 888, etc.)' },
  { type: 'International', price: '$25/month', description: 'International numbers' },
];

export const PurchaseNumberModal = ({ open, onOpenChange }: PurchaseNumberModalProps) => {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedType, setSelectedType] = useState('Local');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addPhoneNumber } = useIntegrationsStore();

  const selectedTypeInfo = numberTypes.find(t => t.type === selectedType);

  const handlePurchase = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add the purchased number(s)
      for (let i = 0; i < quantity; i++) {
        const country = countries.find(c => c.code === selectedCountry);
        const randomNumber = selectedType === 'Toll-Free' 
          ? `+1 (800) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`
          : `+1 (555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
        
        addPhoneNumber({
          number: randomNumber,
          type: selectedType as 'Local' | 'Toll-Free' | 'International',
          location: `${country?.name || 'Unknown'}`,
          status: 'active'
        });
      }
      
      onOpenChange(false);
      setSelectedCountry('US');
      setSelectedType('Local');
      setQuantity(1);
    } catch (error) {
      console.error('Failed to purchase number:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Purchase Phone Number
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Country Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Country/Region
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country.code)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedCountry === country.code
                      ? 'border-purple-500 bg-purple-600/20'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{country.flag}</span>
                    <span className="text-white">{country.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Number Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number Type
            </label>
            <div className="space-y-2">
              {numberTypes.map((type) => (
                <button
                  key={type.type}
                  onClick={() => setSelectedType(type.type)}
                  className={`w-full p-4 rounded-lg border text-left transition-colors ${
                    selectedType === type.type
                      ? 'border-purple-500 bg-purple-600/20'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{type.type}</div>
                      <div className="text-gray-400 text-sm">{type.description}</div>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      {type.price}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Pricing Summary */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h4 className="text-lg font-medium text-white mb-2">Order Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>{selectedType} Numbers × {quantity}</span>
                <span>{selectedTypeInfo?.price}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Setup Fee</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-700 pt-2 flex justify-between text-white font-medium">
                <span>Monthly Total</span>
                <span>{selectedTypeInfo?.price}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePurchase}
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isSubmitting ? 'Purchasing...' : 'Purchase Numbers'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
