
import { useState, useCallback } from 'react';

export interface AgentWizardData {
  // Step 1: Agent Basics
  name: string;
  description?: string;
  initialMessage: string;
  systemPrompt: string;
  llmModel: string;
  temperature: number;
  selectedVoice: string;
  voicePitch?: number;
  voiceSpeed?: number;

  // Step 2: Knowledge & Functions
  useRAG: boolean;
  knowledgeFiles: File[];
  knowledgeUrls: string[];
  knowledgeText: string;
  customFunctionCode: string;
  functions: any[];

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
  systemPrompt: '',
  llmModel: 'gpt-4',
  temperature: 0.7,
  selectedVoice: 'alloy',
  voicePitch: 0,
  voiceSpeed: 1,
  useRAG: false,
  knowledgeFiles: [],
  knowledgeUrls: [],
  knowledgeText: '',
  customFunctionCode: '',
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

  const updateAgentData = (updates: Partial<AgentWizardData>) => {
    setAgentData(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString(),
    }));
  };

  const loadExistingAgent = useCallback((existingData: Partial<AgentWizardData>) => {
    setAgentData(prev => ({
      ...prev,
      ...existingData,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const validateStep = async (stepIndex: number): Promise<boolean> => {
    switch (stepIndex) {
      case 0: // Agent Basics
        return !!(agentData.name && agentData.initialMessage && agentData.systemPrompt);
      case 1: // Knowledge & Functions
        return true; // Optional fields
      case 2: // Communication Channels
        return true; // All optional
      default:
        return false;
    }
  };

  const saveDraft = async () => {
    // Simulate API call to save draft
    console.log('Saving draft...', agentData);
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const createAgent = async (isEditing: boolean = false): Promise<boolean> => {
    try {
      // Simulate API call to create or update agent
      console.log(isEditing ? 'Updating agent...' : 'Creating agent...', {
        ...agentData,
        status: 'active',
        [isEditing ? 'updatedAt' : 'createdAt']: new Date().toISOString(),
      });
      return new Promise(resolve => setTimeout(() => resolve(true), 2000));
    } catch (error) {
      console.error(`Failed to ${isEditing ? 'update' : 'create'} agent:`, error);
      return false;
    }
  };

  return {
    agentData,
    updateAgentData,
    loadExistingAgent,
    validateStep,
    saveDraft,
    createAgent,
  };
};
