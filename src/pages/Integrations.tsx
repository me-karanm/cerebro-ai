
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChannelsModule } from '@/components/modules/ChannelsModule';
import { TopHeader } from '@/components/layout/TopHeader';

const Integrations = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <TopHeader />
      <Sidebar
        activeModule="channels"
        setActiveModule={() => {}}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 pt-16 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <ChannelsModule />
      </main>
    </div>
  );
};

export default Integrations;
