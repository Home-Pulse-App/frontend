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

  async deleteRoom(homeId: string, roomId: string): Promise<{ success: boolean; message: string }> {
    return apiClient.delete(`/homes/${homeId}/rooms/${roomId}`);
  },

  async updateRoom(roomId: string, roomData: UpdateRoomData): Promise<{ success: boolean; message: string }> {
    console.log(roomData);
    return apiClient.put(`/room/${roomId}`, roomData);
  },

  async getRoom(roomId: string): Promise<{ message: string; room: Room }> {
    return apiClient.get(`/room/${roomId}`);
  },

  async getRoomSplat(roomId: string): Promise<{ splatUrl: string | null }> {
    try {
      const blob = await apiClient.getBlob(`/room/${roomId}/splat`);

      if (!blob) {
        // No splat file exists for this room
        return { splatUrl: null };
      }

      // Create a URL for the blob
      const splatUrl = URL.createObjectURL(blob);

      return { splatUrl };
    } catch (error) {
      console.error('Error fetching splat file:', error);
      return { splatUrl: null };
    }
  },
};
