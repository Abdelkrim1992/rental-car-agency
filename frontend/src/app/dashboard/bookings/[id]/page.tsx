"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Chip,
    Divider,
    Avatar
} from "@heroui/react";
import { ArrowLeft, Edit, MapPin, Calendar, Phone, Mail, Car, Clock, CreditCard, ShieldCheck, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BookingDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { bookings } = useAppSelector((state) => state.booking);

    const bookingId = params?.id as string;
    const booking = bookings.find((b) => b.id === bookingId);

    if (!booking) {
        return (
            <div className="py-16 text-center space-y-4">
                <div className="p-4 bg-warning-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto text-warning">
                    <Calendar className="size-8" />
                </div>
                <h2 className="text-xl font-bold">Booking Not Found</h2>
                <p className="text-small text-default-400">The requested reservation record is not available.</p>
                <Button variant="flat" onPress={() => router.push("/dashboard/bookings")}>
                    Back to Bookings
                </Button>
            </div>
        );
    }

    const getStatusColor = (status?: string): "default" | "primary" | "success" | "warning" | "danger" => {
        const s = status?.toLowerCase() || "pending";
        if (s === "confirmed") return "success";
        if (s === "pending") return "warning";
        if (s === "completed") return "primary";
        return "danger";
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        isIconOnly
                        variant="flat"
                        radius="full"
                        onPress={() => router.back()}
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Booking Details</h1>
                        <p className="text-small text-default-500">ID: {booking.id.slice(0, 8)}</p>
                    </div>
                </div>
                <Button
                    color="primary"
                    startContent={<Edit size={16} />}
                    as={Link}
                    href={`/dashboard/bookings/${booking.id}/edit`}
                >
                    Edit Reservation
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <Card>
                        <CardBody className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-small text-default-500">Status</span>
                                <Chip variant="flat" color={getStatusColor(booking.status)} size="sm">
                                    {booking.status}
                                </Chip>
                            </div>
                            <Divider />
                            <div>
                                <p className="text-tiny text-default-400">Created</p>
                                <p className="text-sm font-semibold flex items-center gap-2">
                                    <Clock size={14} className="text-primary" />
                                    {new Date(booking.created_at).toLocaleString()}
                                </p>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <p className="text-large font-bold">Client Profile</p>
                        </CardHeader>
                        <CardBody className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-default-50 rounded-lg">
                                <Avatar name={booking.guest_name} color="primary" />
                                <div>
                                    <p className="font-semibold">{booking.guest_name}</p>
                                    <p className="text-tiny text-default-400">Lead Passenger</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-sm flex items-center gap-3">
                                    <Phone size={14} className="text-warning" />
                                    {booking.guest_phone || "No phone provided"}
                                </p>
                                <p className="text-sm flex items-center gap-3">
                                    <Mail size={14} className="text-primary" />
                                    <span className="break-all">{booking.guest_email || "No email"}</span>
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <p className="text-large font-bold">Vehicle</p>
                        </CardHeader>
                        <CardBody className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-full md:w-64 aspect-video rounded-lg bg-default-100 relative overflow-hidden">
                                {booking.car_img ? (
                                    <Image src={booking.car_img} alt={booking.car_name} fill className="object-cover" />
                                ) : (
                                    <Car className="size-10 text-default-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                )}
                            </div>
                            <div className="flex-1 space-y-3">
                                <h4 className="text-2xl font-bold">{booking.car_name}</h4>
                                <p className="text-small text-default-500 flex items-center gap-2">
                                    <MapPin size={14} className="text-danger" /> {booking.pickup_location}
                                </p>
                                <Button
                                    variant="flat"
                                    size="sm"
                                    endContent={<ExternalLink size={14} />}
                                    as={Link}
                                    href="/dashboard/vehicles/all"
                                >
                                    View Full Specs
                                </Button>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <p className="text-large font-bold">Booking Period</p>
                        </CardHeader>
                        <CardBody className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg bg-primary-50 flex items-center gap-4">
                                    <div className="p-2 bg-background rounded-lg shadow-sm text-primary">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-tiny text-primary font-semibold">Pickup</p>
                                        <p className="text-lg font-bold">{booking.pickup_date}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-warning-50 flex items-center gap-4">
                                    <div className="p-2 bg-background rounded-lg shadow-sm text-warning">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-tiny text-warning font-semibold">Return</p>
                                        <p className="text-lg font-bold">{booking.return_date}</p>
                                    </div>
                                </div>
                            </div>

                            <Divider />

                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-success-50 rounded-lg text-success">
                                        <CreditCard size={20} />
                                    </div>
                                    <div>
                                        <p className="text-tiny text-default-400">Total Price</p>
                                        <p className="text-3xl font-bold">${booking.total_price.toLocaleString()}</p>
                                    </div>
                                </div>
                                <Chip variant="flat" startContent={<ShieldCheck size={14} />}>
                                    Invoice Verified
                                </Chip>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
