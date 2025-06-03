
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { AgentBasicsStep } from './AgentBasicsStep';
import { KnowledgeFunctionsStep } from './KnowledgeFunctionsStep';
import { VoiceCallingStep } from './VoiceCallingStep';
import { ReviewStep } from './ReviewStep';
import { useAgentWizard } from './useAgentWizard';

const steps = [
  { title: 'Agent Basics', component: AgentBasicsStep },
  { title: 'Knowledge & Functions', component: KnowledgeFunctionsStep },
  { title: 'Communication Channels', component: VoiceCallingStep },
  { title: 'Review', component: ReviewStep },
];

// Mock function to load agent data for editing
const loadAgentData = (agentId: string) => {
  console.log('Loading agent data for editing:', agentId);
  return {
    name: 'SalesBot Pro',
    description: 'Professional sales assistant for lead qualification',
    initialMessage: 'Hello! I\'m here to help you with your sales inquiries.',
    llmModel: 'gpt-4',
    temperature: 0.7,
    selectedVoice: 'voice-1',
    useRAG: true,
    knowledgeText: 'Product information and sales guidelines...',
    functions: [
      { id: 'end-call', enabled: true, name: 'End Sales Call' },
      { id: 'calendar-integration', enabled: true, name: 'Schedule Follow-up' }
    ],
    connections: {
      call: { enabled: true, selectedPhoneNumberId: 'phone1' },
      whatsapp: { enabled: true, selectedAccountId: 'wa1' },
      email: { enabled: true, selectedAccountId: 'email1' },
      widget: { enabled: false, selectedAccountId: '' },
    },
    status: 'active' as const,
  };
};

export const CreateAgentWizard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editAgentId = searchParams.get('edit');
  const isEditing = !!editAgentId;
  
  const [currentStep, setCurrentStep] = useState(0);
  const { agentData, updateAgentData, validateStep, saveDraft, createAgent, loadExistingAgent } = useAgentWizard();

  const CurrentStepComponent = steps[currentStep].component;
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  useEffect(() => {
    if (isEditing && editAgentId) {
      const existingData = loadAgentData(editAgentId);
      loadExistingAgent(existingData);
    }
  }, [isEditing, editAgentId, loadExistingAgent]);

  // Auto-save draft on step change
  useEffect(() => {
    if (currentStep > 0 && agentData.name) {
      const timer = setTimeout(() => {
        saveDraft();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, agentData.name, saveDraft]);

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    await saveDraft();
  };

  const handleCreateAgent = async () => {
    const success = await createAgent(isEditing);
    if (success) {
      navigate('/agents');
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Agent Basics - Required: name, voice, model
        return agentData.name.trim() && agentData.selectedVoice && agentData.llmModel;
      case 1: // Knowledge & Functions - No required fields
        return true;
      case 2: // Communication Channels - At least one enabled
        return Object.values(agentData.connections).some(conn => conn.enabled);
      case 3: // Review - All previous validations must pass
        return agentData.name.trim() && 
               agentData.selectedVoice && 
               agentData.llmModel && 
               Object.values(agentData.connections).some(conn => conn.enabled);
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/agents')}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {isEditing ? 'Edit Agent' : 'Create New Agent'}
            </h1>
            <p className="text-gray-400">Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</p>
          </div>
        </div>
      </div>

      {/* Fixed Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              <span className={`ml-3 text-sm font-medium transition-colors duration-300 ${
                index <= currentStep ? 'text-white' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-6 transition-colors duration-300 ${
                  index < currentStep ? 'bg-purple-600' : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2" 
          showValue={false}
        />
      </div>

      {/* Step Content */}
      <Card className="bg-gray-900 border-gray-800 mb-8">
        <CardContent className="p-8">
          <CurrentStepComponent
            data={agentData}
            onUpdate={updateAgentData}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex space-x-3">
          {currentStep < steps.length - 1 && (
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
          )}

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleCreateAgent}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
              disabled={!canProceed()}
            >
              {isEditing ? 'Update Agent' : 'Create Agent'}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
              disabled={!canProceed()}
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
