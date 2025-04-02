'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { UserResponse } from '@/app/api/user/types';
import { Users, UserCheck, UserX, Shield } from 'lucide-react';

interface UserAnalyticsProps {
  users: UserResponse[];
  open: boolean;
  onClose: () => void;
}

export function UserAnalytics({ users, open, onClose }: UserAnalyticsProps) {
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const inactiveUsers = users.filter(user => user.status === 'inactive').length;
  const superusers = users.filter(user => user.role === 'superuser').length;
  const admins = users.filter(user => user.role === 'admin').length;
  const regularUsers = users.filter(user => user.role === 'user').length;

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Active Users',
      value: activeUsers,
      icon: UserCheck,
      color: 'text-green-500',
    },
    {
      title: 'Inactive Users',
      value: inactiveUsers,
      icon: UserX,
      color: 'text-red-500',
    },
    {
      title: 'Super Admins',
      value: superusers,
      icon: Shield,
      color: 'text-purple-500',
    },
  ];

  const roleDistribution = [
    { role: 'Super Admin', count: superusers },
    { role: 'Admin', count: admins },
    { role: 'User', count: regularUsers },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>User Analytics</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-4">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">{stat.title}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Role Distribution</h3>
          <div className="space-y-4">
            {roleDistribution.map(({ role, count }) => (
              <div key={role} className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{role}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: `${(count / totalUsers) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 