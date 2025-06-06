
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Play, Pause, Edit, Trash2, Copy, Calendar, Users, Target, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CampaignWizard } from '@/components/campaigns/CampaignWizard';
import { CampaignFilters } from '@/components/campaigns/CampaignFilters';
import { Progress } from '@/components/ui/progress';

const sampleCampaigns = [
  {
    id: '1',
    name: 'Black Friday Sales',
    description: 'Automated sales outreach for Black Friday promotions',
    status: 'active',
    type: 'lead-generation',
    agent: 'Sales Assistant',
    agentId: '1',
    contacts: 1250,
    responses: 342,
    conversions: 89,
    conversionRate: 26.0,
    startDate: '2024-11-20',
    endDate: '2024-11-30',
    budget: 5000,
    spent: 3200,
    costPerLead: 35.96,
    expectedROI: 320,
    actualROI: 245,
    leadsGenerated: 89,
    priority: 'high',
  },
  {
    id: '2',
    name: 'Customer Satisfaction Survey',
    description: 'Post-purchase satisfaction and feedback collection',
    status: 'scheduled',
    type: 'survey',
    agent: 'Customer Support Agent',
    agentId: '2',
    contacts: 850,
    responses: 0,
    conversions: 0,
    conversionRate: 0,
    startDate: '2024-12-01',
    endDate: '2024-12-15',
    budget: 2000,
    spent: 0,
    costPerLead: 0,
    expectedROI: 150,
    actualROI: 0,
    leadsGenerated: 0,
    priority: 'medium',
  },
  {
    id: '3',
    name: 'Product Demo Outreach',
    description: 'Reach out to trial users for product demonstrations',
    status: 'completed',
    type: 'marketing-outreach',
    agent: 'Sales Assistant',
    agentId: '1',
    contacts: 500,
    responses: 156,
    conversions: 34,
    conversionRate: 21.8,
    startDate: '2024-11-01',
    endDate: '2024-11-15',
    budget: 3000,
    spent: 2850,
    costPerLead: 83.82,
    expectedROI: 200,
    actualROI: 175,
    leadsGenerated: 34,
    priority: 'medium',
  },
  {
    id: '4',
    name: 'Holiday Promotion Campaign',
    description: 'End-of-year holiday promotion for existing customers',
    status: 'paused',
    type: 'follow-up',
    agent: 'Marketing Assistant',
    agentId: '4',
    contacts: 2000,
    responses: 180,
    conversions: 52,
    conversionRate: 28.9,
    startDate: '2024-12-15',
    endDate: '2024-12-31',
    budget: 8000,
    spent: 1200,
    costPerLead: 23.08,
    expectedROI: 400,
    actualROI: 85,
    leadsGenerated: 52,
    priority: 'high',
  },
];

export const CampaignsModule = () => {
  const [campaigns, setCampaigns] = useState(sampleCampaigns);
  const [filteredCampaigns, setFilteredCampaigns] = useState(sampleCampaigns);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const handleFiltersChange = (filters: any) => {
    let filtered = [...campaigns];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(campaign =>
        campaign.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        campaign.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(campaign => campaign.status === filters.status);
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(campaign => campaign.type === filters.type);
    }

    // Performance goal filter
    if (filters.performanceGoal !== 'all') {
      switch (filters.performanceGoal) {
        case 'high-conversion':
          filtered = filtered.filter(campaign => campaign.conversionRate > 40);
          break;
        case 'medium-conversion':
          filtered = filtered.filter(campaign => campaign.conversionRate >= 20 && campaign.conversionRate <= 40);
          break;
        case 'lead-volume':
          filtered = filtered.filter(campaign => campaign.leadsGenerated > 50);
          break;
        case 'cost-effective':
          filtered = filtered.filter(campaign => campaign.costPerLead < 30);
          break;
      }
    }

    // Budget range filter
    if (filters.budgetRange !== 'all') {
      switch (filters.budgetRange) {
        case '0-1000':
          filtered = filtered.filter(campaign => campaign.budget <= 1000);
          break;
        case '1000-5000':
          filtered = filtered.filter(campaign => campaign.budget > 1000 && campaign.budget <= 5000);
          break;
        case '5000-10000':
          filtered = filtered.filter(campaign => campaign.budget > 5000 && campaign.budget <= 10000);
          break;
        case '10000+':
          filtered = filtered.filter(campaign => campaign.budget > 10000);
          break;
      }
    }

    setFilteredCampaigns(filtered);
  };

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  const handleEditCampaign = (campaign: any) => {
    setEditingCampaign(campaign);
    setIsWizardOpen(true);
  };

  const calculateTotalStats = () => {
    return {
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter(c => c.status === 'active').length,
      totalContacts: campaigns.reduce((sum, c) => sum + c.contacts, 0),
      totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
      totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
      totalLeads: campaigns.reduce((sum, c) => sum + c.leadsGenerated, 0),
      avgConversionRate: campaigns.reduce((sum, c) => sum + c.conversionRate, 0) / campaigns.length,
      totalROI: campaigns.reduce((sum, c) => sum + c.actualROI, 0),
    };
  };

  const stats = calculateTotalStats();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Campaigns</h1>
          <p className="text-gray-400">Manage automated marketing and outreach campaigns</p>
        </div>
        <Button 
          onClick={() => setIsWizardOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Campaigns</p>
                <p className="text-2xl font-bold text-white">{stats.totalCampaigns}</p>
              </div>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active</p>
                <p className="text-2xl font-bold text-green-400">{stats.activeCampaigns}</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Leads</p>
                <p className="text-2xl font-bold text-blue-400">{stats.totalLeads}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Conversion</p>
                <p className="text-2xl font-bold text-yellow-400">{Math.round(stats.avgConversionRate)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Budget</p>
                <p className="text-2xl font-bold text-cyan-400">${stats.totalBudget.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total ROI</p>
                <p className="text-2xl font-bold text-orange-400">${stats.totalROI}</p>
              </div>
              <div className="text-orange-400">📈</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <CampaignFilters onFiltersChange={handleFiltersChange} />

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-200 cursor-pointer">
            <CardContent className="p-6" onClick={() => handleCampaignClick(campaign.id)}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{campaign.name}</h3>
                    <Badge variant="secondary" className={`${getStatusColor(campaign.status)} text-white`}>
                      {campaign.status}
                    </Badge>
                    <Badge variant="outline" className={`border-gray-600 ${getPriorityColor(campaign.priority)}`}>
                      {campaign.priority} priority
                    </Badge>
                  </div>
                  <p className="text-gray-400 mb-4">{campaign.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-400">Agent:</span>
                      <p className="text-white font-medium">{campaign.agent}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Contacts:</span>
                      <p className="text-blue-400 font-medium">{campaign.contacts.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Leads:</span>
                      <p className="text-green-400 font-medium">{campaign.leadsGenerated}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Conversion:</span>
                      <p className="text-purple-400 font-medium">{campaign.conversionRate}%</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Cost/Lead:</span>
                      <p className="text-yellow-400 font-medium">${campaign.costPerLead}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">ROI:</span>
                      <p className="text-cyan-400 font-medium">${campaign.actualROI}</p>
                    </div>
                  </div>

                  {/* Budget Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Budget Progress</span>
                      <span className="text-white">${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                    </div>
                    <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {campaign.startDate} - {campaign.endDate}
                    </div>
                    <div>
                      Response Rate: {campaign.contacts > 0 ? Math.round((campaign.responses / campaign.contacts) * 100) : 0}%
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-6" onClick={(e) => e.stopPropagation()}>
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
                  
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-gray-400 hover:text-white"
                    onClick={() => handleEditCampaign(campaign)}
                  >
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

      {/* Campaign Wizard */}
      <CampaignWizard
        isOpen={isWizardOpen}
        onClose={() => {
          setIsWizardOpen(false);
          setEditingCampaign(null);
        }}
        editingCampaign={editingCampaign}
      />
    </div>
  );
};
