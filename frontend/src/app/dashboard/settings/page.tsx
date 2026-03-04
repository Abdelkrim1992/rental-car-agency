"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSettings, updateSettings } from "@/store/slices/settingsSlice";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
    Input,
    Switch,
    Tabs,
    Tab,
    Divider,
    Skeleton
} from "@heroui/react";
import { toast } from "sonner";
import { Building2, ShieldCheck, Bell, CreditCard, Save, Globe, Phone, Mail, Clock, MapPin, Gauge, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
    const dispatch = useAppDispatch();
    const { data: settings, loading } = useAppSelector((state) => state.settings);

    const [formData, setFormData] = useState({
        business_name: "",
        tagline: "",
        hero_title: "",
        hero_subtitle: "",
        phone: "",
        email: "",
        address: "",
        working_hours: "",
        stats_cars: 0,
        stats_rentals: 0,
    });

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    useEffect(() => {
        if (settings) {
            setFormData({
                business_name: settings.business_name || "",
                tagline: settings.tagline || "",
                hero_title: settings.hero_title || "",
                hero_subtitle: settings.hero_subtitle || "",
                phone: settings.phone || "",
                email: settings.email || "",
                address: settings.address || "",
                working_hours: settings.working_hours || "",
                stats_cars: settings.stats_cars || 0,
                stats_rentals: settings.stats_rentals || 0,
            });
        }
    }, [settings]);

    const handleChange = (id: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSave = async () => {
        try {
            await dispatch(updateSettings(formData)).unwrap();
            toast.success("Settings saved successfully");
        } catch (error) {
            toast.error("Failed to update settings");
        }
    };

    return (
        <div className="space-y-6 pb-12">
            <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-small text-default-500">System parameters & identity</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-64 shrink-0">
                    <Tabs
                        aria-label="Settings Categories"
                        isVertical
                        fullWidth
                        variant="light"
                        color="primary"
                    >
                        <Tab
                            key="general"
                            title={
                                <div className="flex items-center gap-3">
                                    <Building2 size={16} />
                                    <span>General</span>
                                </div>
                            }
                        />
                        <Tab
                            key="security"
                            title={
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={16} />
                                    <span>Security</span>
                                </div>
                            }
                        />
                        <Tab
                            key="notifications"
                            title={
                                <div className="flex items-center gap-3">
                                    <Bell size={16} />
                                    <span>Alerts</span>
                                </div>
                            }
                        />
                        <Tab
                            key="billing"
                            title={
                                <div className="flex items-center gap-3">
                                    <CreditCard size={16} />
                                    <span>Billing</span>
                                </div>
                            }
                        />
                    </Tabs>
                </aside>

                <main className="flex-1 max-w-4xl space-y-6">
                    <Card>
                        <CardHeader className="flex items-center gap-4 pb-2">
                            <div className="p-2 bg-primary-50 rounded-lg text-primary">
                                <Globe size={20} />
                            </div>
                            <div>
                                <p className="text-large font-bold">Identity</p>
                                <p className="text-small text-default-500">Global platform & brand profiles</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Business Name"
                                    labelPlacement="outside"
                                    placeholder="e.g. Renture Global"
                                    size="lg"
                                    variant="flat"
                                    value={formData.business_name}
                                    onValueChange={(val) => handleChange("business_name", val)}
                                />
                                <Input
                                    label="Tagline"
                                    labelPlacement="outside"
                                    placeholder="e.g. Drive Your Dreams"
                                    size="lg"
                                    variant="flat"
                                    value={formData.tagline}
                                    onValueChange={(val) => handleChange("tagline", val)}
                                />
                            </div>

                            <Input
                                label="Hero Title"
                                labelPlacement="outside"
                                placeholder="The main title seen by visitors"
                                size="lg"
                                variant="flat"
                                value={formData.hero_title}
                                onValueChange={(val) => handleChange("hero_title", val)}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Phone"
                                    labelPlacement="outside"
                                    placeholder="+1 234 567 890"
                                    size="lg"
                                    variant="flat"
                                    startContent={<Phone size={16} className="text-default-400" />}
                                    value={formData.phone}
                                    onValueChange={(val) => handleChange("phone", val)}
                                />
                                <Input
                                    label="Email"
                                    labelPlacement="outside"
                                    placeholder="admin@renture.com"
                                    size="lg"
                                    variant="flat"
                                    startContent={<Mail size={16} className="text-default-400" />}
                                    value={formData.email}
                                    onValueChange={(val) => handleChange("email", val)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Address"
                                    labelPlacement="outside"
                                    placeholder="Enter full address"
                                    size="lg"
                                    variant="flat"
                                    startContent={<MapPin size={16} className="text-default-400" />}
                                    value={formData.address}
                                    onValueChange={(val) => handleChange("address", val)}
                                />
                                <Input
                                    label="Working Hours"
                                    labelPlacement="outside"
                                    placeholder="Mon - Fri, 9AM - 6PM"
                                    size="lg"
                                    variant="flat"
                                    startContent={<Clock size={16} className="text-default-400" />}
                                    value={formData.working_hours}
                                    onValueChange={(val) => handleChange("working_hours", val)}
                                />
                            </div>

                            <Divider />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Fleet Display Count"
                                    labelPlacement="outside"
                                    type="number"
                                    size="lg"
                                    variant="flat"
                                    startContent={<Gauge size={16} className="text-default-400" />}
                                    value={formData.stats_cars.toString()}
                                    onValueChange={(val) => handleChange("stats_cars", parseInt(val) || 0)}
                                />
                                <Input
                                    label="Rentals Count"
                                    labelPlacement="outside"
                                    type="number"
                                    size="lg"
                                    variant="flat"
                                    startContent={<CheckCircle2 size={16} className="text-success" />}
                                    value={formData.stats_rentals.toString()}
                                    onValueChange={(val) => handleChange("stats_rentals", parseInt(val) || 0)}
                                />
                            </div>
                        </CardBody>
                        <CardFooter className="flex justify-between items-center border-t border-default-100">
                            <span className="text-tiny text-default-400">Auto-save: Off</span>
                            <Button
                                color="primary"
                                onPress={handleSave}
                                isLoading={loading}
                                endContent={!loading && <Save size={16} />}
                            >
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <div>
                                <p className="text-large font-bold">Automation</p>
                                <p className="text-small text-default-500">Configure automated workflows</p>
                            </div>
                        </CardHeader>
                        <CardBody className="space-y-0">
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="text-sm font-semibold">Manual Verification</p>
                                    <p className="text-tiny text-default-400">Hold incoming bookings in &apos;Pending&apos; for review</p>
                                </div>
                                <Switch color="success" defaultSelected />
                            </div>
                            <Divider />
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="text-sm font-semibold">Email Alerts</p>
                                    <p className="text-tiny text-default-400">Real-time email triggers for new bookings</p>
                                </div>
                                <Switch color="success" defaultSelected />
                            </div>
                        </CardBody>
                    </Card>
                </main>
            </div>
        </div>
    );
}
