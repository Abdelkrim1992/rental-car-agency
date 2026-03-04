"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { createBooking } from "@/store/slices/bookingSlice";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
    Input,
    Divider
} from "@heroui/react";
import { ArrowLeft, Plus, Calendar, User, Mail, Phone, MapPin, Car, DollarSign } from "lucide-react";

export default function AddBookingPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        car_id: "",
        car_name: "",
        guest_name: "",
        guest_email: "",
        guest_phone: "",
        guest_message: "",
        pickup_date: "",
        return_date: "",
        pickup_location: "",
        total_price: 0,
    });

    const handleChange = (name: string, value: string | number) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await dispatch(createBooking(form)).unwrap();
            router.push("/dashboard/bookings");
        } catch (error) {
            console.error("Failed to create booking", error);
            alert("Failed to create booking: " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button isIconOnly variant="flat" radius="full" onPress={() => router.back()}>
                    <ArrowLeft size={18} />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">New Booking</h1>
                    <p className="text-small text-default-500">Manual reservation entry</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader className="flex items-center gap-3 pb-2">
                        <div className="p-2 bg-success-50 rounded-lg text-success">
                            <Plus size={18} />
                        </div>
                        <div>
                            <p className="text-large font-bold">Reservation Details</p>
                            <p className="text-small text-default-500">Customer and vehicle specifications</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Customer Name"
                                labelPlacement="outside"
                                placeholder="Full Name"
                                size="lg"
                                variant="flat"
                                required
                                value={form.guest_name}
                                onValueChange={(val) => handleChange("guest_name", val)}
                                startContent={<User size={16} className="text-default-400" />}
                            />
                            <Input
                                label="Phone Number"
                                labelPlacement="outside"
                                placeholder="Contact Phone"
                                size="lg"
                                variant="flat"
                                required
                                value={form.guest_phone}
                                onValueChange={(val) => handleChange("guest_phone", val)}
                                startContent={<Phone size={16} className="text-default-400" />}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Email Address"
                                labelPlacement="outside"
                                placeholder="customer@email.com"
                                type="email"
                                size="lg"
                                variant="flat"
                                required
                                value={form.guest_email}
                                onValueChange={(val) => handleChange("guest_email", val)}
                                startContent={<Mail size={16} className="text-default-400" />}
                            />
                            <Input
                                label="Vehicle Name"
                                labelPlacement="outside"
                                placeholder="e.g. BMW X5"
                                size="lg"
                                variant="flat"
                                required
                                value={form.car_name}
                                onValueChange={(val) => handleChange("car_name", val)}
                                startContent={<Car size={16} className="text-default-400" />}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Pickup Date"
                                labelPlacement="outside"
                                type="date"
                                size="lg"
                                variant="flat"
                                required
                                value={form.pickup_date}
                                onValueChange={(val) => handleChange("pickup_date", val)}
                                startContent={<Calendar size={16} className="text-default-400" />}
                            />
                            <Input
                                label="Return Date"
                                labelPlacement="outside"
                                type="date"
                                size="lg"
                                variant="flat"
                                required
                                value={form.return_date}
                                onValueChange={(val) => handleChange("return_date", val)}
                                startContent={<Calendar size={16} className="text-default-400" />}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Pickup Location"
                                labelPlacement="outside"
                                placeholder="Enter full address"
                                size="lg"
                                variant="flat"
                                required
                                value={form.pickup_location}
                                onValueChange={(val) => handleChange("pickup_location", val)}
                                startContent={<MapPin size={16} className="text-default-400" />}
                            />
                            <Input
                                label="Total Price"
                                labelPlacement="outside"
                                type="number"
                                placeholder="0"
                                size="lg"
                                variant="flat"
                                required
                                value={form.total_price.toString()}
                                onValueChange={(val) => handleChange("total_price", parseInt(val) || 0)}
                                startContent={<DollarSign size={16} className="text-default-400" />}
                            />
                        </div>
                    </CardBody>
                    <CardFooter className="flex justify-between items-center border-t border-default-100">
                        <Button variant="light" onPress={() => router.back()}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            isLoading={loading}
                            endContent={!loading && <Plus size={16} />}
                        >
                            Create Booking
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
