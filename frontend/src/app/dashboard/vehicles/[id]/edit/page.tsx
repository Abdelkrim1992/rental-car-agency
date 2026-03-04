"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateCar, deleteCar } from "@/store/slices/carsSlice";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
    Input,
    Select,
    SelectItem,
    Textarea,
    Divider,
    Image as HeroImage
} from "@heroui/react";
import { ArrowLeft, Trash2, Save, DollarSign, Car, Fuel, MapPin, Type, Image as LucideImage } from "lucide-react";

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
        status: "Available",
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
                status: car.status || "Available",
            });
        }
    }, [car]);

    if (!car) {
        return (
            <div className="py-16 text-center space-y-4">
                <div className="p-4 bg-warning-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto text-warning">
                    <Car className="size-8" />
                </div>
                <h2 className="text-xl font-bold">Vehicle Not Found</h2>
                <p className="text-small text-default-400">The requested vehicle record does not exist.</p>
                <Button variant="flat" onPress={() => router.push("/dashboard/vehicles/all")}>
                    Back to Fleet
                </Button>
            </div>
        );
    }

    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
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
                    description: form.description,
                    status: form.status
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
        if (!confirm("Are you sure you want to permanently delete this vehicle?")) return;
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
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button isIconOnly variant="flat" radius="full" onPress={() => router.back()}>
                        <ArrowLeft size={18} />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Vehicle</h1>
                        <p className="text-small text-default-500">ID: {carId.slice(0, 8)}</p>
                    </div>
                </div>
                <Button
                    color="danger"
                    variant="flat"
                    onPress={handleDelete}
                    isLoading={deleting}
                    startContent={!deleting && <Trash2 size={16} />}
                >
                    Delete Vehicle
                </Button>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader className="pb-2">
                        <div>
                            <p className="text-large font-bold">Vehicle Details</p>
                            <p className="text-small text-default-500">Modify vehicle profile</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="space-y-6">
                        <Input
                            label="Model Name"
                            labelPlacement="outside"
                            placeholder="e.g. Tesla Model S Plaid"
                            size="lg"
                            variant="flat"
                            required
                            value={form.name}
                            onValueChange={(val) => handleChange("name", val)}
                            startContent={<Car size={16} className="text-default-400" />}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Daily Rate"
                                labelPlacement="outside"
                                type="number"
                                placeholder="0"
                                size="lg"
                                variant="flat"
                                required
                                value={form.price}
                                onValueChange={(val) => handleChange("price", val)}
                                startContent={<DollarSign size={16} className="text-default-400" />}
                            />
                            <Input
                                label="Body Type"
                                labelPlacement="outside"
                                placeholder="e.g. Sedan, SUV"
                                size="lg"
                                variant="flat"
                                required
                                value={form.type}
                                onValueChange={(val) => handleChange("type", val)}
                                startContent={<Type size={16} className="text-default-400" />}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Brand"
                                labelPlacement="outside"
                                placeholder="e.g. Tesla"
                                size="lg"
                                variant="flat"
                                required
                                value={form.brand}
                                onValueChange={(val) => handleChange("brand", val)}
                                startContent={<Type size={16} className="text-default-400" />}
                            />
                            <Input
                                label="Fuel / Power"
                                labelPlacement="outside"
                                placeholder="e.g. Electric, Petrol"
                                size="lg"
                                variant="flat"
                                required
                                value={form.fuel}
                                onValueChange={(val) => handleChange("fuel", val)}
                                startContent={<Fuel size={16} className="text-default-400" />}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Location"
                                labelPlacement="outside"
                                placeholder="e.g. Downtown Hub"
                                size="lg"
                                variant="flat"
                                required
                                value={form.location}
                                onValueChange={(val) => handleChange("location", val)}
                                startContent={<MapPin size={16} className="text-default-400" />}
                            />
                            <Select
                                label="Status"
                                labelPlacement="outside"
                                size="lg"
                                variant="flat"
                                selectedKeys={[form.status]}
                                onSelectionChange={(keys) => handleChange("status", Array.from(keys)[0] as string)}
                            >
                                <SelectItem key="Available">Available</SelectItem>
                                <SelectItem key="Rented">Rented</SelectItem>
                                <SelectItem key="Maintenance">Maintenance</SelectItem>
                            </Select>
                        </div>

                        <Divider />

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <LucideImage size={16} className="text-default-400" />
                                <span className="text-small text-default-500 font-medium">Visual Assets</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="rounded-xl border-2 border-dashed border-default-200 bg-default-50 aspect-square flex flex-col items-center justify-center relative overflow-hidden">
                                        {form.img ? (
                                            <HeroImage
                                                src={form.img}
                                                alt="Vehicle Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-default-300 flex flex-col items-center gap-2">
                                                <Car className="size-12" />
                                                <span className="text-tiny">No preview</span>
                                            </div>
                                        )}
                                    </div>
                                    <Button variant="flat" className="w-full" as="label" htmlFor="img_upload">
                                        Upload Image
                                        <input
                                            type="file"
                                            id="img_upload"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (event) => {
                                                        handleChange("img", event.target?.result as string);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </Button>
                                </div>

                                <div className="space-y-6 flex flex-col justify-center">
                                    <Input
                                        label="Image URL"
                                        labelPlacement="outside"
                                        placeholder="https://images.unsplash.com/..."
                                        size="lg"
                                        variant="flat"
                                        value={form.img.startsWith('data:') ? '' : form.img}
                                        onValueChange={(val) => handleChange("img", val)}
                                    />

                                    <Divider />

                                    <Textarea
                                        label="Description"
                                        labelPlacement="outside"
                                        placeholder="Describe the vehicle..."
                                        size="lg"
                                        variant="flat"
                                        required
                                        minRows={5}
                                        value={form.description}
                                        onValueChange={(val) => handleChange("description", val)}
                                    />
                                </div>
                            </div>
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
