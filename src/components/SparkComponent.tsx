import { useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLocation, useNavigate } from 'react-router';
import SplatScene from './SplatScene';
import Dock from './ui/Dock';
import { FaHome, FaKeyboard, FaLightbulb, FaSun, FaThermometerHalf, FaWater } from 'react-icons/fa';
import Instructions from './ui/Instructions/Instructions';
import Devices, { deviceState } from './Devices';
import { type DeviceData } from '@/types/device';
import SensorControlPanel from './ui/SensorControlPanel';
import { useSnapshot } from 'valtio';
import type { SensorData } from '@/types/sensorsDataTypes';
import { Progress } from '@/components/ui/Progress';
import { useRoomStore } from '@/store/roomStore';

//* Export deviceState so other components can check transformation status
export { deviceState };

//* Spark component, handles the main canvas and device placement
function SparkComponent() {
  //* I need to keep track of the loading progress with these states
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [splatURL, setSplatURL] = useState('');
  const [displayInstruction, setDisplayInstructions] = useState(false);
  const [splatCenter, setSplatCenter] = useState({ x: 0, y: 0, z: 0 });

  const location = useLocation();
  const navigate = useNavigate();

  const [deviceToSpawn, setDeviceToSpawn] = useState<string | null>(null);
  const [initialDevices, setInitialDevices] = useState<DeviceData[]>([]);
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const { viewDevices, fetchRoom, updateRoom } = useRoomStore();
  const roomId = location.state?.roomId;

  const snap = useSnapshot(deviceState);

  //* Redirect to splash screen if no file data is available (e.g., direct navigation or page reload)
  useEffect(() => {
    if (!location.state?.file?.url) {
      navigate('/', { replace: true });
      return;
    }

    //* Check for initial devices passed from Load Session
    //! BIG TODO: Refactor to work with more than one device
    if (roomId) {
      fetchRoom(roomId);
      setInitialDevices(viewDevices);
    }
  }, [location.state, navigate]);

  //* Only set splatURL if file data exists
  useEffect(() => {
    if (location.state?.file?.url) {
      setSplatURL(location.state.file.url);
    }
  }, [location.state]);

  //* Handle Escape key to close instructions
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDisplayInstructions(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const items = [
    { icon: <FaHome className='fill-white' size={18} />, label: 'Home', onClick: () => navigate('/', { replace: true }) },
    { icon: <FaKeyboard className='fill-white' size={18} />, label: 'Controls', onClick: () => setDisplayInstructions(!displayInstruction) },
    { icon: <FaLightbulb className='fill-white' size={18} />, label: 'Add Light', onClick: () => setDeviceToSpawn('Light') },
    { icon: <FaThermometerHalf className='fill-white' size={18} />, label: 'Add Thermometer', onClick: () => setDeviceToSpawn('Thermometer') },
    { icon: <FaWater className='fill-white' size={18} />, label: 'Add Hygrometer', onClick: () => setDeviceToSpawn('Hygrometer') },
    { icon: <FaSun className='fill-white' size={18} />, label: 'Add Light Sensor', onClick: () => setDeviceToSpawn('AmbientLightSensor') },
  ];

  const handleDevicesChange = useCallback((devices: DeviceData[]) => {
    setDevices(devices);
    const updatedRoom = { viewDevices: devices };
    updateRoom(roomId, updatedRoom);
  }, []);

  const handleSensorDataUpdate = useCallback(async (deviceId: string, sensorData: SensorData) => {
    setDevices(prev => {
      const updatedDevices = prev.map(d =>
        d.id === deviceId ? { ...d, sensorData } : d,
      );
      const updatedRoom = { viewDevices: updatedDevices };
      updateRoom(roomId, updatedRoom);
      return updatedDevices;
    });
  }, []);

  //* Get current selected device data
  const selectedDevice = devices.find(d => d.id === snap.current);
  const defaultSensorData: SensorData = {
    temperature: 0,
    humidity: 0,
    light: 0,
    switch1: 0,
    switch2: 0,
    button1: 0,
    button2: 0,
  };

  //* Splats do not need the light component as it is 'embedded' into them so we do not add it to the canvas
  return (
    <>
      <div className='flex-1 h-full bg-[rgb(43,41,40)] overflow-hidden relative'>
        {loading &&
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='flex flex-col'>
              <p className='text-[#dfeaeb] text-center text-4xl font-extrabold text-balance m-2.5'>
                {Math.round(progress)} %
              </p>
              <div className='w-[50vw] max-w-[600px]'>
                <Progress value={progress} />
              </div>
            </div>
          </div>
        }
        {!loading && (
          <div className={`absolute inset-0 bottom-20 z-40 flex items-center pointer-events-none ${displayInstruction ? 'justify-center gap-8' : 'justify-end pr-4'}`}>
            {displayInstruction && (
              <Instructions />
            )}

            {/* Sensor Control Panel */}
            {snap.current && (
              <SensorControlPanel
                deviceId={snap.current}
                deviceModel={snap.name}
                sensorData={selectedDevice?.sensorData || defaultSensorData}
                onSensorDataChange={(data) => {
                  if (snap.current && (window as any).__updateDeviceSensorData) {
                    (window as any).__updateDeviceSensorData(snap.current, data);
                  }
                }}
                onClose={() => {
                  deviceState.current = null;
                  deviceState.name = '';
                }}
              />
            )}
          </div>
        )}

        {!loading && (
          <div className='absolute inset-x-0 bottom-0 z-50 flex items-center justify-center'>
            <Dock
              items={items}
              panelHeight={68}
              baseItemSize={50}
              magnification={70}
            />
          </div>
        )}

        <Canvas
          // https://threejs.org/docs/#PerspectiveCamera
          camera={{ position: [splatCenter.x, splatCenter.y, splatCenter.z], fov: 75, near: 0.01, far: 1000 }}
          // https://threejs.org/docs/#WebGLRenderer
          gl={{
            antialias: false,
            preserveDrawingBuffer: false,
            powerPreference: 'high-performance',
          }}
        >
          {/* Lighting for device models, doesn't affect splat rendering */}
          <ambientLight intensity={3} />
          <pointLight position={[10, 10, 10]} intensity={1000} />

          {/* Gaussian splat scene */}
          <SplatScene
            splatURL={splatURL}
            setLoading={setLoading}
            setProgress={setProgress}
            setSplatCenter={setSplatCenter}
          />

          {/* Devices component handles rendering and spawning devices, only render after splat loads */}
          {!loading && (
            <Devices
              deviceToSpawn={deviceToSpawn}
              onSpawned={() => setDeviceToSpawn(null)}
              initialDevices={initialDevices}
              onDevicesChange={handleDevicesChange}
              onSensorDataUpdate={handleSensorDataUpdate}
              roomId={roomId}
            />
          )}
        </Canvas>
      </div>
    </>
  );
}

export default SparkComponent;