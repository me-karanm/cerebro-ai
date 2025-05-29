
import { useState } from 'react';
import { Phone, Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IntegrationCard } from './IntegrationCard';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePhoneNumbers } from '@/hooks/usePhoneNumbers';

export const PhoneNumbersSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [purchaseCountry, setPurchaseCountry] = useState('us');
  const [purchaseType, setPurchaseType] = useState('local');
  const { toast } = useToast();
  const { phoneNumbers, isLoading, purchaseNumber, deleteNumber } = usePhoneNumbers();
  
  const handlePurchaseNumber = () => {
    purchaseNumber(purchaseCountry, purchaseType);
    setIsDialogOpen(false);
    toast({
      title: "Number purchase initiated",
      description: "Your phone number is being provisioned and will appear shortly.",
    });
  };

  const handleDeleteNumber = (numberId: string) => {
    if (confirm("Are you sure you want to release this number? This action cannot be undone.")) {
      deleteNumber(numberId);
      toast({
        title: "Number released",
        description: "The phone number has been released from your account.",
      });
    }
  };
  
  return (
    <IntegrationCard
      title="Phone Numbers"
      description="Purchase and manage phone numbers for voice and SMS communications."
      icon={Phone}
      footer={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" /> Purchase New Number
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">Purchase Phone Number</DialogTitle>
              <DialogDescription className="text-gray-400">
                Select the country and type of phone number you wish to purchase.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-white">Country</Label>
                <Select value={purchaseCountry} onValueChange={setPurchaseCountry}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Number Type</Label>
                <Select value={purchaseType} onValueChange={setPurchaseType}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="toll-free">Toll Free</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handlePurchaseNumber}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Purchase Number
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      {isLoading ? (
        <div className="py-6 text-center text-gray-400">Loading phone numbers...</div>
      ) : phoneNumbers.length === 0 ? (
        <div className="py-6 text-center text-gray-400">
          You don't have any phone numbers yet. Purchase a number to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Number</TableHead>
              <TableHead className="text-gray-400">Type</TableHead>
              <TableHead className="text-gray-400">Location</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-right text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phoneNumbers.map((number) => (
              <TableRow key={number.id} className="border-gray-800">
                <TableCell className="font-medium text-white">{number.number}</TableCell>
                <TableCell>{number.type}</TableCell>
                <TableCell>{number.location}</TableCell>
                <TableCell>
                  <Badge variant={number.status === 'active' ? 'success' : 'default'}>
                    {number.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-900/40 text-red-400 hover:bg-red-900/20 hover:text-red-300"
                      onClick={() => handleDeleteNumber(number.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </IntegrationCard>
  );
};
