
import { useState, useEffect } from 'react';
import { Play, Pause, Download, Settings, Plus, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const initialVoices = [
  { id: '1', name: 'Aria', gender: 'Female', accent: 'American', quality: 'Premium', category: 'Professional' },
  { id: '2', name: 'Marcus', gender: 'Male', accent: 'British', quality: 'Premium', category: 'Professional' },
  { id: '3', name: 'Sofia', gender: 'Female', accent: 'Spanish', quality: 'Standard', category: 'Conversational' },
  { id: '4', name: 'Chen', gender: 'Male', accent: 'Neutral', quality: 'Premium', category: 'Technical' },
];

export const VoiceStudioModule = () => {
  const { toast } = useToast();
  const [sampleVoices, setSampleVoices] = useState(initialVoices);
  const [selectedVoice, setSelectedVoice] = useState(sampleVoices[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newVoiceName, setNewVoiceName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Editable voice settings
  const [editableVoice, setEditableVoice] = useState(selectedVoice);
  const [originalVoice, setOriginalVoice] = useState(selectedVoice);
  
  const [emotionSettings, setEmotionSettings] = useState({
    calm: [0.7],
    happy: [0.5],
    urgency: [0.3],
  });
  const [originalEmotionSettings, setOriginalEmotionSettings] = useState({
    calm: [0.7],
    happy: [0.5],
    urgency: [0.3],
  });
  
  const [voiceSettings, setVoiceSettings] = useState({
    pitch: [1.0],
    rate: [1.0],
    volume: [0.8],
  });
  const [originalVoiceSettings, setOriginalVoiceSettings] = useState({
    pitch: [1.0],
    rate: [1.0],
    volume: [0.8],
  });

  // Update editable voice when selected voice changes
  useEffect(() => {
    setEditableVoice(selectedVoice);
    setOriginalVoice(selectedVoice);
    setIsEditing(false);
  }, [selectedVoice]);

  const handleVoiceSelect = (voice) => {
    if (isEditing) {
      // Ask user if they want to discard changes
      const shouldDiscard = window.confirm('You have unsaved changes. Do you want to discard them?');
      if (!shouldDiscard) return;
    }
    setSelectedVoice(voice);
  };

  const handleEditableVoiceChange = (field, value) => {
    setEditableVoice(prev => ({ ...prev, [field]: value }));
    setIsEditing(true);
  };

  const handleSaveVoice = () => {
    // Validation
    if (!editableVoice.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Voice name cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    // Update the voice in the list
    const updatedVoices = sampleVoices.map(voice => 
      voice.id === editableVoice.id ? editableVoice : voice
    );
    setSampleVoices(updatedVoices);
    setSelectedVoice(editableVoice);
    setOriginalVoice(editableVoice);
    setOriginalEmotionSettings(emotionSettings);
    setOriginalVoiceSettings(voiceSettings);
    setIsEditing(false);

    toast({
      title: "Success",
      description: "Voice profile updated successfully.",
    });
  };

  const handleCancelEdit = () => {
    setEditableVoice(originalVoice);
    setEmotionSettings(originalEmotionSettings);
    setVoiceSettings(originalVoiceSettings);
    setIsEditing(false);
  };

  const handleCreateVoice = () => {
    if (newVoiceName.trim()) {
      const newVoice = {
        id: (sampleVoices.length + 1).toString(),
        name: newVoiceName.trim(),
        gender: 'Male',
        accent: 'American',
        quality: 'Premium',
        category: 'Custom'
      };
      setSampleVoices([...sampleVoices, newVoice]);
      setNewVoiceName('');
      setShowCreateModal(false);
      
      toast({
        title: "Success",
        description: "New voice profile created successfully.",
      });
    }
  };

  const handleCancelCreate = () => {
    setNewVoiceName('');
    setShowCreateModal(false);
  };

  const handleEmotionChange = (emotion, value) => {
    setEmotionSettings(prev => ({ ...prev, [emotion]: value }));
    setIsEditing(true);
  };

  const handleVoiceParameterChange = (parameter, value) => {
    setVoiceSettings(prev => ({ ...prev, [parameter]: value }));
    setIsEditing(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Voice Studio</h1>
        <p className="text-gray-400">Configure voice properties and emotion settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Voice Library */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Voice Library</CardTitle>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Voice
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {sampleVoices.map((voice) => (
                <div
                  key={voice.id}
                  onClick={() => handleVoiceSelect(voice)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedVoice.id === voice.id
                      ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{voice.name}</h4>
                    <Badge variant={voice.quality === 'Premium' ? 'default' : 'secondary'}>
                      {voice.quality}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-400 space-y-1">
                    <div>{voice.gender} • {voice.accent}</div>
                    <div className="text-purple-400">{voice.category}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Voice Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Voice Details */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Voice Details</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-300">Voice Name</Label>
                  <Input
                    value={editableVoice.name}
                    onChange={(e) => handleEditableVoiceChange('name', e.target.value)}
                    className="bg-gray-900 border-gray-700 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Gender</Label>
                  <Select value={editableVoice.gender} onValueChange={(value) => handleEditableVoiceChange('gender', value)}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Accent</Label>
                  <Select value={editableVoice.accent} onValueChange={(value) => handleEditableVoiceChange('accent', value)}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="American">American</SelectItem>
                      <SelectItem value="British">British</SelectItem>
                      <SelectItem value="Australian">Australian</SelectItem>
                      <SelectItem value="Canadian">Canadian</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Neutral">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Quality</Label>
                  <Select value={editableVoice.quality} onValueChange={(value) => handleEditableVoiceChange('quality', value)}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-300">Category</Label>
                <Select value={editableVoice.category} onValueChange={(value) => handleEditableVoiceChange('category', value)}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Conversational">Conversational</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Emotion Controls */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Emotion Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-300">Calm</label>
                    <span className="text-sm text-gray-400">{emotionSettings.calm[0].toFixed(1)}</span>
                  </div>
                  <Slider
                    value={emotionSettings.calm}
                    onValueChange={(value) => handleEmotionChange('calm', value)}
                    max={1}
                    min={0}
                    step={0.1}
                    className="accent-blue-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-300">Happy</label>
                    <span className="text-sm text-gray-400">{emotionSettings.happy[0].toFixed(1)}</span>
                  </div>
                  <Slider
                    value={emotionSettings.happy}
                    onValueChange={(value) => handleEmotionChange('happy', value)}
                    max={1}
                    min={0}
                    step={0.1}
                    className="accent-green-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-300">Urgency</label>
                    <span className="text-sm text-gray-400">{emotionSettings.urgency[0].toFixed(1)}</span>
                  </div>
                  <Slider
                    value={emotionSettings.urgency}
                    onValueChange={(value) => handleEmotionChange('urgency', value)}
                    max={1}
                    min={0}
                    step={0.1}
                    className="accent-red-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voice Parameters */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Voice Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-300">Pitch</label>
                    <span className="text-sm text-gray-400">{voiceSettings.pitch[0].toFixed(1)}x</span>
                  </div>
                  <Slider
                    value={voiceSettings.pitch}
                    onValueChange={(value) => handleVoiceParameterChange('pitch', value)}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="accent-purple-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-300">Rate</label>
                    <span className="text-sm text-gray-400">{voiceSettings.rate[0].toFixed(1)}x</span>
                  </div>
                  <Slider
                    value={voiceSettings.rate}
                    onValueChange={(value) => handleVoiceParameterChange('rate', value)}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="accent-blue-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-300">Volume</label>
                    <span className="text-sm text-gray-400">{Math.round(voiceSettings.volume[0] * 100)}%</span>
                  </div>
                  <Slider
                    value={voiceSettings.volume}
                    onValueChange={(value) => handleVoiceParameterChange('volume', value)}
                    max={1}
                    min={0}
                    step={0.1}
                    className="accent-green-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save/Cancel Buttons */}
          {isEditing && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <div className="flex justify-end space-x-3">
                  <Button
                    onClick={handleCancelEdit}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveVoice}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Output Settings */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Output Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Audio Format</label>
                <Select defaultValue="mp3">
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp3">MP3 (Compressed)</SelectItem>
                    <SelectItem value="wav">WAV (Uncompressed)</SelectItem>
                    <SelectItem value="ogg">OGG (Web Optimized)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sample Rate</label>
                <Select defaultValue="22050">
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16000">16 kHz (Phone Quality)</SelectItem>
                    <SelectItem value="22050">22.05 kHz (Standard)</SelectItem>
                    <SelectItem value="44100">44.1 kHz (CD Quality)</SelectItem>
                    <SelectItem value="48000">48 kHz (Professional)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Voice Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Create Voice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="voice-name" className="text-gray-300">
                Agent Name
              </Label>
              <Input
                id="voice-name"
                value={newVoiceName}
                onChange={(e) => setNewVoiceName(e.target.value)}
                placeholder="Enter voice profile name"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 mt-2"
              />
            </div>
          </div>
          <DialogFooter className="space-x-2">
            <Button
              variant="outline"
              onClick={handleCancelCreate}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateVoice}
              disabled={!newVoiceName.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
