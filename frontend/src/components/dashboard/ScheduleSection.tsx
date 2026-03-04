import { Search, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { useState, useMemo } from "react";
import { Booking } from "@/store/slices/bookingSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ScheduleSection() {
    const { bookings, loading } = useAppSelector((state) => state.booking);
    const [searchQuery, setSearchQuery] = useState("");
    const [range, setRange] = useState<string>("Week");

    // Filter to confirmed/completed bookings mapped visually.
    const activeBookings = useMemo(() => {
        let filtered = bookings.filter(b => b.status === "confirmed" || b.status === "completed");

        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(b =>
                b.car_name.toLowerCase().includes(lowerQuery) ||
                b.guest_name.toLowerCase().includes(lowerQuery)
            );
        }

        // Just sorting them by date for nice display
        return filtered.sort((a, b) => new Date(a.pickup_date).getTime() - new Date(b.pickup_date).getTime());
    }, [bookings, searchQuery]);

    // Simple pseudo-random color mapping based on index or car name length for UI variety
    const getColors = (name: string) => {
        const hash = name.length % 3;
        if (hash === 0) return { bg: "bg-blue-50/50", border: "border-blue-100", text: "text-blue-900", date: "text-blue-500" };
        if (hash === 1) return { bg: "bg-green-50/50", border: "border-green-100", text: "text-green-900", date: "text-green-500" };
        return { bg: "bg-purple-50/50", border: "border-purple-100", text: "text-purple-900", date: "text-purple-500" };
    };

    const getTimelineStyle = (booking: Booking, index: number) => {
        // Mock timeline math: roughly maps to visual boxes spreading across the grid depending on index.
        const left = index % 3 === 0 ? "5%" : index % 3 === 1 ? "15%" : "35%";
        const width = index % 2 === 0 ? "40%" : "30%";
        return { left, width };
    };

    return (
        <Card className="flex flex-col h-full min-h-[400px]">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
                <CardTitle className="text-lg font-semibold">Schedule Car</CardTitle>
                <div className="flex items-center gap-4">
                    <Tabs value={range} onValueChange={setRange} className="w-auto">
                        <TabsList className="h-9">
                            <TabsTrigger value="Day" className="text-xs">Day</TabsTrigger>
                            <TabsTrigger value="Week" className="text-xs">Week</TabsTrigger>
                            <TabsTrigger value="Month" className="text-xs">Month</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 p-0">
                <div className="px-6 pb-4 shrink-0">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                            placeholder="Search car or guest..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-9 text-xs"
                        />
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="px-6 pb-6">
                        {/* Weekly Headers (Desktop) */}
                        <div className="hidden md:flex items-center border-b mb-4 pb-2">
                            <div className="w-48 shrink-0"></div>
                            {["Week 01", "Week 02", "Week 03", "Week 04"].map((week, idx) => (
                                <div key={idx} className="flex-1 text-center relative border-l first:border-0 h-6">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{week}</span>
                                    {idx === 2 && (
                                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-px h-[1000px] border-l border-dashed border-red-400 z-10 pointer-events-none">
                                            <div className="absolute -top-6 -left-3.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                                                Today
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Rows */}
                        {loading ? (
                            <div className="text-center py-12 text-sm text-muted-foreground italic">Loading schedule...</div>
                        ) : activeBookings.length === 0 ? (
                            <div className="text-center py-12 text-sm text-muted-foreground italic">No active bookings found.</div>
                        ) : (
                            <div className="space-y-4">
                                {activeBookings.map((b, idx) => {
                                    const colors = getColors(b.guest_name);
                                    const style = getTimelineStyle(b, idx);

                                    return (
                                        <div key={b.id} className="flex items-center group relative min-h-[52px]">
                                            <div className="w-48 pr-4 shrink-0 flex items-center gap-3">
                                                <div className="h-10 w-10 relative rounded-md bg-muted overflow-hidden border">
                                                    {b.car_img ? (
                                                        <Image src={b.car_img} alt={b.car_name} fill className="object-cover" />
                                                    ) : (
                                                        <CalendarIcon className="h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/30" />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold truncate leading-tight">{b.car_name}</p>
                                                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">Scheduled</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 relative h-10 hidden md:block">
                                                {/* Grid lines background */}
                                                <div className="absolute inset-0 flex">
                                                    <div className="flex-1 border-l border-muted/30"></div>
                                                    <div className="flex-1 border-l border-muted/30"></div>
                                                    <div className="flex-1 border-l border-muted/30"></div>
                                                    <div className="flex-1 border-l border-muted/30"></div>
                                                </div>

                                                <div
                                                    className={cn(
                                                        "absolute h-9 top-0.5 rounded-md border flex items-center gap-2 px-2 shadow-sm transition-all z-20 hover:ring-2 hover:ring-offset-1 hover:ring-primary/20",
                                                        colors.bg,
                                                        colors.border
                                                    )}
                                                    style={style}
                                                >
                                                    <Avatar className="h-6 w-6 border-0">
                                                        <AvatarFallback className="text-[10px] font-bold bg-white/50">{b.guest_name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={cn("text-[10px] font-bold truncate leading-none mb-1", colors.text)}>
                                                            {b.guest_name}
                                                        </p>
                                                        <p className={cn("text-[9px] font-medium truncate leading-none", colors.date)}>
                                                            {new Date(b.pickup_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(b.return_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Mobile Item List Style */}
                                            <div className={cn(
                                                "md:hidden flex-1 p-2 rounded-md border",
                                                colors.bg,
                                                colors.border
                                            )}>
                                                <p className={cn("text-xs font-bold mb-1", colors.text)}>{b.guest_name}</p>
                                                <p className={cn("text-[10px] font-medium", colors.date)}>
                                                    {new Date(b.pickup_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(b.return_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
