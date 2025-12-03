import type { Device } from '@/types/devices-types';

interface ConnectDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  devices: Device[];
  onConnect: (deviceId: string) => void;
}

export default function ConnectDeviceModal({
  isOpen,
  onClose,
  devices,
  onConnect,
}: ConnectDeviceModalProps) {
  if (!isOpen) return null;

  const availableDevices = devices.filter((d) => !d.connectedToRoom);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg p-6 w-[400px] shadow-lg'>
        <h2 className='text-xl font-semibold mb-4'>Connect a Device</h2>

        {availableDevices.length === 0 ? (
          <p className='text-gray-600'>No available devices found.</p>
        ) : (
          <ul className='space-y-3 max-h-[300px] overflow-y-auto'>
            {availableDevices.map((device) => (
              <li
                key={device._id}
                className='flex justify-between items-center p-3 border rounded-lg'
              >
                <div>
                  <p className='font-medium'>{device.deviceName}</p>
                  <p className='text-sm text-gray-500'>{device.type}</p>
                </div>

                <button
                  onClick={() => onConnect(device._id)}
                  className='bg-black hover:bg-gray-800 text-white px-3 py-1 rounded-lg text-sm transition'
                >
                  Connect
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onClose}
          className='mt-5 w-full border border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition'
        >
          Close
        </button>
      </div>
    </div>
  );
}
