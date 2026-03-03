"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, RefreshCcw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Payments</h1>
                    <p className="text-sm text-slate-500">Track your incoming revenue and transaction history.</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Export CSV
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                            <Wallet className="w-4 h-4" /> Total Processed
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,450.00</div>
                        <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                            ↗ 14% this month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                        A list of all recent incoming rental payments.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="py-20 flex flex-col justify-center items-center gap-3 border rounded-md bg-slate-50/50">
                        <RefreshCcw className="w-10 h-10 text-slate-300" />
                        <span className="text-sm text-slate-500 font-medium">No transactions simulated yet</span>
                        <span className="text-xs text-slate-400">Payments from Strip/PayPal will appear here when integrated.</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
