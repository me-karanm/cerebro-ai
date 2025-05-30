import { useState } from 'react';
import { TrendingUp, TrendingDown, Users, MessageCircle, Clock, ThumbsUp, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const conversationData = [
  { name: 'Mon', conversations: 240, success: 92 },
  { name: 'Tue', conversations: 280, success: 89 },
  { name: 'Wed', conversations: 320, success: 94 },
  { name: 'Thu', conversations: 290, success: 91 },
  { name: 'Fri', conversations: 350, success: 96 },
  { name: 'Sat', conversations: 180, success: 88 },
  { name: 'Sun', conversations: 160, success: 85 },
];

const channelData = [
  { name: 'Web Chat', value: 45, color: '#8B5CF6' },
  { name: 'Phone', value: 30, color: '#3B82F6' },
  { name: 'WhatsApp', value: 15, color: '#10B981' },
  { name: 'Email', value: 10, color: '#F59E0B' },
];

const sentimentData = [
  { name: 'Positive', value: 68, color: '#10B981' },
  { name: 'Neutral', value: 25, color: '#6B7280' },
  { name: 'Negative', value: 7, color: '#EF4444' },
];

export const AnalyticsModule = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedAgent, setSelectedAgent] = useState('all');

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">Analytics</h1>
          <p className="text-gray-400 text-sm">Track performance metrics and insights</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-full sm:w-48 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Agents</SelectItem>
              <SelectItem value="1">Customer Support Agent</SelectItem>
              <SelectItem value="2">Sales Assistant</SelectItem>
              <SelectItem value="3">Technical Support</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-32 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="1d">24h</SelectItem>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-400 truncate">Total Conversations</p>
                <p className="text-lg sm:text-2xl font-bold text-white">2,847</p>
                <div className="flex items-center text-xs sm:text-sm text-green-400 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.3%
                </div>
              </div>
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-400 truncate">Success Rate</p>
                <p className="text-lg sm:text-2xl font-bold text-white">92.4%</p>
                <div className="flex items-center text-xs sm:text-sm text-green-400 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.1%
                </div>
              </div>
              <ThumbsUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-400 truncate">Avg Response Time</p>
                <p className="text-lg sm:text-2xl font-bold text-white">1.2s</p>
                <div className="flex items-center text-xs sm:text-sm text-red-400 mt-1">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  +0.3s
                </div>
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-400 truncate">Active Users</p>
                <p className="text-lg sm:text-2xl font-bold text-white">1,456</p>
                <div className="flex items-center text-xs sm:text-sm text-green-400 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.7%
                </div>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Conversation Trends */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm sm:text-base">Conversation Trends</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <div className="h-64 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversationData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversations" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm sm:text-base">Success Rate Over Time</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <div className="h-64 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversationData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px'
                    }} 
                  />
                  <Bar dataKey="success" fill="#10B981" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Channel Distribution */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm sm:text-base">Channel Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <div className="h-64 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    dataKey="value"
                    label={({ name, value }: any) => `${name}: ${value}%`}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm sm:text-base">Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <div className="h-64 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    dataKey="value"
                    label={({ name, value }: any) => `${name}: ${value}%`}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm sm:text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <div className="space-y-2 sm:space-y-4">
            {[
              { time: '2 min ago', agent: 'Customer Support Agent', action: 'Handled customer inquiry', status: 'success' },
              { time: '5 min ago', agent: 'Sales Assistant', action: 'Qualified new lead', status: 'success' },
              { time: '12 min ago', agent: 'Technical Support', action: 'Escalated complex issue', status: 'warning' },
              { time: '18 min ago', agent: 'Customer Support Agent', action: 'Resolved billing question', status: 'success' },
              { time: '25 min ago', agent: 'Sales Assistant', action: 'Scheduled demo call', status: 'success' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    activity.status === 'success' ? 'bg-green-400' :
                    activity.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-xs sm:text-sm truncate">{activity.action}</p>
                    <p className="text-gray-400 text-xs truncate">{activity.agent}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-xs flex-shrink-0 ml-2">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
