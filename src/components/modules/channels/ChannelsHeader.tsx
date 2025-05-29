
import { Plus, Webhook } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChannelsHeaderProps {
  onAddIntegration: () => void;
  onToggleWebhooks: () => void;
  showWebhooks: boolean;
}

export const ChannelsHeader = ({ onAddIntegration, onToggleWebhooks, showWebhooks }: ChannelsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">Channels & Integrations</h1>
        <p className="text-gray-400">Connect your AI agents to various communication platforms</p>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={onToggleWebhooks}
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          <Webhook className="w-4 h-4 mr-2" />
          Webhooks
        </Button>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          onClick={onAddIntegration}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>
    </div>
  );
};
