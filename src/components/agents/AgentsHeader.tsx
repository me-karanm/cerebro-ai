
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AgentsHeaderProps {
  onCreateAgent: () => void;
}

export const AgentsHeader = ({ onCreateAgent }: AgentsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">Agents</h1>
        <p className="text-gray-400">Create and manage your AI agents</p>
      </div>
      <Button 
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        onClick={onCreateAgent}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Agent
      </Button>
    </div>
  );
};
