"use client";

import React from "react";
import { Card, CardBody, CardHeader, Button, Divider, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { DollarSign, TrendingUp, CreditCard, Download, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";

const performanceData = [
    { name: "Jan", revenue: 4200, expenses: 2400 },
    { name: "Feb", revenue: 3800, expenses: 2100 },
    { name: "Mar", revenue: 5600, expenses: 2800 },
    { name: "Apr", revenue: 4900, expenses: 2600 },
    { name: "May", revenue: 7200, expenses: 3200 },
    { name: "Jun", revenue: 8100, expenses: 3500 },
];

const transactions = [
    { id: "1", date: "2024-03-05", client: "Alex Thompson", amount: 450.00, status: "completed", method: "Visa" },
    { id: "2", date: "2024-03-04", client: "Maria Garcia", amount: 1200.00, status: "completed", method: "PayPal" },
    { id: "3", date: "2024-03-04", client: "James Wilson", amount: 320.00, status: "pending", method: "MasterCard" },
    { id: "4", date: "2024-03-03", client: "Sarah Chen", amount: 890.00, status: "completed", method: "Bank Transfer" },
];

export default function FinancePage() {
    const handleExportPDF = () => {
        window.print();
    };

    return (
        <div className="space-y-6 print:p-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Finance Dashboard</h1>
                    <p className="text-small text-default-500">Real-time revenue stream monitoring</p>
                </div>
                <Button
                    color="primary"
                    variant="solid"
                    startContent={<Download size={18} />}
                    onPress={handleExportPDF}
                    className="print:hidden shadow-lg"
                >
                    Export Statement
                </Button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                    <CardBody className="p-6 gap-4">
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-white/10 rounded-xl">
                                <DollarSign size={24} />
                            </div>
                            <Chip variant="flat" className="bg-white/20 text-white border-0 text-[10px]" size="sm">
                                +12.5% vs last month
                            </Chip>
                        </div>
                        <div>
                            <p className="text-white/70 text-sm font-medium">Total Revenue</p>
                            <h2 className="text-3xl font-bold">$124,592.00</h2>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-6 gap-4">
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-success-50 rounded-xl text-success">
                                <TrendingUp size={24} />
                            </div>
                            <div className="flex items-center text-success text-xs font-bold gap-0.5">
                                <ArrowUpRight size={14} /> 8%
                            </div>
                        </div>
                        <div>
                            <p className="text-default-500 text-sm font-medium">Average Order Value</p>
                            <h2 className="text-3xl font-bold text-foreground">$482.50</h2>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-6 gap-4">
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-warning-50 rounded-xl text-warning">
                                <CreditCard size={24} />
                            </div>
                            <div className="flex items-center text-danger text-xs font-bold gap-0.5">
                                <ArrowDownRight size={14} /> 2%
                            </div>
                        </div>
                        <div>
                            <p className="text-default-500 text-sm font-medium">Monthly Expenses</p>
                            <h2 className="text-3xl font-bold text-foreground">$12,450.00</h2>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="min-h-[400px]">
                    <CardHeader className="flex flex-col items-start gap-1 p-6">
                        <h3 className="font-bold text-lg">Revenue vs Expenses</h3>
                        <p className="text-tiny text-default-400">Monthly fiscal breakdown for H1 2024</p>
                    </CardHeader>
                    <CardBody className="p-2 h-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--heroui-primary))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(var(--heroui-primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--heroui-default-200))" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--heroui-default-500))' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--heroui-default-500))' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--heroui-content1))', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--heroui-primary))" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                                <Area type="monotone" dataKey="expenses" stroke="hsl(var(--heroui-default-400))" fill="transparent" strokeDasharray="5 5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>

                <Card className="min-h-[400px]">
                    <CardHeader className="flex flex-col items-start gap-1 p-6">
                        <h3 className="font-bold text-lg">Daily Booking Volume</h3>
                        <p className="text-tiny text-default-400">Fleet utilization by day of week</p>
                    </CardHeader>
                    <CardBody className="p-2 h-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--heroui-default-200))" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--heroui-default-500))' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--heroui-default-500))' }} />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--heroui-default-100))' }}
                                    contentStyle={{ backgroundColor: 'hsl(var(--heroui-content1))', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="revenue" fill="hsl(var(--heroui-primary))" radius={[4, 4, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
            </div>

            {/* Transactions Table */}
            <Card>
                <CardHeader className="p-6">
                    <h3 className="font-bold text-lg">Recent Settlements</h3>
                </CardHeader>
                <CardBody className="p-0">
                    <Table aria-label="Transactions table" removeWrapper>
                        <TableHeader>
                            <TableColumn>Client</TableColumn>
                            <TableColumn>Date</TableColumn>
                            <TableColumn>Amount</TableColumn>
                            <TableColumn>Method</TableColumn>
                            <TableColumn className="text-right">Status</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell className="font-medium text-default-700">{tx.client}</TableCell>
                                    <TableCell className="text-default-400 text-tiny">{new Date(tx.date).toLocaleDateString()}</TableCell>
                                    <TableCell className="font-bold">${tx.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-5 bg-default-100 rounded flex items-center justify-center text-[8px] font-bold text-default-500">
                                                {tx.method}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            color={tx.status === "completed" ? "success" : "warning"}
                                        >
                                            {tx.status}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );
}
