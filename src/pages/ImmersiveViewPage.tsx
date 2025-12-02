import { useState } from 'react';
import { useNavigate } from 'react-router';
import FileUpload from '../components/FileUpload';
import { mockServer } from '../services/localDBService';
import '../immersiveStyle.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/blocks/footer/Footer';

function ImmersiveViewPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadSession = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await mockServer.loadUserData();
      if (userData.splatData) {
        // Convert base64 to Blob
        const response = await fetch(userData.splatData);
        const blob = await response.blob();
        const splatUrl = URL.createObjectURL(blob);

        navigate('/viewer', {
          state: {
            file: { url: splatUrl, name: 'Restored Session', type: 'splat', size: blob.size },
            devices: userData.devices,
          },
        });
      } else {
        setError('No saved session found.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative flex min-h-screen flex-col w-full'>
      <Navbar />
      <main className='flex-1 flex items-center justify-center px-4 py-12'>
        <div className='flex flex-col items-center gap-6'>
          <FileUpload />
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
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ImmersiveViewPage;