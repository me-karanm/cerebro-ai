
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sidebar } from '@/components/Sidebar';
import { useToast } from '@/hooks/use-toast';

const CreateAgent = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isEditing = Boolean(agentId);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    persona: '',
    initialMessage: '', // Made optional
    language: 'English',
    voice: 'Professional Female'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Available voices
  const voiceOptions = [
    'Professional Female',
    'Professional Male',
    'Friendly Female',
    'Friendly Male',
    'Energetic Female',
    'Energetic Male',
    'Calm Female',
    'Calm Male'
  ];

  const languageOptions = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Dutch',
    'Polish',
    'Russian',
    'Japanese'
  ];

  useEffect(() => {
    if (isEditing && agentId) {
      // In a real app, you would fetch the agent data here
      // For now, we'll simulate with mock data
      setFormData({
        name: 'Customer Support Agent',
        description: 'Handles customer inquiries and support tickets',
        persona: 'Friendly and helpful customer service representative',
        initialMessage: 'Hello! How can I assist you today?',
        language: 'English',
        voice: 'Professional Female'
      });
    }
  }, [isEditing, agentId]);

  const handleModuleChange = (module: string) => {
    switch (module) {
      case 'dashboard':
        navigate('/');
        break;
      case 'agents':
        navigate('/agents');
        break;
      case 'campaigns':
        navigate('/campaigns');
        break;
      case 'contacts':
        navigate('/contacts');
        break;
      case 'channels':
        navigate('/channels');
        break;
      default:
        console.log(`Navigation to ${module} not implemented yet`);
        break;
    }
  };

  const handleBack = () => {
    navigate('/agents');
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Agent name is required';
    }

    if (!formData.description.trim()) {
      errors.description = 'Agent description is required';
    }

    if (!formData.persona.trim()) {
      errors.persona = 'Agent persona is required';
    }

    if (!formData.language) {
      errors.language = 'Language selection is required';
    }

    if (!formData.voice) {
      errors.voice = 'Voice selection is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below and try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const action = isEditing ? 'updated' : 'created';
      toast({
        title: `Agent ${action}`,
        description: `${formData.name} has been ${action} successfully.`,
      });

      navigate('/agents');
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} agent. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex w-full">
      <Sidebar
        activeModule="agents"
        setActiveModule={handleModuleChange}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleBack} className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Agents
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {isEditing ? 'Edit Agent' : 'Create New Agent'}
                </h1>
                <p className="text-gray-400">
                  {isEditing ? 'Update agent configuration' : 'Configure your new AI agent'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Bot className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Agent Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter agent name"
                      className={`bg-gray-900 border-gray-600 text-white ${formErrors.name ? 'border-red-500' : ''}`}
                    />
                    {formErrors.name && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-gray-300">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe what this agent does"
                      rows={3}
                      className={`bg-gray-900 border-gray-600 text-white ${formErrors.description ? 'border-red-500' : ''}`}
                    />
                    {formErrors.description && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.description}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="persona" className="text-gray-300">Persona *</Label>
                    <Textarea
                      id="persona"
                      value={formData.persona}
                      onChange={(e) => handleInputChange('persona', e.target.value)}
                      placeholder="Define the agent's personality and communication style"
                      rows={3}
                      className={`bg-gray-900 border-gray-600 text-white ${formErrors.persona ? 'border-red-500' : ''}`}
                    />
                    {formErrors.persona && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.persona}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Configuration */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="initialMessage" className="text-gray-300">
                      Initial Message <span className="text-gray-500">(Optional)</span>
                    </Label>
                    <Textarea
                      id="initialMessage"
                      value={formData.initialMessage}
                      onChange={(e) => handleInputChange('initialMessage', e.target.value)}
                      placeholder="First message the agent will send (leave empty for no initial message)"
                      rows={2}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                    <p className="text-gray-500 text-sm mt-1">
                      This message will be sent when a conversation starts. Leave empty if you don't want an initial message.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="language" className="text-gray-300">Language *</Label>
                    <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                      <SelectTrigger className={`bg-gray-900 border-gray-600 text-white ${formErrors.language ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-600">
                        {languageOptions.map((lang) => (
                          <SelectItem key={lang} value={lang} className="text-white hover:bg-gray-800">
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.language && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.language}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="voice" className="text-gray-300">Voice *</Label>
                    <Select value={formData.voice} onValueChange={(value) => handleInputChange('voice', value)}>
                      <SelectTrigger className={`bg-gray-900 border-gray-600 text-white ${formErrors.voice ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select voice" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-600">
                        {voiceOptions.map((voice) => (
                          <SelectItem key={voice} value={voice} className="text-white hover:bg-gray-800">
                            {voice}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.voice && (
                      <p className="text-red-400 text-sm mt-1">{formErrors.voice}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={handleBack}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? 'Update Agent' : 'Create Agent'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateAgent;
