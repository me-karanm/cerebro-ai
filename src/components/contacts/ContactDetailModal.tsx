
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, Phone, Tag, User, Building2, MessageSquare, Clock, Play, Pause, Download, Volume2 } from 'lucide-react';
import { Contact } from '@/types/contact';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ContactDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

// Mock call recording data
const mockCallRecordings = [
  {
    id: '1',
    date: '2024-01-15T10:30:00Z',
    duration: '4:32',
    type: 'Outbound',
    status: 'Completed',
    audioUrl: '/mock-recording-1.mp3'
  },
  {
    id: '2',
    date: '2024-01-10T14:15:00Z',
    duration: '2:18',
    type: 'Inbound',
    status: 'Completed',
    audioUrl: '/mock-recording-2.mp3'
  },
  {
    id: '3',
    date: '2024-01-08T09:45:00Z',
    duration: '6:42',
    type: 'Outbound',
    status: 'Completed',
    audioUrl: '/mock-recording-3.mp3'
  }
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

  const handlePlayAudio = (recordingId: string, audioUrl: string) => {
    try {
      if (playingAudio === recordingId) {
        setPlayingAudio(null);
        // In a real app, you would pause the audio here
        toast({
          title: "Audio Paused",
          description: "Call recording playback paused.",
        });
      } else {
        setPlayingAudio(recordingId);
        setAudioError(null);
        // In a real app, you would start playing the audio here
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
      // In a real app, you would trigger an actual download
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
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
