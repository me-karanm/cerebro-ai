
import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ContactFilters } from '@/types/contact';

interface Agent {
  id: string;
  name: string;
}

interface Campaign {
  id: string;
  name: string;
}

interface ContactsFiltersProps {
  filters: ContactFilters;
  onFiltersChange: (filters: Partial<ContactFilters>) => void;
  agents: Agent[];
  campaigns: Campaign[];
}

const sourceOptions = [
  { value: '', label: 'All Sources' },
  { value: 'manual', label: 'Manual' },
  { value: 'csv', label: 'CSV Import' },
  { value: 'api', label: 'API' },
];

const commonTags = ['Lead', 'Hot', 'Warm', 'Cold', 'Customer', 'VIP', 'Prospect'];

export const ContactsFilters = ({ 
  filters, 
  onFiltersChange, 
  agents, 
  campaigns 
}: ContactsFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (value: string) => {
    onFiltersChange({ search: value });
  };

  const handleFilterChange = (key: keyof ContactFilters, value: string) => {
    onFiltersChange({ [key]: value });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    onFiltersChange({ tags: newTags });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      assignedAgent: '',
      campaign: '',
      tags: [],
      source: '',
    });
  };

  const hasActiveFilters = filters.search || filters.assignedAgent || filters.campaign || 
    (filters.tags && filters.tags.length > 0) || filters.source;

  return (
    <Card className="bg-gray-800 border-gray-700 mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search contacts by name, email, or phone..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
              {/* Agent Filter */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Assigned Agent</label>
                <Select
                  value={filters.assignedAgent}
                  onValueChange={(value) => handleFilterChange('assignedAgent', value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Agents" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="">All Agents</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Campaign Filter */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Campaign</label>
                <Select
                  value={filters.campaign}
                  onValueChange={(value) => handleFilterChange('campaign', value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Campaigns" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="">All Campaigns</SelectItem>
                    {campaigns.map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Source Filter */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Source</label>
                <Select
                  value={filters.source}
                  onValueChange={(value) => handleFilterChange('source', value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {sourceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Tags Filter */}
          {showAdvanced && (
            <div className="pt-4 border-t border-gray-700">
              <label className="text-sm text-gray-400 mb-3 block">Filter by Tags</label>
              <div className="flex flex-wrap gap-2">
                {commonTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={filters.tags?.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      filters.tags?.includes(tag)
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700">
              <span className="text-sm text-gray-400">Active filters:</span>
              {filters.search && (
                <Badge variant="secondary" className="bg-gray-600 text-gray-200">
                  Search: "{filters.search}"
                </Badge>
              )}
              {filters.assignedAgent && (
                <Badge variant="secondary" className="bg-gray-600 text-gray-200">
                  Agent: {agents.find(a => a.id === filters.assignedAgent)?.name || 'Unassigned'}
                </Badge>
              )}
              {filters.campaign && (
                <Badge variant="secondary" className="bg-gray-600 text-gray-200">
                  Campaign: {campaigns.find(c => c.id === filters.campaign)?.name}
                </Badge>
              )}
              {filters.source && (
                <Badge variant="secondary" className="bg-gray-600 text-gray-200">
                  Source: {sourceOptions.find(s => s.value === filters.source)?.label}
                </Badge>
              )}
              {filters.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-gray-600 text-gray-200">
                  Tag: {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
