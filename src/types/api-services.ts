// Types & Interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}
export interface PaginationParams {
  limit?: number;
  skip?: number;
  sort?: string;
  startDate?: string;
  endDate?: string;
}
export interface PaginationResponse {
  total: number;
  limit: number;
  skip: number;
  hasMore: boolean;
  page: number;
  totalPages: number;
}
// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
}
export interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

// User Types
export interface CreateUserData {
  userName: string;
  email: string;
  password: string;
}
export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
// Home Types
export interface CreateHomeData {
  homeName: string;
}
export interface Home {
  _id: string;
  homeName: string;
  rooms: string[];
}
// Room Types
export interface CreateRoomData {
  roomName: string;
}
export interface Room {
  _id: string;
  roomName: string;
  homeId: string;
  devices: string[];
}
// Device Types
export interface CreateDeviceData {
  deviceName: string;
  type: 'esp32-generic' | 'raspberry-pi';
  sensors: SensorType[];
}
export type SensorType =
    | 'temperature'
    | 'humidity'
    | 'pressure'
    | 'light'
    | 'motion'
    | 'door'
    | 'window'
    | 'soilMoisture'
    | 'airQuality'
    | 'co2'
    | 'pm25'
    | 'switch1'
    | 'switch2'
    | 'switch3'
    | 'switch4'
    | 'power'
    | 'voltage'
    | 'current';
export interface Device {
  _id: string;
  deviceName: string;
  type: string;
  state: string;
  sensors: SensorType[];
  roomId?: string | null;
}
// Device Data Types
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