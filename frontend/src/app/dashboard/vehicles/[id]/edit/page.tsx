"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateCar, deleteCar } from "@/store/slices/carsSlice";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Save } from "lucide-react";

export default function EditVehiclePage() {
    const params = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const carId = params?.id as string;
    const { cars } = useAppSelector((state) => state.cars);
    const car = cars.find((c) => c.id === carId);

    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

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

    useEffect(() => {
        if (car) {
            setForm({
                name: car.name,
                price: car.price?.replace(/[^0-9.]/g, '') || "0",
                type: car.type,
                brand: car.brand,
                location: car.location,
                fuel: car.fuel,
                img: car.img,
                description: car.description || "",
            });
        }
    }, [car]);

    if (!car) {
        return (
            <div className="p-10 text-center space-y-4">
                <p className="text-slate-500">Vehicle not found.</p>
                <Button variant="outline" onClick={() => router.push("/dashboard/vehicles/all")}>Go Back</Button>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await dispatch(updateCar({
                id: carId, updates: {
                    name: form.name,
                    price: form.price,
                    type: form.type,
                    brand: form.brand,
                    location: form.location,
                    fuel: form.fuel,
                    img: form.img,
                    description: form.description
                }
            })).unwrap();
            router.push(`/dashboard/vehicles/${carId}`);
        } catch (error) {
            console.error("Failed to update vehicle", error);
            alert("Failed to update vehicle: " + error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to permanently delete this vehicle? Actions cannot be undone.")) return;
        setDeleting(true);
        try {
            await dispatch(deleteCar(carId)).unwrap();
            router.push("/dashboard/vehicles/all");
        } catch (error) {
            console.error("Failed to delete", error);
            alert("Failed to delete vehicle.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Edit Asset</h1>
                        <p className="text-sm text-slate-500">#{carId.slice(0, 8)}</p>
                    </div>
                </div>
                <Button variant="destructive" className="gap-2 shrink-0" onClick={handleDelete} disabled={deleting}>
                    <Trash2 className="w-4 h-4" /> {deleting ? "Deleting..." : "Delete Asset"}
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Vehicle Specifications</CardTitle>
                        <CardDescription>Update identity or operating details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Exact Model Name</Label>
                            <Input id="name" name="name" required value={form.name} onChange={handleChange} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price Per Day ($)</Label>
                                <Input id="price" name="price" type="number" required value={form.price} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Body Type</Label>
                                <Input id="type" name="type" required value={form.type} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="brand">Brand / Make</Label>
                                <Input id="brand" name="brand" required value={form.brand} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fuel">Fuel Type</Label>
                                <Input id="fuel" name="fuel" required value={form.fuel} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Station Hub / Location</Label>
                            <Input id="location" name="location" required value={form.location} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="img">Image URL</Label>
                            <Input id="img" name="img" value={form.img} onChange={handleChange} />
                            <p className="text-xs text-slate-400">Can be a local absolute path like `/images/lambo.png` or an external URL.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Detailed Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                required
                                value={form.description}
                                onChange={handleChange}
                                className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50 border-t py-4 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" className="bg-slate-900 text-white gap-2" disabled={loading}>
                            {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
