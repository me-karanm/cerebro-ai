
import { useState } from 'react';
import { Plus, Search, Filter, Bot, Play, Edit, Copy, ChevronLeft, ChevronRight, Users, MessageCircle, DollarSign, CreditCard, Clock, PhoneCall, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { AgentDetail } from '@/components/agent/AgentDetail';
import { DuplicateAgentModal } from '@/components/agent/DuplicateAgentModal';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Agent } from '@/types/agent';

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
  // Add more agents to demonstrate pagination
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

  // Calculate stats
  const activeAgents = agents.filter(a => a.status === 'active');
  const totalConversations = agents.reduce((sum, agent) => sum + agent.conversations, 0);
  const totalCost = agents.reduce((sum, agent) => sum + agent.monthlyCost, 0);
  const totalCredits = agents.reduce((sum, agent) => sum + agent.creditsUsed, 0);
  const totalMinutes = agents.reduce((sum, agent) => sum + agent.totalMinutes, 0);
  const avgCallDuration = activeAgents.length > 0 
    ? activeAgents.reduce((sum, agent) => sum + agent.averageCallDuration, 0) / activeAgents.length 
    : 0;
  const avgSuccessRate = activeAgents.length > 0
    ? activeAgents.reduce((sum, agent) => sum + agent.successRate, 0) / activeAgents.length
    : 0;

  const statsData = [
    {
      icon: Bot,
      label: 'Total Agents',
      value: agents.length.toString().padStart(2, '0'),
      tooltip: 'Total number of configured agents'
    },
    {
      icon: Users,
      label: 'Active Agents',
      value: activeAgents.length.toString().padStart(2, '0'),
      tooltip: 'Number of currently active agents'
    },
    {
      icon: Clock,
      label: 'Total Minutes',
      value: totalMinutes.toLocaleString(),
      tooltip: 'Cumulative minutes saved by agents through automation and AI assistance.'
    },
    {
      icon: TrendingUp,
      label: 'Average Success Rate',
      value: `${avgSuccessRate.toFixed(1)}%`,
      tooltip: 'Percentage of successful conversations leading to positive outcomes across all agents.'
    }
  ];

  const handleCreateAgent = () => {
    navigate('/agents/create');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAgentClick = (agentId: string) => {
    setSelectedAgent(agentId);
  };

  const handleDuplicateAgent = (agent: Agent) => {
    setAgentToDuplicate(agent);
    setDuplicateModalOpen(true);
  };

  const handleDuplicateConfirm = (newName: string) => {
    if (agentToDuplicate) {
      const newAgent: Agent = {
        ...agentToDuplicate,
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
    }
    setDuplicateModalOpen(false);
    setAgentToDuplicate(null);
  };

  if (selectedAgent) {
    const agent = agents.find(a => a.id === selectedAgent);
    return (
      <AgentDetail
        agent={agent!}
        onBack={() => setSelectedAgent(null)}
      />
    );
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">Agents</h1>
          <p className="text-gray-400 text-sm">Create and manage your AI agents</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full sm:w-auto"
          onClick={handleCreateAgent}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Agent
        </Button>
      </div>

      {/* Stats Cards - Responsive grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            tooltip={stat.tooltip}
          />
        ))}
      </div>

      {/* Search and Filters - moved after stats */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 w-full sm:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {currentAgents.map((agent) => (
          <Card 
            key={agent.id} 
            className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-200 group cursor-pointer"
            onClick={() => handleAgentClick(agent.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-white text-base sm:text-lg truncate">{agent.name}</CardTitle>
                    <Badge variant={agent.status === 'active' ? 'default' : 'secondary'} className="mt-1 text-xs">
                      {agent.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">{agent.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Language:</span>
                  <span className="text-white truncate ml-2">{agent.language}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Voice:</span>
                  <span className="text-white truncate ml-2">{agent.voice}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-blue-400 truncate ml-2">{agent.phoneNumber || 'Not assigned'}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Conversations:</span>
                  <span className="text-blue-400">{agent.conversations.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Success Rate:</span>
                  <span className="text-green-400">{agent.successRate}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                <span className="text-xs text-gray-500 truncate">Updated {agent.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent className="flex-wrap gap-1">
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer text-gray-300 hover:text-white'}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer text-gray-300 hover:text-white"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer text-gray-300 hover:text-white'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Duplicate Agent Modal */}
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
