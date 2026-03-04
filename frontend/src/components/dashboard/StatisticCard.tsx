import { Users, ShoppingBag, DollarSign, CreditCard, Calendar, Check, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface StatProps {
    label: string;
    value: string;
    change: string;
    changeLabel: string;
    icon: React.ReactNode;
    isPositive: boolean;
}

function StatItem({ label, value, change, changeLabel, icon, isPositive }: StatProps) {
    return (
        <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background">
                    {icon}
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <p className="text-2xl font-bold">{value}</p>
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "flex items-center gap-0.5 text-xs font-medium",
                            isPositive ? "text-green-600" : "text-destructive"
                        )}>
                            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {change}
                        </div>
                        <span className="text-xs text-muted-foreground">{changeLabel}</span>
                    </div>
                </div>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                See Detail
            </Button>
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
        const totalExpenses = totalIncome * 0.4; // Using 40% overhead model

        return {
            totalCustomers,
            totalOrders: activeBookings.length,
            totalIncome,
            totalExpenses
        };
    }, [bookings, timeRange]);

    const stats: StatProps[] = [
        {
            label: "Customer",
            value: String(filteredStats.totalCustomers),
            change: "+12%",
            changeLabel: "vs prev",
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
            isPositive: true,
        },
        {
            label: "Order",
            value: String(filteredStats.totalOrders),
            change: "+8%",
            changeLabel: "vs prev",
            icon: <ShoppingBag className="h-4 w-4 text-muted-foreground" />,
            isPositive: true,
        },
        {
            label: "Income",
            value: `$${filteredStats.totalIncome.toLocaleString()}`,
            change: "+15%",
            changeLabel: "vs prev",
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
            isPositive: true,
        },
        {
            label: "Expenses",
            value: `$${filteredStats.totalExpenses.toLocaleString()}`,
            change: "-5%",
            changeLabel: "vs prev",
            icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold">Statistic</CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-2 text-xs">
                            <Calendar className="h-3 w-3" />
                            {getRangeLabel()}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTimeRange("7_days")} className="gap-2">
                            Past 7 days
                            {timeRange === "7_days" && <Check className="h-3 w-3 ml-auto" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTimeRange("30_days")} className="gap-2">
                            Past 30 days
                            {timeRange === "30_days" && <Check className="h-3 w-3 ml-auto" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTimeRange("all_time")} className="gap-2">
                            All time
                            {timeRange === "all_time" && <Check className="h-3 w-3 ml-auto" />}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="divide-y">
                {stats.map((stat, idx) => (
                    <StatItem key={idx} {...stat} />
                ))}
            </CardContent>
        </Card>
    );
}
