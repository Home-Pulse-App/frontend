import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useRoomStore } from '@/store/roomStore';
import { useHomeStore } from '@/store/homeStore';
import { useEffect, useState } from 'react';
import type { Home } from '@/types/homes-types';
import type { Room } from '@/types/room-types';
import RoomCard from '../components/RoomCard';
import CreateHomeModal from '@/components/CreateModal';

export default function HomeDetailsPage() {
  const { rooms, fetchRooms, createRoom, deleteRoom } = useRoomStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { getSingleHome } = useHomeStore();
  const [home, setHome] = useState<Home | null>(null);

  useEffect(() => {
    if (id) {
      getSingleHome(id).then((res) => setHome(res || null));
    }
  }, [id, getSingleHome]);

  useEffect(() => {
    if (home) fetchRooms(home._id);
  }, [home, fetchRooms]);

  function onCreate(roomName: string) {
    if (!home) return;
    createRoom(home._id, { roomName });
  }

  if (!home) return <p className='mt-20'>Loading home...</p>;

  return (
    <div className='relative flex min-h-screen flex-col w-full'>
      <Navbar />

      <div className='w-7xl mx-auto pt-20'>
        <div className='flex items-center justify-between pt-10 py-4 border-b'>
          <h2 className='text-3xl font-semibold'>{home.homeName}</h2>
          <button
            className='bg-black hover:bg-[#2E2E2E] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition'
            onClick={() => setIsModalOpen(true)}
          >
            Create a Room
          </button>
        </div>

        <div className='py-10'>
          {rooms.length === 0 ? (
            <div className='text-center text-gray-500'>
              <p>You don't have any room yet!</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
              {rooms.map((room: Room) => (
                <RoomCard
                  key={room._id}
                  room={room}
                  homeId={home._id}
                  onDelete={(roomId) => deleteRoom(home._id, roomId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateHomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={onCreate}
        itemName={'Room'}
      />
    </div>
  );
}
