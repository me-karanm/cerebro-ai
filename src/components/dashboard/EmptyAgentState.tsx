
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EmptyAgentStateProps {
  onCreateAgent?: () => void;
}

export const EmptyAgentState = ({ onCreateAgent }: EmptyAgentStateProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Agent Setup</h3>
        </div>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">No agents configured yet</div>
          <Button 
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={onCreateAgent}
          >
            + Create New Agent
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
