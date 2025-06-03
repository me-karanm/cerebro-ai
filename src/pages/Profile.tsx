
import { useState } from 'react';
import { User, Lock, Bell, Globe, Shield, Camera, Smartphone, Mail, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface AuthorizedDevice {
  id: string;
  name: string;
  type: string;
  location: string;
  lastActive: string;
  current: boolean;
}

const mockDevices: AuthorizedDevice[] = [
  { id: '1', name: 'Chrome on Windows', type: 'Desktop', location: 'San Francisco, CA', lastActive: 'Now', current: true },
  { id: '2', name: 'Safari on macOS', type: 'Desktop', location: 'San Francisco, CA', lastActive: '2 hours ago', current: false },
  { id: '3', name: 'Mobile Safari', type: 'Mobile', location: 'San Francisco, CA', lastActive: '1 day ago', current: false },
];

const Profile = () => {
  const [devices, setDevices] = useState<AuthorizedDevice[]>(mockDevices);
  const [displayName, setDisplayName] = useState('John Doe');
  const [email] = useState('john.doe@company.com');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 123-4567');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [language, setLanguage] = useState('en');
  const [timeZone, setTimeZone] = useState('America/Los_Angeles');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(false);

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const getStrengthColor = (strength: number) => {
    if (strength < 25) return 'bg-red-500';
    if (strength < 50) return 'bg-orange-500';
    if (strength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength < 25) return 'Weak';
    if (strength < 50) return 'Fair';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const handleSavePersonalInfo = () => {
    toast.success('Personal information updated successfully');
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordStrength < 50) {
      toast.error('Password is too weak. Please choose a stronger password.');
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    toast.success('Password changed successfully');
  };

  const handleRevokeDevice = (deviceId: string) => {
    setDevices(devices.filter(device => device.id !== deviceId));
    toast.success('Device access revoked');
  };

  const handleUploadAvatar = () => {
    toast.success('Avatar uploaded successfully');
  };

  const handleToggleMFA = (enabled: boolean) => {
    setMfaEnabled(enabled);
    if (enabled) {
      toast.success('MFA enabled. Please set up your authenticator app.');
    } else {
      toast.success('MFA disabled');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="text-gray-400">Manage your personal information and preferences</p>
          </div>
        </div>

        {/* Personal Information */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Personal Information</span>
            </CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl bg-gray-800">
                  {displayName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button onClick={handleUploadAvatar} className="mb-2">
                  <Camera className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
                <p className="text-sm text-gray-400">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  readOnly
                  className="bg-gray-800 border-gray-700 opacity-60"
                />
                <p className="text-xs text-gray-500 mt-1">Contact admin to change email</p>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            <Button onClick={handleSavePersonalInfo}>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Password Management */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Password Management</span>
            </CardTitle>
            <CardDescription>Change your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
                {newPassword && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Password Strength</span>
                      <span className={`${passwordStrength >= 75 ? 'text-green-400' : passwordStrength >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {getStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-sm text-red-400 mt-1">Passwords do not match</p>
                )}
              </div>
            </div>

            <Button onClick={handleChangePassword}>
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Preferences & Security */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preferences */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Preferences</span>
              </CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="profileLanguage">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="profileTimeZone">Time Zone</Label>
                <Select value={timeZone} onValueChange={setTimeZone}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Notification Preferences</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>Email Notifications</span>
                    </div>
                    <Switch 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-gray-400" />
                      <span>SMS Notifications</span>
                    </div>
                    <Switch 
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-gray-400" />
                      <span>Push Notifications</span>
                    </div>
                    <Switch 
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Multi-Factor Authentication</Label>
                  <p className="text-sm text-gray-400">Add an extra layer of security</p>
                </div>
                <Switch 
                  checked={mfaEnabled}
                  onCheckedChange={handleToggleMFA}
                />
              </div>

              <div>
                <Label className="mb-3 block">Authorized Devices</Label>
                <div className="space-y-3">
                  {devices.map((device) => (
                    <div key={device.id} className="flex justify-between items-start p-3 bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{device.name}</p>
                          {device.current && (
                            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Current</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{device.type} • {device.location}</p>
                        <p className="text-xs text-gray-500">Last active: {device.lastActive}</p>
                      </div>
                      {!device.current && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRevokeDevice(device.id)}
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
