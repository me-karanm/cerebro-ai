
import { Key } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export const SDKSection = () => {
  const jsSnippet = `<script src="https://cdn.cerebro.ai/widget.js"></script>
<script>
  CerebroWidget.init({
    agentId: 'your-agent-id',
    apiKey: 'your-api-key',
    theme: 'dark'
  });
</script>`;

  const apiSnippet = `curl -X POST https://api.cerebro.ai/v1/conversations \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Hello", "agent_id": "your-agent-id"}'`;

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Key className="w-5 h-5 mr-2" />
          SDK & API Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-white font-medium mb-2">JavaScript SDK</h4>
          <Textarea
            readOnly
            value={jsSnippet}
            className="bg-gray-900 border-gray-700 text-gray-300 font-mono text-sm h-24"
          />
        </div>
        <div>
          <h4 className="text-white font-medium mb-2">REST API</h4>
          <Textarea
            readOnly
            value={apiSnippet}
            className="bg-gray-900 border-gray-700 text-gray-300 font-mono text-sm h-24"
          />
        </div>
      </CardContent>
    </Card>
  );
};
