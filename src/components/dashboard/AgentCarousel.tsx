
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Agent } from '@/types/agent';
import { EmptyAgentState } from './EmptyAgentState';
import { AgentCard } from './AgentCard';
import { AgentNavigationControls } from './AgentNavigationControls';

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'SalesBot Pro',
    description: 'Advanced sales automation agent',
    status: 'active',
    language: 'English',
    voice: 'Professional Female',
    creditsUsed: 600,
    creditsTotal: 10000,
    intelligence: 85,
    voiceNaturalness: 75,
    responseRate: 90,
    lastUpdated: '2 hours ago',
    phoneNumbers: ['+1(555)123-4567', '+1(555)789-0123'],
    campaigns: ['Lead Gen Q1', 'Summer Sale'],
    conversations: 1247,
    successRate: 94,
    persona: 'Enthusiastic sales professional',
    totalMinutes: 2340,
    averageCallDuration: 4.2,
    monthlyCost: 299
  },
  {
    id: '2',
    name: 'SupportBot',
    description: 'Customer support assistant',
    status: 'active',
    language: 'English, Spanish',
    voice: 'Calm Female',
    creditsUsed: 350,
    creditsTotal: 5000,
    intelligence: 78,
    voiceNaturalness: 82,
    responseRate: 87,
    lastUpdated: '1 day ago',
    phoneNumbers: ['+1(555)987-6543'],
    campaigns: ['Support Tickets', 'Customer Care'],
    conversations: 856,
    successRate: 87,
    persona: 'Helpful customer service representative',
    totalMinutes: 1890,
    averageCallDuration: 3.8,
    monthlyCost: 249
  },
  {
    id: '3',
    name: 'LeadBot',
    description: 'Lead qualification specialist',
    status: 'inactive',
    language: 'English',
    voice: 'Energetic Male',
    creditsUsed: 150,
    creditsTotal: 3000,
    intelligence: 70,
    voiceNaturalness: 65,
    responseRate: 75,
    lastUpdated: '3 days ago',
    phoneNumbers: [],
    campaigns: ['Lead Qualification'],
    conversations: 0,
    successRate: 0,
    persona: 'Professional lead qualifier',
    totalMinutes: 0,
    averageCallDuration: 0,
    monthlyCost: 0
  }
];

interface AgentCarouselProps {
  onCreateAgent?: () => void;
}

export const AgentCarousel = ({ onCreateAgent }: AgentCarouselProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [agents, setAgents] = useState(mockAgents);

  const nextAgent = () => {
    setCurrentIndex((prev) => (prev + 1) % agents.length);
  };

  const prevAgent = () => {
    setCurrentIndex((prev) => (prev - 1 + agents.length) % agents.length);
  };

  const updateAgentSlider = (agentId: string, field: keyof Agent, value: number) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, [field]: value } : agent
    ));
  };

  const handleAgentClick = () => {
    navigate('/agents');
  };

  // If no agents exist, show create button only
  if (agents.length === 0) {
    return <EmptyAgentState onCreateAgent={onCreateAgent} />;
  }

  const currentAgent = agents[currentIndex];

  return (
    <Card className="bg-gray-900 border-gray-800 animate-fade-in w-full overflow-hidden">
      <CardContent className="p-4 sm:p-6 w-full">
        <div className="flex items-center justify-between mb-4 w-full">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <h3 className="text-white font-semibold text-lg truncate">Agent Setup</h3>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className={`w-2 h-2 rounded-full ${currentAgent.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
              <span className="text-sm text-gray-400 capitalize">{currentAgent.status}</span>
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="w-full">
            <AgentNavigationControls 
              onPrevious={prevAgent} 
              onNext={nextAgent} 
            />
            <AgentCard 
              agent={currentAgent}
              onAgentClick={handleAgentClick}
              onUpdateSlider={(field, value) => updateAgentSlider(currentAgent.id, field, value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
