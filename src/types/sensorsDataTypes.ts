import type { PaginationResponse } from './api-services';

export interface SensorData {
  temperature: number;
  humidity: number;
  light: number;
  switch1: number;
  switch2: number;
  button1: number;
  button2: number;
}
export interface DeviceReading {
  _id: string;
  userId: string;
  deviceId: string;
  sensorsData: SensorData;
  createdAt: string;
  updatedAt: string;
}
export interface DeviceDataResponse {
  device: {
    _id: string;
    deviceName: string;
    type: string;
  };
  readings: DeviceReading[];
  pagination: PaginationResponse;
}
export interface PostDeviceDataPayload {
  sensor: string;
  value: string | number | boolean;
  qos?: 0 | 1 | 2;
}
export interface DeviceStats {
  average: number;
  minimum: number;
  maximum: number;
  count: number;
  latest: number;
}
export interface DeviceStatsResponse {
  device: {
    _id: string;
    deviceName: string;
    type: string;
  };
  field: string;
  period: string;
  stats: DeviceStats;
  dateRange: {
    start: string;
    end: string;
  };
}