"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookings } from "@/store/slices/bookingSlice";
import { Navbar } from "@/components/Navbar";
import { FooterSection as Footer } from "@/components/FooterSection";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Chip,
    Divider,
    Pagination,
    Skeleton,
    Image as HeroImage
} from "@heroui/react";
import { Calendar, MapPin, CarIcon, Clock, ShieldCheck, User } from "lucide-react";
import Image from "next/image";

export default function MyBookingsPage() {
    const dispatch = useAppDispatch();
    const { bookings, loading } = useAppSelector((state) => state.booking);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    // Only show confirmed bookings publicly
    const confirmedBookings = bookings.filter((b) => b.status === "confirmed");

    const totalPages = Math.ceil(confirmedBookings.length / itemsPerPage);
    const paginatedBookings = confirmedBookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar variant="transparent" />

            <div className="flex-1 py-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto w-full space-y-12 mt-16">
                <div className="space-y-4 text-center">
                    <h1 className="text-6xl font-black tracking-tighter text-gray-900 uppercase">Registry</h1>
                    <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs max-w-2xl mx-auto leading-loose">
                        Manifest of active fleet deployments. Authenticated reservations confirmed by oversight.
                    </p>
                    <div className="flex justify-center pt-4">
                        <div className="h-1 w-20 bg-gray-900 rounded-full" />
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="rounded-[2.5rem] shadow-none border border-gray-100 p-2">
                                <Skeleton className="rounded-[2rem] aspect-video" />
                                <div className="p-6 space-y-3">
                                    <Skeleton className="w-3/4 h-6 rounded-lg" />
                                    <Skeleton className="w-1/2 h-4 rounded-lg" />
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : confirmedBookings.length === 0 ? (
                    <Card className="rounded-[3rem] shadow-none border border-dashed border-gray-200 bg-gray-50/30 py-32 flex flex-col items-center gap-6">
                        <div className="p-8 bg-white rounded-full shadow-sm border border-gray-100">
                            <Clock className="w-12 h-12 text-gray-300 animate-pulse" />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Zero Deployments</h3>
                            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Awaiting reservation confirmation events.</p>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {paginatedBookings.map((b) => (
                                <Card key={b.id} className="shadow-none border border-gray-100 rounded-[2.5rem] bg-white group hover:border-gray-200 transition-all p-2">
                                    <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 relative shadow-inner">
                                        {b.car_img ? (
                                            <Image src={b.car_img} alt={b.car_name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <CarIcon className="w-16 h-16 text-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                        )}
                                        <div className="absolute top-6 left-6 z-10">
                                            <Chip
                                                variant="flat"
                                                color="success"
                                                className="bg-white/90 backdrop-blur-md font-black uppercase text-[8px] h-6 px-3 border border-green-100"
                                                startContent={<ShieldCheck className="w-3 h-3" />}
                                            >
                                                Confirmed
                                            </Chip>
                                        </div>
                                    </div>
                                    <CardBody className="px-6 py-8 space-y-6">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter line-clamp-1">{b.car_name}</h3>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <User className="w-3 h-3" />
                                                <p className="text-[10px] font-black uppercase tracking-widest">{b.guest_name.split(' ')[0]}***</p>
                                            </div>
                                        </div>

                                        <Divider className="opacity-50" />

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                                                <Calendar className="w-4 h-4 text-blue-600" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mission Hub</p>
                                                <p className="text-xs font-black text-gray-900 uppercase tracking-tighter truncate">{b.pickup_location.split(',')[0]}</p>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                                                <Clock className="w-4 h-4 text-orange-600" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Retrieval</p>
                                                <p className="text-xs font-black text-gray-900 uppercase tracking-tighter">{b.pickup_date}</p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center pt-10">
                                <Pagination
                                    total={totalPages}
                                    initialPage={1}
                                    page={currentPage}
                                    onChange={setCurrentPage}
                                    radius="full"
                                    showControls
                                    classNames={{
                                        wrapper: "gap-2",
                                        item: "w-10 h-10 bg-white border border-gray-100 font-bold",
                                        cursor: "bg-black text-white font-black"
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
