
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

interface WidgetRetentionStepProps {
  data: AgentWizardData;
  onUpdate: (updates: Partial<AgentWizardData>) => void;
}

const retentionPresets = [
  { value: 7, label: '7 days' },
  { value: 30, label: '30 days' },
  { value: 90, label: '90 days' },
  { value: 365, label: '1 year' },
];

const widgetPositions = [
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'top-left', label: 'Top Left' },
];

export const WidgetRetentionStep = ({ data, onUpdate }: WidgetRetentionStepProps) => {
  const [copied, setCopied] = useState(false);

  const embedCode = `<script src="https://cerebro.ai/widget.js" data-agent-id="AGENT_ID" async></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Widget & Retention</h2>
        <p className="text-gray-400 mb-6">
          Configure data retention settings and chat widget for your website.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Retention */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Data Retention Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="retention-days" className="text-white">
                  Data Retention Period (days)
                </Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="retention-days"
                    type="number"
                    value={data.dataRetentionDays}
                    onChange={(e) => onUpdate({ dataRetentionDays: parseInt(e.target.value) || 30 })}
                    className="bg-gray-700 border-gray-600 text-white"
                    min="1"
                    max="365"
                  />
                  <Select
                    value={data.dataRetentionDays.toString()}
                    onValueChange={(value) => onUpdate({ dataRetentionDays: parseInt(value) })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {retentionPresets.map((preset) => (
                        <SelectItem key={preset.value} value={preset.value.toString()} className="text-white">
                          {preset.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  How long conversation data should be stored before automatic deletion.
                </p>
              </div>

              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <h4 className="text-blue-200 font-medium mb-2">Security & Privacy</h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Encrypted communication (TLS 1.3)</li>
                  <li>• Automatic data deletion</li>
                  <li>• GDPR/CCPA compliance</li>
                  <li>• No third-party data sharing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Widget */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Chat Widget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enable-widget"
                  checked={data.enableWidget}
                  onCheckedChange={(checked) => onUpdate({ enableWidget: !!checked })}
                />
                <Label htmlFor="enable-widget" className="text-white">
                  Enable chat widget on your website
                </Label>
              </div>

              {data.enableWidget && (
                <>
                  <div>
                    <Label htmlFor="widget-color" className="text-white">Primary Color</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        id="widget-color"
                        type="color"
                        value={data.widgetColor}
                        onChange={(e) => onUpdate({ widgetColor: e.target.value })}
                        className="w-16 h-10 bg-gray-700 border-gray-600"
                      />
                      <Input
                        value={data.widgetColor}
                        onChange={(e) => onUpdate({ widgetColor: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="#7C3AED"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Widget Position</Label>
                    <Select
                      value={data.widgetPosition}
                      onValueChange={(value) => onUpdate({ widgetPosition: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {widgetPositions.map((position) => (
                          <SelectItem key={position.value} value={position.value} className="text-white">
                            {position.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white">Widget Preview</Label>
                    <div className="mt-2 p-4 bg-gray-700 rounded-lg border-2 border-dashed border-gray-600">
                      <div className="relative w-full h-32 bg-gray-600 rounded">
                        <div 
                          className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg ${
                            data.widgetPosition === 'bottom-right' ? 'bottom-2 right-2' :
                            data.widgetPosition === 'bottom-left' ? 'bottom-2 left-2' :
                            data.widgetPosition === 'top-right' ? 'top-2 right-2' :
                            'top-2 left-2'
                          }`}
                          style={{ backgroundColor: data.widgetColor }}
                        >
                          💬
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Embed Code</Label>
                    <div className="mt-2 relative">
                      <pre className="bg-gray-900 p-3 rounded text-green-400 text-xs overflow-x-auto">
                        {embedCode}
                      </pre>
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 border-gray-600 text-gray-300"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
