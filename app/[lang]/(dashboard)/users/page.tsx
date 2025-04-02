'use client';

import { useState, useEffect } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { UserResponse, UserRole, UserStatus } from '@/app/api/user/types';
import { CreateUserDialog } from '@/components/users/create-user-dialog';
import { UserPermissionsDrawer } from '@/components/users/user-permissions-drawer';
import { UserAnalytics } from '@/components/users/user-analytics';
import { RoleSettings } from '@/components/users/role-settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Settings, BarChart, List, Grid, LayoutGrid } from 'lucide-react';

export default function UsersPage() {
  const { users, loading, fetchUsers, updateUserStatus, updateUserPermissions } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | 'all'>('all');
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showPermissionsDrawer, setShowPermissionsDrawer] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showRoleSettings, setShowRoleSettings] = useState(false);
  const [viewType, setViewType] = useState<'list' | 'grid' | 'matrix'>('list');

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusToggle = async (userId: string, currentStatus: UserStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    await updateUserStatus(userId, newStatus);
    await fetchUsers();
  };

  const handleUserClick = (user: UserResponse) => {
    console.log("[HANDLE USER CLICK]", user);
    setSelectedUser(user);
    setShowPermissionsDrawer(true);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAnalytics(true)}>
            <BarChart className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" onClick={() => setShowRoleSettings(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Role Settings
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="search"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="w-48">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole | 'all')}
                >
                  <option value="all">All Roles</option>
                  <option value="superuser">Superuser</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="w-48">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as UserStatus | 'all')}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex items-end gap-2">
                <Button
                  variant={viewType === 'list' ? 'outline' : 'ghost'}
                  size="icon"
                  onClick={() => setViewType('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewType === 'grid' ? 'outline' : 'ghost'}
                  size="icon"
                  onClick={() => setViewType('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewType === 'matrix' ? 'outline' : 'ghost'}
                  size="icon"
                  onClick={() => setViewType('matrix')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {viewType === 'list' && (
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Role</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-4 py-2">
                          <Badge
                            variant={user.status === 'active' ? 'outline' : 'soft'}
                            className="capitalize"
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserClick(user)}
                            >
                              Permissions
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusToggle(user._id, user.status)}
                            >
                              {user.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {viewType === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user) => (
                  <Card key={user._id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                          <Badge
                            variant={user.status === 'active' ? 'outline' : 'soft'}
                            className="capitalize"
                          >
                            {user.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUserClick(user)}
                          >
                            Permissions
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusToggle(user._id, user.status)}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {viewType === 'matrix' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleUserClick(user)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <Badge
                        variant={user.status === 'active' ? 'outline' : 'soft'}
                        className="capitalize"
                      >
                        {user.status}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <Badge variant="outline" className="capitalize">
                        {user.role}
                      </Badge>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusToggle(user._id, user.status);
                        }}
                      >
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <CreateUserDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSuccess={() => {
          setShowCreateDialog(false);
          fetchUsers();
        }}
      />

      {selectedUser && (
        <UserPermissionsDrawer
          open={showPermissionsDrawer}
          onClose={() => {
            setShowPermissionsDrawer(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onSuccess={() => {
            setShowPermissionsDrawer(false);
            setSelectedUser(null);
            fetchUsers();
          }}
        />
      )}

      {showAnalytics && (
        <UserAnalytics
          users={users}
          open={showAnalytics}
          onClose={() => setShowAnalytics(false)}
        />
      )}

      <RoleSettings
        open={showRoleSettings}
        onClose={() => setShowRoleSettings(false)}
        onSuccess={() => {
          setShowRoleSettings(false);
          fetchUsers();
        }}
      />
    </div>
  );
}