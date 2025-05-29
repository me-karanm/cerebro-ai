
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Integrations = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">Channels & Integrations</h1>
            <p className="text-gray-400">Manage your communication channels and integrations</p>
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-4">Integrations Management</h2>
          <p className="text-gray-400 mb-6">
            This page will allow you to manage all your communication channels including phone numbers, 
            WhatsApp accounts, email configurations, and more.
          </p>
          <p className="text-sm text-gray-500">
            For now, you can select from the mock integrations available in the agent creation wizard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
