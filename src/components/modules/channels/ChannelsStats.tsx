
import { Check, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  status: string;
  config: any;
}

interface ChannelsStatsProps {
  integrations: Integration[];
}

export const ChannelsStats = ({ integrations }: ChannelsStatsProps) => {
  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const configuredCount = integrations.filter(i => i.status === 'configured').length;
  const totalCount = integrations.length;
  const categoriesCount = new Set(integrations.map(i => i.category)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Connected</p>
              <p className="text-2xl font-bold text-green-400">{connectedCount}</p>
            </div>
            <Check className="w-8 h-8 text-green-400" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Configured</p>
              <p className="text-2xl font-bold text-blue-400">{configuredCount}</p>
            </div>
            <Settings className="w-8 h-8 text-blue-400" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Available</p>
              <p className="text-2xl font-bold text-white">{totalCount}</p>
            </div>
            <div className="text-purple-400">🔗</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Categories</p>
              <p className="text-2xl font-bold text-white">{categoriesCount}</p>
            </div>
            <div className="text-yellow-400">📁</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
