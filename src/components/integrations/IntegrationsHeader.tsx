
import { Settings, Zap } from 'lucide-react';

export const IntegrationsHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Integrations</h1>
      </div>
      <p className="text-gray-400 max-w-4xl">
        Connect your agent to various platforms and services. Configure integrations once and reuse them across multiple agents.
      </p>
    </div>
  );
};
