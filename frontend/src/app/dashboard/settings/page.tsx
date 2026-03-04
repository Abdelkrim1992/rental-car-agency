"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSettings, updateSettings } from "@/store/slices/settingsSlice";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === 'number' ? Number(value) : value
        }));
    };

    const handleSave = async () => {
        try {
            await dispatch(updateSettings(formData)).unwrap();
            toast.success("Settings synchronized successfully");
        } catch (error) {
            toast.error("Failed to update system settings");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Control Center</h1>
                <p className="text-muted-foreground font-medium">Fine-tune your platform's operational parameters and brand identity.</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="lg:w-64 space-y-4">
                        <TabsList className="flex lg:flex-col h-auto bg-transparent p-0 gap-1 space-y-1">
                            <TabsTrigger value="general" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-primary/5 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/10 transition-all font-bold uppercase text-[10px] tracking-widest gap-3 w-full">
                                <Building2 className="h-4 w-4" /> General
                            </TabsTrigger>
                            <TabsTrigger value="security" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-primary/5 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/10 transition-all font-bold uppercase text-[10px] tracking-widest gap-3 w-full">
                                <ShieldCheck className="h-4 w-4" /> Security
                            </TabsTrigger>
                            <TabsTrigger value="notifications" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-primary/5 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/10 transition-all font-bold uppercase text-[10px] tracking-widest gap-3 w-full">
                                <Bell className="h-4 w-4" /> Alerts
                            </TabsTrigger>
                            <TabsTrigger value="billing" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-primary/5 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/10 transition-all font-bold uppercase text-[10px] tracking-widest gap-3 w-full">
                                <CreditCard className="h-4 w-4" /> Financials
                            </TabsTrigger>
                        </TabsList>
                    </aside>

                    <div className="flex-1 max-w-4xl">
                        <TabsContent value="general" className="mt-0 space-y-8 animate-in slide-in-from-right-2 duration-300">
                            <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-6 border-b bg-muted/20">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                            <Globe className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl font-bold">Global Identity</CardTitle>
                                            <CardDescription className="text-xs font-medium">Public-facing brand profile and SEO metadata.</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-8 pt-8 px-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label htmlFor="business_name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Legal Entity Name</Label>
                                            <Input id="business_name" value={formData.business_name} onChange={handleChange} className="h-11 border-muted/60 focus:ring-primary/20 bg-background/50 font-bold" />
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="tagline" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Marketing Tagline</Label>
                                            <Input id="tagline" value={formData.tagline} onChange={handleChange} className="h-11 border-muted/60 focus:ring-primary/20 bg-background/50" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="hero_title" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Frontpage Headline</Label>
                                        <Input id="hero_title" value={formData.hero_title} onChange={handleChange} className="h-11 border-muted/60 focus:ring-primary/20 bg-background/50" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2"><Phone className="h-3 w-3" /> Direct Support Line</Label>
                                            <Input id="phone" value={formData.phone} onChange={handleChange} className="h-11 border-muted/60 focus:ring-primary/20 bg-background/50" />
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2"><Mail className="h-3 w-3" /> System Inbound Email</Label>
                                            <Input id="email" type="email" value={formData.email} onChange={handleChange} className="h-11 border-muted/60 focus:ring-primary/20 bg-background/50" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label htmlFor="address" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2"><MapPin className="h-3 w-3" /> Physical HQ Address</Label>
                                            <Input id="address" value={formData.address} onChange={handleChange} className="h-11 border-muted/60 focus:ring-primary/20 bg-background/50 font-medium" />
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="working_hours" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2"><Clock className="h-3 w-3" /> Operational Window</Label>
                                            <Input id="working_hours" value={formData.working_hours} onChange={handleChange} className="h-11 border-muted/60 focus:ring-primary/20 bg-background/50" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-dashed">
                                        <div className="space-y-3">
                                            <Label htmlFor="stats_cars" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2"><Gauge className="h-3 w-3" /> Fleet Display Metric</Label>
                                            <Input id="stats_cars" type="number" value={formData.stats_cars} onChange={handleChange} className="h-11 border-muted/60 focus:ring-primary/20 bg-background/50 font-black" />
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="stats_rentals" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500" /> Success Indicator</Label>
                                            <Input id="stats_rentals" type="number" value={formData.stats_rentals} onChange={handleChange} className="h-11 border-muted/60 focus:ring-primary/20 bg-background/50 font-black" />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-muted/30 border-t py-6 px-8 justify-between items-center">
                                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Last synced: Just now</p>
                                    <Button className="h-11 px-8 shadow-xl shadow-primary/20 gap-2 font-bold uppercase text-xs tracking-widest" onClick={handleSave} disabled={loading}>
                                        {loading ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span> : <Save className="h-4 w-4" />}
                                        {loading ? "Process..." : "Apply Config"}
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-lg font-bold">Operational Workflow</CardTitle>
                                    <CardDescription className="text-xs font-medium">Configure automated booking logic and alerts.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-0 px-0">
                                    <div className="flex items-center justify-between px-8 py-6 hover:bg-muted/20 transition-colors">
                                        <div className="space-y-1">
                                            <Label className="text-sm font-bold">Manual Verification Protocol</Label>
                                            <p className="text-[11px] text-muted-foreground font-medium">Hold all incoming bookings in 'Pending' state for manual review.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between px-8 py-6 hover:bg-muted/20 transition-colors border-t border-dashed">
                                        <div className="space-y-1">
                                            <Label className="text-sm font-bold">Instant Dispatch Alerts</Label>
                                            <p className="text-[11px] text-muted-foreground font-medium">Push real-time email notifications for every new customer request.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}
