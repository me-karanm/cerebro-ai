
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Agent } from '@/types/agent';

interface DuplicateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newName: string) => void;
  originalAgent: Agent | null;
}

export const DuplicateAgentModal = ({ isOpen, onClose, onConfirm, originalAgent }: DuplicateAgentModalProps) => {
  const [newName, setNewName] = useState('');

  const handleConfirm = () => {
    if (newName.trim()) {
      onConfirm(newName.trim());
      setNewName('');
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setNewName('');
    }
  };

  // Set default name when modal opens
  const handleOpen = () => {
    if (originalAgent) {
      setNewName(`${originalAgent.name} (Copy)`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white" onOpenAutoFocus={handleOpen}>
        <DialogHeader>
          <DialogTitle>Duplicate Agent</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="agentName" className="text-gray-300">Agent Name</Label>
            <Input
              id="agentName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new agent name"
              className="bg-gray-700 border-gray-600 text-white mt-1"
              autoFocus
            />
          </div>
          
          {originalAgent && (
            <div className="text-sm text-gray-400">
              <p>This will duplicate all settings from "{originalAgent.name}" including:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Voice and language settings</li>
                <li>Persona and behavior configuration</li>
                <li>Knowledge base and training data</li>
                <li>Integration settings</li>
              </ul>
              <p className="mt-2 text-yellow-400">Note: Phone number assignment will be reset and must be configured separately.</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300 hover:bg-gray-700">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!newName.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Duplicate Agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
