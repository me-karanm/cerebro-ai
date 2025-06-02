
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { VoiceStudioModule } from '@/components/modules/VoiceStudioModule';

const VoiceStudio = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen w-screen bg-gray-950 text-white flex overflow-hidden">
      <Sidebar
        activeModule="voice-studio"
        setActiveModule={() => {}}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 h-full transition-all duration-300 overflow-hidden ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          <VoiceStudioModule />
        </div>
      </main>
    </div>
  );
};

export default VoiceStudio;
