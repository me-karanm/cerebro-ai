
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChannelsModule } from '@/components/modules/ChannelsModule';

const Integrations = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex w-screen h-screen bg-gray-950 text-white overflow-x-clip">
      <Sidebar
        activeModule="channels"
        setActiveModule={() => {}}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 flex flex-col h-full min-w-0 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="w-full h-full overflow-y-auto overflow-x-clip">
          <ChannelsModule />
        </div>
      </main>
    </div>
  );
};

export default Integrations;
