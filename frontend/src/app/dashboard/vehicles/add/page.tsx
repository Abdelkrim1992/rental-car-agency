"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { createCar } from "@/store/slices/carsSlice";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

export default function AddVehiclePage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        price: "",
        type: "",
        brand: "",
        location: "",
        fuel: "",
        img: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await dispatch(createCar(form)).unwrap();
            router.push("/dashboard/vehicles/all");
        } catch (error) {
            console.error("Failed to add vehicle", error);
            alert("Failed to add vehicle: " + error);
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
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Add New Vehicle</h1>
                    <p className="text-sm text-slate-500">Register a new car to the platform catalog.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Vehicle Specifications</CardTitle>
                        <CardDescription>Fill out the essential data points for the new fleet addition.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Exact Model Name</Label>
                            <Input id="name" name="name" required placeholder="e.g. Tesla Model S" value={form.name} onChange={handleChange} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price Per Day ($)</Label>
                                <Input id="price" name="price" type="number" required placeholder="100" value={form.price} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Body Type</Label>
                                <Input id="type" name="type" required placeholder="e.g. Sedan, SUV" value={form.type} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="brand">Brand / Make</Label>
                                <Input id="brand" name="brand" required placeholder="e.g. Tesla" value={form.brand} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fuel">Fuel Type</Label>
                                <Input id="fuel" name="fuel" required placeholder="e.g. Electric, Petrol" value={form.fuel} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Station Hub / Location</Label>
                            <Input id="location" name="location" required placeholder="e.g. Downtown Hub" value={form.location} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="img">Image URL</Label>
                            <Input id="img" name="img" required placeholder="/images/lambo.png" value={form.img} onChange={handleChange} />
                            <p className="text-xs text-slate-400">Can be a local absolute path like `/images/lambo.png` or an external URL.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Detailed Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                required
                                placeholder="Describe the vehicle's features and perks."
                                value={form.description}
                                onChange={handleChange}
                                className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50 border-t py-4 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" className="bg-slate-900 text-white gap-2" disabled={loading}>
                            {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save Vehicle</>}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
