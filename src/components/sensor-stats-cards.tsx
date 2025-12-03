import { IconTemperature, IconDroplet, IconSun } from "@tabler/icons-react"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SensorStats {
  current: number;
  min: number;
  max: number;
}

interface SensorStatsCardsProps {
  temperature: SensorStats;
  humidity: SensorStats;
  light: SensorStats;
}

export function SensorStatsCards({ temperature, humidity, light }: SensorStatsCardsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Temperature</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {temperature.current}°C
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Current <IconTemperature className="size-4" />
          </div>
          <div className="text-muted-foreground flex w-full justify-between text-xs">
            <span>Min: {temperature.min}°C</span>
            <span>Max: {temperature.max}°C</span>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Humidity</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {humidity.current}%
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Current <IconDroplet className="size-4" />
          </div>
          <div className="text-muted-foreground flex w-full justify-between text-xs">
            <span>Min: {humidity.min}%</span>
            <span>Max: {humidity.max}%</span>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Light Level</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {light.current}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Current <IconSun className="size-4" />
          </div>
          <div className="text-muted-foreground flex w-full justify-between text-xs">
            <span>Min: {light.min}</span>
            <span>Max: {light.max}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
