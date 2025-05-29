
import { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IntegrationCard } from './IntegrationCard';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Import WeChat icon from lucide-react
import { MessageCircle } from 'lucide-react';

interface WeChatAccount {
  id: string;
  name: string;
  accountId: string;
  status: 'active' | 'pending';
}

export const WeChatSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [accounts, setAccounts] = useState<WeChatAccount[]>([]);
  
  const [newAccount, setNewAccount] = useState({
    name: '',
    accountId: '',
    appId: '',
    appSecret: '',
  });
  
  const { toast } = useToast();

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.appId || !newAccount.appSecret) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields to connect a WeChat account.",
        variant: "destructive",
      });
      return;
    }

    const account: WeChatAccount = {
      id: Math.random().toString(36).substring(2, 9),
      name: newAccount.name,
      accountId: newAccount.accountId || `wechat_${Math.random().toString(36).substring(2, 7)}`,
      status: 'active',
    };

    setAccounts([...accounts, account]);
    setNewAccount({
      name: '',
      accountId: '',
      appId: '',
      appSecret: '',
    });
    setIsDialogOpen(false);
    
    toast({
      title: "WeChat account connected",
      description: "Your WeChat Official Account has been successfully connected.",
    });
  };

  const handleDeleteAccount = (accountId: string) => {
    if (confirm("Are you sure you want to disconnect this WeChat account?")) {
      setAccounts(accounts.filter(account => account.id !== accountId));
      toast({
        title: "Account disconnected",
        description: "The WeChat account has been disconnected.",
      });
    }
  };

  return (
    <IntegrationCard
      title="WeChat"
      description="Connect and manage WeChat Official Accounts for messaging."
      icon={MessageCircle}
      iconBackground="bg-green-600"
      footer={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
              <Plus className="w-4 h-4 mr-2" /> Connect Account
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">Connect WeChat Account</DialogTitle>
              <DialogDescription className="text-gray-400">
                Enter your WeChat Official Account details to establish the connection.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-white">Account Name</Label>
                <Input
                  className="bg-gray-800 border-gray-700 text-white"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                  placeholder="Company Official Account"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Account ID (optional)</Label>
                <Input
                  className="bg-gray-800 border-gray-700 text-white"
                  value={newAccount.accountId}
                  onChange={(e) => setNewAccount({...newAccount, accountId: e.target.value})}
                  placeholder="company_official"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">App ID</Label>
                <Input
                  className="bg-gray-800 border-gray-700 text-white"
                  value={newAccount.appId}
                  onChange={(e) => setNewAccount({...newAccount, appId: e.target.value})}
                  placeholder="wx1234567890abcdef"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">App Secret</Label>
                <Input
                  className="bg-gray-800 border-gray-700 text-white"
                  type="password"
                  value={newAccount.appSecret}
                  onChange={(e) => setNewAccount({...newAccount, appSecret: e.target.value})}
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
          You don't have any WeChat accounts connected. Add an account to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Account ID</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-right text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id} className="border-gray-800">
                <TableCell className="font-medium text-white">{account.name}</TableCell>
                <TableCell>{account.accountId}</TableCell>
                <TableCell>
                  <Badge variant={account.status === 'active' ? 'success' : 'warning'}>
                    {account.status === 'active' ? 'Active' : 'Pending'}
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
