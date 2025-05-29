
import { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IntegrationCard } from './IntegrationCard';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface WhatsAppAccount {
  id: string;
  phoneNumber: string;
  name: string;
  status: 'active' | 'pending' | 'failed';
}

export const WhatsAppSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [accounts, setAccounts] = useState<WhatsAppAccount[]>([
    { id: '1', phoneNumber: '+1 (555) 234-5678', name: 'Sales Bot', status: 'active' },
    { id: '2', phoneNumber: '+1 (555) 876-5432', name: 'Support Bot', status: 'active' }
  ]);
  const [newAccount, setNewAccount] = useState({ phoneNumber: '', name: '', apiKey: '' });
  const { toast } = useToast();

  const handleAddAccount = () => {
    if (!newAccount.phoneNumber || !newAccount.name || !newAccount.apiKey) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to connect a WhatsApp account.",
        variant: "destructive",
      });
      return;
    }

    const account: WhatsAppAccount = {
      id: Math.random().toString(36).substring(2, 9),
      phoneNumber: newAccount.phoneNumber,
      name: newAccount.name,
      status: 'active',
    };

    setAccounts([...accounts, account]);
    setNewAccount({ phoneNumber: '', name: '', apiKey: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "WhatsApp account connected",
      description: "Your WhatsApp account has been successfully connected.",
    });
  };

  const handleDeleteAccount = (accountId: string) => {
    if (confirm("Are you sure you want to disconnect this WhatsApp account?")) {
      setAccounts(accounts.filter(account => account.id !== accountId));
      toast({
        title: "Account disconnected",
        description: "The WhatsApp account has been disconnected.",
      });
    }
  };

  return (
    <IntegrationCard
      title="WhatsApp"
      description="Connect and manage WhatsApp Business accounts for messaging."
      icon={Phone}
      iconBackground="bg-green-500"
      footer={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
              <Plus className="w-4 h-4 mr-2" /> Connect Account
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">Connect WhatsApp Account</DialogTitle>
              <DialogDescription className="text-gray-400">
                Enter your WhatsApp Business API credentials to connect your account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-white">Account Name</Label>
                <Input
                  className="bg-gray-800 border-gray-700 text-white"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                  placeholder="Sales Bot"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Phone Number</Label>
                <Input
                  className="bg-gray-800 border-gray-700 text-white"
                  value={newAccount.phoneNumber}
                  onChange={(e) => setNewAccount({...newAccount, phoneNumber: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">API Key</Label>
                <Input
                  className="bg-gray-800 border-gray-700 text-white"
                  type="password"
                  value={newAccount.apiKey}
                  onChange={(e) => setNewAccount({...newAccount, apiKey: e.target.value})}
                  placeholder="••••••••••••••••••"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handleAddAccount}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              >
                Connect Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      {accounts.length === 0 ? (
        <div className="py-6 text-center text-gray-400">
          You don't have any WhatsApp accounts connected. Add an account to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Phone Number</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-right text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id} className="border-gray-800">
                <TableCell className="font-medium text-white">{account.name}</TableCell>
                <TableCell>{account.phoneNumber}</TableCell>
                <TableCell>
                  <Badge variant={account.status === 'active' ? 'success' : 'warning'}>
                    {account.status}
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
