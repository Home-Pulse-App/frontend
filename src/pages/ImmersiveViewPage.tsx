import { useState } from 'react';
import { useNavigate } from 'react-router';
import FileUpload from '../components/FileUpload';
import { mockServer } from '../services/mockServer';

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
            devices: userData.devices
          }
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
    <>
      <div className='w-full h-screen min-h-[600px] fixed z-20 flex flex-col items-center justify-between py-[10vh] pointer-events-none'>

        <div className='pointer-events-auto shrink-0 flex flex-col items-center gap-4'>
          <FileUpload/>

          <div className='flex flex-col items-center gap-2'>
            <button
              onClick={handleLoadSession}
              disabled={loading}
              className='bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full backdrop-blur-md transition-all disabled:opacity-50'
            >
              {loading ? 'Loading...' : 'Load Previous Session'}
            </button>
            {error && <p className='text-red-400 text-sm'>{error}</p>}
          </div>
        </div>
      </div>

      <div className='w-full h-screen fixed inset-0 z-0 bg-[rgb(43,41,40)]'>

      </div>
    </>
  );
}

export default ImmersiveViewPage;