
import { Phone, Megaphone } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Agent } from '@/types/agent';

interface AgentCardProps {
  agent: Agent;
  onAgentClick: () => void;
  onUpdateSlider: (field: keyof Agent, value: number) => void;
}

export const AgentCard = ({ agent, onAgentClick, onUpdateSlider }: AgentCardProps) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg p-4 relative cursor-pointer hover:bg-gray-750 transition-colors"
      onClick={onAgentClick}
    >
      <div className="mx-12">
        <div className="text-center mb-4">
          <h4 className="text-white font-medium text-lg">{agent.name}</h4>
          <p className="text-gray-400 text-sm">Last updated: {agent.lastUpdated}</p>
        </div>

        {/* Phone Numbers */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Phone Numbers</span>
          </div>
          <div className="text-sm">
            {agent.phoneNumbers.length > 0 ? (
              agent.phoneNumbers.map((phone, index) => (
                <div key={index} className="text-cyan-400">{phone}</div>
              ))
            ) : (
              <div className="text-gray-500">No phone numbers assigned</div>
            )}
          </div>
        </div>

        {/* Campaigns */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Megaphone className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Campaigns</span>
          </div>
          <div className="text-sm">
            {agent.campaigns.length > 0 ? (
              agent.campaigns.map((campaign, index) => (
                <div key={index} className="text-purple-400">{campaign}</div>
              ))
            ) : (
              <div className="text-gray-500">No campaigns assigned</div>
            )}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">AI Credits Used</span>
            <span className="text-white">{agent.creditsUsed.toLocaleString()}/{agent.creditsTotal.toLocaleString()}</span>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {Math.round((agent.creditsUsed / agent.creditsTotal) * 100)}%
            </div>
            <div className="text-gray-400 text-sm">Used</div>
          </div>

          <Progress value={(agent.creditsUsed / agent.creditsTotal) * 100} className="h-2" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Agent Intelligence</span>
              <span className="text-cyan-400 text-sm">{agent.intelligence}%</span>
            </div>
            <Slider
              value={[agent.intelligence]}
              onValueChange={([value]) => onUpdateSlider('intelligence', value)}
              max={100}
              step={1}
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Voice Naturalness</span>
              <span className="text-cyan-400 text-sm">{agent.voiceNaturalness}%</span>
            </div>
            <Slider
              value={[agent.voiceNaturalness]}
              onValueChange={([value]) => onUpdateSlider('voiceNaturalness', value)}
              max={100}
              step={1}
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Response Rate</span>
              <span className="text-cyan-400 text-sm">{agent.responseRate}%</span>
            </div>
            <Slider
              value={[agent.responseRate]}
              onValueChange={([value]) => onUpdateSlider('responseRate', value)}
              max={100}
              step={1}
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
