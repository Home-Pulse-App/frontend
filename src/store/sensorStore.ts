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
    loading: boolean;
    fetchPaginatedData: (deviceIdOrName: string, params?: PaginationParams) => Promise<void>;
    fetchStatsData: (deviceIdOrName: string, field: SensorType, period?: Period) => Promise<void>;
    fetchLatestData: (deviceIdOrName: string) => Promise<void>;
}

export const useDeviceDataStore = create<SensorState>((set) => ({
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
    loading: false,

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
