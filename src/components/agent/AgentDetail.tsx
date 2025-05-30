import { useState } from 'react';
import { ArrowLeft, BarChart3, Edit, Archive, MessageCircle, Target, Clock, CreditCard, Play, Download, Filter, Phone, Settings, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: string;
  language: string;
  voice: string;
  conversations: number;
  successRate: number;
  lastUpdated: string;
  persona: string;
}

interface AgentDetailProps {
  agent: Agent;
  onBack: () => void;
}

// Mock data for campaigns and conversations
const mockCampaigns = [
  { 
    id: 'c1', 
    name: 'Lead Generation Q4', 
    status: 'active', 
    sessions: 45,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    phoneNumber: '+1(555)123-4567'
  },
  { 
    id: 'c2', 
    name: 'Customer Support', 
    status: 'active', 
    sessions: 123,
    startDate: '2024-01-15',
    endDate: 'Ongoing',
    phoneNumber: '+1(555)987-6543'
  },
  { 
    id: 'c3', 
    name: 'Product Demo Calls', 
    status: 'paused', 
    sessions: 28,
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    phoneNumber: '+1(555)456-7890'
  },
];

const mockConversations = [
  {
    id: 'conv1',
    leadName: 'John Smith',
    email: 'john@example.com',
    phone: '+1(555)123-4567',
    duration: '4m 32s',
    disposition: 'Qualified',
    timestamp: '2024-01-15 14:30',
    campaign: 'Lead Generation Q4',
    hasRecording: true
  },
  {
    id: 'conv2',
    leadName: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1(555)987-6543',
    duration: '2m 15s',
    disposition: 'Not Interested',
    timestamp: '2024-01-15 13:45',
    campaign: 'Product Demo Calls',
    hasRecording: true
  },
  {
    id: 'conv3',
    leadName: 'Mike Davis',
    email: 'mike@example.com',
    phone: '+1(555)456-7890',
    duration: '7m 08s',
    disposition: 'Callback Requested',
    timestamp: '2024-01-15 12:20',
    campaign: 'Customer Support',
    hasRecording: false
  },
];

const getDispositionColor = (disposition: string) => {
  switch (disposition.toLowerCase()) {
    case 'qualified': return 'bg-green-600';
    case 'not interested': return 'bg-red-600';
    case 'callback requested': return 'bg-yellow-600';
    case 'voicemail': return 'bg-blue-600';
    default: return 'bg-gray-600';
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return 'bg-green-600';
    case 'paused': return 'bg-yellow-600';
    case 'inactive': return 'bg-gray-600';
    default: return 'bg-gray-600';
  }
};

export const AgentDetail = ({ agent, onBack }: AgentDetailProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleAnalytics = () => {
    console.log('Navigate to analytics for agent:', agent.id);
    navigate(`/agents/${agent.id}/analytics`);
  };

  const handleTestAgent = () => {
    console.log('Test agent:', agent.id);
    // TODO: Implement agent testing functionality
  };

  const handleEditConfiguration = () => {
    console.log('Navigate to edit configuration for agent:', agent.id);
    // Navigate to Create Agent page with agent data for editing
    navigate(`/agents/${agent.id}`);
  };

  const handleArchiveAgent = () => {
    console.log('Archive agent:', agent.id);
    // TODO: Show confirmation modal
  };

  const handleCampaignClick = (campaignId: string) => {
    console.log('Navigate to campaign:', campaignId);
    navigate(`/campaigns/${campaignId}`);
  };

  const handleEditPhoneNumber = () => {
    console.log('Edit phone number for agent:', agent.id);
    // TODO: Open phone number assignment modal
  };

  const handleEditIntegrations = () => {
    console.log('Edit integrations for agent:', agent.id);
    // TODO: Open integrations management modal
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                {agent.status}
              </Badge>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">ID: {agent.id}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleTestAgent}
          >
            <Play className="w-4 h-4 mr-2" />
            Test Agent
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={handleAnalytics}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={handleEditConfiguration}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Configuration
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-700 text-red-400 hover:bg-red-900/20"
            onClick={handleArchiveAgent}
          >
            <Archive className="w-4 h-4 mr-2" />
            Archive Agent
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Conversations</p>
                <p className="text-2xl font-bold text-white">{agent.conversations.toLocaleString()}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Campaigns</p>
                <p className="text-2xl font-bold text-white">{mockCampaigns.length}</p>
              </div>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-green-400">{agent.successRate}%</p>
              </div>
              <div className="text-green-400">📈</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Duration</p>
                <p className="text-2xl font-bold text-cyan-400">4m 12s</p>
              </div>
              <Clock className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Credits Used</p>
                <p className="text-2xl font-bold text-orange-400">600</p>
              </div>
              <CreditCard className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Success Rate</p>
                <p className="text-2xl font-bold text-green-400">94%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Agent Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Agent Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Description</p>
                  <p className="text-white">{agent.description}</p>
                </div>
                
                {/* Associated Phone Number */}
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Associated Phone Number</p>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-cyan-400" />
                      <span className="text-white">+1(555)123-4567</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-gray-400 hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleEditPhoneNumber}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>

                {/* Active Integrations */}
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-gray-400">Active Integrations</p>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-gray-400 hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={handleEditIntegrations}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Email</span>
                      <Badge variant="default" className="bg-green-600">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">WhatsApp</span>
                      <Badge variant="default" className="bg-green-600">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Voice Calls</span>
                      <Badge variant="default" className="bg-green-600">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Telegram</span>
                      <Badge variant="secondary">Inactive</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                  <div>
                    <p className="text-sm text-gray-400">Total Sessions</p>
                    <p className="text-xl font-bold text-white">{agent.conversations}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Credits Used</p>
                    <p className="text-xl font-bold text-orange-400">600</p>
                    <Progress value={6} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Linked Campaigns Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Linked Campaigns
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">Campaign Name</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Sessions</TableHead>
                    <TableHead className="text-gray-400">Start Date</TableHead>
                    <TableHead className="text-gray-400">End Date</TableHead>
                    <TableHead className="text-gray-400">Phone Number</TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCampaigns.map((campaign) => (
                    <TableRow key={campaign.id} className="border-gray-700 hover:bg-gray-850">
                      <TableCell>
                        <button
                          onClick={() => handleCampaignClick(campaign.id)}
                          className="text-blue-400 hover:text-blue-300 hover:underline text-left"
                        >
                          {campaign.name}
                        </button>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{campaign.sessions}</TableCell>
                      <TableCell className="text-gray-300">{campaign.startDate}</TableCell>
                      <TableCell className="text-gray-300">{campaign.endDate}</TableCell>
                      <TableCell className="text-cyan-400">{campaign.phoneNumber}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-400">
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          {/* Filters */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Input 
                  placeholder="Search conversations..." 
                  className="bg-gray-900 border-gray-700 text-white flex-1"
                />
                <Select defaultValue="all">
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white w-48">
                    <SelectValue placeholder="Filter by disposition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dispositions</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="not-interested">Not Interested</SelectItem>
                    <SelectItem value="callback">Callback Requested</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Activity List */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-6 gap-4 py-2 px-4 bg-gray-900 rounded text-sm font-medium text-gray-400">
                  <span>Lead Name</span>
                  <span>Contact</span>
                  <span>Duration</span>
                  <span>Disposition</span>
                  <span>Campaign</span>
                  <span>Actions</span>
                </div>
                {mockConversations.map(conv => (
                  <div key={conv.id} className="grid grid-cols-6 gap-4 py-3 px-4 bg-gray-900 rounded hover:bg-gray-850 transition-colors">
                    <span className="text-white">{conv.leadName}</span>
                    <div className="text-sm">
                      <div className="text-gray-300">{conv.email}</div>
                      <div className="text-gray-400">{conv.phone}</div>
                    </div>
                    <span className="text-gray-300">{conv.duration}</span>
                    <Badge className={`${getDispositionColor(conv.disposition)} text-white w-fit`}>
                      {conv.disposition}
                    </Badge>
                    <span className="text-gray-300">{conv.campaign}</span>
                    <div className="flex space-x-2">
                      {conv.hasRecording && (
                        <>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-400">
                            <Play className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-green-400">
                            <Download className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
