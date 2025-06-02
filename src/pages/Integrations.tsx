
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChannelsModule } from '@/components/modules/ChannelsModule';

const Integrations = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen w-screen bg-gray-950 text-white flex overflow-hidden">
      <Sidebar
        activeModule="channels"
        setActiveModule={() => {}}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 h-full transition-all duration-300 overflow-hidden ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          <ChannelsModule />
        </div>
      </main>
    </div>
  );
};

export default Integrations;
