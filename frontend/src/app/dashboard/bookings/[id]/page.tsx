"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, MapPin, Calendar, User, Phone, Mail, Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function BookingDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { bookings } = useAppSelector((state) => state.booking);

    // Fallback ID checking
    const bookingId = params?.id as string;
    const booking = bookings.find((b) => b.id === bookingId);

    if (!booking) {
        return (
            <div className="p-10 text-center space-y-4">
                <p className="text-slate-500">Booking not found in local state.</p>
                <Button variant="outline" onClick={() => router.push("/dashboard/bookings")}>Go Back</Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Booking #{booking.id.slice(0, 5)}</h1>
                        <p className="text-sm text-slate-500">Placed on {new Date(booking.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
                <Button variant="outline" className="gap-2" asChild>
                    <Link href={`/dashboard/bookings/${booking.id}/edit`}>
                        <Edit className="w-4 h-4" /> Edit Booking
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Col - Overview */}
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                {booking.status === "confirmed" && <Badge className="bg-green-500 text-sm px-3 py-1">Confirmed</Badge>}
                                {booking.status === "pending" && <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50 text-sm px-3 py-1">Pending</Badge>}
                                {booking.status === "completed" && <Badge className="bg-blue-500 text-sm px-3 py-1">Completed</Badge>}
                                {booking.status === "cancelled" && <Badge variant="secondary" className="text-sm px-3 py-1">Cancelled</Badge>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Customer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <span className="flex items-center gap-2 text-sm text-slate-500"><User className="w-4 h-4" /> Name</span>
                                <span className="font-medium block">{booking.guest_name}</span>
                            </div>
                            <div className="space-y-1">
                                <span className="flex items-center gap-2 text-sm text-slate-500"><Phone className="w-4 h-4" /> Phone</span>
                                <span className="font-medium block">{booking.guest_phone || "—"}</span>
                            </div>
                            <div className="space-y-1">
                                <span className="flex items-center gap-2 text-sm text-slate-500"><Mail className="w-4 h-4" /> Email</span>
                                <span className="font-medium block break-all">{booking.guest_email || "—"}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Col - Details */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Vehicle Details</CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-6 items-center">
                            {booking.car_img ? (
                                <div className="w-32 h-20 relative bg-slate-100 rounded-lg overflow-hidden shrink-0 hidden sm:block">
                                    <Image src={booking.car_img} alt={booking.car_name} fill className="object-cover" />
                                </div>
                            ) : (
                                <div className="w-32 h-20 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 hidden sm:flex">
                                    <Car className="w-8 h-8 text-slate-300" />
                                </div>
                            )}
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">{booking.car_name}</h3>
                                <p className="text-sm text-slate-500 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> {booking.pickup_location}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Reservation Timeline</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1 bg-slate-50 p-4 rounded border">
                                    <span className="flex items-center gap-2 text-sm text-slate-500"><Calendar className="w-4 h-4 text-blue-500" /> Drop-off</span>
                                    <span className="font-bold block text-lg">{booking.pickup_date}</span>
                                </div>
                                <div className="space-y-1 bg-slate-50 p-4 rounded border">
                                    <span className="flex items-center gap-2 text-sm text-slate-500"><Calendar className="w-4 h-4 text-orange-500" /> Return</span>
                                    <span className="font-bold block text-lg">{booking.return_date}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t flex justify-between items-center">
                                <span className="text-slate-500 font-medium">Total Amount Due</span>
                                <span className="text-3xl font-bold tracking-tight">${booking.total_price.toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
