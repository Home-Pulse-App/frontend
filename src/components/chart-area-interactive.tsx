'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { DeviceReading } from '@/types/sensorsDataTypes';

export const description = 'An interactive area chart';

const chartConfig = {
  temperature: {
    label: 'Temperature',
    color: 'hsl(var(--chart-1))',
  },
  humidity: {
    label: 'Humidity',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

interface ChartAreaInteractiveProps {
  data: DeviceReading[];
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const formattedData = React.useMemo(() => {
    return data.map(reading => ({
      date: reading.createdAt,
      temperature: reading.sensorsData.temperature,
      humidity: reading.sensorsData.humidity,
    }));
  }, [data]);

  const filteredData = formattedData;

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Sensor Data</CardTitle>
        <CardDescription>
          Temperature & Humidity
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id='fillTemperature' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-temperature)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-temperature)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillHumidity' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-humidity)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-humidity)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    });
                  }}
                  indicator='dot'
                />
              }
            />
            <Area
              dataKey='humidity'
              type='natural'
              fill='url(#fillHumidity)'
              stroke='var(--color-humidity)'
              stackId='a'
            />
            <Area
              dataKey='temperature'
              type='natural'
              fill='url(#fillTemperature)'
              stroke='var(--color-temperature)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
