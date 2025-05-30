
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
  phoneNumbers: string[];
  campaigns: string[];
}
