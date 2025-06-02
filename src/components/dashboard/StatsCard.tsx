
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
        <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-sm font-medium truncate">{label}</p>
                <p className="text-2xl font-bold text-white mt-1 truncate">{value}</p>
              </div>
              <div className="flex-shrink-0 ml-3">
                <Icon className="w-8 h-8 text-cyan-400" />
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
