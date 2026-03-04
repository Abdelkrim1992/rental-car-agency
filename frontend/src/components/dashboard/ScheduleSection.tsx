"use client";

import { Search, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Car } from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { useState, useMemo } from "react";
import { Booking } from "@/store/slices/bookingSlice";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Tabs,
    Tab,
    Input,
    Avatar,
    ScrollShadow,
    Skeleton,
    Divider
} from "@heroui/react";

export function ScheduleSection() {
    const { bookings, loading } = useAppSelector((state) => state.booking);
    const [searchQuery, setSearchQuery] = useState("");
    const [range, setRange] = useState<string>("Week");

    const activeBookings = useMemo(() => {
        let filtered = bookings.filter(b => b.status === "confirmed" || b.status === "completed");
        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(b =>
                b.car_name.toLowerCase().includes(lowerQuery) ||
                b.guest_name.toLowerCase().includes(lowerQuery)
            );
        }
        return filtered.sort((a, b) => new Date(a.pickup_date).getTime() - new Date(b.pickup_date).getTime());
    }, [bookings, searchQuery]);

    const getColors = (name: string) => {
        const hash = name.length % 3;
        if (hash === 0) return { bg: "bg-primary-50", border: "border-primary-200", text: "text-primary", highlight: "bg-primary" };
        if (hash === 1) return { bg: "bg-success-50", border: "border-success-200", text: "text-success", highlight: "bg-success" };
        return { bg: "bg-secondary-50", border: "border-secondary-200", text: "text-secondary", highlight: "bg-secondary" };
    };

    const getTimelineStyle = (booking: Booking, index: number) => {
        const left = index % 3 === 0 ? "5%" : index % 3 === 1 ? "15%" : "35%";
        const width = index % 2 === 0 ? "40%" : "30%";
        return { left, width };
    };

    return (
        <Card className="h-full min-h-[400px]">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                    <p className="text-large font-bold">Vehicle Schedule</p>
                    <p className="text-small text-default-500">Operational overview</p>
                </div>
                <div className="flex items-center gap-3">
                    <Tabs
                        selectedKey={range}
                        onSelectionChange={(key) => setRange(key as string)}
                        size="sm"
                        variant="solid"
                        radius="full"
                    >
                        <Tab key="Day" title="Day" />
                        <Tab key="Week" title="Week" />
                        <Tab key="Month" title="Month" />
                    </Tabs>
                    <div className="flex gap-1">
                        <Button isIconOnly variant="flat" size="sm" radius="full">
                            <ChevronLeft className="size-4" />
                        </Button>
                        <Button isIconOnly variant="flat" size="sm" radius="full">
                            <ChevronRight className="size-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <Input
                    placeholder="Search car or guest..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    startContent={<Search className="size-4 text-default-400" />}
                    size="sm"
                    className="max-w-md"
                    variant="flat"
                />

                <Divider />

                <ScrollShadow className="flex-1">
                    {/* Weekly Headers (Desktop) */}
                    <div className="hidden md:flex items-center border-b border-default-100 mb-4 pb-2">
                        <div className="w-56 shrink-0"></div>
                        {["Week 01", "Week 02", "Week 03", "Week 04"].map((week, idx) => (
                            <div key={idx} className="flex-1 text-center border-l border-default-100 first:border-0">
                                <span className="text-tiny font-semibold text-default-400 uppercase">{week}</span>
                                {idx === 2 && (
                                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-[1000px] border-l-2 border-dashed border-danger/30 z-10 pointer-events-none">
                                        <div className="absolute top-0 -left-6 bg-danger text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                                            Today
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Skeleton className="h-12 w-56 rounded-lg" />
                                    <Skeleton className="h-10 flex-1 rounded-lg" />
                                </div>
                            ))}
                        </div>
                    ) : activeBookings.length === 0 ? (
                        <div className="py-16 flex flex-col items-center justify-center gap-2 text-default-300">
                            <CalendarIcon size={40} />
                            <p className="text-small font-medium">No scheduled bookings</p>
                        </div>
                    ) : (
                        <div className="space-y-4 pb-4">
                            {activeBookings.map((b, idx) => {
                                const colors = getColors(b.guest_name);
                                const style = getTimelineStyle(b, idx);

                                return (
                                    <div key={b.id} className="flex items-center group relative min-h-[52px]">
                                        <div className="w-56 pr-4 shrink-0 flex items-center gap-3">
                                            <div className="h-12 w-16 relative rounded-lg bg-default-100 overflow-hidden">
                                                {b.car_img ? (
                                                    <Image src={b.car_img} alt={b.car_name} fill className="object-cover" />
                                                ) : (
                                                    <div className="flex bg-default-100 h-full w-full items-center justify-center">
                                                        <Car className="size-5 text-default-300" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold truncate">{b.car_name}</p>
                                                <div className="flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                                                    <span className="text-tiny text-default-400">Scheduled</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1 relative h-12 hidden md:block">
                                            <div className="absolute inset-0 flex">
                                                <div className="flex-1 border-l border-default-100"></div>
                                                <div className="flex-1 border-l border-default-100"></div>
                                                <div className="flex-1 border-l border-default-100"></div>
                                                <div className="flex-1 border-l border-default-100"></div>
                                                <div className="border-r border-default-100"></div>
                                            </div>

                                            <div
                                                className={`absolute h-10 top-1 rounded-lg border flex items-center gap-2 px-3 ${colors.bg} ${colors.border}`}
                                                style={style}
                                            >
                                                <Avatar
                                                    name={b.guest_name}
                                                    size="sm"
                                                    className="w-6 h-6 text-tiny"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-tiny font-medium truncate ${colors.text}`}>
                                                        {b.guest_name}
                                                    </p>
                                                    <p className="text-[9px] text-default-400 truncate">
                                                        {new Date(b.pickup_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(b.return_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile */}
                                        <div className={`md:hidden flex-1 p-3 rounded-lg border ${colors.bg} ${colors.border}`}>
                                            <p className={`text-xs font-medium ${colors.text}`}>{b.guest_name}</p>
                                            <p className="text-[10px] text-default-400">
                                                {new Date(b.pickup_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(b.return_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </ScrollShadow>
            </CardBody>
        </Card>
    );
}
