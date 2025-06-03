
import { useState } from 'react';
import { Settings, User, LogOut, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ProfileCard = () => {
  const handleProfileClick = () => {
    console.log('Navigate to profile');
  };

  const handleSettingsClick = () => {
    console.log('Navigate to settings');
  };

  const handleLogoutClick = () => {
    console.log('Logout user');
  };

  return (
    <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-lg">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full p-3 flex items-center space-x-3 hover:bg-purple-600/5 rounded-lg transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-medium">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-purple-300">Admin User</div>
              <div className="text-xs text-gray-400">admin@cerebroai.com</div>
            </div>
            <ChevronUp className="w-4 h-4 text-gray-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          side="top"
          className="w-56 bg-gray-800 border-gray-700 mb-2"
        >
          <DropdownMenuItem 
            onClick={handleProfileClick}
            className="text-white hover:bg-gray-700 cursor-pointer"
          >
            <User className="w-4 h-4 mr-2" />
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleSettingsClick}
            className="text-white hover:bg-gray-700 cursor-pointer"
          >
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem 
            onClick={handleLogoutClick}
            className="text-red-400 hover:bg-gray-700 hover:text-red-300 cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
