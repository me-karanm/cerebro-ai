
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Info } from 'lucide-react';
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
  { value: 'gpt-4', label: 'GPT-4', description: 'Most capable model' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', description: 'Fast and efficient' },
  { value: 'claude-3', label: 'Claude 3', description: 'Excellent reasoning' },
  { value: 'claude-3-haiku', label: 'Claude 3 Haiku', description: 'Speed optimized' },
];

// Voice Studio voices with gender and accent info
const voiceStudioVoices = [
  { value: 'voice-1', label: 'Sarah', gender: 'Female', accent: 'American', description: 'Professional and warm' },
  { value: 'voice-2', label: 'Michael', gender: 'Male', accent: 'British', description: 'Sophisticated and clear' },
  { value: 'voice-3', label: 'Emma', gender: 'Female', accent: 'Australian', description: 'Friendly and energetic' },
  { value: 'voice-4', label: 'David', gender: 'Male', accent: 'American', description: 'Confident and trustworthy' },
  { value: 'voice-5', label: 'Isabella', gender: 'Female', accent: 'Spanish', description: 'Elegant and expressive' },
  { value: 'voice-6', label: 'James', gender: 'Male', accent: 'Canadian', description: 'Calm and professional' },
];

export const AgentBasicsStep = ({ data, onUpdate }: AgentBasicsStepProps) => {
  const handleVoicePreview = (voiceValue: string) => {
    console.log('Playing preview for voice:', voiceValue);
    // Mock function for voice preview - would integrate with actual voice API
  };

  const selectedVoice = voiceStudioVoices.find(v => v.value === data.selectedVoice);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Agent Basics</h2>
        <p className="text-gray-400 text-lg">
          Configure the fundamental settings for your AI agent.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Information */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="agent-name" className="text-white text-sm font-medium">
                  Agent Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="agent-name"
                  value={data.name}
                  onChange={(e) => onUpdate({ name: e.target.value })}
                  placeholder="Enter a unique and descriptive name"
                  className="bg-gray-700 border-gray-600 text-white mt-2 h-11"
                />
                {!data.name && (
                  <p className="text-red-400 text-xs mt-1">Agent name is required</p>
                )}
              </div>

              <div>
                <Label htmlFor="agent-description" className="text-white text-sm font-medium">
                  Description <span className="text-gray-400">(Optional)</span>
                </Label>
                <Textarea
                  id="agent-description"
                  value={data.description || ''}
                  onChange={(e) => onUpdate({ description: e.target.value })}
                  placeholder="Brief description of your agent's purpose and capabilities"
                  className="bg-gray-700 border-gray-600 text-white mt-2"
                  rows={3}
                />
              </div>

              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="initial-message" className="text-white text-sm font-medium cursor-help flex items-center space-x-1">
                        <span>Initial Message</span>
                        <span className="text-gray-400">(Optional)</span>
                        <Info className="w-3 h-3 text-gray-400" />
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-700 border-gray-600 text-white max-w-xs">
                      <p>This is the first message users will see when starting a conversation with your agent. Leave empty if you prefer the agent to wait for user input.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Textarea
                  id="initial-message"
                  value={data.initialMessage || ''}
                  onChange={(e) => onUpdate({ initialMessage: e.target.value })}
                  placeholder="Hello! I'm here to help you today. How can I assist you?"
                  className="bg-gray-700 border-gray-600 text-white mt-2"
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
            <CardContent className="space-y-6">
              <div>
                <Label className="text-white text-sm font-medium">
                  Voice Selection <span className="text-red-400">*</span>
                </Label>
                <div className="flex space-x-2 mt-2">
                  <Select
                    value={data.selectedVoice}
                    onValueChange={(value) => onUpdate({ selectedVoice: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white flex-1 h-11">
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {voiceStudioVoices.map((voice) => (
                        <SelectItem key={voice.value} value={voice.value} className="text-white">
                          <div className="flex flex-col py-1">
                            <span className="font-medium">{voice.label}</span>
                            <span className="text-xs text-gray-400">
                              {voice.gender} • {voice.accent} • {voice.description}
                            </span>
                          </div>
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
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 h-11 px-3"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Choose from voices created in Voice Studio
                </p>
                {!data.selectedVoice && (
                  <p className="text-red-400 text-xs mt-1">Voice selection is required</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Model Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-white text-sm font-medium">
                  LLM Model Selection <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={data.llmModel}
                  onValueChange={(value) => onUpdate({ llmModel: value })}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2 h-11">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {llmModels.map((model) => (
                      <SelectItem key={model.value} value={model.value} className="text-white">
                        <div className="flex flex-col py-1">
                          <span className="font-medium">{model.label}</span>
                          <span className="text-xs text-gray-400">{model.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!data.llmModel && (
                  <p className="text-red-400 text-xs mt-1">LLM model selection is required</p>
                )}
              </div>

              <div>
                <Label className="text-white text-sm font-medium">
                  Temperature: {data.temperature.toFixed(1)}
                </Label>
                <div className="mt-3">
                  <Slider
                    value={[data.temperature]}
                    onValueChange={([value]) => onUpdate({ temperature: value })}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                    showValue={true}
                    valueSuffix=""
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Conservative (0.0)</span>
                    <span>Creative (1.0)</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Controls randomness in responses. Lower values are more focused and deterministic.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
