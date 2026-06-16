"use client";

import { useState, useEffect } from 'react';
import { Lightbulb, Camera, Power, Sun, Moon } from 'lucide-react';

export default function SmartHomeWidget() {
  const [devices, setDevices] = useState([
    { id: 1, name: "Woonkamer Lamp", type: "light", status: false, brightness: 75 },
    { id: 2, name: "Keuken Lamp", type: "light", status: false, brightness: 50 },
    { id: 3, name: "Camera Tuin", type: "camera", status: false },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user settings from API
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/dashboard/save');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data.smartHomeDevices.length > 0) {
            setDevices(data.data.smartHomeDevices);
          }
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings to API
  const saveSettings = async (newDevices: typeof devices) => {
    try {
      await fetch('/api/dashboard/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ smartHomeDevices: newDevices }),
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const toggleDevice = (id: number) => {
    const newDevices = devices.map(device =>
      device.id === id ? { ...device, status: !device.status } : device
    );
    setDevices(newDevices);
    saveSettings(newDevices);
  };

  const adjustBrightness = (id: number, value: number) => {
    const newDevices = devices.map(device =>
      device.id === id ? { ...device, brightness: value } : device
    );
    setDevices(newDevices);
    saveSettings(newDevices);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5" />
        Smart Home
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {devices.map((device) => (
          <div key={device.id} className="bg-gray-700 rounded-lg p-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-white font-medium">{device.name}</h3>
                <p className="text-xs text-gray-400">
                  {device.type === 'light' ? 'Slimme Lamp' : 'Beveiligingscamera'}
                </p>
              </div>
              <button
                onClick={() => toggleDevice(device.id)}
                className={`p-2 rounded-full transition-colors ${
                  device.status
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                <Power className={`h-4 w-4 ${device.status ? 'text-white' : 'text-gray-300'}`} />
              </button>
            </div>

            {device.type === 'light' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Sun className="h-4 w-4 text-yellow-400" />
                  <span className="text-gray-300">{device.brightness}%</span>
                  <Moon className="h-4 w-4 text-blue-400" />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={device.brightness}
                  onChange={(e) => adjustBrightness(device.id, parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  disabled={!device.status}
                />
              </div>
            )}

            {device.type === 'camera' && (
              <div className={`aspect-video bg-gray-600 rounded-lg flex items-center justify-center ${
                device.status ? 'border-2 border-green-500' : 'border border-gray-500'
              }`}>
                {device.status ? (
                  <Camera className="h-8 w-8 text-green-400" />
                ) : (
                  <Camera className="h-8 w-8 text-gray-400" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}