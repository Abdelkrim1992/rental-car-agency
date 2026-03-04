"use client";

import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Divider
} from "@heroui/react";
import { Wrench, ShieldAlert, Cpu, Gauge, Activity } from "lucide-react";

export default function MaintenancePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Maintenance</h1>
                <p className="text-small text-default-500">Fleet diagnostics & service lifecycle management.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex items-center gap-3 pb-2">
                        <div className="p-2 bg-secondary-50 rounded-lg text-secondary">
                            <Cpu size={18} />
                        </div>
                        <p className="text-tiny text-default-400">System Integrity</p>
                    </CardHeader>
                    <CardBody className="pt-0">
                        <p className="text-3xl font-bold">OPTIMAL</p>
                        <p className="text-tiny text-default-400 mt-1">All hubs synchronized</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader className="flex items-center gap-3 pb-2">
                        <div className="p-2 bg-primary-50 rounded-lg text-primary">
                            <Gauge size={18} />
                        </div>
                        <p className="text-tiny text-default-400">Performance Index</p>
                    </CardHeader>
                    <CardBody className="pt-0">
                        <p className="text-3xl font-bold">98.4%</p>
                        <p className="text-tiny text-default-400 mt-1">Across 24 active assets</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader className="flex items-center gap-3 pb-2">
                        <div className="p-2 bg-success-50 rounded-lg text-success">
                            <Activity size={18} />
                        </div>
                        <p className="text-tiny text-default-400">Uptime</p>
                    </CardHeader>
                    <CardBody className="pt-0">
                        <p className="text-3xl font-bold">99.9%</p>
                        <p className="text-tiny text-default-400 mt-1">Last 30 operational days</p>
                    </CardBody>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-warning-50 rounded-lg text-warning">
                            <Wrench size={18} />
                        </div>
                        <div>
                            <p className="text-large font-bold">Service Queue</p>
                            <p className="text-small text-default-500">Pending maintenance operations</p>
                        </div>
                    </div>
                    <Button
                        variant="flat"
                        color="danger"
                        size="sm"
                        startContent={<ShieldAlert size={16} />}
                    >
                        Report Anomaly
                    </Button>
                </CardHeader>
                <Divider />
                <CardBody className="py-16 flex flex-col justify-center items-center gap-4">
                    <div className="p-6 rounded-full bg-default-50 border-2 border-dashed border-default-200">
                        <Activity className="size-10 text-default-200 animate-pulse" />
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-medium font-semibold">Fleet operational</p>
                        <p className="text-small text-default-400 max-w-sm">
                            No active maintenance requests detected. All systems are within nominal parameters.
                        </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
