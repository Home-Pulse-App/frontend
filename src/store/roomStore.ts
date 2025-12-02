import { create } from 'zustand';
import { roomService } from '../services/roomService';
import type { Room, UpdateRoomData } from '@/types/room-types';
import type { Device } from '@/types/devices-types';

interface RoomsState {
  rooms: Room[];
  devices: Record<string, Device[]>;
  loading: boolean;

  fetchRooms: (homeId: string) => Promise<void>;
  createRoom: (homeId: string, roomData: { roomName: string }) => Promise<void>;
  deleteRoom: (homeId: string, roomId: string) => Promise<void>;
  updateRoom: (homeId: string, roomId: string, roomData: UpdateRoomData) => Promise<void>;

  fetchDevicesOfRoom: (homeId: string, roomId: string) => Promise<void>;
  connectDevice: (homeId: string, roomId: string, deviceId: string) => Promise<void>;
  disconnectDevice: (homeId: string, roomId: string, deviceId: string) => Promise<void>;
}

export const useRoomStore = create<RoomsState>((set, get) => ({
  rooms: [],
  devices: {},
  loading: false,

  fetchRooms: async (homeId: string) => {
    set({ loading: true });
    try {
      const response = await roomService.getAll(homeId);
      set({ rooms: response.rooms, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  createRoom: async (homeId: string, roomData) => {
    try {
      const newRoom = await roomService.create(homeId, roomData);
      set((state) => ({ rooms: [...state.rooms, newRoom] }));
    } catch (err) {
      console.error(err);
    }
  },

  deleteRoom: async (homeId: string, roomId: string) => {
    try {
      await roomService.delete(homeId, roomId);
      set((state) => ({
        rooms: state.rooms.filter((r) => r._id !== roomId),
        devices: { ...state.devices, [roomId]: [] },
      }));
    } catch (err) {
      console.error(err);
    }
  },

  fetchDevicesOfRoom: async (homeId: string, roomId: string) => {
    try {
      const response = await roomService.getDevices(homeId, roomId);
      set((state) => ({
        devices: { ...state.devices, [roomId]: response.data.devices },
      }));
    } catch (err) {
      console.error(err);
    }
  },

  connectDevice: async (homeId: string, roomId: string, deviceId: string) => {
    try {
      await roomService.connectDevice(homeId, roomId, deviceId);
      get().fetchDevicesOfRoom(homeId, roomId);
    } catch (err) {
      console.error(err);
    }
  },

  disconnectDevice: async (homeId: string, roomId: string, deviceId: string) => {
    try {
      await roomService.disconnectDevice(homeId, roomId, deviceId);
      get().fetchDevicesOfRoom(homeId, roomId);
    } catch (err) {
      console.error(err);
    }
  },

  updateRoom: async (homeId: string, roomId: string, roomData: UpdateRoomData) => {
    try {
      await roomService.update(homeId, roomId, roomData);
      get().fetchRooms(homeId);
    } catch (err) {
      console.error(err);
    }
  },
}));
