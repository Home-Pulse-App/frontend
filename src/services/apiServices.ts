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

  async getBlob(endpoint: string): Promise<Blob | null> {
    const { accessToken } = useAuthStore.getState();

    const headers = new Headers();

    // Only add Bearer token if we have one
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    const config: RequestInit = {
      method: 'GET',
      headers,
      credentials: 'include',
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
      return this.getBlob(endpoint);
    }

    if (response.status === 404) {
      // No file exists
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.blob();
  }
}

// Create singleton instance
const apiClient = new ApiClient(API_BASE_URL);

// Export API Client for advanced usage
export { apiClient, API_BASE_URL };