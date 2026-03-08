"use client";

import Image from "next/image";
import { useState } from "react";
import { Calendar, Package, ChevronRight } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Button,
    Divider,
    Pagination,
    Chip,
    Skeleton
} from "@heroui/react";
import Link from "next/link";

interface OrderEntry {
    id: string;
    realId: string | undefined;
    vehicle: string;
    plate: string;
    customer: string;
    phone: string;
    startDate: string;
    endDate: string;
    status: string;
    avatar: string | null;
    carImage: string | null;
}

export function OrderList() {
    const { bookings, loading: bookingsLoading } = useAppSelector((s) => s.booking);
    const { cars } = useAppSelector((s) => s.cars);

    const realOrders: OrderEntry[] = bookings.map((booking, idx) => {
        const matchedCar = cars.find(c => c.name === booking.car_name || c.id === booking.car_id);

        return {
            id: booking.id?.slice(0, 8).toUpperCase() || `ORD-${idx + 1}`,
            realId: booking.id,
            vehicle: booking.car_name || "Unknown Car",
            plate: "—",
            customer: booking.guest_name || "Guest",
            phone: booking.guest_phone || "—",
            startDate: booking.pickup_date || "—",
            endDate: booking.return_date || "—",
            status: booking.status || "pending",
            avatar: null,
            carImage: matchedCar?.img || null,
        };
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(realOrders.length / itemsPerPage);
    const paginatedOrders = realOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const getStatusColor = (status: string): "default" | "primary" | "secondary" | "success" | "warning" | "danger" => {
        switch (status) {
            case "confirmed": return "success";
            case "pending": return "warning";
            case "completed": return "primary";
            case "cancelled": return "danger";
            default: return "default";
        }
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <p className="text-large font-bold">Recent Orders</p>
                    <p className="text-small text-default-500">All booking activity</p>
                </div>
                <Button
                    variant="flat"
                    size="sm"
                    as={Link}
                    href="/dashboard/bookings"
                    endContent={<ChevronRight size={14} />}
                >
                    View All
                </Button>
            </CardHeader>
            <CardBody className="py-2">
                {bookingsLoading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-4 items-center">
                                <Skeleton className="rounded-lg w-16 h-12" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-3 w-1/2 rounded-full" />
                                    <Skeleton className="h-3 w-3/4 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : realOrders.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center gap-2 text-default-400">
                        <Package size={32} />
                        <p className="text-small">No orders found</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {paginatedOrders.map((order) => (
                            <div key={order.id} className="flex flex-col gap-3 p-3 rounded-xl border border-default-100 hover:bg-default-50">
                                <div className="flex items-center gap-4">
                                    <div className="relative h-12 w-16 shrink-0 rounded-lg bg-default-100 overflow-hidden">
                                        {order.carImage ? (
                                            <Image src={order.carImage} alt={order.vehicle} fill className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-[10px] text-default-400">N/A</div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-tiny font-mono text-default-400">{order.id}</p>
                                            <Chip
                                                size="sm"
                                                variant="flat"
                                                color={getStatusColor(order.status)}
                                                className="h-4 text-[9px] uppercase font-bold"
                                            >
                                                {order.status}
                                            </Chip>
                                        </div>
                                        <p className="text-sm font-semibold truncate hover:text-primary transition-colors cursor-pointer">{order.vehicle}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link href={`/dashboard/bookings/${order.realId}`} className="flex items-center gap-2 group/customer">
                                        <Avatar
                                            name={order.customer}
                                            src={order.avatar || undefined}
                                            size="sm"
                                            className="w-6 h-6 group-hover/customer:ring-2 group-hover/customer:ring-primary transition-all"
                                        />
                                        <p className="text-tiny font-medium text-default-600 group-hover/customer:text-primary transition-colors">{order.customer}</p>
                                    </Link>
                                    <div className="flex items-center gap-1.5 text-tiny text-default-400">
                                        <Calendar size={12} className="text-primary" />
                                        {new Date(order.startDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardBody>
            {totalPages > 1 && (
                <CardFooter className="justify-center border-t border-default-100">
                    <Pagination
                        total={totalPages}
                        page={currentPage}
                        onChange={setCurrentPage}
                        size="sm"
                        radius="full"
                        variant="flat"
                        showControls
                    />
                </CardFooter>
            )}
        </Card>
    );
}
