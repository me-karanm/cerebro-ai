
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { SettingsModule } from '@/components/modules/SettingsModule';

const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen w-screen bg-gray-950 text-white flex overflow-hidden">
      <Sidebar
        activeModule="settings"
        setActiveModule={() => {}}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 h-full transition-all duration-300 overflow-hidden ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          <SettingsModule />
        </div>
      </main>
    </div>
  );
};

export default Settings;
