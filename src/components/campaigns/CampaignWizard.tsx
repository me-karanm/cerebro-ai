
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Target, Settings, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface CampaignData {
  name: string;
  description: string;
  type: string;
  objective: string;
  startDate: string;
  endDate: string;
  budget: number;
  assignedAgents: string[];
  targetAudience: string;
  expectedContacts: number;
  priority: string;
}

const mockAgents = [
  { id: '1', name: 'Sales Agent Pro', persona: 'sales', capabilities: ['lead-generation', 'follow-up'], status: 'active' },
  { id: '2', name: 'Customer Support AI', persona: 'support', capabilities: ['customer-service', 'troubleshooting'], status: 'active' },
  { id: '3', name: 'Lead Qualifier Bot', persona: 'qualifier', capabilities: ['lead-qualification', 'screening'], status: 'active' },
  { id: '4', name: 'Marketing Assistant', persona: 'marketing', capabilities: ['outreach', 'content'], status: 'draft' },
];

const campaignTypes = [
  { value: 'lead-generation', label: 'Lead Generation' },
  { value: 'customer-service', label: 'Customer Service' },
  { value: 'marketing-outreach', label: 'Marketing Outreach' },
  { value: 'follow-up', label: 'Follow-up Campaign' },
  { value: 'survey', label: 'Survey & Feedback' },
];

const campaignObjectives = [
  { value: 'generate-leads', label: 'Generate Leads' },
  { value: 'increase-sales', label: 'Increase Sales' },
  { value: 'customer-satisfaction', label: 'Customer Satisfaction' },
  { value: 'brand-awareness', label: 'Brand Awareness' },
  { value: 'product-promotion', label: 'Product Promotion' },
];

export const CampaignWizard = ({ isOpen, onClose, editingCampaign }: {
  isOpen: boolean;
  onClose: () => void;
  editingCampaign?: any;
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: editingCampaign?.name || '',
    description: editingCampaign?.description || '',
    type: editingCampaign?.type || '',
    objective: editingCampaign?.objective || '',
    startDate: editingCampaign?.startDate || '',
    endDate: editingCampaign?.endDate || '',
    budget: editingCampaign?.budget || 0,
    assignedAgents: editingCampaign?.assignedAgents || [],
    targetAudience: editingCampaign?.targetAudience || '',
    expectedContacts: editingCampaign?.expectedContacts || 0,
    priority: editingCampaign?.priority || 'medium',
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Campaign Data:', campaignData);
    toast({
      title: editingCampaign ? "Campaign Updated" : "Campaign Created",
      description: `${campaignData.name} has been ${editingCampaign ? 'updated' : 'created'} successfully.`,
    });
    onClose();
    navigate('/campaigns');
  };

  const getAgentsByPersona = (persona: string) => {
    return mockAgents.filter(agent => agent.persona === persona && agent.status === 'active');
  };

  const toggleAgent = (agentId: string) => {
    setCampaignData(prev => ({
      ...prev,
      assignedAgents: prev.assignedAgents.includes(agentId)
        ? prev.assignedAgents.filter(id => id !== agentId)
        : [...prev.assignedAgents, agentId]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
            </h2>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
              ×
            </Button>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {currentStep === 1 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Campaign Name</Label>
                  <Input
                    id="name"
                    value={campaignData.name}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter campaign name"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-gray-300">Description</Label>
                  <Textarea
                    id="description"
                    value={campaignData.description}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the campaign goals and strategy"
                    className="bg-gray-700 border-gray-600 text-white"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Campaign Type</Label>
                    <Select value={campaignData.type} onValueChange={(value) => setCampaignData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {campaignTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300">Objective</Label>
                    <Select value={campaignData.objective} onValueChange={(value) => setCampaignData(prev => ({ ...prev, objective: value }))}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select objective" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {campaignObjectives.map(obj => (
                          <SelectItem key={obj.value} value={obj.value}>{obj.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Timeline & Budget
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate" className="text-gray-300">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={campaignData.startDate}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate" className="text-gray-300">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={campaignData.endDate}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget" className="text-gray-300">Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={campaignData.budget}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                      placeholder="0"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expectedContacts" className="text-gray-300">Expected Contacts</Label>
                    <Input
                      id="expectedContacts"
                      type="number"
                      value={campaignData.expectedContacts}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, expectedContacts: Number(e.target.value) }))}
                      placeholder="0"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Priority</Label>
                  <Select value={campaignData.priority} onValueChange={(value) => setCampaignData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Agent Assignment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {['sales', 'support', 'qualifier', 'marketing'].map(persona => {
                  const agents = getAgentsByPersona(persona);
                  if (agents.length === 0) return null;
                  
                  return (
                    <div key={persona}>
                      <h4 className="text-lg font-semibold text-white mb-3 capitalize">{persona} Agents</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {agents.map(agent => (
                          <div
                            key={agent.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                              campaignData.assignedAgents.includes(agent.id)
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                            }`}
                            onClick={() => toggleAgent(agent.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-white">{agent.name}</h5>
                                <div className="flex space-x-2 mt-1">
                                  {agent.capabilities.map(cap => (
                                    <Badge key={cap} variant="secondary" className="text-xs">
                                      {cap}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              {campaignData.assignedAgents.includes(agent.id) && (
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-sm">✓</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Review & Finalize
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">Campaign Details</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-400">Name:</span> <span className="text-white">{campaignData.name}</span></div>
                      <div><span className="text-gray-400">Type:</span> <span className="text-white">{campaignTypes.find(t => t.value === campaignData.type)?.label}</span></div>
                      <div><span className="text-gray-400">Objective:</span> <span className="text-white">{campaignObjectives.find(o => o.value === campaignData.objective)?.label}</span></div>
                      <div><span className="text-gray-400">Duration:</span> <span className="text-white">{campaignData.startDate} to {campaignData.endDate}</span></div>
                      <div><span className="text-gray-400">Budget:</span> <span className="text-white">${campaignData.budget.toLocaleString()}</span></div>
                      <div><span className="text-gray-400">Expected Contacts:</span> <span className="text-white">{campaignData.expectedContacts.toLocaleString()}</span></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3">Assigned Agents ({campaignData.assignedAgents.length})</h4>
                    <div className="space-y-2">
                      {campaignData.assignedAgents.map(agentId => {
                        const agent = mockAgents.find(a => a.id === agentId);
                        return agent ? (
                          <div key={agentId} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-white">{agent.name}</span>
                            <Badge variant="secondary" className="text-xs">{agent.persona}</Badge>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="p-6 border-t border-gray-700 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="border-gray-600 text-gray-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep === totalSteps ? (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {editingCampaign ? 'Update Campaign' : 'Create Campaign'}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
