import { useAuthStore } from '../store/authStore';
import { authService } from './authService';

const API_BASE_URL = '/api';

// HTTP Client Utility
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const { accessToken } = useAuthStore.getState();

    const headers = new Headers({
      'Content-Type': 'application/json',
      ...options.headers,
    });

    // Only add Bearer token if we have one
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include', // CRITICAL: Send HttpOnly cookies
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, config);

    // Handle 401 → token expired → try to refresh
    if (response.status === 401) {
      const refreshed = await authService.refreshToken();
      if (!refreshed) {
        authService.logout();
        throw new Error('Session expired. Please log in again.');
      }
      // Retry original request with new token
      return this.request<T>(endpoint, options);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
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
// Export API Client for advanced usage
export { apiClient, API_BASE_URL };

// Usage Examples
/*
 Example 1: Login
try {
  const response = await authService.login({
    email: 'test@example.com',
    password: 'secret123'
  });
  console.log('Logged in, token:', response.token);
} catch (error) {
  console.error('Login failed:', error);
}
 Example 2: Create a home
try {
  const home = await homeService.create({ homeName: 'My Sweet Home' });
  console.log('Home created:', home);
} catch (error) {
  console.error('Failed to create home:', error);
}
Example 3: Get device data with pagination
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
Example 4: Control a device (turn on relay)
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
Example 5: Get device statistics
try {
  const stats = await deviceDataService.getStats('iot1', 'temperature', 'day');
  console.log('Temperature stats:', stats);
} catch (error) {
  console.error('Failed to get stats:', error);
}
*/