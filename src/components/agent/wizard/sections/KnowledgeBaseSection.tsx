
import { useState } from 'react';
import { Upload, Plus, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AgentWizardData } from '../useAgentWizard';

interface KnowledgeBaseSectionProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

export const KnowledgeBaseSection = ({ data, onUpdate }: KnowledgeBaseSectionProps) => {
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

  return (
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
              variant="default"
              size="sm"
              onClick={() => document.getElementById('file-upload')?.click()}
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
              variant="secondary"
              size="sm"
              className="ml-2"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {data.knowledgeUrls.length > 0 && (
            <div className="mt-2 space-y-1">
              {data.knowledgeUrls.map((url, index) => (
                <div key={index} className="flex items-center justify-between text-sm bg-gray-700 rounded px-2 py-1">
                  <span className="text-cyan-400">{url}</span>
                  <Button
                    onClick={() => removeUrl(index)}
                    variant="ghost"
                    size="sm"
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
  );
};
