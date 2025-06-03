
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  tooltip: string;
}

export const StatsCard = ({ icon: Icon, label, value, tooltip }: StatsCardProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="bg-gray-900/80 border-gray-700/50 hover:bg-gray-800/60 hover:border-gray-600/50 transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-gray-300 text-sm font-medium mb-3">{label}</p>
                <p className="text-3xl font-bold text-white">{value}</p>
              </div>
              <div className="ml-4">
                <Icon className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
