"use client";

import { Users, ShoppingBag, DollarSign, CreditCard, ChevronDown, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";

interface StatProps {
    label: string;
    value: string;
    change: string;
    changeLabel: string;
    icon: React.ReactNode;
    iconBgColor: string;
}

function StatItem({ label, value, change, changeLabel, icon, iconBgColor }: StatProps) {
    const isPositive = change.includes("↗");

    return (
        <div className="flex items-start justify-between">
            <div className="space-y-1">
                <p className="text-sm text-gray-600">{label}</p>
                <p className="text-2xl font-normal text-gray-900">{value}</p>
                <div className="flex items-center gap-2 text-xs">
                    <span className={isPositive ? "text-green-600" : "text-red-500"}>{change}</span>
                    <span className="text-gray-400">{changeLabel}</span>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className={cn("p-2.5 border border-gray-200 rounded-full", iconBgColor)}>
                    {icon}
                </div>
                <button className="text-xs text-gray-300 hover:text-gray-500 transition-colors">
                    See Detail &gt;
                </button>
            </div>
        </div>
    );
}

export function StatisticCard() {
    const { bookings } = useAppSelector((s) => s.booking);

    const stats: StatProps[] = [
        {
            label: "Customer",
            value: String(new Set(bookings.map(b => b.guest_name)).size),
            change: "↗ 0%",
            changeLabel: "than last month",
            icon: <Users className="w-4 h-4 text-gray-600" />,
            iconBgColor: "bg-white",
        },
        {
            label: "Order",
            value: String(bookings.length),
            change: "↗ 0%",
            changeLabel: "than last month",
            icon: <ShoppingBag className="w-4 h-4 text-gray-600" />,
            iconBgColor: "bg-white",
        },
        {
            label: "Income",
            value: `$${bookings.reduce((sum, b) => sum + (b.total_price || 0), 0).toFixed(0)}`,
            change: "↗ 0%",
            changeLabel: "than last month",
            icon: <DollarSign className="w-4 h-4 text-gray-600" />,
            iconBgColor: "bg-white",
        },
        {
            label: "Expenses",
            value: `$${(bookings.reduce((sum, b) => sum + (b.total_price || 0), 0) * 0.4).toFixed(0)}`, // Using 40% overhead model
            change: "↘ 0%",
            changeLabel: "than last month",
            icon: <CreditCard className="w-4 h-4 text-gray-600" />,
            iconBgColor: "bg-white",
        },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <h2 className="text-lg font-normal text-gray-900">Statistic</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md text-xs text-gray-600 hover:bg-gray-200 transition-colors">
                    <Calendar className="w-3 h-3" />
                    <span>Past 7 days</span>
                    <ChevronDown className="w-3 h-3" />
                </button>
            </div>

            {/* Stats */}
            <div className="divide-y divide-gray-100">
                {stats.map((stat, idx) => (
                    <div key={idx} className="p-6">
                        <StatItem {...stat} />
                    </div>
                ))}
            </div>
        </div>
    );
}
