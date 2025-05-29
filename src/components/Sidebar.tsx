
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Megaphone, MessageSquare, Mic, BarChart3, Zap, Shield, Rocket, Settings, ChevronLeft, ChevronRight, Crown, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Overview & metrics', path: '/' },
  { id: 'agents', label: 'Agents', icon: Bot, description: 'Create & manage AI agents', path: '/agents' },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone, description: 'Campaign management', path: '/campaigns' },
  { id: 'conversation-studio', label: 'Conversation Studio', icon: MessageSquare, description: 'Design conversation flows', path: '/conversation-studio' },
  { id: 'voice-studio', label: 'Voice Studio', icon: Mic, description: 'Configure voice properties', path: '/voice-studio' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Performance metrics', path: '/analytics' },
  { id: 'integrations', label: 'Integrations', icon: Zap, description: 'Connect platforms', path: '/integrations' },
  { id: 'security', label: 'Security', icon: Shield, description: 'Access & compliance', path: '/security' },
  { id: 'deployment', label: 'Deployment', icon: Rocket, description: 'Deploy to environments', path: '/deployment' },
  { id: 'settings', label: 'Settings', icon: Settings, description: 'System configuration', path: '/settings' },
];

export const Sidebar = ({ activeModule, setActiveModule, collapsed, setCollapsed }: SidebarProps) => {
  const navigate = useNavigate();

  const handleModuleClick = (moduleId: string, path: string) => {
    setActiveModule(moduleId);
    navigate(path);
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
      <nav className="p-2 space-y-1">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => handleModuleClick(module.id, module.path)}
            className={cn(
              "w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group",
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

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Pro Plan</div>
            <div className="text-sm font-medium text-purple-300">Unlimited Agents</div>
            <div className="text-xs text-gray-500">∞ conversations</div>
          </div>
        </div>
      )}
    </div>
  );
};
