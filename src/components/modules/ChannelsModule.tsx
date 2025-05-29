import { useState } from 'react';
import { Plus, Settings, Check, X, ExternalLink, Key, Webhook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AddIntegrationModal } from './AddIntegrationModal';

const integrations = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Connect to WhatsApp Business API for messaging',
    icon: '💬',
    category: 'Messaging',
    status: 'connected',
    config: { phone: '+1234567890', verified: true }
  },
  {
    id: 'sip',
    name: 'SIP/Telephony',
    description: 'Connect to SIP providers for voice calls',
    icon: '📞',
    category: 'Voice',
    status: 'disconnected',
    config: {}
  },
  {
    id: 'webchat',
    name: 'Web Chat Widget',
    description: 'Embed chat widget on your website',
    icon: '💻',
    category: 'Web',
    status: 'connected',
    config: { domain: 'example.com', embedded: true }
  },
  {
    id: 'email',
    name: 'Email Integration',
    description: 'Handle support tickets via email',
    icon: '📧',
    category: 'Email',
    status: 'configured',
    config: { email: 'support@example.com' }
  },
  {
    id: 'salesforce',
    name: 'Salesforce CRM',
    description: 'Sync leads and contacts with Salesforce',
    icon: '☁️',
    category: 'CRM',
    status: 'disconnected',
    config: {}
  },
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    description: 'Integrate with HubSpot for lead management',
    icon: '🧡',
    category: 'CRM',
    status: 'connected',
    config: { apiKey: '***-***-***', syncing: true }
  },
];

export const ChannelsModule = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [showWebhooks, setShowWebhooks] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-600 text-white">Connected</Badge>;
      case 'configured':
        return <Badge className="bg-blue-600 text-white">Configured</Badge>;
      case 'disconnected':
        return <Badge variant="secondary">Disconnected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Check className="w-4 h-4 text-green-400" />;
      case 'configured':
        return <Settings className="w-4 h-4 text-blue-400" />;
      case 'disconnected':
        return <X className="w-4 h-4 text-gray-400" />;
      default:
        return <X className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Channels & Integrations</h1>
          <p className="text-gray-400">Connect your AI agents to various communication platforms</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setShowWebhooks(!showWebhooks)}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Webhook className="w-4 h-4 mr-2" />
            Webhooks
          </Button>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Connected</p>
                <p className="text-2xl font-bold text-green-400">
                  {integrations.filter(i => i.status === 'connected').length}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Configured</p>
                <p className="text-2xl font-bold text-blue-400">
                  {integrations.filter(i => i.status === 'configured').length}
                </p>
              </div>
              <Settings className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Available</p>
                <p className="text-2xl font-bold text-white">{integrations.length}</p>
              </div>
              <div className="text-purple-400">🔗</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-white">
                  {new Set(integrations.map(i => i.category)).size}
                </p>
              </div>
              <div className="text-yellow-400">📁</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showWebhooks && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Webhook className="w-5 h-5 mr-2" />
              Webhook Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Webhook URL</label>
              <Input 
                placeholder="https://your-api.com/webhook"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Secret Key</label>
              <Input 
                type="password"
                placeholder="webhook_secret_key"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Events</label>
              <div className="space-y-2">
                {['conversation.started', 'conversation.ended', 'message.received', 'agent.responded'].map(event => (
                  <label key={event} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-300">{event}</span>
                  </label>
                ))}
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Save Webhook
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-white text-lg">{integration.name}</CardTitle>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {integration.category}
                    </Badge>
                  </div>
                </div>
                {getStatusIcon(integration.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm">{integration.description}</p>
              
              <div className="flex items-center justify-between">
                {getStatusBadge(integration.status)}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    onClick={() => setSelectedIntegration(integration.id)}
                  >
                    <Settings className="w-3 h-3 mr-1" />
                    Configure
                  </Button>
                  {integration.status === 'connected' && (
                    <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Configuration Details */}
              {integration.status !== 'disconnected' && (
                <div className="bg-gray-700 rounded-lg p-3 text-sm">
                  {integration.id === 'whatsapp' && (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Phone:</span>
                        <span className="text-white">{integration.config.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Verified:</span>
                        <span className="text-green-400">✓ Yes</span>
                      </div>
                    </div>
                  )}
                  {integration.id === 'webchat' && (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Domain:</span>
                        <span className="text-white">{integration.config.domain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-green-400">Active</span>
                      </div>
                    </div>
                  )}
                  {integration.id === 'hubspot' && (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">API Key:</span>
                        <span className="text-white">{integration.config.apiKey}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Syncing:</span>
                        <span className="text-green-400">✓ Active</span>
                      </div>
                    </div>
                  )}
                  {integration.id === 'email' && (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Email:</span>
                        <span className="text-white">{integration.config.email}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SDK Snippets */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Key className="w-5 h-5 mr-2" />
            SDK & API Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-white font-medium mb-2">JavaScript SDK</h4>
            <Textarea
              readOnly
              value={`<script src="https://cdn.cerebro.ai/widget.js"></script>
<script>
  CerebroWidget.init({
    agentId: 'your-agent-id',
    apiKey: 'your-api-key',
    theme: 'dark'
  });
</script>`}
              className="bg-gray-900 border-gray-700 text-gray-300 font-mono text-sm h-24"
            />
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">REST API</h4>
            <Textarea
              readOnly
              value={`curl -X POST https://api.cerebro.ai/v1/conversations \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Hello", "agent_id": "your-agent-id"}'`}
              className="bg-gray-900 border-gray-700 text-gray-300 font-mono text-sm h-24"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Integration Modal */}
      <AddIntegrationModal 
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />
    </div>
  );
};
