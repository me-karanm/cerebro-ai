
import { useState } from 'react';
import { Users, MessageCircle, DollarSign, Zap, Bell, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AgentCarousel } from '@/components/dashboard/AgentCarousel';
import { PhoneNumbersSection } from '@/components/dashboard/PhoneNumbersSection';
import { SentimentAnalysis } from '@/components/dashboard/SentimentAnalysis';
import { ConversationQuality } from '@/components/dashboard/ConversationQuality';

const statsData = [
  {
    icon: Users,
    label: 'Total Agents',
    value: '05',
    tooltip: 'Total number of AI agents in your account'
  },
  {
    icon: MessageCircle,
    label: 'Total Conversations',
    value: '1,248',
    tooltip: 'Total conversations across all agents'
  },
  {
    icon: DollarSign,
    label: 'Total Cost',
    value: '$205.99',
    tooltip: 'Total cost for this billing period'
  },
  {
    icon: Zap,
    label: 'Total Channels',
    value: '350',
    tooltip: 'Total active communication channels'
  },
  {
    icon: Users,
    label: 'Active Users',
    value: '127',
    tooltip: 'Currently active users across all channels'
  },
  {
    icon: MessageCircle,
    label: 'Success Rate',
    value: '68.2%',
    tooltip: 'Overall success rate across all conversations'
  }
];

const billingFilters = ['Current Billing Cycle', 'Last Billing Cycle', 'Last 3 Months', 'This Year'];

export const DashboardModule = () => {
  const navigate = useNavigate();
  const [selectedBilling, setSelectedBilling] = useState('Current Billing Cycle');

  const handleCreateAgent = () => {
    navigate('/agents/create');
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Overview of your AI agent platform</p>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 text-sm">
                {selectedBilling}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
              {billingFilters.map((filter) => (
                <DropdownMenuItem
                  key={filter}
                  onClick={() => setSelectedBilling(filter)}
                  className="text-white hover:bg-gray-700 text-sm"
                >
                  {filter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-cyan-400 transition-colors" />
            <Avatar className="w-8 h-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gray-700 text-white text-sm">AD</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-400">admin@cerebroai.com</span>
          </div>
        </div>
      </div>

      {/* Summary Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Carousel */}
        <AgentCarousel onCreateAgent={handleCreateAgent} />

        {/* Phone Numbers & Sentiment */}
        <div className="space-y-6">
          <PhoneNumbersSection />
          <SentimentAnalysis onCreateAgent={handleCreateAgent} />
        </div>
      </div>

      {/* Conversation Quality */}
      <ConversationQuality />

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
};
