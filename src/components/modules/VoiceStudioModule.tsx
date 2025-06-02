import { useState, useEffect } from 'react';
import { Play, Pause, Download, Settings, Plus, Save, X, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const defaultVoices = [
  { id: 'default-1', name: 'Aria', gender: 'Female', accent: 'American', quality: 'Premium', category: 'Professional', isDefault: true },
  { id: 'default-2', name: 'Marcus', gender: 'Male', accent: 'British', quality: 'Premium', category: 'Professional', isDefault: true },
  { id: 'default-3', name: 'Sofia', gender: 'Female', accent: 'Spanish', quality: 'Standard', category: 'Conversational', isDefault: true },
  { id: 'default-4', name: 'Chen', gender: 'Male', accent: 'Neutral', quality: 'Premium', category: 'Technical', isDefault: true },
];

export const VoiceStudioModule = () => {
  const { toast } = useToast();
  const [sampleVoices, setSampleVoices] = useState(defaultVoices);
  const [selectedVoice, setSelectedVoice] = useState(defaultVoices[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCloning, setIsCloning] = useState(false);
  const [cloneSource, setCloneSource] = useState(null);
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

  // Modal form state
  const [modalFormData, setModalFormData] = useState({
    name: '',
    gender: 'Male',
    accent: 'American',
    quality: 'Premium',
    category: 'Custom',
    emotions: {
      calm: [0.7],
      happy: [0.5],
      urgency: [0.3],
    },
    voiceParams: {
      pitch: [1.0],
      rate: [1.0],
      volume: [0.8],
    },
    outputSettings: {
      audioFormat: 'mp3',
      sampleRate: '22050',
    },
  });

  // Update editable voice when selected voice changes
  useEffect(() => {
    setEditableVoice(selectedVoice);
    setOriginalVoice(selectedVoice);
    setIsEditing(false);
  }, [selectedVoice]);

  const handleVoiceSelect = (voice) => {
    if (isEditing && !selectedVoice.isDefault) {
      // Ask user if they want to discard changes
      const shouldDiscard = window.confirm('You have unsaved changes. Do you want to discard them?');
      if (!shouldDiscard) return;
    }
    setSelectedVoice(voice);
  };

  const handleEditableVoiceChange = (field, value) => {
    if (selectedVoice.isDefault) return; // Prevent editing default voices
    setEditableVoice(prev => ({ ...prev, [field]: value }));
    setIsEditing(true);
  };

  const handleCloneVoice = (voice) => {
    setIsCloning(true);
    setCloneSource(voice);
    setModalFormData({
      name: `${voice.name} Clone`,
      gender: voice.gender,
      accent: voice.accent,
      quality: voice.quality,
      category: voice.category,
      emotions: { ...emotionSettings },
      voiceParams: { ...voiceSettings },
      outputSettings: {
        audioFormat: 'mp3',
        sampleRate: '22050',
      },
    });
    setShowCreateModal(true);
  };

  const handleCreateVoiceClick = () => {
    setIsCloning(false);
    setCloneSource(null);
    setModalFormData({
      name: '',
      gender: 'Male',
      accent: 'American',
      quality: 'Premium',
      category: 'Custom',
      emotions: {
        calm: [0.7],
        happy: [0.5],
        urgency: [0.3],
      },
      voiceParams: {
        pitch: [1.0],
        rate: [1.0],
        volume: [0.8],
      },
      outputSettings: {
        audioFormat: 'mp3',
        sampleRate: '22050',
      },
    });
    setShowCreateModal(true);
  };

  const handleSaveVoice = () => {
    if (!selectedVoice.isDefault) {
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
    }
  };

  const handleCancelEdit = () => {
    if (!selectedVoice.isDefault) {
      setEditableVoice(originalVoice);
      setEmotionSettings(originalEmotionSettings);
      setVoiceSettings(originalVoiceSettings);
      setIsEditing(false);
    }
  };

  const handleCreateVoice = () => {
    if (modalFormData.name.trim()) {
      const newVoice = {
        id: `custom-${Date.now()}`,
        name: modalFormData.name.trim(),
        gender: modalFormData.gender,
        accent: modalFormData.accent,
        quality: modalFormData.quality,
        category: modalFormData.category,
        isDefault: false,
      };
      setSampleVoices([...sampleVoices, newVoice]);
      setShowCreateModal(false);
      
      toast({
        title: "Success",
        description: isCloning ? "Voice cloned successfully." : "New voice profile created successfully.",
      });
    }
  };

  const handleCancelCreate = () => {
    setShowCreateModal(false);
    setIsCloning(false);
    setCloneSource(null);
  };

  const handleEmotionChange = (emotion, value) => {
    if (!selectedVoice.isDefault) {
      setEmotionSettings(prev => ({ ...prev, [emotion]: value }));
      setIsEditing(true);
    }
  };

  const handleVoiceParameterChange = (parameter, value) => {
    if (!selectedVoice.isDefault) {
      setVoiceSettings(prev => ({ ...prev, [parameter]: value }));
      setIsEditing(true);
    }
  };

  const updateModalFormData = (field, value) => {
    setModalFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateModalEmotions = (emotion, value) => {
    setModalFormData(prev => ({
      ...prev,
      emotions: { ...prev.emotions, [emotion]: value }
    }));
  };

  const updateModalVoiceParams = (param, value) => {
    setModalFormData(prev => ({
      ...prev,
      voiceParams: { ...prev.voiceParams, [param]: value }
    }));
  };

  const updateModalOutputSettings = (setting, value) => {
    setModalFormData(prev => ({
      ...prev,
      outputSettings: { ...prev.outputSettings, [setting]: value }
    }));
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
                  onClick={handleCreateVoiceClick}
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
                  className={`p-3 rounded-lg transition-all ${
                    selectedVoice.id === voice.id
                      ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div
                    onClick={() => handleVoiceSelect(voice)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{voice.name}</h4>
                      <div className="flex space-x-1">
                        {voice.isDefault && (
                          <Badge variant="secondary" className="bg-gray-600 text-gray-200">
                            Default
                          </Badge>
                        )}
                        <Badge variant={voice.quality === 'Premium' ? 'default' : 'secondary'}>
                          {voice.quality}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 space-y-1">
                      <div>{voice.gender} • {voice.accent}</div>
                      <div className="text-purple-400">{voice.category}</div>
                    </div>
                  </div>
                  {voice.isDefault && (
                    <div className="mt-2 pt-2 border-t border-gray-600">
                      <Button
                        onClick={() => handleCloneVoice(voice)}
                        size="sm"
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Copy className="w-3 h-3 mr-2" />
                        Clone
                      </Button>
                    </div>
                  )}
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
                    disabled={selectedVoice.isDefault}
                    className={`bg-gray-900 border-gray-700 text-white mt-1 ${selectedVoice.isDefault ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Gender</Label>
                  <Select 
                    value={editableVoice.gender} 
                    onValueChange={(value) => handleEditableVoiceChange('gender', value)}
                    disabled={selectedVoice.isDefault}
                  >
                    <SelectTrigger className={`bg-gray-900 border-gray-700 text-white mt-1 ${selectedVoice.isDefault ? 'opacity-60 cursor-not-allowed' : ''}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="Male" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Male</SelectItem>
                      <SelectItem value="Female" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Female</SelectItem>
                      <SelectItem value="Other" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Accent</Label>
                  <Select 
                    value={editableVoice.accent} 
                    onValueChange={(value) => handleEditableVoiceChange('accent', value)}
                    disabled={selectedVoice.isDefault}
                  >
                    <SelectTrigger className={`bg-gray-900 border-gray-700 text-white mt-1 ${selectedVoice.isDefault ? 'opacity-60 cursor-not-allowed' : ''}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="American" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">American</SelectItem>
                      <SelectItem value="British" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">British</SelectItem>
                      <SelectItem value="Australian" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Australian</SelectItem>
                      <SelectItem value="Canadian" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Canadian</SelectItem>
                      <SelectItem value="Spanish" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Spanish</SelectItem>
                      <SelectItem value="French" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">French</SelectItem>
                      <SelectItem value="German" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">German</SelectItem>
                      <SelectItem value="Neutral" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300">Quality</Label>
                  <Select 
                    value={editableVoice.quality} 
                    onValueChange={(value) => handleEditableVoiceChange('quality', value)}
                    disabled={selectedVoice.isDefault}
                  >
                    <SelectTrigger className={`bg-gray-900 border-gray-700 text-white mt-1 ${selectedVoice.isDefault ? 'opacity-60 cursor-not-allowed' : ''}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="Standard" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Standard</SelectItem>
                      <SelectItem value="Premium" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Premium</SelectItem>
                      <SelectItem value="Custom" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-300">Category</Label>
                <Select 
                  value={editableVoice.category} 
                  onValueChange={(value) => handleEditableVoiceChange('category', value)}
                  disabled={selectedVoice.isDefault}
                >
                  <SelectTrigger className={`bg-gray-900 border-gray-700 text-white mt-1 ${selectedVoice.isDefault ? 'opacity-60 cursor-not-allowed' : ''}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="Professional" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Professional</SelectItem>
                    <SelectItem value="Conversational" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Conversational</SelectItem>
                    <SelectItem value="Technical" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Technical</SelectItem>
                    <SelectItem value="Custom" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Custom</SelectItem>
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
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-gray-300">Calm</label>
                    <span className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full shadow-sm">
                      {emotionSettings.calm[0].toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={emotionSettings.calm}
                    onValueChange={(value) => handleEmotionChange('calm', value)}
                    max={1}
                    min={0}
                    step={0.1}
                    disabled={selectedVoice.isDefault}
                    className={`w-full ${selectedVoice.isDefault ? 'opacity-60' : ''}`}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-gray-300">Happy</label>
                    <span className="text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full shadow-sm">
                      {emotionSettings.happy[0].toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={emotionSettings.happy}
                    onValueChange={(value) => handleEmotionChange('happy', value)}
                    max={1}
                    min={0}
                    step={0.1}
                    disabled={selectedVoice.isDefault}
                    className={`w-full ${selectedVoice.isDefault ? 'opacity-60' : ''}`}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-gray-300">Urgency</label>
                    <span className="text-sm font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full shadow-sm">
                      {emotionSettings.urgency[0].toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={emotionSettings.urgency}
                    onValueChange={(value) => handleEmotionChange('urgency', value)}
                    max={1}
                    min={0}
                    step={0.1}
                    disabled={selectedVoice.isDefault}
                    className={`w-full ${selectedVoice.isDefault ? 'opacity-60' : ''}`}
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
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-gray-300">Pitch</label>
                    <span className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full shadow-sm">
                      {voiceSettings.pitch[0].toFixed(1)}x
                    </span>
                  </div>
                  <Slider
                    value={voiceSettings.pitch}
                    onValueChange={(value) => handleVoiceParameterChange('pitch', value)}
                    max={2}
                    min={0.5}
                    step={0.1}
                    disabled={selectedVoice.isDefault}
                    className={`w-full ${selectedVoice.isDefault ? 'opacity-60' : ''}`}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-gray-300">Rate</label>
                    <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full shadow-sm">
                      {voiceSettings.rate[0].toFixed(1)}x
                    </span>
                  </div>
                  <Slider
                    value={voiceSettings.rate}
                    onValueChange={(value) => handleVoiceParameterChange('rate', value)}
                    max={2}
                    min={0.5}
                    step={0.1}
                    disabled={selectedVoice.isDefault}
                    className={`w-full ${selectedVoice.isDefault ? 'opacity-60' : ''}`}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-gray-300">Volume</label>
                    <span className="text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full shadow-sm">
                      {Math.round(voiceSettings.volume[0] * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={voiceSettings.volume}
                    onValueChange={(value) => handleVoiceParameterChange('volume', value)}
                    max={1}
                    min={0}
                    step={0.1}
                    disabled={selectedVoice.isDefault}
                    className={`w-full ${selectedVoice.isDefault ? 'opacity-60' : ''}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save/Cancel Buttons */}
          {isEditing && !selectedVoice.isDefault && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <div className="flex justify-end space-x-3">
                  <Button
                    onClick={handleCancelEdit}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveVoice}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
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
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="mp3" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">MP3 (Compressed)</SelectItem>
                    <SelectItem value="wav" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">WAV (Uncompressed)</SelectItem>
                    <SelectItem value="ogg" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">OGG (Web Optimized)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sample Rate</label>
                <Select defaultValue="22050">
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="16000" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">16 kHz (Phone Quality)</SelectItem>
                    <SelectItem value="22050" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">22.05 kHz (Standard)</SelectItem>
                    <SelectItem value="44100" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">44.1 kHz (CD Quality)</SelectItem>
                    <SelectItem value="48000" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">48 kHz (Professional)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Voice Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-semibold">
              {isCloning ? `Clone Voice: ${cloneSource?.name}` : 'Create Voice'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-8 py-4">
            {/* Voice Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Voice Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="voice-name" className="text-gray-300 text-sm font-medium">Voice Name *</Label>
                  <Input
                    id="voice-name"
                    value={modalFormData.name}
                    onChange={(e) => updateModalFormData('name', e.target.value)}
                    placeholder="Enter voice profile name"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 mt-2 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-sm font-medium">Gender</Label>
                  <Select value={modalFormData.gender} onValueChange={(value) => updateModalFormData('gender', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="Male" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Male</SelectItem>
                      <SelectItem value="Female" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Female</SelectItem>
                      <SelectItem value="Other" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300 text-sm font-medium">Accent</Label>
                  <Select value={modalFormData.accent} onValueChange={(value) => updateModalFormData('accent', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="American" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">American</SelectItem>
                      <SelectItem value="British" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">British</SelectItem>
                      <SelectItem value="Australian" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Australian</SelectItem>
                      <SelectItem value="Canadian" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Canadian</SelectItem>
                      <SelectItem value="Spanish" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Spanish</SelectItem>
                      <SelectItem value="French" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">French</SelectItem>
                      <SelectItem value="German" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">German</SelectItem>
                      <SelectItem value="Neutral" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300 text-sm font-medium">Quality</Label>
                  <Select value={modalFormData.quality} onValueChange={(value) => updateModalFormData('quality', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="Standard" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Standard</SelectItem>
                      <SelectItem value="Premium" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Premium</SelectItem>
                      <SelectItem value="Custom" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-gray-300 text-sm font-medium">Category</Label>
                <Select value={modalFormData.category} onValueChange={(value) => updateModalFormData('category', value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="Professional" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Professional</SelectItem>
                    <SelectItem value="Conversational" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Conversational</SelectItem>
                    <SelectItem value="Technical" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Technical</SelectItem>
                    <SelectItem value="Custom" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Emotion Settings Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Emotion Settings</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-gray-300 text-sm font-medium">Calm</Label>
                    <span className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full shadow-sm">
                      {modalFormData.emotions.calm[0].toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={modalFormData.emotions.calm}
                    onValueChange={(value) => updateModalEmotions('calm', value)}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-gray-300 text-sm font-medium">Happy</Label>
                    <span className="text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full shadow-sm">
                      {modalFormData.emotions.happy[0].toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={modalFormData.emotions.happy}
                    onValueChange={(value) => updateModalEmotions('happy', value)}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-gray-300 text-sm font-medium">Urgency</Label>
                    <span className="text-sm font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full shadow-sm">
                      {modalFormData.emotions.urgency[0].toFixed(1)}
                    </span>
                  </div>
                  <Slider
                    value={modalFormData.emotions.urgency}
                    onValueChange={(value) => updateModalEmotions('urgency', value)}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Voice Parameters Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Voice Parameters</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-gray-300 text-sm font-medium">Pitch</Label>
                    <span className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full shadow-sm">
                      {modalFormData.voiceParams.pitch[0].toFixed(1)}x
                    </span>
                  </div>
                  <Slider
                    value={modalFormData.voiceParams.pitch}
                    onValueChange={(value) => updateModalVoiceParams('pitch', value)}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-gray-300 text-sm font-medium">Rate</Label>
                    <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full shadow-sm">
                      {modalFormData.voiceParams.rate[0].toFixed(1)}x
                    </span>
                  </div>
                  <Slider
                    value={modalFormData.voiceParams.rate}
                    onValueChange={(value) => updateModalVoiceParams('rate', value)}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-gray-300 text-sm font-medium">Volume</Label>
                    <span className="text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full shadow-sm">
                      {Math.round(modalFormData.voiceParams.volume[0] * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={modalFormData.voiceParams.volume}
                    onValueChange={(value) => updateModalVoiceParams('volume', value)}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Output Settings Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Output Settings</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-300 text-sm font-medium">Audio Format</Label>
                  <Select value={modalFormData.outputSettings.audioFormat} onValueChange={(value) => updateModalOutputSettings('audioFormat', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="mp3" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">MP3 (Compressed)</SelectItem>
                      <SelectItem value="wav" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">WAV (Uncompressed)</SelectItem>
                      <SelectItem value="ogg" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">OGG (Web Optimized)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300 text-sm font-medium">Sample Rate</Label>
                  <Select value={modalFormData.outputSettings.sampleRate} onValueChange={(value) => updateModalOutputSettings('sampleRate', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                      <SelectItem value="22050" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">22.05 kHz (Standard)</SelectItem>
                      <SelectItem value="44100" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">44.1 kHz (High)</SelectItem>
                      <SelectItem value="48000" className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">48 kHz (Professional)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="space-x-3 pt-6 border-t border-gray-700">
            <Button
              variant="outline"
              onClick={handleCancelCreate}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateVoice}
              disabled={!modalFormData.name.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"
            >
              {isCloning ? 'Clone Voice' : 'Create Voice'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
