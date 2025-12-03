import { IconTemperature, IconDroplet, IconSun } from '@tabler/icons-react';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { SensorData } from '@/types/sensorsDataTypes';

interface SensorStatsCardsProps {
  temperature: SensorData;
  humidity: SensorData;
  light: SensorData;
  switch1: SensorData;
}

export function SensorStatsCards({ temperature, humidity, light, switch1 }: SensorStatsCardsProps) {
  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @3xl/main:grid-cols-4'>
      <Card className='@container/card'>
        <CardHeader className='text-center items-center'>
          <CardDescription>Temperature</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {temperature.temperature}°C
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-center gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Current <IconTemperature className='size-4' />
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader className='text-center items-center'>
          <CardDescription>Humidity</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {humidity.humidity}%
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-center gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Current <IconDroplet className='size-4' />
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader className='text-center items-center'>
          <CardDescription>Light Level</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {light.light}
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-center gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Current <IconSun className='size-4' />
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader className='text-center items-center'>
          <CardDescription>Switch 1</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {switch1.switch1}
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-center gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Current <IconSun className='size-4' />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
