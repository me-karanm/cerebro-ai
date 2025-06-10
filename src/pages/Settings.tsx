
import { useState } from 'react';
import { Settings as SettingsIcon, Palette, CreditCard, Key, Bell, Database, Upload, Download, Trash2, Plus, Edit2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Sidebar } from '@/components/Sidebar';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
}

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  downloadUrl: string;
}

const mockApiKeys: ApiKey[] = [
  { id: '1', name: 'Production API', key: 'sk-...abc123', created: '2024-01-10', lastUsed: '2 hours ago' },
  { id: '2', name: 'Development API', key: 'sk-...def456', created: '2024-01-05', lastUsed: '1 day ago' },
];

const mockPaymentMethods: PaymentMethod[] = [
  { id: '1', type: 'card', last4: '4242', brand: 'Visa', expiryMonth: 12, expiryYear: 2025, isDefault: true },
  { id: '2', type: 'card', last4: '1234', brand: 'Mastercard', expiryMonth: 8, expiryYear: 2026, isDefault: false },
];

const mockInvoices: Invoice[] = [
  { id: '1', date: '2024-01-15', amount: '$99.00', status: 'paid', downloadUrl: '#' },
  { id: '2', date: '2024-01-01', amount: '$99.00', status: 'paid', downloadUrl: '#' },
  { id: '3', date: '2023-12-15', amount: '$99.00', status: 'paid', downloadUrl: '#' },
];

const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState('settings');
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);
  const [paymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [platformName, setPlatformName] = useState('Cerebro AI');
  const [timeZone, setTimeZone] = useState('America/Los_Angeles');
  const [language, setLanguage] = useState('en');
  const [dataRetention, setDataRetention] = useState('90');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isAddApiKeyOpen, setIsAddApiKeyOpen] = useState(false);
  const [newApiKeyName, setNewApiKeyName] = useState('');

  const handleCreateApiKey = () => {
    if (!newApiKeyName) {
      toast.error('Please enter an API key name');
      return;
    }

    const newApiKey: ApiKey = {
      id: Date.now().toString(),
      name: newApiKeyName,
      key: `sk-...${Math.random().toString(36).substr(2, 6)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never'
    };

    setApiKeys([...apiKeys, newApiKey]);
    setNewApiKeyName('');
    setIsAddApiKeyOpen(false);
    toast.success('API key created successfully');
  };

  const handleRevokeApiKey = (keyId: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
    toast.success('API key revoked');
  };

  const handleTestWebhook = () => {
    toast.success('Webhook test sent successfully');
  };

  const handleExportData = () => {
    toast.success('Data export initiated. You will receive an email when ready.');
  };

  const handleDeleteData = () => {
    toast.success('Data deletion request submitted');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex w-full">
      <Sidebar 
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="w-full max-w-full overflow-x-hidden">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Settings
                </h1>
                <p className="text-gray-400">Configure your platform settings and preferences</p>
              </div>
            </div>

            {/* General Settings */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Palette className="w-5 h-5" />
                  <span>General Settings</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Platform branding and basic configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="platformName" className="text-gray-300">Platform Name</Label>
                    <Input
                      id="platformName"
                      value={platformName}
                      onChange={(e) => setPlatformName(e.target.value)}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeZone" className="text-gray-300">Default Time Zone</Label>
                    <Select value={timeZone} onValueChange={setTimeZone}>
                      <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language" className="text-gray-300">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="logo" className="text-gray-300">Platform Logo</Label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center">
                        <Upload className="w-6 h-6 text-gray-400" />
                      </div>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">Upload Logo</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing & Subscription */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <CreditCard className="w-5 h-5" />
                  <span>Billing & Subscription</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Manage your subscription and payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Plan */}
                <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div>
                      <h3 className="font-semibold text-lg text-white">Pro Plan</h3>
                      <p className="text-gray-400">$99/month • Next billing: Feb 15, 2024</p>
                      <p className="text-sm text-gray-500 mt-2">10,000 AI credits • Unlimited agents • Priority support</p>
                    </div>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">Upgrade Plan</Button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">Payment Methods</h3>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Card
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{method.brand} •••• {method.last4}</p>
                            <p className="text-sm text-gray-400">Expires {method.expiryMonth}/{method.expiryYear}</p>
                          </div>
                          {method.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-700">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Billing History */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Billing History</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-300">Date</TableHead>
                          <TableHead className="text-gray-300">Amount</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                          <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice) => (
                          <TableRow key={invoice.id} className="border-gray-700">
                            <TableCell className="text-gray-300">{invoice.date}</TableCell>
                            <TableCell className="text-white">{invoice.amount}</TableCell>
                            <TableCell>
                              <Badge variant={invoice.status === 'paid' ? 'default' : 'destructive'}>
                                {invoice.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="hover:bg-gray-700">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API & Webhooks */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Key className="w-5 h-5" />
                      <span>API & Webhooks</span>
                    </CardTitle>
                    <CardDescription className="text-gray-400">Manage API keys and webhook configurations</CardDescription>
                  </div>
                  <Dialog open={isAddApiKeyOpen} onOpenChange={setIsAddApiKeyOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create API Key
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-white">Create New API Key</DialogTitle>
                        <DialogDescription className="text-gray-400">Generate a new API key for integration</DialogDescription>
                      </DialogHeader>
                      <div>
                        <Label htmlFor="keyName" className="text-gray-300">API Key Name</Label>
                        <Input
                          id="keyName"
                          value={newApiKeyName}
                          onChange={(e) => setNewApiKeyName(e.target.value)}
                          placeholder="e.g., Production API"
                          className="bg-gray-900 border-gray-600 text-white"
                        />
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddApiKeyOpen(false)} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          Cancel
                        </Button>
                        <Button onClick={handleCreateApiKey} className="bg-cyan-600 hover:bg-cyan-700">Create Key</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* API Keys */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">API Keys</h3>
                  <div className="space-y-3">
                    {apiKeys.map((key) => (
                      <div key={key.id} className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{key.name}</p>
                          <p className="text-sm text-gray-400 font-mono">{key.key}</p>
                          <p className="text-xs text-gray-500">Created: {key.created} • Last used: {key.lastUsed}</p>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRevokeApiKey(key.id)}
                          className="hover:bg-red-700"
                        >
                          Revoke
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Webhooks */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Webhook Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="webhookUrl" className="text-gray-300">Webhook URL</Label>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Input
                          id="webhookUrl"
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          placeholder="https://your-domain.com/webhook"
                          className="bg-gray-900 border-gray-600 text-white flex-1"
                        />
                        <Button onClick={handleTestWebhook} className="bg-cyan-600 hover:bg-cyan-700">Test</Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-300">Event Types</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                        {['Call Started', 'Call Ended', 'Message Sent', 'Agent Created'].map((event) => (
                          <div key={event} className="flex items-center space-x-2">
                            <Switch defaultChecked />
                            <Label className="text-sm text-gray-300">{event}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications & Data Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Notifications */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">Configure notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Email Notifications</Label>
                      <p className="text-sm text-gray-400">Receive updates via email</p>
                    </div>
                    <Switch 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">SMS Notifications</Label>
                      <p className="text-sm text-gray-400">Receive alerts via SMS</p>
                    </div>
                    <Switch 
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Alert Types</Label>
                    {['Campaign Status', 'Agent Activity', 'Billing Alerts', 'System Updates'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Label className="text-sm text-gray-300">{type}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Data Management */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Database className="w-5 h-5" />
                    <span>Data Management</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">Control data retention and export options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="retention" className="text-gray-300">Data Retention Period (days)</Label>
                    <Input
                      id="retention"
                      type="number"
                      value={dataRetention}
                      onChange={(e) => setDataRetention(e.target.value)}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
                      onClick={handleExportData}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export All Data
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start hover:bg-red-700"
                      onClick={handleDeleteData}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete My Data
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Data exports include contacts, conversations, and analytics</p>
                    <p>• Data deletion is permanent and cannot be undone</p>
                    <p>• GDPR compliant data processing</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
