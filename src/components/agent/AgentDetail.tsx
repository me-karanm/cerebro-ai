
import { useState } from 'react';
import { ArrowLeft, Save, Play, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: string;
  language: string;
  voice: string;
  conversations: number;
  successRate: number;
  lastUpdated: string;
  persona: string;
}

interface AgentDetailProps {
  agent: Agent;
  onBack: () => void;
}

export const AgentDetail = ({ agent, onBack }: AgentDetailProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                {agent.status}
              </Badge>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">ID: {agent.id}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <Play className="w-4 h-4 mr-2" />
            Test Agent
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
          <TabsTrigger value="flows">Flows</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Agent Name</label>
                  <Input defaultValue={agent.name} className="bg-gray-900 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <Textarea defaultValue={agent.description} className="bg-gray-900 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Default Language</label>
                  <Select defaultValue="en">
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Persona & Behavior</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Persona Prompt</label>
                  <Textarea 
                    defaultValue={agent.persona}
                    className="bg-gray-900 border-gray-700 text-white h-32"
                    placeholder="Describe how your agent should behave, its personality, and communication style..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">First Message</label>
                  <Textarea 
                    defaultValue="Hello! I'm here to help you today. How can I assist you?"
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Upload Knowledge Files</h3>
                <p className="text-gray-400 mb-4">
                  Upload documents, FAQs, or training data to enhance your agent's knowledge
                </p>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Voice Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Voice Selection</label>
                  <Select defaultValue="professional-female">
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional-female">Professional Female</SelectItem>
                      <SelectItem value="energetic-male">Energetic Male</SelectItem>
                      <SelectItem value="calm-male">Calm Male</SelectItem>
                      <SelectItem value="friendly-female">Friendly Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">TTS Engine</label>
                  <Select defaultValue="elevenlabs">
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                      <SelectItem value="openai">OpenAI TTS</SelectItem>
                      <SelectItem value="azure">Azure Speech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Voice Parameters</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pitch</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      defaultValue="1"
                      className="w-full accent-purple-500"
                    />
                    <span className="text-xs text-gray-400">Normal</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Rate</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      defaultValue="1"
                      className="w-full accent-purple-500"
                    />
                    <span className="text-xs text-gray-400">Normal</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Volume</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      defaultValue="0.8"
                      className="w-full accent-purple-500"
                    />
                    <span className="text-xs text-gray-400">80%</span>
                  </div>
                </div>
              </div>

              <div>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Play className="w-4 h-4 mr-2" />
                  Test Voice
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Agent Testing Sandbox</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto mb-4">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                      Hello! I'm here to help you today. How can I assist you?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs">
                      I need help with my account settings
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                      I'd be happy to help you with your account settings. What specific setting would you like to modify?
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Type your test message..."
                  className="bg-gray-900 border-gray-700 text-white flex-1"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
