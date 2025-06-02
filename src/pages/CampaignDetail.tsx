
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Edit, Settings, Users, MessageCircle, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sidebar } from '@/components/Sidebar';
import { ContactTable } from '@/components/contacts/ContactTable';
import { ContactModal } from '@/components/contacts/ContactModal';
import { ImportCSVModal } from '@/components/contacts/ImportCSVModal';
import { ContactDetailModal } from '@/components/contacts/ContactDetailModal';
import { useContactsStore } from '@/store/contactsStore';
import { useContacts } from '@/contexts/ContactsContext';
import { Contact } from '@/types/contact';
import { useToast } from '@/hooks/use-toast';

const mockCampaign = {
  id: '1',
  name: 'Q1 Sales Outreach',
  description: 'Comprehensive outreach campaign targeting high-value prospects for Q1 goals',
  status: 'active',
  type: 'Voice',
  agent: 'Sales Agent Pro',
  agentId: '1',
  startDate: '2024-01-01',
  endDate: '2024-03-31',
  totalContacts: 1250,
  contactedContacts: 847,
  successfulContacts: 312,
  conversionRate: 36.8,
  totalMinutes: 4200,
  avgCallDuration: 4.2,
  budget: 5000,
  spent: 3200,
  phoneNumber: '+1(555)123-4567'
};

const mockAgents = [
  { id: '1', name: 'Sales Agent Pro' },
  { id: '2', name: 'Customer Support AI' },
  { id: '3', name: 'Lead Qualifier Bot' },
];

const mockCampaigns = [
  { id: '1', name: 'Q1 Sales Outreach' },
  { id: '2', name: 'Customer Follow-up' },
  { id: '3', name: 'Product Demo Campaign' },
];

const CampaignDetail = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>(undefined);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Contact store integration
  const contactsStore = useContactsStore();
  const { exportContacts, importContactsFromCSV } = useContacts();
  const campaignContacts = contactsStore.getContactsByCampaign(campaignId || '');

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
      case 'contacts':
        navigate('/contacts');
        break;
      case 'channels':
        navigate('/channels');
        break;
      default:
        console.log(`Navigation to ${module} not implemented yet`);
        break;
    }
  };

  const handleBack = () => {
    navigate('/campaigns');
  };

  const handleEditCampaign = () => {
    navigate(`/campaigns/${campaignId}/edit`);
  };

  const handleStartCampaign = () => {
    toast({
      title: "Campaign Started",
      description: `${mockCampaign.name} has been started successfully.`,
    });
  };

  const handlePauseCampaign = () => {
    toast({
      title: "Campaign Paused",
      description: `${mockCampaign.name} has been paused.`,
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
          campaign: campaignId
        } as Omit<Contact, 'id' | 'createdOn'>;
        contactsStore.addContact(newContactData);
        toast({
          title: "Contact Added",
          description: "Contact has been added to the campaign successfully.",
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
      const result = await importContactsFromCSV(file, { campaignId });
      if (result.success) {
        toast({
          title: "Import Successful",
          description: `Successfully imported ${result.imported} contacts to the campaign.`,
        });
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
      contactsStore.setFilters({ campaign: campaignId });
      exportContacts('csv');
      contactsStore.clearFilters();
      toast({
        title: "Export Successful",
        description: "Campaign contacts have been exported successfully.",
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
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <Sidebar
        activeModule="campaigns"
        setActiveModule={handleModuleChange}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleBack} className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Campaigns
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-white">{mockCampaign.name}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant={mockCampaign.status === 'active' ? 'default' : 'secondary'}>
                    {mockCampaign.status}
                  </Badge>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{mockCampaign.type} Campaign</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {mockCampaign.status === 'active' ? (
                <Button 
                  variant="outline" 
                  className="border-orange-600 text-orange-400 hover:bg-orange-900/20"
                  onClick={handlePauseCampaign}
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Campaign
                </Button>
              ) : (
                <Button 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  onClick={handleStartCampaign}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Campaign
                </Button>
              )}
              <Button 
                variant="outline" 
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={handleEditCampaign}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Campaign
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Contacts</p>
                    <p className="text-2xl font-bold text-white">{mockCampaign.totalContacts.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Contacted</p>
                    <p className="text-2xl font-bold text-green-400">{mockCampaign.contactedContacts.toLocaleString()}</p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Successful</p>
                    <p className="text-2xl font-bold text-purple-400">{mockCampaign.successfulContacts.toLocaleString()}</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Conversion Rate</p>
                    <p className="text-2xl font-bold text-cyan-400">{mockCampaign.conversionRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Minutes</p>
                    <p className="text-2xl font-bold text-orange-400">{mockCampaign.totalMinutes.toLocaleString()}</p>
                  </div>
                  <div className="text-orange-400">⏱️</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Budget Used</p>
                    <p className="text-2xl font-bold text-yellow-400">${mockCampaign.spent.toLocaleString()}</p>
                  </div>
                  <div className="text-yellow-400">💰</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Campaign Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Campaign Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Description</p>
                      <p className="text-white">{mockCampaign.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Start Date</p>
                        <p className="text-white">{mockCampaign.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">End Date</p>
                        <p className="text-white">{mockCampaign.endDate}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Assigned Agent</p>
                        <p className="text-blue-400">{mockCampaign.agent}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone Number</p>
                        <p className="text-cyan-400">{mockCampaign.phoneNumber}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">{Math.round((mockCampaign.contactedContacts / mockCampaign.totalContacts) * 100)}%</span>
                      </div>
                      <Progress value={(mockCampaign.contactedContacts / mockCampaign.totalContacts) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Budget Used</span>
                        <span className="text-white">{Math.round((mockCampaign.spent / mockCampaign.budget) * 100)}%</span>
                      </div>
                      <Progress value={(mockCampaign.spent / mockCampaign.budget) * 100} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div>
                        <p className="text-sm text-gray-400">Avg Call Duration</p>
                        <p className="text-xl font-bold text-cyan-400">{mockCampaign.avgCallDuration}m</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Remaining Budget</p>
                        <p className="text-xl font-bold text-green-400">${(mockCampaign.budget - mockCampaign.spent).toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Campaign Contacts</CardTitle>
                      <p className="text-gray-400 text-sm mt-1">
                        Manage contacts for {mockCampaign.name} ({campaignContacts.length} contacts)
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <Button 
                        onClick={handleExportContacts}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        Export CSV
                      </Button>
                      <Button 
                        onClick={() => setIsImportModalOpen(true)}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        Import CSV
                      </Button>
                      <Button 
                        onClick={handleAddContact}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        Add Contact
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ContactTable
                    contacts={campaignContacts}
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
        </div>

        {/* Contact Modals */}
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
      </main>
    </div>
  );
};

export default CampaignDetail;
