import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Upload, Download } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ContactModal } from '@/components/contacts/ContactModal';
import { ContactTable } from '@/components/contacts/ContactTable';
import { ImportCSVModal } from '@/components/contacts/ImportCSVModal';
import { ContactDetailModal } from '@/components/contacts/ContactDetailModal';
import { useContactsStore, Contact } from '@/store/contactsStore';
import { useContacts } from '@/contexts/ContactsContext';

interface Agent {
  id: string;
  name: string;
}

interface Campaign {
  id: string;
  name: string;
}

// Mock data for agents and campaigns
const mockAgents: Agent[] = [
  { id: '1', name: 'Sarah Chen' },
  { id: '2', name: 'Marcus Johnson' },
  { id: '3', name: 'Emma Davis' },
];

const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Q1 Sales Outreach' },
  { id: '2', name: 'Customer Follow-up' },
  { id: '3', name: 'Product Demo Campaign' },
];

const Contacts = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>(undefined);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const navigate = useNavigate();

  // Use the new contacts store and context
  const contactsStore = useContactsStore();
  const { exportContacts, importContactsFromCSV } = useContacts();
  const contacts = contactsStore.getFilteredContacts();
  const stats = contactsStore.getContactStats();

  const handleModuleChange = (module: string) => {
    switch (module) {
      case 'dashboard':
        navigate('/');
        break;
      case 'agents':
        navigate('/agents');
        break;
      case 'campaigns':
        navigate('/campaigns');
        break;
      case 'channels':
        navigate('/channels');
        break;
      case 'contacts':
        // Already on contacts page
        break;
      default:
        console.log(`Navigation to ${module} not implemented yet`);
        break;
    }
  };

  const handleAddContact = () => {
    setEditingContact(undefined);
    setIsModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailModalOpen(true);
  };

  const handleSaveContact = (contactData: any) => {
    if ('id' in contactData) {
      // Editing existing contact
      contactsStore.updateContact(contactData.id, contactData);
    } else {
      // Adding new contact - ensure required fields are present
      const newContactData = {
        ...contactData,
        source: 'manual' as const,
        assignedAgent: contactData.assignedAgent || '',
        tags: contactData.tags || [],
        notes: contactData.notes || '',
      };
      contactsStore.addContact(newContactData);
    }
  };

  const handleDeleteContact = (contactId: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      contactsStore.deleteContact(contactId);
    }
  };

  const handleImportContacts = async (file: File) => {
    const result = await importContactsFromCSV(file);
    if (result.success) {
      console.log(`Successfully imported ${result.imported} contacts`);
      if (result.errors.length > 0) {
        console.warn('Import warnings:', result.errors);
      }
    } else {
      console.error('Import failed:', result.errors);
    }
    return result;
  };

  const handleExportContacts = () => {
    exportContacts('csv');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <Sidebar
        activeModule="contacts"
        setActiveModule={handleModuleChange}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Contacts</h1>
              <p className="text-gray-400">Manage your contact lists and customer data</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={handleExportContacts}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button 
                onClick={() => setIsImportModalOpen(true)}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
              </Button>
              <Button 
                onClick={handleAddContact}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Contacts</p>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Assigned Contacts</p>
                    <p className="text-2xl font-bold text-blue-400">{stats.assigned}</p>
                  </div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Hot Leads</p>
                    <p className="text-2xl font-bold text-green-400">{stats.hotLeads}</p>
                  </div>
                  <div className="text-green-400">🔥</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">VIP Customers</p>
                    <p className="text-2xl font-bold text-yellow-400">{stats.vipCustomers}</p>
                  </div>
                  <div className="text-yellow-400">👑</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contacts Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-0">
              <ContactTable
                contacts={contacts}
                agents={mockAgents}
                campaigns={mockCampaigns}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
                onContactClick={handleContactClick}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContact}
        contact={editingContact}
        agents={mockAgents}
        campaigns={mockCampaigns}
      />

      {/* Import CSV Modal */}
      <ImportCSVModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportContacts}
      />

      {/* Contact Detail Modal */}
      <ContactDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        contact={selectedContact}
      />
    </div>
  );
};

export default Contacts;
