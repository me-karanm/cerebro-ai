
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { SettingsModule } from '@/components/modules/SettingsModule';

const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <Sidebar
        activeModule="settings"
        setActiveModule={() => {}}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <SettingsModule />
      </main>
    </div>
  );
};

export default Settings;
