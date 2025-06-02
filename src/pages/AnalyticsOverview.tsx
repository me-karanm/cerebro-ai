import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Download, 
  RefreshCw, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Clock, 
  DollarSign,
  Zap,
  Timer,
  AlertTriangle,
  Filter,
  ChevronRight
} from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const AnalyticsOverview = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState('30d');
  const navigate = useNavigate();

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

  // Mock data
  const summaryStats = [
    { label: 'Total Agents', value: '24', icon: Users, change: '+3 this month' },
    { label: 'Total Campaigns', value: '48', icon: MessageCircle, change: '+8 this month' },
    { label: 'Total Conversations', value: '15.2K', icon: TrendingUp, change: '+12% this month' },
    { label: 'Avg Success Rate', value: '87.3%', icon: TrendingUp, change: '+2.1% this month' },
    { label: 'Total Cost', value: '$3,240', icon: DollarSign, change: '+15% this month' },
    { label: 'Total Credits Used', value: '42.8K', icon: Zap, change: '85% of limit' },
    { label: 'Total Minutes', value: '1,890', icon: Timer, change: '+18% this month' }
  ];

  const agentsData = [
    { name: 'SalesBot Pro', status: 'Active', conversations: 2840, successRate: 92.1, avgDuration: '4:32', creditsUsed: 8540 },
    { name: 'Customer Support AI', status: 'Active', conversations: 1950, successRate: 89.7, avgDuration: '3:45', creditsUsed: 6220 },
    { name: 'Lead Qualifier', status: 'Active', conversations: 1640, successRate: 85.3, avgDuration: '2:58', creditsUsed: 4890 },
    { name: 'Tech Support Bot', status: 'Draft', conversations: 890, successRate: 78.4, avgDuration: '6:12', creditsUsed: 3450 },
    { name: 'Marketing Assistant', status: 'Active', conversations: 1200, successRate: 91.8, avgDuration: '3:20', creditsUsed: 4120 }
  ];

  const campaignsData = [
    { name: 'Q4 Lead Generation', status: 'Active', sessions: 4320, successRate: 89.2, cost: '$1,240', agents: 3 },
    { name: 'Customer Onboarding', status: 'Active', sessions: 2890, successRate: 94.1, cost: '$890', agents: 2 },
    { name: 'Product Demo Calls', status: 'Active', sessions: 1950, successRate: 87.6, cost: '$650', agents: 2 },
    { name: 'Support Ticket Follow-up', status: 'Draft', sessions: 1240, successRate: 82.3, cost: '$460', agents: 1 }
  ];

  const conversationVolumeData = [
    { date: 'Jan', conversations: 8200 },
    { date: 'Feb', conversations: 9100 },
    { date: 'Mar', conversations: 10400 },
    { date: 'Apr', conversations: 11800 },
    { date: 'May', conversations: 13200 },
    { date: 'Jun', conversations: 15200 }
  ];

  const sentimentData = [
    { name: 'Positive', value: 68, color: '#10B981' },
    { name: 'Neutral', value: 25, color: '#6B7280' },
    { name: 'Negative', value: 7, color: '#EF4444' }
  ];

  const qualityMetrics = [
    { label: 'Avg Call Duration', value: '4:15', percentage: 75 },
    { label: 'Customer Engagement', value: '89.2%', percentage: 89 },
    { label: 'Call Success Rate', value: '87.3%', percentage: 87 }
  ];

  const alerts = [
    { type: 'warning', message: 'SalesBot Pro response time increased by 15%', time: '2 hours ago' },
    { type: 'info', message: 'New high-performing campaign detected', time: '4 hours ago' },
    { type: 'error', message: 'Tech Support Bot success rate below threshold', time: '6 hours ago' }
  ];

  // Chart configurations
  const conversationVolumeConfig = {
    conversations: {
      label: "Conversations",
      color: "#8B5CF6",
    },
  };

  const sentimentConfig = {
    positive: {
      label: "Positive",
      color: "#10B981",
    },
    neutral: {
      label: "Neutral", 
      color: "#6B7280",
    },
    negative: {
      label: "Negative",
      color: "#EF4444",
    },
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <Sidebar
        activeModule="analytics"
        setActiveModule={handleModuleChange}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics Overview</h1>
              <p className="text-gray-400">Comprehensive analytics across all agents and campaigns</p>
            </div>
            <div className="flex space-x-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Today</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Summary Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {summaryStats.map((stat) => (
              <Card key={stat.label} className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 truncate">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-green-400">{stat.change}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Conversation Volume Chart */}
            <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Conversation Volume Trend</CardTitle>
                <CardDescription className="text-gray-400">Monthly conversation volume across all agents</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={conversationVolumeConfig} className="h-[300px]">
                  <LineChart data={conversationVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="conversations" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Sentiment Analysis */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Sentiment Analysis</CardTitle>
                <CardDescription className="text-gray-400">Customer sentiment distribution</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ChartContainer config={sentimentConfig} className="w-full h-[300px] flex items-center justify-center">
                  <PieChart width={280} height={280}>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={0}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Conversation Quality Metrics */}
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Conversation Quality Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {qualityMetrics.map((metric) => (
                  <div key={metric.label} className="space-y-3 p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">{metric.label}</span>
                      <span className="text-white font-semibold">{metric.value}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${metric.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Agents Performance */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Agents Performance</CardTitle>
                  <CardDescription className="text-gray-400">Performance metrics by agent</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400">
                  <Filter className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Agent</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Conversations</TableHead>
                      <TableHead className="text-gray-400">Success Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agentsData.map((agent) => (
                      <TableRow 
                        key={agent.name} 
                        className="border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                        onClick={() => navigate(`/agents/1/analytics`)}
                      >
                        <TableCell className="text-white font-medium">{agent.name}</TableCell>
                        <TableCell>
                          <Badge variant={agent.status === 'Active' ? 'default' : 'secondary'}>
                            {agent.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">{agent.conversations.toLocaleString()}</TableCell>
                        <TableCell className="text-gray-300">{agent.successRate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Campaigns Performance */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Campaigns Performance</CardTitle>
                  <CardDescription className="text-gray-400">Performance metrics by campaign</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400">
                  <Filter className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Campaign</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Sessions</TableHead>
                      <TableHead className="text-gray-400">Success Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaignsData.map((campaign) => (
                      <TableRow 
                        key={campaign.name} 
                        className="border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                        onClick={() => navigate(`/campaigns/1`)}
                      >
                        <TableCell className="text-white font-medium">{campaign.name}</TableCell>
                        <TableCell>
                          <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">{campaign.sessions.toLocaleString()}</TableCell>
                        <TableCell className="text-gray-300">{campaign.successRate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Anomaly & Alert Panel */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                Recent Alerts & Anomalies
              </CardTitle>
              <CardDescription className="text-gray-400">System-detected issues and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        alert.type === 'error' ? 'bg-red-400' :
                        alert.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`} />
                      <span className="text-white text-sm">{alert.message}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-xs">{alert.time}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsOverview;
