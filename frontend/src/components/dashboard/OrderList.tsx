"use client";

import Image from "next/image";
import { useState } from "react";
import { Calendar, Phone, User, CalendarDays, MapPin } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

interface OrderEntry {
    id: string;
    vehicle: string;
    plate: string;
    customer: string;
    phone: string;
    startDate: string;
    endDate: string;
    status: string;
    statusColor: string;
    avatar: string | null;
}

export function OrderList() {
    const { bookings, loading: bookingsLoading } = useAppSelector((s) => s.booking);

    const realOrders: OrderEntry[] = bookings.map((booking, idx) => ({
        id: booking.id?.slice(0, 5) || String(idx + 1).padStart(5, "0"),
        vehicle: booking.car_name || "Unknown Car",
        plate: "—",
        customer: booking.guest_name || "Guest",
        phone: booking.guest_phone || "—",
        startDate: booking.pickup_date || "—",
        endDate: booking.return_date || "—",
        status: booking.status || "pending",
        statusColor:
            booking.status === "confirmed"
                ? "bg-green-500"
                : booking.status === "pending"
                    ? "bg-yellow-500"
                    : booking.status === "completed"
                        ? "bg-blue-500"
                        : "bg-gray-400",
        avatar: null,
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(realOrders.length / itemsPerPage);
    const paginatedOrders = realOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <h2 className="text-lg font-normal text-gray-900">Order</h2>
                <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                    View All &gt;
                </button>
            </div>

            {/* Order Items */}
            {bookingsLoading ? (
                <div className="p-12 text-center flex-1">
                    <p className="text-gray-400 text-sm">Loading orders...</p>
                </div>
            ) : realOrders.length === 0 ? (
                <div className="p-12 text-center flex-1">
                    <p className="text-gray-400 text-sm">No recent orders found.</p>
                </div>
            ) : (
                <div className="flex-1 flex flex-col justify-between">
                    <div className="divide-y divide-gray-100">
                        {paginatedOrders.map((order) => (
                            <div key={order.id} className="p-6">
                                {/* Status Badge & ID */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-normal text-gray-900">{order.id}</span>
                                            <span
                                                className={`${order.statusColor} text-white text-[10px] uppercase px-2 py-0.5 rounded`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm font-normal text-gray-900">{order.vehicle}</p>
                                        <p className="text-xs text-gray-500">{order.plate}</p>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                                    {order.avatar ? (
                                        <Image
                                            src={order.avatar}
                                            alt={order.customer}
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 rounded-full object-cover bg-gray-200"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                            <User className="w-4 h-4 text-gray-500" />
                                        </div>
                                    )}
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
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                            <span className="text-xs text-gray-500">
                                Page {currentPage} of {totalPages}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 text-xs border bg-white rounded-md disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 text-xs border bg-white rounded-md disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

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
