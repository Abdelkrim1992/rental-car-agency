"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
                <p className="text-sm text-slate-500">Manage your agency preferences and admin account.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left col - Navigation/Tabs mockup */}
                <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
                    <Button variant="secondary" className="justify-start">General</Button>
                    <Button variant="ghost" className="justify-start text-slate-600 font-normal">Security</Button>
                    <Button variant="ghost" className="justify-start text-slate-600 font-normal">Notifications</Button>
                    <Button variant="ghost" className="justify-start text-slate-600 font-normal">Billing</Button>
                </div>

                {/* Right col - Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Agency Profile</CardTitle>
                            <CardDescription>Update your brand information visible to users.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="agency-name">Business Name</Label>
                                <Input id="agency-name" defaultValue="Renture" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="support-email">Support Email</Label>
                                <Input id="support-email" defaultValue="hello@renture.com" />
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50 border-t py-4 justify-end">
                            <Button className="bg-slate-900 text-white">Save Changes</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Booking Rules</CardTitle>
                            <CardDescription>Configure automation parameters.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Require manual approval</Label>
                                    <p className="text-xs text-slate-500">Hold bookings in pending until you hit approve.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between mt-4 border-t pt-4">
                                <div className="space-y-0.5">
                                    <Label>Email Alerts</Label>
                                    <p className="text-xs text-slate-500">Receive an email instantly on new bookings.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
