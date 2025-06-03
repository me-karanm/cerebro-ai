
import { CheckCircle, Phone, MessageCircle, Mail, Globe, Brain, Volume2, Settings, FileText, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AgentWizardData } from './useAgentWizard';

interface ReviewStepProps {
  data: AgentWizardData;
}

const channelIcons = {
  call: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  widget: Globe,
};

const channelNames = {
  call: 'Phone Calls',
  whatsapp: 'WhatsApp',
  email: 'Email',
  widget: 'Website Widget',
};

export const ReviewStep = ({ data }: ReviewStepProps) => {
  const enabledChannels = Object.entries(data.connections).filter(([_, config]) => config.enabled);
  const enabledFunctions = data.functions.filter(fn => fn.enabled);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Review Configuration</h2>
        <p className="text-gray-400 text-lg">
          Review your agent configuration before creating. You can go back to make changes if needed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Basics */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-400/10">
                <Settings className="w-5 h-5 text-purple-400" />
              </div>
              <CardTitle className="text-white text-lg">Agent Basics</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm">Agent Name</label>
              <p className="text-white font-medium">{data.name}</p>
            </div>
            
            {data.description && (
              <div>
                <label className="text-gray-400 text-sm">Description</label>
                <p className="text-white">{data.description}</p>
              </div>
            )}
            
            {data.initialMessage && (
              <div>
                <label className="text-gray-400 text-sm">Initial Message</label>
                <p className="text-white italic">"{data.initialMessage}"</p>
              </div>
            )}
            
            <Separator className="bg-gray-700" />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm">LLM Model</label>
                <p className="text-white font-medium">{data.llmModel}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Temperature</label>
                <p className="text-white font-medium">{data.temperature}</p>
              </div>
            </div>
            
            <div>
              <label className="text-gray-400 text-sm">Voice</label>
              <div className="flex items-center space-x-2 mt-1">
                <Volume2 className="w-4 h-4 text-blue-400" />
                <p className="text-white font-medium">{data.selectedVoice}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Knowledge & Functions */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-400/10">
                <Brain className="w-5 h-5 text-blue-400" />
              </div>
              <CardTitle className="text-white text-lg">Knowledge & Functions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm">RAG (Retrieval Augmented Generation)</label>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={data.useRAG ? "default" : "secondary"} className="text-xs">
                  {data.useRAG ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </div>
            
            {data.useRAG && (
              <>
                {data.knowledgeFiles.length > 0 && (
                  <div>
                    <label className="text-gray-400 text-sm">Knowledge Files</label>
                    <div className="space-y-1 mt-1">
                      {data.knowledgeFiles.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-green-400" />
                          <span className="text-white text-sm">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {data.knowledgeUrls.length > 0 && (
                  <div>
                    <label className="text-gray-400 text-sm">Knowledge URLs</label>
                    <div className="space-y-1 mt-1">
                      {data.knowledgeUrls.map((url, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-blue-400" />
                          <span className="text-white text-sm truncate">{url}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {data.knowledgeText && (
                  <div>
                    <label className="text-gray-400 text-sm">Manual Knowledge</label>
                    <p className="text-white text-sm bg-gray-700 p-2 rounded mt-1 max-h-20 overflow-y-auto">
                      {data.knowledgeText}
                    </p>
                  </div>
                )}
              </>
            )}
            
            <Separator className="bg-gray-700" />
            
            <div>
              <label className="text-gray-400 text-sm">Functions ({enabledFunctions.length} enabled)</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {enabledFunctions.map((fn) => (
                  <Badge key={fn.id} variant="default" className="text-xs bg-green-600">
                    <Code className="w-3 h-3 mr-1" />
                    {fn.name}
                  </Badge>
                ))}
                {enabledFunctions.length === 0 && (
                  <p className="text-gray-500 text-sm">No functions enabled</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Communication Channels */}
        <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-400/10">
                <MessageCircle className="w-5 h-5 text-green-400" />
              </div>
              <CardTitle className="text-white text-lg">Communication Channels</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {enabledChannels.map(([channelId, config]) => {
                const Icon = channelIcons[channelId as keyof typeof channelIcons];
                const channelName = channelNames[channelId as keyof typeof channelNames];
                
                return (
                  <div key={channelId} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className="w-4 h-4 text-green-400" />
                      <span className="text-white font-medium text-sm">{channelName}</span>
                    </div>
                    <Badge variant="default" className="text-xs bg-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Enabled
                    </Badge>
                  </div>
                );
              })}
            </div>
            
            {enabledChannels.length === 0 && (
              <div className="text-center py-8">
                <p className="text-red-400">No communication channels enabled</p>
                <p className="text-gray-500 text-sm mt-1">At least one channel is required</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold mt-0.5">
              1
            </div>
            <p className="text-gray-300">
              Your agent will be deployed within <span className="text-white font-medium">2-3 minutes</span>.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold mt-0.5">
              2
            </div>
            <p className="text-gray-300">
              You can assign the agent to campaigns in the <span className="text-white font-medium">Agent Detail page</span> or <span className="text-white font-medium">Campaign Detail page</span>.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold mt-0.5">
              3
            </div>
            <p className="text-gray-300">
              Configure integrations and channels as needed in the <span className="text-white font-medium">Channels page</span>.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold mt-0.5">
              4
            </div>
            <p className="text-gray-300">
              Monitor performance and conversations in the <span className="text-white font-medium">Analytics page</span>.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Validation Warnings */}
      {enabledChannels.length === 0 && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center mt-0.5">
              <span className="text-white text-xs">!</span>
            </div>
            <div>
              <p className="text-red-400 font-medium">Configuration Incomplete</p>
              <p className="text-red-300 text-sm">
                At least one communication channel must be enabled before creating the agent.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
