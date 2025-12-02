import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import FileUpload from '../components/FileUpload';
import '../immersiveStyle.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/blocks/footer/Footer';
import { useRoomStore } from '@/store/roomStore';

function ImmersiveViewPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [splatExist, setSplatExist] = useState(false);
  const { fetchRoom, fetchRoomSplat, viewSplatFileId, cleanSplat, loading: roomLoading } = useRoomStore();

  const { roomId } = useParams<{ roomId: string }>();

  const handleLoadSession = async () => {
    if (!roomId) return;

    setLoading(true);
    setError(null);
    try {
      // Fetch the splat file for this specific room
      await fetchRoomSplat(roomId);

      // Get the updated viewSplat from the store
      const { viewSplat } = useRoomStore.getState();

      if (viewSplat) {
        navigate('/viewer', {
          state: {
            file: { url: viewSplat, name: `Room ${roomId} Session`, type: 'splat', size: 0 },
            devices: [], // You might want to pass the room's devices here
          },
        });
      } else {
        setError('No saved session found for this room.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load session.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch room data when component mounts
  useEffect(() => {
    if (roomId) {
      cleanSplat();
      fetchRoom(roomId);
    }
  }, [roomId, fetchRoom, cleanSplat]);

  // Update splatExist when viewSplatFileId changes
  useEffect(() => {
    if (viewSplatFileId) {
      console.log('Splat File ID:', viewSplatFileId);
      setSplatExist(true);
    } else {
      console.log('No Splat File ID');
      setSplatExist(false);
    }
  }, [viewSplatFileId]);

  if (roomLoading) return <p>Loading room...</p>;
  return (
    <div className='relative flex min-h-screen flex-col w-full'>
      <Navbar />
      <main className='flex-1 flex items-center justify-center px-4 py-12'>
        <div className='flex flex-col items-center gap-6'>
          <FileUpload roomId={roomId!} />
          {splatExist && (
            <div className='flex flex-col items-center gap-2'>
              <button
                onClick={handleLoadSession}
                disabled={loading}
                className='bg-black hover:bg-[#2E2E2E] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition disabled:opacity-50'
              >
                {loading ? 'Loading...' : 'Load Previous Session'}
              </button>
              {error && <p className='text-red-400 text-sm'>{error}</p>}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ImmersiveViewPage;