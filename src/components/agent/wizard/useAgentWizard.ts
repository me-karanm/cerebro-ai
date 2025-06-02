
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface AgentWizardData {
  // Step 1: Agent Basics
  name: string;
  description?: string;
  initialMessage?: string;
  llmModel: string;
  temperature: number;
  selectedVoice: string;

  // Step 2: Knowledge & Functions
  useRAG: boolean;
  knowledgeFiles: File[];
  knowledgeUrls: string[];
  knowledgeText: string;
  functions: Array<{
    id: string;
    enabled: boolean;
    name: string;
    code?: string;
  }>;

  // Step 3: Communication Channels
  connections: {
    call: {
      enabled: boolean;
      selectedPhoneNumberId: string;
    };
    whatsapp: {
      enabled: boolean;
      selectedAccountId: string;
    };
    email: {
      enabled: boolean;
      selectedAccountId: string;
    };
    widget: {
      enabled: boolean;
      selectedAccountId: string;
    };
  };

  // Additional fields
  status: 'draft' | 'active';
  createdAt?: string;
  updatedAt?: string;
}

const initialData: AgentWizardData = {
  name: '',
  description: '',
  initialMessage: '',
  llmModel: 'gpt-4',
  temperature: 0.7,
  selectedVoice: '',
  useRAG: false,
  knowledgeFiles: [],
  knowledgeUrls: [],
  knowledgeText: '',
  functions: [],
  connections: {
    call: {
      enabled: false,
      selectedPhoneNumberId: '',
    },
    whatsapp: {
      enabled: false,
      selectedAccountId: '',
    },
    email: {
      enabled: false,
      selectedAccountId: '',
    },
    widget: {
      enabled: false,
      selectedAccountId: '',
    },
  },
  status: 'draft',
};

export const useAgentWizard = () => {
  const [agentData, setAgentData] = useState<AgentWizardData>(initialData);
  const { toast } = useToast();

  const updateAgentData = useCallback((updates: Partial<AgentWizardData>) => {
    setAgentData(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const loadExistingAgent = useCallback((existingData: Partial<AgentWizardData>) => {
    setAgentData(prev => ({
      ...prev,
      ...existingData,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const validateStep = useCallback(async (stepIndex: number): Promise<boolean> => {
    const errors: string[] = [];

    switch (stepIndex) {
      case 0: // Agent Basics - Required: name, voice, model
        if (!agentData.name.trim()) {
          errors.push('Agent name is required');
        }
        if (!agentData.selectedVoice) {
          errors.push('Voice selection is required');
        }
        if (!agentData.llmModel) {
          errors.push('LLM model selection is required');
        }
        break;
      case 1: // Knowledge & Functions - No required fields
        break;
      case 2: // Communication Channels - At least one channel required
        const hasEnabledChannel = Object.values(agentData.connections).some(conn => conn.enabled);
        if (!hasEnabledChannel) {
          errors.push('At least one communication channel must be enabled');
        }
        break;
      default:
        return false;
    }

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(', '),
        variant: "destructive",
      });
      return false;
    }

    return true;
  }, [agentData, toast]);

  const saveDraft = useCallback(async () => {
    try {
      console.log('Saving draft...', agentData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Draft Saved",
        description: "Your agent has been saved as a draft.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      });
    }
  }, [agentData, toast]);

  const createAgent = useCallback(async (isEditing: boolean = false): Promise<boolean> => {
    try {
      // Final validation - all steps must pass
      for (let step = 0; step <= 2; step++) {
        const isValid = await validateStep(step);
        if (!isValid) {
          return false;
        }
      }

      console.log(isEditing ? 'Updating agent...' : 'Creating agent...', {
        ...agentData,
        status: 'active',
        [isEditing ? 'updatedAt' : 'createdAt']: new Date().toISOString(),
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: isEditing ? "Agent Updated" : "Agent Created",
        description: `${agentData.name} has been ${isEditing ? 'updated' : 'created'} successfully.`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} agent. Please try again.`,
        variant: "destructive",
      });
      return false;
    }
  }, [agentData, validateStep, toast]);

  return {
    agentData,
    updateAgentData,
    loadExistingAgent,
    validateStep,
    saveDraft,
    createAgent,
  };
};
