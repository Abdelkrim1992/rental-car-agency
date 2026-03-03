import { Search, Maximize2, Plus, Minus, MapPin } from "lucide-react";
import imgMapBackgroundVectorize from "figma:asset/98255831f7c7b19bcfaeb92a73576de3afe70ccb.png";
import imgVehicleTransparent from "figma:asset/c155dffbdef22194e1cb4df967497527d69aee83.png";

export function MapTracking() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-lg font-normal text-gray-900">Map Tracking</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Vehicle, Customer, and other"
            className="w-full sm:w-80 pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden min-h-[400px] lg:min-h-[500px]">
        {/* Map Background */}
        <div className="absolute inset-0 opacity-50">
          <img
            src={imgMapBackgroundVectorize}
            alt="World Map"
            className="w-full h-full object-cover mix-blend-multiply"
            style={{ filter: "saturate(0)" }}
          />
        </div>

        {/* Map Controls */}
        <button className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50">
          <Maximize2 className="w-4 h-4 text-gray-600" />
        </button>

        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50">
            <Plus className="w-4 h-4 text-gray-600 font-bold" />
          </button>
          <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50">
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Map Markers */}
        <div className="absolute top-[21%] left-[23%] bg-black p-2 rounded-full shadow-lg">
          <MapPin className="w-4 h-4 text-white" />
        </div>

        <div className="absolute top-[56%] left-[31%] bg-black p-2 rounded-full shadow-lg">
          <MapPin className="w-4 h-4 text-white" />
        </div>

        <div className="absolute top-[56%] left-[44%] bg-green-700 p-2 rounded-full shadow-lg">
          <MapPin className="w-4 h-4 text-white" />
        </div>

        {/* Floating Card - Responsive positioning */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Vehicle Image */}
          <div className="relative h-28 bg-gray-50 flex items-center justify-center overflow-hidden rounded-t-lg">
            <img
              src={imgVehicleTransparent}
              alt="Toyota Avanza"
              className="w-full h-full object-contain"
            />
            <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] uppercase px-2 py-1 rounded">
              In use
            </span>
          </div>

          {/* Card Content */}
          <div className="p-3">
            <h3 className="text-sm font-normal text-gray-900 mb-1">
              Toyota Avanza 1.5 A/T
            </h3>
            <p className="text-xs text-gray-500 mb-3">B1234ABC</p>

            <div className="border-t border-gray-100 pt-3 space-y-1 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">👤</span>
                <span>Santoso</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📞</span>
                <span>+62 8976541217</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📅</span>
                <span>12 June 2024</span>
              </div>
            </div>

            <div className="mt-3 bg-gray-50 border border-gray-100 rounded text-center py-1.5">
              <p className="text-[10px] text-gray-600">
                Time left: 120 hr · 52 min · 12 sec
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
