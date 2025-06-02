
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Agent } from '@/types/agent';
import { AgentsHeader } from '@/components/agents/AgentsHeader';
import { AgentsStats } from '@/components/agents/AgentsStats';
import { AgentsFilters } from '@/components/agents/AgentsFilters';
import { AgentsGrid } from '@/components/agents/AgentsGrid';
import { AgentDetail } from '@/components/agent/AgentDetail';
import { DuplicateAgentModal } from '@/components/agent/DuplicateAgentModal';

const sampleAgents: Agent[] = [
  {
    id: '1',
    name: 'Customer Support Agent',
    description: 'Handles customer inquiries and support tickets',
    status: 'active',
    language: 'English',
    voice: 'Professional Female',
    conversations: 1247,
    successRate: 94,
    lastUpdated: '2 hours ago',
    persona: 'Friendly and helpful customer service representative',
    creditsUsed: 600,
    creditsTotal: 10000,
    intelligence: 85,
    voiceNaturalness: 75,
    responseRate: 90,
    phoneNumber: '+1(555)123-4567',
    campaigns: ['Support Tickets', 'Customer Care'],
    totalMinutes: 2340,
    averageCallDuration: 4.2,
    monthlyCost: 299
  },
  {
    id: '2',
    name: 'Sales Assistant',
    description: 'Qualifies leads and schedules appointments',
    status: 'active',
    language: 'English, Spanish',
    voice: 'Energetic Male',
    conversations: 856,
    successRate: 87,
    lastUpdated: '1 day ago',
    persona: 'Enthusiastic sales professional focused on results',
    creditsUsed: 450,
    creditsTotal: 8000,
    intelligence: 82,
    voiceNaturalness: 78,
    responseRate: 85,
    phoneNumber: '+1(555)789-0123',
    campaigns: ['Lead Gen Q1', 'Summer Sale'],
    totalMinutes: 1890,
    averageCallDuration: 3.8,
    monthlyCost: 249
  },
  {
    id: '3',
    name: 'Technical Support',
    description: 'Provides technical assistance and troubleshooting',
    status: 'draft',
    language: 'English',
    voice: 'Calm Male',
    conversations: 0,
    successRate: 0,
    lastUpdated: '3 days ago',
    persona: 'Patient and knowledgeable technical expert',
    creditsUsed: 0,
    creditsTotal: 5000,
    intelligence: 88,
    voiceNaturalness: 80,
    responseRate: 0,
    campaigns: ['Tech Support'],
    totalMinutes: 0,
    averageCallDuration: 0,
    monthlyCost: 0
  },
  {
    id: '4',
    name: 'Marketing Assistant',
    description: 'Helps with marketing campaigns and lead generation',
    status: 'active',
    language: 'English',
    voice: 'Friendly Female',
    conversations: 523,
    successRate: 91,
    lastUpdated: '5 hours ago',
    persona: 'Creative and enthusiastic marketing specialist',
    creditsUsed: 320,
    creditsTotal: 6000,
    intelligence: 79,
    voiceNaturalness: 85,
    responseRate: 88,
    campaigns: ['Marketing Campaign'],
    totalMinutes: 1245,
    averageCallDuration: 3.5,
    monthlyCost: 189
  },
  {
    id: '5',
    name: 'HR Assistant',
    description: 'Assists with HR tasks and employee inquiries',
    status: 'draft',
    language: 'English',
    voice: 'Professional Male',
    conversations: 0,
    successRate: 0,
    lastUpdated: '1 week ago',
    persona: 'Professional and helpful HR representative',
    creditsUsed: 0,
    creditsTotal: 4000,
    intelligence: 75,
    voiceNaturalness: 72,
    responseRate: 0,
    campaigns: ['HR Support'],
    totalMinutes: 0,
    averageCallDuration: 0,
    monthlyCost: 0
  },
  {
    id: '6',
    name: 'Finance Assistant',
    description: 'Handles financial queries and invoice management',
    status: 'active',
    language: 'English',
    voice: 'Calm Female',
    conversations: 342,
    successRate: 96,
    lastUpdated: '1 day ago',
    persona: 'Detail-oriented financial expert',
    creditsUsed: 280,
    creditsTotal: 5500,
    intelligence: 86,
    voiceNaturalness: 77,
    responseRate: 92,
    campaigns: ['Finance Support'],
    totalMinutes: 967,
    averageCallDuration: 4.8,
    monthlyCost: 149
  },
];

const AGENTS_PER_PAGE = 6;

export const AgentsModule = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [agents, setAgents] = useState(sampleAgents);
  const [currentPage, setCurrentPage] = useState(1);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [agentToDuplicate, setAgentToDuplicate] = useState<Agent | null>(null);

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAgents.length / AGENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * AGENTS_PER_PAGE;
  const endIndex = startIndex + AGENTS_PER_PAGE;
  const currentAgents = filteredAgents.slice(startIndex, endIndex);

  const handleCreateAgent = () => {
    navigate('/agents/create');
  };

  const handleAgentClick = (agentId: string) => {
    setSelectedAgent(agentId);
  };

  const handleBackToAgents = () => {
    setSelectedAgent(null);
  };

  const handleDuplicateAgent = (agent: Agent, newName: string) => {
    const newAgent: Agent = {
      ...agent,
      id: Date.now().toString(),
      name: newName,
      status: 'draft',
      conversations: 0,
      creditsUsed: 0,
      totalMinutes: 0,
      averageCallDuration: 0,
      monthlyCost: 0,
      phoneNumber: undefined,
      lastUpdated: 'Just now'
    };
    setAgents(prev => [...prev, newAgent]);
    
    // Navigate to edit the duplicated agent
    navigate(`/agents/create?edit=${newAgent.id}`);
  };

  const handleDuplicateConfirm = (newName: string) => {
    if (agentToDuplicate) {
      handleDuplicateAgent(agentToDuplicate, newName);
    }
    setDuplicateModalOpen(false);
    setAgentToDuplicate(null);
  };

  if (selectedAgent) {
    const agent = agents.find(a => a.id === selectedAgent);
    if (agent) {
      return (
        <AgentDetail 
          agent={agent} 
          onBack={handleBackToAgents}
          onDuplicate={handleDuplicateAgent}
        />
      );
    }
  }

  return (
    <div className="p-6 space-y-6">
      <AgentsHeader onCreateAgent={handleCreateAgent} />
      
      <AgentsStats agents={agents} />
      
      <AgentsFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <AgentsGrid
        agents={currentAgents}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onAgentClick={handleAgentClick}
      />

      <DuplicateAgentModal
        isOpen={duplicateModalOpen}
        onClose={() => {
          setDuplicateModalOpen(false);
          setAgentToDuplicate(null);
        }}
        onConfirm={handleDuplicateConfirm}
        originalAgent={agentToDuplicate}
      />
    </div>
  );
};
