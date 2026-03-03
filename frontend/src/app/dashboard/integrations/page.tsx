"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link2, Webhook, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IntegrationsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Integrations</h1>
                <p className="text-sm text-slate-500">Connect your platform with third-party tools.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stripe Integration */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center text-lg">
                            Stripe
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full ring-1 ring-slate-200">Disconnected</span>
                        </CardTitle>
                        <CardDescription>Payment gateway for handling deposits and reservation fees securely.</CardDescription>
                    </CardHeader>
                    <CardFooter className="bg-slate-50 border-t flex justify-end px-6 py-3">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Link2 className="w-3.5 h-3.5" /> Connect Stripe
                        </Button>
                    </CardFooter>
                </Card>

                {/* Email/SMTP */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center text-lg">
                            Resend Email
                            <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full ring-1 ring-green-200">Active</span>
                        </CardTitle>
                        <CardDescription>Automatic confirmation emails to customers when a booking is finalized.</CardDescription>
                    </CardHeader>
                    <CardFooter className="bg-slate-50 border-t flex justify-end px-6 py-3">
                        <Button variant="outline" size="sm" className="gap-2 border-slate-300">
                            <Fingerprint className="w-3.5 h-3.5" /> Configure
                        </Button>
                    </CardFooter>
                </Card>

                {/* Webhooks */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center text-lg">
                            Webhooks
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full ring-1 ring-slate-200">Off</span>
                        </CardTitle>
                        <CardDescription>Listen to live data events across apps. Sync cars with an external CRM.</CardDescription>
                    </CardHeader>
                    <CardFooter className="bg-slate-50 border-t flex justify-end px-6 py-3">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Webhook className="w-3.5 h-3.5" /> Create Hook
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
