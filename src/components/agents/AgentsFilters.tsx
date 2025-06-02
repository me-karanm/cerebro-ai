
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AgentsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const AgentsFilters = ({ searchTerm, onSearchChange }: AgentsFiltersProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search agents..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-700 text-white"
        />
      </div>
      <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
        <Filter className="w-4 h-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};
