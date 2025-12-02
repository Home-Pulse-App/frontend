import type { CreateUserData, CreateUserResponse, UpdateUserData, User } from '@/types/user-types';
import { apiClient } from './apiServices';

export const userService = {

  async create(userData: CreateUserData): Promise<CreateUserResponse> {
    return apiClient.post<CreateUserResponse>('/users', userData);
  },

  async update(userData: UpdateUserData): Promise<User> {
    return apiClient.put<User>('/users', userData);
  },

  async delete(): Promise<{ success: boolean; message: string }> {
    return apiClient.delete('/users');
  },
};