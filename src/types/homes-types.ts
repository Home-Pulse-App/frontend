import type { Room } from './room-types';

export interface CreateHomeData {
  homeName: string;
}
export interface Home {
  _id: string;
  homeName: string;
  userId: string;
  rooms: Room[];
  createdAt: string;
  updatedAt: string;
}