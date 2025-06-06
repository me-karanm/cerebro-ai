
import { useState } from 'react';
import { Search, Filter, Calendar, TrendingUp, Users, Target } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface CampaignFiltersProps {
  onFiltersChange: (filters: any) => void;
}

export const CampaignFilters = ({ onFiltersChange }: CampaignFiltersProps) => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all',
    agent: 'all',
    dateRange: '30d',
    performanceGoal: 'all',
    budgetRange: 'all',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      search: '',
      status: 'all',
      type: 'all',
      agent: 'all',
      dateRange: '30d',
      performanceGoal: 'all',
      budgetRange: 'all',
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '' && value !== 'all' && value !== '30d').length;

  return (
    <Card className="bg-gray-800 border-gray-700 mb-6">
      <CardContent className="p-6">
        {/* Search and Quick Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search campaigns..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.dateRange} onValueChange={(value) => updateFilter('dateRange', value)}>
              <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="1d">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Filter className="w-4 h-4 mr-2" />
              Advanced
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-purple-600 text-white">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {activeFiltersCount > 0 && (
              <Button variant="ghost" onClick={clearFilters} className="text-gray-400 hover:text-white">
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="border-t border-gray-700 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Campaign Type</label>
                <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <Target className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="lead-generation">Lead Generation</SelectItem>
                    <SelectItem value="customer-service">Customer Service</SelectItem>
                    <SelectItem value="marketing-outreach">Marketing Outreach</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="survey">Survey & Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Assigned Agent</label>
                <Select value={filters.agent} onValueChange={(value) => updateFilter('agent', value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Agents</SelectItem>
                    <SelectItem value="sales-agent-pro">Sales Agent Pro</SelectItem>
                    <SelectItem value="customer-support-ai">Customer Support AI</SelectItem>
                    <SelectItem value="lead-qualifier-bot">Lead Qualifier Bot</SelectItem>
                    <SelectItem value="marketing-assistant">Marketing Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Performance Goal</label>
                <Select value={filters.performanceGoal} onValueChange={(value) => updateFilter('performanceGoal', value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Goals</SelectItem>
                    <SelectItem value="high-conversion">High Conversion (&gt;40%)</SelectItem>
                    <SelectItem value="medium-conversion">Medium Conversion (20-40%)</SelectItem>
                    <SelectItem value="lead-volume">High Lead Volume</SelectItem>
                    <SelectItem value="cost-effective">Cost Effective</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Budget Range</label>
                <Select value={filters.budgetRange} onValueChange={(value) => updateFilter('budgetRange', value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Budgets</SelectItem>
                    <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                    <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10000+">$10,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700">
            <span className="text-sm text-gray-400">Active filters:</span>
            {Object.entries(filters).map(([key, value]) => {
              if (value && value !== 'all' && value !== '' && value !== '30d') {
                return (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="bg-purple-600/20 text-purple-300 border border-purple-600/30"
                  >
                    {key}: {value}
                  </Badge>
                );
              }
              return null;
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
