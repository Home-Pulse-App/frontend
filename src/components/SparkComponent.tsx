import {useState, useEffect, Suspense} from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import { Progress } from './ui/Progress';
import { useLocation } from 'react-router';
import SplatScene_Reveal from './SplatScene_Reveal';
import Dock from './ui/Dock';
import { FaHome, FaKeyboard } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Instructions from './ui/Instructions/Instructions';
import { TransformControls, useGLTF, useCursor } from '@react-three/drei';
import { proxy, useSnapshot } from 'valtio';

//* Device state management using Valtio
const modes = ['translate', 'rotate', 'scale'] as const;

type DeviceState = {
  current: string | null;
  mode: number;
  transforming: boolean;
};

const deviceState = proxy<DeviceState>({ current: null, mode: 0, transforming: false });

//* Export deviceState so other components can check transformation status
export { deviceState };

interface DeviceProps {
  name: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

//* Device component, renders a GLTF model with transform capabilities
function Device({ name, ...props }: DeviceProps) {
  const snap = useSnapshot(deviceState);
  const { nodes } = useGLTF('./models/devices/LightBulb.gltf') as any;
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <mesh
      onClick={(e) => (e.stopPropagation(), (deviceState.current = name))}
      onPointerMissed={(e) => e.type === 'click' && (deviceState.current = null)}
      onContextMenu={(e) => snap.current === name && (e.stopPropagation(), (deviceState.mode = (snap.mode + 1) % modes.length))}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => (e.stopPropagation(), setHovered(false))}
      name={name}
      geometry={nodes[name].geometry}
      {...props}
      dispose={null}
    >
      <meshStandardMaterial
        color={snap.current === name ? '#ff6080' : '#ffffff'}
        metalness={0.2}
        roughness={0.4}
        emissive={snap.current === name ? '#ff6080' : '#000000'}
        emissiveIntensity={snap.current === name ? 0.3 : 0}
      />
    </mesh>
  );
}

//* Device controls, handles transform controls for selected devices
function DeviceControls() {
  const snap = useSnapshot(deviceState);
  const scene = useThree((state) => state.scene);

  return (
    <>
      {snap.current && (
        <TransformControls
          object={scene.getObjectByName(snap.current)!}
          mode={modes[snap.mode] as any}
          onMouseDown={() => {
            deviceState.transforming = true;
          }}
          onMouseUp={() => {
            deviceState.transforming = false;
          }}
        />
      )}
    </>
  );
}

//* Spark component, handles the main canvas and device placement
function SparkComponent() {
  //* I need to keep track of the loading progress with these states
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [splatURL, setSplatURL] = useState('');
  const [displayInstruction, setDisplayInstructions] = useState(false);
  const [splatCenter, setSplatCenter] = useState({x: 0, y: 0, z: 0});
  const [devicePosition, setDevicePosition] = useState<[number, number, number] | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  //* Set device position once when splat center is calculated
  useEffect(() => {
    if (!devicePosition) {
      setDevicePosition([splatCenter.x, splatCenter.y, splatCenter.z]);
      console.log('Device position set ⌖:', [splatCenter.x, splatCenter.y, splatCenter.z]);
    }
  }, [splatCenter, devicePosition]);

  //* Redirect to splash screen if no file data is available (e.g., direct navigation or page reload)
  useEffect(() => {
    if (!location.state?.file?.url) {
      navigate('/', { replace: true });
      return;
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
  ];

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
          {/* Lighting for device models - doesn't affect splat rendering */}
          <ambientLight intensity={3} />
          <pointLight position={[10, 10, 10]} intensity={1000} />

          {/* Gaussian splat scene */}
          <SplatScene_Reveal
            splatURL = {splatURL}
            setLoading = {setLoading}
            setProgress = {setProgress}
            setSplatCenter = {setSplatCenter}
          />

          {/* Device model - positioned in front of camera */}
          {devicePosition && (
            <Suspense fallback={null}>
              <Device
                name="LightBulb"
                position={devicePosition}
              />
            </Suspense>
          )}

          {/* Transform controls for device manipulation */}
          <DeviceControls />
        </Canvas>
      </div>
    </>
  );
}

export default SparkComponent;