'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserRole, UserPermission, DEFAULT_PERMISSIONS } from '@/app/api/user/types';

interface RoleSettingsProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RoleSettings({ open, onClose, onSuccess }: RoleSettingsProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [permissions, setPermissions] = useState<Record<UserRole, UserPermission[]>>(DEFAULT_PERMISSIONS);

  const roles: UserRole[] = ['superuser', 'admin', 'user'];
  const availablePermissions: UserPermission[] = [
    'manage_dashboard',
    'manage_leads',
    'manage_prospecting',
    'manage_tasks',
    'manage_meetings',
    'manage_users'
  ];

  const handlePermissionToggle = (permission: UserPermission) => {
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: prev[selectedRole].includes(permission)
        ? prev[selectedRole].filter(p => p !== permission)
        : [...prev[selectedRole], permission]
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the role permissions
    // For now, we'll just close the dialog and trigger the success callback
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Role Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex gap-2">
            {roles.map((role) => (
              <Button
                key={role}
                variant={selectedRole === role ? 'ghost' : 'outline'}
                onClick={() => setSelectedRole(role)}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Permissions</h3>
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
                    variant={permissions[selectedRole].includes(permission) ? 'outline' : 'soft'}
                  >
                    {permissions[selectedRole].includes(permission) ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 