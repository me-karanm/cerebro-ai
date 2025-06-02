
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { SecurityModule } from '@/components/modules/SecurityModule';

const Security = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex w-screen h-screen bg-gray-950 text-white overflow-x-clip">
      <Sidebar
        activeModule="security"
        setActiveModule={() => {}}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 flex flex-col h-full min-w-0 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="w-full h-full overflow-y-auto overflow-x-clip">
          <SecurityModule />
        </div>
      </main>
    </div>
  );
};

export default Security;
