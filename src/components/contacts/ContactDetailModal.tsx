
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, Phone, Tag, User, Building2, MessageSquare, Clock } from 'lucide-react';
import { Contact } from '@/types/contact';

interface ContactDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

export const ContactDetailModal = ({ isOpen, onClose, contact }: ContactDetailModalProps) => {
  if (!contact) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center space-x-2">
            <User className="w-6 h-6 text-blue-400" />
            <span>{contact.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{contact.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white">{contact.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Assigned Agent</p>
                  <p className="text-white">{contact.assignedAgent || 'Unassigned'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Building2 className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Campaign</p>
                  <p className="text-white">{contact.campaign || 'No Campaign'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Tag className="w-5 h-5 text-gray-400" />
              <p className="text-sm text-gray-400">Tags</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {contact.tags && contact.tags.length > 0 ? (
                contact.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="bg-purple-600/20 text-purple-300 border-purple-500/30"
                  >
                    {tag}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">No tags assigned</span>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <p className="text-sm text-gray-400">Timeline</p>
            </div>
            
            <div className="space-y-2 pl-7">
              <div className="flex items-center justify-between">
                <span className="text-white">Created</span>
                <span className="text-gray-400">{formatDate(contact.createdOn)}</span>
              </div>
              
              {contact.lastContactedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-white">Last Contacted</span>
                  <span className="text-gray-400">{formatDate(contact.lastContactedAt)}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-white">Source</span>
                <span className="text-gray-400 capitalize">{contact.source}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {contact.notes && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <p className="text-sm text-gray-400">Notes</p>
              </div>
              <p className="text-white bg-gray-700/50 p-3 rounded-lg">{contact.notes}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end pt-4">
          <Button 
            onClick={onClose}
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
