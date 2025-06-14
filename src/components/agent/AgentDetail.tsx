
import { useState } from 'react';
import { ArrowLeft, BarChart3, Edit, Archive, MessageCircle, Target, Clock, CreditCard, Play, Download, Filter, Phone, Settings, TrendingUp, Plus, Upload, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { ContactModal } from '@/components/contacts/ContactModal';
import { ContactTable } from '@/components/contacts/ContactTable';
import { ImportCSVModal } from '@/components/contacts/ImportCSVModal';
import { ContactDetailModal } from '@/components/contacts/ContactDetailModal';
import { DuplicateAgentModal } from '@/components/agent/DuplicateAgentModal';
import { useContactsStore } from '@/store/contactsStore';
import { useContacts } from '@/contexts/ContactsContext';
import { Contact } from '@/types/contact';
import { Agent } from '@/types/agent';
import { useToast } from '@/hooks/use-toast';

interface AgentDetailProps {
  agent: Agent;
  onBack: () => void;
  onDuplicate?: (agent: Agent, newName: string) => void;
}

// Mock data for campaigns
const mockCampaigns = [
  { 
    id: 'c1', 
    name: 'Lead Generation Q4', 
    status: 'active', 
    sessions: 45,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    phoneNumber: '+1(555)123-4567'
  },
  { 
    id: 'c2', 
    name: 'Customer Support', 
    status: 'active', 
    sessions: 123,
    startDate: '2024-01-15',
    endDate: 'Ongoing',
    phoneNumber: '+1(555)987-6543'
  },
  { 
    id: 'c3', 
    name: 'Product Demo Calls', 
    status: 'paused', 
    sessions: 28,
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    phoneNumber: '+1(555)456-7890'
  },
];

const mockAgents = [
  { id: '1', name: 'SalesBot Pro' },
  { id: '2', name: 'Customer Support AI' },
  { id: '3', name: 'Lead Qualifier Bot' },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return 'bg-green-600';
    case 'paused': return 'bg-yellow-600';
    case 'inactive': return 'bg-gray-600';
    default: return 'bg-gray-600';
  }
};

export const AgentDetail = ({ agent, onBack, onDuplicate }: AgentDetailProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>(undefined);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Contact store integration
  const contactsStore = useContactsStore();
  const { exportContacts, importContactsFromCSV } = useContacts();
  const agentContacts = contactsStore.getContactsByAgent(agent.id);

  const handleAnalytics = () => {
    navigate(`/agents/${agent.id}/analytics`);
  };

  const handleTestAgent = () => {
    toast({
      title: "Test Agent",
      description: "Agent testing functionality will be available soon.",
    });
  };

  const handleEditConfiguration = () => {
    navigate(`/agents/${agent.id}?edit=true`);
  };

  const handleDuplicateAgent = () => {
    setIsDuplicateModalOpen(true);
  };

  const handleDuplicateConfirm = (newName: string) => {
    if (onDuplicate) {
      onDuplicate(agent, newName);
    }
    setIsDuplicateModalOpen(false);
    toast({
      title: "Agent Duplicated",
      description: `${newName} has been created successfully.`,
    });
  };

  const handleArchiveAgent = () => {
    if (confirm('Are you sure you want to archive this agent?')) {
      toast({
        title: "Agent Archived",
        description: `${agent.name} has been archived successfully.`,
      });
    }
  };

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  const handleEditPhoneNumber = () => {
    toast({
      title: "Phone Number Management",
      description: "Phone number assignment will be available soon.",
    });
  };

  const handleEditIntegrations = () => {
    toast({
      title: "Integration Management",
      description: "Integration management will be available soon.",
    });
  };

  // Contact management handlers
  const handleAddContact = () => {
    setEditingContact(undefined);
    setIsContactModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsContactModalOpen(true);
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
        const newContactData = {
          ...contactData,
          assignedAgent: agent.id
        } as Omit<Contact, 'id' | 'createdOn'>;
        contactsStore.addContact(newContactData);
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
      const result = await importContactsFromCSV(file, { agentId: agent.id });
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
      contactsStore.setFilters({ assignedAgent: agent.id });
      exportContacts('csv');
      contactsStore.clearFilters();
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
          <div className="flex items-center space-x-2 mt-1">
            <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
              {agent.status}
            </Badge>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">ID: {agent.id}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleTestAgent}
          >
            <Play className="w-4 h-4 mr-2" />
            Test Agent
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={handleAnalytics}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={handleEditConfiguration}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Agent
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={handleDuplicateAgent}
          >
            <Copy className="w-4 h-4 mr-2" />
            Duplicate Agent
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-700 text-red-400 hover:bg-red-900/20"
            onClick={handleArchiveAgent}
          >
            <Archive className="w-4 h-4 mr-2" />
            Archive Agent
          </Button>
        </div>
      </div>

      {/* Stats Section - 6 Cards in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Campaigns</p>
                <p className="text-2xl font-bold text-white">{mockCampaigns.length}</p>
              </div>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Conversations</p>
                <p className="text-2xl font-bold text-white">{agent.conversations.toLocaleString()}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Duration</p>
                <p className="text-2xl font-bold text-cyan-400">4:12</p>
              </div>
              <Clock className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Cost</p>
                <p className="text-2xl font-bold text-green-400">$299</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Credits Used</p>
                <p className="text-2xl font-bold text-orange-400">600</p>
              </div>
              <CreditCard className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Minutes</p>
                <p className="text-2xl font-bold text-cyan-400">2,340</p>
              </div>
              <Clock className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Information Card */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Agent Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">Description</p>
            <p className="text-white">{agent.description}</p>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
            <div>
              <p className="text-sm text-gray-400 mb-1">Associated Phone Number</p>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span className="text-white">+1(555)123-4567</span>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-gray-400 hover:text-cyan-400"
              onClick={handleEditPhoneNumber}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-4 bg-gray-900 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-400">Active Integrations</p>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-gray-400 hover:text-cyan-400"
                onClick={handleEditIntegrations}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email</span>
                <Badge variant="default" className="bg-green-600 text-xs">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">WhatsApp</span>
                <Badge variant="default" className="bg-green-600 text-xs">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Voice Calls</span>
                <Badge variant="default" className="bg-green-600 text-xs">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Telegram</span>
                <Badge variant="secondary" className="text-xs">Inactive</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Conversations Handled</span>
                  <span className="text-green-400 font-bold">12,340</span>
                </div>
                <Progress value={85} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Average Response Time</span>
                  <span className="text-blue-400 font-bold">1.2s</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: '75%' }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Automation Rate</span>
                  <span className="text-purple-400 font-bold">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Agent Persona</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{agent.persona}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Language:</span>
                    <Badge variant="secondary" className="text-xs">{agent.language}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Voice:</span>
                    <Badge variant="secondary" className="text-xs">{agent.voice}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Linked Campaigns
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">Campaign Name</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Total Sessions</TableHead>
                    <TableHead className="text-gray-400">Phone Number Assigned</TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCampaigns.map((campaign) => (
                    <TableRow key={campaign.id} className="border-gray-700 hover:bg-gray-850">
                      <TableCell>
                        <button
                          onClick={() => handleCampaignClick(campaign.id)}
                          className="text-blue-400 hover:text-blue-300 hover:underline text-left"
                        >
                          {campaign.name}
                        </button>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(campaign.status)} text-white text-xs`}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{campaign.sessions}</TableCell>
                      <TableCell className="text-cyan-400">{campaign.phoneNumber}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-400">
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Agent Contacts</CardTitle>
                  <p className="text-gray-400 text-sm mt-1">
                    Manage contacts assigned to {agent.name} ({agentContacts.length} contacts)
                  </p>
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
            </CardHeader>
            <CardContent className="p-0">
              <ContactTable
                contacts={agentContacts}
                agents={mockAgents}
                campaigns={mockCampaigns}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
                onContactClick={handleContactClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onSave={handleSaveContact}
        contact={editingContact}
        agents={mockAgents}
        campaigns={mockCampaigns}
      />

      <ImportCSVModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportContacts}
      />

      <ContactDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        contact={selectedContact}
      />

      <DuplicateAgentModal
        isOpen={isDuplicateModalOpen}
        onClose={() => setIsDuplicateModalOpen(false)}
        onConfirm={handleDuplicateConfirm}
        originalAgent={agent}
      />
    </div>
  );
};
