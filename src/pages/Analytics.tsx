
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, Clock, Star, Download, Calendar, Filter, DollarSign, Zap, Phone, MessageSquare, AlertTriangle, Target } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('7d');
  const [selectedCampaign, setSelectedCampaign] = useState('all');
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
      totalCredits: 10000,
      activeCampaigns: 5,
      totalCost: 127.50,
      totalMinutes: 4320,
      leadsGenerated: 45,
      repeatUsers: 234
    },
    conversations: [
      { date: '2024-01-15', count: 45, successRate: 89, cost: 12.50, minutes: 180 },
      { date: '2024-01-14', count: 38, successRate: 85, cost: 11.20, minutes: 165 },
      { date: '2024-01-13', count: 52, successRate: 91, cost: 14.30, minutes: 201 },
      { date: '2024-01-12', count: 41, successRate: 86, cost: 10.80, minutes: 159 },
      { date: '2024-01-11', count: 48, successRate: 88, cost: 13.10, minutes: 187 }
    ],
    conversions: [
      { date: '2024-01-15', conversions: 23, rate: 51.1, calls: 45, leads: 8 },
      { date: '2024-01-14', conversions: 19, rate: 50.0, calls: 38, leads: 6 },
      { date: '2024-01-13', conversions: 28, rate: 53.8, calls: 52, leads: 11 },
      { date: '2024-01-12', conversions: 20, rate: 48.8, calls: 41, leads: 7 },
      { date: '2024-01-11', conversions: 25, rate: 52.1, calls: 48, leads: 9 }
    ],
    performance: {
      averageResponseTime: 2.3,
      successRate: 87.5,
      satisfactionScore: 4.6,
      intelligence: 92,
      voiceNaturalness: 88,
      responseRate: 94,
      previousPeriod: {
        averageResponseTime: 2.8,
        successRate: 84.2,
        satisfactionScore: 4.4,
        intelligence: 89,
        voiceNaturalness: 85,
        responseRate: 91
      }
    },
    channelDistribution: [
      { name: 'Voice Calls', value: 45, color: '#8B5CF6' },
      { name: 'WhatsApp', value: 30, color: '#10B981' },
      { name: 'Web Chat', value: 15, color: '#3B82F6' },
      { name: 'Email', value: 10, color: '#F59E0B' }
    ],
    sentimentData: [
      { name: 'Positive', value: 68, color: '#10B981' },
      { name: 'Neutral', value: 25, color: '#6B7280' },
      { name: 'Negative', value: 7, color: '#EF4444' }
    ],
    utilization: {
      uptime: 98.5,
      activeCampaigns: 5,
      totalCampaigns: 8,
      activePhoneNumbers: 3,
      totalPhoneNumbers: 5
    },
    alerts: [
      { type: 'warning', message: 'Response time increased by 15% this week', timestamp: '2 hours ago' },
      { type: 'info', message: 'New high satisfaction score achieved', timestamp: '1 day ago' },
      { type: 'alert', message: 'Credits running low (85% used)', timestamp: '3 hours ago' }
    ]
  };

  const chartConfig = {
    conversions: {
      label: "Conversions",
      color: "hsl(var(--primary))",
    },
    rate: {
      label: "Conversion Rate",
      color: "hsl(var(--destructive))",
    },
  };

  const getPerformanceChange = (current: number, previous: number) => {
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    return { change, percentage, isPositive: change >= 0 };
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

          {/* Enhanced Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
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
                  <CardTitle className="text-sm font-medium text-gray-400">Avg Duration</CardTitle>
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

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Cost</CardTitle>
                  <DollarSign className="w-4 h-4 text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${mockAnalyticsData.metrics.totalCost}</div>
                <p className="text-xs text-green-400 mt-1">-5% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Leads Generated</CardTitle>
                  <Target className="w-4 h-4 text-orange-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockAnalyticsData.metrics.leadsGenerated}</div>
                <p className="text-xs text-green-400 mt-1">+18% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-900 border-gray-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 transition-all duration-200">Overview</TabsTrigger>
              <TabsTrigger value="conversations" className="data-[state=active]:bg-purple-600 transition-all duration-200">Conversions</TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-purple-600 transition-all duration-200">Performance</TabsTrigger>
              <TabsTrigger value="channels" className="data-[state=active]:bg-purple-600 transition-all duration-200">Channels</TabsTrigger>
              <TabsTrigger value="sentiment" className="data-[state=active]:bg-purple-600 transition-all duration-200">Sentiment</TabsTrigger>
              <TabsTrigger value="usage" className="data-[state=active]:bg-purple-600 transition-all duration-200">Usage</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="transition-all duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Conversation Trends */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Conversation Trends</CardTitle>
                    <CardDescription className="text-gray-400">
                      Daily conversation volume and success rates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockAnalyticsData.conversations}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis 
                            dataKey="date" 
                            stroke="#9CA3AF"
                            fontSize={12}
                            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          />
                          <YAxis stroke="#9CA3AF" fontSize={12} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#8B5CF6"
                            strokeWidth={2}
                            dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Agent Utilization */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Agent Utilization</CardTitle>
                    <CardDescription className="text-gray-400">
                      Current utilization metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-300">Uptime</span>
                          <span className="text-white">{mockAnalyticsData.utilization.uptime}%</span>
                        </div>
                        <Progress value={mockAnalyticsData.utilization.uptime} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-300">Active Campaigns</span>
                          <span className="text-white">
                            {mockAnalyticsData.utilization.activeCampaigns}/{mockAnalyticsData.utilization.totalCampaigns}
                          </span>
                        </div>
                        <Progress 
                          value={(mockAnalyticsData.utilization.activeCampaigns / mockAnalyticsData.utilization.totalCampaigns) * 100} 
                          className="h-2" 
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-300">Active Phone Numbers</span>
                          <span className="text-white">
                            {mockAnalyticsData.utilization.activePhoneNumbers}/{mockAnalyticsData.utilization.totalPhoneNumbers}
                          </span>
                        </div>
                        <Progress 
                          value={(mockAnalyticsData.utilization.activePhoneNumbers / mockAnalyticsData.utilization.totalPhoneNumbers) * 100} 
                          className="h-2" 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity & Alerts */}
                <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-white">Alerts & Notifications</CardTitle>
                    <CardDescription className="text-gray-400">
                      Important updates and system alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAnalyticsData.alerts.map((alert, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${
                            alert.type === 'warning' ? 'bg-yellow-400' :
                            alert.type === 'alert' ? 'bg-red-400' : 'bg-blue-400'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-white text-sm">{alert.message}</p>
                            <p className="text-gray-400 text-xs">{alert.timestamp}</p>
                          </div>
                          {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="conversations" className="transition-all duration-200">
              <div className="space-y-6">
                {/* Filters */}
                <div className="flex space-x-4">
                  <Button variant="outline" className="border-gray-700 text-gray-300">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter by Campaign
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last 7 days
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>

                {/* Conversion Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Total Conversions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white">115</div>
                      <p className="text-xs text-green-400 mt-1">+8.7% from last week</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Conversion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white">51.1%</div>
                      <p className="text-xs text-green-400 mt-1">+2.3% from last week</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Leads Generated</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white">41</div>
                      <p className="text-xs text-green-400 mt-1">+12% from last week</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                        <span className="text-xl font-bold text-green-400">↗ Improving</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Conversion Chart */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Conversion Trends</CardTitle>
                    <CardDescription className="text-gray-400">
                      Daily conversion rates and volume over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockAnalyticsData.conversions}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis 
                            dataKey="date" 
                            stroke="#9CA3AF"
                            fontSize={12}
                            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          />
                          <YAxis stroke="#9CA3AF" fontSize={12} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="conversions"
                            stroke="#8B5CF6"
                            fill="#8B5CF6"
                            fillOpacity={0.2}
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#10B981"
                            strokeWidth={2}
                            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="transition-all duration-200">
              <div className="space-y-6">
                {/* Performance Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(mockAnalyticsData.performance).filter(([key]) => key !== 'previousPeriod').map(([key, value]) => {
                    if (typeof value !== 'number') return null;
                    
                    const previous = mockAnalyticsData.performance.previousPeriod[key as keyof typeof mockAnalyticsData.performance.previousPeriod];
                    const change = getPerformanceChange(value, previous);
                    
                    const metricLabels: Record<string, string> = {
                      averageResponseTime: 'Avg Response Time',
                      successRate: 'Success Rate',
                      satisfactionScore: 'Satisfaction Score',
                      intelligence: 'Agent Intelligence',
                      voiceNaturalness: 'Voice Naturalness',
                      responseRate: 'Response Rate'
                    };

                    const metricUnits: Record<string, string> = {
                      averageResponseTime: 's',
                      successRate: '%',
                      satisfactionScore: '/5',
                      intelligence: '%',
                      voiceNaturalness: '%',
                      responseRate: '%'
                    };

                    return (
                      <Card key={key} className="bg-gray-900 border-gray-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-gray-400">
                            {metricLabels[key]}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="text-2xl font-bold text-white">
                              {value}{metricUnits[key]}
                            </div>
                            <Progress 
                              value={key === 'satisfactionScore' ? (value / 5) * 100 : value} 
                              className="h-2"
                              showValue={false}
                            />
                            <p className={`text-xs mt-1 ${change.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                              {change.isPositive ? '+' : ''}{change.percentage}% from last month
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Performance Comparison Chart */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Performance Comparison</CardTitle>
                    <CardDescription className="text-gray-400">
                      Current performance vs. previous period
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Object.entries(mockAnalyticsData.performance).filter(([key]) => key !== 'previousPeriod').map(([key, value]) => {
                        if (typeof value !== 'number') return null;
                        
                        const previous = mockAnalyticsData.performance.previousPeriod[key as keyof typeof mockAnalyticsData.performance.previousPeriod];
                        const change = getPerformanceChange(value, previous);
                        
                        const metricLabels: Record<string, string> = {
                          averageResponseTime: 'Avg Response Time',
                          successRate: 'Success Rate',
                          satisfactionScore: 'Satisfaction Score',
                          intelligence: 'Agent Intelligence',
                          voiceNaturalness: 'Voice Naturalness',
                          responseRate: 'Response Rate'
                        };

                        return (
                          <div key={key} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-300 font-medium">{metricLabels[key]}</span>
                                <div className="flex items-center space-x-4">
                                  <span className="text-white font-bold">{value}</span>
                                  <span className={`text-sm ${change.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                    {change.isPositive ? '↗' : '↘'} {Math.abs(parseFloat(change.percentage))}%
                                  </span>
                                </div>
                              </div>
                              <Progress 
                                value={key === 'satisfactionScore' ? (value / 5) * 100 : value} 
                                className="h-2"
                                showValue={false}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="channels" className="transition-all duration-200">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Channel Distribution */}
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Channel Distribution</CardTitle>
                      <CardDescription className="text-gray-400">
                        Conversation breakdown by channel
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={mockAnalyticsData.channelDistribution}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={({ name, value }) => `${name}: ${value}%`}
                            >
                              {mockAnalyticsData.channelDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Channel Performance */}
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Channel Performance</CardTitle>
                      <CardDescription className="text-gray-400">
                        Success rates by channel type
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockAnalyticsData.channelDistribution.map((channel, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">{channel.name}</span>
                              <span className="text-white">{85 + index * 2}% success rate</span>
                            </div>
                            <Progress value={85 + index * 2} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sentiment" className="transition-all duration-200">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sentiment Analysis */}
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Sentiment Analysis</CardTitle>
                      <CardDescription className="text-gray-400">
                        Customer sentiment distribution
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={mockAnalyticsData.sentimentData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={({ name, value }) => `${name}: ${value}%`}
                            >
                              {mockAnalyticsData.sentimentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Sentiment Trends */}
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Sentiment Trends</CardTitle>
                      <CardDescription className="text-gray-400">
                        Sentiment evolution over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockAnalyticsData.sentimentData.map((sentiment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: sentiment.color }}
                              ></div>
                              <span className="text-gray-300">{sentiment.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-bold">{sentiment.value}%</div>
                              <div className="text-xs text-green-400">+2% this week</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="transition-all duration-200">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Credit Usage */}
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
                        <Progress 
                          value={(mockAnalyticsData.metrics.creditsUsed / mockAnalyticsData.metrics.totalCredits) * 100}
                          className="h-3"
                          showValue={true}
                          valueSuffix="% used"
                        />
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{mockAnalyticsData.metrics.totalMinutes}</div>
                            <div className="text-sm text-gray-400">Total Minutes</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">${mockAnalyticsData.metrics.totalCost}</div>
                            <div className="text-sm text-gray-400">Total Cost</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cost Breakdown */}
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Cost Breakdown</CardTitle>
                      <CardDescription className="text-gray-400">
                        Daily cost and usage patterns
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={mockAnalyticsData.conversations}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis 
                              dataKey="date" 
                              stroke="#9CA3AF"
                              fontSize={12}
                              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            />
                            <YAxis stroke="#9CA3AF" fontSize={12} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="cost" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
