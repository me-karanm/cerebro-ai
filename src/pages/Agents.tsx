
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AgentsModule } from '@/components/modules/AgentsModule';

const Agents = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <Sidebar
        activeModule="agents"
        setActiveModule={() => {}}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <AgentsModule />
      </main>
    </div>
  );
};

export default Agents;
