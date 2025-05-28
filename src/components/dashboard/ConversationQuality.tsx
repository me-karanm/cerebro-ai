
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface QualityMetric {
  label: string;
  value: string;
  percentage: number;
  tooltip: string;
}

const qualityMetrics: QualityMetric[] = [
  {
    label: 'Average Call Duration',
    value: '4m 12s',
    percentage: 70,
    tooltip: 'Average duration of all calls this period'
  },
  {
    label: 'Customer Engagement',
    value: '72%',
    percentage: 72,
    tooltip: 'Percentage of customers who actively engaged in conversation'
  },
  {
    label: 'Call Success Rate',
    value: '59.1%',
    percentage: 59,
    tooltip: 'Percentage of calls that achieved their objective'
  }
];

const timeFilters = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year'];

export const ConversationQuality = () => {
  const [selectedFilter, setSelectedFilter] = useState('Last 7 Days');

  return (
    <Card className="bg-gray-900 border-gray-800 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Conversation Quality</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                {selectedFilter}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
              {timeFilters.map((filter) => (
                <DropdownMenuItem
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className="text-white hover:bg-gray-700"
                >
                  {filter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {qualityMetrics.map((metric) => (
            <Tooltip key={metric.label}>
              <TooltipTrigger asChild>
                <div className="space-y-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{metric.label}</span>
                    <span className="text-white font-semibold">{metric.value}</span>
                  </div>
                  <Progress value={metric.percentage} className="h-2" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{metric.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
