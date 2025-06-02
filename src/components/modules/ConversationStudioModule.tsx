
import { useState } from 'react';
import { Code, Eye, Play, Save, GitBranch, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export const ConversationStudioModule = () => {
  const [viewMode, setViewMode] = useState('code');
  const [conversationScript, setConversationScript] = useState(`# Customer Support Flow

## Intent: Greeting
**User**: Hello, hi, hey
**Response**: Hello! Welcome to our support center. How can I help you today?

## Intent: Account Issues
**User**: account problem, login issue, can't access
**Response**: I understand you're having trouble with your account. Let me help you with that.
**Action**: check_account_status
**Follow-up**: Based on your account status, here's what I can do for you...

## Intent: Billing Questions
**User**: billing, invoice, payment, charge
**Response**: I'd be happy to help with your billing questions. 
**Action**: get_billing_info
**Follow-up**: I can see your billing information. What specific question do you have?

## Intent: Technical Support
**User**: not working, broken, error, bug
**Response**: I'm sorry you're experiencing technical difficulties. Let me troubleshoot this with you.
**Action**: start_diagnostics
**Follow-up**: I've run some diagnostics. Here's what I found...

## Fallback
**Response**: I want to make sure I understand you correctly. Could you please rephrase that or choose from these options: Account, Billing, or Technical Support?`);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Conversation Studio</h1>
          <p className="text-gray-400">Design conversation flows and dialogue management</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <GitBranch className="w-4 h-4 mr-2" />
            Version History
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Flow
          </Button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Tabs value={viewMode} onValueChange={setViewMode}>
              <TabsList className="bg-gray-900">
                <TabsTrigger value="code" className="flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span>Script Mode</span>
                </TabsTrigger>
                <TabsTrigger value="visual" className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Visual Mode</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <Play className="w-4 h-4 mr-2" />
                Test Flow
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700 h-full">
            <CardHeader>
              <CardTitle className="text-white">
                {viewMode === 'code' ? 'Conversation Script' : 'Visual Flow Builder'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {viewMode === 'code' ? (
                <Textarea
                  value={conversationScript}
                  onChange={(e) => setConversationScript(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white font-mono h-96 resize-none"
                  placeholder="Define your conversation flows using our script syntax..."
                />
              ) : (
                <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-auto">
                  {/* Visual Flow Builder - Simplified representation */}
                  <div className="space-y-4">
                    <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                      <h4 className="font-medium">Greeting Intent</h4>
                      <p className="text-sm text-blue-100">Trigger: hello, hi, hey</p>
                    </div>
                    <div className="ml-8">
                      <div className="bg-gray-700 text-white p-3 rounded-lg max-w-md">
                        <h4 className="font-medium">Response</h4>
                        <p className="text-sm">Hello! Welcome to our support center. How can I help you today?</p>
                      </div>
                    </div>
                    <div className="bg-purple-600 text-white p-3 rounded-lg max-w-xs">
                      <h4 className="font-medium">Account Issues Intent</h4>
                      <p className="text-sm text-purple-100">Trigger: account problem, login issue</p>
                    </div>
                    <div className="ml-8">
                      <div className="bg-gray-700 text-white p-3 rounded-lg max-w-md">
                        <h4 className="font-medium">Action</h4>
                        <p className="text-sm">check_account_status</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Flow Statistics */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Flow Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Intents:</span>
                <span className="text-white">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Responses:</span>
                <span className="text-white">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Actions:</span>
                <span className="text-white">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fallbacks:</span>
                <span className="text-white">1</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 justify-start"
              >
                Add Intent
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 justify-start"
              >
                Add Response
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 justify-start"
              >
                Add Action
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 justify-start"
              >
                Add Condition
              </Button>
            </CardContent>
          </Card>

          {/* Test Simulator */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Test Simulator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-3 h-40 overflow-y-auto mb-3 text-sm">
                <div className="space-y-2">
                  <div className="text-blue-400">Bot: Hello! How can I help you today?</div>
                  <div className="text-gray-300">You: I have an account problem</div>
                  <div className="text-blue-400">Bot: I understand you're having trouble with your account. Let me help you with that.</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a test message..."
                  className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                />
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
