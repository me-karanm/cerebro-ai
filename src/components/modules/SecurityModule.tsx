
import { useState } from 'react';
import { Shield, Users, Eye, AlertTriangle, Key, FileText, Globe, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const securityEvents = [
  { time: '2 min ago', event: 'Failed login attempt', user: 'unknown@example.com', severity: 'medium' },
  { time: '15 min ago', event: 'API rate limit exceeded', user: 'integration-user', severity: 'low' },
  { time: '1 hour ago', event: 'New user added', user: 'admin@company.com', severity: 'info' },
  { time: '3 hours ago', event: 'GDPR data export requested', user: 'user@example.com', severity: 'info' },
  { time: '6 hours ago', event: 'Suspicious IP access', user: '192.168.1.100', severity: 'high' },
];

const teamMembers = [
  { id: '1', name: 'John Doe', email: 'john@company.com', role: 'admin', lastActive: '2 min ago', status: 'online' },
  { id: '2', name: 'Jane Smith', email: 'jane@company.com', role: 'editor', lastActive: '1 hour ago', status: 'offline' },
  { id: '3', name: 'Mike Johnson', email: 'mike@company.com', role: 'viewer', lastActive: '3 hours ago', status: 'offline' },
];

export const SecurityModule = () => {
  const [gdprEnabled, setGdprEnabled] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);
  const [dataRetention, setDataRetention] = useState('90');

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-red-600 text-white">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-600 text-white">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-600 text-white">Low</Badge>;
      case 'info':
        return <Badge variant="secondary">Info</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-600 text-white">Admin</Badge>;
      case 'editor':
        return <Badge className="bg-blue-600 text-white">Editor</Badge>;
      case 'viewer':
        return <Badge variant="secondary">Viewer</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security</h1>
          <p className="text-gray-400">Manage access control, compliance, and security settings</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Users className="w-4 h-4 mr-2" />
          Invite User
        </Button>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Security Score</p>
                <p className="text-2xl font-bold text-green-400">87%</p>
              </div>
              <Shield className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Security Events</p>
                <p className="text-2xl font-bold text-yellow-400">{securityEvents.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Compliance</p>
                <p className="text-2xl font-bold text-purple-400">GDPR</p>
              </div>
              <FileText className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Access Control */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Key className="w-5 h-5 mr-2" />
              Access Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${member.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    <div>
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-gray-400 text-sm">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getRoleBadge(member.role)}
                    <span className="text-gray-400 text-xs">{member.lastActive}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Users className="w-4 h-4 mr-2" />
              Manage Roles
            </Button>
          </CardContent>
        </Card>

        {/* IP Access Control */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              IP Access Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">IP Whitelist</p>
                <p className="text-gray-400 text-sm">Restrict access to specific IP addresses</p>
              </div>
              <Switch checked={ipWhitelist} onCheckedChange={setIpWhitelist} />
            </div>
            
            {ipWhitelist && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Allowed IP Addresses</label>
                <div className="space-y-2">
                  <Input
                    placeholder="192.168.1.0/24"
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                  <Input
                    placeholder="10.0.0.0/8"
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  Add IP Range
                </Button>
              </div>
            )}

            <div className="bg-gray-700 rounded-lg p-3">
              <h4 className="text-white font-medium mb-2">Recent Access</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">192.168.1.100</span>
                  <span className="text-green-400">Allowed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">203.0.113.50</span>
                  <span className="text-red-400">Blocked</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">10.0.0.15</span>
                  <span className="text-green-400">Allowed</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GDPR Compliance */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              GDPR Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">GDPR Mode</p>
                <p className="text-gray-400 text-sm">Enable enhanced data protection features</p>
              </div>
              <Switch checked={gdprEnabled} onCheckedChange={setGdprEnabled} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Data Retention Period</label>
              <Select value={dataRetention} onValueChange={setDataRetention}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="never">Never delete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Consent Message</label>
              <Textarea
                placeholder="We collect and process your data to provide AI-powered assistance..."
                className="bg-gray-900 border-gray-700 text-white h-20"
                defaultValue="We collect and process your data to provide AI-powered assistance. Your conversations may be stored for quality improvement. You can request data deletion at any time."
              />
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                Export User Data
              </Button>
              <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                Anonymize Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Security Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Audit Logging</p>
                <p className="text-gray-400 text-sm">Track all system activities</p>
              </div>
              <Switch checked={auditLogging} onCheckedChange={setAuditLogging} />
            </div>

            <div className="space-y-3">
              {securityEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white text-sm">{event.event}</p>
                    <p className="text-gray-400 text-xs">{event.user}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getSeverityBadge(event.severity)}
                    <span className="text-gray-400 text-xs">{event.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Eye className="w-4 h-4 mr-2" />
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
