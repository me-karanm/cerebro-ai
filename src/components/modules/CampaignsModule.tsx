
import { useState } from 'react';
import { Plus, Play, Pause, Edit, Trash2, Copy, Calendar, Users, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const sampleCampaigns = [
  {
    id: '1',
    name: 'Black Friday Sales',
    description: 'Automated sales outreach for Black Friday promotions',
    status: 'active',
    agent: 'Sales Assistant',
    contacts: 1250,
    responses: 342,
    conversions: 89,
    startDate: '2024-11-20',
    endDate: '2024-11-30',
  },
  {
    id: '2',
    name: 'Customer Satisfaction Survey',
    description: 'Post-purchase satisfaction and feedback collection',
    status: 'scheduled',
    agent: 'Customer Support Agent',
    contacts: 850,
    responses: 0,
    conversions: 0,
    startDate: '2024-12-01',
    endDate: '2024-12-15',
  },
  {
    id: '3',
    name: 'Product Demo Outreach',
    description: 'Reach out to trial users for product demonstrations',
    status: 'completed',
    agent: 'Sales Assistant',
    contacts: 500,
    responses: 156,
    conversions: 34,
    startDate: '2024-11-01',
    endDate: '2024-11-15',
  },
];

export const CampaignsModule = () => {
  const [campaigns] = useState(sampleCampaigns);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Campaigns</h1>
          <p className="text-gray-400">Manage automated marketing and outreach campaigns</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Campaigns</p>
                <p className="text-2xl font-bold text-white">{campaigns.length}</p>
              </div>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Campaigns</p>
                <p className="text-2xl font-bold text-green-400">
                  {campaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Contacts</p>
                <p className="text-2xl font-bold text-blue-400">
                  {campaigns.reduce((sum, c) => sum + c.contacts, 0).toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Conversion Rate</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {Math.round((campaigns.reduce((sum, c) => sum + c.conversions, 0) / campaigns.reduce((sum, c) => sum + c.responses, 1)) * 100)}%
                </p>
              </div>
              <div className="text-yellow-400">📈</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{campaign.name}</h3>
                    <Badge variant="secondary" className={`${getStatusColor(campaign.status)} text-white`}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400 mb-4">{campaign.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Agent:</span>
                      <p className="text-white font-medium">{campaign.agent}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Contacts:</span>
                      <p className="text-blue-400 font-medium">{campaign.contacts.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Responses:</span>
                      <p className="text-green-400 font-medium">{campaign.responses.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Conversions:</span>
                      <p className="text-purple-400 font-medium">{campaign.conversions}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 mt-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {campaign.startDate} - {campaign.endDate}
                    </div>
                    <div>
                      Response Rate: {campaign.contacts > 0 ? Math.round((campaign.responses / campaign.contacts) * 100) : 0}%
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  {campaign.status === 'active' ? (
                    <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white">
                      <Pause className="w-3 h-3 mr-1" />
                      Pause
                    </Button>
                  ) : campaign.status === 'scheduled' ? (
                    <Button size="sm" variant="outline" className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white">
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                      <Copy className="w-3 h-3 mr-1" />
                      Duplicate
                    </Button>
                  )}
                  
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  
                  <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
