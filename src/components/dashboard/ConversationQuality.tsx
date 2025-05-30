
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
    <Card className="bg-gray-900 border-gray-800 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-white">Conversation Quality</CardTitle>
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
