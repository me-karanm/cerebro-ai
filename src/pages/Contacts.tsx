import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Upload, Download, Search, Filter, X } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ContactModal } from '@/components/contacts/ContactModal';
import { ContactTable } from '@/components/contacts/ContactTable';
import { ImportCSVModal } from '@/components/contacts/ImportCSVModal';
import { ContactDetailModal } from '@/components/contacts/ContactDetailModal';
import { useContactsStore } from '@/store/contactsStore';
import { useContacts } from '@/contexts/ContactsContext';
import { Contact } from '@/types/contact';
import { useToast } from '@/hooks/use-toast';

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
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAgent, setFilterAgent] = useState<string>('all');
  const [filterCampaign, setFilterCampaign] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Use the contacts store and context
  const contactsStore = useContactsStore();
  const { exportContacts, importContactsFromCSV } = useContacts();
  
  // Apply filters and search
  const allContacts = contactsStore.contacts;
  const filteredContacts = allContacts.filter(contact => {
    const matchesSearch = !searchTerm || 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm);
    
    const matchesAgent = filterAgent === 'all' || contact.assignedAgent === filterAgent;
    const matchesCampaign = filterCampaign === 'all' || contact.campaign === filterCampaign;
    const matchesSource = filterSource === 'all' || contact.source === filterSource;
    const matchesTag = filterTag === 'all' || contact.tags.includes(filterTag);
    
    return matchesSearch && matchesAgent && matchesCampaign && matchesSource && matchesTag;
  });
  
  const stats = contactsStore.getContactStats();

  // Get unique values for filter options
  const uniqueAgents = [...new Set(allContacts.map(c => c.assignedAgent).filter(Boolean))];
  const uniqueCampaigns = [...new Set(allContacts.map(c => c.campaign).filter(Boolean))];
  const uniqueSources = [...new Set(allContacts.map(c => c.source))];
  const uniqueTags = [...new Set(allContacts.flatMap(c => c.tags))];

  const activeFiltersCount = [
    filterAgent !== 'all' ? filterAgent : '',
    filterCampaign !== 'all' ? filterCampaign : '',
    filterSource !== 'all' ? filterSource : '',
    filterTag !== 'all' ? filterTag : ''
  ].filter(Boolean).length;

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
    try {
      if ('id' in contactData && contactData.id) {
        contactsStore.updateContact(contactData.id, contactData as Contact);
        toast({
          title: "Contact Updated",
          description: "Contact has been updated successfully.",
        });
      } else {
        contactsStore.addContact(contactData as Omit<Contact, 'id' | 'createdOn'>);
        toast({
          title: "Contact Added",
          description: "Contact has been added successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save contact. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteContact = (contactId: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        contactsStore.deleteContact(contactId);
        toast({
          title: "Contact Deleted",
          description: "Contact has been deleted successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete contact. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleImportContacts = async (file: File) => {
    try {
      const result = await importContactsFromCSV(file);
      if (result.success) {
        toast({
          title: "Import Successful",
          description: `Successfully imported ${result.imported} contacts.`,
        });
        if (result.errors.length > 0) {
          console.warn('Import warnings:', result.errors);
        }
      } else {
        toast({
          title: "Import Failed",
          description: result.errors.join(', '),
          variant: "destructive",
        });
      }
      return result;
    } catch (error) {
      toast({
        title: "Import Error",
        description: "An unexpected error occurred during import.",
        variant: "destructive",
      });
      return { success: false, imported: 0, errors: ['Unexpected error'] };
    }
  };

  const handleExportContacts = () => {
    try {
      exportContacts('csv');
      toast({
        title: "Export Successful",
        description: "Contacts have been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Error",
        description: "Failed to export contacts. Please try again.",
        variant: "destructive",
      });
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterAgent('all');
    setFilterCampaign('all');
    setFilterSource('all');
    setFilterTag('all');
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

          {/* Search and Filters */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-900 border-gray-600 text-white"
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select value={filterAgent} onValueChange={setFilterAgent}>
                    <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                      <SelectValue placeholder="Filter by Agent" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-600">
                      <SelectItem value="all">All Agents</SelectItem>
                      {uniqueAgents.map((agent) => (
                        <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filterCampaign} onValueChange={setFilterCampaign}>
                    <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                      <SelectValue placeholder="Filter by Campaign" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-600">
                      <SelectItem value="all">All Campaigns</SelectItem>
                      {uniqueCampaigns.map((campaign) => (
                        <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filterSource} onValueChange={setFilterSource}>
                    <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                      <SelectValue placeholder="Filter by Source" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-600">
                      <SelectItem value="all">All Sources</SelectItem>
                      {uniqueSources.map((source) => (
                        <SelectItem key={source} value={source}>{source}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filterTag} onValueChange={setFilterTag}>
                    <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                      <SelectValue placeholder="Filter by Tag" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-600">
                      <SelectItem value="all">All Tags</SelectItem>
                      {uniqueTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Active Filters */}
                {(searchTerm || activeFiltersCount > 0) && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">Active filters:</span>
                      {searchTerm && (
                        <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                          Search: {searchTerm}
                        </Badge>
                      )}
                      {filterAgent !== 'all' && (
                        <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                          Agent: {filterAgent}
                        </Badge>
                      )}
                      {filterCampaign !== 'all' && (
                        <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                          Campaign: {filterCampaign}
                        </Badge>
                      )}
                      {filterSource !== 'all' && (
                        <Badge variant="secondary" className="bg-orange-600/20 text-orange-300">
                          Source: {filterSource}
                        </Badge>
                      )}
                      {filterTag !== 'all' && (
                        <Badge variant="secondary" className="bg-pink-600/20 text-pink-300">
                          Tag: {filterTag}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                  </div>
                )}

                {/* Results Count */}
                <div className="text-sm text-gray-400">
                  Showing {filteredContacts.length} of {allContacts.length} contacts
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contacts Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-0">
              <ContactTable
                contacts={filteredContacts}
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
