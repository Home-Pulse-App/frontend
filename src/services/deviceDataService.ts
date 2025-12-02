import type { PaginationParams } from '@/types/api-services';
import type { DeviceDataResponse, DeviceReading, DeviceStatsResponse, PostDeviceDataPayload } from '@/types/sensorsDataTypes';
import { apiClient } from './apiServices';
import type { SensorType } from '@/types/devices-types';

export const deviceDataService = {

  async getData(
    deviceIdOrName: string,
    params?: PaginationParams,
  ): Promise<{ success: boolean; data: DeviceDataResponse }> {
    return apiClient.get(`/device-data/${deviceIdOrName}`, params);
  },

  async postData(
    deviceIdOrName: string,
    payload: PostDeviceDataPayload,
  ): Promise<{
    success: boolean;
    message: string;
    data: { topic: string; value: string; qos: number };
  }> {
    return apiClient.post(`/device-data/${deviceIdOrName}`, payload);
  },

  async getLatest(deviceIdOrName: string): Promise<{
    success: boolean;
    data: {
      device: { _id: string; deviceName: string; type: string };
      latest: DeviceReading;
    };
  }> {
    return apiClient.get(`/device-data/${deviceIdOrName}/latest`);
  },

  async getStats(
    deviceIdOrName: string,
    field: SensorType,
    period: 'hour' | 'day' | 'week' | 'month' = 'day',
  ): Promise<{ success: boolean; data: DeviceStatsResponse }> {
    return apiClient.get(`/device-data/${deviceIdOrName}/stats`, { field, period });
  },
};

