import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useRoomStore } from '@/store/roomStore';
import { useHomeStore } from '@/store/homeStore';
import { useDeviceStore } from '@/store/deviceStore';
import { useEffect, useState } from 'react';

import ConnectDeviceModal from '@/components/ConnectDeviceModal';

import type { Home } from '@/types/homes-types';
import type { Room } from '@/types/room-types';
import type { Device } from '@/types/devices-types';

export default function RoomDetailsPage() {
  const { homeId, roomId } = useParams<{ homeId: string; roomId: string }>();

  const { rooms, fetchRooms, fetchDevicesOfRoom, devices, connectDevice, disconnectDevice } =
    useRoomStore();
  const { getSingleHome } = useHomeStore();
  const { devices: allDevices, fetchDevices } = useDeviceStore();

  const [home, setHome] = useState<Home | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [localDevices, setLocalDevices] = useState<Device[]>([]);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  useEffect(() => {
    if (homeId) {
      getSingleHome(homeId).then((res) => setHome(res || null));
    }
  }, [homeId, getSingleHome]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  useEffect(() => {
    if (home?._id) {
      fetchRooms(home._id).then(() => {
        setLoading(false);
      });
    }
  }, [home?._id, fetchRooms]);

  useEffect(() => {
    if (rooms.length > 0 && roomId && home?._id) {
      const foundRoom = rooms.find((r) => r._id === roomId) || null;
      setRoom(foundRoom);

      if (foundRoom) {
        fetchDevicesOfRoom(home._id, foundRoom._id);
      }
    }
  }, [rooms, roomId, home?._id, fetchRooms, fetchDevicesOfRoom]);

  useEffect(() => {
    if (roomId && devices[roomId]) {
      setLocalDevices(devices[roomId]);
    }
  }, [devices, roomId]);

  if (loading) return <p className='mt-20'>Loading room...</p>;
  if (!home || !room) return <p className='mt-20'>Room not found</p>;

  const roomDevices: Device[] = localDevices;

  const toggleDeviceState = (deviceId: string) => {
    setLocalDevices((prev) =>
      prev.map((d) =>
        d._id === deviceId
          ? { ...d, state: d.state === 'ONLINE' ? 'OFFLINE' : 'ONLINE' }
          : d,
      ),
    );
  };

  const handleConnectDevice = async (deviceId: string) => {
    if (!home || !room) return;

    await connectDevice(home._id, room._id, deviceId);

    await fetchDevices();

    setIsConnectModalOpen(false);
  };

  const handleDisconnectDevice = async (deviceId: string) => {
    if (!home || !room) return;

    try {
      await disconnectDevice(home._id, room._id, deviceId);

      await fetchDevices();
    } catch (error) {
      console.error('Failed to disconnect device:', error);
    }
  };

  return (
    <div className='relative flex min-h-screen flex-col w-full'>
      <Navbar />

      <div className='w-7xl mx-auto pt-20'>
        <div className='flex items-center justify-between pt-10 py-4 border-b'>
          <h2 className='text-2xl font-semibold'>{room.roomName}</h2>

          <button
            className='bg-black hover:bg-[#2E2E2E] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition'
            onClick={() => setIsConnectModalOpen(true)}
          >
            Connect Device
          </button>
        </div>

        <div className='py-10'>
          {roomDevices.length === 0 ? (
            <div className='text-center text-gray-500'>
              <p>You don't have any device yet!</p>
            </div>
          ) : (
            <div className='w-full bg-white rounded-xl shadow p-4'>
              <div className='grid grid-cols-4 px-2 py-3 font-semibold text-gray-600 border-b'>
                <div>Name</div>
                <div>Type</div>
                <div>Status</div>
                <div className='text-right'>Actions</div>
              </div>

              {roomDevices.map((device) => (
                <div
                  key={device._id}
                  className='relative grid grid-cols-4 px-2 py-4 items-center border-b last:border-none hover:bg-gray-50'
                >
                  <div>{device.deviceName}</div>
                  <div>{device.type}</div>
                  <div>
                    {device.state === 'ONLINE' ? (
                      <span className='text-green-600 font-medium'>On</span>
                    ) : (
                      <span className='text-red-500 font-medium'>Off</span>
                    )}
                  </div>

                  <div className='text-right flex justify-end gap-2'>
                    <button
                      className={`px-3 py-1 rounded-md font-medium ${device.state === 'ONLINE' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                      onClick={() => toggleDeviceState(device._id)}
                    >
                      {device.state === 'ONLINE' ? 'Turn Off' : 'Turn On'}
                    </button>

                    <button
                      className='px-3 py-1 rounded-md font-medium bg-gray-200 hover:bg-gray-300 text-gray-700'
                      onClick={() => handleDisconnectDevice(device._id)}
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConnectDeviceModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        devices={allDevices}
        onConnect={handleConnectDevice}
      />
    </div>
  );
}
