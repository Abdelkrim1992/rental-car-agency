"use client";

import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Chip,
    Divider
} from "@heroui/react";
import { Wallet, RefreshCcw, Download, ArrowUpRight, ShieldCheck, CreditCard, Activity } from "lucide-react";

export default function PaymentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Payments</h1>
                    <p className="text-small text-default-500">Financial flow across inventory hubs.</p>
                </div>
                <Button
                    variant="solid"
                    color="default"
                    startContent={<Download size={16} />}
                >
                    Export Ledger
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex items-center gap-3 pb-2">
                        <div className="p-2 bg-success-50 rounded-lg text-success">
                            <Wallet size={18} />
                        </div>
                        <p className="text-tiny text-default-400">Total Processed</p>
                    </CardHeader>
                    <CardBody className="pt-0">
                        <p className="text-3xl font-bold">$12,450.00</p>
                        <div className="mt-2 flex items-center gap-2">
                            <Chip size="sm" color="success" variant="flat" startContent={<ArrowUpRight size={10} />}>
                                14% Growth
                            </Chip>
                            <span className="text-tiny text-default-400">This month</span>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader className="flex items-center gap-3 pb-2">
                        <div className="p-2 bg-primary-50 rounded-lg text-primary">
                            <Activity size={18} />
                        </div>
                        <p className="text-tiny text-default-400">Total Transactions</p>
                    </CardHeader>
                    <CardBody className="pt-0">
                        <p className="text-3xl font-bold">142</p>
                        <p className="text-tiny text-default-400 mt-2">Validated transactions</p>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader className="flex items-center gap-3 pb-2">
                        <div className="p-2 bg-warning-50 rounded-lg text-warning">
                            <ShieldCheck size={18} />
                        </div>
                        <p className="text-tiny text-default-400">Success Rate</p>
                    </CardHeader>
                    <CardBody className="pt-0">
                        <p className="text-3xl font-bold">99.9%</p>
                        <p className="text-tiny text-default-400 mt-2">Operational success rate</p>
                    </CardBody>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex items-center gap-3 pb-2">
                    <div className="p-2 bg-default-100 rounded-lg">
                        <CreditCard size={18} />
                    </div>
                    <div>
                        <p className="text-large font-bold">Recent Transactions</p>
                        <p className="text-small text-default-500">Real-time incoming payments</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className="py-16 flex flex-col justify-center items-center gap-4">
                    <div className="p-6 rounded-full bg-default-50 border-2 border-dashed border-default-200">
                        <RefreshCcw className="size-10 text-default-200" />
                    </div>
                    <div className="text-center space-y-1">
                        <p className="text-medium font-semibold">No transactions yet</p>
                        <p className="text-small text-default-400 max-w-sm">
                            Transaction records from integrated gateways (Stripe / PayPal) will appear here once connected.
                        </p>
                    </div>
                    <Button variant="flat" onPress={() => { }}>
                        Simulate Entry
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}
