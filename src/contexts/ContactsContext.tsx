
import React, { createContext, useContext, useEffect } from 'react';
import { useContactsStore, Contact } from '@/store/contactsStore';

interface ContactsContextType {
  // Re-export store methods for easy access
  contacts: Contact[];
  filteredContacts: Contact[];
  loading: boolean;
  error: string | null;
  
  // Enhanced methods with context
  refreshContacts: () => Promise<void>;
  exportContacts: (format: 'csv' | 'json') => void;
  importContactsFromCSV: (file: File, context?: { agentId?: string; campaignId?: string }) => Promise<{ success: boolean; imported: number; errors: string[] }>;
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useContactsStore();

  // Simulate API calls for data persistence
  const refreshContacts = async () => {
    store.setLoading(true);
    try {
      // In a real app, this would fetch from an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // store.setContacts(fetchedContacts);
      store.setError(null);
    } catch (error) {
      store.setError('Failed to refresh contacts');
    } finally {
      store.setLoading(false);
    }
  };

  const exportContacts = (format: 'csv' | 'json') => {
    const contacts = store.getFilteredContacts();
    
    if (format === 'csv') {
      const headers = ['Name', 'Email', 'Phone', 'Assigned Agent', 'Campaign', 'Tags', 'Created On'];
      const csvContent = [
        headers.join(','),
        ...contacts.map(contact => [
          contact.name,
          contact.email,
          contact.phone,
          contact.assignedAgent || '',
          contact.campaign || '',
          contact.tags.join(';'),
          contact.createdOn
        ].map(field => `"${field}"`).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const jsonContent = JSON.stringify(contacts, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contacts-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const importContactsFromCSV = async (
    file: File, 
    context?: { agentId?: string; campaignId?: string }
  ): Promise<{ success: boolean; imported: number; errors: string[] }> => {
    store.setLoading(true);
    const errors: string[] = [];
    let imported = 0;

    try {
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim().toLowerCase());
      
      const requiredFields = ['name', 'email'];
      const missingFields = requiredFields.filter(field => !headers.includes(field));
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      const contactsToImport: Omit<Contact, 'id' | 'createdOn'>[] = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        try {
          const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
          const contact: Omit<Contact, 'id' | 'createdOn'> = {
            name: values[headers.indexOf('name')] || '',
            email: values[headers.indexOf('email')] || '',
            phone: values[headers.indexOf('phone')] || '',
            assignedAgent: context?.agentId || values[headers.indexOf('assigned agent')] || values[headers.indexOf('assignedagent')] || '',
            campaign: context?.campaignId || values[headers.indexOf('campaign')] || '',
            tags: (values[headers.indexOf('tags')] || '').split(';').filter(Boolean),
            source: 'csv',
            notes: values[headers.indexOf('notes')] || '',
          };

          // Basic validation
          if (!contact.name || !contact.email) {
            errors.push(`Row ${i + 1}: Missing required fields (name, email)`);
            continue;
          }

          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(contact.email)) {
            errors.push(`Row ${i + 1}: Invalid email format`);
            continue;
          }

          contactsToImport.push(contact);
          imported++;
        } catch (error) {
          errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : 'Parse error'}`);
        }
      }

      if (contactsToImport.length > 0) {
        store.bulkAddContacts(contactsToImport);
      }

      return { success: true, imported, errors };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Import failed';
      return { success: false, imported: 0, errors: [errorMessage] };
    } finally {
      store.setLoading(false);
    }
  };

  // Initialize context on mount
  useEffect(() => {
    // Any initialization logic can go here
  }, []);

  const contextValue: ContactsContextType = {
    contacts: store.contacts,
    filteredContacts: store.getFilteredContacts(),
    loading: store.loading,
    error: store.error,
    refreshContacts,
    exportContacts,
    importContactsFromCSV,
  };

  return (
    <ContactsContext.Provider value={contextValue}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
};

// Hook to access the store directly for advanced operations
export const useContactsStore = () => {
  return useContactsStore();
};
