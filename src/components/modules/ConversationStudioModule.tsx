
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
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">Conversation Studio</h1>
          <p className="text-gray-400 text-sm">Design conversation flows and dialogue management</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
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
        <CardContent className="p-3 lg:p-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <Tabs value={viewMode} onValueChange={setViewMode}>
              <TabsList className="bg-gray-900 w-full sm:w-auto">
                <TabsTrigger value="code" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Code className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Script Mode</span>
                </TabsTrigger>
                <TabsTrigger value="visual" className="flex items-center gap-2 text-xs sm:text-sm">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Visual Mode</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex flex-col sm:flex-row gap-2">
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Main Editor */}
        <div className="xl:col-span-2">
          <Card className="bg-gray-800 border-gray-700 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm sm:text-base">
                {viewMode === 'code' ? 'Conversation Script' : 'Visual Flow Builder'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 lg:p-4">
              {viewMode === 'code' ? (
                <Textarea
                  value={conversationScript}
                  onChange={(e) => setConversationScript(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white font-mono h-80 lg:h-96 resize-none text-xs sm:text-sm"
                  placeholder="Define your conversation flows using our script syntax..."
                />
              ) : (
                <div className="bg-gray-900 rounded-lg p-3 lg:p-4 h-80 lg:h-96 overflow-auto">
                  {/* Visual Flow Builder - Simplified representation */}
                  <div className="space-y-3 lg:space-y-4">
                    <div className="bg-blue-600 text-white p-2 lg:p-3 rounded-lg max-w-xs">
                      <h4 className="font-medium text-sm">Greeting Intent</h4>
                      <p className="text-xs text-blue-100">Trigger: hello, hi, hey</p>
                    </div>
                    <div className="ml-4 lg:ml-8">
                      <div className="bg-gray-700 text-white p-2 lg:p-3 rounded-lg max-w-md">
                        <h4 className="font-medium text-sm">Response</h4>
                        <p className="text-xs">Hello! Welcome to our support center. How can I help you today?</p>
                      </div>
                    </div>
                    <div className="bg-purple-600 text-white p-2 lg:p-3 rounded-lg max-w-xs">
                      <h4 className="font-medium text-sm">Account Issues Intent</h4>
                      <p className="text-xs text-purple-100">Trigger: account problem, login issue</p>
                    </div>
                    <div className="ml-4 lg:ml-8">
                      <div className="bg-gray-700 text-white p-2 lg:p-3 rounded-lg max-w-md">
                        <h4 className="font-medium text-sm">Action</h4>
                        <p className="text-xs">check_account_status</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-4 lg:space-y-6">
          {/* Flow Statistics */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm sm:text-base">Flow Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 lg:space-y-3 p-3 lg:p-4">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-400">Intents:</span>
                <span className="text-white">4</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-400">Responses:</span>
                <span className="text-white">8</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-400">Actions:</span>
                <span className="text-white">3</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-400">Fallbacks:</span>
                <span className="text-white">1</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm sm:text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-3 lg:p-4">
              <Button 
                variant="outline" 
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 justify-start text-xs sm:text-sm"
              >
                Add Intent
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 justify-start text-xs sm:text-sm"
              >
                Add Response
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 justify-start text-xs sm:text-sm"
              >
                Add Action
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 justify-start text-xs sm:text-sm"
              >
                Add Condition
              </Button>
            </CardContent>
          </Card>

          {/* Test Simulator */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm sm:text-base">Test Simulator</CardTitle>
            </CardHeader>
            <CardContent className="p-3 lg:p-4">
              <div className="bg-gray-900 rounded-lg p-2 lg:p-3 h-32 lg:h-40 overflow-y-auto mb-3 text-xs sm:text-sm">
                <div className="space-y-2">
                  <div className="text-blue-400">Bot: Hello! How can I help you today?</div>
                  <div className="text-gray-300">You: I have an account problem</div>
                  <div className="text-blue-400">Bot: I understand you're having trouble with your account. Let me help you with that.</div>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a test message..."
                  className="flex-1 bg-gray-900 border border-gray-700 rounded px-2 lg:px-3 py-1 lg:py-2 text-white text-xs sm:text-sm min-w-0"
                />
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 text-xs sm:text-sm flex-shrink-0">
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
