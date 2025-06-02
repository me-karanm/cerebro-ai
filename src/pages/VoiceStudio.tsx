
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { VoiceStudioModule } from '@/components/modules/VoiceStudioModule';

const VoiceStudio = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <Sidebar
        activeModule="voice-studio"
        setActiveModule={() => {}} // No-op since we're on a dedicated page
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <VoiceStudioModule />
      </main>
    </div>
  );
};

export default VoiceStudio;
