
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Phone, Plus, ExternalLink, MessageSquare, Mail, MessageCircle, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AgentWizardData } from './useAgentWizard';
import { useIntegrationsStore } from '@/store/integrationsStore';
import { useNavigate } from 'react-router-dom';

interface VoiceCallingStepProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

// Mock voice studio voices - in a real app, this would come from a Voice Studio API/store
const voiceStudioVoices = [
  { id: 'voice-1', name: 'Aria', gender: 'Female', accent: 'American', description: 'Professional and warm' },
  { id: 'voice-2', name: 'Marcus', gender: 'Male', accent: 'British', description: 'Clear and authoritative' },
  { id: 'voice-3', name: 'Sofia', gender: 'Female', accent: 'Spanish', description: 'Friendly and energetic' },
  { id: 'voice-4', name: 'Chen', gender: 'Male', accent: 'Neutral', description: 'Calm and technical' },
];

export const VoiceCallingStep = ({ data, onUpdate }: VoiceCallingStepProps) => {
  const navigate = useNavigate();
  const { 
    phoneNumbers, 
    whatsappAccounts, 
    emailAccounts, 
    telegramBots, 
    wechatAccounts 
  } = useIntegrationsStore();

  const updateConnection = (connection: string, field: string, value: any) => {
    onUpdate({
      connections: {
        ...data.connections,
        [connection]: {
          ...data.connections[connection as keyof typeof data.connections],
          [field]: value,
        },
      },
    });
  };

  const handleCreateNewIntegration = () => {
    // Navigate to integrations page to create new integration
    window.open('/channels', '_blank');
  };

  const handlePlayVoice = (voiceId: string) => {
    // In a real implementation, this would play a preview of the voice
    console.log('Playing voice preview for:', voiceId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Communication Channels</h2>
        <p className="text-sm text-gray-400 mb-6">
          Select and configure communication channels for your agent.
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Available Channels</h3>
          <p className="text-sm text-gray-400">
            Enable the channels where your agent will be available.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/channels')}
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Manage Integrations
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phone/Call Integration */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-base text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Phone Calls</span>
              </div>
              <Switch
                checked={data.connections.call?.enabled || false}
                onCheckedChange={(checked) => updateConnection('call', 'enabled', checked)}
              />
            </CardTitle>
          </CardHeader>
          {data.connections.call?.enabled && (
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm text-white">Select Phone Number</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCreateNewIntegration}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 h-7 px-2 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add New
                  </Button>
                </div>
                
                {phoneNumbers.length > 0 ? (
                  <Select
                    value={data.connections.call?.selectedPhoneNumberId || ''}
                    onValueChange={(value) => updateConnection('call', 'selectedPhoneNumberId', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Choose a phone number" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {phoneNumbers.map((phone) => (
                        <SelectItem key={phone.id} value={phone.id} className="text-white">
                          <div className="flex items-center space-x-2">
                            <span>{phone.number}</span>
                            <Badge variant={phone.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                              {phone.type}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-center py-4 border border-dashed border-gray-600 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">No phone numbers available</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCreateNewIntegration}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Purchase Phone Number
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* WhatsApp Integration */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-base text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </div>
              <Switch
                checked={data.connections.whatsapp?.enabled || false}
                onCheckedChange={(checked) => updateConnection('whatsapp', 'enabled', checked)}
              />
            </CardTitle>
          </CardHeader>
          {data.connections.whatsapp?.enabled && (
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm text-white">Select WhatsApp Account</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCreateNewIntegration}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 h-7 px-2 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add New
                  </Button>
                </div>
                
                {whatsappAccounts.length > 0 ? (
                  <Select
                    value={data.connections.whatsapp?.selectedAccountId || ''}
                    onValueChange={(value) => updateConnection('whatsapp', 'selectedAccountId', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Choose a WhatsApp account" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {whatsappAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id} className="text-white">
                          <div>
                            <div className="text-sm">{account.businessName}</div>
                            <div className="text-xs text-gray-400">{account.phoneNumber}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-center py-4 border border-dashed border-gray-600 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">No WhatsApp accounts available</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCreateNewIntegration}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Connect WhatsApp
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Email Integration */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-base text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </div>
              <Switch
                checked={data.connections.email?.enabled || false}
                onCheckedChange={(checked) => updateConnection('email', 'enabled', checked)}
              />
            </CardTitle>
          </CardHeader>
          {data.connections.email?.enabled && (
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm text-white">Select Email Account</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCreateNewIntegration}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 h-7 px-2 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add New
                  </Button>
                </div>
                
                {emailAccounts.length > 0 ? (
                  <Select
                    value={data.connections.email?.selectedAccountId || ''}
                    onValueChange={(value) => updateConnection('email', 'selectedAccountId', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Choose an email account" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {emailAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id} className="text-white">
                          <div>
                            <div className="text-sm">{account.email}</div>
                            <div className="text-xs text-gray-400">{account.smtpHost}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-center py-4 border border-dashed border-gray-600 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">No email accounts available</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCreateNewIntegration}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Connect Email
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Telegram Integration */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-base text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Telegram</span>
              </div>
              <Switch
                checked={data.connections.telegram?.enabled || false}
                onCheckedChange={(checked) => updateConnection('telegram', 'enabled', checked)}
              />
            </CardTitle>
          </CardHeader>
          {data.connections.telegram?.enabled && (
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm text-white">Select Telegram Bot</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCreateNewIntegration}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 h-7 px-2 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add New
                  </Button>
                </div>
                
                {telegramBots.length > 0 ? (
                  <Select
                    value={data.connections.telegram?.selectedBotId || ''}
                    onValueChange={(value) => updateConnection('telegram', 'selectedBotId', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Choose a Telegram bot" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {telegramBots.map((bot) => (
                        <SelectItem key={bot.id} value={bot.id} className="text-white">
                          <div>
                            <div className="text-sm">{bot.botName}</div>
                            <div className="text-xs text-gray-400">{bot.username}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-center py-4 border border-dashed border-gray-600 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">No Telegram bots available</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCreateNewIntegration}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Telegram Bot
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Voice Selection Section - Only show if Call is enabled */}
      {data.connections.call?.enabled && (
        <div className="mt-8">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">Voice Selection</h3>
            <p className="text-sm text-gray-400">
              Choose a voice for your agent's phone calls from your Voice Studio.
            </p>
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white">Available Voices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {voiceStudioVoices.map((voice) => (
                  <div
                    key={voice.id}
                    onClick={() => onUpdate({ selectedVoice: voice.id })}
                    className={`p-4 rounded-lg cursor-pointer transition-all border ${
                      data.selectedVoice === voice.id
                        ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30'
                        : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-white">{voice.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {voice.gender}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {voice.accent}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">{voice.description}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayVoice(voice.id);
                        }}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center pt-4 border-t border-gray-600">
                <Button
                  variant="outline"
                  onClick={() => navigate('/voice-studio')}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Manage Voices in Voice Studio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
