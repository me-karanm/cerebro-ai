
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AgentWizardData } from './useAgentWizard';

interface AgentBasicsStepProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

const llmModels = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'claude-3', label: 'Claude 3' },
  { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
];

const voices = [
  { value: 'alloy', label: 'Alloy' },
  { value: 'echo', label: 'Echo' },
  { value: 'fable', label: 'Fable' },
  { value: 'onyx', label: 'Onyx' },
  { value: 'nova', label: 'Nova' },
  { value: 'shimmer', label: 'Shimmer' },
];

export const AgentBasicsStep = ({ data, onUpdate }: AgentBasicsStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Agent Basics</h2>
        <p className="text-gray-400 mb-6">
          Configure the fundamental settings for your AI agent. All required fields must be completed to proceed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Basic Information */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="agent-name" className="text-white">
                  Agent Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="agent-name"
                  value={data.name}
                  onChange={(e) => onUpdate({ name: e.target.value })}
                  placeholder="Enter a unique and descriptive name"
                  className="bg-gray-700 border-gray-600 text-white mt-1"
                />
                <p className="text-xs text-gray-400 mt-1">
                  This will help you identify the agent in your dashboard and reports.
                </p>
              </div>

              <div>
                <Label htmlFor="agent-description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="agent-description"
                  value={data.description || ''}
                  onChange={(e) => onUpdate({ description: e.target.value })}
                  placeholder="Brief description of your agent's purpose"
                  className="bg-gray-700 border-gray-600 text-white mt-1"
                  rows={2}
                />
                <p className="text-xs text-gray-400 mt-1">
                  A short description that explains what this agent does.
                </p>
              </div>

              <div>
                <Label htmlFor="initial-message" className="text-white">
                  Initial Message
                </Label>
                <Textarea
                  id="initial-message"
                  value={data.initialMessage}
                  onChange={(e) => onUpdate({ initialMessage: e.target.value })}
                  placeholder="Hello! I'm here to help you today. How can I assist you?"
                  className="bg-gray-700 border-gray-600 text-white mt-1"
                  rows={3}
                />
                <p className="text-xs text-gray-400 mt-1">
                  This is the first message users will see when they start interacting with your agent. Leave blank to use default.
                </p>
              </div>

              <div>
                <Label htmlFor="system-prompt" className="text-white">
                  System Prompt <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="system-prompt"
                  value={data.systemPrompt}
                  onChange={(e) => onUpdate({ systemPrompt: e.target.value })}
                  placeholder="You are a helpful AI assistant that..."
                  className="bg-gray-700 border-gray-600 text-white mt-1"
                  rows={4}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Define your agent's personality, role, and behavioral guidelines.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Voice Settings & Model Configuration */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Voice Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">Voice Selection</Label>
                <Select
                  value={data.selectedVoice}
                  onValueChange={(value) => onUpdate({ selectedVoice: value })}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {voices.map((voice) => (
                      <SelectItem key={voice.value} value={voice.value} className="text-white">
                        {voice.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400 mt-1">
                  Choose the voice that will represent your agent.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Model Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">LLM Model Selection</Label>
                <Select
                  value={data.llmModel}
                  onValueChange={(value) => onUpdate({ llmModel: value })}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {llmModels.map((model) => (
                      <SelectItem key={model.value} value={model.value} className="text-white">
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400 mt-1">
                  Choose the Large Language Model powering your agent.
                </p>
              </div>

              <div>
                <Label className="text-white">
                  Temperature: {data.temperature}
                </Label>
                <div className="mt-2">
                  <Slider
                    value={[data.temperature]}
                    onValueChange={([value]) => onUpdate({ temperature: value })}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Conservative (0)</span>
                    <span>Creative (1)</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Adjust the creativity level of your agent's responses.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
