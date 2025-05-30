
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">Campaigns</h1>
          <p className="text-gray-400 text-sm">Manage automated marketing and outreach campaigns</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-400 truncate">Total Campaigns</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{campaigns.length}</p>
              </div>
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-400 truncate">Active Campaigns</p>
                <p className="text-lg sm:text-2xl font-bold text-green-400">
                  {campaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-400 truncate">Total Contacts</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-400">
                  {campaigns.reduce((sum, c) => sum + c.contacts, 0).toLocaleString()}
                </p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-400 truncate">Conversion Rate</p>
                <p className="text-lg sm:text-2xl font-bold text-yellow-400">
                  {Math.round((campaigns.reduce((sum, c) => sum + c.conversions, 0) / campaigns.reduce((sum, c) => sum + c.responses, 1)) * 100)}%
                </p>
              </div>
              <div className="text-lg sm:text-xl text-yellow-400 flex-shrink-0">📈</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="space-y-3 lg:space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-200 cursor-pointer">
            <CardContent className="p-4 lg:p-6" onClick={() => handleCampaignClick(campaign.id)}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-white truncate">{campaign.name}</h3>
                    <Badge variant="secondary" className={`${getStatusColor(campaign.status)} text-white w-fit`}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400 mb-4 text-sm line-clamp-2">{campaign.description}</p>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 text-sm">
                    <div className="min-w-0">
                      <span className="text-gray-400 block">Agent:</span>
                      <p className="text-white font-medium truncate">{campaign.agent}</p>
                    </div>
                    <div className="min-w-0">
                      <span className="text-gray-400 block">Contacts:</span>
                      <p className="text-blue-400 font-medium">{campaign.contacts.toLocaleString()}</p>
                    </div>
                    <div className="min-w-0">
                      <span className="text-gray-400 block">Responses:</span>
                      <p className="text-green-400 font-medium">{campaign.responses.toLocaleString()}</p>
                    </div>
                    <div className="min-w-0">
                      <span className="text-gray-400 block">Conversions:</span>
                      <p className="text-purple-400 font-medium">{campaign.conversions}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-4 text-xs sm:text-sm text-gray-400">
                    <div className="flex items-center min-w-0">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{campaign.startDate} - {campaign.endDate}</span>
                    </div>
                    <div className="min-w-0">
                      Response Rate: {campaign.contacts > 0 ? Math.round((campaign.responses / campaign.contacts) * 100) : 0}%
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col gap-2 lg:ml-6" onClick={(e) => e.stopPropagation()}>
                  {campaign.status === 'active' ? (
                    <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white flex-1 lg:flex-none">
                      <Pause className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline">Pause</span>
                    </Button>
                  ) : campaign.status === 'scheduled' ? (
                    <Button size="sm" variant="outline" className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white flex-1 lg:flex-none">
                      <Play className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline">Start</span>
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-400 flex-1 lg:flex-none">
                      <Copy className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline">Duplicate</span>
                    </Button>
                  )}
                  
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white flex-1 lg:flex-none">
                    <Edit className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                  
                  <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 flex-1 lg:flex-none">
                    <Trash2 className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Delete</span>
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
