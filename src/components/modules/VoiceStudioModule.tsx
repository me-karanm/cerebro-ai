
import { useState } from 'react';
import { Play, Pause, Download, Upload, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const sampleVoices = [
  { id: '1', name: 'Aria', gender: 'Female', accent: 'American', quality: 'Premium', category: 'Professional' },
  { id: '2', name: 'Marcus', gender: 'Male', accent: 'British', quality: 'Premium', category: 'Professional' },
  { id: '3', name: 'Sofia', gender: 'Female', accent: 'Spanish', quality: 'Standard', category: 'Conversational' },
  { id: '4', name: 'Chen', gender: 'Male', accent: 'Neutral', quality: 'Premium', category: 'Technical' },
];

export const VoiceStudioModule = () => {
  const [selectedVoice, setSelectedVoice] = useState(sampleVoices[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [emotionSettings, setEmotionSettings] = useState({
    calm: [0.7],
    happy: [0.5],
    urgency: [0.3],
  });
  const [voiceSettings, setVoiceSettings] = useState({
    pitch: [1.0],
    rate: [1.0],
    volume: [0.8],
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Voice Studio</h1>
          <p className="text-gray-400">Configure voice properties and emotion settings</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Custom Voice
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Voice Library */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Voice Library</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sampleVoices.map((voice) => (
                <div
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice)}
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
          {/* Selected Voice Info */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">
                  {selectedVoice.name} - {selectedVoice.category}
                </CardTitle>
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
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Gender:</span>
                  <span className="text-white ml-2">{selectedVoice.gender}</span>
                </div>
                <div>
                  <span className="text-gray-400">Accent:</span>
                  <span className="text-white ml-2">{selectedVoice.accent}</span>
                </div>
                <div>
                  <span className="text-gray-400">Quality:</span>
                  <Badge variant={selectedVoice.quality === 'Premium' ? 'default' : 'secondary'} className="ml-2">
                    {selectedVoice.quality}
                  </Badge>
                </div>
                <div>
                  <span className="text-gray-400">Category:</span>
                  <span className="text-purple-400 ml-2">{selectedVoice.category}</span>
                </div>
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
                    onValueChange={(value) => setEmotionSettings({...emotionSettings, calm: value})}
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
                    onValueChange={(value) => setEmotionSettings({...emotionSettings, happy: value})}
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
                    onValueChange={(value) => setEmotionSettings({...emotionSettings, urgency: value})}
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
                    onValueChange={(value) => setVoiceSettings({...voiceSettings, pitch: value})}
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
                    onValueChange={(value) => setVoiceSettings({...voiceSettings, rate: value})}
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
                    onValueChange={(value) => setVoiceSettings({...voiceSettings, volume: value})}
                    max={1}
                    min={0}
                    step={0.1}
                    className="accent-green-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audio Format */}
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
    </div>
  );
};
