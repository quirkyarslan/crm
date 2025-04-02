import { useState } from 'react';
import { api } from '@/config/axios.config';
import { CreateUserDto, UpdateUserDto, UserResponse } from '@/app/api/user/types';
import { useToast } from '@/components/ui/use-toast';

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/user');
      setUsers(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to fetch users',
      });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (data: CreateUserDto) => {
    try {
      setLoading(true);
      console.log("[CREATE USER]", data);
      const response = await api.post('/user/register', data);
      setUsers(prev => [...prev, response.data]);
      toast({
        title: 'Success',
        description: 'User created successfully',
      });
      return response.data;
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to create user',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, data: UpdateUserDto) => {
    try {
      setLoading(true);
      const response = await api.put(`/user/${id}`, data);
      setUsers(prev => prev.map(user => 
        user._id === id ? response.data : user
      ));
      toast({
        title: 'Success',
        description: 'User updated successfully',
      });
      return response.data;
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to update user',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/user/${id}`);
      setUsers(prev => prev.filter(user => user._id !== id));
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to delete user',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (id: string, status: string) => {
    try {
      setLoading(true);
      const response = await api.put(`/user/${id}/status`, { status });
      setUsers(prev => prev.map(user => 
        user._id === id ? response.data : user
      ));
      toast({
        title: 'Success',
        description: 'User status updated successfully',
      });
      return response.data;
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to update user status',
        });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserPermissions = async (id: string, permissions: string[]) => {
    try {
      setLoading(true);
      const response = await api.put(`/user/${id}/permissions`, { permissions });
      setUsers(prev => prev.map(user => 
        user._id === id ? response.data : user
      ));
      toast({
        title: 'Success',
        description: 'User permissions updated successfully',
      });
      return response.data;
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to update user permissions',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    updateUserStatus,
    updateUserPermissions,
  };
}; 