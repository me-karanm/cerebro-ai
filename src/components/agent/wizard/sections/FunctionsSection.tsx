
import { useState } from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AgentWizardData } from '../useAgentWizard';

interface FunctionsSectionProps {
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

export const FunctionsSection = ({ data, onUpdate }: FunctionsSectionProps) => {
  const [customFunctionCode, setCustomFunctionCode] = useState(data.customFunctionCode || '');

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

  const isCustomFunctionEnabled = data.functions.some(f => f.id === 'custom');

  return (
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
                  className={isEnabled ? 'text-green-400 hover:bg-green-900/20' : 'text-gray-400 hover:bg-gray-600'}
                >
                  {isEnabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Custom Function Code Editor */}
        {isCustomFunctionEnabled && (
          <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-600">
            <Label className="text-white mb-2 block">Custom Function Code</Label>
            <Textarea
              value={customFunctionCode}
              onChange={(e) => {
                setCustomFunctionCode(e.target.value);
                onUpdate({ customFunctionCode: e.target.value });
              }}
              placeholder={`// Write your custom JavaScript function here
function myCustomFunction(params) {
  // Your code here
  return result;
}`}
              className="bg-gray-800 border-gray-600 text-white font-mono text-sm"
              rows={8}
            />
            <p className="text-xs text-gray-400 mt-2">
              Write JavaScript functions that your agent can call during conversations.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
