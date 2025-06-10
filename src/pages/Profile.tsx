
import { useState } from 'react';
import { User, Lock, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sidebar } from '@/components/Sidebar';
import { toast } from 'sonner';

const Profile = () => {
  const [activeModule, setActiveModule] = useState('profile');
  const [collapsed, setCollapsed] = useState(false);
  const [displayName] = useState('Admin User');
  const [email] = useState('admin@cerebroai.com');
  const [phoneNumber] = useState('+1 (555) 123-4567');
  const [role] = useState('Administrator');

  const handleEditProfile = () => {
    toast.success('Edit profile feature coming soon');
  };

  const handleChangePassword = () => {
    toast.success('Change password feature coming soon');
  };

  const handleUploadAvatar = () => {
    toast.success('Avatar upload feature coming soon');
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-950">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      
      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  My Profile
                </h1>
                <p className="text-sm text-gray-400">Manage your personal information and account settings</p>
              </div>
            </div>

            {/* User Info Card */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <User className="w-5 h-5" />
                  <span>Personal Information</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Your account details and profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                      {displayName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button onClick={handleUploadAvatar} variant="outline" className="mb-2">
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="text-sm text-gray-400">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="displayName" className="text-lg font-semibold mb-2 block text-white">Full Name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      readOnly
                      className="bg-gray-800 border-gray-700 text-gray-300 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-lg font-semibold mb-2 block text-white">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      readOnly
                      className="bg-gray-800 border-gray-700 text-gray-300 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-lg font-semibold mb-2 block text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      readOnly
                      className="bg-gray-800 border-gray-700 text-gray-300 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-lg font-semibold mb-2 block text-white">Role / Permissions</Label>
                    <Input
                      id="role"
                      value={role}
                      readOnly
                      className="bg-gray-800 border-gray-700 text-gray-300 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-6">
                  <Button onClick={handleEditProfile} className="bg-purple-600 hover:bg-purple-700">
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button onClick={handleChangePassword} variant="outline">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
