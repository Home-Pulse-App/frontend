import type { Device } from './devices-types';

export interface CreateRoomData {
  roomName: string;
}
export interface Room {
  _id: string;
  roomName: string;
  homeId: string;
  devices: Device[];
  viewDevices: string[];
  viewSplat: string;
  viewSplatFileId: string;
  createdAt: string;
  updatedAt: string;
}
export interface UpdateRoomData {
  viewDevices?: [string];
  viewSplat?: string;
}