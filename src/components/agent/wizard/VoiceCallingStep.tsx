import { Phone, MessageCircle, Mail, Globe, Plus, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AgentWizardData } from './useAgentWizard';

interface VoiceCallingStepProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

// Mock data for available integrations
const phoneNumbers = [
  { id: 'phone1', number: '+1 (555) 123-4567', region: 'US' },
  { id: 'phone2', number: '+1 (555) 987-6543', region: 'US' },
  { id: 'phone3', number: '+44 20 7946 0958', region: 'UK' },
];

const whatsappAccounts = [
  { id: 'wa1', name: 'Business Main', number: '+1 (555) 123-4567' },
  { id: 'wa2', name: 'Customer Support', number: '+1 (555) 987-6543' },
];

const emailAccounts = [
  { id: 'email1', name: 'Support Email', address: 'support@company.com' },
  { id: 'email2', name: 'Sales Email', address: 'sales@company.com' },
];

const widgetAccounts = [
  { id: 'widget1', name: 'Main Website', domain: 'company.com' },
  { id: 'widget2', name: 'Support Portal', domain: 'support.company.com' },
];

const channels = [
  {
    id: 'call',
    name: 'Phone Calls',
    description: 'Enable voice calling capabilities',
    icon: Phone,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    accounts: phoneNumbers,
    accountKey: 'selectedPhoneNumberId' as const,
    accountLabel: 'Phone Number',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Connect via WhatsApp Business',
    icon: MessageCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    accounts: whatsappAccounts,
    accountKey: 'selectedAccountId' as const,
    accountLabel: 'WhatsApp Account',
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Handle email communications',
    icon: Mail,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    accounts: emailAccounts,
    accountKey: 'selectedAccountId' as const,
    accountLabel: 'Email Account',
  },
  {
    id: 'widget',
    name: 'Website Widget',
    description: 'Embed chat widget on websites',
    icon: Globe,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    accounts: widgetAccounts,
    accountKey: 'selectedAccountId' as const,
    accountLabel: 'Widget Configuration',
  },
];

export const VoiceCallingStep = ({ data, onUpdate }: VoiceCallingStepProps) => {
  const handleChannelToggle = (channelId: string, enabled: boolean) => {
    const updates = {
      connections: {
        ...data.connections,
        [channelId]: {
          ...data.connections[channelId as keyof typeof data.connections],
          enabled,
        },
      },
    };
    onUpdate(updates);
  };

  const handleAccountSelection = (channelId: string, accountId: string) => {
    const channel = channels.find(c => c.id === channelId);
    if (!channel) return;

    const updates = {
      connections: {
        ...data.connections,
        [channelId]: {
          ...data.connections[channelId as keyof typeof data.connections],
          [channel.accountKey]: accountId,
        },
      },
    };
    onUpdate(updates);
  };

  const getChannelConnection = (channelId: string) => {
    return data.connections[channelId as keyof typeof data.connections];
  };

  const enabledChannelsCount = Object.values(data.connections).filter(conn => conn.enabled).length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Communication Channels</h2>
        <p className="text-gray-400 text-lg">
          Configure how users will interact with your agent across different platforms.
        </p>
        {enabledChannelsCount === 0 && (
          <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
            <p className="text-red-400 text-sm">
              <strong>Required:</strong> At least one communication channel must be enabled.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {channels.map((channel) => {
          const connection = getChannelConnection(channel.id);
          const isEnabled = connection?.enabled || false;
          const Icon = channel.icon;

          return (
            <Card key={channel.id} className={`bg-gray-800 border-gray-700 transition-all duration-200 ${
              isEnabled ? 'ring-1 ring-purple-500/30' : ''
            }`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${channel.bgColor}`}>
                      <Icon className={`w-5 h-5 ${channel.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{channel.name}</CardTitle>
                      <p className="text-gray-400 text-sm">{channel.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleChannelToggle(channel.id, checked)}
                  />
                </div>
              </CardHeader>
              
              {isEnabled && (
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white text-sm font-medium">
                      {channel.accountLabel}
                    </Label>
                    <Select
                      value={connection[channel.accountKey] || ''}
                      onValueChange={(value) => handleAccountSelection(channel.id, value)}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                        <SelectValue placeholder={`Select ${channel.accountLabel.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {channel.accounts.map((account: any) => (
                          <SelectItem key={account.id} value={account.id} className="text-white">
                            <div className="flex flex-col py-1">
                              <span className="font-medium">
                                {account.name || account.number || account.address || account.domain}
                              </span>
                              {(account.number || account.address || account.region) && (
                                <span className="text-xs text-gray-400">
                                  {account.address || account.number} 
                                  {account.region && ` • ${account.region}`}
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {!connection[channel.accountKey] && (
                      <p className="text-red-400 text-xs mt-1">
                        Please select a {channel.accountLabel.toLowerCase()}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Integration
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>

                  {channel.id === 'call' && (
                    <div className="mt-4 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                      <p className="text-blue-400 text-xs">
                        <strong>Note:</strong> Voice calls require additional setup and may incur charges based on usage.
                      </p>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {enabledChannelsCount > 0 && (
        <div className="mt-6 p-4 bg-green-900/20 border border-green-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <Badge variant="default" className="bg-green-600">
              {enabledChannelsCount} Channel{enabledChannelsCount !== 1 ? 's' : ''} Enabled
            </Badge>
            <p className="text-green-400 text-sm">
              Your agent will be available across the selected communication channels.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
