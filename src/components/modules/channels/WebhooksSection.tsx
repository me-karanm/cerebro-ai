
import { Webhook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const WebhooksSection = () => {
  const events = ['conversation.started', 'conversation.ended', 'message.received', 'agent.responded'];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Webhook className="w-5 h-5 mr-2" />
          Webhook Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Webhook URL</label>
          <Input 
            placeholder="https://your-api.com/webhook"
            className="bg-gray-900 border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Secret Key</label>
          <Input 
            type="password"
            placeholder="webhook_secret_key"
            className="bg-gray-900 border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Events</label>
          <div className="space-y-2">
            {events.map(event => (
              <label key={event} className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-300">{event}</span>
              </label>
            ))}
          </div>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          Save Webhook
        </Button>
      </CardContent>
    </Card>
  );
};
