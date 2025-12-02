import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Room } from '@/types/room-types';

interface RoomCardProps {
  room: Room;
  homeId: string;
  onDelete: (id: string) => void;
}

export default function RoomCard({ room, homeId, onDelete }: RoomCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleDelete() {
    onDelete(room._id);
    setMenuOpen(false);
  }

  function handleCardClick() {
    navigate(`/homes/${homeId}/rooms/${room._id}`);
  }

  return (
    <div
      onClick={handleCardClick}
      className='border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer relative'
    >
      <div className='flex justify-between items-start'>
        <h2 className='text-xl font-semibold mb-2'>{room.roomName}</h2>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          className='p-1 text-xl font-bold hover:bg-gray-200 rounded'
        >
          ⋮
        </button>

        {menuOpen && (
          <div
            ref={menuRef}
            className='absolute right-4 top-11 bg-white border rounded-md shadow-md p-2 z-10'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='text-red-600 hover:bg-red-100 w-full text-left px-2 py-1 rounded-md'
              onClick={handleDelete}
            >
              Delete room
            </button>
          </div>
        )}
      </div>
      <p className='text-gray-600'>Devices: {room.devices ? room.devices.length : 0}</p>
    </div>
  );
}
