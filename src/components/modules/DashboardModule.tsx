
import { Users, MessageCircle, DollarSign, Zap, Phone, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export const DashboardModule = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Overview of your AI agent platform</p>
        </div>
        <div className="flex items-center space-x-3">
          <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-cyan-400" />
          <span className="text-sm text-gray-400">admin@cerebroai.com</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Agents</p>
                <p className="text-2xl font-bold text-white">05</p>
              </div>
              <Users className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Conversations</p>
                <p className="text-2xl font-bold text-white">1,248</p>
              </div>
              <MessageCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Cost</p>
                <p className="text-2xl font-bold text-white">$205.99</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Channels</p>
                <p className="text-2xl font-bold text-white">350</p>
              </div>
              <Zap className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Credits Used</p>
                <p className="text-2xl font-bold text-white">1,248</p>
              </div>
              <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">C</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Setup */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Agent Setup
              <span className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Active
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">SalesBot Pro</h3>
                  <p className="text-gray-400 text-sm">Last updated: 2 hours ago</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">AI Credits Used</span>
                  <span className="text-white">600/10,000</span>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">6%</div>
                  <div className="text-gray-400 text-sm">Used</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Agent Intelligence</span>
                    <span className="text-cyan-400 text-sm">Advanced</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Voice Naturality</span>
                    <span className="text-cyan-400 text-sm">High</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Response Rate</span>
                    <span className="text-cyan-400 text-sm">Optimal</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </div>
            </div>
            
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
              + Create New Agent
            </Button>
          </CardContent>
        </Card>

        {/* Phone Numbers & Sentiment */}
        <div className="space-y-6">
          {/* Phone Numbers */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Phone Numbers
                <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  + Purchase New Number
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">+1(555)123-4567</span>
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Airtel</span>
                  </div>
                  <div className="flex items-center text-green-400 text-sm mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Verified
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className="text-gray-400">Monthly Cost</div>
                      <div className="text-white">$4.99</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Total Calls</div>
                      <div className="text-white">856</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Success Rate</div>
                      <div className="text-white">68.2%</div>
                    </div>
                  </div>
                  <div className="text-xs text-cyan-400 mt-2">
                    Assigned to SalesBot Pro
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">+1(555)987-6543</span>
                  </div>
                  <div className="flex items-center text-green-400 text-sm mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Verified
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className="text-gray-400">Monthly Cost</div>
                      <div className="text-white">$4.99</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Total Calls</div>
                      <div className="text-white">392</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Success Rate</div>
                      <div className="text-white">-</div>
                    </div>
                  </div>
                  <div className="text-xs text-cyan-400 mt-2">
                    Assigned to SupportBot
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Analysis */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">😊</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Positive Sentiment</div>
                    <div className="text-gray-400 text-sm">42% of conversations</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">😐</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Neutral Sentiment</div>
                    <div className="text-gray-400 text-sm">35% of conversations</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">😞</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Negative Sentiment</div>
                    <div className="text-gray-400 text-sm">23% of conversations</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Conversation Quality */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Conversation Quality</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Average Call Duration</span>
                <span className="text-white font-medium">4m 12s</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Customer Engagement</span>
                <span className="text-white font-medium">72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Call Success Rate</span>
                <span className="text-white font-medium">59.1%</span>
              </div>
              <Progress value={59} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
