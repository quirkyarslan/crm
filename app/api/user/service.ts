// app/api/user/service.ts

import { connectDB } from '@/lib/mongodb';
import { User, IUser } from '@/models/User';
import { CreateUserDto, UpdateUserDto, UserRole, DEFAULT_PERMISSIONS, UserPermission, UserStatus } from './types';

export class UserService {
  async createUser(data: CreateUserDto): Promise<IUser> {
    await connectDB();
    const role = data.role || 'user';
    
    const user = await User.create({
      ...data,
      role,
      status: 'pending',
      permissions: DEFAULT_PERMISSIONS[role],
    });

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<IUser | null> {
    await connectDB();
    const updateData: any = { ...data };
    
    if (data.role) {
      updateData.permissions = DEFAULT_PERMISSIONS[data.role];
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return user;
  }

  async getUserById(id: string): Promise<IUser | null> {
    await connectDB();
    return User.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    await connectDB();
    return User.findOne({ email });
  }

  async getAllUsers(): Promise<IUser[]> {
    await connectDB();
    return User.find().sort({ createdAt: -1 });
  }

  async deleteUser(id: string): Promise<void> {
    await connectDB();
    await User.findByIdAndDelete(id);
  }

  async updateUserStatus(id: string, status: UserStatus): Promise<IUser | null> {
    await connectDB();
    return User.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
  }

  async updateUserPermissions(id: string, permissions: string[]): Promise<IUser | null> {
    await connectDB();
    return User.findByIdAndUpdate(
      id,
      { $set: { permissions } },
      { new: true }
    );
  }

  async hasPermission(userId: string, permission: string): Promise<boolean> {
    await connectDB();
    const user = await this.getUserById(userId);
    if (!user) return false;
    
    if (user.role === 'superuser') return true;
    return user.permissions.includes(permission as UserPermission);
  }
} 