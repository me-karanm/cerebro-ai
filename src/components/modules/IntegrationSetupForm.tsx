
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Mail, MessageCircle, Monitor } from 'lucide-react';

interface IntegrationSetupFormProps {
  data: any;
  onChange: (data: any) => void;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const integrationTypes = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Connect to WhatsApp Business API for messaging',
    icon: MessageSquare,
    category: 'Messaging'
  },
  {
    id: 'sms',
    name: 'SMS/Text Messaging',
    description: 'Send and receive SMS messages',
    icon: MessageCircle,
    category: 'Messaging'
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Handle support tickets via email',
    icon: Mail,
    category: 'Email'
  },
  {
    id: 'webchat',
    name: 'Web Chat Widget',
    description: 'Embed chat widget on your website',
    icon: Monitor,
    category: 'Web'
  }
];

export const IntegrationSetupForm = ({ 
  data, 
  onChange, 
  onSubmit, 
  onCancel, 
  isSubmitting 
}: IntegrationSetupFormProps) => {
  const [selectedType, setSelectedType] = useState(data.integrationType || '');
  const [formData, setFormData] = useState(data);

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    const updatedData = { ...formData, integrationType: typeId };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderConfigurationForm = () => {
    if (!selectedType) return null;

    switch (selectedType) {
      case 'whatsapp':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber" className="text-white">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="+1234567890"
                value={formData.phoneNumber || ''}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="businessName" className="text-white">Business Name</Label>
              <Input
                id="businessName"
                type="text"
                placeholder="Your Business Name"
                value={formData.businessName || ''}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="apiKey" className="text-white">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Your WhatsApp Business API Key"
                value={formData.apiKey || ''}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="webhookUrl" className="text-white">Webhook URL</Label>
              <Input
                id="webhookUrl"
                type="url"
                placeholder="https://your-webhook-url.com"
                value={formData.webhookUrl || ''}
                onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        );

      case 'sms':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber" className="text-white">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="+1234567890"
                value={formData.phoneNumber || ''}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="provider" className="text-white">SMS Provider</Label>
              <Input
                id="provider"
                type="text"
                placeholder="Twilio, AWS SNS, etc."
                value={formData.provider || ''}
                onChange={(e) => handleInputChange('provider', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="apiKey" className="text-white">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Your SMS Provider API Key"
                value={formData.apiKey || ''}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fromEmail" className="text-white">From Email Address</Label>
              <Input
                id="fromEmail"
                type="email"
                placeholder="support@yourcompany.com"
                value={formData.fromEmail || ''}
                onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="smtpHost" className="text-white">SMTP Host</Label>
              <Input
                id="smtpHost"
                type="text"
                placeholder="smtp.gmail.com"
                value={formData.smtpHost || ''}
                onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="smtpPort" className="text-white">SMTP Port</Label>
              <Input
                id="smtpPort"
                type="number"
                placeholder="587"
                value={formData.smtpPort || ''}
                onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="smtpUsername" className="text-white">SMTP Username</Label>
              <Input
                id="smtpUsername"
                type="text"
                placeholder="your-email@gmail.com"
                value={formData.smtpUsername || ''}
                onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="smtpPassword" className="text-white">SMTP Password</Label>
              <Input
                id="smtpPassword"
                type="password"
                placeholder="Your SMTP Password"
                value={formData.smtpPassword || ''}
                onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        );

      case 'webchat':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="widgetName" className="text-white">Widget Name</Label>
              <Input
                id="widgetName"
                type="text"
                placeholder="Support Chat"
                value={formData.widgetName || ''}
                onChange={(e) => handleInputChange('widgetName', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="domain" className="text-white">Website Domain</Label>
              <Input
                id="domain"
                type="text"
                placeholder="yourwebsite.com"
                value={formData.domain || ''}
                onChange={(e) => handleInputChange('domain', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="welcomeMessage" className="text-white">Welcome Message</Label>
              <Textarea
                id="welcomeMessage"
                placeholder="Hello! How can we help you today?"
                value={formData.welcomeMessage || ''}
                onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="primaryColor" className="text-white">Primary Color</Label>
              <Input
                id="primaryColor"
                type="text"
                placeholder="#6366f1"
                value={formData.primaryColor || ''}
                onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!selectedType ? (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Select Integration Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrationTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <Card
                  key={type.id}
                  className="bg-gray-800 border-gray-700 hover:border-purple-500/50 cursor-pointer transition-all duration-200"
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-8 h-8 text-purple-400" />
                      <div>
                        <CardTitle className="text-white text-lg">{type.name}</CardTitle>
                        <p className="text-gray-400 text-sm mt-1">{type.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Configure {integrationTypes.find(t => t.id === selectedType)?.name}
            </h3>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedType('')}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Back
            </Button>
          </div>
          
          {renderConfigurationForm()}
          
          <div className="flex justify-end space-x-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isSubmitting ? 'Adding...' : 'Add Integration'}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};
