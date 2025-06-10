
import { Settings, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  status: string;
  config: any;
}

interface IntegrationsGridProps {
  integrations: Integration[];
  onConfigureIntegration: (id: string) => void;
}

const getCategoryColor = (category: string) => {
  const colors = {
    'Messaging': 'bg-green-600 text-white border-green-500',
    'Email': 'bg-orange-600 text-white border-orange-500',
    'Web': 'bg-purple-600 text-white border-purple-500',
  };
  return colors[category as keyof typeof colors] || 'bg-gray-600 text-white border-gray-500';
};

export const IntegrationsGrid = ({ integrations, onConfigureIntegration }: IntegrationsGridProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-600 text-white">Connected</Badge>;
      case 'configured':
        return <Badge className="bg-blue-600 text-white">Configured</Badge>;
      case 'disconnected':
        return <Badge variant="secondary">Disconnected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Check className="w-4 h-4 text-green-400" />;
      case 'configured':
        return <Settings className="w-4 h-4 text-blue-400" />;
      case 'disconnected':
        return <X className="w-4 h-4 text-gray-400" />;
      default:
        return <X className="w-4 h-4 text-gray-400" />;
    }
  };

  const renderConfigDetails = (integration: Integration) => {
    if (integration.status === 'disconnected') return null;

    return (
      <div className="bg-gray-700 rounded-lg p-3 text-sm">
        {integration.id === 'whatsapp' && (
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Phone:</span>
              <span className="text-white">{integration.config.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Verified:</span>
              <span className="text-green-400">✓ Yes</span>
            </div>
          </div>
        )}
        {integration.id === 'sms' && (
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Phone:</span>
              <span className="text-white">{integration.config.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Provider:</span>
              <span className="text-green-400">{integration.config.provider}</span>
            </div>
          </div>
        )}
        {integration.id === 'webchat' && (
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Domain:</span>
              <span className="text-white">{integration.config.domain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-green-400">Active</span>
            </div>
          </div>
        )}
        {integration.id === 'email' && (
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="text-white">{integration.config.email}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {integrations.map((integration) => (
        <Card key={integration.id} className="bg-gray-900 border-gray-700 hover:border-purple-500/50 transition-all duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{integration.icon}</div>
                <div>
                  <CardTitle className="text-white text-lg">{integration.name}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`mt-1 text-xs ${getCategoryColor(integration.category)}`}
                  >
                    {integration.category}
                  </Badge>
                </div>
              </div>
              {getStatusIcon(integration.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400 text-sm">{integration.description}</p>
            
            <div className="flex items-center justify-between">
              {getStatusBadge(integration.status)}
              <Button
                size="sm"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => onConfigureIntegration(integration.id)}
              >
                <Settings className="w-3 h-3 mr-1" />
                Configure
              </Button>
            </div>

            {renderConfigDetails(integration)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
