import Navbar from '@/components/Navbar';
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { useHomeStore } from "@/store/homeStore"
import { useRoomStore } from "@/store/roomStore"
import { useDeviceStore } from "@/store/deviceStore"
import { useDeviceDataStore } from "@/store/sensorStore"
import { mockDeviceReadings } from "@/store/mockDeviceData"
// import { useEffect } from "react"
import { SensorStatsCards } from "@/components/sensor-stats-cards"
import { calculateSensorStats } from "@/lib/sensorStats"
import { useEffect, useMemo } from "react"

export default function DashboardPage() {
  const { homes, fetchHomes } = useHomeStore();
  const { rooms, fetchRooms } = useRoomStore();
  const { devices, fetchDevices } = useDeviceStore();
  // const { paginatedData, fetchPaginatedData } = useDeviceDataStore();
  const { fetchPaginatedData } = useDeviceDataStore();

  // Calculate sensor stats from mock data
  const sensorStats = useMemo(() => calculateSensorStats(mockDeviceReadings), []);

  useEffect(() => {
    fetchHomes();
  }, []);

  useEffect(() => {
    homes.forEach(home => {
      fetchRooms(home._id);
    });
  }, [homes]);

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    devices.forEach(device => {
      fetchPaginatedData(device._id);
    });
  }, [devices]);

  return (
    <div className='relative flex min-h-screen flex-col w-full overflow-auto [scrollbar-width:none]'>
      <Navbar />
      <div className="@container/main flex flex-1 flex-col pt-16 gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards
            totalHomes={homes.length}
            totalRooms={rooms.length}
            totalDevices={devices.length}
          />
          <div className="px-4 lg:px-6">
            <DataTable data={devices} />
            {/* <ChartAreaInteractive data={paginatedData} /> */}
            <ChartAreaInteractive data={mockDeviceReadings} />
          </div>
          <SensorStatsCards
            temperature={sensorStats.temperature}
            humidity={sensorStats.humidity}
            light={sensorStats.light}
          />
        </div>
      </div>
    </div>
  )
}
