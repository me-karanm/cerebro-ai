
import { useState } from 'react';
import { Upload, FileText, Globe, Link, Eye, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { AgentWizardData } from '../useAgentWizard';

interface KnowledgeBaseSectionProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

export const KnowledgeBaseSection = ({ data, onUpdate }: KnowledgeBaseSectionProps) => {
  const [newUrl, setNewUrl] = useState('');
  const [newBoardUrl, setNewBoardUrl] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onUpdate({
      knowledgeFiles: [...data.knowledgeFiles, ...files]
    });
  };

  const addUrl = () => {
    if (newUrl.trim()) {
      onUpdate({
        knowledgeUrls: [...data.knowledgeUrls, newUrl.trim()]
      });
      setNewUrl('');
    }
  };

  const addBoardUrl = () => {
    if (newBoardUrl.trim()) {
      const boardUrls = data.knowledgeUrls.filter(url => 
        url.includes('draw.io') || url.includes('miro.com') || url.includes('diagrams.net')
      );
      onUpdate({
        knowledgeUrls: [...data.knowledgeUrls.filter(url => 
          !url.includes('draw.io') && !url.includes('miro.com') && !url.includes('diagrams.net')
        ), ...boardUrls, newBoardUrl.trim()]
      });
      setNewBoardUrl('');
    }
  };

  const removeUrl = (index: number) => {
    const updatedUrls = data.knowledgeUrls.filter((_, i) => i !== index);
    onUpdate({ knowledgeUrls: updatedUrls });
  };

  const removeFile = (index: number) => {
    const updatedFiles = data.knowledgeFiles.filter((_, i) => i !== index);
    onUpdate({ knowledgeFiles: updatedFiles });
  };

  const isBoardUrl = (url: string) => {
    return url.includes('draw.io') || url.includes('miro.com') || url.includes('diagrams.net');
  };

  const getBoardThumbnail = (url: string) => {
    if (url.includes('miro.com')) {
      return `${url.split('?')[0]}/thumbnail.png`;
    }
    if (url.includes('draw.io') || url.includes('diagrams.net')) {
      return null;
    }
    return null;
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Knowledge Base
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* RAG Toggle */}
        <div className="flex items-center space-x-2 p-4 bg-gray-700 rounded-lg">
          <Checkbox
            id="use-rag"
            checked={data.useRAG}
            onCheckedChange={(checked) => onUpdate({ useRAG: !!checked })}
          />
          <Label htmlFor="use-rag" className="text-white">
            Enable RAG (Retrieval Augmented Generation)
          </Label>
        </div>
        <p className="text-xs text-gray-400 -mt-4">
          Enable knowledge base integration for more accurate and context-aware responses.
        </p>

        {/* Knowledge Input Fields - Only show if RAG is enabled */}
        {data.useRAG && (
          <>
            {/* File Upload */}
            <div className="space-y-2">
              <Label className="text-gray-300">Upload Documents</Label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 mb-2">Drag & drop files or click to browse</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.txt,.md"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="border-gray-600 text-gray-300"
                >
                  Select Files
                </Button>
              </div>
              {data.knowledgeFiles.length > 0 && (
                <div className="space-y-2">
                  {data.knowledgeFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                      <span className="text-white text-sm">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Website URLs */}
            <div className="space-y-2">
              <Label className="text-gray-300">Website URLs</Label>
              <div className="flex space-x-2">
                <Input
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Button
                  onClick={addUrl}
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Add URL
                </Button>
              </div>
            </div>

            {/* Diagram Boards */}
            <div className="space-y-2">
              <Label className="text-gray-300">Diagram Boards (Draw.io, Miro)</Label>
              <div className="flex space-x-2">
                <Input
                  value={newBoardUrl}
                  onChange={(e) => setNewBoardUrl(e.target.value)}
                  placeholder="https://app.diagrams.net/... or https://miro.com/app/board/..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Button
                  onClick={addBoardUrl}
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  <Link className="w-4 h-4 mr-2" />
                  Add Board
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Paste shareable URLs from Draw.io (diagrams.net) or Miro boards
              </p>
            </div>

            {/* Added URLs and Boards */}
            {data.knowledgeUrls.length > 0 && (
              <div className="space-y-2">
                <Label className="text-gray-300">Added Resources</Label>
                <div className="space-y-2">
                  {data.knowledgeUrls.map((url, index) => (
                    <div key={index} className={`bg-gray-700 rounded-lg p-3 ${isBoardUrl(url) ? 'border border-purple-500/30' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            {isBoardUrl(url) ? (
                              <>
                                <Link className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">
                                  {url.includes('miro.com') ? 'Miro Board' : 'Draw.io Diagram'}
                                </Badge>
                              </>
                            ) : (
                              <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-white text-sm truncate">{url}</p>
                          
                          {isBoardUrl(url) && (
                            <div className="mt-2 flex items-center space-x-2">
                              {getBoardThumbnail(url) && (
                                <div className="w-16 h-12 bg-gray-600 rounded border overflow-hidden">
                                  <img
                                    src={getBoardThumbnail(url)!}
                                    alt="Board thumbnail"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(url, '_blank')}
                                className="text-purple-400 hover:text-purple-300 text-xs h-6"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                Preview
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(url, '_blank')}
                                className="text-gray-400 hover:text-gray-300 text-xs h-6"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Open
                              </Button>
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeUrl(index)}
                          className="text-red-400 hover:text-red-300 ml-2"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Text Input */}
            <div className="space-y-2">
              <Label className="text-gray-300">Direct Text Input</Label>
              <Textarea
                value={data.knowledgeText}
                onChange={(e) => onUpdate({ knowledgeText: e.target.value })}
                placeholder="Enter any additional knowledge or context for your agent..."
                className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
