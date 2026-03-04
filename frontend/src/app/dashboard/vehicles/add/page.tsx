"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { createCar } from "@/store/slices/carsSlice";
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
import { ArrowLeft, Save, Plus, DollarSign, Car, Fuel, MapPin, Type, Image as LucideImage, ShieldCheck } from "lucide-react";

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
        status: "Available",
    });

    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
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
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button isIconOnly variant="flat" radius="full" onPress={() => router.back()}>
                    <ArrowLeft size={18} />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">New Vehicle</h1>
                    <p className="text-small text-default-500">Add to fleet inventory</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader className="flex items-center gap-3 pb-2">
                        <div className="p-2 bg-success-50 rounded-lg text-success">
                            <Plus size={18} />
                        </div>
                        <div>
                            <p className="text-large font-bold">Vehicle Specifications</p>
                            <p className="text-small text-default-500">Essential fleet data points</p>
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
                                startContent={<ShieldCheck size={16} className="text-default-400" />}
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
                                    <div className="space-y-2">
                                        <Input
                                            label="Image URL"
                                            labelPlacement="outside"
                                            placeholder="https://images.unsplash.com/..."
                                            size="lg"
                                            variant="flat"
                                            value={form.img.startsWith('data:') ? '' : form.img}
                                            onValueChange={(val) => handleChange("img", val)}
                                        />
                                        <p className="text-tiny text-default-400 italic">Override local upload with a direct link.</p>
                                    </div>

                                    <Divider />

                                    <Textarea
                                        label="Description"
                                        labelPlacement="outside"
                                        placeholder="Describe features, performance, and experience..."
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
                            Add Vehicle
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
