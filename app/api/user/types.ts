export type UserRole = 'superuser' | 'admin' | 'user';

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export type UserPermission = 
  | 'manage_dashboard'
  | 'manage_leads'
  | 'manage_prospecting'
  | 'manage_tasks'
  | 'manage_meetings'
  | 'manage_users';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  permissions: UserPermission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
  permissions?: UserPermission[];
}

export interface UpdateUserStatusDto {
  status: UserStatus;
}

export interface UpdateUserPermissionsDto {
  permissions: UserPermission[];
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  permissions: UserPermission[];
  createdAt: string;
  updatedAt: string;
}

// Default permissions for each role
export const DEFAULT_PERMISSIONS: Record<UserRole, UserPermission[]> = {
  superuser: [
    'manage_dashboard',
    'manage_leads',
    'manage_prospecting',
    'manage_tasks',
    'manage_meetings',
    'manage_users'
  ],
  admin: [
    'manage_dashboard',
    'manage_leads',
    'manage_prospecting',
    'manage_tasks',
    'manage_meetings'
  ],
  user: [
    'manage_leads',
    'manage_tasks',
    'manage_meetings'
  ]
}; 