"use client";

import Sidebar from './Sidebar';
import WeatherWidget from './WeatherWidget';
import RadioWidget from './RadioWidget';
import SmartHomeWidget from './SmartHomeWidget';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Welkom bij je Personal Dashboard</h1>

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {/* Weather Widget - spans full width on mobile, half on larger screens */}
            <div className="lg:col-span-2 xl:col-span-3">
              <WeatherWidget />
            </div>

            {/* Radio Widget */}
            <div className="lg:col-span-1">
              <RadioWidget />
            </div>

            {/* Smart Home Widget - spans full width */}
            <div className="lg:col-span-2">
              <SmartHomeWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}