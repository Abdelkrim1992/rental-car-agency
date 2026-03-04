"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateBooking, deleteBooking } from "@/store/slices/bookingSlice";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
    Input,
    Select,
    SelectItem,
    Divider
} from "@heroui/react";
import { ArrowLeft, Trash2, Save, User, Phone, Mail, Calendar, DollarSign } from "lucide-react";

export default function EditBookingPage() {
    const params = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const bookingId = params?.id as string;
    const { bookings } = useAppSelector((state) => state.booking);
    const booking = bookings.find((b) => b.id === bookingId);

    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [form, setForm] = useState({
        guest_name: "",
        guest_phone: "",
        guest_email: "",
        pickup_date: "",
        return_date: "",
        pickup_location: "",
        total_price: 0,
        status: "pending" as "pending" | "confirmed" | "completed" | "cancelled",
    });

    useEffect(() => {
        if (booking) {
            setForm({
                guest_name: booking.guest_name,
                guest_phone: booking.guest_phone,
                guest_email: booking.guest_email,
                pickup_date: booking.pickup_date,
                return_date: booking.return_date,
                pickup_location: booking.pickup_location,
                total_price: booking.total_price,
                status: booking.status,
            });
        }
    }, [booking]);

    if (!booking) {
        return (
            <div className="py-16 text-center space-y-4">
                <div className="p-4 bg-warning-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto text-warning">
                    <Calendar className="size-8" />
                </div>
                <h2 className="text-xl font-bold">Record Not Found</h2>
                <p className="text-small text-default-400">The requested reservation is no longer available.</p>
                <Button variant="flat" onPress={() => router.push("/dashboard/bookings")}>
                    Back to Bookings
                </Button>
            </div>
        );
    }

    const handleChange = (name: string, value: string | number) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updates = { ...form, total_price: Number(form.total_price) };
            await dispatch(updateBooking({ id: bookingId, updates })).unwrap();
            router.push(`/dashboard/bookings`);
        } catch (error) {
            console.error("Failed to update booking", error);
            alert("Failed to update booking: " + error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to permanently delete this booking?")) return;
        setDeleting(true);
        try {
            await dispatch(deleteBooking(bookingId)).unwrap();
            router.push("/dashboard/bookings");
        } catch (error) {
            console.error("Failed to delete", error);
            alert("Failed to delete booking.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button isIconOnly variant="flat" radius="full" onPress={() => router.back()}>
                        <ArrowLeft size={18} />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Booking</h1>
                        <p className="text-small text-default-500">ID: {bookingId.slice(0, 8)}</p>
                    </div>
                </div>
                <Button
                    color="danger"
                    variant="flat"
                    onPress={handleDelete}
                    isLoading={deleting}
                    startContent={!deleting && <Trash2 size={16} />}
                >
                    Delete Booking
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader className="pb-2">
                        <div>
                            <p className="text-large font-bold">Booking Details</p>
                            <p className="text-small text-default-500">Modify reservation information</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Select
                                label="Status"
                                labelPlacement="outside"
                                size="lg"
                                variant="flat"
                                selectedKeys={[form.status]}
                                onSelectionChange={(keys) => handleChange("status", Array.from(keys)[0] as string)}
                            >
                                <SelectItem key="pending">Pending</SelectItem>
                                <SelectItem key="confirmed">Confirmed</SelectItem>
                                <SelectItem key="completed">Completed</SelectItem>
                                <SelectItem key="cancelled">Cancelled</SelectItem>
                            </Select>
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

                        <Divider />

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
                                label="Phone"
                                labelPlacement="outside"
                                placeholder="Phone Number"
                                size="lg"
                                variant="flat"
                                value={form.guest_phone || ""}
                                onValueChange={(val) => handleChange("guest_phone", val)}
                                startContent={<Phone size={16} className="text-default-400" />}
                            />
                        </div>

                        <Input
                            label="Email"
                            labelPlacement="outside"
                            placeholder="customer@email.com"
                            type="email"
                            size="lg"
                            variant="flat"
                            value={form.guest_email || ""}
                            onValueChange={(val) => handleChange("guest_email", val)}
                            startContent={<Mail size={16} className="text-default-400" />}
                        />

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
                    </CardBody>
                    <CardFooter className="flex justify-between items-center border-t border-default-100">
                        <Button variant="light" onPress={() => router.back()}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            isLoading={loading}
                            endContent={!loading && <Save size={16} />}
                        >
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
