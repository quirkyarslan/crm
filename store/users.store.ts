import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { IUser } from '@/models/User';
import { UserRole, UserStatus, UserPermission } from '@/app/api/user/types';
import mongoose from 'mongoose';

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
}

// Redux store state interface
export interface UsersState {
  users: IUser[];
  loading: boolean;
  error: string | null;
  activityLogs: ActivityLog[];
  selectedUser: IUser | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  activityLogs: [],
  selectedUser: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<IUser, '_id' | 'createdAt' | 'updatedAt' | 'comparePassword'>>) => {
      const newUser: IUser = {
        ...action.payload,
        _id: new mongoose.Types.ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        comparePassword: async function(candidatePassword: string): Promise<boolean> {
          return false; // This is a placeholder, actual comparison should be handled by the backend
        }
      };
      state.users.push(newUser);
    },
    updateUser: (state, action: PayloadAction<{ _id: string; updates: Partial<IUser> }>) => {
      const { _id, updates } = action.payload;
      const userIndex = state.users.findIndex(user => user._id.toString() === _id);
      if (userIndex !== -1) {
        state.users[userIndex] = { 
          ...state.users[userIndex], 
          ...updates,
          updatedAt: new Date()
        };
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user._id.toString() !== action.payload);
    },
    setSelectedUser: (state, action: PayloadAction<IUser | null>) => {
      state.selectedUser = action.payload;
    },
    addActivityLog: (state, action: PayloadAction<Omit<ActivityLog, 'id'>>) => {
      const newLog: ActivityLog = {
        ...action.payload,
        id: uuidv4(),
      };
      state.activityLogs.push(newLog);
    },
  },
});

export const { addUser, updateUser, deleteUser, setSelectedUser, addActivityLog } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

// Zustand Store
interface UsersZustandState {
  users: IUser[];
  activityLogs: ActivityLog[];
  selectedUser: IUser | null;
  addUser: (user: Omit<IUser, '_id' | 'createdAt' | 'updatedAt' | 'comparePassword'>) => void;
  updateUser: (_id: string, updates: Partial<IUser>) => void;
  deleteUser: (_id: string) => void;
  setSelectedUser: (user: IUser | null) => void;
  addActivityLog: (log: Omit<ActivityLog, 'id'>) => void;
  getUserAnalytics: () => {
    totalUsers: number;
    activeUsers: number;
    pendingUsers: number;
    suspendedUsers: number;
    usersByRole: Record<UserRole, number>;
    recentActivity: ActivityLog[];
  };
}

export const useUsersStore = create<UsersZustandState>((set, get) => ({
  users: [],
  activityLogs: [],
  selectedUser: null,

  addUser: (user) => {
    const newUser: IUser = {
      ...user,
      _id: new mongoose.Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      comparePassword: async function(candidatePassword: string): Promise<boolean> {
        return false; // This is a placeholder, actual comparison should be handled by the backend
      }
    };
    set((state) => ({
      users: [...state.users, newUser],
    }));
  },

  updateUser: (_id, updates) => {
    set((state) => ({
      users: state.users.map((user) =>
        user._id.toString() === _id ? { ...user, ...updates, updatedAt: new Date() } : user
      ),
    }));
  },

  deleteUser: (_id) => {
    set((state) => ({
      users: state.users.filter((user) => user._id.toString() !== _id),
    }));
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  addActivityLog: (log) => {
    const newLog: ActivityLog = {
      ...log,
      id: uuidv4(),
    };
    set((state) => ({
      activityLogs: [...state.activityLogs, newLog],
    }));
  },

  getUserAnalytics: () => {
    const state = get();
    const users = state.users;
    const activityLogs = state.activityLogs;

    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === 'active').length;
    const pendingUsers = users.filter((user) => user.status === 'pending').length;
    const suspendedUsers = users.filter((user) => user.status === 'suspended').length;

    const usersByRole = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<UserRole, number>);

    const recentActivity = activityLogs
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    return {
      totalUsers,
      activeUsers,
      pendingUsers,
      suspendedUsers,
      usersByRole,
      recentActivity,
    };
  },
})); 