
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { AgentBasicsStep } from './wizard/AgentBasicsStep';
import { KnowledgeFunctionsStep } from './wizard/KnowledgeFunctionsStep';
import { VoiceCallingStep } from './wizard/VoiceCallingStep';
import { IntegrationsWebhooksStep } from './wizard/IntegrationsWebhooksStep';
import { WidgetRetentionStep } from './wizard/WidgetRetentionStep';
import { ReviewCreateStep } from './wizard/ReviewCreateStep';
import { useAgentWizard } from './wizard/useAgentWizard';

const steps = [
  { title: 'Agent Basics', component: AgentBasicsStep },
  { title: 'Knowledge & Functions', component: KnowledgeFunctionsStep },
  { title: 'Communication Channels', component: VoiceCallingStep },
  { title: 'Integrations & Webhooks', component: IntegrationsWebhooksStep },
  { title: 'Widget & Retention', component: WidgetRetentionStep },
  { title: 'Review & Create', component: ReviewCreateStep },
];

// Mock function to load agent data for editing
const loadAgentData = (agentId: string) => {
  // In a real app, this would fetch data from an API
  console.log('Loading agent data for editing:', agentId);
  return {
    name: 'SalesBot Pro',
    initialMessage: 'Hello! I\'m here to help you with your sales inquiries.',
    systemPrompt: 'You are a professional sales assistant...',
    llmModel: 'gpt-4',
    temperature: 0.7,
    useRAG: true,
    selectedVoice: 'professional-female',
    memoryLength: 10,
    enableLongTermMemory: true,
    connections: {
      call: { enabled: true, selectedPhoneNumberId: 'phone1' },
      whatsapp: { enabled: true, selectedAccountId: 'wa1' },
      telegram: { enabled: false, selectedBotId: '' },
      email: { enabled: true, selectedAccountId: 'email1' },
      wechat: { enabled: false, selectedAccountId: '' },
      widget: { enabled: false, selectedAccountId: '' },
    },
    integrations: {
      slack: true,
      teams: false,
      hubspot: true,
      zendesk: false,
    },
    webhookUrl: 'https://api.example.com/webhook',
    authHeaders: [{ key: 'Authorization', value: 'Bearer token123' }],
    maxRetries: 3,
    retryDelay: 2,
    dataRetentionDays: 30,
    enableWidget: true,
    widgetColor: '#7C3AED',
    widgetPosition: 'bottom-right',
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
      // Load existing agent data for editing
      const existingData = loadAgentData(editAgentId);
      loadExistingAgent(existingData);
    }
  }, [isEditing, editAgentId, loadExistingAgent]);

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
    // Add validation logic here
    return true;
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

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              <span className={`ml-2 text-sm ${
                index <= currentStep ? 'text-white' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-px mx-4 ${
                  index < currentStep ? 'bg-purple-600' : 'bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Step Content */}
      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardContent className="p-6">
          <CurrentStepComponent
            data={agentData}
            onUpdate={updateAgentData}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleCreateAgent}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={!canProceed()}
            >
              {isEditing ? 'Update Agent' : 'Create Agent'}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
