import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CreateModal from '@/components/CreateModal';
import { useDeviceStore } from '@/store/deviceStore';
import { useHomeStore } from '@/store/homeStore';
import { roomService } from '@/services/roomService';
import type { Device } from '@/types/devices-types';

export default function DevicePage() {
  const { devices, fetchDevices, createDevice, deleteDevice, loading } = useDeviceStore();

  const { homes, fetchHomes } = useHomeStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [roomNamesMap, setRoomNamesMap] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchDevices();
    fetchHomes();
  }, []);

  useEffect(() => {
    const loadAllRooms = async () => {
      if (!homes || homes.length === 0) return;

      try {
        const promises = homes.map((home) => roomService.getAll(home._id));
        const results = await Promise.all(promises);

        const newMap: Record<string, string> = {};

        results.forEach((res) => {
          if (res.rooms) {
            res.rooms.forEach((room) => {
              newMap[room._id] = room.roomName;
            });
          }
        });

        setRoomNamesMap(newMap);
      } catch (error) {
        console.error('Error loading room names:', error);
      }
    };

    loadAllRooms();
  }, [homes]);

  function onCreate(deviceName: string) {
    createDevice({ deviceName, type: 'esp32-generic', sensors: [] });
  }

  const getRoomName = (device: Device) => {
    const id = device.connectedToRoom || device.roomId;

    if (!id) return '—';

    return roomNamesMap[id] || 'Loading...';
  };

  if (loading) return <p className='mt-20 text-center'>Loading devices...</p>;

  return (
    <div className='relative flex min-h-screen flex-col w-full'>
      <Navbar />

      <div className='w-7xl mx-auto pt-20'>
        <div className='flex items-center justify-between pt-10 py-4 border-b'>
          <h2 className='text-3xl font-semibold'>Devices</h2>
          <button
            className='bg-black hover:bg-[#2E2E2E] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition'
            onClick={() => setIsModalOpen(true)}
          >
            Add a device
          </button>
        </div>

        <div className='py-10'>
          {!devices || devices.length === 0 ? (
            <div className='text-center text-gray-500'>
              <p>You don't have any device yet!</p>
            </div>
          ) : (
            <div className='w-full bg-white rounded-xl shadow p-4'>
              <div className='grid grid-cols-4 px-2 py-3 font-semibold text-gray-600 border-b'>
                <div>Name</div>
                <div>Room</div>
                <div>Status</div>
                <div className='text-right'>Actions</div>
              </div>

              {devices.map((device: Device) => (
                <div
                  key={device._id}
                  className='relative grid grid-cols-4 px-2 py-4 items-center border-b last:border-none hover:bg-gray-50'
                >
                  <div className='font-medium'>{device.deviceName}</div>

                  <div className='text-gray-600 truncate pr-4' title={getRoomName(device)}>
                    {getRoomName(device)}
                  </div>

                  <div>
                    {device.state === 'ONLINE' ? (
                      <span className='text-green-600 font-medium'>Online</span>
                    ) : (
                      <span className='text-red-500 font-medium'>Offline</span>
                    )}
                  </div>

                  <div className='text-right relative'>
                    <button
                      className='p-2 hover:bg-gray-200 rounded-full transition'
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === device._id ? null : device._id);
                      }}
                    >
                      ⋮
                    </button>

                    {openMenuId === device._id && (
                      <div className='absolute right-2 top-8 bg-white border rounded-md shadow-md px-4 py-2 z-10'>
                        <button
                          className='text-red-600 hover:bg-red-100 w-full text-left px-2 py-1 rounded-md'
                          onClick={() => {
                            deleteDevice(device._id);
                            setOpenMenuId(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={onCreate}
        itemName={'Device'}
      />
    </div>
  );
}
