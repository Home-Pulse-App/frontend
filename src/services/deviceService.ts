
import type { CreateDeviceData, Device } from '@/types/devices-types';
import { apiClient } from './apiServices';

export const deviceService = {

  async create(deviceData: CreateDeviceData): Promise<{
    success: boolean;
    message: string;
    data: { device: Device };
  }> {
    return apiClient.post('/devices', deviceData);
  },

  async getAll(): Promise<{
    success: boolean;
    message: string;
    devices: Device[];
  }> {
    return apiClient.get('/devices');
  },

  async delete(deviceId: string): Promise<{ success: boolean; message: string }> {
    return apiClient.delete(`/devices/${deviceId}`);
  },
};