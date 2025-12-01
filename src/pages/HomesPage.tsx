import { useState, useEffect } from 'react';
import HomeCard from '@/components/HomeCard';
import { useHomesStore } from '@/store/homeStore';
import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import HomePulseLogo from '@/assets/HomePulseLogo.png';
import CreateHomeModal from '@/components/CreateHomeModal';

export default function HomesPage() {
  const { homes, fetchHomes, createHome, loading } = useHomesStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchHomes();
  }, []);

  function handleCreateHome(homeName: string) {
    createHome({ homeName });
  }

  if (loading) return <p>Loading homes...</p>;

  return (
    <div className="relative flex min-h-screen flex-col w-full">
      <Navbar01
        logo={<img src={HomePulseLogo} alt="HomePulse Logo" className="h-15 w-auto" />}
        logoHref="/"
        navigationLinks={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Homes', href: '/homes' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'About', href: '/about' },
        ]}
      />

      <div className="w-7xl mx-auto">
        <div className="flex items-center justify-between pt-10 py-4 border-b">
          <h2 className="text-3xl font-semibold">Homes</h2>
          <button
            className="bg-black hover:bg-[#2E2E2E] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
            onClick={() => setIsModalOpen(true)}>
            Create a Home
          </button>
        </div>

        <div className="py-10">
          {homes.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>You don't have any home yet!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {homes.map((home) => (
                <HomeCard key={home._id} home={home} />
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateHomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateHome}
      />
    </div>
  );
}
