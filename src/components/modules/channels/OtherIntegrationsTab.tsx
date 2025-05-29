
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IntegrationsGrid } from './IntegrationsGrid';

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
    id: 'telegram',
    name: 'Telegram Bot',
    description: 'Create automated bot for Telegram',
    icon: '📱',
    category: 'Messaging',
    status: 'disconnected',
    config: {}
  },
  {
    id: 'wechat',
    name: 'WeChat',
    description: 'Connect to WeChat for messaging',
    icon: '💚',
    category: 'Messaging',
    status: 'disconnected',
    config: {}
  },
  {
    id: 'facebook',
    name: 'Facebook Messenger',
    description: 'Integrate with Facebook Messenger',
    icon: '📘',
    category: 'Messaging',
    status: 'disconnected',
    config: {}
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Connect to Slack workspace for notifications',
    icon: '📢',
    category: 'Productivity',
    status: 'disconnected',
    config: {}
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
  {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Connect to Zendesk for ticket management',
    icon: '🎫',
    category: 'Helpdesk',
    status: 'disconnected',
    config: {}
  },
  {
    id: 'webhook',
    name: 'Custom Webhook',
    description: 'Send data to custom webhook endpoints',
    icon: '🔗',
    category: 'Custom',
    status: 'disconnected',
    config: {}
  },
];

interface OtherIntegrationsTabProps {
  onAddIntegration: () => void;
}

export const OtherIntegrationsTab = ({ onAddIntegration }: OtherIntegrationsTabProps) => {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...new Set(integrations.map(i => i.category))];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || integration.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleConfigureIntegration = (id: string) => {
    setSelectedIntegration(id);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Messaging': 'bg-blue-600',
      'Web': 'bg-green-600',
      'Email': 'bg-purple-600',
      'Productivity': 'bg-orange-600',
      'CRM': 'bg-pink-600',
      'Helpdesk': 'bg-yellow-600',
      'Custom': 'bg-gray-600',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search integrations..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          onClick={onAddIntegration}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-400">Total Integrations</div>
          <div className="text-2xl font-bold text-white">{integrations.length}</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-400">Connected</div>
          <div className="text-2xl font-bold text-green-400">{integrations.filter(i => i.status === 'connected').length}</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-400">Configured</div>
          <div className="text-2xl font-bold text-blue-400">{integrations.filter(i => i.status === 'configured').length}</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-400">Disconnected</div>
          <div className="text-2xl font-bold text-gray-400">{integrations.filter(i => i.status === 'disconnected').length}</div>
        </div>
      </div>

      {/* Integrations Grid */}
      <IntegrationsGrid 
        integrations={filteredIntegrations}
        onConfigureIntegration={handleConfigureIntegration}
        getCategoryColor={getCategoryColor}
      />
    </div>
  );
};
