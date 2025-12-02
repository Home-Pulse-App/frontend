import { create } from 'zustand';
import { deviceService } from '../services/deviceService';
import type { Device, CreateDeviceData } from '@/types/devices-types';

interface DevicesState {
  devices: Device[];
  loading: boolean;

  fetchDevices: () => Promise<void>;
  createDevice: (deviceData: CreateDeviceData) => Promise<void>;
  deleteDevice: (deviceId: string) => Promise<void>;
}

export const useDeviceStore = create<DevicesState>((set) => ({
  devices: [],
  loading: false,

  fetchDevices: async () => {
    set({ loading: true });
    try {
      const response = await deviceService.getAll();
      set({ devices: response.data.devices, loading: false });
    } catch (err) {
      console.error('Error fetching devices:', err);
      set({ loading: false });
    }
  },

  createDevice: async (deviceData: CreateDeviceData) => {
    try {
      const newDevice = await deviceService.create(deviceData);
      set((state) => ({ devices: [...state.devices, newDevice.data.device] }));
    } catch (err) {
      console.error('Error creating device:', err);
    }
  },

  deleteDevice: async (deviceId: string) => {
    try {
      await deviceService.delete(deviceId);
      set((state) => ({
        devices: state.devices.filter((d) => d._id !== deviceId),
      }));
    } catch (err) {
      console.error('Error deleting device:', err);
    }
  },
}));
