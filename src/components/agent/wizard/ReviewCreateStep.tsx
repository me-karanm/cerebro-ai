
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AgentWizardData } from './useAgentWizard';

interface ReviewCreateStepProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

export const ReviewCreateStep = ({ data }: ReviewCreateStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Review & Create</h2>
        <p className="text-gray-400 mb-6">
          Review your agent configuration before creating. All settings can be modified later.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Basics Summary */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Agent Basics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Name:</span>
              <span className="text-white">{data.name || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">LLM Model:</span>
              <span className="text-white">{data.llmModel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Temperature:</span>
              <span className="text-white">{data.temperature}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">RAG Enabled:</span>
              <Badge variant={data.useRAG ? 'default' : 'secondary'}>
                {data.useRAG ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <Badge variant="secondary">{data.status}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Knowledge & Functions Summary */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Knowledge & Functions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Knowledge Files:</span>
              <span className="text-white">{data.knowledgeFiles.length} files</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Knowledge URLs:</span>
              <span className="text-white">{data.knowledgeUrls.length} URLs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Active Functions:</span>
              <span className="text-white">{data.functions.length} functions</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Memory Length:</span>
              <span className="text-white">{data.memoryLength} messages</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Long-term Memory:</span>
              <Badge variant={data.enableLongTermMemory ? 'default' : 'secondary'}>
                {data.enableLongTermMemory ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Voice & Calling Summary */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Voice & Calling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Voice Enabled:</span>
              <Badge variant={data.enableVoice ? 'default' : 'secondary'}>
                {data.enableVoice ? 'Yes' : 'No'}
              </Badge>
            </div>
            {data.enableVoice && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-400">Selected Voice:</span>
                  <span className="text-white">{data.selectedVoice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">TTS Engine:</span>
                  <span className="text-white">{data.ttsEngine}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Call Routing:</span>
                  <span className="text-white">{data.callRouting}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Integrations Summary */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Integrations & Webhooks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Webhook URL:</span>
              <span className="text-white text-sm">
                {data.webhookUrl ? '✓ Configured' : 'Not set'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Auth Headers:</span>
              <span className="text-white">{data.authHeaders.length} headers</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Connected Services:</span>
              <span className="text-white">
                {Object.values(data.integrations).filter(Boolean).length} services
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Widget & Retention Summary */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Widget & Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Widget Enabled:</span>
              <Badge variant={data.enableWidget ? 'default' : 'secondary'}>
                {data.enableWidget ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Data Retention:</span>
              <span className="text-white">{data.dataRetentionDays} days</span>
            </div>
            {data.enableWidget && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-400">Widget Position:</span>
                  <span className="text-white">{data.widgetPosition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Primary Color:</span>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: data.widgetColor }}
                    />
                    <span className="text-white text-xs">{data.widgetColor}</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* What Happens Next */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Agent will be created and configured</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Phone numbers will be assigned (if voice enabled)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">You can start testing and go live</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-900/20 border border-green-700 rounded">
              <p className="text-green-200 text-sm font-medium">
                ✓ Ready to create your agent! All configuration looks good.
              </p>
              <p className="text-green-300 text-xs mt-1">
                Estimated setup time: 2-3 minutes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
