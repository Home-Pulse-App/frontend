export interface Home {
  _id: string;
  homeName: string;
  userId: string;
  rooms: Room[];
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  _id: string;
  roomName: string;
  homeId: string;
  devices: Device[];
  createdAt: string;
  updatedAt: string;
}

export interface Device {
  _id: string;
  deviceName: string;
  type: string;
  state: 'on' | 'off';
  roomId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
