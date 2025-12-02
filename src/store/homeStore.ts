import { create } from 'zustand';
import type { Home } from '../types';
import { homeService } from '../services/homeService';

interface HomesState {
  homes: Home[];
  loading: boolean;
  fetchHomes: () => Promise<void>;
  createHome: (homeData: { homeName: string }) => Promise<void>;
  getSingleHome: (homeId: string) => Promise<Home | undefined>;
  deleteHome: (homeId: string) => Promise<void>;
}

export const useHomesStore = create<HomesState>((set) => ({
  homes: [],
  loading: false,

  fetchHomes: async () => {
    set({ loading: true });
    try {
      const response = await homeService.getAll();
      set({ homes: response.homes, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  createHome: async (homeData) => {
    try {
      const response = await homeService.create(homeData);
      set((state) => ({ homes: [...state.homes, response.home] }));
    } catch (err) {
      console.error(err);
    }
  },

  getSingleHome: async (homeId) => {
    try {
      const response = await homeService.getById(homeId);
      return response.home;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  },

  deleteHome: async (homeId: string) => {
    try {
      await homeService.delete(homeId);
      set((state) => ({ homes: state.homes.filter((h) => h._id !== homeId) }));
    } catch (err) {
      console.error(err);
    }
  },
}));
