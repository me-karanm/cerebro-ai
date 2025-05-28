
import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PhoneNumber {
  id: string;
  number: string;
  tag: string;
  status: 'verified' | 'pending' | 'failed';
  monthlyCost: number;
  totalCalls: number;
  successRate: number;
  assignedAgent: string;
  startDate: string;
}

const mockPhoneNumbers: PhoneNumber[] = [
  {
    id: '1',
    number: '+1(555)123-4567',
    tag: 'Airtel',
    status: 'verified',
    monthlyCost: 4.99,
    totalCalls: 856,
    successRate: 68.2,
    assignedAgent: 'SalesBot Pro',
    startDate: '2024-01-15'
  },
  {
    id: '2',
    number: '+1(555)987-6543',
    tag: 'Twilio',
    status: 'verified',
    monthlyCost: 4.99,
    totalCalls: 392,
    successRate: 74.5,
    assignedAgent: 'SupportBot',
    startDate: '2024-02-01'
  },
  {
    id: '3',
    number: '+1(555)456-7890',
    tag: 'Vonage',
    status: 'pending',
    monthlyCost: 5.99,
    totalCalls: 0,
    successRate: 0,
    assignedAgent: '',
    startDate: '2024-02-20'
  }
];

export const PhoneNumbersSection = () => {
  const [phoneNumbers] = useState(mockPhoneNumbers);

  return (
    <Card className="bg-gray-900 border-gray-800 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          Phone Numbers
          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
            + Purchase New Number
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex overflow-x-auto gap-4 pb-2" style={{ scrollSnapType: 'x mandatory' }}>
          {phoneNumbers.map((phone) => (
            <div
              key={phone.id}
              className="bg-gray-800 rounded-lg p-4 min-w-[300px] flex-shrink-0 hover:bg-gray-750 transition-colors duration-200"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">{phone.number}</span>
                  {phone.tag && (
                    <Badge variant="secondary" className="text-xs bg-purple-600 text-white">
                      {phone.tag}
                    </Badge>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                    <DropdownMenuItem className="text-white hover:bg-gray-700">Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-gray-700">Unassign</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 hover:bg-gray-700">Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center text-sm mb-3">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  phone.status === 'verified' ? 'bg-green-500' : 
                  phone.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className={`capitalize ${
                  phone.status === 'verified' ? 'text-green-400' : 
                  phone.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {phone.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                <div>
                  <div className="text-gray-400">Monthly Cost</div>
                  <div className="text-white font-medium">${phone.monthlyCost}</div>
                </div>
                <div>
                  <div className="text-gray-400">Total Calls</div>
                  <div className="text-white font-medium">{phone.totalCalls.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-400">Success Rate</div>
                  <div className="text-white font-medium">
                    {phone.successRate > 0 ? `${phone.successRate}%` : '-'}
                  </div>
                </div>
              </div>

              <div className="text-xs">
                {phone.assignedAgent ? (
                  <div className="text-cyan-400">Assigned to {phone.assignedAgent}</div>
                ) : (
                  <div className="text-gray-400">Unassigned</div>
                )}
                <div className="text-gray-500 mt-1">Start: {phone.startDate}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
