import type { DeviceReading } from '@/types/sensorsDataTypes';

export interface SensorStats {
  current: number;
  min: number;
  max: number;
}

export interface AllSensorStats {
  temperature: SensorStats;
  humidity: SensorStats;
  light: SensorStats;
}

export function calculateSensorStats(readings: DeviceReading[]): AllSensorStats {
  if (readings.length === 0) {
    return {
      temperature: { current: 0, min: 0, max: 0 },
      humidity: { current: 0, min: 0, max: 0 },
      light: { current: 0, min: 0, max: 0 },
    };
  }

  // Get latest reading (assuming sorted by time, most recent last)
  const latest = readings[readings.length - 1];

  // Calculate temperature stats
  const temperatures = readings.map(r => r.sensorsData.temperature);
  const temperatureStats: SensorStats = {
    current: latest.sensorsData.temperature,
    min: Math.min(...temperatures),
    max: Math.max(...temperatures),
  };

  // Calculate humidity stats
  const humidities = readings.map(r => r.sensorsData.humidity);
  const humidityStats: SensorStats = {
    current: latest.sensorsData.humidity,
    min: Math.min(...humidities),
    max: Math.max(...humidities),
  };

  // Calculate light stats
  const lights = readings.map(r => r.sensorsData.light);
  const lightStats: SensorStats = {
    current: latest.sensorsData.light,
    min: Math.min(...lights),
    max: Math.max(...lights),
  };

  return {
    temperature: temperatureStats,
    humidity: humidityStats,
    light: lightStats,
  };
}
