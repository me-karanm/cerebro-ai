
import { useState } from 'react';
import { Phone, MessageCircle, Mail, Plus, Monitor, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AddIntegrationModal } from '@/components/modules/AddIntegrationModal';
import { useIntegrationsStore } from '@/store/integrationsStore';
import { AgentWizardData } from './useAgentWizard';

interface VoiceCallingStepProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

const availableChannels = [
  {
    id: 'call',
    name: 'Phone Calls',
    icon: Phone,
    description: 'Handle voice calls with AI agent',
    category: 'Voice',
    color: 'bg-blue-500'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    icon: MessageCircle,
    description: 'Connect to WhatsApp Business API',
    category: 'Messaging',
    color: 'bg-green-500'
  },
  {
    id: 'email',
    name: 'Email Integration',
    icon: Mail,
    description: 'Handle email communications',
    category: 'Email',
    color: 'bg-purple-500'
  },
  {
    id: 'widget',
    name: 'Web Widget',
    icon: Monitor,
    description: 'Embed chat widget on your website',
    category: 'Web',
    color: 'bg-orange-500'
  }
];

export const VoiceCallingStep = ({ data, onUpdate }: VoiceCallingStepProps) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { phoneNumbers, whatsappAccounts, emailAccounts } = useIntegrationsStore();

  const handleConnectionToggle = (channelId: string, enabled: boolean) => {
    onUpdate({
      connections: {
        ...data.connections,
        [channelId]: {
          ...data.connections[channelId as keyof typeof data.connections],
          enabled
        }
      }
    });
  };

  const handleAccountSelect = (channelId: string, accountId: string) => {
    const connectionKey = channelId === 'call' ? 'selectedPhoneNumberId' : 'selectedAccountId';
    onUpdate({
      connections: {
        ...data.connections,
        [channelId]: {
          ...data.connections[channelId as keyof typeof data.connections],
          [connectionKey]: accountId
        }
      }
    });
  };

  const getAvailableAccounts = (channelId: string) => {
    switch (channelId) {
      case 'call':
        return phoneNumbers;
      case 'whatsapp':
        return whatsappAccounts;
      case 'email':
        return emailAccounts;
      case 'widget':
        return []; // Widget doesn't need account selection
      default:
        return [];
    }
  };

  const getAccountDisplayName = (channelId: string, account: any) => {
    switch (channelId) {
      case 'call':
        return account.number;
      case 'whatsapp':
        return account.phoneNumber;
      case 'email':
        return account.email;
      default:
        return account.name || account.id;
    }
  };

  const isChannelConfigured = (channelId: string) => {
    if (channelId === 'widget') return true; // Widget is always available
    const accounts = getAvailableAccounts(channelId);
    return accounts.length > 0;
  };

  const handleWidgetPreview = () => {
    console.log('Opening widget preview...');
    // Mock widget preview functionality
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Communication Channels</h2>
        <p className="text-gray-400 mb-6">
          Configure how your agent will communicate with users across different platforms.
        </p>
      </div>

      {/* Channel Configuration */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Available Channels</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddModal(true)}
            className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableChannels.map((channel) => {
              const IconComponent = channel.icon;
              const isConfigured = isChannelConfigured(channel.id);
              const connectionData = data.connections[channel.id as keyof typeof data.connections];
              const isEnabled = connectionData?.enabled || false;

              return (
                <Card key={channel.id} className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 ${channel.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-medium">{channel.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={isConfigured ? "default" : "secondary"}
                              className={isConfigured ? "bg-green-600" : ""}
                            >
                              {isConfigured ? "Available" : "Not Configured"}
                            </Badge>
                            <Switch
                              checked={isEnabled}
                              onCheckedChange={(checked) => handleConnectionToggle(channel.id, checked)}
                              disabled={!isConfigured}
                            />
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{channel.description}</p>
                        
                        {isEnabled && isConfigured && (
                          <div className="space-y-2">
                            {channel.id === 'call' && (
                              <>
                                <Label className="text-gray-300 text-xs">Select Phone Number:</Label>
                                <div className="flex space-x-2">
                                  <Select
                                    value={(connectionData as any)?.selectedPhoneNumberId || ''}
                                    onValueChange={(value) => handleAccountSelect(channel.id, value)}
                                  >
                                    <SelectTrigger className="bg-gray-600 border-gray-500 text-white text-sm h-8 flex-1">
                                      <SelectValue placeholder="Choose number" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-600 border-gray-500">
                                      {getAvailableAccounts(channel.id).map((account: any) => (
                                        <SelectItem key={account.id} value={account.id}>
                                          {getAccountDisplayName(channel.id, account)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowPurchaseModal(true)}
                                    className="border-gray-500 text-gray-300 hover:bg-gray-600 text-xs h-8 px-2"
                                  >
                                    <ShoppingCart className="w-3 h-3 mr-1" />
                                    Buy
                                  </Button>
                                </div>
                              </>
                            )}
                            
                            {channel.id === 'widget' && (
                              <div className="flex items-center justify-between">
                                <div className="text-xs text-green-400">
                                  Widget will be automatically configured
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={handleWidgetPreview}
                                  className="border-gray-500 text-gray-300 hover:bg-gray-600 text-xs h-8"
                                >
                                  Preview
                                </Button>
                              </div>
                            )}
                            
                            {channel.id !== 'call' && channel.id !== 'widget' && (
                              <>
                                <Label className="text-gray-300 text-xs">Select Account:</Label>
                                <Select
                                  value={(connectionData as any)?.selectedAccountId || ''}
                                  onValueChange={(value) => handleAccountSelect(channel.id, value)}
                                >
                                  <SelectTrigger className="bg-gray-600 border-gray-500 text-white text-sm h-8">
                                    <SelectValue placeholder="Choose account" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-600 border-gray-500">
                                    {getAvailableAccounts(channel.id).map((account: any) => (
                                      <SelectItem key={account.id} value={account.id}>
                                        {getAccountDisplayName(channel.id, account)}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </>
                            )}
                          </div>
                        )}
                        
                        {!isConfigured && channel.id !== 'widget' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAddModal(true)}
                            className="border-gray-500 text-gray-300 hover:bg-gray-600 text-xs h-8"
                          >
                            Setup {channel.name}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AddIntegrationModal 
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />
    </div>
  );
};
