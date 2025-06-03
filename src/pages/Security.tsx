
import { useState } from 'react';
import { Shield, Users, Key, FileText, Globe, Monitor, Plus, Download, Search, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Disabled';
  lastLogin: string;
}

interface AuditLog {
  id: string;
  dateTime: string;
  user: string;
  action: string;
  ipAddress: string;
  details: string;
}

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15 10:30 AM' },
  { id: '2', name: 'Jane Smith', email: 'jane@company.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-15 09:15 AM' },
  { id: '3', name: 'Mike Johnson', email: 'mike@company.com', role: 'Viewer', status: 'Disabled', lastLogin: '2024-01-10 02:45 PM' },
];

const mockAuditLogs: AuditLog[] = [
  { id: '1', dateTime: '2024-01-15 10:30:15', user: 'John Doe', action: 'User Login', ipAddress: '192.168.1.100', details: 'Successful login' },
  { id: '2', dateTime: '2024-01-15 10:25:42', user: 'Jane Smith', action: 'Agent Created', ipAddress: '192.168.1.101', details: 'Created agent "Customer Support Bot"' },
  { id: '3', dateTime: '2024-01-15 09:15:30', user: 'John Doe', action: 'Settings Updated', ipAddress: '192.168.1.100', details: 'Updated MFA settings' },
];

const mockActiveSessions: ActiveSession[] = [
  { id: '1', device: 'Chrome on Windows', location: 'San Francisco, CA', lastActive: '2 minutes ago' },
  { id: '2', device: 'Safari on macOS', location: 'New York, NY', lastActive: '1 hour ago' },
];

const Security = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [auditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>(mockActiveSessions);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<string>('Viewer');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [passwordMinLength, setPasswordMinLength] = useState('8');
  const [passwordExpiration, setPasswordExpiration] = useState('90');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Disabled' : 'Active' }
        : user
    ));
    toast.success('User status updated');
  };

  const handleAddUser = () => {
    if (!newUserEmail) {
      toast.error('Please enter an email address');
      return;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      name: newUserEmail.split('@')[0],
      email: newUserEmail,
      role: newUserRole as 'Admin' | 'Editor' | 'Viewer',
      status: 'Active',
      lastLogin: 'Never'
    };
    
    setUsers([...users, newUser]);
    setNewUserEmail('');
    setNewUserRole('Viewer');
    setIsAddUserOpen(false);
    toast.success('User invited successfully');
  };

  const handleTerminateSession = (sessionId: string) => {
    setActiveSessions(activeSessions.filter(session => session.id !== sessionId));
    toast.success('Session terminated');
  };

  const handleExportLogs = () => {
    toast.success('Audit logs exported successfully');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Security
            </h1>
            <p className="text-gray-400">Manage user access, authentication, and security policies</p>
          </div>
        </div>

        {/* User Access & Roles */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>User Access & Roles</span>
                </CardTitle>
                <CardDescription>Manage user permissions and access levels</CardDescription>
              </div>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New User
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-800">
                  <DialogHeader>
                    <DialogTitle>Invite New User</DialogTitle>
                    <DialogDescription>Send an invitation to a new user</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="user@company.com"
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select value={newUserRole} onValueChange={setNewUserRole}>
                        <SelectTrigger className="bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser} className="bg-red-600 hover:bg-red-700">
                      Send Invitation
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Users Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'Admin' ? 'destructive' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleToggleUserStatus(user.id)}
                        >
                          {user.status === 'Active' ? (
                            <ToggleLeft className="w-4 h-4 text-red-400" />
                          ) : (
                            <ToggleRight className="w-4 h-4 text-green-400" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Authentication Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="w-5 h-5" />
              <span>Authentication Settings</span>
            </CardTitle>
            <CardDescription>Configure security policies and authentication methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="mfa">Multi-Factor Authentication</Label>
                <p className="text-sm text-gray-400">Require MFA for all users</p>
              </div>
              <Switch
                id="mfa"
                checked={mfaEnabled}
                onCheckedChange={setMfaEnabled}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="minLength">Minimum Password Length</Label>
                <Input
                  id="minLength"
                  type="number"
                  value={passwordMinLength}
                  onChange={(e) => setPasswordMinLength(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="expiration">Password Expiration (days)</Label>
                <Input
                  id="expiration"
                  type="number"
                  value={passwordExpiration}
                  onChange={(e) => setPasswordExpiration(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">SSO Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="saml">SAML Metadata URL</Label>
                  <Input
                    id="saml"
                    placeholder="https://your-identity-provider.com/metadata"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="oauth">OAuth Client ID</Label>
                  <Input
                    id="oauth"
                    placeholder="your-oauth-client-id"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs & Session Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Audit Logs */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Audit Logs</span>
                  </CardTitle>
                  <CardDescription>Track user activities and system events</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportLogs}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="border-b border-gray-800 pb-3 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-gray-400">{log.user} • {log.ipAddress}</p>
                        <p className="text-xs text-gray-500">{log.details}</p>
                      </div>
                      <span className="text-xs text-gray-400">{log.dateTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Session Management */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="w-5 h-5" />
                <span>Active Sessions</span>
              </CardTitle>
              <CardDescription>Manage active user sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex justify-between items-center border-b border-gray-800 pb-3 last:border-b-0">
                    <div>
                      <p className="font-medium">{session.device}</p>
                      <p className="text-sm text-gray-400">{session.location}</p>
                      <p className="text-xs text-gray-500">Last active: {session.lastActive}</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleTerminateSession(session.id)}
                    >
                      Terminate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* IP Restrictions */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>IP Restrictions</span>
            </CardTitle>
            <CardDescription>Control access by IP address</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 mb-4">
              <Input
                placeholder="Enter IP address or range (e.g., 192.168.1.0/24)"
                className="bg-gray-800 border-gray-700"
              />
              <Button>Add IP</Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span>192.168.1.0/24</span>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span>10.0.0.0/8</span>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Security;
