
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { SecurityModule } from '@/components/modules/SecurityModule';

const Security = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <Sidebar
        activeModule="security"
        setActiveModule={() => {}}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <SecurityModule />
      </main>
    </div>
  );
};

export default Security;
