import imgUser from "figma:asset/be0877716b482f24d313da95b8f226f644f183ae.png";
import imgUser1 from "figma:asset/a7e2803783151a46a136f2e43f83e9533f08d08a.png";
import { Calendar, Phone } from "lucide-react";

const orders = [
  {
    id: "00123",
    vehicle: "Toyota Avanza 1.5 A/T",
    plate: "B1234ABC",
    customer: "Santoso",
    phone: "+62 8976541217",
    startDate: "01 June 2024",
    endDate: "12 June 2024",
    status: "In use",
    statusColor: "bg-green-500",
    avatar: imgUser,
  },
  {
    id: "00124",
    vehicle: "Toyota Avanza 1.5 A/T",
    plate: "B1234ABC",
    customer: "Santoso",
    phone: "+62 8976541217",
    startDate: "01 June 2024",
    endDate: "12 June 2024",
    status: "In use",
    statusColor: "bg-green-500",
    avatar: imgUser1,
  },
];

export function OrderList() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-gray-100">
        <h2 className="text-lg font-normal text-gray-900">Order</h2>
        <button className="text-xs text-gray-400 hover:text-gray-600">
          View All &gt;
        </button>
      </div>

      {/* Order Items */}
      <div className="divide-y divide-gray-100">
        {orders.map((order) => (
          <div key={order.id} className="p-6">
            {/* Status Badge & ID */}
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-normal text-gray-900">{order.id}</span>
                  <span className={`${order.statusColor} text-white text-[10px] uppercase px-2 py-0.5 rounded`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm font-normal text-gray-900">{order.vehicle}</p>
                <p className="text-xs text-gray-500">{order.plate}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
              <img
                src={order.avatar}
                alt={order.customer}
                className="w-8 h-8 rounded-full object-cover bg-gray-200"
              />
              <div className="flex-1 min-w-0 text-xs text-gray-600 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">👤</span>
                  <span className="truncate">{order.customer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span className="truncate">{order.phone}</span>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span className="text-[10px]">Start Date</span>
                </div>
                <p className="text-gray-900">{order.startDate}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span className="text-[10px]">End Date</span>
                </div>
                <p className="text-gray-900">{order.endDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next 5 Days Section */}
      <div className="p-6 bg-gray-50 rounded-b-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Ongoing</h3>
          <span className="text-xs text-gray-500">Next 5 Days</span>
        </div>
        <p className="text-xs text-gray-400 text-center py-4">No upcoming orders</p>
      </div>
    </div>
  );
}
