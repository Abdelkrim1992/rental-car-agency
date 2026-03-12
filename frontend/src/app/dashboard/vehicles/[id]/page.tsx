"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Chip,
    Divider
} from "@heroui/react";
import { ArrowLeft, Edit, MapPin, Fuel, Car as CarIcon, ShieldCheck, Zap, Gauge, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VehicleDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { cars } = useAppSelector((state) => state.cars);

    const carId = params?.id as string;
    const car = cars.find((c) => c.id === carId);

    if (!car) {
        return (
            <div className="py-16 text-center space-y-4">
                <div className="p-4 bg-warning-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto text-warning">
                    <CarIcon className="size-8" />
                </div>
                <h2 className="text-xl font-bold">Vehicle Not Found</h2>
                <p className="text-small text-default-400">The requested vehicle record is missing.</p>
                <Button variant="flat" onPress={() => router.push("/dashboard/vehicles/all")}>
                    Back to Fleet
                </Button>
            </div>
        );
    }

    const getStatusColor = (status?: string): "success" | "primary" | "warning" => {
        const s = status?.toLowerCase() || "available";
        if (s.includes("available")) return "success";
        if (s.includes("rented")) return "primary";
        return "warning";
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button isIconOnly variant="flat" radius="full" onPress={() => router.back()}>
                        <ArrowLeft size={18} />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">{car.name}</h1>
                        <p className="text-small text-default-500">Asset ID: {car.id.slice(0, 8)}</p>
                    </div>
                </div>
                <Button
                    color="primary"
                    startContent={<Edit size={16} />}
                    as={Link}
                    href={`/dashboard/vehicles/${car.id}/edit`}
                >
                    Edit Vehicle
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left */}
                <div className="space-y-6">
                    <Card className="overflow-hidden">
                        <div className="p-2">
                            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-default-100 relative">
                                {car.img ? (
                                    <Image src={car.img} alt={car.name} fill className="object-cover" />
                                ) : (
                                    <CarIcon className="size-12 text-default-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                )}
                            </div>
                        </div>
                        <CardBody className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-small text-default-500">Status</span>
                                <Chip variant="flat" color={getStatusColor(car.status)} size="sm">
                                    {car.status || "Available"}
                                </Chip>
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between">
                                <span className="text-small text-default-500">Type</span>
                                <span className="font-semibold">{car.type}</span>
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between">
                                <span className="text-small text-default-500">Brand</span>
                                <span className="font-semibold">{car.brand}</span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="bg-primary text-primary-foreground">
                        <CardBody>
                            <p className="text-tiny opacity-70">Daily Rate</p>
                            <p className="text-3xl font-bold">
                                {car.price} <span className="text-sm opacity-70">/ day</span>
                            </p>
                        </CardBody>
                    </Card>
                </div>

                {/* Right */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                            <CardBody className="flex flex-col items-center gap-2 text-center py-6">
                                <div className="p-2 bg-primary-50 rounded-lg text-primary">
                                    <Fuel size={18} />
                                </div>
                                <p className="text-tiny text-default-400">Fuel</p>
                                <p className="font-semibold">{car.fuel || "Petrol"}</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody className="flex flex-col items-center gap-2 text-center py-6">
                                <div className="p-2 bg-danger-50 rounded-lg text-danger">
                                    <MapPin size={18} />
                                </div>
                                <p className="text-tiny text-default-400">Location</p>
                                <p className="font-semibold truncate w-full">{car.location.split(',')[0]}</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody className="flex flex-col items-center gap-2 text-center py-6">
                                <div className="p-2 bg-warning-50 rounded-lg text-warning">
                                    <Zap size={18} />
                                </div>
                                <p className="text-tiny text-default-400">Performance</p>
                                <p className="font-semibold">Premium</p>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody className="flex flex-col items-center gap-2 text-center py-6">
                                <div className="p-2 bg-success-50 rounded-lg text-success">
                                    <Gauge size={18} />
                                </div>
                                <p className="text-tiny text-default-400">Health</p>
                                <p className="font-semibold">Optimal</p>
                            </CardBody>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader className="flex items-center gap-3 pb-2">
                            <ShieldCheck className="size-5 text-success" />
                            <p className="text-large font-bold">Description</p>
                        </CardHeader>
                        <CardBody>
                            <p className="text-default-600 leading-relaxed italic border-l-4 border-primary pl-4 py-2">
                                {car.description || "This vehicle represents the pinnacle of our fleet's commitment to delivering an unparalleled driving experience to our premium clientele."}
                            </p>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader className="flex items-center gap-3 pb-2">
                            <CalendarDays className="size-5 text-primary" />
                            <p className="text-large font-bold">Availability Schedule</p>
                        </CardHeader>
                        <CardBody>
                            <div className="flex flex-wrap gap-2">
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => {
                                    const isAvailable = (car.availability_days || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).includes(day);
                                    return (
                                        <Chip
                                            key={day}
                                            variant="flat"
                                            color={isAvailable ? "success" : "default"}
                                            size="sm"
                                            className={!isAvailable ? "line-through opacity-50" : ""}
                                        >
                                            {day.slice(0, 3)}
                                        </Chip>
                                    );
                                })}
                            </div>
                            <p className="text-tiny text-default-400 mt-3">
                                Available {(car.availability_days || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).length} of 7 days per week
                            </p>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
                            <div>
                                <p className="text-large font-bold">Administrative Actions</p>
                                <p className="text-small text-default-500">Manage this vehicle</p>
                            </div>
                            <Button
                                variant="bordered"
                                as={Link}
                                href={`/dashboard/vehicles/${car.id}/edit`}
                            >
                                Edit Profile
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
