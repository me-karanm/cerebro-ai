
import { useState } from 'react';
import { Upload, Plus, ToggleLeft, ToggleRight, Code, Globe, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AgentWizardData } from './useAgentWizard';

interface KnowledgeFunctionsStepProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

const availableFunctions = [
  { id: 'end-call', name: 'End Call', description: 'Terminate the current call' },
  { id: 'call-transfer', name: 'Call Transfer', description: 'Transfer call to another number' },
  { id: 'send-sms', name: 'Send SMS', description: 'Send text messages' },
  { id: 'press-digit', name: 'Press Digit', description: 'Simulate keypad input' },
  { id: 'calendar-integration', name: 'Calendar Integration', description: 'Schedule and manage appointments' },
  { id: 'custom-function', name: 'Custom Function', description: 'Create your own function' },
];

export const KnowledgeFunctionsStep = ({ data, onUpdate }: KnowledgeFunctionsStepProps) => {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);

  const handleRAGToggle = (enabled: boolean) => {
    onUpdate({ useRAG: enabled });
  };

  const handleFunctionToggle = (functionId: string, enabled: boolean) => {
    const updatedFunctions = enabled 
      ? [...(data.functions || []), { id: functionId, enabled: true, name: '', code: '' }]
      : (data.functions || []).filter(f => f.id !== functionId);
    
    onUpdate({ functions: updatedFunctions });
  };

  const handleFunctionUpdate = (functionId: string, updates: any) => {
    const updatedFunctions = (data.functions || []).map(f => 
      f.id === functionId ? { ...f, ...updates } : f
    );
    onUpdate({ functions: updatedFunctions });
  };

  const isFunctionEnabled = (functionId: string) => {
    return (data.functions || []).some(f => f.id === functionId);
  };

  const getFunction = (functionId: string) => {
    return (data.functions || []).find(f => f.id === functionId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Knowledge & Functions</h2>
        <p className="text-gray-400 mb-6">
          Build your agent's knowledge base and configure its capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Knowledge Section */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Knowledge Base</CardTitle>
              <div className="flex items-center space-x-2">
                <Label className="text-gray-300">RAG</Label>
                <Switch
                  checked={data.useRAG}
                  onCheckedChange={handleRAGToggle}
                />
              </div>
            </CardHeader>
            {data.useRAG && (
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Upload Files</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">
                      Drop files here or click to upload
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Supports PDF, DOCX, TXT files
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Choose Files
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="knowledge-url" className="text-white">Website URL</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="knowledge-url"
                      placeholder="https://example.com"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Globe className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="knowledge-text" className="text-white">Manual Knowledge</Label>
                  <Textarea
                    id="knowledge-text"
                    value={data.knowledgeText}
                    onChange={(e) => onUpdate({ knowledgeText: e.target.value })}
                    placeholder="Enter knowledge directly..."
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                    rows={4}
                  />
                </div>

                <div>
                  <Label className="text-white">Visual Knowledge</Label>
                  <div className="flex space-x-2 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Draw.io Embed
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Miro Embed
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Functions Section */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Functions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableFunctions.map((func) => {
                const isEnabled = isFunctionEnabled(func.id);
                const functionData = getFunction(func.id);

                return (
                  <div key={func.id} className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-white font-medium">{func.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {func.id === 'custom-function' ? 'Custom' : 'Built-in'}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">{func.description}</p>
                      </div>
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={(checked) => handleFunctionToggle(func.id, checked)}
                      />
                    </div>

                    {isEnabled && (
                      <div className="ml-4 space-y-3 border-l-2 border-gray-600 pl-4">
                        <div>
                          <Label className="text-white">Function Name</Label>
                          <Input
                            value={functionData?.name || ''}
                            onChange={(e) => handleFunctionUpdate(func.id, { name: e.target.value })}
                            placeholder={`Enter name for ${func.name}`}
                            className="bg-gray-700 border-gray-600 text-white mt-1"
                          />
                        </div>
                        
                        {func.id === 'custom-function' && (
                          <div>
                            <Label className="text-white flex items-center space-x-2">
                              <Code className="w-4 h-4" />
                              <span>Function Code</span>
                            </Label>
                            <Textarea
                              value={functionData?.code || ''}
                              onChange={(e) => handleFunctionUpdate(func.id, { code: e.target.value })}
                              placeholder="// Enter your custom function code here
function customFunction() {
  // Your code here
}"
                              className="bg-gray-700 border-gray-600 text-white mt-1 font-mono text-sm"
                              rows={6}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
