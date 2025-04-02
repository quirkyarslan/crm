'use client';

import { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useUsers } from '@/hooks/useUsers';
import { UserResponse, UserPermission } from '@/app/api/user/types';

interface UserPermissionsDrawerProps {
  open: boolean;
  onClose: () => void;
  user: UserResponse | null;
  onSuccess: () => void;
}

const availablePermissions: UserPermission[] = [
  'manage_dashboard',
  'manage_leads',
  'manage_prospecting',
  'manage_tasks',
  'manage_meetings',
  'manage_users'
];

export function UserPermissionsDrawer({ open, onClose, user, onSuccess }: UserPermissionsDrawerProps) {
  const { updateUser, updateUserPermissions, loading } = useUsers();
  const [formData, setFormData] = useState<Partial<UserResponse>>({
    name: '',
    email: '',
    role: 'user',
    permissions: [],
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateUser(user._id, formData);
      onSuccess();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handlePermissionToggle = async (permission: UserPermission) => {
    if (!user) return;

    const newPermissions = formData.permissions?.includes(permission)
      ? formData.permissions.filter(p => p !== permission)
      : [...(formData.permissions || []), permission];

    try {
      await updateUserPermissions(user._id, newPermissions);
      setFormData(prev => ({ ...prev, permissions: newPermissions }));
      onSuccess();
    } catch (error) {
      console.error('Failed to update permissions:', error);
    }
  };

  if (!user) return null;

  return (
    <Drawer open={open} onOpenChange={(open) => {
      if (!open) {
        onClose();
      }
    }}>
      <DrawerContent className="h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>User Permissions</DrawerTitle>
        </DrawerHeader>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="w-full p-2 border rounded-md"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superuser">Super Admin</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Permissions</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availablePermissions.map((permission) => (
                  <div
                    key={permission}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => handlePermissionToggle(permission)}
                  >
                    <span className="capitalize">
                      {permission.replace(/_/g, ' ')}
                    </span>
                    <Badge
                      variant={formData.permissions?.includes(permission) ? 'outline' : 'soft'}
                    >
                      {formData.permissions?.includes(permission) ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
} 