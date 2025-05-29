
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Users, Phone, Mail, MessageCircle, Edit, Archive, BarChart3 } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CampaignDetail = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { campaignId } = useParams();

  const handleModuleChange = (module: string) => {
    switch (module) {
      case 'dashboard':
        navigate('/');
        break;
      case 'agents':
        navigate('/agents');
        break;
      case 'campaigns':
        navigate('/campaigns');
        break;
      case 'channels':
        navigate('/channels');
        break;
      default:
        console.log(`Navigation to ${module} not implemented yet`);
        break;
    }
  };

  const mockCampaignData = {
    id: campaignId || '1',
    name: 'Q1 Lead Generation Campaign',
    status: 'Active',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    description: 'Automated lead generation campaign targeting potential customers in the SaaS industry.',
    agent: { id: '1', name: 'SalesBot Pro' },
    phoneNumber: '+1 (555) 123-4567',
    metrics: {
      totalContacts: 2450,
      contacted: 1890,
      responded: 1234,
      converted: 567,
      conversionRate: 23.1
    },
    sessions: [
      { id: 'S001', leadName: 'John Smith', email: 'john@company.com', phone: '+1-555-0101', duration: '4m 23s', disposition: 'Interested', timestamp: '2024-01-15 14:30' },
      { id: 'S002', leadName: 'Sarah Johnson', email: 'sarah@business.com', phone: '+1-555-0102', duration: '6m 45s', disposition: 'Converted', timestamp: '2024-01-15 13:45' },
      { id: 'S003', leadName: 'Mike Davis', email: 'mike@startup.io', phone: '+1-555-0103', duration: '2m 10s', disposition: 'Not Interested', timestamp: '2024-01-15 12:15' },
      { id: 'S004', leadName: 'Lisa Chen', email: 'lisa@tech.co', phone: '+1-555-0104', duration: '8m 20s', disposition: 'Follow Up', timestamp: '2024-01-15 11:30' },
      { id: 'S005', leadName: 'David Wilson', email: 'david@solutions.net', phone: '+1-555-0105', duration: '3m 55s', disposition: 'Interested', timestamp: '2024-01-15 10:45' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-600';
      case 'paused': return 'bg-yellow-600';
      case 'completed': return 'bg-blue-600';
      case 'archived': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getDispositionColor = (disposition: string) => {
    switch (disposition.toLowerCase()) {
      case 'converted': return 'bg-green-600';
      case 'interested': return 'bg-blue-600';
      case 'follow up': return 'bg-yellow-600';
      case 'not interested': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <Sidebar
        activeModule="campaigns"
        setActiveModule={handleModuleChange}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/campaigns')}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Campaigns
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">{mockCampaignData.name}</h1>
                <p className="text-gray-400">{mockCampaignData.description}</p>
              </div>
              <Badge className={`${getStatusColor(mockCampaignData.status)} text-white`}>
                {mockCampaignData.status}
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <Edit className="w-4 h-4 mr-2" />
                Edit Campaign
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                {mockCampaignData.status === 'Active' ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {mockCampaignData.status === 'Active' ? 'Pause' : 'Resume'}
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Contacts</CardTitle>
                  <Users className="w-4 h-4 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockCampaignData.metrics.totalContacts.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Contacted</CardTitle>
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockCampaignData.metrics.contacted.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Responded</CardTitle>
                  <MessageCircle className="w-4 h-4 text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockCampaignData.metrics.responded.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Converted</CardTitle>
                  <Users className="w-4 h-4 text-yellow-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockCampaignData.metrics.converted.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Conversion Rate</CardTitle>
                  <BarChart3 className="w-4 h-4 text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockCampaignData.metrics.conversionRate}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Details Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-900 border-gray-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
              <TabsTrigger value="sessions" className="data-[state=active]:bg-purple-600">Sessions</TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-purple-600">Contacts</TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Campaign Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Start Date:</span>
                      <span className="text-white">{mockCampaignData.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">End Date:</span>
                      <span className="text-white">{mockCampaignData.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Assigned Agent:</span>
                      <span className="text-white">{mockCampaignData.agent.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phone Number:</span>
                      <span className="text-white">{mockCampaignData.phoneNumber}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Contact Rate</span>
                        <span className="text-white">{((mockCampaignData.metrics.contacted / mockCampaignData.metrics.totalContacts) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(mockCampaignData.metrics.contacted / mockCampaignData.metrics.totalContacts) * 100}%` }} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Response Rate</span>
                        <span className="text-white">{((mockCampaignData.metrics.responded / mockCampaignData.metrics.contacted) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(mockCampaignData.metrics.responded / mockCampaignData.metrics.contacted) * 100}%` }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Conversion Rate</span>
                        <span className="text-white">{mockCampaignData.metrics.conversionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${mockCampaignData.metrics.conversionRate}%` }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sessions">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Campaign Sessions</CardTitle>
                  <CardDescription className="text-gray-400">
                    All conversations and interactions for this campaign
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="text-gray-400">Session ID</TableHead>
                        <TableHead className="text-gray-400">Lead Name</TableHead>
                        <TableHead className="text-gray-400">Email</TableHead>
                        <TableHead className="text-gray-400">Phone</TableHead>
                        <TableHead className="text-gray-400">Duration</TableHead>
                        <TableHead className="text-gray-400">Disposition</TableHead>
                        <TableHead className="text-gray-400">Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCampaignData.sessions.map((session) => (
                        <TableRow key={session.id} className="border-gray-800 hover:bg-gray-800">
                          <TableCell className="text-white font-mono">{session.id}</TableCell>
                          <TableCell className="text-white">{session.leadName}</TableCell>
                          <TableCell className="text-gray-300">{session.email}</TableCell>
                          <TableCell className="text-gray-300">{session.phone}</TableCell>
                          <TableCell className="text-white">{session.duration}</TableCell>
                          <TableCell>
                            <Badge className={`${getDispositionColor(session.disposition)} text-white`}>
                              {session.disposition}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">{session.timestamp}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Contact Management</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage campaign contacts and upload lists
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-400">
                    Contact management features coming soon...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Campaign Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure campaign parameters and automation rules
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-400">
                    Campaign settings coming soon...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default CampaignDetail;
