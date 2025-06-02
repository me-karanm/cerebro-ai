
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AgentsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const AgentsFilters = ({ searchTerm, onSearchChange }: AgentsFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
      <div className="relative flex-1 max-w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search agents..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-700 text-white"
        />
      </div>
      <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 w-full sm:w-auto">
        <Filter className="w-4 h-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};
