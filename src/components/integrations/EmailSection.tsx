
import { useState } from 'react';
import { Plus, Trash2, Edit, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IntegrationCard } from './IntegrationCard';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EmailAccount {
  id: string;
  name: string;
  email: string;
  provider: string;
  status: 'active' | 'error';
}

export const EmailSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [accounts, setAccounts] = useState<EmailAccount[]>([
    { id: '1', name: 'Support Email', email: 'support@example.com', provider: 'SMTP', status: 'active' }
  ]);
  
  const [newAccount, setNewAccount] = useState({
    name: '',
    email: '',
    provider: 'smtp',
    host: '',
    port: '',
    username: '',
    password: '',
  });
  
  const { toast } = useToast();

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.email || !newAccount.host) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields to connect an email account.",
        variant: "destructive",
      });
      return;
    }

    const account: EmailAccount = {
      id: Math.random().toString(36).substring(2, 9),
      name: newAccount.name,
      email: newAccount.email,
      provider: newAccount.provider === 'smtp' ? 'SMTP' : 'API',
      status: 'active',
    };

    setAccounts([...accounts, account]);
    setNewAccount({
      name: '',
      email: '',
      provider: 'smtp',
      host: '',
      port: '',
      username: '',
      password: '',
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Email account connected",
      description: "Your email account has been successfully connected.",
    });
  };

  const handleDeleteAccount = (accountId: string) => {
    if (confirm("Are you sure you want to remove this email account?")) {
      setAccounts(accounts.filter(account => account.id !== accountId));
      toast({
        title: "Account removed",
        description: "The email account has been removed.",
      });
    }
  };

  return (
    <IntegrationCard
      title="Email"
      description="Configure email accounts for sending notifications and communications."
      icon={Mail}
      iconBackground="bg-blue-600"
      footer={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Email Account
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">Add Email Account</DialogTitle>
              <DialogDescription className="text-gray-400">
                Enter your email server details to set up sending capabilities.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-white">Account Name</Label>
                <Input
                  className="bg-gray-800 border-gray-700 text-white"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                  placeholder="Support Email"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Email Address</Label>
                <Input
                  className="bg-gray-800 border-gray-700 text-white"
                  value={newAccount.email}
                  onChange={(e) => setNewAccount({...newAccount, email: e.target.value})}
                  placeholder="support@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Connection Type</Label>
                <Select 
                  value={newAccount.provider} 
                  onValueChange={(value) => setNewAccount({...newAccount, provider: value})}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select connection type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="smtp">SMTP Server</SelectItem>
                    <SelectItem value="api">Email API (SendGrid, Mailgun, etc.)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {newAccount.provider === 'smtp' ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-white">SMTP Host</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white"
                      value={newAccount.host}
                      onChange={(e) => setNewAccount({...newAccount, host: e.target.value})}
                      placeholder="smtp.example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">SMTP Port</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white"
                      value={newAccount.port}
                      onChange={(e) => setNewAccount({...newAccount, port: e.target.value})}
                      placeholder="587"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Username</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white"
                      value={newAccount.username}
                      onChange={(e) => setNewAccount({...newAccount, username: e.target.value})}
                      placeholder="support@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Password</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white"
                      type="password"
                      value={newAccount.password}
                      onChange={(e) => setNewAccount({...newAccount, password: e.target.value})}
                      placeholder="••••••••••••••••••"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label className="text-white">API Key</Label>
                    <Input
                      className="bg-gray-800 border-gray-700 text-white"
                      type="password"
                      value={newAccount.password}
                      onChange={(e) => setNewAccount({...newAccount, password: e.target.value})}
                      placeholder="••••••••••••••••••"
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handleAddAccount}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                Add Email Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      {accounts.length === 0 ? (
        <div className="py-6 text-center text-gray-400">
          You don't have any email accounts set up. Add an account to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Email</TableHead>
              <TableHead className="text-gray-400">Provider</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-right text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id} className="border-gray-800">
                <TableCell className="font-medium text-white">{account.name}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.provider}</TableCell>
                <TableCell>
                  <Badge variant={account.status === 'active' ? 'success' : 'destructive'}>
                    {account.status === 'active' ? 'Active' : 'Error'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-900/40 text-red-400 hover:bg-red-900/20 hover:text-red-300"
                      onClick={() => handleDeleteAccount(account.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </IntegrationCard>
  );
};
