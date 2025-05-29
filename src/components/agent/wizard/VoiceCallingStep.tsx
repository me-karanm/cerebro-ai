
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Phone, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AgentWizardData } from './useAgentWizard';

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

// Mock data for purchased phone numbers
const purchasedNumbers = [
  { id: '1', number: '+1 (555) 123-4567', type: 'Local', location: 'New York, NY' },
  { id: '2', number: '+1 (555) 987-6543', type: 'Toll-Free', location: 'US National' },
  { id: '3', number: '+44 20 7946 0958', type: 'Local', location: 'London, UK' },
];

export const VoiceCallingStep = ({ data, onUpdate }: VoiceCallingStepProps) => {
  // Add safety check for connections
  const connections = data.connections || {
    call: { enabled: false, apiKey: '', webhookUrl: '', selectedPhoneNumber: '' },
    whatsapp: { enabled: false, apiKey: '', phoneNumber: '', webhookUrl: '' },
    telegram: { enabled: false, botToken: '', webhookUrl: '' },
    email: { enabled: false, smtpHost: '', smtpPort: '', username: '', password: '' },
  };

  const updateConnection = (connection: string, field: string, value: any) => {
    onUpdate({
      connections: {
        ...connections,
        [connection]: {
          ...connections[connection as keyof typeof connections],
          [field]: value,
        },
      },
    });
  };

  const handlePurchaseNewNumber = () => {
    // This would typically open a modal or navigate to a purchase flow
    console.log('Opening phone number purchase flow...');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Voice & Calling</h2>
        <p className="text-sm text-gray-400 mb-6">
          Configure voice capabilities and calling features for your agent.
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

          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              📞 <strong>Note:</strong> Phone numbers will be assigned after agent creation.
            </p>
          </div>
        </div>
      </div>

      {/* Connections Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Connections</h3>
        <p className="text-sm text-gray-400 mb-6">
          Configure external communication channels for your agent.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Call Connection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center justify-between">
                Call Integration
                <Switch
                  checked={connections.call?.enabled || false}
                  onCheckedChange={(checked) => updateConnection('call', 'enabled', checked)}
                />
              </CardTitle>
            </CardHeader>
            {connections.call?.enabled && (
              <CardContent className="space-y-4">
                {/* Phone Numbers Section */}
                <div>
                  <Label className="text-sm text-white">Select Phone Number</Label>
                  <div className="mt-2 space-y-3">
                    <RadioGroup
                      value={connections.call?.selectedPhoneNumber || ''}
                      onValueChange={(value) => updateConnection('call', 'selectedPhoneNumber', value)}
                    >
                      {purchasedNumbers.map((phoneNumber) => (
                        <div key={phoneNumber.id} className="flex items-center space-x-2 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                          <RadioGroupItem value={phoneNumber.id} id={phoneNumber.id} />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-white font-medium">{phoneNumber.number}</span>
                              <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">
                                {phoneNumber.type}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{phoneNumber.location}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    <Button
                      variant="outline"
                      onClick={handlePurchaseNewNumber}
                      className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Purchase New Number
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-white">API Key</Label>
                  <Input
                    type="password"
                    value={connections.call?.apiKey || ''}
                    onChange={(e) => updateConnection('call', 'apiKey', e.target.value)}
                    placeholder="Enter your call service API key"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-white">Webhook URL</Label>
                  <Input
                    value={connections.call?.webhookUrl || ''}
                    onChange={(e) => updateConnection('call', 'webhookUrl', e.target.value)}
                    placeholder="https://your-webhook-url.com"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* WhatsApp Connection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center justify-between">
                WhatsApp Integration
                <Switch
                  checked={connections.whatsapp?.enabled || false}
                  onCheckedChange={(checked) => updateConnection('whatsapp', 'enabled', checked)}
                />
              </CardTitle>
            </CardHeader>
            {connections.whatsapp?.enabled && (
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-white">API Key</Label>
                  <Input
                    type="password"
                    value={connections.whatsapp?.apiKey || ''}
                    onChange={(e) => updateConnection('whatsapp', 'apiKey', e.target.value)}
                    placeholder="Enter WhatsApp Business API key"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-white">Phone Number</Label>
                  <Input
                    value={connections.whatsapp?.phoneNumber || ''}
                    onChange={(e) => updateConnection('whatsapp', 'phoneNumber', e.target.value)}
                    placeholder="+1234567890"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-white">Webhook URL</Label>
                  <Input
                    value={connections.whatsapp?.webhookUrl || ''}
                    onChange={(e) => updateConnection('whatsapp', 'webhookUrl', e.target.value)}
                    placeholder="https://your-webhook-url.com"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Telegram Connection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center justify-between">
                Telegram Integration
                <Switch
                  checked={connections.telegram?.enabled || false}
                  onCheckedChange={(checked) => updateConnection('telegram', 'enabled', checked)}
                />
              </CardTitle>
            </CardHeader>
            {connections.telegram?.enabled && (
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-white">Bot Token</Label>
                  <Input
                    type="password"
                    value={connections.telegram?.botToken || ''}
                    onChange={(e) => updateConnection('telegram', 'botToken', e.target.value)}
                    placeholder="123456789:ABCdefGhIJKlmNoPQRsTuVwXyZ"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-white">Webhook URL</Label>
                  <Input
                    value={connections.telegram?.webhookUrl || ''}
                    onChange={(e) => updateConnection('telegram', 'webhookUrl', e.target.value)}
                    placeholder="https://your-webhook-url.com"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Email Connection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center justify-between">
                Email Integration
                <Switch
                  checked={connections.email?.enabled || false}
                  onCheckedChange={(checked) => updateConnection('email', 'enabled', checked)}
                />
              </CardTitle>
            </CardHeader>
            {connections.email?.enabled && (
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-white">SMTP Host</Label>
                  <Input
                    value={connections.email?.smtpHost || ''}
                    onChange={(e) => updateConnection('email', 'smtpHost', e.target.value)}
                    placeholder="smtp.gmail.com"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-white">SMTP Port</Label>
                  <Input
                    value={connections.email?.smtpPort || ''}
                    onChange={(e) => updateConnection('email', 'smtpPort', e.target.value)}
                    placeholder="587"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-white">Username</Label>
                  <Input
                    value={connections.email?.username || ''}
                    onChange={(e) => updateConnection('email', 'username', e.target.value)}
                    placeholder="your-email@gmail.com"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-white">Password</Label>
                  <Input
                    type="password"
                    value={connections.email?.password || ''}
                    onChange={(e) => updateConnection('email', 'password', e.target.value)}
                    placeholder="App password or SMTP password"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                  />
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
