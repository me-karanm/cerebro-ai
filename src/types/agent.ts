
export interface Agent {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  creditsUsed: number;
  creditsTotal: number;
  intelligence: number;
  voiceNaturalness: number;
  responseRate: number;
  lastUpdated: string;
  phoneNumber?: string; // One-to-one mapping
  campaigns: string[];
  conversations: number;
  totalMinutes: number;
  averageCallDuration: number;
  monthlyCost: number;
}
