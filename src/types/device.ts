import type { SensorData } from './sensorsDataTypes';

export interface DeviceData {
  id: string;
  model: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number; //! Assuming uniform scale for now
  sensorData?: SensorData;
}

export interface UserData {
  splatData: string | null; //* Base64 string
  devices: DeviceData[];
}
