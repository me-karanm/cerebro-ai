
import { Settings, Play, Square, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  status: 'connected' | 'configured' | 'disconnected';
  config: any;
}

interface IntegrationsGridProps {
  integrations: Integration[];
  onConfigureIntegration: (id: string) => void;
  getCategoryColor?: (category: string) => string;
}

export const IntegrationsGrid = ({ 
  integrations, 
  onConfigureIntegration,
  getCategoryColor 
}: IntegrationsGridProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'configured':
        return <AlertCircle className="w-4 h-4 text-blue-400" />;
      case 'disconnected':
        return <Square className="w-4 h-4 text-gray-400" />;
      default:
        return <Square className="w-4 h-4 text-gray-400" />;
    }
  };

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

  const defaultGetCategoryColor = (category: string) => {
    const colors = {
      'Messaging': 'bg-blue-600',
      'Web': 'bg-green-600',
      'Email': 'bg-purple-600',
      'Productivity': 'bg-orange-600',
      'CRM': 'bg-pink-600',
      'Helpdesk': 'bg-yellow-600',
      'Custom': 'bg-gray-600',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-600';
  };

  const categoryColorFn = getCategoryColor || defaultGetCategoryColor;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {integrations.map((integration) => (
        <Card key={integration.id} className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{integration.icon}</div>
                <div>
                  <CardTitle className="text-white text-lg">{integration.name}</CardTitle>
                  <Badge 
                    className={`${categoryColorFn(integration.category)} text-white text-xs mt-1`}
                  >
                    {integration.category}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {getStatusIcon(integration.status)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400 text-sm">{integration.description}</p>
            
            <div className="flex items-center justify-between">
              {getStatusBadge(integration.status)}
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  onClick={() => onConfigureIntegration(integration.id)}
                >
                  <Settings className="w-3 h-3 mr-1" />
                  Configure
                </Button>
                {integration.status === 'connected' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Test
                  </Button>
                )}
              </div>
            </div>

            {/* Configuration Details */}
            {integration.status !== 'disconnected' && Object.keys(integration.config).length > 0 && (
              <div className="text-xs text-gray-500 bg-gray-900 rounded p-2">
                <p>Configuration active</p>
                {integration.config.phone && (
                  <p>Phone: {integration.config.phone}</p>
                )}
                {integration.config.email && (
                  <p>Email: {integration.config.email}</p>
                )}
                {integration.config.domain && (
                  <p>Domain: {integration.config.domain}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
