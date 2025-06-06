
import { useState } from 'react';
import { Bot, Megaphone, Mic, BarChart3, Zap, Shield, Settings, ChevronLeft, ChevronRight, Crown, LayoutDashboard, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { ProfileCard } from '@/components/sidebar/ProfileCard';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Overview & metrics' },
  { id: 'agents', label: 'Agents', icon: Bot, description: 'Create & manage AI agents' },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone, description: 'Campaign management' },
  { id: 'contacts', label: 'Contacts', icon: Users, description: 'Manage contact lists' },
  { id: 'voice-studio', label: 'Voice Studio', icon: Mic, description: 'Configure voice properties' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Performance metrics' },
  { id: 'channels', label: 'Channels & Integrations', icon: Zap, description: 'Connect platforms' },
  { id: 'security', label: 'Security', icon: Shield, description: 'Access & compliance' },
  { id: 'settings', label: 'Settings', icon: Settings, description: 'System configuration' },
];

export const Sidebar = ({ activeModule, setActiveModule, collapsed, setCollapsed }: SidebarProps) => {
  const navigate = useNavigate();

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
    
    switch (moduleId) {
      case 'dashboard':
        navigate('/');
        break;
      case 'agents':
        navigate('/agents');
        break;
      case 'campaigns':
        navigate('/campaigns');
        break;
      case 'contacts':
        navigate('/contacts');
        break;
      case 'channels':
        navigate('/channels');
        break;
      case 'voice-studio':
        navigate('/voice-studio');
        break;
      case 'analytics':
        navigate('/analytics');
        break;
      case 'security':
        navigate('/security');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        console.log(`Navigation to ${moduleId} not implemented yet`);
        break;
    }
  };

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-800 transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Cerebro
              </h1>
              <p className="text-xs text-gray-400">AI Agent Platform</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-gray-800 rounded transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => handleModuleClick(module.id)}
            className={cn(
              "w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group cursor-pointer",
              activeModule === module.id
                ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-purple-300"
                : "hover:bg-gray-800 text-gray-300 hover:text-white"
            )}
            title={collapsed ? module.label : undefined}
          >
            <module.icon className={cn(
              "w-5 h-5 flex-shrink-0",
              activeModule === module.id ? "text-purple-400" : "text-gray-400 group-hover:text-white"
            )} />
            {!collapsed && (
              <div className="text-left">
                <div className="text-sm font-medium">{module.label}</div>
                <div className="text-xs text-gray-400">{module.description}</div>
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Profile Card */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <ProfileCard />
        </div>
      )}
    </div>
  );
};
