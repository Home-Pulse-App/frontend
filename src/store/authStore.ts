import { create } from 'zustand';

export interface AuthState {
  accessToken: string | null;
  userName: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
  setUserName: (name: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  userName: null,
  setAccessToken: (token) => set({ accessToken: token }),
  logout: () => {
    set({ accessToken: null });
    set({ userName: null });
  },
  setUserName: (name) => set({ userName: name }),
}));