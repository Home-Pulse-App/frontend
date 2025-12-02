import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CreateModal from '@/components/CreateModal';
import { useDeviceStore } from '@/store/deviceStore';
import type { Device } from '@/types/devices-types';

export default function DevicePage() {
  const { devices, fetchDevices, createDevice, deleteDevice, loading } = useDeviceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  function onCreate(deviceName: string) {
    createDevice({ deviceName, type: 'esp32-generic', sensors: [] });
  }

  if (loading) return <p>Loading devices...</p>;

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
                  <div>{device.deviceName}</div>

                  <div>{device.roomId || '—'}</div>

                  <div>
                    {device.state === 'on' ? (
                      <span className='text-green-600 font-medium'>Online</span>
                    ) : (
                      <span className='text-red-500 font-medium'>Offline</span>
                    )}
                  </div>

                  <div className='text-right relative'>
                    <button
                      className='p-2 hover:bg-gray-200 rounded-full'
                      onClick={() => setOpenMenuId(openMenuId === device._id ? null : device._id)}
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
