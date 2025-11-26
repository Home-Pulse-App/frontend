import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import type { SensorData } from '../../services/mockServer';

interface SensorControlPanelProps {
  deviceId: string | null;
  deviceModel: string;
  sensorData: SensorData;
  onSensorDataChange: (data: SensorData) => void;
  onClose: () => void;
}

export default function SensorControlPanel({
  deviceId,
  deviceModel,
  sensorData,
  onSensorDataChange,
  onClose
}: SensorControlPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!deviceId) return null;

  const handleChange = (field: keyof SensorData, value: number) => {
    onSensorDataChange({
      ...sensorData,
      [field]: value
    });
  };

  return (
    <div className='fixed top-4 right-4 z-50 w-80 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl overflow-hidden'>
      {/* Header */}
      <div className='flex items-center justify-between p-4 bg-white/5 border-b border-white/10'>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse' />
          <h3 className='text-white font-semibold text-sm'>
            {deviceModel} Controls
          </h3>
        </div>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className='text-white/60 hover:text-white transition-colors p-1'
          >
            {isCollapsed ? <FaChevronDown size={14} /> : <FaChevronUp size={14} />}
          </button>
          <button
            onClick={onClose}
            className='text-white/60 hover:text-white transition-colors p-1'
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>

      {/* Controls */}
      {!isCollapsed && (
        <div className='p-4 space-y-4'>
          {/* Temperature Slider */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <label className='text-white/80 text-xs font-medium'>Temperature</label>
              <span className='text-white text-sm font-mono'>{sensorData.temperature}°C</span>
            </div>
            <input
              type='range'
              min='0'
              max='50'
              step='1'
              value={sensorData.temperature}
              onChange={(e) => handleChange('temperature', Number(e.target.value))}
              className='w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider'
            />
            <div className='flex justify-between text-xs text-white/40'>
              <span>0°C</span>
              <span>50°C</span>
            </div>
          </div>

          {/* Humidity Slider */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <label className='text-white/80 text-xs font-medium'>Humidity</label>
              <span className='text-white text-sm font-mono'>{sensorData.humidity}%</span>
            </div>
            <input
              type='range'
              min='0'
              max='100'
              step='1'
              value={sensorData.humidity}
              onChange={(e) => handleChange('humidity', Number(e.target.value))}
              className='w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider'
            />
            <div className='flex justify-between text-xs text-white/40'>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Light Slider */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <label className='text-white/80 text-xs font-medium'>Light</label>
              <span className='text-white text-sm font-mono'>{sensorData.light}</span>
            </div>
            <input
              type='range'
              min='0'
              max='100'
              step='1'
              value={sensorData.light}
              onChange={(e) => handleChange('light', Number(e.target.value))}
              className='w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider'
            />
            <div className='flex justify-between text-xs text-white/40'>
              <span>0</span>
              <span>100</span>
            </div>
          </div>

          {/* Divider */}
          <div className='border-t border-white/10 pt-4' />

          {/* Switches */}
          <div className='space-y-3'>
            <label className='text-white/80 text-xs font-medium'>Switches</label>
            <div className='grid grid-cols-2 gap-3'>
              <button
                onClick={() => handleChange('switch1', sensorData.switch1 === 1 ? 0 : 1)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  sensorData.switch1 === 1
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/50'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                Switch 1
              </button>
              <button
                onClick={() => handleChange('switch2', sensorData.switch2 === 1 ? 0 : 1)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  sensorData.switch2 === 1
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/50'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                Switch 2
              </button>
            </div>
          </div>

          {/* Device ID Info */}
          <div className='pt-3 border-t border-white/10'>
            <p className='text-xs text-white/40 font-mono truncate'>
              ID: {deviceId.slice(0, 8)}...
            </p>
          </div>
        </div>
      )}

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          transition: all 0.2s;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          transition: all 0.2s;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
}
