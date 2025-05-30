import { create } from 'zustand';
import { Contact, ContactFilters } from '@/types/contact';

interface ContactsStore {
  contacts: Contact[];
  filters: ContactFilters;
  loading: boolean;
  error: string | null;

  // Actions
  setContacts: (contacts: Contact[]) => void;
  addContact: (contact: Omit<Contact, 'id' | 'createdOn'>) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  bulkAddContacts: (contacts: Omit<Contact, 'id' | 'createdOn'>[]) => void;
  bulkDeleteContacts: (ids: string[]) => void;
  bulkAssignAgent: (ids: string[], agentId: string) => void;
  bulkAssignCampaign: (ids: string[], campaignId: string) => void;

  // Filtering
  setFilters: (filters: Partial<ContactFilters>) => void;
  clearFilters: () => void;
  getFilteredContacts: () => Contact[];

  // By context
  getContactsByAgent: (agentId: string) => Contact[];
  getContactsByCampaign: (campaignId: string) => Contact[];
  
  // Statistics
  getContactStats: () => {
    total: number;
    assigned: number;
    unassigned: number;
    hotLeads: number;
    vipCustomers: number;
    byAgent: Record<string, number>;
    byCampaign: Record<string, number>;
  };

  // Loading states
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialFilters: ContactFilters = {
  search: '',
  assignedAgent: '',
  campaign: '',
  tags: [],
  source: '',
};

// Mock initial data
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    assignedAgent: '1',
    campaign: '1',
    tags: ['Lead', 'Hot'],
    createdOn: '2024-01-15T10:30:00Z',
    source: 'manual',
    lastContactedAt: '2024-01-20T14:30:00Z',
    notes: 'Interested in premium package'
  },
  {
    id: '2',
    name: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    phone: '+1 (555) 987-6543',
    assignedAgent: '2',
    campaign: '2',
    tags: ['Customer', 'VIP'],
    createdOn: '2024-01-10T14:20:00Z',
    source: 'csv',
    lastContactedAt: '2024-01-22T09:15:00Z',
    notes: 'Long-term customer, very satisfied'
  },
  {
    id: '3',
    name: 'Robert Brown',
    email: 'robert.brown@example.com',
    phone: '+1 (555) 456-7890',
    assignedAgent: '1',
    campaign: '1',
    tags: ['Prospect', 'Warm'],
    createdOn: '2024-01-08T09:15:00Z',
    source: 'manual',
    notes: 'Follow up next week'
  }
];

export const useContactsStore = create<ContactsStore>((set, get) => ({
  contacts: mockContacts,
  filters: initialFilters,
  loading: false,
  error: null,

  // Basic CRUD operations
  setContacts: (contacts) => set({ contacts }),
  
  addContact: (contactData) => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString(),
      createdOn: new Date().toISOString(),
    };
    set((state) => ({
      contacts: [...state.contacts, newContact],
    }));
  },

  updateContact: (id, updates) => {
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updates } : contact
      ),
    }));
  },

  deleteContact: (id) => {
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  },

  bulkAddContacts: (contactsData) => {
    const newContacts = contactsData.map((contactData) => ({
      ...contactData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdOn: new Date().toISOString(),
    }));
    set((state) => ({
      contacts: [...state.contacts, ...newContacts],
    }));
  },

  bulkDeleteContacts: (ids) => {
    set((state) => ({
      contacts: state.contacts.filter((contact) => !ids.includes(contact.id)),
    }));
  },

  bulkAssignAgent: (ids, agentId) => {
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        ids.includes(contact.id) ? { ...contact, assignedAgent: agentId } : contact
      ),
    }));
  },

  bulkAssignCampaign: (ids, campaignId) => {
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        ids.includes(contact.id) ? { ...contact, campaign: campaignId } : contact
      ),
    }));
  },

  // Filtering
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  clearFilters: () => set({ filters: initialFilters }),

  getFilteredContacts: () => {
    const { contacts, filters } = get();
    return contacts.filter((contact) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !contact.name.toLowerCase().includes(searchLower) &&
          !contact.email.toLowerCase().includes(searchLower) &&
          !contact.phone.includes(filters.search)
        ) {
          return false;
        }
      }

      // Agent filter
      if (filters.assignedAgent && contact.assignedAgent !== filters.assignedAgent) {
        return false;
      }

      // Campaign filter
      if (filters.campaign && contact.campaign !== filters.campaign) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        if (!filters.tags.some((tag) => contact.tags.includes(tag))) {
          return false;
        }
      }

      // Source filter
      if (filters.source && contact.source !== filters.source) {
        return false;
      }

      return true;
    });
  },

  // Context-specific getters
  getContactsByAgent: (agentId) => {
    const { contacts } = get();
    return contacts.filter((contact) => contact.assignedAgent === agentId);
  },

  getContactsByCampaign: (campaignId) => {
    const { contacts } = get();
    return contacts.filter((contact) => contact.campaign === campaignId);
  },

  // Statistics
  getContactStats: () => {
    const { contacts } = get();
    const stats = {
      total: contacts.length,
      assigned: contacts.filter((c) => c.assignedAgent && c.assignedAgent !== 'unassigned').length,
      unassigned: contacts.filter((c) => !c.assignedAgent || c.assignedAgent === 'unassigned').length,
      hotLeads: contacts.filter((c) => c.tags.includes('Hot')).length,
      vipCustomers: contacts.filter((c) => c.tags.includes('VIP')).length,
      byAgent: {} as Record<string, number>,
      byCampaign: {} as Record<string, number>,
    };

    // Count by agent
    contacts.forEach((contact) => {
      if (contact.assignedAgent) {
        stats.byAgent[contact.assignedAgent] = (stats.byAgent[contact.assignedAgent] || 0) + 1;
      }
    });

    // Count by campaign
    contacts.forEach((contact) => {
      if (contact.campaign) {
        stats.byCampaign[contact.campaign] = (stats.byCampaign[contact.campaign] || 0) + 1;
      }
    });

    return stats;
  },

  // Loading states
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
