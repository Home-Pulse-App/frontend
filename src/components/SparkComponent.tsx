import { useEffect, useState } from 'react';
import {Canvas} from '@react-three/fiber';
import { Progress } from './ui/Progress';
import { useLocation } from 'react-router';
import SplatScene from './SplatScene';
import Dock from './ui/Dock';
import { FaHome, FaKeyboard, FaLightbulb, FaThermometerHalf, FaWater } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Instructions from './ui/Instructions/Instructions';
import Devices, { deviceState } from './Devices';
import { mockServer, type DeviceData, type SensorData } from '../services/mockServer';
import SensorControlPanel from './ui/SensorControlPanel';
import { useSnapshot } from 'valtio';

//* Export deviceState so other components can check transformation status
export { deviceState };

//* Spark component, handles the main canvas and device placement
function SparkComponent() {
  //* I need to keep track of the loading progress with these states
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [splatURL, setSplatURL] = useState('');
  const [displayInstruction, setDisplayInstructions] = useState(false);
  const [splatCenter, setSplatCenter] = useState({x: 0, y: 0, z: 0});

  const location = useLocation();
  const navigate = useNavigate();

  const [deviceToSpawn, setDeviceToSpawn] = useState<string | null>(null);
  const [initialDevices, setInitialDevices] = useState<DeviceData[]>([]);
  const [devices, setDevices] = useState<DeviceData[]>([]);

  const snap = useSnapshot(deviceState);

  //* Redirect to splash screen if no file data is available (e.g., direct navigation or page reload)
  useEffect(() => {
    if (!location.state?.file?.url) {
      navigate('/', { replace: true });
      return;
    }

    // Check for initial devices passed from Load Session
    if (location.state?.devices) {
        setInitialDevices(location.state.devices);
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

  //* Don't render if no file data is available (redirect will happen)
  if (!location.state?.file?.url) {
    return null;
  }

  const items = [
    { icon: <FaHome className='fill-white' size={18} />, label: 'Home', onClick: () => navigate('/', { replace: true }) },
    { icon: <FaKeyboard className='fill-white' size={18} />, label: 'Controls', onClick: () => setDisplayInstructions(!displayInstruction) },
    { icon: <FaLightbulb className='fill-white' size={18} />, label: 'Add Light', onClick: () => setDeviceToSpawn('Light') },
    { icon: <FaThermometerHalf className='fill-white' size={18} />, label: 'Add Thermometer', onClick: () => setDeviceToSpawn('Thermometer') },
    { icon: <FaWater className='fill-white' size={18} />, label: 'Add Hygrometer', onClick: () => setDeviceToSpawn('Hygrometer') },
  ];

  const handleDevicesChange = (devices: DeviceData[]) => {
      setDevices(devices);
      mockServer.saveDevices('default-user', devices);
  };

  const handleSensorDataUpdate = (deviceId: string, sensorData: SensorData) => {
    const updatedDevices = devices.map(d =>
      d.id === deviceId ? { ...d, sensorData } : d
    );
    setDevices(updatedDevices);
    mockServer.saveDevices('default-user', updatedDevices);
  };

  //* Get current selected device data
  const selectedDevice = devices.find(d => d.id === snap.current);
  const defaultSensorData: SensorData = {
    temperature: 0,
    humidity: 0,
    light: 75,
    switch1: 0,
    switch2: 0,
    button1: 0,
    button2: 0
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
        {!loading &&
          <>
            {displayInstruction &&
            <div className='absolute inset-0 z-40 flex items-center justify-center pointer-events-none'>
              <Instructions></Instructions>
            </div>
            }
            <div className='absolute inset-x-0 bottom-0 z-50 flex items-center justify-center'>
              <Dock
                items={items}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
              />
            </div>
          </>
        }

        {/* Sensor Control Panel */}
        {!loading && snap.current && (
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
            splatURL = {splatURL}
            setLoading = {setLoading}
            setProgress = {setProgress}
            setSplatCenter = {setSplatCenter}
          />

          {/* Devices component handles rendering and spawning devices */}
          <Devices
            deviceToSpawn={deviceToSpawn}
            onSpawned={() => setDeviceToSpawn(null)}
            initialDevices={initialDevices}
            onDevicesChange={handleDevicesChange}
            onSensorDataUpdate={handleSensorDataUpdate}
          />
        </Canvas>
      </div>
    </>
  );
}

export default SparkComponent;