
import { useState } from 'react';
import { Plus, Trash2, Edit, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IntegrationCard } from './IntegrationCard';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TelegramBot {
  id: string;
  name: string;
  username: string;
  status: 'active' | 'error';
}

export const TelegramSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bots, setBots] = useState<TelegramBot[]>([
    { id: '1', name: 'Support Bot', username: 'CompanySupportBot', status: 'active' }
  ]);
  
  const [newBot, setNewBot] = useState({
    name: '',
    username: '',
    token: '',
  });
  
  const { toast } = useToast();

  const handleAddBot = () => {
    if (!newBot.name || !newBot.token) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields to connect a Telegram bot.",
        variant: "destructive",
      });
      return;
    }

    const bot: TelegramBot = {
      id: Math.random().toString(36).substring(2, 9),
      name: newBot.name,
      username: newBot.username || `bot_${Math.random().toString(36).substring(2, 7)}`,
      status: 'active',
    };

    setBots([...bots, bot]);
    setNewBot({
      name: '',
      username: '',
      token: '',
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Telegram bot connected",
      description: "Your Telegram bot has been successfully connected.",
    });
  };

  const handleDeleteBot = (botId: string) => {
    if (confirm("Are you sure you want to disconnect this Telegram bot?")) {
      setBots(bots.filter(bot => bot.id !== botId));
      toast({
        title: "Bot disconnected",
        description: "The Telegram bot has been disconnected.",
      });
    }
  };

  return (
    <IntegrationCard
      title="Telegram"
      description="Connect and manage Telegram bots for automated messaging."
      icon={MessageSquare}
      iconBackground="bg-blue-500"
      footer={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" /> Connect Bot
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">Connect Telegram Bot</DialogTitle>
              <DialogDescription className="text-gray-400">
                Enter your Telegram bot details to establish the connection.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label className="text-white">Bot Name</Label>
                <Input
                  className="bg-gray-800 border-gray-700 text-white"
                  value={newBot.name}
                  onChange={(e) => setNewBot({...newBot, name: e.target.value})}
                  placeholder="Company Support Bot"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Bot Username (optional)</Label>
                <Input
                  className="bg-gray-800 border-gray-700 text-white"
                  value={newBot.username}
                  onChange={(e) => setNewBot({...newBot, username: e.target.value})}
                  placeholder="CompanySupportBot"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Bot Token</Label>
                <Input
                  className="bg-gray-800 border-gray-700 text-white"
                  type="password"
                  value={newBot.token}
                  onChange={(e) => setNewBot({...newBot, token: e.target.value})}
                  placeholder="123456789:ABCdefGhIJKlmNoPQRsTuVwXyZ"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Get this from <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@BotFather</a> on Telegram
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handleAddBot}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                Connect Bot
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      {bots.length === 0 ? (
        <div className="py-6 text-center text-gray-400">
          You don't have any Telegram bots connected. Add a bot to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Username</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-right text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bots.map((bot) => (
              <TableRow key={bot.id} className="border-gray-800">
                <TableCell className="font-medium text-white">{bot.name}</TableCell>
                <TableCell>@{bot.username}</TableCell>
                <TableCell>
                  <Badge variant={bot.status === 'active' ? 'success' : 'destructive'}>
                    {bot.status === 'active' ? 'Active' : 'Error'}
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
                      onClick={() => handleDeleteBot(bot.id)}
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
