"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { DeviceReading } from "@/types/sensorsDataTypes"

export const description = "An interactive area chart"

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "#4447efff",
  },
  humidity: {
    label: "Humidity",
    color: "#f6573bff",
  },
  light: {
    label: "Light",
    color: "#fbbf24",
  },
} satisfies ChartConfig

interface ChartAreaInteractiveProps {
  data: DeviceReading[];
}

type TimeRange = '1h' | '24h' | '7d' | '30d' | 'all';
type SensorType = 'temperature' | 'humidity' | 'light';

const timeRangeLabels: Record<TimeRange, string> = {
  '1h': '1 Hour',
  '24h': '24 Hours',
  '7d': '7 Days',
  '30d': '30 Days',
  'all': 'All Time',
};

const getTimeRangeInMs = (range: TimeRange): number | null => {
  switch (range) {
    case '1h': return 60 * 60 * 1000;
    case '24h': return 24 * 60 * 60 * 1000;
    case '7d': return 7 * 24 * 60 * 60 * 1000;
    case '30d': return 30 * 24 * 60 * 60 * 1000;
    case 'all': return null;
  }
};

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const [timeRange, setTimeRange] = React.useState<TimeRange>('24h');
  const [visibleSensors, setVisibleSensors] = React.useState<Record<SensorType, boolean>>({
    temperature: true,
    humidity: true,
    light: true,
  });

  const toggleSensor = (sensor: SensorType) => {
    setVisibleSensors(prev => ({ ...prev, [sensor]: !prev[sensor] }));
  };

  const formattedData = React.useMemo(() => {
    return data.map(reading => ({
      date: reading.createdAt,
      temperature: reading.sensorsData.temperature,
      humidity: reading.sensorsData.humidity,
      light: reading.sensorsData.light,
    }));
  }, [data]);

  const filteredData = React.useMemo(() => {
    const rangeMs = getTimeRangeInMs(timeRange);
    if (rangeMs === null) return formattedData;

    const now = Date.now();
    const cutoffTime = now - rangeMs;

    return formattedData.filter(item => {
      const itemTime = new Date(item.date).getTime();
      return itemTime >= cutoffTime;
    });
  }, [formattedData, timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-0.5 px-4 py-3 sm:px-6 sm:py-3">
          <CardTitle>Sensor Data</CardTitle>
          <CardDescription>
            <div className="flex gap-3 mt-1">
              {(['temperature', 'humidity', 'light'] as SensorType[]).map((sensor) => (
                <button
                  key={sensor}
                  onClick={() => toggleSensor(sensor)}
                  className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-80"
                  style={{ opacity: visibleSensors[sensor] ? 1 : 0.4 }}
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: chartConfig[sensor].color }}
                  />
                  <span className="capitalize">{sensor}</span>
                </button>
              ))}
            </div>
          </CardDescription>
        </div>
        <div className="flex">
          {(['1h', '24h', '7d', '30d', 'all'] as TimeRange[]).map((range) => (
            <button
              key={range}
              data-active={timeRange === range}
              className="relative z-30 flex flex-1 flex-col justify-center gap-0.5 border-t px-2 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-3 sm:py-3"
              onClick={() => setTimeRange(range)}
            >
              <span className="text-xs text-muted-foreground">
                {timeRangeLabels[range]}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-temperature)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-temperature)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillHumidity" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-humidity)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-humidity)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillLight" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-light)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-light)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric"
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric"
                    })
                  }}
                  indicator="dot"
                  valueFormatter={(value, item) => {
                    if (item.dataKey === "temperature") return `${value}°C`
                    if (item.dataKey === "humidity") return `${value}%`
                    if (item.dataKey === "light") return `${value}`
                    return value
                  }}
                />
              }
            />
            {visibleSensors.temperature && (
              <Area
                dataKey="temperature"
                type="natural"
                fill="url(#fillTemperature)"
                stroke="var(--color-temperature)"
              />
            )}
            {visibleSensors.humidity && (
              <Area
                dataKey="humidity"
                type="natural"
                fill="url(#fillHumidity)"
                stroke="var(--color-humidity)"
              />
            )}
            {visibleSensors.light && (
              <Area
                dataKey="light"
                type="natural"
                fill="url(#fillLight)"
                stroke="var(--color-light)"
              />
            )}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
