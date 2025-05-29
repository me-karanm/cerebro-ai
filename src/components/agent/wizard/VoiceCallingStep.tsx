
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Phone, Plus, Mail, MessageSquare } from 'lucide-react';
import { MessageCircle } from 'lucide-react'; // For WeChat
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AgentWizardData } from './useAgentWizard';
import { useIntegrationsStore, PhoneNumber, WhatsAppAccount, EmailAccount, TelegramBot, WeChatAccount } from '@/store/integrationsStore';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
  const { toast } = useToast();
  
  // Integration dialogs
  const [openDialogs, setOpenDialogs] = useState({
    phoneNumbers: false,
    whatsapp: false,
    email: false,
    telegram: false,
    wechat: false,
  });
  
  // Get integrations from store
  const {
    phoneNumbers,
    whatsappAccounts,
    emailAccounts,
    telegramBots,
    wechatAccounts,
  } = useIntegrationsStore();

  // Ensure connections are initialized
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

  const handleRedirectToIntegrations = () => {
    navigate('/integrations');
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
        </div>
      </div>

      {/* Connections Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Connections</h3>
        <p className="text-sm text-gray-400 mb-6">
          Configure external communication channels for your agent from your existing integrations.
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
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm text-white">Select Phone Number</Label>
                    <Button
                      size="sm"
                      variant="link"
                      className="text-blue-400 text-sm p-0 h-auto"
                      onClick={handleRedirectToIntegrations}
                    >
                      Manage Numbers
                    </Button>
                  </div>
                  
                  {phoneNumbers.length === 0 ? (
                    <div className="bg-gray-700/50 rounded-lg border border-gray-600 p-4 text-center">
                      <p className="text-sm text-gray-400 mb-2">No phone numbers available</p>
                      <Dialog open={openDialogs.phoneNumbers} onOpenChange={(open) => setOpenDialogs({...openDialogs, phoneNumbers: open})}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800">
                            <Plus className="w-4 h-4 mr-1" /> Add Phone Number
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-xl text-white">Add Phone Number</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Create a new phone number in the integrations section.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 text-center">
                            <p className="text-sm text-gray-400 mb-4">
                              To add a phone number, you'll need to visit the integrations page.
                            </p>
                            <Button 
                              onClick={() => {
                                setOpenDialogs({...openDialogs, phoneNumbers: false});
                                handleRedirectToIntegrations();
                              }}
                              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                            >
                              Go to Integrations
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <>
                      <RadioGroup
                        value={connections.call?.selectedPhoneNumber || ''}
                        onValueChange={(value) => updateConnection('call', 'selectedPhoneNumber', value)}
                        className="space-y-3"
                      >
                        {phoneNumbers.map((phoneNumber) => (
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
                      
                      <Dialog open={openDialogs.phoneNumbers} onOpenChange={(open) => setOpenDialogs({...openDialogs, phoneNumbers: open})}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600 mt-2"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Another Number
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-xl text-white">Add Phone Number</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Create a new phone number in the integrations section.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 text-center">
                            <p className="text-sm text-gray-400 mb-4">
                              To add another phone number, you'll need to visit the integrations page.
                            </p>
                            <Button 
                              onClick={() => {
                                setOpenDialogs({...openDialogs, phoneNumbers: false});
                                handleRedirectToIntegrations();
                              }}
                              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                            >
                              Go to Integrations
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
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
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm text-white">Select WhatsApp Account</Label>
                    <Button
                      size="sm"
                      variant="link"
                      className="text-blue-400 text-sm p-0 h-auto"
                      onClick={handleRedirectToIntegrations}
                    >
                      Manage Accounts
                    </Button>
                  </div>
                  
                  {whatsappAccounts.length === 0 ? (
                    <div className="bg-gray-700/50 rounded-lg border border-gray-600 p-4 text-center">
                      <p className="text-sm text-gray-400 mb-2">No WhatsApp accounts available</p>
                      <Dialog open={openDialogs.whatsapp} onOpenChange={(open) => setOpenDialogs({...openDialogs, whatsapp: open})}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800">
                            <Plus className="w-4 h-4 mr-1" /> Connect WhatsApp
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-xl text-white">Connect WhatsApp</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Connect a WhatsApp account in the integrations section.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 text-center">
                            <p className="text-sm text-gray-400 mb-4">
                              To connect a WhatsApp account, you'll need to visit the integrations page.
                            </p>
                            <Button 
                              onClick={() => {
                                setOpenDialogs({...openDialogs, whatsapp: false});
                                handleRedirectToIntegrations();
                              }}
                              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                            >
                              Go to Integrations
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <>
                      <Select
                        value={connections.whatsapp?.phoneNumber || ''}
                        onValueChange={(value) => updateConnection('whatsapp', 'phoneNumber', value)}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select WhatsApp account" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {whatsappAccounts.map((account) => (
                            <SelectItem key={account.id} value={account.phoneNumber} className="text-white">
                              <div className="flex items-center">
                                <span className="font-medium">{account.name}</span>
                                <span className="text-xs text-gray-400 ml-2">({account.phoneNumber})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Dialog open={openDialogs.whatsapp} onOpenChange={(open) => setOpenDialogs({...openDialogs, whatsapp: open})}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600 mt-2"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Connect Another Account
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-xl text-white">Connect WhatsApp</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Connect another WhatsApp account in the integrations section.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 text-center">
                            <p className="text-sm text-gray-400 mb-4">
                              To connect another WhatsApp account, you'll need to visit the integrations page.
                            </p>
                            <Button 
                              onClick={() => {
                                setOpenDialogs({...openDialogs, whatsapp: false});
                                handleRedirectToIntegrations();
                              }}
                              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                            >
                              Go to Integrations
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
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
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm text-white">Select Telegram Bot</Label>
                    <Button
                      size="sm"
                      variant="link"
                      className="text-blue-400 text-sm p-0 h-auto"
                      onClick={handleRedirectToIntegrations}
                    >
                      Manage Bots
                    </Button>
                  </div>
                  
                  {telegramBots.length === 0 ? (
                    <div className="bg-gray-700/50 rounded-lg border border-gray-600 p-4 text-center">
                      <p className="text-sm text-gray-400 mb-2">No Telegram bots available</p>
                      <Dialog open={openDialogs.telegram} onOpenChange={(open) => setOpenDialogs({...openDialogs, telegram: open})}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800">
                            <Plus className="w-4 h-4 mr-1" /> Connect Telegram
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-xl text-white">Connect Telegram</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Connect a Telegram bot in the integrations section.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 text-center">
                            <p className="text-sm text-gray-400 mb-4">
                              To connect a Telegram bot, you'll need to visit the integrations page.
                            </p>
                            <Button 
                              onClick={() => {
                                setOpenDialogs({...openDialogs, telegram: false});
                                handleRedirectToIntegrations();
                              }}
                              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                            >
                              Go to Integrations
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <>
                      <Select
                        value={connections.telegram?.botToken || ''}
                        onValueChange={(value) => updateConnection('telegram', 'botToken', value)}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select Telegram bot" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {telegramBots.map((bot) => (
                            <SelectItem key={bot.id} value={bot.id} className="text-white">
                              <div className="flex items-center">
                                <span className="font-medium">{bot.name}</span>
                                <span className="text-xs text-gray-400 ml-2">(@{bot.username})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Dialog open={openDialogs.telegram} onOpenChange={(open) => setOpenDialogs({...openDialogs, telegram: open})}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600 mt-2"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Connect Another Bot
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-xl text-white">Connect Telegram</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Connect another Telegram bot in the integrations section.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 text-center">
                            <p className="text-sm text-gray-400 mb-4">
                              To connect another Telegram bot, you'll need to visit the integrations page.
                            </p>
                            <Button 
                              onClick={() => {
                                setOpenDialogs({...openDialogs, telegram: false});
                                handleRedirectToIntegrations();
                              }}
                              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                            >
                              Go to Integrations
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
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
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm text-white">Select Email Account</Label>
                    <Button
                      size="sm"
                      variant="link"
                      className="text-blue-400 text-sm p-0 h-auto"
                      onClick={handleRedirectToIntegrations}
                    >
                      Manage Accounts
                    </Button>
                  </div>
                  
                  {emailAccounts.length === 0 ? (
                    <div className="bg-gray-700/50 rounded-lg border border-gray-600 p-4 text-center">
                      <p className="text-sm text-gray-400 mb-2">No email accounts available</p>
                      <Dialog open={openDialogs.email} onOpenChange={(open) => setOpenDialogs({...openDialogs, email: open})}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800">
                            <Plus className="w-4 h-4 mr-1" /> Connect Email
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-xl text-white">Connect Email</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Configure an email account in the integrations section.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 text-center">
                            <p className="text-sm text-gray-400 mb-4">
                              To configure an email account, you'll need to visit the integrations page.
                            </p>
                            <Button 
                              onClick={() => {
                                setOpenDialogs({...openDialogs, email: false});
                                handleRedirectToIntegrations();
                              }}
                              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                            >
                              Go to Integrations
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <>
                      <Select
                        value={connections.email?.username || ''}
                        onValueChange={(value) => {
                          const selectedAccount = emailAccounts.find(account => account.email === value);
                          if (selectedAccount) {
                            updateConnection('email', 'username', value);
                          }
                        }}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select email account" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {emailAccounts.map((account) => (
                            <SelectItem key={account.id} value={account.email} className="text-white">
                              <div className="flex items-center">
                                <span className="font-medium">{account.name}</span>
                                <span className="text-xs text-gray-400 ml-2">({account.email})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Dialog open={openDialogs.email} onOpenChange={(open) => setOpenDialogs({...openDialogs, email: open})}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600 mt-2"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Configure Another Account
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-xl text-white">Configure Email</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Configure another email account in the integrations section.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 text-center">
                            <p className="text-sm text-gray-400 mb-4">
                              To configure another email account, you'll need to visit the integrations page.
                            </p>
                            <Button 
                              onClick={() => {
                                setOpenDialogs({...openDialogs, email: false});
                                handleRedirectToIntegrations();
                              }}
                              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                            >
                              Go to Integrations
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
          
          {/* WeChat Connection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center justify-between">
                WeChat Integration
                <Switch
                  checked={connections.wechat?.enabled || false}
                  onCheckedChange={(checked) => {
                    // Initialize wechat connection with all required properties
                    const updatedConnections = {
                      ...connections,
                      wechat: {
                        enabled: checked,
                        accountId: connections.wechat?.accountId || '',
                        appId: connections.wechat?.appId || '',
                        appSecret: connections.wechat?.appSecret || ''
                      }
                    };
                    onUpdate({ connections: updatedConnections });
                  }}
                />
              </CardTitle>
            </CardHeader>
            {connections.wechat?.enabled && (
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm text-white">Select WeChat Account</Label>
                    <Button
                      size="sm"
                      variant="link"
                      className="text-blue-400 text-sm p-0 h-auto"
                      onClick={handleRedirectToIntegrations}
                    >
                      Manage Accounts
                    </Button>
                  </div>
                  
                  {wechatAccounts.length === 0 ? (
                    <div className="bg-gray-700/50 rounded-lg border border-gray-600 p-4 text-center">
                      <p className="text-sm text-gray-400 mb-2">No WeChat accounts available</p>
                      <Dialog open={openDialogs.wechat} onOpenChange={(open) => setOpenDialogs({...openDialogs, wechat: open})}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800">
                            <Plus className="w-4 h-4 mr-1" /> Connect WeChat
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-xl text-white">Connect WeChat</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Connect a WeChat account in the integrations section.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 text-center">
                            <p className="text-sm text-gray-400 mb-4">
                              To connect a WeChat account, you'll need to visit the integrations page.
                            </p>
                            <Button 
                              onClick={() => {
                                setOpenDialogs({...openDialogs, wechat: false});
                                handleRedirectToIntegrations();
                              }}
                              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                            >
                              Go to Integrations
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <>
                      <Select
                        value={connections.wechat?.accountId || ''}
                        onValueChange={(value) => {
                          const updatedConnections = {
                            ...connections,
                            wechat: {
                              ...connections.wechat,
                              enabled: connections.wechat?.enabled || false,
                              accountId: value,
                              appId: connections.wechat?.appId || '',
                              appSecret: connections.wechat?.appSecret || ''
                            }
                          };
                          onUpdate({ connections: updatedConnections });
                        }}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select WeChat account" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {wechatAccounts.map((account) => (
                            <SelectItem key={account.id} value={account.accountId} className="text-white">
                              <div className="flex items-center">
                                <span className="font-medium">{account.name}</span>
                                <span className="text-xs text-gray-400 ml-2">({account.accountId})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Dialog open={openDialogs.wechat} onOpenChange={(open) => setOpenDialogs({...openDialogs, wechat: open})}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600 mt-2"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Connect Another Account
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-xl text-white">Connect WeChat</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Connect another WeChat account in the integrations section.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 text-center">
                            <p className="text-sm text-gray-400 mb-4">
                              To connect another WeChat account, you'll need to visit the integrations page.
                            </p>
                            <Button 
                              onClick={() => {
                                setOpenDialogs({...openDialogs, wechat: false});
                                handleRedirectToIntegrations();
                              }}
                              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                            >
                              Go to Integrations
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
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
