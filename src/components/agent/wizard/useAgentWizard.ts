
import { useState } from 'react';

export interface AgentWizardData {
  // Step 1: Agent Basics
  name: string;
  initialMessage: string;
  systemPrompt: string;
  llmModel: string;
  temperature: number;
  useRAG: boolean;

  // Step 2: Knowledge & Functions
  knowledgeFiles: File[];
  knowledgeUrls: string[];
  knowledgeText: string;
  customFunctionCode: string;
  functions: any[];
  memoryLength: number;
  enableLongTermMemory: boolean;

  // Step 3: Voice & Calling + Connections
  enableVoice: boolean;
  selectedVoice: string;
  ttsEngine: string;
  pitch: number;
  speed: number;
  emphasis: number;
  callRouting: string;
  
  // Connections
  connections: {
    call: {
      enabled: boolean;
      apiKey: string;
      webhookUrl: string;
    };
    whatsapp: {
      enabled: boolean;
      apiKey: string;
      phoneNumber: string;
      webhookUrl: string;
    };
    telegram: {
      enabled: boolean;
      botToken: string;
      webhookUrl: string;
    };
    email: {
      enabled: boolean;
      smtpHost: string;
      smtpPort: string;
      username: string;
      password: string;
    };
  };

  // Step 4: Integrations & Webhooks
  integrations: {
    slack: boolean;
    teams: boolean;
    hubspot: boolean;
    zendesk: boolean;
  };
  webhookUrl: string;
  authHeaders: { key: string; value: string }[];
  maxRetries: number;
  retryDelay: number;

  // Step 5: Widget & Retention
  dataRetentionDays: number;
  enableWidget: boolean;
  widgetColor: string;
  widgetPosition: string;

  // Additional fields
  status: 'draft' | 'active';
  createdAt?: string;
  updatedAt?: string;
}

const initialData: AgentWizardData = {
  name: '',
  initialMessage: '',
  systemPrompt: '',
  llmModel: 'gpt-4',
  temperature: 0.7,
  useRAG: false,
  knowledgeFiles: [],
  knowledgeUrls: [],
  knowledgeText: '',
  customFunctionCode: '',
  functions: [],
  memoryLength: 10,
  enableLongTermMemory: false,
  enableVoice: false,
  selectedVoice: 'sarah',
  ttsEngine: 'elevenlabs',
  pitch: 0.5,
  speed: 0.5,
  emphasis: 0.5,
  callRouting: 'direct',
  connections: {
    call: {
      enabled: false,
      apiKey: '',
      webhookUrl: '',
    },
    whatsapp: {
      enabled: false,
      apiKey: '',
      phoneNumber: '',
      webhookUrl: '',
    },
    telegram: {
      enabled: false,
      botToken: '',
      webhookUrl: '',
    },
    email: {
      enabled: false,
      smtpHost: '',
      smtpPort: '',
      username: '',
      password: '',
    },
  },
  integrations: {
    slack: false,
    teams: false,
    hubspot: false,
    zendesk: false,
  },
  webhookUrl: '',
  authHeaders: [],
  maxRetries: 3,
  retryDelay: 2,
  dataRetentionDays: 30,
  enableWidget: false,
  widgetColor: '#7C3AED',
  widgetPosition: 'bottom-right',
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

  const validateStep = async (stepIndex: number): Promise<boolean> => {
    switch (stepIndex) {
      case 0: // Agent Basics
        return !!(agentData.name && agentData.initialMessage && agentData.systemPrompt);
      case 1: // Knowledge & Functions
        return true; // Optional fields
      case 2: // Voice & Calling
        return true; // All optional
      case 3: // Integrations & Webhooks
        return true; // All optional
      case 4: // Widget & Retention
        return true; // All optional
      case 5: // Review & Create
        return true;
      default:
        return false;
    }
  };

  const saveDraft = async () => {
    // Simulate API call to save draft
    console.log('Saving draft...', agentData);
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const createAgent = async (): Promise<boolean> => {
    try {
      // Simulate API call to create agent
      console.log('Creating agent...', {
        ...agentData,
        status: 'active',
        createdAt: new Date().toISOString(),
      });
      return new Promise(resolve => setTimeout(() => resolve(true), 2000));
    } catch (error) {
      console.error('Failed to create agent:', error);
      return false;
    }
  };

  return {
    agentData,
    updateAgentData,
    validateStep,
    saveDraft,
    createAgent,
  };
};
