"use client";

import { useAppSelector } from "@/store/hooks";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Car, Settings2, ShieldCheck, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AllVehiclesPage() {
    const { cars } = useAppSelector((state) => state.cars);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">All Vehicles</h1>
                    <p className="text-sm text-slate-500">Manage your fleet of rental cars.</p>
                </div>
                <Button className="bg-slate-900 text-white" asChild>
                    <Link href="/dashboard/vehicles/add">Add New Vehicle</Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Fleet Directory</CardTitle>
                    <CardDescription>
                        You have {cars.length} vehicles in your fleet.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Image</TableHead>
                                    <TableHead>Vehicle Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead className="text-right">Price/Day</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cars.map((car) => (
                                    <TableRow key={car.id}>
                                        <TableCell>
                                            <div className="h-10 w-16 relative bg-slate-100 rounded overflow-hidden">
                                                <Image
                                                    src={car.img}
                                                    alt={car.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{car.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-slate-600 font-normal">
                                                {car.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-slate-500">{car.location}</TableCell>
                                        <TableCell className="text-right font-medium">{car.price}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="secondary" size="sm" asChild>
                                                <Link href={`/dashboard/vehicles/${car.id}`}>Details</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                            <Car className="w-4 h-4" /> Active Fleet
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{cars.length}</div>
                        <p className="text-xs text-slate-400 mt-1">Ready for rent</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                            <Settings2 className="w-4 h-4" /> In Maintenance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-slate-400 mt-1">Currently being serviced</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> Insurance Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">100%</div>
                        <p className="text-xs text-slate-400 mt-1">All vehicles covered</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
