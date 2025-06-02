
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AgentsHeaderProps {
  onCreateAgent: () => void;
}

export const AgentsHeader = ({ onCreateAgent }: AgentsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">Agents</h1>
        <p className="text-gray-400 text-sm">Create and manage your AI agents</p>
      </div>
      <Button 
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full sm:w-auto"
        onClick={onCreateAgent}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Agent
      </Button>
    </div>
  );
};
