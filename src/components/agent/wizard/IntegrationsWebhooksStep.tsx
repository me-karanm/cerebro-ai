
import { useState } from 'react';
import { Plus, Trash2, TestTube } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AgentWizardData } from './useAgentWizard';

interface IntegrationsWebhooksStepProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

export const IntegrationsWebhooksStep = ({ data, onUpdate }: IntegrationsWebhooksStepProps) => {
  const [newAuthHeader, setNewAuthHeader] = useState({ key: '', value: '' });

  const addAuthHeader = () => {
    if (newAuthHeader.key.trim() && newAuthHeader.value.trim()) {
      onUpdate({
        authHeaders: [...data.authHeaders, { ...newAuthHeader }]
      });
      setNewAuthHeader({ key: '', value: '' });
    }
  };

  const removeAuthHeader = (index: number) => {
    onUpdate({
      authHeaders: data.authHeaders.filter((_, i) => i !== index)
    });
  };

  const updateIntegration = (integration: keyof typeof data.integrations, enabled: boolean) => {
    onUpdate({
      integrations: {
        ...data.integrations,
        [integration]: enabled
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Integrations & Webhooks</h2>
        <p className="text-gray-400 mb-6">
          Connect your agent with external services and configure webhook notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Integrations */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Popular Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-sm font-bold">
                      S
                    </div>
                    <div>
                      <div className="text-white font-medium">Slack</div>
                      <div className="text-gray-400 text-sm">Team communication</div>
                    </div>
                  </div>
                  <Checkbox
                    checked={data.integrations.slack}
                    onCheckedChange={(checked) => updateIntegration('slack', !!checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-sm font-bold">
                      T
                    </div>
                    <div>
                      <div className="text-white font-medium">Microsoft Teams</div>
                      <div className="text-gray-400 text-sm">Business communication</div>
                    </div>
                  </div>
                  <Checkbox
                    checked={data.integrations.teams}
                    onCheckedChange={(checked) => updateIntegration('teams', !!checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center text-sm font-bold">
                      H
                    </div>
                    <div>
                      <div className="text-white font-medium">HubSpot</div>
                      <div className="text-gray-400 text-sm">CRM integration</div>
                    </div>
                  </div>
                  <Checkbox
                    checked={data.integrations.hubspot}
                    onCheckedChange={(checked) => updateIntegration('hubspot', !!checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-sm font-bold">
                      Z
                    </div>
                    <div>
                      <div className="text-white font-medium">Zendesk</div>
                      <div className="text-gray-400 text-sm">Customer support</div>
                    </div>
                  </div>
                  <Checkbox
                    checked={data.integrations.zendesk}
                    onCheckedChange={(checked) => updateIntegration('zendesk', !!checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Webhook Configuration */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Webhook Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="webhook-url" className="text-white">Webhook URL</Label>
                <div className="flex mt-1">
                  <Input
                    id="webhook-url"
                    value={data.webhookUrl}
                    onChange={(e) => onUpdate({ webhookUrl: e.target.value })}
                    placeholder="https://your-api.com/webhook"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2 border-gray-600 text-gray-300"
                  >
                    <TestTube className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Receive real-time notifications about agent interactions and events.
                </p>
              </div>

              <div>
                <Label className="text-white">Authentication Headers</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Header key"
                      value={newAuthHeader.key}
                      onChange={(e) => setNewAuthHeader({ ...newAuthHeader, key: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Input
                      placeholder="Header value"
                      value={newAuthHeader.value}
                      onChange={(e) => setNewAuthHeader({ ...newAuthHeader, value: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Button
                      onClick={addAuthHeader}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {data.authHeaders.length > 0 && (
                    <div className="space-y-1">
                      {data.authHeaders.map((header, index) => (
                        <div key={index} className="flex items-center justify-between text-sm bg-gray-700 rounded px-2 py-1">
                          <span className="text-white">{header.key}: {header.value}</span>
                          <Button
                            onClick={() => removeAuthHeader(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max-retries" className="text-white">Max Retries</Label>
                  <Input
                    id="max-retries"
                    type="number"
                    value={data.maxRetries}
                    onChange={(e) => onUpdate({ maxRetries: parseInt(e.target.value) || 0 })}
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                    min="0"
                    max="10"
                  />
                </div>
                <div>
                  <Label htmlFor="retry-delay" className="text-white">Retry Delay (s)</Label>
                  <Input
                    id="retry-delay"
                    type="number"
                    value={data.retryDelay}
                    onChange={(e) => onUpdate({ retryDelay: parseInt(e.target.value) || 0 })}
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                    min="1"
                    max="60"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
