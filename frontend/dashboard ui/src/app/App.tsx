import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { MapTracking } from "./components/MapTracking";
import { StatisticCard } from "./components/StatisticCard";
import { ScheduleSection } from "./components/ScheduleSection";
import { OrderList } from "./components/OrderList";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-[1920px] mx-auto">
            {/* Top Section - Map & Stats */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
              {/* Map - Takes 2 columns on xl screens */}
              <div className="xl:col-span-2">
                <MapTracking />
              </div>

              {/* Statistics - Takes 1 column on xl screens */}
              <div className="xl:col-span-1">
                <StatisticCard />
              </div>
            </div>

            {/* Bottom Section - Schedule & Orders */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Schedule - Takes 2 columns on xl screens */}
              <div className="xl:col-span-2">
                <ScheduleSection />
              </div>

              {/* Orders - Takes 1 column on xl screens */}
              <div className="xl:col-span-1">
                <OrderList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}