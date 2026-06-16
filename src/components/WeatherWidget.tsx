"use client";

export default function WeatherWidget() {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.832 2.537a.75.75 0 00-1.117-1.006 6.001 6.001 0 00-5.48 3.358 6.001 6.001 0 003.357 5.48.75.75 0 001.006 1.117 6.001 6.001 0 005.48-3.357 6.001 6.001 0 00-3.358-5.48.75.75 0 00-.537-.216zM12.5 8a.75.75 0 01-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75H12.5zm-1.75 1.5a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H10.75zM6.25 9.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75V9.5zm1.5-.75a.75.75 0 00-1.5 0v.008a.75.75 0 001.5 0V8.75z" />
        </svg>
        Weer
      </h2>
      <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
        <iframe
          src="https://buienradar.nl"
          title="Buienradar weer"
          className="w-full h-full border-none"
          allowFullScreen
        />
      </div>
    </div>
  );
}