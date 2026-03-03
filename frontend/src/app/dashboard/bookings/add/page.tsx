"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { createBooking } from "@/store/slices/bookingSlice";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AddBookingPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
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
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Add New Booking</h1>
                    <p className="text-sm text-slate-500">Manually override and create a guest reservation.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Reservation Details</CardTitle>
                        <CardDescription>Enter the customer and vehicle specifics.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="guest_name">Customer Name</Label>
                                <Input id="guest_name" name="guest_name" required value={form.guest_name} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="guest_phone">Phone</Label>
                                <Input id="guest_phone" name="guest_phone" required value={form.guest_phone} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="guest_email">Email</Label>
                                <Input id="guest_email" name="guest_email" type="email" required value={form.guest_email} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="car_name">Vehicle Name (Exact match)</Label>
                                <Input id="car_name" name="car_name" required placeholder="e.g. Bugatti Chiron Sport" value={form.car_name} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="pickup_date">Pickup Date</Label>
                                <Input id="pickup_date" name="pickup_date" type="date" required value={form.pickup_date} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="return_date">Return Date</Label>
                                <Input id="return_date" name="return_date" type="date" required value={form.return_date} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="pickup_location">Location</Label>
                                <Input id="pickup_location" name="pickup_location" required value={form.pickup_location} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="total_price">Total Price ($)</Label>
                                <Input id="total_price" name="total_price" type="number" required value={form.total_price} onChange={handleChange} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50 border-t py-4 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" className="bg-slate-900 text-white" disabled={loading}>
                            {loading ? "Saving..." : "Create Booking"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
