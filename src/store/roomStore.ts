import { create } from 'zustand';
import { roomService } from '../services/roomService';
import type { Room, UpdateRoomData } from '@/types/room-types';
import type { Device } from '@/types/devices-types';
import type { DeviceData } from '@/types/device';

interface RoomsState {
  rooms: Room[];
  viewDevices: DeviceData[];
  viewSplat: string;
  viewSplatFileId: string;
  devices: Device[];
  loading: boolean;

  fetchRooms: (homeId: string) => Promise<void>;
  createRoom: (homeId: string, roomData: { roomName: string }) => Promise<void>;
  deleteRoom: (homeId: string, roomId: string) => Promise<void>;
  updateRoom: (roomId: string, roomData: UpdateRoomData) => Promise<void>;
  fetchRoom: (roomId: string) => Promise<void>;
  fetchRoomSplat: (roomId: string) => Promise<void>;

  fetchDevicesOfRoom: (homeId: string, roomId: string) => Promise<void>;
  connectDevice: (homeId: string, roomId: string, deviceId: string) => Promise<void>;
  disconnectDevice: (homeId: string, roomId: string, deviceId: string) => Promise<void>;

  cleanSplat: () => void;
}

export const useRoomStore = create<RoomsState>((set, get) => ({
  rooms: [],
  viewDevices: [],
  viewSplat: '',
  viewSplatFileId: '',
  devices: [],
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
      await roomService.deleteRoom(homeId, roomId);
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

  updateRoom: async (roomId: string, roomData: UpdateRoomData) => {
    try {
      await roomService.updateRoom(roomId, roomData);
      get().fetchRoom(roomId);
    } catch (err) {
      console.error(err);
    }
  },

  fetchRoom: async (roomId: string) => {
    set({ loading: true });
    try {
      const response = await roomService.getRoom(roomId);
      if (response.room.viewDevices) {
        set({ viewDevices: response.room.viewDevices });
      } else {
        set({ viewDevices: [] });
      }
      if (response.room.viewSplatFileId) {
        set({ viewSplatFileId: response.room.viewSplatFileId });
      } else {
        set({ viewSplatFileId: '' });
      }
      if (response.room.devices) {
        set({ devices: response.room.devices });
      } else {
        set({ devices: [] });
      }
      set({ loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
  fetchRoomSplat: async (roomId: string) => {
    set({ loading: true });
    try {
      const response = await roomService.getRoomSplat(roomId);
      if (response.splatUrl) {
        set({ viewSplat: response.splatUrl, loading: false });
      } else {
        set({ viewSplat: '', loading: false });
      }
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
  cleanSplat: () => {
    const currentSplatUrl = useRoomStore.getState().viewSplat;
    if (currentSplatUrl) {
      // Revoke the old blob URL to free up memory
      URL.revokeObjectURL(currentSplatUrl);
    }
    set({ viewSplatFileId: '', viewSplat: '' });
  },
}));
