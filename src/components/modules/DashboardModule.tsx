
import { useState } from 'react';
import { Phone, MessageSquare, TrendingUp, Users, Bot, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const agents = [
  {
    id: '1',
    name: 'Customer Support Agent',
    status: 'active',
    conversations: 1247,
    successRate: 94,
  },
  {
    id: '2',
    name: 'Sales Assistant',
    status: 'active',
    conversations: 856,
    successRate: 87,
  },
  {
    id: '3',
    name: 'Technical Support',
    status: 'draft',
    conversations: 0,
    successRate: 0,
  }
];

const phoneNumbers = [
  { id: '1', number: '+1 (555) 123-4567', type: 'Local', location: 'New York, NY', status: 'active' },
  { id: '2', number: '+1 (555) 987-6543', type: 'Toll-Free', location: 'United States', status: 'active' },
  { id: '3', number: '+1 (555) 111-2222', type: 'Local', location: 'Los Angeles, CA', status: 'active' },
  { id: '4', number: '+44 20 7946 0958', type: 'International', location: 'London, UK', status: 'inactive' },
  { id: '5', number: '+1 (800) 555-0199', type: 'Toll-Free', location: 'United States', status: 'active' },
];

export const DashboardModule = () => {
  const [phoneNumbersScrollPosition, setPhoneNumbersScrollPosition] = useState(0);

  const scrollPhoneNumbers = (direction: 'left' | 'right') => {
    const scrollAmount = 320; // Width of one card plus gap
    const maxScroll = (phoneNumbers.length - 3) * scrollAmount; // Show 3 cards at a time
    
    if (direction === 'left') {
      setPhoneNumbersScrollPosition(Math.max(0, phoneNumbersScrollPosition - scrollAmount));
    } else {
      setPhoneNumbersScrollPosition(Math.min(maxScroll, phoneNumbersScrollPosition + scrollAmount));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Agents</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <Bot className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Calls</p>
                <p className="text-2xl font-bold text-green-400">47</p>
              </div>
              <Phone className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Conversations Today</p>
                <p className="text-2xl font-bold text-blue-400">1,284</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-purple-400">92%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents Section */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Bot className="w-5 h-5 mr-2" />
            Active Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                    <Badge variant={agent.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                      {agent.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Success Rate</p>
                    <p className="text-xl font-bold text-green-400">{agent.successRate}%</p>
                  </div>
                </div>
                
                <div className="text-sm">
                  <p className="text-gray-400">Conversations</p>
                  <p className="text-white font-medium">{agent.conversations.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Phone Numbers Section */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Phone Numbers
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollPhoneNumbers('left')}
                disabled={phoneNumbersScrollPosition === 0}
                className="border-gray-600"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollPhoneNumbers('right')}
                disabled={phoneNumbersScrollPosition >= (phoneNumbers.length - 3) * 320}
                className="border-gray-600"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-hidden">
            <div 
              className="flex space-x-4 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${phoneNumbersScrollPosition}px)` }}
            >
              {phoneNumbers.map((number) => (
                <Card 
                  key={number.id} 
                  className="flex-shrink-0 w-80 bg-gray-900 border-gray-700"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-mono text-white font-medium">{number.number}</p>
                        <p className="text-sm text-gray-400">{number.location}</p>
                      </div>
                      <Badge 
                        variant={number.status === 'active' ? 'default' : 'secondary'}
                        className={number.status === 'active' ? 'bg-green-600' : ''}
                      >
                        {number.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={
                          number.type === 'Local' ? 'border-blue-500 text-blue-400' :
                          number.type === 'Toll-Free' ? 'border-green-500 text-green-400' :
                          'border-purple-500 text-purple-400'
                        }
                      >
                        {number.type}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          Stats
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
