
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    lastUpdated: '2 hours ago'
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
    lastUpdated: '1 day ago'
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
    lastUpdated: '3 days ago'
  }
];

export const AgentCarousel = () => {
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
            <div className="bg-gray-800 rounded-lg p-4 relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevAgent}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextAgent}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              <div className="mx-12">
                <div className="text-center mb-4">
                  <h4 className="text-white font-medium text-lg">{currentAgent.name}</h4>
                  <p className="text-gray-400 text-sm">Last updated: {currentAgent.lastUpdated}</p>
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">
          + Create New Agent
        </Button>
      </CardContent>
    </Card>
  );
};
