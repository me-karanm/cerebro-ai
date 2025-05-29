
import { useState } from 'react';
import { Plus, Search, Filter, Bot, Play, Edit, Copy, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { AgentDetail } from '@/components/agent/AgentDetail';

const sampleAgents = [
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
  },
];

const AGENTS_PER_PAGE = 6;

export const AgentsModule = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [agents] = useState(sampleAgents);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAgentClick = (agentId: string) => {
    setSelectedAgent(agentId);
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Agents</h1>
          <p className="text-gray-400">Create and manage your AI agents</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          onClick={handleCreateAgent}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Agent
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Agents</p>
                <p className="text-2xl font-bold text-white">{agents.length}</p>
              </div>
              <Bot className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Agents</p>
                <p className="text-2xl font-bold text-green-400">{agents.filter(a => a.status === 'active').length}</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Conversations</p>
                <p className="text-2xl font-bold text-blue-400">
                  {agents.reduce((sum, agent) => sum + agent.conversations, 0).toLocaleString()}
                </p>
              </div>
              <div className="text-blue-400">📞</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Success Rate</p>
                <p className="text-2xl font-bold text-purple-400">
                  {Math.round(agents.reduce((sum, agent) => sum + agent.successRate, 0) / agents.length)}%
                </p>
              </div>
              <div className="text-purple-400">📈</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAgents.map((agent) => (
          <Card 
            key={agent.id} 
            className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-all duration-200 group cursor-pointer"
            onClick={() => handleAgentClick(agent.id)}
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
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAgentClick(agent.id);
                    }}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-gray-400 hover:text-blue-400"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Play className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-gray-400 hover:text-green-400"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
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
    </div>
  );
};
