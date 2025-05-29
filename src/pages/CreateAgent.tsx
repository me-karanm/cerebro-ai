
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { CreateAgentWizard } from '@/components/agent/CreateAgentWizard';

const CreateAgent = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleModuleChange = (module: string) => {
    console.log('Navigating to module:', module);
    switch (module) {
      case 'dashboard':
        navigate('/');
        break;
      case 'agents':
        navigate('/agents');
        break;
      case 'channels':
        navigate('/channels');
        break;
      // Add other routes as they become available
      default:
        console.log(`Module ${module} not yet implemented`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <Sidebar
        activeModule="agents"
        setActiveModule={handleModuleChange}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <CreateAgentWizard />
      </main>
    </div>
  );
};

export default CreateAgent;
