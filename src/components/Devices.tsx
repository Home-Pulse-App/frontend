import { useEffect, useState, useRef, Suspense } from 'react';
import { useThree } from '@react-three/fiber';
import { TransformControls, useGLTF, useCursor, Outlines } from '@react-three/drei';
import { proxy, useSnapshot } from 'valtio';
import * as THREE from 'three';
import type { DeviceData, SensorData } from '../services/mockServer';

const modes = ['translate', 'rotate', 'scale'] as const;

//* Computes the material color for a device based on its type and sensor data
function getDeviceColor(model: string, sensorData?: SensorData): THREE.Color {
  //* Default color if no sensor data
  if (!sensorData) {
    return new THREE.Color('#ffffff');
  }

  switch (model) {
    case 'Light': {
      //* Yellow if switch1 OR switch2 is ON, otherwise white
      const isOn = sensorData.switch1 === 1 || sensorData.switch2 === 1;
      return new THREE.Color(isOn ? '#ffff00' : '#ffffff');
    }

    case 'Thermometer': {
      //* Gradient from white (0°C) to red (50°C)
      const temp = Math.max(0, Math.min(50, sensorData.temperature));
      const t = temp / 50;
      const white = new THREE.Color('#ffffff');
      const red = new THREE.Color('#ff0000');
      return white.clone().lerp(red, t);
    }

    case 'Hygrometer': {
      //* Gradient from white (0%) to dark blue (100%)
      const humidity = Math.max(0, Math.min(100, sensorData.humidity));
      const t = humidity / 100;
      const white = new THREE.Color('#ffffff');
      const darkBlue = new THREE.Color('#00008b');
      return white.clone().lerp(darkBlue, t);
    }

    case 'AmbientLightSensor': {
      //* Gradient from white (0%) to yellow (100%)
      const light = Math.max(0, Math.min(100, sensorData.light));
      const t = light / 100;
      const white = new THREE.Color('#ffffff');
      const yellow = new THREE.Color('#ffff00');
      return white.clone().lerp(yellow, t);
    }

    default:
      return new THREE.Color('#ffffff');
  }
}

type DeviceState = {
  current: string | null;
  mode: number;
  transforming: boolean;
  name: string;
};

const deviceState = proxy<DeviceState>({ current: null, mode: 0, transforming: false, name: '' });

export { deviceState };

interface DeviceProps {
  id: string;
  model: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  sensorData?: SensorData;
  onTransformEnd: (id: string, position: THREE.Vector3, rotation: THREE.Euler, scale: THREE.Vector3) => void;
}

function Device({ id, model, position, rotation, scale, sensorData, onTransformEnd, ...props }: DeviceProps) {
  const snap = useSnapshot(deviceState);
  const { nodes } = useGLTF(`./models/devices/${model}.gltf`) as any;
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null!);
  useCursor(hovered);

  //* Compute dynamic color based on device type and sensor data
  const deviceColor = getDeviceColor(model, sensorData);

  //* Apply initial transforms
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...position);
      meshRef.current.rotation.set(...rotation);
      meshRef.current.scale.setScalar(scale);
    }
  }, []);

  return (
    <>
      <mesh
        ref={meshRef}
        onClick={(e) => (e.stopPropagation(), (deviceState.current = id), (deviceState.name = model))}
        onPointerMissed={(e) => e.type === 'click' && (deviceState.current = null, deviceState.name = '')}
        onContextMenu={(e) => snap.current === id && (e.stopPropagation(), (deviceState.mode = (snap.mode + 1) % modes.length))}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={(e) => (e.stopPropagation(), setHovered(false))}
        name={id}
        geometry={nodes[model].geometry}
        {...props}
        dispose={null}
      >
        <meshStandardMaterial
          color={deviceColor}
          metalness={0.5}
          roughness={0.2}
          transparent={false}
        />
        {snap.current === id && (
          <Outlines
          thickness={5}
          color='#ff6080'
          angle={0.1}
          />
        )}
      </mesh>
      {snap.current === id && (
        <TransformControls
          object={meshRef.current!}
          mode={modes[snap.mode] as any}
          onMouseDown={() => { deviceState.transforming = true; }}
          onMouseUp={() => {
            deviceState.transforming = false;
            if (meshRef.current) {
                onTransformEnd(id, meshRef.current.position, meshRef.current.rotation, meshRef.current.scale);
            }
          }}
        />
      )}
    </>
  );
}

interface DevicesProps {
  deviceToSpawn: string | null;
  onSpawned: () => void;
  initialDevices?: DeviceData[];
  onDevicesChange?: (devices: DeviceData[]) => void;
  onSensorDataUpdate?: (deviceId: string, sensorData: SensorData) => void;
}

export default function Devices({ deviceToSpawn, onSpawned, initialDevices = [], onDevicesChange, onSensorDataUpdate }: DevicesProps) {
  const [devices, setDevices] = useState<DeviceData[]>(initialDevices);
  const camera = useThree((state) => state.camera);

  //* Update internal state if initialDevices changes (e.g. loaded from server)
  useEffect(() => {
    if (initialDevices.length > 0) {
        setDevices(initialDevices);
    }
  }, [initialDevices]);

  //* Notify parent of changes
  useEffect(() => {
    onDevicesChange?.(devices);
  }, [devices, onDevicesChange]);

  //* Handle spawning
  useEffect(() => {
    if (deviceToSpawn) {
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);

      const camPos = camera.position.clone();
      const distance = 1.5;
      const spawnPos = camPos.add(forward.multiplyScalar(distance));

      const newDevice: DeviceData = {
          id: crypto.randomUUID(),
          model: deviceToSpawn,
          position: [spawnPos.x, spawnPos.y, spawnPos.z],
          rotation: [0, 0, 0],
          scale: 1,
      };

      setDevices((prev) => [...prev, newDevice]);
      onSpawned();
    }
  }, [deviceToSpawn, camera, onSpawned]);

  //* Handle Backspace
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Backspace' && deviceState.current) {
        const idToRemove = deviceState.current;
        const nameToRemove = deviceState.name;
        console.log('Removing device 🫆:' + idToRemove + ' ❌ Of type: ' + nameToRemove);
        setDevices((prev) => prev.filter((d) => d.id !== idToRemove));
        deviceState.current = null;
        deviceState.name = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  //* Update sensor data for a specific device
  const updateDeviceSensorData = (deviceId: string, sensorData: SensorData) => {
    setDevices(prev => prev.map(d =>
      d.id === deviceId ? { ...d, sensorData } : d
    ));
    onSensorDataUpdate?.(deviceId, sensorData);
  };

  //* Expose updateDeviceSensorData to parent via callback
  useEffect(() => {
    if (onSensorDataUpdate) {
      (window as any).__updateDeviceSensorData = updateDeviceSensorData;
    }
    return () => {
      delete (window as any).__updateDeviceSensorData;
    };
  }, [onSensorDataUpdate]);

  const handleTransformEnd = (id: string, position: THREE.Vector3, rotation: THREE.Euler, scale: THREE.Vector3) => {
      setDevices(prev => prev.map(d => {
          if (d.id === id) {
              return {
                  ...d,
                  position: [position.x, position.y, position.z],
                  rotation: [rotation.x, rotation.y, rotation.z],
                  scale: scale.x //! Assuming uniform scale for now
              };
          }
          return d;
      }));
  };

  return (
      <Suspense fallback={null}>
        {devices.map((device) => (
          <Device
            key={device.id}
            id={device.id}
            model={device.model}
            position={device.position}
            rotation={device.rotation}
            scale={device.scale}
            sensorData={device.sensorData}
            onTransformEnd={handleTransformEnd}
          />
        ))}
      </Suspense>
  );
}

