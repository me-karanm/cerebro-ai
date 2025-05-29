
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

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

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: Omit<Contact, 'id' | 'createdOn'> | Contact) => void;
  contact?: Contact;
  agents: Agent[];
  campaigns: Campaign[];
}

const availableTags = ['Lead', 'Customer', 'VIP', 'Prospect', 'Cold', 'Warm', 'Hot'];

export const ContactModal = ({ isOpen, onClose, onSave, contact, agents, campaigns }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    assignedAgent: '',
    campaign: '',
    tags: [] as string[]
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        assignedAgent: contact.assignedAgent,
        campaign: contact.campaign || '',
        tags: contact.tags
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        assignedAgent: '',
        campaign: '',
        tags: []
      });
    }
  }, [contact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact) {
      onSave({ ...contact, ...formData });
    } else {
      onSave(formData);
    }
    onClose();
  };

  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {contact ? 'Edit Contact' : 'Add New Contact'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-300">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="agent" className="text-gray-300">Assigned Agent</Label>
            <Select value={formData.assignedAgent} onValueChange={(value) => setFormData({ ...formData, assignedAgent: value })}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Select an agent" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id} className="text-white hover:bg-gray-700">
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="campaign" className="text-gray-300">Campaign</Label>
            <Select value={formData.campaign} onValueChange={(value) => setFormData({ ...formData, campaign: value })}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Select a campaign" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id} className="text-white hover:bg-gray-700">
                    {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-gray-300">Tags</Label>
            <Select onValueChange={addTag}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Add tags" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {availableTags.filter(tag => !formData.tags.includes(tag)).map((tag) => (
                  <SelectItem key={tag} value={tag} className="text-white hover:bg-gray-700">
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {contact ? 'Update Contact' : 'Save Contact'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
