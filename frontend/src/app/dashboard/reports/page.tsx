"use client";

import { Card, CardBody, CardHeader, Button, Divider } from "@heroui/react";
import { AreaChart, TrendingUp, Filter } from "lucide-react";

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Insights</h1>
                    <p className="text-small text-default-500">Analytics & fleet performance metrics</p>
                </div>
                <Button variant="flat" startContent={<Filter size={16} />}>
                    Filter Date Range
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-2">
                    <div>
                        <p className="text-large font-bold">Fleet Utilization & Revenue</p>
                        <p className="text-small text-default-500">30-day performance window</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="py-16 flex flex-col justify-center items-center gap-3 border-2 border-dashed border-default-200 rounded-xl bg-default-50">
                        <div className="p-3 bg-background rounded-full shadow-sm">
                            <AreaChart className="size-8 text-primary" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold">Charts building in progress</p>
                            <p className="text-tiny text-default-400 mt-1 max-w-xs">Establishing historical data baseline for predictive models.</p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="flex items-center gap-3 pb-2">
                        <div className="p-2 bg-secondary-50 rounded-lg text-secondary">
                            <TrendingUp size={18} />
                        </div>
                        <p className="text-medium font-bold">Top Performing Vehicles</p>
                    </CardHeader>
                    <Divider />
                    <CardBody className="py-8 flex items-center justify-center">
                        <p className="text-tiny text-default-400">Data synchronization...</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader className="flex items-center gap-3 pb-2">
                        <div className="p-2 bg-success-50 rounded-lg text-success">
                            <TrendingUp size={18} />
                        </div>
                        <p className="text-medium font-bold">Popular Locations</p>
                    </CardHeader>
                    <Divider />
                    <CardBody className="py-8 flex items-center justify-center">
                        <p className="text-tiny text-default-400">Geographic analysis...</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
