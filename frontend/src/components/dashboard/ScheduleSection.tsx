"use client";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const scheduleData = [
    {
        id: "B 1234 ABC",
        vehicle: "Toyota Avanza 1.5 A/T",
        customer: "Santoso",
        date: "01/06 - 12/06",
        avatar: "/images/dashboard/avatar-1.png",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        textColor: "text-blue-900",
        dateColor: "text-blue-500",
        span: 45,
    },
    {
        id: "B 2456 RBH",
        vehicle: "Toyota Celoz",
        customer: "William Bahari",
        date: "01/06 - 04/06",
        avatar: "/images/dashboard/avatar-2.png",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-900",
        dateColor: "text-green-500",
        span: 28,
    },
    {
        id: "B 1123 GBH",
        vehicle: "Daihatsu Xenia",
        customer: "Samuel Gilbert",
        date: "07/06 - 10/06",
        avatar: "/images/dashboard/avatar-3.png",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-900",
        dateColor: "text-green-500",
        span: 28,
    },
    {
        id: "B 7654 TTI",
        vehicle: "Daihatsu Sigra",
        customer: "PT. Budi Utomo",
        date: "10/06 - 24/06",
        avatar: null,
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        textColor: "text-purple-900",
        dateColor: "text-purple-500",
        span: 55,
    },
];

export function ScheduleSection() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg font-normal text-gray-900">Schedule</h2>

                {/* Tab Navigation */}
                <div className="flex items-center gap-4">
                    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                        <button className="px-4 py-1.5 text-sm text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all">
                            Day
                        </button>
                        <button className="px-4 py-1.5 text-sm bg-white shadow-sm rounded-md">
                            Week
                        </button>
                        <button className="px-4 py-1.5 text-sm text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all">
                            Month
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop View - Timeline */}
            <div className="hidden md:block overflow-x-auto">
                {/* Search & Week Headers */}
                <div className="flex items-center border-b border-gray-100 pb-3 mb-2">
                    <div className="w-48 pr-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex-1 flex">
                        {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, idx) => (
                            <div key={idx} className="flex-1 text-center relative">
                                <span className="text-xs text-gray-600">{week}</span>
                                {idx === 2 && (
                                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-px h-40 border-l border-dashed border-gray-800">
                                        <div className="absolute -top-6 -left-3.5 bg-black text-white text-[10px] px-1.5 py-1 rounded leading-tight text-center">
                                            12<br />Jun
                                        </div>
                                        <div className="absolute -top-2 -left-1 w-1.5 h-1.5 bg-black rounded-full"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Schedule Rows */}
                <div className="space-y-3">
                    {scheduleData.map((item, idx) => (
                        <div key={idx} className="flex items-center py-3">
                            <div className="w-48 pr-4">
                                <p className="text-sm font-normal text-gray-900">{item.id}</p>
                                <p className="text-xs text-gray-400">{item.vehicle}</p>
                            </div>
                            <div className="flex-1 relative h-10">
                                <div
                                    className={cn(
                                        "absolute h-full rounded-lg border flex items-center gap-2 px-2.5",
                                        item.bgColor,
                                        item.borderColor
                                    )}
                                    style={{
                                        left: idx === 0 ? "5%" : idx === 1 ? "0%" : idx === 2 ? "35%" : "50%",
                                        width: `${item.span}%`,
                                    }}
                                >
                                    {item.avatar && (
                                        <Image
                                            src={item.avatar}
                                            alt={item.customer}
                                            width={24}
                                            height={24}
                                            className="w-6 h-6 rounded-full object-cover bg-gray-200"
                                        />
                                    )}
                                    {!item.avatar && (
                                        <div className="w-6 h-6 rounded-full bg-purple-200 flex items-center justify-center text-[10px] font-medium text-purple-700">
                                            PT
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className={cn("text-[10px] font-medium truncate", item.textColor)}>
                                            {item.customer}
                                        </p>
                                        <p className={cn("text-[10px] truncate", item.dateColor)}>
                                            {item.date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile View - List */}
            <div className="md:hidden space-y-3">
                {scheduleData.map((item, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "p-4 rounded-lg border",
                            item.bgColor,
                            item.borderColor
                        )}
                    >
                        <div className="flex items-start gap-3">
                            {item.avatar && (
                                <Image
                                    src={item.avatar}
                                    alt={item.customer}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-full object-cover bg-gray-200"
                                />
                            )}
                            {!item.avatar && (
                                <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-sm font-medium text-purple-700">
                                    PT
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-normal text-gray-900 mb-1">{item.id}</p>
                                <p className="text-xs text-gray-500 mb-2">{item.vehicle}</p>
                                <p className={cn("text-xs font-medium mb-0.5", item.textColor)}>
                                    {item.customer}
                                </p>
                                <p className={cn("text-xs", item.dateColor)}>{item.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
