
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
    status: 'connected' as const,
    config: { phone: '+1234567890', verified: true }
  },
  {
    id: 'sms',
    name: 'SMS',
    description: 'Send and receive SMS messages',
    icon: '📱',
    category: 'Messaging',
    status: 'connected' as const,
    config: { phone: '+1555-123-4567', provider: 'Twilio' }
  },
  {
    id: 'email',
    name: 'Email Integration',
    description: 'Handle support tickets via email',
    icon: '📧',
    category: 'Email',
    status: 'configured' as const,
    config: { email: 'support@example.com' }
  },
  {
    id: 'webchat',
    name: 'Website Widget',
    description: 'Embed chat widget on your website',
    icon: '💻',
    category: 'Web',
    status: 'connected' as const,
    config: { domain: 'example.com', embedded: true }
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

  // Calculate stats based on actual integration statuses
  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const configuredCount = integrations.filter(i => i.status === 'configured').length;
  const disconnectedCount = integrations.length - connectedCount - configuredCount;

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
          <div className="text-2xl font-bold text-green-400">{connectedCount}</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-400">Configured</div>
          <div className="text-2xl font-bold text-blue-400">{configuredCount}</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="text-sm text-gray-400">Disconnected</div>
          <div className="text-2xl font-bold text-gray-400">{disconnectedCount}</div>
        </div>
      </div>

      {/* Integrations Grid */}
      <IntegrationsGrid 
        integrations={filteredIntegrations}
        onConfigureIntegration={handleConfigureIntegration}
      />
    </div>
  );
};
