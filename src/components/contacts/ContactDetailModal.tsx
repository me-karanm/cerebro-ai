
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Calendar, Phone, Mail, Tag, Users, Target, Play, Download, X } from 'lucide-react';
import { Contact } from '@/types/contact';

interface ContactDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

// Mock data for agent and campaign names
const getAgentName = (agentId: string) => {
  const agents = {
    '1': 'Sarah Chen',
    '2': 'Marcus Johnson', 
    '3': 'Emma Davis'
  };
  return agents[agentId as keyof typeof agents] || 'Unknown Agent';
};

const getCampaignName = (campaignId: string) => {
  const campaigns = {
    '1': 'Q1 Sales Outreach',
    '2': 'Customer Follow-up',
    '3': 'Product Demo Campaign'
  };
  return campaigns[campaignId as keyof typeof campaigns] || 'Unknown Campaign';
};

export const ContactDetailModal = ({ isOpen, onClose, contact }: ContactDetailModalProps) => {
  if (!contact) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Mock call recordings data
  const callRecordings = [
    {
      id: '1',
      date: '2024-01-15',
      duration: '4:32',
      status: 'completed',
      campaign: 'Q1 Sales Outreach'
    },
    {
      id: '2', 
      date: '2024-01-20',
      duration: '2:18',
      status: 'completed',
      campaign: 'Customer Follow-up'
    }
  ];

  // Mock notes data
  const notes = [
    {
      id: '1',
      date: '2024-01-15',
      content: 'Interested in premium package. Follow up next week.',
      author: 'Sarah Chen'
    },
    {
      id: '2',
      date: '2024-01-20', 
      content: 'Customer requested technical documentation.',
      author: 'Marcus Johnson'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-white">{contact.name}</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-400" />
                Contact Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{contact.email}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{contact.phone}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Created: {formatDate(contact.createdOn)}</span>
                </div>

                {contact.tags.length > 0 && (
                  <div className="flex items-start space-x-3">
                    <Tag className="w-4 h-4 text-gray-400 mt-1" />
                    <div className="flex flex-wrap gap-2">
                      {contact.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="bg-purple-600/20 text-purple-300 border-purple-500/30"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-400" />
                Assignment Details
              </h3>
              
              <div className="space-y-3">
                {/* Assigned Agent */}
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Assigned Agent:</span>
                  {contact.assignedAgent ? (
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                      {getAgentName(contact.assignedAgent)}
                    </Badge>
                  ) : (
                    <span className="text-gray-500 italic">Not assigned</span>
                  )}
                </div>

                {/* Campaign */}
                <div className="flex items-center space-x-3">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Campaign:</span>
                  {contact.campaign ? (
                    <Badge variant="secondary" className="bg-green-600/20 text-green-300 border-green-500/30">
                      {getCampaignName(contact.campaign)}
                    </Badge>
                  ) : (
                    <span className="text-gray-500 italic">No campaign assigned</span>
                  )}
                </div>

                {/* Source */}
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 text-gray-400">📍</div>
                  <span className="text-gray-400">Source:</span>
                  <Badge variant="secondary" className="bg-orange-600/20 text-orange-300 border-orange-500/30">
                    {contact.source}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-700" />

          {/* Call Recordings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Phone className="w-5 h-5 mr-2 text-cyan-400" />
              Call Recordings
            </h3>
            
            {callRecordings.length > 0 ? (
              <div className="space-y-3">
                {callRecordings.map((recording) => (
                  <div key={recording.id} className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-white font-medium">{formatDate(recording.date)}</span>
                          <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                            {recording.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>Duration: {recording.duration}</span>
                          <span>Campaign: {recording.campaign}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          <Play className="w-4 h-4 mr-1" />
                          Play
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Phone className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p>No call recordings available</p>
              </div>
            )}
          </div>

          <Separator className="bg-gray-700" />

          {/* Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <div className="w-5 h-5 mr-2 text-yellow-400">📝</div>
              Notes & Comments
            </h3>
            
            {notes.length > 0 ? (
              <div className="space-y-3">
                {notes.map((note) => (
                  <div key={note.id} className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-gray-300">{note.content}</p>
                        <div className="flex items-center space-x-3 text-sm text-gray-400">
                          <span>{formatDate(note.date)}</span>
                          <span>•</span>
                          <span>by {note.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <div className="w-12 h-12 mx-auto mb-4 text-gray-600">📝</div>
                <p>No notes available</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
