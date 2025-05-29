
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AgentWizardData } from './useAgentWizard';

interface VoiceCallingStepProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

const voiceOptions = [
  { value: 'sarah', label: 'Sarah (Female, American)', description: 'Warm and professional' },
  { value: 'alex', label: 'Alex (Male, British)', description: 'Clear and authoritative' },
  { value: 'maya', label: 'Maya (Female, Australian)', description: 'Friendly and energetic' },
  { value: 'david', label: 'David (Male, American)', description: 'Deep and reassuring' },
];

const ttsEngines = [
  { value: 'elevenlabs', label: 'ElevenLabs' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'azure', label: 'Azure' },
  { value: 'google', label: 'Google' },
];

const callRoutingOptions = [
  { value: 'direct', label: 'Direct Routing' },
  { value: 'queue', label: 'Queue Based' },
  { value: 'round-robin', label: 'Round Robin' },
];

export const VoiceCallingStep = ({ data, onUpdate }: VoiceCallingStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Voice & Calling</h2>
        <p className="text-gray-400 mb-6">
          Configure voice capabilities and calling features for your agent.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Configuration */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Voice Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enable-voice"
                  checked={data.enableVoice}
                  onCheckedChange={(checked) => onUpdate({ enableVoice: !!checked })}
                />
                <Label htmlFor="enable-voice" className="text-white">
                  Enable Voice Capabilities
                </Label>
              </div>
              <p className="text-xs text-gray-400">
                Allow your agent to make and receive voice calls.
              </p>

              {data.enableVoice && (
                <>
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
                        {voiceOptions.map((voice) => (
                          <SelectItem key={voice.value} value={voice.value} className="text-white">
                            <div>
                              <div>{voice.label}</div>
                              <div className="text-xs text-gray-400">{voice.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white">TTS Engine</Label>
                    <Select
                      value={data.ttsEngine}
                      onValueChange={(value) => onUpdate({ ttsEngine: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                        <SelectValue placeholder="Select TTS engine" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {ttsEngines.map((engine) => (
                          <SelectItem key={engine.value} value={engine.value} className="text-white">
                            {engine.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Voice Settings */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Voice Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.enableVoice ? (
                <>
                  <div>
                    <Label className="text-white">
                      Pitch: {data.pitch}
                    </Label>
                    <Slider
                      value={[data.pitch]}
                      onValueChange={([value]) => onUpdate({ pitch: value })}
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-white">
                      Speed: {data.speed}
                    </Label>
                    <Slider
                      value={[data.speed]}
                      onValueChange={([value]) => onUpdate({ speed: value })}
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-white">
                      Emphasis: {data.emphasis}
                    </Label>
                    <Slider
                      value={[data.emphasis]}
                      onValueChange={([value]) => onUpdate({ emphasis: value })}
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-white">Call Routing</Label>
                    <Select
                      value={data.callRouting}
                      onValueChange={(value) => onUpdate({ callRouting: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                        <SelectValue placeholder="Select routing strategy" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {callRoutingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-white">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  Enable voice capabilities to configure voice settings.
                </p>
              )}
            </CardContent>
          </Card>

          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              📞 <strong>Note:</strong> Phone numbers will be assigned after agent creation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
