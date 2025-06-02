
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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

// Mock voices from Voice Studio
const voiceStudioVoices = [
  { value: 'voice-1', label: 'Sarah (Professional)' },
  { value: 'voice-2', label: 'Michael (Friendly)' },
  { value: 'voice-3', label: 'Emma (Energetic)' },
  { value: 'voice-4', label: 'David (Calm)' },
];

export const AgentBasicsStep = ({ data, onUpdate }: AgentBasicsStepProps) => {
  const handleVoicePreview = (voiceValue: string) => {
    // Mock function for voice preview
    console.log('Playing preview for voice:', voiceValue);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Agent Basics</h2>
        <p className="text-gray-400 mb-6">
          Configure the fundamental settings for your AI agent.
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
              </div>

              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="initial-message" className="text-white cursor-help">
                        Initial Message
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-700 border-gray-600 text-white">
                      <p>The first message users will see when they start interacting with your agent</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Textarea
                  id="initial-message"
                  value={data.initialMessage}
                  onChange={(e) => onUpdate({ initialMessage: e.target.value })}
                  placeholder="Hello! I'm here to help you today. How can I assist you?"
                  className="bg-gray-700 border-gray-600 text-white mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Voice & Model Configuration */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Voice Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">Voice Selection</Label>
                <div className="flex space-x-2 mt-1">
                  <Select
                    value={data.selectedVoice}
                    onValueChange={(value) => onUpdate({ selectedVoice: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white flex-1">
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {voiceStudioVoices.map((voice) => (
                        <SelectItem key={voice.value} value={voice.value} className="text-white">
                          {voice.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleVoicePreview(data.selectedVoice)}
                    disabled={!data.selectedVoice}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Choose from voices created in Voice Studio
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
                    <span>Conservative (0.0)</span>
                    <span>Creative (1.0)</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Adjust the creativity level of your agent's responses
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
