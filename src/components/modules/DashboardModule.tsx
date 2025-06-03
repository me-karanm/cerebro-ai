
import { useState } from 'react';
import { Users, MessageCircle, DollarSign, Zap, Bell, ChevronDown, Phone, Target, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AgentCarousel } from '@/components/dashboard/AgentCarousel';
import { PhoneNumbersSection } from '@/components/dashboard/PhoneNumbersSection';
import { SentimentAnalysis } from '@/components/dashboard/SentimentAnalysis';
import { ConversationQuality } from '@/components/dashboard/ConversationQuality';
import { useIntegrationsStore } from '@/store/integrationsStore';

const billingFilters = ['Current Billing Cycle', 'Last Billing Cycle', 'Last 3 Months', 'This Year'];

export const DashboardModule = () => {
  const navigate = useNavigate();
  const [selectedBilling, setSelectedBilling] = useState('Current Billing Cycle');
  const { phoneNumbers, whatsappAccounts, emailAccounts, telegramBots, wechatAccounts } = useIntegrationsStore();

  // Calculate dynamic values
  const totalPhoneNumbers = phoneNumbers.length;
  const totalChannels = phoneNumbers.length + whatsappAccounts.length + emailAccounts.length + telegramBots.length + wechatAccounts.length;
  const totalCost = (phoneNumbers.length * 4.99 + whatsappAccounts.length * 15 + emailAccounts.length * 8 + telegramBots.length * 5 + wechatAccounts.length * 12).toFixed(2);

  const statsData = [
    {
      icon: Users,
      label: 'Total Agents',
      value: '05',
      tooltip: 'Count of all AI agents configured'
    },
    {
      icon: Target,
      label: 'Total Campaigns',
      value: '05',
      tooltip: 'Number of active or configured campaigns'
    },
    {
      icon: Phone,
      label: 'Total Phone Numbers',
      value: totalPhoneNumbers.toString().padStart(2, '0'),
      tooltip: 'Total phone numbers purchased and available'
    },
    {
      icon: Zap,
      label: 'Total Channels',
      value: totalChannels.toString().padStart(2, '0'),
      tooltip: 'Number of communication channels enabled (e.g., WhatsApp, Email, SMS, Voice)'
    },
    {
      icon: DollarSign,
      label: 'Total Cost',
      value: `$${totalCost}`,
      tooltip: 'Current billing or expense for the period'
    },
    {
      icon: CreditCard,
      label: 'Credits Used',
      value: '200 / 1000',
      tooltip: 'Credits consumed vs. total allocated'
    }
  ];

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
          </div>
        </div>
      </div>

      {/* Summary Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
          <SentimentAnalysis />
        </div>
      </div>

      {/* Conversation Quality */}
      <ConversationQuality />

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
};
