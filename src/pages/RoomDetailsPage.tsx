import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useRoomStore } from '@/store/roomStore';
import { useHomeStore } from '@/store/homeStore';
import { useEffect, useState } from 'react';
import type { Home } from '@/types/homes-types';
import type { Room } from '@/types/room-types';
import type { Device } from '@/types/devices-types';

export default function RoomDetailsPage() {
  const { homeId, roomId } = useParams<{ homeId: string; roomId: string }>();
  const { rooms, fetchRooms, fetchDevices, devices } = useRoomStore();
  const { getSingleHome } = useHomeStore();
  const [home, setHome] = useState<Home | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (homeId) {
      getSingleHome(homeId).then((res) => setHome(res || null));
    }
  }, [homeId, getSingleHome]);

  useEffect(() => {
    if (home) {
      fetchRooms(home._id).then(() => {
        const foundRoom = rooms.find((r) => r._id === roomId) || null;
        setRoom(foundRoom);
        if (foundRoom) {
          fetchDevices(home._id, foundRoom._id);
        }
        setLoading(false);
      });
    }
  }, [home, rooms, roomId, fetchRooms, fetchDevices]);

  if (loading) return <p className='mt-20'>Loading room...</p>;
  if (!home || !room) return <p className='mt-20'>Room not found</p>;

  const roomDevices: Device[] = devices[room._id] || [];

  return (
    <div className='relative flex min-h-screen flex-col w-full'>
      <Navbar />

      <div className='w-7xl mx-auto pt-20'>
        <div className='flex items-center justify-between pt-10 py-4 border-b'>
          <div>
            <h2 className='text-2xl font-semibold'>{room.roomName}</h2>
          </div>

          <button
            className='bg-black hover:bg-[#2E2E2E] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition'
            onClick={() => alert('Connect Device modal!')}
          >
            Connect Device
          </button>
        </div>

        <div className='py-10'>
          {roomDevices.length === 0 ? (
            <div className='text-center text-gray-500'>
              <p>You don't have any connected device yet!</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
              {roomDevices.map((device) => (
                <div
                  key={device._id}
                  className='border rounded-lg p-4 shadow hover:shadow-lg transition'
                >
                  <h4 className='font-semibold'>{device.deviceName}</h4>
                  <p className='text-gray-600'>Type: {device.type}</p>
                  <p className='text-gray-600'>State: {device.state}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
