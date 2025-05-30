
export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  language: string;
  voice: string;
  creditsUsed: number;
  creditsTotal: number;
  intelligence: number;
  voiceNaturalness: number;
  responseRate: number;
  lastUpdated: string;
  phoneNumber?: string; // One-to-one mapping
  phoneNumbers?: string[]; // For backward compatibility with dashboard components
  campaigns: string[];
  conversations: number;
  successRate: number;
  persona: string;
  totalMinutes: number;
  averageCallDuration: number;
  monthlyCost: number;
}
