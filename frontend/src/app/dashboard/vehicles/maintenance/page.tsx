"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wrench, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MaintenancePage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Vehicle Maintenance</h1>
                <p className="text-sm text-slate-500">Track and manage service schedules for your fleet.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Maintenance Queue</CardTitle>
                    <CardDescription>
                        Vehicles currently flagged for repair or routine checks.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="py-20 flex flex-col justify-center items-center gap-3 border rounded-md bg-slate-50/50">
                        <Wrench className="w-10 h-10 text-slate-300" />
                        <span className="text-sm text-slate-500 font-medium">All vehicles are operational</span>
                        <span className="text-xs text-slate-400">There are no records in the maintenance queue right now.</span>
                        <Button variant="outline" className="mt-4">
                            <ShieldAlert className="w-4 h-4 mr-2" />
                            Report Issue
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
