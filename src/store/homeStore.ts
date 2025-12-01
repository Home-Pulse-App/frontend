import { create } from 'zustand';
import type { Home } from '../types';
import * as HomesService from '../services/home.service';

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
      const homes = await HomesService.fetchHomes();
      set({ homes, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  createHome: async (homeData) => {
    try {
      const home = await HomesService.createHome(homeData);
      set((state) => ({ homes: [...state.homes, home] }));
    } catch (err) {
      console.error(err);
    }
  },

  getSingleHome: async (homeId) => {
    try {
      const home = await HomesService.getSingleHome(homeId);
      return home;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  },

  deleteHome: async (homeId) => {
    try {
      await HomesService.deleteHome(homeId);
      set((state) => ({ homes: state.homes.filter((h) => h._id !== homeId) }));
    } catch (err) {
      console.error(err);
    }
  },
}));
