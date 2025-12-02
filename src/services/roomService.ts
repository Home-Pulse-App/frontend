import type { CreateRoomData } from '@/types/room-types';
import { apiClient } from './apiServices';
import type { Device, Room } from '@/types';

export const roomService = {

  async create(homeId: string, roomData: CreateRoomData): Promise<Room> {
    return apiClient.post(`/homes/${homeId}/rooms`, roomData);
  },

  async getAll(homeId: string): Promise<{ success: boolean; rooms: Room[] }> {
    return apiClient.get(`/homes/${homeId}/rooms`);
  },

  async getDevices(homeId: string, roomId: string): Promise<{ success: boolean; devices: Device[] }> {
    return apiClient.get(`/homes/${homeId}/rooms/${roomId}/devices`);
  },

  async connectDevice(
    homeId: string,
    roomId: string,
    deviceId: string,
  ): Promise<{ success: boolean; message: string }> {
    return apiClient.post(`/homes/${homeId}/rooms/${roomId}/connect/${deviceId}`);
  },

  async disconnectDevice(
    homeId: string,
    roomId: string,
    deviceId: string,
  ): Promise<{ success: boolean; message: string }> {
    return apiClient.delete(`/homes/${homeId}/rooms/${roomId}/disconnect/${deviceId}`);
  },

  async delete(homeId: string, roomId: string): Promise<{ success: boolean; message: string }> {
    return apiClient.delete(`/homes/${homeId}/rooms/${roomId}`);
  },
};