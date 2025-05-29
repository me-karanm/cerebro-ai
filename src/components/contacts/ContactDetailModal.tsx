
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Download, ExternalLink, Phone, Clock, User, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CallRecording {
  id: string;
  agentName: string;
  agentId: string;
  campaignName: string;
  campaignId: string;
  duration: string;
  date: string;
  status: 'completed' | 'missed' | 'voicemail';
  recordingUrl: string;
}

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

interface ContactDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

// Mock call recordings data
const mockCallRecordings: CallRecording[] = [
  {
    id: '1',
    agentName: 'Sarah Chen',
    agentId: '1',
    campaignName: 'Q1 Sales Outreach',
    campaignId: '1',
    duration: '5:23',
    date: '2024-01-20T14:30:00Z',
    status: 'completed',
    recordingUrl: '#'
  },
  {
    id: '2',
    agentName: 'Marcus Johnson',
    agentId: '2',
    campaignName: 'Customer Follow-up',
    campaignId: '2',
    duration: '3:45',
    date: '2024-01-18T10:15:00Z',
    status: 'completed',
    recordingUrl: '#'
  },
  {
    id: '3',
    agentName: 'Sarah Chen',
    agentId: '1',
    campaignName: 'Q1 Sales Outreach',
    campaignId: '1',
    duration: '0:30',
    date: '2024-01-15T16:45:00Z',
    status: 'voicemail',
    recordingUrl: '#'
  }
];

export const ContactDetailModal = ({ isOpen, onClose, contact }: ContactDetailModalProps) => {
  const navigate = useNavigate();

  if (!contact) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600/20 text-green-300 border-green-500/30';
      case 'missed':
        return 'bg-red-600/20 text-red-300 border-red-500/30';
      case 'voicemail':
        return 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleAgentClick = (agentId: string) => {
    navigate(`/agents/${agentId}`);
    onClose();
  };

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <span>{contact.name}</span>
              <p className="text-sm text-gray-400 font-normal">{contact.email}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">{contact.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Created On</p>
                <p className="text-white">{formatDate(contact.createdOn)}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-400 mb-2">Tags</p>
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
            </div>
          </div>

          {/* Call Recordings */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call Recordings ({mockCallRecordings.length})</span>
            </h3>
            
            {mockCallRecordings.length === 0 ? (
              <div className="text-center py-8 bg-gray-900 rounded-lg border border-gray-700">
                <Phone className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400">No call recordings found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {mockCallRecordings.map((recording) => (
                  <div key={recording.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <button
                            onClick={() => handleAgentClick(recording.agentId)}
                            className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                          >
                            <User className="w-4 h-4" />
                            <span>{recording.agentName}</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleCampaignClick(recording.campaignId)}
                            className="text-purple-400 hover:text-purple-300 flex items-center space-x-1"
                          >
                            <span>{recording.campaignName}</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                          <Badge className={getStatusColor(recording.status)}>
                            {recording.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{recording.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(recording.date)}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Play
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
