"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, TrendingUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Reports & Insights</h1>
                    <p className="text-sm text-slate-500">Analytics overview of your car rental operations.</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" /> Filter Range
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Fleet Utilization & Revenue Metrics</CardTitle>
                    <CardDescription>
                        Graphical data over the past 30 days is rendered here via Recharts.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="py-24 flex flex-col justify-center items-center gap-3 border border-dashed border-slate-300 rounded-md bg-slate-50">
                        <AreaChart className="w-10 h-10 text-slate-400" />
                        <span className="text-sm text-slate-500 font-medium">Chart visualization not available yet</span>
                        <span className="text-xs text-slate-400 text-center max-w-sm">We are gathering historical data to build the analytics models. Check back soon for interactive reports.</span>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-indigo-500" />
                            Top Performing Vehicles
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-slate-500 text-center py-10 border rounded-md">Analytics gathering in progress...</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            Popular Locations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-slate-500 text-center py-10 border rounded-md">Analytics gathering in progress...</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
