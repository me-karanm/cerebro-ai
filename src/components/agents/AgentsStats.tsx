
import { Bot, Users, Clock, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Agent } from '@/types/agent';

interface AgentsStatsProps {
  agents: Agent[];
}

export const AgentsStats = ({ agents }: AgentsStatsProps) => {
  const activeAgents = agents.filter(a => a.status === 'active');
  const totalMinutes = agents.reduce((sum, agent) => sum + agent.totalMinutes, 0);
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

  return (
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
  );
};
