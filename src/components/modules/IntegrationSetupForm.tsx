import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { TestConnection } from './TestConnection';
import { Eye, EyeOff } from 'lucide-react';

interface IntegrationSetupFormProps {
  data: any;
  onChange: (data: any) => void;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const integrationTypes = [
  { value: 'voice', label: 'Voice Calling', icon: '📞' },
  { value: 'whatsapp', label: 'WhatsApp Business', icon: '💬' },
  { value: 'sms', label: 'SMS/Text Messaging', icon: '📱' },
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'telegram', label: 'Telegram', icon: '✈️' },
  { value: 'wechat', label: 'WeChat', icon: '💭' },
  { value: 'messenger', label: 'Facebook Messenger', icon: '📘' },
  { value: 'slack', label: 'Slack', icon: '💼' },
  { value: 'webchat', label: 'Web Chat Widget', icon: '💻' },
  { value: 'calendar', label: 'Calendar', icon: '📅' },
  { value: 'crm', label: 'CRM/Helpdesk', icon: '🏢' },
  { value: 'webhook', label: 'Custom Webhook/API', icon: '🔗' },
];

export const IntegrationSetupForm = ({ data, onChange, onSubmit, onCancel, isSubmitting }: IntegrationSetupFormProps) => {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateData = (field: string, value: any) => {
    const newData = { ...data, [field]: value };
    onChange(newData);
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.integrationType) {
      newErrors.integrationType = 'Please select an integration type';
    }

    // Type-specific validation
    if (data.integrationType === 'whatsapp') {
      if (!data.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
      if (!data.apiKey) newErrors.apiKey = 'API key is required';
    }
    
    if (data.integrationType === 'email') {
      if (!data.smtpHost) newErrors.smtpHost = 'SMTP host is required';
      if (!data.smtpPort) newErrors.smtpPort = 'SMTP port is required';
      if (!data.fromEmail) newErrors.fromEmail = 'From email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(data);
    }
  };

  const renderDynamicFields = () => {
    const type = data.integrationType;
    
    switch (type) {
      case 'voice':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="provider">Telephony Provider</Label>
              <Select value={data.provider || ''} onValueChange={(value) => updateData('provider', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="nexmo">Nexmo</SelectItem>
                  <SelectItem value="plivo">Plivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="accountSid">Account SID</Label>
              <Input
                id="accountSid"
                value={data.accountSid || ''}
                onChange={(e) => updateData('accountSid', e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="authToken">Auth Token</Label>
              <div className="relative">
                <Input
                  id="authToken"
                  type={showPasswords.authToken ? 'text' : 'password'}
                  value={data.authToken || ''}
                  onChange={(e) => updateData('authToken', e.target.value)}
                  className="bg-gray-800 border-gray-700 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility('authToken')}
                >
                  {showPasswords.authToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        );

      case 'whatsapp':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber">WhatsApp Business Phone Number</Label>
              <Input
                id="phoneNumber"
                value={data.phoneNumber || ''}
                onChange={(e) => updateData('phoneNumber', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="+1234567890"
              />
              {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={data.businessName || ''}
                onChange={(e) => updateData('businessName', e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="apiKey">API Key / Access Token</Label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showPasswords.apiKey ? 'text' : 'password'}
                  value={data.apiKey || ''}
                  onChange={(e) => updateData('apiKey', e.target.value)}
                  className="bg-gray-800 border-gray-700 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility('apiKey')}
                >
                  {showPasswords.apiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.apiKey && <p className="text-red-400 text-sm mt-1">{errors.apiKey}</p>}
            </div>
            <div>
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={data.webhookUrl || ''}
                onChange={(e) => updateData('webhookUrl', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="https://your-app.com/webhooks/whatsapp"
              />
            </div>
          </div>
        );

      case 'sms':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="smsProvider">SMS Provider</Label>
              <Select value={data.smsProvider || ''} onValueChange={(value) => updateData('smsProvider', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select SMS provider" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="plivo">Plivo</SelectItem>
                  <SelectItem value="messagebird">MessageBird</SelectItem>
                  <SelectItem value="nexmo">Nexmo/Vonage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="smsPhoneNumber">SMS-enabled Phone Number</Label>
              <Input
                id="smsPhoneNumber"
                value={data.smsPhoneNumber || ''}
                onChange={(e) => updateData('smsPhoneNumber', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="+1234567890"
              />
            </div>
            <div>
              <Label htmlFor="smsAccountSid">Account SID</Label>
              <Input
                id="smsAccountSid"
                value={data.smsAccountSid || ''}
                onChange={(e) => updateData('smsAccountSid', e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="smsAuthToken">Auth Token</Label>
              <div className="relative">
                <Input
                  id="smsAuthToken"
                  type={showPasswords.smsAuthToken ? 'text' : 'password'}
                  value={data.smsAuthToken || ''}
                  onChange={(e) => updateData('smsAuthToken', e.target.value)}
                  className="bg-gray-800 border-gray-700 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility('smsAuthToken')}
                >
                  {showPasswords.smsAuthToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="smsWebhookUrl">Webhook URL</Label>
              <Input
                id="smsWebhookUrl"
                value={data.smsWebhookUrl || ''}
                onChange={(e) => updateData('smsWebhookUrl', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="https://your-app.com/webhooks/sms"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="smsOptInManagement"
                checked={data.smsOptInManagement || false}
                onCheckedChange={(checked) => updateData('smsOptInManagement', checked)}
              />
              <Label htmlFor="smsOptInManagement">Enable Opt-in/Opt-out Management</Label>
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={data.smtpHost || ''}
                onChange={(e) => updateData('smtpHost', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="smtp.gmail.com"
              />
              {errors.smtpHost && <p className="text-red-400 text-sm mt-1">{errors.smtpHost}</p>}
            </div>
            <div>
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                value={data.smtpPort || ''}
                onChange={(e) => updateData('smtpPort', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="587"
              />
              {errors.smtpPort && <p className="text-red-400 text-sm mt-1">{errors.smtpPort}</p>}
            </div>
            <div>
              <Label htmlFor="smtpUsername">SMTP Username</Label>
              <Input
                id="smtpUsername"
                value={data.smtpUsername || ''}
                onChange={(e) => updateData('smtpUsername', e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="smtpPassword">SMTP Password</Label>
              <div className="relative">
                <Input
                  id="smtpPassword"
                  type={showPasswords.smtpPassword ? 'text' : 'password'}
                  value={data.smtpPassword || ''}
                  onChange={(e) => updateData('smtpPassword', e.target.value)}
                  className="bg-gray-800 border-gray-700 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility('smtpPassword')}
                >
                  {showPasswords.smtpPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="fromEmail">From Email</Label>
              <Input
                id="fromEmail"
                type="email"
                value={data.fromEmail || ''}
                onChange={(e) => updateData('fromEmail', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="support@company.com"
              />
              {errors.fromEmail && <p className="text-red-400 text-sm mt-1">{errors.fromEmail}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="useTLS"
                checked={data.useTLS || false}
                onCheckedChange={(checked) => updateData('useTLS', checked)}
              />
              <Label htmlFor="useTLS">Use TLS/SSL</Label>
            </div>
          </div>
        );

      case 'telegram':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="botName">Bot Name</Label>
              <Input
                id="botName"
                value={data.botName || ''}
                onChange={(e) => updateData('botName', e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="botToken">Bot Token</Label>
              <div className="relative">
                <Input
                  id="botToken"
                  type={showPasswords.botToken ? 'text' : 'password'}
                  value={data.botToken || ''}
                  onChange={(e) => updateData('botToken', e.target.value)}
                  className="bg-gray-800 border-gray-700 pr-10"
                  placeholder="123456789:ABCdef..."
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility('botToken')}
                >
                  {showPasswords.botToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="username">Bot Username</Label>
              <Input
                id="username"
                value={data.username || ''}
                onChange={(e) => updateData('username', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="@yourbotname"
              />
            </div>
            <div>
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={data.webhookUrl || ''}
                onChange={(e) => updateData('webhookUrl', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="https://your-app.com/webhooks/telegram"
              />
            </div>
          </div>
        );

      case 'wechat':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                value={data.accountName || ''}
                onChange={(e) => updateData('accountName', e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="appId">App ID</Label>
              <Input
                id="appId"
                value={data.appId || ''}
                onChange={(e) => updateData('appId', e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="appSecret">App Secret</Label>
              <div className="relative">
                <Input
                  id="appSecret"
                  type={showPasswords.appSecret ? 'text' : 'password'}
                  value={data.appSecret || ''}
                  onChange={(e) => updateData('appSecret', e.target.value)}
                  className="bg-gray-800 border-gray-700 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility('appSecret')}
                >
                  {showPasswords.appSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        );

      case 'messenger':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="facebookPageId">Facebook Page ID</Label>
              <Input
                id="facebookPageId"
                value={data.facebookPageId || ''}
                onChange={(e) => updateData('facebookPageId', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="123456789012345"
              />
            </div>
            <div>
              <Label htmlFor="pageAccessToken">Page Access Token</Label>
              <div className="relative">
                <Input
                  id="pageAccessToken"
                  type={showPasswords.pageAccessToken ? 'text' : 'password'}
                  value={data.pageAccessToken || ''}
                  onChange={(e) => updateData('pageAccessToken', e.target.value)}
                  className="bg-gray-800 border-gray-700 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility('pageAccessToken')}
                >
                  {showPasswords.pageAccessToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="appSecret">App Secret</Label>
              <div className="relative">
                <Input
                  id="appSecret"
                  type={showPasswords.appSecret ? 'text' : 'password'}
                  value={data.appSecret || ''}
                  onChange={(e) => updateData('appSecret', e.target.value)}
                  className="bg-gray-800 border-gray-700 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility('appSecret')}
                >
                  {showPasswords.appSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="messengerWebhookUrl">Webhook URL</Label>
              <Input
                id="messengerWebhookUrl"
                value={data.messengerWebhookUrl || ''}
                onChange={(e) => updateData('messengerWebhookUrl', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="https://your-app.com/webhooks/messenger"
              />
            </div>
            <div>
              <Label htmlFor="webhookEvents">Webhook Events</Label>
              <div className="space-y-2 mt-2">
                {['messages', 'messaging_postbacks', 'messaging_optins', 'messaging_deliveries'].map(event => (
                  <label key={event} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={data.webhookEvents?.includes(event) || false}
                      onChange={(e) => {
                        const events = data.webhookEvents || [];
                        if (e.target.checked) {
                          updateData('webhookEvents', [...events, event]);
                        } else {
                          updateData('webhookEvents', events.filter((e: string) => e !== event));
                        }
                      }}
                    />
                    <span className="text-gray-300">{event}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'webchat':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="widgetName">Widget Name</Label>
              <Input
                id="widgetName"
                value={data.widgetName || ''}
                onChange={(e) => updateData('widgetName', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="Customer Support Chat"
              />
            </div>
            <div>
              <Label htmlFor="apiEndpoint">API Endpoint</Label>
              <Input
                id="apiEndpoint"
                value={data.apiEndpoint || ''}
                onChange={(e) => updateData('apiEndpoint', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="https://your-app.com/api/chat"
              />
            </div>
            <div>
              <Label htmlFor="authToken">Authentication Token (Optional)</Label>
              <div className="relative">
                <Input
                  id="authToken"
                  type={showPasswords.authToken ? 'text' : 'password'}
                  value={data.authToken || ''}
                  onChange={(e) => updateData('authToken', e.target.value)}
                  className="bg-gray-800 border-gray-700 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => togglePasswordVisibility('authToken')}
                >
                  {showPasswords.authToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="allowedDomains">Allowed Domains</Label>
              <Textarea
                id="allowedDomains"
                value={data.allowedDomains || ''}
                onChange={(e) => updateData('allowedDomains', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="example.com&#10;subdomain.example.com"
                rows={3}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Widget Appearance</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={data.primaryColor || '#6366f1'}
                    onChange={(e) => updateData('primaryColor', e.target.value)}
                    className="bg-gray-800 border-gray-700 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Select value={data.position || 'bottom-right'} onValueChange={(value) => updateData('position', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="fileUpload"
                  checked={data.fileUpload || false}
                  onCheckedChange={(checked) => updateData('fileUpload', checked)}
                />
                <Label htmlFor="fileUpload">Enable File Upload</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="notifications"
                  checked={data.notifications || false}
                  onCheckedChange={(checked) => updateData('notifications', checked)}
                />
                <Label htmlFor="notifications">Enable Notifications</Label>
              </div>
            </div>
          </div>
        );

      case 'crm':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="crmPlatform">CRM/Helpdesk Platform</Label>
              <Select value={data.crmPlatform || ''} onValueChange={(value) => updateData('crmPlatform', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="salesforce">Salesforce</SelectItem>
                  <SelectItem value="hubspot">HubSpot</SelectItem>
                  <SelectItem value="zendesk">Zendesk</SelectItem>
                  <SelectItem value="freshworks">Freshworks</SelectItem>
                  <SelectItem value="pipedrive">Pipedrive</SelectItem>
                  <SelectItem value="zoho">Zoho CRM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="crmApiEndpoint">API Endpoint</Label>
              <Input
                id="crmApiEndpoint"
                value={data.crmApiEndpoint || ''}
                onChange={(e) => updateData('crmApiEndpoint', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="https://api.salesforce.com/services/data/v54.0/"
              />
            </div>
            <div>
              <Label htmlFor="crmAuthMethod">Authentication Method</Label>
              <Select value={data.crmAuthMethod || ''} onValueChange={(value) => updateData('crmAuthMethod', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select auth method" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="oauth">OAuth 2.0</SelectItem>
                  <SelectItem value="apikey">API Key</SelectItem>
                  <SelectItem value="basic">Basic Auth</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {data.crmAuthMethod === 'oauth' && (
              <>
                <div>
                  <Label htmlFor="clientId">Client ID</Label>
                  <Input
                    id="clientId"
                    value={data.clientId || ''}
                    onChange={(e) => updateData('clientId', e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="clientSecret">Client Secret</Label>
                  <div className="relative">
                    <Input
                      id="clientSecret"
                      type={showPasswords.clientSecret ? 'text' : 'password'}
                      value={data.clientSecret || ''}
                      onChange={(e) => updateData('clientSecret', e.target.value)}
                      className="bg-gray-800 border-gray-700 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => togglePasswordVisibility('clientSecret')}
                    >
                      {showPasswords.clientSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </>
            )}
            {data.crmAuthMethod === 'apikey' && (
              <div>
                <Label htmlFor="crmApiKey">API Key</Label>
                <div className="relative">
                  <Input
                    id="crmApiKey"
                    type={showPasswords.crmApiKey ? 'text' : 'password'}
                    value={data.crmApiKey || ''}
                    onChange={(e) => updateData('crmApiKey', e.target.value)}
                    className="bg-gray-800 border-gray-700 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => togglePasswordVisibility('crmApiKey')}
                  >
                    {showPasswords.crmApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="fieldMapping">Field Mapping (JSON)</Label>
              <Textarea
                id="fieldMapping"
                value={data.fieldMapping || ''}
                onChange={(e) => updateData('fieldMapping', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder='{"customer_name": "Name", "customer_email": "Email", "conversation_summary": "Description"}'
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="crmWebhookUrl">Webhook URL (Optional)</Label>
              <Input
                id="crmWebhookUrl"
                value={data.crmWebhookUrl || ''}
                onChange={(e) => updateData('crmWebhookUrl', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="https://your-app.com/webhooks/crm"
              />
            </div>
          </div>
        );

      case 'webhook':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="endpointUrl">Endpoint URL</Label>
              <Input
                id="endpointUrl"
                value={data.endpointUrl || ''}
                onChange={(e) => updateData('endpointUrl', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="https://api.example.com/webhook"
              />
            </div>
            <div>
              <Label htmlFor="authMethod">Authentication Method</Label>
              <Select value={data.authMethod || ''} onValueChange={(value) => updateData('authMethod', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select auth method" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="bearer">Bearer Token</SelectItem>
                  <SelectItem value="basic">Basic Auth</SelectItem>
                  <SelectItem value="apikey">API Key</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {data.authMethod === 'bearer' && (
              <div>
                <Label htmlFor="bearerToken">Bearer Token</Label>
                <div className="relative">
                  <Input
                    id="bearerToken"
                    type={showPasswords.bearerToken ? 'text' : 'password'}
                    value={data.bearerToken || ''}
                    onChange={(e) => updateData('bearerToken', e.target.value)}
                    className="bg-gray-800 border-gray-700 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => togglePasswordVisibility('bearerToken')}
                  >
                    {showPasswords.bearerToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-400">
            <p>Please select an integration type to configure</p>
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Integration Type Selection */}
      <div>
        <Label className="text-base font-medium">Integration Type</Label>
        <div className="grid grid-cols-2 gap-4 mt-3">
          {integrationTypes.map((type) => (
            <div
              key={type.value}
              className={`relative cursor-pointer p-3 border rounded-lg transition-all duration-200 ${
                data.integrationType === type.value
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => updateData('integrationType', type.value)}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="integrationType"
                  value={type.value}
                  checked={data.integrationType === type.value}
                  onChange={() => updateData('integrationType', type.value)}
                  className="sr-only"
                />
                <span className="text-lg">{type.icon}</span>
                <span className={`font-medium ${
                  data.integrationType === type.value ? 'text-purple-300' : 'text-white'
                }`}>
                  {type.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        {errors.integrationType && <p className="text-red-400 text-sm mt-1">{errors.integrationType}</p>}
      </div>

      {/* Dynamic Fields */}
      {data.integrationType && (
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-lg font-medium mb-4">
            {integrationTypes.find(t => t.value === data.integrationType)?.label} Configuration
          </h3>
          {renderDynamicFields()}
        </div>
      )}

      {/* Test Connection */}
      {data.integrationType && (
        <TestConnection 
          integrationType={data.integrationType}
          connectionData={data}
        />
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? 'Adding Integration...' : 'Add Integration'}
        </Button>
      </div>
    </form>
  );
};
