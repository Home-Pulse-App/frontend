import type { LoginCredentials, LoginResponse } from '@/types/api-services';
import { useAuthStore } from '../store/authStore';
import { API_BASE_URL } from './apiServices';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include', // Important for receiving HttpOnly cookie
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Login failed');
    }
    const data = await response.json();
    // Save access token in memory only
    if (data.ResponseData.token) {
      useAuthStore.getState().setAccessToken(data.ResponseData.token);
      useAuthStore.getState().setUserName(data.ResponseData.user);
    }

    return data;
  },
  async refreshToken(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // Sends refresh token cookie
      });

      if (!response.ok) return false;

      const data = await response.json();
      if (data.token) {
        useAuthStore.getState().setAccessToken(data.token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
  logout(): void {
    useAuthStore.getState().logout();
  },
  getToken(): string | null {
    return useAuthStore.getState().accessToken;
  },

  isAuthenticated(): boolean {
    return !!useAuthStore.getState().accessToken;
  },
};