
// API Services for Home Pulse Frontend
// Base configuration and types for the Home Pulse API
// Copy this file to your React frontend project
// Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';
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
    [key: string]: number | boolean | string;
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
// HTTP Client Utility
class ApiClient {
    private baseURL: string;
    private token: string | null = null;
    constructor(baseURL: string) {
        this.baseURL = baseURL;
        // Try to load token from localStorage
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('authToken');
        }
    }
    setToken(token: string | null) {
        this.token = token;
        if (typeof window !== 'undefined') {
            if (token) {
                localStorage.setItem('authToken', token);
            } else {
                localStorage.removeItem('authToken');
            }
        }
    }
    getToken(): string | null {
        return this.token;
    }
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string> || {}),
        } as Record<string, string>;
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        const config: RequestInit = {
            ...options,
            headers,
        };
        const response = await fetch(`${this.baseURL}${endpoint}`, config);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: response.statusText,
            }));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const queryString = params
            ? '?' + new URLSearchParams(params).toString()
            : '';
        return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' });
    }
    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }
    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }
    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}
// Create singleton instance
const apiClient = new ApiClient(API_BASE_URL);
// Auth Service
export const authService = {

    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
        if (response.token) {
            apiClient.setToken(response.token);
        }
        return response;
    },

    logout(): void {
        apiClient.setToken(null);
    },

    getToken(): string | null {
        return apiClient.getToken();
    },

    isAuthenticated(): boolean {
        return !!apiClient.getToken();
    },
};
// User Service
export const userService = {

    async create(userData: CreateUserData): Promise<User> {
        return apiClient.post<User>('/users', userData);
    },

    async update(userData: UpdateUserData): Promise<User> {
        return apiClient.put<User>('/users', userData);
    },

    async delete(): Promise<{ success: boolean; message: string }> {
        return apiClient.delete('/users');
    },
};
// Home Service
export const homeService = {

    async create(homeData: CreateHomeData): Promise<{ message: string; home: Home }> {
        return apiClient.post('/homes', homeData);
    },

    async getAll(): Promise<{ success: boolean; message: string; homes: Home[] }> {
        return apiClient.get('/homes');
    },

    async getById(homeId: string): Promise<{ success: boolean; message: string; home: Home }> {
        return apiClient.get(`/homes/${homeId}`);
    },

    async delete(homeId: string): Promise<{ success: boolean; message: string }> {
        return apiClient.delete(`/homes/${homeId}`);
    },
};
// Room Service
export const roomService = {

    async create(homeId: string, roomData: CreateRoomData): Promise<Room> {
        return apiClient.post(`/homes/${homeId}/rooms`, roomData);
    },

    async getAll(homeId: string): Promise<{ success: boolean; rooms: Room[] }> {
        return apiClient.get(`/homes/${homeId}/rooms`);
    },

    async getDevices(homeId: string, roomId: string): Promise<{ success: boolean; devices: Device[] }> {
        return apiClient.get(`/homes/${homeId}/rooms/${roomId}/devices`);
    },

    async connectDevice(
        homeId: string,
        roomId: string,
        deviceId: string
    ): Promise<{ success: boolean; message: string }> {
        return apiClient.post(`/homes/${homeId}/rooms/${roomId}/connect/${deviceId}`);
    },

    async disconnectDevice(
        homeId: string,
        roomId: string,
        deviceId: string
    ): Promise<{ success: boolean; message: string }> {
        return apiClient.delete(`/homes/${homeId}/rooms/${roomId}/disconnect/${deviceId}`);
    },

    async delete(homeId: string, roomId: string): Promise<{ success: boolean; message: string }> {
        return apiClient.delete(`/homes/${homeId}/rooms/${roomId}`);
    },
};
// Device Service
export const deviceService = {

    async create(deviceData: CreateDeviceData): Promise<{
        success: boolean;
        message: string;
        data: { device: Device };
    }> {
        return apiClient.post('/devices', deviceData);
    },

    async getAll(): Promise<{
        success: boolean;
        message: string;
        devices: Device[];
    }> {
        return apiClient.get('/devices');
    },

    async delete(deviceId: string): Promise<{ success: boolean; message: string }> {
        return apiClient.delete(`/devices/${deviceId}`);
    },
};
// Device Data Service
export const deviceDataService = {

    async getData(
        deviceIdOrName: string,
        params?: PaginationParams
    ): Promise<{ success: boolean; data: DeviceDataResponse }> {
        return apiClient.get(`/device-data/${deviceIdOrName}`, params);
    },

    async postData(
        deviceIdOrName: string,
        payload: PostDeviceDataPayload
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
        period: 'hour' | 'day' | 'week' | 'month' = 'day'
    ): Promise<{ success: boolean; data: DeviceStatsResponse }> {
        return apiClient.get(`/device-data/${deviceIdOrName}/stats`, { field, period });
    },
};
// Export API Client for advanced usage
export { apiClient };

// Usage Examples
/*
// Example 1: Login
try {
  const response = await authService.login({
    email: 'test@example.com',
    password: 'secret123'
  });
  console.log('Logged in, token:', response.token);
} catch (error) {
  console.error('Login failed:', error);
}
// Example 2: Create a home
try {
  const home = await homeService.create({ homeName: 'My Sweet Home' });
  console.log('Home created:', home);
} catch (error) {
  console.error('Failed to create home:', error);
}
// Example 3: Get device data with pagination
try {
  const data = await deviceDataService.getData('iot1', {
    limit: 50,
    skip: 0,
    sort: '-createdAt',
    startDate: '2025-01-01T00:00:00Z',
    endDate: '2025-01-31T23:59:59Z'
  });
  console.log('Device data:', data);
} catch (error) {
  console.error('Failed to fetch device data:', error);
}
// Example 4: Control a device (turn on relay)
try {
  const result = await deviceDataService.postData('iot1', {
    sensor: 'relay',
    value: 'on',
    qos: 1
  });
  console.log('Device controlled:', result);
} catch (error) {
  console.error('Failed to control device:', error);
}
// Example 5: Get device statistics
try {
  const stats = await deviceDataService.getStats('iot1', 'temperature', 'day');
  console.log('Temperature stats:', stats);
} catch (error) {
  console.error('Failed to get stats:', error);
}
*/