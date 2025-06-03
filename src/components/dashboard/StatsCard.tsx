
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
        <Card className="bg-gray-900/80 border-gray-700/50 hover:bg-gray-800/60 hover:border-gray-600/50 transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm h-32">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-start justify-between mb-auto">
              <div className="flex-1 min-h-0">
                <div className="h-12 flex items-start">
                  <p className="text-gray-300 text-sm font-medium leading-tight line-clamp-2">{label}</p>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <Icon className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="mt-auto">
              <p className="text-3xl font-bold text-white leading-none">{value}</p>
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
