import { useState } from 'react';
import { ChevronLeft, ChevronRight, Phone, Megaphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';

interface Agent {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  creditsUsed: number;
  creditsTotal: number;
  intelligence: number;
  voiceNaturalness: number;
  responseRate: number;
  lastUpdated: string;
  phoneNumbers: string[];
  campaigns: string[];
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'SalesBot Pro',
    status: 'active',
    creditsUsed: 600,
    creditsTotal: 10000,
    intelligence: 85,
    voiceNaturalness: 75,
    responseRate: 90,
    lastUpdated: '2 hours ago',
    phoneNumbers: ['+1(555)123-4567', '+1(555)789-0123'],
    campaigns: ['Lead Gen Q1', 'Summer Sale']
  },
  {
    id: '2',
    name: 'SupportBot',
    status: 'active',
    creditsUsed: 350,
    creditsTotal: 5000,
    intelligence: 78,
    voiceNaturalness: 82,
    responseRate: 87,
    lastUpdated: '1 day ago',
    phoneNumbers: ['+1(555)987-6543'],
    campaigns: ['Support Tickets', 'Customer Care']
  },
  {
    id: '3',
    name: 'LeadBot',
    status: 'inactive',
    creditsUsed: 150,
    creditsTotal: 3000,
    intelligence: 70,
    voiceNaturalness: 65,
    responseRate: 75,
    lastUpdated: '3 days ago',
    phoneNumbers: [],
    campaigns: ['Lead Qualification']
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
  }

  const currentAgent = agents[currentIndex];

  return (
    <Card className="bg-gray-900 border-gray-800 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-white font-semibold text-lg">Agent Setup</h3>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${currentAgent.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
              <span className="text-sm text-gray-400 capitalize">{currentAgent.status}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="bg-gray-800 rounded-lg p-4 relative cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={handleAgentClick}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  prevAgent();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  nextAgent();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              <div className="mx-12">
                <div className="text-center mb-4">
                  <h4 className="text-white font-medium text-lg">{currentAgent.name}</h4>
                  <p className="text-gray-400 text-sm">Last updated: {currentAgent.lastUpdated}</p>
                </div>

                {/* Phone Numbers */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Phone Numbers</span>
                  </div>
                  <div className="text-sm">
                    {currentAgent.phoneNumbers.length > 0 ? (
                      currentAgent.phoneNumbers.map((phone, index) => (
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
                    {currentAgent.campaigns.length > 0 ? (
                      currentAgent.campaigns.map((campaign, index) => (
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
                    <span className="text-white">{currentAgent.creditsUsed.toLocaleString()}/{currentAgent.creditsTotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      {Math.round((currentAgent.creditsUsed / currentAgent.creditsTotal) * 100)}%
                    </div>
                    <div className="text-gray-400 text-sm">Used</div>
                  </div>

                  <Progress value={(currentAgent.creditsUsed / currentAgent.creditsTotal) * 100} className="h-2" />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Agent Intelligence</span>
                      <span className="text-cyan-400 text-sm">{currentAgent.intelligence}%</span>
                    </div>
                    <Slider
                      value={[currentAgent.intelligence]}
                      onValueChange={([value]) => updateAgentSlider(currentAgent.id, 'intelligence', value)}
                      max={100}
                      step={1}
                      className="w-full"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Voice Naturalness</span>
                      <span className="text-cyan-400 text-sm">{currentAgent.voiceNaturalness}%</span>
                    </div>
                    <Slider
                      value={[currentAgent.voiceNaturalness]}
                      onValueChange={([value]) => updateAgentSlider(currentAgent.id, 'voiceNaturalness', value)}
                      max={100}
                      step={1}
                      className="w-full"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Response Rate</span>
                      <span className="text-cyan-400 text-sm">{currentAgent.responseRate}%</span>
                    </div>
                    <Slider
                      value={[currentAgent.responseRate]}
                      onValueChange={([value]) => updateAgentSlider(currentAgent.id, 'responseRate', value)}
                      max={100}
                      step={1}
                      className="w-full"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
