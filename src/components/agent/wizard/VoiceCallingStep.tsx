
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Phone, Plus, ExternalLink, MessageSquare, Mail, MessageCircle } from 'lucide-react';
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

const voiceOptions = [
  { value: 'sarah', label: 'Sarah (Female, American)', description: 'Warm and professional' },
  { value: 'alex', label: 'Alex (Male, British)', description: 'Clear and authoritative' },
  { value: 'maya', label: 'Maya (Female, Australian)', description: 'Friendly and energetic' },
  { value: 'david', label: 'David (Male, American)', description: 'Deep and reassuring' },
];

const ttsEngines = [
  { value: 'elevenlabs', label: 'ElevenLabs' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'azure', label: 'Azure' },
  { value: 'google', label: 'Google' },
];

const callRoutingOptions = [
  { value: 'direct', label: 'Direct Routing' },
  { value: 'queue', label: 'Queue Based' },
  { value: 'round-robin', label: 'Round Robin' },
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Voice & Calling</h2>
        <p className="text-sm text-gray-400 mb-6">
          Configure voice capabilities and select communication channels for your agent.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Configuration */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white">Voice Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enable-voice"
                  checked={data.enableVoice}
                  onCheckedChange={(checked) => onUpdate({ enableVoice: !!checked })}
                />
                <Label htmlFor="enable-voice" className="text-sm text-white">
                  Enable Voice Capabilities
                </Label>
              </div>
              <p className="text-xs text-gray-400">
                Allow your agent to make and receive voice calls.
              </p>

              {data.enableVoice && (
                <>
                  <div>
                    <Label className="text-sm text-white">Voice Selection</Label>
                    <Select
                      value={data.selectedVoice}
                      onValueChange={(value) => onUpdate({ selectedVoice: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {voiceOptions.map((voice) => (
                          <SelectItem key={voice.value} value={voice.value} className="text-white">
                            <div>
                              <div className="text-sm">{voice.label}</div>
                              <div className="text-xs text-gray-400">{voice.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm text-white">TTS Engine</Label>
                    <Select
                      value={data.ttsEngine}
                      onValueChange={(value) => onUpdate({ ttsEngine: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                        <SelectValue placeholder="Select TTS engine" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {ttsEngines.map((engine) => (
                          <SelectItem key={engine.value} value={engine.value} className="text-white">
                            <span className="text-sm">{engine.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Voice Settings */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white">Voice Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.enableVoice ? (
                <>
                  <div>
                    <Label className="text-sm text-white">
                      Pitch: {data.pitch}
                    </Label>
                    <Slider
                      value={[data.pitch]}
                      onValueChange={([value]) => onUpdate({ pitch: value })}
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-sm text-white">
                      Speed: {data.speed}
                    </Label>
                    <Slider
                      value={[data.speed]}
                      onValueChange={([value]) => onUpdate({ speed: value })}
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-sm text-white">
                      Emphasis: {data.emphasis}
                    </Label>
                    <Slider
                      value={[data.emphasis]}
                      onValueChange={([value]) => onUpdate({ emphasis: value })}
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-sm text-white">Call Routing</Label>
                    <Select
                      value={data.callRouting}
                      onValueChange={(value) => onUpdate({ callRouting: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                        <SelectValue placeholder="Select routing strategy" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {callRoutingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-white">
                            <span className="text-sm">{option.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">
                  Enable voice capabilities to configure voice settings.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Connections Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Communication Channels</h3>
            <p className="text-sm text-gray-400">
              Select and configure communication channels for your agent.
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
      </div>
    </div>
  );
};
