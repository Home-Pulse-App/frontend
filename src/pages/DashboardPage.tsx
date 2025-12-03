import Navbar from '@/components/Navbar';
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { useHomeStore } from "@/store/homeStore"
import { useRoomStore } from "@/store/roomStore"
import { useDeviceStore } from "@/store/deviceStore"
import { useDeviceDataStore } from "@/store/sensorStore"
import { SensorStatsCards } from "@/components/sensor-stats-cards"
import { useEffect } from "react"
import { mockDeviceReadings } from "@/store/mockDeviceData"

export default function DashboardPage() {
  const { homes, fetchHomes } = useHomeStore();
  const { rooms, fetchRooms } = useRoomStore();
  const { devices, fetchDevices } = useDeviceStore();
  const { paginatedData, fetchPaginatedData, latestData, fetchLatestData, setSelectedDevice, selectedDeviceId } = useDeviceDataStore();

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
    // Initialize with first device if available
    if (devices.length > 0 && !selectedDeviceId) {
      const firstDevice = devices[0];
      setSelectedDevice(firstDevice._id);
      fetchPaginatedData(firstDevice._id, { limit: 1000 });
      fetchLatestData(firstDevice._id);
    }
  }, [devices, selectedDeviceId]);

  useEffect(() => {
    // Set up interval to fetch latest data for selected device
    if (selectedDeviceId) {
      const interval = setInterval(() => {
        fetchLatestData(selectedDeviceId);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [selectedDeviceId]);

  const handleDeviceSelect = (device: any) => {
    console.log('Selected device:', device);
    // Update selected device and fetch its data
    setSelectedDevice(device._id);
    fetchPaginatedData(device._id, { limit: 10000 });
    fetchLatestData(device._id);
  };

  // Use mock data if device is 'mock-device-1'
  const displayData = selectedDeviceId === 'mock-device-1' ? mockDeviceReadings : paginatedData;

  return (
    <div className='relative flex min-h-screen flex-col w-full overflow-auto [scrollbar-width:none]'>
      <Navbar />
      <div className='@container/main flex flex-1 flex-col pt-16 gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <SectionCards
            totalHomes={homes.length}
            totalRooms={rooms.length}
            totalDevices={devices.length}
          />
          <div className='px-4 lg:px-6'>
            <DataTable data={devices} onRowClick={handleDeviceSelect} />
            <ChartAreaInteractive data={displayData} />
          </div>
          <SensorStatsCards
            temperature={latestData}
            humidity={latestData}
            light={latestData}
            switch1={latestData}
          />
        </div>
      </div>
    </div>
  );
}
