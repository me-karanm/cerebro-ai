
import { useState } from 'react';
import { ChannelsHeader } from './channels/ChannelsHeader';
import { ChannelsStats } from './channels/ChannelsStats';
import { WebhooksSection } from './channels/WebhooksSection';
import { IntegrationsGrid } from './channels/IntegrationsGrid';
import { SDKSection } from './channels/SDKSection';
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

  const handleConfigureIntegration = (id: string) => {
    setSelectedIntegration(id);
  };

  const handleToggleWebhooks = () => {
    setShowWebhooks(!showWebhooks);
  };

  const handleAddIntegration = () => {
    setShowAddModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      <ChannelsHeader 
        onAddIntegration={handleAddIntegration}
        onToggleWebhooks={handleToggleWebhooks}
        showWebhooks={showWebhooks}
      />

      <ChannelsStats integrations={integrations} />

      {showWebhooks && <WebhooksSection />}

      <IntegrationsGrid 
        integrations={integrations}
        onConfigureIntegration={handleConfigureIntegration}
      />

      <SDKSection />

      <AddIntegrationModal 
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />
    </div>
  );
};
