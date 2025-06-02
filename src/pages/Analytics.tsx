
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, Clock, Star, Download, Calendar } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Analytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { agentId } = useParams();

  const handleModuleChange = (module: string) => {
    switch (module) {
      case 'dashboard':
        navigate('/');
        break;
      case 'agents':
        navigate('/agents');
        break;
      case 'channels':
        navigate('/channels');
        break;
      default:
        console.log(`Navigation to ${module} not implemented yet`);
        break;
    }
  };

  const mockAnalyticsData = {
    agent: {
      id: agentId || '1',
      name: 'SalesBot Pro',
      status: 'Active'
    },
    metrics: {
      totalConversations: 1250,
      successRate: 87.5,
      averageResponseTime: '2.3s',
      satisfactionScore: 4.6,
      creditsUsed: 8540,
      totalCredits: 10000
    },
    conversations: [
      { date: '2024-01-15', count: 45, successRate: 89 },
      { date: '2024-01-14', count: 38, successRate: 85 },
      { date: '2024-01-13', count: 52, successRate: 91 },
      { date: '2024-01-12', count: 41, successRate: 86 },
      { date: '2024-01-11', count: 48, successRate: 88 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <Sidebar
        activeModule="agents"
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
                onClick={() => navigate(`/agents/${agentId}`)}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Agent
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {mockAnalyticsData.agent.name} Analytics
                </h1>
                <p className="text-gray-400">Performance insights and metrics</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Conversations</CardTitle>
                  <Users className="w-4 h-4 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockAnalyticsData.metrics.totalConversations.toLocaleString()}</div>
                <p className="text-xs text-green-400 mt-1">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Success Rate</CardTitle>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockAnalyticsData.metrics.successRate}%</div>
                <p className="text-xs text-green-400 mt-1">+3.2% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Avg Response Time</CardTitle>
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockAnalyticsData.metrics.averageResponseTime}</div>
                <p className="text-xs text-green-400 mt-1">-0.5s from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Satisfaction Score</CardTitle>
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockAnalyticsData.metrics.satisfactionScore}/5</div>
                <p className="text-xs text-green-400 mt-1">+0.2 from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-900 border-gray-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
              <TabsTrigger value="conversations" className="data-[state=active]:bg-purple-600">Conversations</TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-purple-600">Performance</TabsTrigger>
              <TabsTrigger value="usage" className="data-[state=active]:bg-purple-600">Usage</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Conversation Trends</CardTitle>
                  <CardDescription className="text-gray-400">
                    Daily conversation volume and success rates over the last 5 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalyticsData.conversations.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-gray-300">{day.date}</div>
                          <Badge variant={day.successRate >= 90 ? 'default' : 'secondary'}>
                            {day.successRate}% Success
                          </Badge>
                        </div>
                        <div className="text-lg font-medium text-white">{day.count} conversations</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversations">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Conversation Details</CardTitle>
                  <CardDescription className="text-gray-400">
                    Detailed breakdown of conversation metrics and outcomes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-400">
                    Detailed conversation analytics coming soon...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                  <CardDescription className="text-gray-400">
                    Response times, accuracy, and efficiency metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-400">
                    Performance analytics coming soon...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Credit Usage</CardTitle>
                  <CardDescription className="text-gray-400">
                    Credit consumption and billing insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Credits Used</span>
                      <span className="text-white font-medium">
                        {mockAnalyticsData.metrics.creditsUsed.toLocaleString()} / {mockAnalyticsData.metrics.totalCredits.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${(mockAnalyticsData.metrics.creditsUsed / mockAnalyticsData.metrics.totalCredits) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-400">
                      {((mockAnalyticsData.metrics.creditsUsed / mockAnalyticsData.metrics.totalCredits) * 100).toFixed(1)}% of monthly credits used
                    </p>
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

export default Analytics;
