import type { DeviceReading } from '@/types/sensorsDataTypes';

const generateMockData = (): DeviceReading[] => {
  const readings: DeviceReading[] = [];
  const now = Date.now();

  // Generate data with varying intervals:
  // - Last hour: every 5 minutes (12 points)
  // - Last 24 hours: every 30 minutes (48 points)
  // - Older: every hour (up to 7 days)

  const intervals = [
    { count: 12, intervalMs: 5 * 60 * 1000 }, // Last hour: 5 min intervals
    { count: 46, intervalMs: 30 * 60 * 1000 }, // Next 23 hours: 30 min intervals
    { count: 144, intervalMs: 60 * 60 * 1000 }, // Next 6 days: 1 hour intervals
  ];

  let currentTime = now;
  let pointId = 0;

  for (const { count, intervalMs } of intervals) {
    for (let i = 0; i < count; i++) {
      // Generate spikey data
      const tempBase = 22;
      const tempNoise = (Math.random() - 0.5) * 10;
      const temperature = Number((tempBase + tempNoise).toFixed(1));

      const humidityBase = 45;
      const humidityNoise = (Math.random() - 0.5) * 30;
      const humidity = Math.floor(humidityBase + humidityNoise);

      const date = new Date(currentTime);
      const hour = date.getHours();
      let light = 0;
      if (hour > 6 && hour < 18) {
        light = 80 + Math.random() * 20;
      } else {
        light = 10 + Math.random() * 10;
      }

      readings.unshift({
        _id: `mock-${pointId++}`,
        userId: 'user1',
        deviceId: 'mock-device-1',
        sensorsData: {
          temperature,
          humidity: Math.max(0, Math.min(100, humidity)),
          light: Math.floor(light),
          switch1: Math.random() > 0.9 ? 1 : 0,
          switch2: 0,
          button1: 0,
          button2: 0,
        },
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      });

      currentTime -= intervalMs;
    }
  }

  return readings;
};

export const mockDeviceReadings: DeviceReading[] = generateMockData();
