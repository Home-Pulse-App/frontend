import type { CreateRoomData, Room, UpdateRoomData } from '@/types/room-types';
import { apiClient } from './apiServices';
import type { Device } from '@/types/devices-types';

export const roomService = {
  async create(homeId: string, roomData: CreateRoomData): Promise<Room> {
    const response = await apiClient.post<{ message: string; room: Room }>(
      `/homes/${homeId}/rooms`,
      roomData,
    );
    return response.room;
  },

  async getAll(homeId: string): Promise<{ success: boolean; rooms: Room[] }> {
    return apiClient.get(`/homes/${homeId}/rooms`);
  },

  async getDevices(
    homeId: string,
    roomId: string,
  ): Promise<{ success: boolean; message: string; data: { devices: Device[] } }> {
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

  async update(homeId: string, roomId: string, roomData: UpdateRoomData): Promise<{ success: boolean; message: string }> {
    return apiClient.put(`/homes/${homeId}/rooms/${roomId}`, roomData);
  },
};
