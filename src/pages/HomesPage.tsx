import { useState, useEffect } from 'react';
import HomeCard from '@/components/HomeCard';
import { useHomeStore } from '@/store/homeStore';
import Navbar from '@/components/Navbar';
import CreateModal from '@/components/CreateModal';
import type { Home } from '@/types/homes-types';

export default function HomesPage() {
  const { homes, fetchHomes, createHome, deleteHome, loading } = useHomeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchHomes();
  }, []);

  function onCreate(homeName: string) {
    createHome({ homeName });
  }

  if (loading) return <p>Loading homes...</p>;

  return (
    <div className='relative flex min-h-screen flex-col w-full'>
      <Navbar />

      <div className='w-7xl mx-auto pt-20'>
        <div className='flex items-center justify-between pt-10 py-4 border-b'>
          <h2 className='text-3xl font-semibold'>Homes</h2>
          <button
            className='bg-black hover:bg-[#2E2E2E] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition'
            onClick={() => setIsModalOpen(true)}
          >
            Create a Home
          </button>
        </div>

        <div className='py-10'>
          {homes.length === 0 ? (
            <div className='text-center text-gray-500'>
              <p>You don't have any home yet!</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
              {homes.map((home: Home) => (
                <HomeCard key={home._id} home={home} onDelete={deleteHome} />
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={onCreate}
        itemName={'Home'}
      />
    </div>
  );
}
