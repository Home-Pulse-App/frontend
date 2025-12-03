import { create } from 'zustand';
import type { DeviceStats, SensorData, DeviceReading } from '@/types/sensorsDataTypes';
import type { PaginationParams } from '@/types/api-services';
import { deviceDataService } from '@/services/deviceDataService';
import type { SensorType } from '@/types/devices-types';

type Period =
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | undefined;

interface SensorState {
  paginatedData: DeviceReading[];
  statsData: DeviceStats[];
  latestData: SensorData;
  selectedDeviceId: string | null;
  loading: boolean;
  fetchPaginatedData: (deviceIdOrName: string, params?: PaginationParams) => Promise<void>;
  fetchStatsData: (deviceIdOrName: string, field: SensorType, period?: Period) => Promise<void>;
  fetchLatestData: (deviceIdOrName: string) => Promise<void>;
  clearPaginatedData: () => void;
  setSelectedDevice: (deviceId: string) => void;
}

export const useDeviceDataStore = create<SensorState>((set, get) => ({
  paginatedData: [],
  statsData: [],
  latestData: {
    temperature: 0,
    humidity: 0,
    light: 0,
    switch1: 0,
    switch2: 0,
    button1: 0,
    button2: 0,
  },
  selectedDeviceId: null,
  loading: false,

  clearPaginatedData: () => {
    set({ paginatedData: [] });
  },

  setSelectedDevice: (deviceId: string) => {
    const currentDeviceId = get().selectedDeviceId;
    if (currentDeviceId !== deviceId) {
      set({ selectedDeviceId: deviceId, paginatedData: [] });
    }
  },

  fetchPaginatedData: async (deviceIdOrName: string, params?: PaginationParams) => {
    set({ loading: true });
    try {
      const response = await deviceDataService.getData(deviceIdOrName, params);
      set((state) => ({ paginatedData: [...state.paginatedData, ...response.data.readings], loading: false }));
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  fetchStatsData: async (deviceIdOrName: string, field: SensorType, period?: Period) => {
    set({ loading: true });
    try {
      const actualPeriod = period ?? 'day';
      const response = await deviceDataService.getStats(deviceIdOrName, field, actualPeriod);
      set((state) => ({ statsData: [...state.statsData, response.data.stats], loading: false }));
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  fetchLatestData: async (deviceIdOrName: string) => {
    set({ loading: true });
    try {
      const response = await deviceDataService.getLatest(deviceIdOrName);
      set({ latestData: response.data.latest.sensorsData, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
}));
