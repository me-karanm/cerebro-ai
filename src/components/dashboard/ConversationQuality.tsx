
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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

export const ConversationQuality = () => {
  return (
    <Card className="bg-gray-900 border-gray-800 animate-fade-in w-full">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-white">Conversation Quality</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full">
          {qualityMetrics.map((metric) => (
            <Tooltip key={metric.label}>
              <TooltipTrigger asChild>
                <div className="space-y-3 p-3 lg:p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer w-full min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm truncate flex-1 mr-2">{metric.label}</span>
                    <span className="text-white font-semibold flex-shrink-0">{metric.value}</span>
                  </div>
                  <Progress value={metric.percentage} className="h-2 w-full" />
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
