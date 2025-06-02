
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, Phone, Tag, User, Building2, MessageSquare, Clock, Play, Pause, Download, Volume2, Eye, Flag } from 'lucide-react';
import { Contact } from '@/types/contact';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ContactDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

// Mock data for enhanced features
const mockCallRecordings = [
  {
    id: '1',
    date: '2024-01-15T10:30:00Z',
    duration: '4:32',
    type: 'Outbound',
    status: 'Completed',
    audioUrl: '/mock-recording-1.mp3',
    phoneNumberUsed: '+1 (555) 123-0001'
  },
  {
    id: '2',
    date: '2024-01-10T14:15:00Z',
    duration: '2:18',
    type: 'Inbound',
    status: 'Completed',
    audioUrl: '/mock-recording-2.mp3',
    phoneNumberUsed: '+1 (555) 123-0001'
  },
  {
    id: '3',
    date: '2024-01-08T09:45:00Z',
    duration: '6:42',
    type: 'Outbound',
    status: 'Completed',
    audioUrl: '/mock-recording-3.mp3',
    phoneNumberUsed: '+1 (555) 123-0002'
  }
];

const mockConversationHistory = [
  {
    id: '1',
    date: '2024-01-15T10:30:00Z',
    type: 'Call',
    summary: 'Initial consultation call - discussed premium package options',
    duration: '4:32',
    status: 'Completed'
  },
  {
    id: '2',
    date: '2024-01-10T14:15:00Z',
    type: 'SMS',
    summary: 'Follow-up message sent with pricing information',
    status: 'Delivered'
  },
  {
    id: '3',
    date: '2024-01-08T09:45:00Z',
    type: 'Call',
    summary: 'Product demo and feature walkthrough',
    duration: '6:42',
    status: 'Completed'
  }
];

const mockCampaigns = [
  { id: '1', name: 'Q1 Sales Outreach', status: 'active' },
  { id: '2', name: 'Product Demo Campaign', status: 'paused' }
];

export const ContactDetailModal = ({ isOpen, onClose, contact }: ContactDetailModalProps) => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const { toast } = useToast();

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

  const formatCallDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getContactStatus = () => {
    if (contact.tags.includes('Hot')) return 'Hot Lead';
    if (contact.tags.includes('VIP')) return 'VIP Customer';
    if (contact.tags.includes('Customer')) return 'Customer';
    return 'Prospect';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot Lead': return 'bg-red-600/20 text-red-300 border-red-500/30';
      case 'VIP Customer': return 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30';
      case 'Customer': return 'bg-green-600/20 text-green-300 border-green-500/30';
      default: return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
    }
  };

  const handlePlayAudio = (recordingId: string, audioUrl: string) => {
    try {
      if (playingAudio === recordingId) {
        setPlayingAudio(null);
        toast({
          title: "Audio Paused",
          description: "Call recording playback paused.",
        });
      } else {
        setPlayingAudio(recordingId);
        setAudioError(null);
        toast({
          title: "Playing Audio",
          description: "Call recording is now playing.",
        });
        
        // Simulate audio completion after 3 seconds for demo
        setTimeout(() => {
          setPlayingAudio(null);
        }, 3000);
      }
    } catch (error) {
      setAudioError('Failed to load audio file');
      toast({
        title: "Audio Error",
        description: "Failed to load or play the audio file.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadAudio = (audioUrl: string, recordingId: string) => {
    try {
      toast({
        title: "Download Started",
        description: `Downloading call recording ${recordingId}...`,
      });
    } catch (error) {
      toast({
        title: "Download Error",
        description: "Failed to download the audio file.",
        variant: "destructive",
      });
    }
  };

  const handleViewConversation = (conversationId: string) => {
    toast({
      title: "Opening Conversation",
      description: "Loading full conversation details...",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center space-x-2">
            <User className="w-6 h-6 text-blue-400" />
            <span>{contact.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Contact Info */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-400" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    <Tag className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <Badge className={getStatusColor(getContactStatus())}>
                        {getContactStatus()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Created On</p>
                      <p className="text-white">{formatDate(contact.createdOn)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Tags</p>
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
            </CardContent>
          </Card>

          {/* Associated Campaigns */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-purple-400" />
                <span>Associated Campaigns</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockCampaigns.map((campaign) => (
                  <Badge 
                    key={campaign.id}
                    variant="secondary" 
                    className={`${
                      campaign.status === 'active' 
                        ? 'bg-green-600/20 text-green-300 border-green-500/30' 
                        : 'bg-gray-600/20 text-gray-300 border-gray-500/30'
                    }`}
                  >
                    {campaign.name}
                    <span className="ml-1 text-xs">({campaign.status})</span>
                  </Badge>
                ))}
                {mockCampaigns.length === 0 && (
                  <span className="text-gray-500">No campaigns assigned</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Phone Numbers Used */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Phone className="w-5 h-5 text-green-400" />
                <span>Phone Numbers Used</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[...new Set(mockCallRecordings.map(r => r.phoneNumberUsed))].map((phoneNumber) => (
                  <div key={phoneNumber} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <Flag className="w-4 h-4 text-blue-400" />
                    <span className="text-white">{phoneNumber}</span>
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                      Agent Number
                    </Badge>
                  </div>
                ))}
                {mockCallRecordings.length === 0 && (
                  <span className="text-gray-500">No phone numbers used yet</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Call Recordings */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Volume2 className="w-5 h-5 text-cyan-400" />
                <span>Call Recordings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {audioError && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 text-red-300">
                  {audioError}
                </div>
              )}
              
              {mockCallRecordings.map((recording) => (
                <div key={recording.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant={recording.type === 'Inbound' ? 'default' : 'secondary'}>
                        {recording.type}
                      </Badge>
                      <span className="text-gray-300">{formatCallDate(recording.date)}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-white">{recording.duration}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-400">{recording.phoneNumberUsed}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handlePlayAudio(recording.id, recording.audioUrl)}
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      {playingAudio === recording.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownloadAudio(recording.audioUrl, recording.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {mockCallRecordings.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No call recordings available for this contact.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Conversation History */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-orange-400" />
                <span>Conversation History</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockConversationHistory.map((conversation) => (
                <div key={conversation.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {conversation.type}
                    </Badge>
                    <div>
                      <p className="text-white text-sm">{conversation.summary}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span>{formatCallDate(conversation.date)}</span>
                        {conversation.duration && (
                          <>
                            <span>•</span>
                            <span>{conversation.duration}</span>
                          </>
                        )}
                        <span>•</span>
                        <span className="capitalize">{conversation.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleViewConversation(conversation.id)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              {mockConversationHistory.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No conversation history available for this contact.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          {contact.notes && (
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <span>Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white bg-gray-700/50 p-3 rounded-lg">{contact.notes}</p>
              </CardContent>
            </Card>
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
