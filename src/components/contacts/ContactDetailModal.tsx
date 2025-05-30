
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Mail, Phone, Tag, User, Building2, MessageSquare, Clock, Play, Pause, Download, Volume2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Contact } from '@/types/contact';

interface ContactDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

interface CallRecording {
  id: string;
  date: string;
  duration: string;
  type: 'inbound' | 'outbound';
  status: 'completed' | 'missed' | 'voicemail';
  audioUrl?: string;
}

// Mock call recordings data
const mockRecordings: CallRecording[] = [
  {
    id: '1',
    date: '2024-01-20T14:30:00Z',
    duration: '4:23',
    type: 'outbound',
    status: 'completed',
    audioUrl: '/mock-audio-1.mp3'
  },
  {
    id: '2',
    date: '2024-01-18T10:15:00Z',
    duration: '2:45',
    type: 'inbound',
    status: 'completed',
    audioUrl: '/mock-audio-2.mp3'
  },
  {
    id: '3',
    date: '2024-01-15T16:20:00Z',
    duration: '1:30',
    type: 'outbound',
    status: 'voicemail',
    audioUrl: '/mock-audio-3.mp3'
  }
];

export const ContactDetailModal = ({ isOpen, onClose, contact }: ContactDetailModalProps) => {
  const [playingRecording, setPlayingRecording] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

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

  const getCallTypeColor = (type: string) => {
    switch (type) {
      case 'inbound': return 'bg-green-600';
      case 'outbound': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getCallStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'missed': return 'bg-red-600';
      case 'voicemail': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const handlePlayRecording = async (recording: CallRecording) => {
    try {
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setCurrentAudio(null);
      }

      if (playingRecording === recording.id) {
        setPlayingRecording(null);
        return;
      }

      // In a real app, this would load the actual audio file
      if (!recording.audioUrl) {
        toast({
          title: "Recording Unavailable",
          description: "This recording is not available for playback.",
          variant: "destructive",
        });
        return;
      }

      // Mock audio playback - in reality you'd load the actual file
      const audio = new Audio();
      audio.src = recording.audioUrl;
      
      audio.onloadstart = () => {
        setPlayingRecording(recording.id);
        toast({
          title: "Loading Recording",
          description: "Loading audio file...",
        });
      };

      audio.oncanplay = () => {
        toast({
          title: "Playing Recording",
          description: `Playing call from ${formatDate(recording.date)}`,
        });
      };

      audio.onended = () => {
        setPlayingRecording(null);
        setCurrentAudio(null);
      };

      audio.onerror = () => {
        setPlayingRecording(null);
        setCurrentAudio(null);
        toast({
          title: "Playback Error",
          description: "Failed to load or play the recording.",
          variant: "destructive",
        });
      };

      setCurrentAudio(audio);
      await audio.play();
    } catch (error) {
      setPlayingRecording(null);
      setCurrentAudio(null);
      toast({
        title: "Playback Error",
        description: "Failed to play the recording. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadRecording = async (recording: CallRecording) => {
    try {
      if (!recording.audioUrl) {
        toast({
          title: "Download Unavailable",
          description: "This recording is not available for download.",
          variant: "destructive",
        });
        return;
      }

      // In a real app, this would trigger an actual download
      toast({
        title: "Download Started",
        description: `Downloading recording from ${formatDate(recording.date)}`,
      });

      // Mock download functionality
      const link = document.createElement('a');
      link.href = recording.audioUrl;
      link.download = `call-recording-${recording.id}-${recording.date.split('T')[0]}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the recording. Please try again.",
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
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Volume2 className="w-5 h-5 text-purple-400" />
                <span>Call Recordings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockRecordings.length > 0 ? (
                <div className="space-y-3">
                  {mockRecordings.map((recording) => (
                    <div
                      key={recording.id}
                      className="flex items-center justify-between p-3 bg-gray-600 rounded-lg border border-gray-500"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getCallTypeColor(recording.type)} text-white text-xs`}>
                            {recording.type}
                          </Badge>
                          <Badge className={`${getCallStatusColor(recording.status)} text-white text-xs`}>
                            {recording.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-white text-sm">{formatDate(recording.date)}</p>
                          <p className="text-gray-400 text-xs">Duration: {recording.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePlayRecording(recording)}
                          className="border-gray-500 text-gray-300 hover:bg-gray-500"
                          disabled={!recording.audioUrl}
                        >
                          {playingRecording === recording.id ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadRecording(recording)}
                          className="border-gray-500 text-gray-300 hover:bg-gray-500"
                          disabled={!recording.audioUrl}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No call recordings available</p>
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
