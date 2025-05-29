
import { useState } from 'react';
import { Upload, Plus, Trash2, Edit, Play, ToggleLeft, ToggleRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AgentWizardData } from './useAgentWizard';

interface KnowledgeFunctionsStepProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

const availableFunctions = [
  { id: 'end-call', name: 'End Call', description: 'Terminate the current call' },
  { id: 'call-transfer', name: 'Call Transfer', description: 'Transfer call to another agent' },
  { id: 'calendar', name: 'Calendar (Cal.com)', description: 'Schedule appointments' },
  { id: 'send-sms', name: 'Send SMS', description: 'Send text messages' },
  { id: 'press-digit', name: 'Press Digit (IVR)', description: 'Interact with IVR systems' },
  { id: 'custom', name: 'Custom Function', description: 'Create custom JavaScript functions' },
];

export const KnowledgeFunctionsStep = ({ data, onUpdate }: KnowledgeFunctionsStepProps) => {
  const [newUrl, setNewUrl] = useState('');
  const [knowledgeTextInput, setKnowledgeTextInput] = useState(data.knowledgeText);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onUpdate({ knowledgeFiles: [...data.knowledgeFiles, ...files] });
  };

  const addUrl = () => {
    if (newUrl.trim()) {
      onUpdate({ knowledgeUrls: [...data.knowledgeUrls, newUrl.trim()] });
      setNewUrl('');
    }
  };

  const removeUrl = (index: number) => {
    const updatedUrls = data.knowledgeUrls.filter((_, i) => i !== index);
    onUpdate({ knowledgeUrls: updatedUrls });
  };

  const toggleFunction = (functionId: string) => {
    const existingFunction = data.functions.find(f => f.id === functionId);
    if (existingFunction) {
      onUpdate({
        functions: data.functions.filter(f => f.id !== functionId)
      });
    } else {
      const func = availableFunctions.find(f => f.id === functionId);
      if (func) {
        onUpdate({
          functions: [...data.functions, { ...func, enabled: true }]
        });
      }
    }
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
        {/* Knowledge Base */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">Upload Documents</Label>
                <div className="mt-2 border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 mb-2">
                    Drop files here or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.csv,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="border-gray-600 text-gray-300"
                  >
                    Browse Files
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Supported formats: PDF, CSV, DOC, DOCX, TXT
                </p>
                {data.knowledgeFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {data.knowledgeFiles.map((file, index) => (
                      <div key={index} className="text-sm text-green-400">
                        📎 {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="knowledge-urls" className="text-white">URLs for Web Crawling</Label>
                <div className="flex mt-1">
                  <Input
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Button
                    onClick={addUrl}
                    variant="outline"
                    size="sm"
                    className="ml-2 border-gray-600 text-gray-300"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {data.knowledgeUrls.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {data.knowledgeUrls.map((url, index) => (
                      <div key={index} className="flex items-center justify-between text-sm bg-gray-700 rounded px-2 py-1">
                        <span className="text-blue-400">{url}</span>
                        <Button
                          onClick={() => removeUrl(index)}
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

              <div>
                <Label htmlFor="knowledge-text" className="text-white">Manual Text Input</Label>
                <Textarea
                  id="knowledge-text"
                  value={knowledgeTextInput}
                  onChange={(e) => setKnowledgeTextInput(e.target.value)}
                  onBlur={() => onUpdate({ knowledgeText: knowledgeTextInput })}
                  placeholder="Enter any additional knowledge or context..."
                  className="bg-gray-700 border-gray-600 text-white mt-1"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Functions & Memory */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Functions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {availableFunctions.map((func) => {
                  const isEnabled = data.functions.some(f => f.id === func.id);
                  return (
                    <div key={func.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-white">{func.name}</div>
                        <div className="text-sm text-gray-400">{func.description}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFunction(func.id)}
                        className={isEnabled ? 'text-green-400' : 'text-gray-400'}
                      >
                        {isEnabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Memory Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">
                  Memory Length: {data.memoryLength} messages
                </Label>
                <Slider
                  value={[data.memoryLength]}
                  onValueChange={([value]) => onUpdate({ memoryLength: value })}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full mt-2"
                />
                <p className="text-xs text-gray-400 mt-1">
                  How many previous messages your agent remembers during conversations.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="long-term-memory"
                  checked={data.enableLongTermMemory}
                  onCheckedChange={(checked) => onUpdate({ enableLongTermMemory: !!checked })}
                />
                <Label htmlFor="long-term-memory" className="text-white">
                  Enable Long-term Recall
                </Label>
              </div>
              <p className="text-xs text-gray-400">
                Allow memory across different conversations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
