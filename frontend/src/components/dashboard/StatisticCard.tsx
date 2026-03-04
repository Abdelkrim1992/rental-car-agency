"use client";

import { Users, ShoppingBag, DollarSign, CreditCard, Calendar, TrendingUp, TrendingDown, ChevronDown } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useState, useMemo } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Divider
} from "@heroui/react";

interface StatProps {
    label: string;
    value: string;
    change: string;
    changeLabel: string;
    icon: React.ReactNode;
    isPositive: boolean;
}

function StatItem({ label, value, change, icon, isPositive }: StatProps) {
    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-default-100 text-default-500">
                    {icon}
                </div>
                <div>
                    <p className="text-small text-default-500">{label}</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-xl font-semibold">{value}</p>
                        <p className={`text-tiny font-medium ${isPositive ? "text-success" : "text-danger"}`}>
                            {change}
                        </p>
                    </div>
                </div>
            </div>
            <Button size="sm" variant="flat">Details</Button>
        </div>
    );
}

export function StatisticCard() {
    const { bookings } = useAppSelector((s) => s.booking);
    const [timeRange, setTimeRange] = useState<"7_days" | "30_days" | "all_time">("30_days");

    const filteredStats = useMemo(() => {
        const now = new Date().getTime();
        const daysInMs = (days: number) => days * 24 * 60 * 60 * 1000;

        let activeBookings = bookings;
        if (timeRange === "7_days") {
            activeBookings = bookings.filter(b => now - new Date(b.created_at).getTime() <= daysInMs(7));
        } else if (timeRange === "30_days") {
            activeBookings = bookings.filter(b => now - new Date(b.created_at).getTime() <= daysInMs(30));
        }

        const totalCustomers = new Set(activeBookings.map(b => b.guest_email || b.guest_name)).size;
        const totalIncome = activeBookings.reduce((sum, b) => sum + (Number(b.total_price) || 0), 0);
        const totalExpenses = totalIncome * 0.4;

        return {
            totalCustomers,
            totalOrders: activeBookings.length,
            totalIncome,
            totalExpenses
        };
    }, [bookings, timeRange]);

    const stats: StatProps[] = [
        {
            label: "Total Customers",
            value: String(filteredStats.totalCustomers),
            change: "+12.5%",
            changeLabel: "vs prev",
            icon: <Users size={18} />,
            isPositive: true,
        },
        {
            label: "Total Orders",
            value: String(filteredStats.totalOrders),
            change: "+8.2%",
            changeLabel: "vs prev",
            icon: <ShoppingBag size={18} />,
            isPositive: true,
        },
        {
            label: "Total Income",
            value: `$${filteredStats.totalIncome.toLocaleString()}`,
            change: "+15.0%",
            changeLabel: "vs prev",
            icon: <DollarSign size={18} />,
            isPositive: true,
        },
        {
            label: "Total Expenses",
            value: `$${filteredStats.totalExpenses.toLocaleString()}`,
            change: "-5.4%",
            changeLabel: "vs prev",
            icon: <CreditCard size={18} />,
            isPositive: false,
        },
    ];

    const getRangeLabel = () => {
        if (timeRange === "7_days") return "Past 7 days";
        if (timeRange === "30_days") return "Past 30 days";
        return "All time";
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <p className="text-large font-bold">Statistics</p>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Button variant="flat" size="sm" endContent={<ChevronDown size={14} />}>
                            {getRangeLabel()}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Time Range"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={[timeRange]}
                        onSelectionChange={(keys) => setTimeRange(Array.from(keys)[0] as any)}
                    >
                        <DropdownItem key="7_days">Past 7 days</DropdownItem>
                        <DropdownItem key="30_days">Past 30 days</DropdownItem>
                        <DropdownItem key="all_time">All time</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col gap-2">
                    {stats.map((stat, idx) => (
                        <div key={idx}>
                            <StatItem {...stat} />
                            {idx < stats.length - 1 && <Divider />}
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}
