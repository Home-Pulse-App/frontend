export interface CreateDeviceData {
  deviceName: string;
  type: 'esp32-generic' | 'raspberry-pi';
  sensors: SensorType[];
}
export type SensorType =
  | 'temperature'
  | 'humidity'
  | 'pressure'
  | 'light'
  | 'motion'
  | 'door'
  | 'window'
  | 'soilMoisture'
  | 'airQuality'
  | 'co2'
  | 'pm25'
  | 'switch1'
  | 'switch2'
  | 'switch3'
  | 'switch4'
  | 'power'
  | 'voltage'
  | 'current';
export interface Device {
  _id: string;
  deviceName: string;
  type: string;
  state: string;
  connectedToRoom?: string | null;
  sensors: SensorType[];
  roomId?: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
