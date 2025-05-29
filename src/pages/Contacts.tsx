
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Upload } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ContactModal } from '@/components/contacts/ContactModal';
import { ContactTable } from '@/components/contacts/ContactTable';
import { ImportCSVModal } from '@/components/contacts/ImportCSVModal';
import { ContactDetailModal } from '@/components/contacts/ContactDetailModal';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedAgent: string;
  campaign?: string;
  tags: string[];
  createdOn: string;
}

interface Agent {
  id: string;
  name: string;
}

interface Campaign {
  id: string;
  name: string;
}

// Mock data
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

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    assignedAgent: '1',
    campaign: '1',
    tags: ['Lead', 'Hot'],
    createdOn: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Alice Johnson',
    email: 'alice.johnson@company.com',
    phone: '+1 (555) 987-6543',
    assignedAgent: '2',
    campaign: '2',
    tags: ['Customer', 'VIP'],
    createdOn: '2024-01-10T14:20:00Z'
  },
  {
    id: '3',
    name: 'Robert Brown',
    email: 'robert.brown@example.com',
    phone: '+1 (555) 456-7890',
    assignedAgent: '1',
    campaign: '1',
    tags: ['Prospect', 'Warm'],
    createdOn: '2024-01-08T09:15:00Z'
  }
];

const Contacts = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const navigate = useNavigate();

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

  const handleSaveContact = (contactData: Omit<Contact, 'id' | 'createdOn'> | Contact) => {
    if ('id' in contactData) {
      // Editing existing contact
      setContacts(contacts.map(c => c.id === contactData.id ? contactData : c));
    } else {
      // Adding new contact
      const newContact: Contact = {
        ...contactData,
        id: Date.now().toString(),
        createdOn: new Date().toISOString()
      };
      setContacts([...contacts, newContact]);
    }
  };

  const handleDeleteContact = (contactId: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(c => c.id !== contactId));
    }
  };

  const handleImportContacts = (importedContacts: Contact[]) => {
    setContacts([...contacts, ...importedContacts]);
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
                    <p className="text-2xl font-bold text-white">{contacts.length}</p>
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
                    <p className="text-2xl font-bold text-blue-400">
                      {contacts.filter(c => c.assignedAgent && c.assignedAgent !== 'unassigned').length}
                    </p>
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
                    <p className="text-2xl font-bold text-green-400">
                      {contacts.filter(c => c.tags.includes('Hot')).length}
                    </p>
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
                    <p className="text-2xl font-bold text-yellow-400">
                      {contacts.filter(c => c.tags.includes('VIP')).length}
                    </p>
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
