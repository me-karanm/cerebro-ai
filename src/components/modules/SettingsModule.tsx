
import { useState } from 'react';
import { Settings, Clock, Zap, Palette, Globe, Bell, Database, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export const SettingsModule = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState([30]);
  const [rateLimit, setRateLimit] = useState([1000]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Configure system-wide preferences and behavior</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Database className="w-4 h-4 mr-2" />
          Backup Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-gray-400 text-sm">Use dark theme as default</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Auto Save</p>
                <p className="text-gray-400 text-sm">Automatically save changes</p>
              </div>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Default Language</label>
              <Select defaultValue="en">
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
              <Select defaultValue="utc">
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                  <SelectItem value="gmt">GMT</SelectItem>
                  <SelectItem value="jst">Japan Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Performance Settings */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Performance Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">Session Timeout (minutes)</label>
                <span className="text-sm text-gray-400">{sessionTimeout[0]} min</span>
              </div>
              <Slider
                value={sessionTimeout}
                onValueChange={setSessionTimeout}
                max={120}
                min={5}
                step={5}
                className="accent-purple-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">Rate Limit (requests/minute)</label>
                <span className="text-sm text-gray-400">{rateLimit[0]}</span>
              </div>
              <Slider
                value={rateLimit}
                onValueChange={setRateLimit}
                max={5000}
                min={100}
                step={100}
                className="accent-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cache Duration</label>
              <Select defaultValue="1h">
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5m">5 minutes</SelectItem>
                  <SelectItem value="15m">15 minutes</SelectItem>
                  <SelectItem value="1h">1 hour</SelectItem>
                  <SelectItem value="24h">24 hours</SelectItem>
                  <SelectItem value="7d">7 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Response Timeout</label>
              <Select defaultValue="30s">
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10s">10 seconds</SelectItem>
                  <SelectItem value="30s">30 seconds</SelectItem>
                  <SelectItem value="60s">60 seconds</SelectItem>
                  <SelectItem value="120s">2 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Branding Settings */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Branding
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
              <Input
                defaultValue="Cerebro AI"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Logo URL</label>
              <Input
                placeholder="https://example.com/logo.png"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Favicon URL</label>
              <Input
                placeholder="https://example.com/favicon.ico"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Primary Brand Color</label>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-500 rounded border border-gray-600"></div>
                <Input
                  value="#8B5CF6"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded border border-gray-600"></div>
                <Input
                  value="#3B82F6"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-gray-400 text-sm">Receive alerts via email</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-gray-400 text-sm">Browser push notifications</p>
              </div>
              <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Notification Email</label>
              <Input
                type="email"
                defaultValue="admin@company.com"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Alert Threshold</label>
              <Select defaultValue="medium">
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="medium">Medium+ Severity</SelectItem>
                  <SelectItem value="high">High Severity Only</SelectItem>
                  <SelectItem value="critical">Critical Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Global Fallback Messages */}
        <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Global Fallback Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Error Message</label>
                <Textarea
                  defaultValue="I apologize, but I'm experiencing some technical difficulties. Please try again in a moment."
                  className="bg-gray-900 border-gray-700 text-white h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Timeout Message</label>
                <Textarea
                  defaultValue="I notice you've been away. Would you like to continue our conversation?"
                  className="bg-gray-900 border-gray-700 text-white h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Offline Message</label>
                <Textarea
                  defaultValue="I'm currently offline. Please leave a message and I'll get back to you soon."
                  className="bg-gray-900 border-gray-700 text-white h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Maintenance Message</label>
                <Textarea
                  defaultValue="I'm currently undergoing maintenance. Please check back shortly."
                  className="bg-gray-900 border-gray-700 text-white h-20"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
          Reset to Defaults
        </Button>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          Save All Settings
        </Button>
      </div>
    </div>
  );
};
