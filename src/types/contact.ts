
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedAgent?: string;
  campaign?: string;
  tags: string[];
  createdOn: string;
  source: 'manual' | 'csv' | 'api';
  lastContactedAt?: string;
  notes?: string;
}

export interface ContactFilters {
  search: string;
  assignedAgent: string;
  campaign: string;
  tags: string[];
  source: string;
}
