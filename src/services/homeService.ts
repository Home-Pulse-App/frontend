import type { CreateHomeData } from '@/types/homes-types';
import { apiClient } from './apiServices';
import type { Home } from '@/types';

export const homeService = {

  async create(homeData: CreateHomeData): Promise<{ message: string; home: Home }> {
    return apiClient.post('/homes', homeData);
  },

  async getAll(): Promise<{ success: boolean; message: string; homes: Home[] }> {
    return apiClient.get('/homes');
  },

  async getById(homeId: string): Promise<{ success: boolean; message: string; home: Home }> {
    return apiClient.get(`/homes/${homeId}`);
  },

  async delete(homeId: string): Promise<{ success: boolean; message: string }> {
    return apiClient.delete(`/homes/${homeId}`);
  },
};