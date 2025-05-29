
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AgentWizardData } from '../useAgentWizard';

interface MemorySettingsSectionProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

export const MemorySettingsSection = ({ data, onUpdate }: MemorySettingsSectionProps) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Memory Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-white">
            Memory Length: {data.memoryLength} messages
          </Label>
          <Slider
            value={[data.memoryLength]}
            onValueChange={([value]) => onUpdate({ memoryLength: value })}
            max={50}
            min={1}
            step={1}
            className="w-full mt-2"
          />
          <p className="text-xs text-gray-400 mt-1">
            How many previous messages your agent remembers during conversations.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="long-term-memory"
            checked={data.enableLongTermMemory}
            onCheckedChange={(checked) => onUpdate({ enableLongTermMemory: !!checked })}
          />
          <Label htmlFor="long-term-memory" className="text-white">
            Enable Long-term Recall
          </Label>
        </div>
        <p className="text-xs text-gray-400">
          Allow memory across different conversations.
        </p>
      </CardContent>
    </Card>
  );
};
