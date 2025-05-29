
import { useState } from 'react';
import { Plus, Search, Phone, MapPin, User, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useIntegrationsStore } from '@/store/integrationsStore';

interface PhoneNumbersTabProps {
  onPurchaseNumber: () => void;
}

export const PhoneNumbersTab = ({ onPurchaseNumber }: PhoneNumbersTabProps) => {
  const { phoneNumbers } = useIntegrationsStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNumbers = phoneNumbers.filter(number =>
    number.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    number.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600 text-white">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Local':
        return <Badge variant="outline" className="border-blue-500 text-blue-400">Local</Badge>;
      case 'Toll-Free':
        return <Badge variant="outline" className="border-green-500 text-green-400">Toll-Free</Badge>;
      case 'International':
        return <Badge variant="outline" className="border-purple-500 text-purple-400">International</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search phone numbers..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          onClick={onPurchaseNumber}
        >
          <Plus className="w-4 h-4 mr-2" />
          Purchase New Number
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Total Numbers</p>
                <p className="text-xl font-bold text-white">{phoneNumbers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-400">Active</p>
                <p className="text-xl font-bold text-white">{phoneNumbers.filter(n => n.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Countries</p>
                <p className="text-xl font-bold text-white">{new Set(phoneNumbers.map(n => n.location.split(',').pop()?.trim())).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Monthly Cost</p>
                <p className="text-xl font-bold text-white">$45</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phone Numbers Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Phone Numbers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Number</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Location</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Monthly Cost</TableHead>
                <TableHead className="text-gray-300">Assigned Agent</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNumbers.map((number) => (
                <TableRow key={number.id} className="border-gray-700 hover:bg-gray-750">
                  <TableCell className="text-white font-mono">{number.number}</TableCell>
                  <TableCell>{getTypeBadge(number.type)}</TableCell>
                  <TableCell className="text-gray-300">{number.location}</TableCell>
                  <TableCell>{getStatusBadge(number.status)}</TableCell>
                  <TableCell className="text-gray-300">$15/mo</TableCell>
                  <TableCell className="text-gray-300">
                    {number.status === 'active' ? 'Support Agent' : 'Unassigned'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        Configure
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                        Assign
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
