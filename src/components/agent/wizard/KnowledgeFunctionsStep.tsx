
import { useState } from 'react';
import { Upload, Plus, Code, Globe, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AgentWizardData } from './useAgentWizard';

interface KnowledgeFunctionsStepProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

const availableFunctions = [
  { 
    id: 'end-call', 
    name: 'End Call', 
    description: 'Terminate the current call when conversation is complete',
    category: 'Call Management'
  },
  { 
    id: 'call-transfer', 
    name: 'Call Transfer', 
    description: 'Transfer call to another number or department',
    category: 'Call Management'
  },
  { 
    id: 'send-sms', 
    name: 'Send SMS', 
    description: 'Send text messages to users',
    category: 'Communication'
  },
  { 
    id: 'press-digit', 
    name: 'Press Digit', 
    description: 'Simulate keypad input during calls',
    category: 'Call Management'
  },
  { 
    id: 'calendar-integration', 
    name: 'Calendar Integration', 
    description: 'Schedule and manage appointments',
    category: 'Productivity'
  },
  { 
    id: 'custom-function', 
    name: 'Custom Function', 
    description: 'Create your own custom function',
    category: 'Custom'
  },
];

export const KnowledgeFunctionsStep = ({ data, onUpdate }: KnowledgeFunctionsStepProps) => {
  const [urlInput, setUrlInput] = useState('');
  const [expandedFunctions, setExpandedFunctions] = useState<Set<string>>(new Set());

  const handleRAGToggle = (enabled: boolean) => {
    onUpdate({ useRAG: enabled });
  };

  const handleFunctionToggle = (functionId: string, enabled: boolean) => {
    const currentFunctions = data.functions || [];
    
    if (enabled) {
      const functionInfo = availableFunctions.find(f => f.id === functionId);
      const newFunction = { 
        id: functionId, 
        enabled: true, 
        name: functionInfo?.name || '', 
        code: functionId === 'custom-function' ? '// Enter your custom function code here\nfunction customFunction() {\n  // Your code here\n}' : undefined
      };
      onUpdate({ functions: [...currentFunctions, newFunction] });
      
      // Auto-expand newly enabled functions
      setExpandedFunctions(prev => new Set([...prev, functionId]));
    } else {
      onUpdate({ functions: currentFunctions.filter(f => f.id !== functionId) });
      setExpandedFunctions(prev => {
        const newSet = new Set(prev);
        newSet.delete(functionId);
        return newSet;
      });
    }
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

  const toggleFunctionExpansion = (functionId: string) => {
    setExpandedFunctions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(functionId)) {
        newSet.delete(functionId);
      } else {
        newSet.add(functionId);
      }
      return newSet;
    });
  };

  const addUrl = () => {
    if (urlInput.trim()) {
      const currentUrls = data.knowledgeUrls || [];
      onUpdate({ knowledgeUrls: [...currentUrls, urlInput.trim()] });
      setUrlInput('');
    }
  };

  const removeUrl = (index: number) => {
    const currentUrls = data.knowledgeUrls || [];
    onUpdate({ knowledgeUrls: currentUrls.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Knowledge & Functions</h2>
        <p className="text-gray-400 text-lg">
          Build your agent's knowledge base and configure its capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Knowledge Section */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-white flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Knowledge Base</span>
              </CardTitle>
              <div className="flex items-center space-x-3">
                <Label className="text-gray-300 text-sm">Enable RAG</Label>
                <Switch
                  checked={data.useRAG}
                  onCheckedChange={handleRAGToggle}
                />
              </div>
            </CardHeader>
            {data.useRAG && (
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-white text-sm font-medium">Upload Files</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-300 text-sm mb-1">
                      Drop files here or click to upload
                    </p>
                    <p className="text-gray-500 text-xs mb-3">
                      Supports PDF, DOCX, TXT files (Max 10MB each)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Choose Files
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="knowledge-url" className="text-white text-sm font-medium">Website URLs</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="knowledge-url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com"
                      className="bg-gray-700 border-gray-600 text-white"
                      onKeyPress={(e) => e.key === 'Enter' && addUrl()}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addUrl}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 px-3"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {data.knowledgeUrls && data.knowledgeUrls.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {data.knowledgeUrls.map((url, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700 rounded px-3 py-2">
                          <span className="text-gray-300 text-sm truncate">{url}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeUrl(index)}
                            className="text-red-400 hover:text-red-300 h-auto p-1"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="knowledge-text" className="text-white text-sm font-medium">Manual Knowledge</Label>
                  <Textarea
                    id="knowledge-text"
                    value={data.knowledgeText}
                    onChange={(e) => onUpdate({ knowledgeText: e.target.value })}
                    placeholder="Enter knowledge content directly..."
                    className="bg-gray-700 border-gray-600 text-white mt-2"
                    rows={6}
                  />
                </div>

                <div>
                  <Label className="text-white text-sm font-medium">Visual Knowledge</Label>
                  <div className="flex space-x-2 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Draw.io Embed
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Globe className="w-4 h-4 mr-2" />
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
              <CardTitle className="text-white flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Functions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableFunctions.map((func) => {
                const isEnabled = isFunctionEnabled(func.id);
                const functionData = getFunction(func.id);
                const isExpanded = expandedFunctions.has(func.id);

                return (
                  <div key={func.id} className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-white font-medium">{func.name}</h4>
                          <Badge 
                            variant={func.id === 'custom-function' ? 'default' : 'secondary'} 
                            className="text-xs"
                          >
                            {func.category}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{func.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isEnabled && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFunctionExpansion(func.id)}
                            className="text-gray-400 hover:text-white p-1"
                          >
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </Button>
                        )}
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={(checked) => handleFunctionToggle(func.id, checked)}
                        />
                      </div>
                    </div>

                    {isEnabled && isExpanded && (
                      <div className="ml-4 space-y-4 border-l-2 border-gray-600 pl-6">
                        <div>
                          <Label className="text-white text-sm font-medium">Function Name</Label>
                          <Input
                            value={functionData?.name || ''}
                            onChange={(e) => handleFunctionUpdate(func.id, { name: e.target.value })}
                            placeholder={`Enter name for ${func.name}`}
                            className="bg-gray-700 border-gray-600 text-white mt-2"
                          />
                        </div>
                        
                        {func.id === 'custom-function' && (
                          <div>
                            <Label className="text-white text-sm font-medium flex items-center space-x-2">
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
                              className="bg-gray-700 border-gray-600 text-white mt-2 font-mono text-sm"
                              rows={8}
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
