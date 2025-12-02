import type { Home } from "@/types/homes-types";


interface HomeCardProps {
  home: Home;
}

export default function HomeCard({ home }: HomeCardProps) {
  return (
    <div className='border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer'>
      <h2 className='text-xl font-semibold mb-2'>{home.homeName}</h2>
      <p className='text-gray-600'>Rooms: {home.rooms ? home.rooms.length : 0}</p>
    </div>
  );
}
