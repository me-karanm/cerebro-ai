
import { useState } from 'react';
import { Rocket, Globe, Code, Smartphone, Monitor, Settings, Copy, Download, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const DeploymentModule = () => {
  const [environment, setEnvironment] = useState('sandbox');
  const [widgetEnabled, setWidgetEnabled] = useState(true);
  const [mobileOptimized, setMobileOptimized] = useState(true);

  const embedCode = `<!-- Cerebro AI Widget -->
<script src="https://cdn.cerebro.ai/widget.js"></script>
<script>
  CerebroWidget.init({
    agentId: "cs-agent-001",
    apiKey: "pk_live_abc123...",
    environment: "${environment}",
    theme: {
      primaryColor: "#8B5CF6",
      position: "bottom-right",
      welcome: "Hello! How can I help you today?"
    }
  });
</script>`;

  const apiEndpoints = [
    { method: 'POST', endpoint: '/v1/conversations', description: 'Start a new conversation' },
    { method: 'GET', endpoint: '/v1/conversations/{id}', description: 'Get conversation details' },
    { method: 'POST', endpoint: '/v1/messages', description: 'Send a message' },
    { method: 'GET', endpoint: '/v1/agents', description: 'List available agents' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Deployment</h1>
          <p className="text-gray-400">Deploy your AI agents to live environments</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <Download className="w-4 h-4 mr-2" />
            Download SDK
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Rocket className="w-4 h-4 mr-2" />
            Deploy Now
          </Button>
        </div>
      </div>

      {/* Environment Selection */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Environment Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <Button
                variant={environment === 'sandbox' ? 'default' : 'outline'}
                onClick={() => setEnvironment('sandbox')}
                className={environment === 'sandbox' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}
              >
                Sandbox
              </Button>
              <Button
                variant={environment === 'live' ? 'default' : 'outline'}
                onClick={() => setEnvironment('live')}
                className={environment === 'live' ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'border-gray-700 text-gray-300 hover:bg-gray-800'}
              >
                Live
              </Button>
            </div>
            <Badge variant={environment === 'live' ? 'default' : 'secondary'} className={environment === 'live' ? 'bg-green-600' : ''}>
              {environment === 'live' ? '🟢 Production' : '🟡 Testing'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-lg p-3">
              <h4 className="text-white font-medium mb-1">API Endpoint</h4>
              <p className="text-gray-300 text-sm font-mono">
                {environment === 'live' ? 'api.cerebro.ai' : 'sandbox.cerebro.ai'}
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <h4 className="text-white font-medium mb-1">Rate Limit</h4>
              <p className="text-gray-300 text-sm">
                {environment === 'live' ? '1000/min' : '100/min'}
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <h4 className="text-white font-medium mb-1">Status</h4>
              <p className={`text-sm font-medium ${environment === 'live' ? 'text-green-400' : 'text-yellow-400'}`}>
                {environment === 'live' ? 'Active' : 'Testing'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Widget Configuration */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Monitor className="w-5 h-5 mr-2" />
              Widget Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Enable Widget</p>
                <p className="text-gray-400 text-sm">Show chat widget on your website</p>
              </div>
              <Switch checked={widgetEnabled} onCheckedChange={setWidgetEnabled} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-500 rounded border border-gray-600"></div>
                  <Input
                    value="#8B5CF6"
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
                <Select defaultValue="bottom-right">
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="top-left">Top Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Welcome Message</label>
              <Input
                defaultValue="Hello! How can I help you today?"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Avatar URL</label>
              <Input
                placeholder="https://example.com/avatar.png"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Mobile Optimized</p>
                <p className="text-gray-400 text-sm">Optimize for mobile devices</p>
              </div>
              <Switch checked={mobileOptimized} onCheckedChange={setMobileOptimized} />
            </div>
          </CardContent>
        </Card>

        {/* Device Targeting */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              Device Targeting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">Desktop</p>
                    <p className="text-gray-400 text-sm">Full-featured experience</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Mobile</p>
                    <p className="text-gray-400 text-sm">Touch-optimized interface</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 text-purple-400">📱</div>
                  <div>
                    <p className="text-white font-medium">Tablet</p>
                    <p className="text-gray-400 text-sm">Adapted for tablets</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-3">
              <h4 className="text-white font-medium mb-2">Browser Support</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Chrome 90+</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Firefox 88+</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Safari 14+</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Edge 90+</span>
                  <span className="text-green-400">✓</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Code */}
      <Tabs defaultValue="embed" className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="embed">Embed Code</TabsTrigger>
          <TabsTrigger value="api">API Endpoints</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="embed">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Embed Code
                </CardTitle>
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                value={embedCode}
                className="bg-gray-900 border-gray-700 text-gray-300 font-mono text-sm h-48 resize-none"
              />
              <div className="mt-4 flex items-center space-x-2">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Play className="w-3 h-3 mr-1" />
                  Test Integration
                </Button>
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Download className="w-3 h-3 mr-1" />
                  Download HTML
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">API Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant={endpoint.method === 'POST' ? 'default' : 'secondary'} className={endpoint.method === 'POST' ? 'bg-blue-600' : ''}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-purple-400 font-mono">{endpoint.endpoint}</code>
                    </div>
                    <p className="text-gray-400 text-sm">{endpoint.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Webhook Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Webhook URL</label>
                <Input
                  placeholder="https://your-api.com/cerebro-webhook"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Secret Token</label>
                <Input
                  type="password"
                  placeholder="webhook_secret_token"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Events</label>
                <div className="grid grid-cols-2 gap-2">
                  {['conversation.started', 'conversation.ended', 'message.received', 'agent.responded', 'error.occurred', 'session.timeout'].map(event => (
                    <label key={event} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-gray-300 text-sm">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
