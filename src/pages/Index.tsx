
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardModule } from '@/components/modules/DashboardModule';
import { AgentsModule } from '@/components/modules/AgentsModule';
import { CampaignsModule } from '@/components/modules/CampaignsModule';
import { VoiceStudioModule } from '@/components/modules/VoiceStudioModule';
import { AnalyticsModule } from '@/components/modules/AnalyticsModule';
import { ChannelsModule } from '@/components/modules/ChannelsModule';
import { SecurityModule } from '@/components/modules/SecurityModule';
import { DeploymentModule } from '@/components/modules/DeploymentModule';
import { SettingsModule } from '@/components/modules/SettingsModule';

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardModule />;
      case 'agents':
        return <AgentsModule />;
      case 'campaigns':
        return <CampaignsModule />;
      case 'voice-studio':
        return <VoiceStudioModule />;
      case 'analytics':
        return <AnalyticsModule />;
      case 'channels':
        return <ChannelsModule />;
      case 'security':
        return <SecurityModule />;
      case 'deployment':
        return <DeploymentModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <DashboardModule />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full max-w-full overflow-hidden">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 min-w-0 max-w-full overflow-hidden ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="w-full h-full max-w-full overflow-hidden">
          {renderActiveModule()}
        </div>
      </main>
    </div>
  );
};

export default Index;
