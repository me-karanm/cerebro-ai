
import { Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Agent } from '@/types/agent';

interface AgentCardProps {
  agent: Agent;
  onClick: (agentId: string) => void;
}

export const AgentCard = ({ agent, onClick }: AgentCardProps) => {
  return (
    <Card 
      className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-200 group cursor-pointer"
      onClick={() => onClick(agent.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
              <Badge variant={agent.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                {agent.status}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-400 text-sm">{agent.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Language:</span>
            <span className="text-white">{agent.language}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Voice:</span>
            <span className="text-white">{agent.voice}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Phone:</span>
            <span className="text-blue-400">{agent.phoneNumber || 'Not assigned'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Conversations:</span>
            <span className="text-blue-400">{agent.conversations.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Success Rate:</span>
            <span className="text-green-400">{agent.successRate}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <span className="text-xs text-gray-500">Updated {agent.lastUpdated}</span>
        </div>
      </CardContent>
    </Card>
  );
};
