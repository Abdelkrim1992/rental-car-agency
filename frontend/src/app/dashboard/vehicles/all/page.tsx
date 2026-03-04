"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { deleteCar, fetchCars } from "@/store/slices/carsSlice";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Car, Settings2, ShieldCheck, Plus, ChevronLeft, ChevronRight, LayoutGrid, List, MoreHorizontal, Eye, Edit, Trash, MapPin, Fuel, Gauge } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AllVehiclesPage() {
    const { cars } = useAppSelector((state) => state.cars);
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState("5");
    const [viewMode, setViewMode] = useState("table");

    const rows = parseInt(rowsPerPage);
    const totalPages = Math.ceil(cars.length / rows);
    const startIndex = (currentPage - 1) * rows;
    const paginatedCars = cars.slice(startIndex, startIndex + rows);

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const handleDeleteVehicle = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to permanently delete the ${name}?`)) {
            try {
                await dispatch(deleteCar(id)).unwrap();
            } catch (err) {
                alert("Failed to delete vehicle.");
            }
        }
    };

    const getStatusBadge = (status?: string) => {
        const s = status?.toLowerCase() || "available";
        if (s.includes("available")) return <Badge className="bg-green-500 hover:bg-green-600 font-bold uppercase text-[10px]">Available</Badge>;
        if (s.includes("rented")) return <Badge variant="secondary" className="font-bold uppercase text-[10px] bg-blue-500 text-white hover:bg-blue-600">Rented</Badge>;
        return <Badge variant="destructive" className="font-bold uppercase text-[10px]">Maintenance</Badge>;
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Fleet Management</h1>
                    <p className="text-muted-foreground font-medium">Add, update, or remove vehicles from your rental inventory.</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Tabs value={viewMode} onValueChange={setViewMode} className="w-[120px]">
                        <TabsList className="grid w-full grid-cols-2 h-11">
                            <TabsTrigger value="table" className="h-9"><List className="h-4 w-4" /></TabsTrigger>
                            <TabsTrigger value="cards" className="h-9"><LayoutGrid className="h-4 w-4" /></TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Button className="h-11 px-6 shadow-lg shadow-primary/20 gap-2" asChild>
                        <Link href="/dashboard/vehicles/add">
                            <Plus className="w-4 h-4" /> Add New Vehicle
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm group hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors"><Car className="h-4 w-4" /></div>
                            Active Fleet
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black">{cars.filter(c => c.status?.toLowerCase().includes("available")).length}</div>
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground mt-1">Ready for deployment</p>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm group hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors"><Settings2 className="h-4 w-4" /></div>
                            In Service
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black">{cars.filter(c => c.status?.toLowerCase().includes("maintenance")).length}</div>
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground mt-1">Currently in maintenance</p>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm group hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><ShieldCheck className="h-4 w-4" /></div>
                            Inventory Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-blue-600">100%</div>
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground mt-1">Operational integrity</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold">Fleet Directory</CardTitle>
                    <CardDescription className="text-sm font-medium">
                        Total inventory of {cars.length} specialized vehicles.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-xl border bg-background/50 overflow-hidden">
                        {viewMode === "table" ? (
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="w-[100px] font-bold uppercase text-[10px] tracking-widest">Preview</TableHead>
                                        <TableHead className="font-bold uppercase text-[10px] tracking-widest">Vehicle Details</TableHead>
                                        <TableHead className="font-bold uppercase text-[10px] tracking-widest">Specifications</TableHead>
                                        <TableHead className="font-bold uppercase text-[10px] tracking-widest">Status</TableHead>
                                        <TableHead className="font-bold uppercase text-[10px] tracking-widest">Location</TableHead>
                                        <TableHead className="text-right font-bold uppercase text-[10px] tracking-widest">Rate</TableHead>
                                        <TableHead className="text-right font-bold uppercase text-[10px] tracking-widest">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedCars.map((car) => (
                                        <TableRow key={car.id} className="hover:bg-muted/30 transition-colors">
                                            <TableCell>
                                                <div className="h-12 w-20 relative rounded-lg overflow-hidden border bg-muted shadow-inner">
                                                    <Image
                                                        src={car.img}
                                                        alt={car.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm tracking-tight">{car.name}</span>
                                                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">{car.brand}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tight bg-white">
                                                    {car.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(car.status)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                                    <MapPin className="h-3.5 w-3.5 text-primary/50" /> {car.location}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-black text-sm tracking-tighter">
                                                {car.price} <span className="text-[9px] text-muted-foreground uppercase">/ day</span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Vehicle Options</DropdownMenuLabel>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/dashboard/vehicles/${car.id}`} className="flex items-center gap-2">
                                                                <Eye className="h-4 w-4" /> Full Profile
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/dashboard/vehicles/${car.id}/edit`} className="flex items-center gap-2">
                                                                <Edit className="h-4 w-4 text-blue-500" /> Modify Data
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleDeleteVehicle(car.id, car.name)}>
                                                            <Trash className="h-4 w-4 mr-2" /> Decommission
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="p-8 bg-muted/20">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {paginatedCars.map((car) => (
                                        <div key={car.id} className="group bg-card border-none shadow-md rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col">
                                            <div className="relative">
                                                <AspectRatio ratio={16 / 10}>
                                                    <Image src={car.img} alt={car.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                                </AspectRatio>
                                                <div className="absolute top-3 left-3">
                                                    {getStatusBadge(car.status)}
                                                </div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-1 gap-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground/60">{car.type}</span>
                                                    <span className="text-base font-black tracking-tighter text-primary">{car.price}</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="font-black text-xl tracking-tight truncate group-hover:text-primary transition-colors">{car.name}</h3>
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/80">
                                                        <MapPin className="h-3.5 w-3.5" /> {car.location}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 py-3 border-y border-dashed mt-auto">
                                                    <div className="flex flex-col gap-1 items-center flex-1">
                                                        <Fuel className="h-3 w-3 text-muted-foreground" />
                                                        <span className="text-[10px] font-bold uppercase tracking-tighter">Petrol</span>
                                                    </div>
                                                    <div className="flex flex-col gap-1 items-center flex-1 border-x border-dashed">
                                                        <Gauge className="h-3 w-3 text-muted-foreground" />
                                                        <span className="text-[10px] font-bold uppercase tracking-tighter">Auto</span>
                                                    </div>
                                                    <div className="flex flex-col gap-1 items-center flex-1">
                                                        <Settings2 className="h-3 w-3 text-muted-foreground" />
                                                        <span className="text-[10px] font-bold uppercase tracking-tighter">2024</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3 mt-4">
                                                    <Button variant="outline" className="h-10 text-xs font-bold uppercase tracking-widest border-2 hover:bg-muted" asChild>
                                                        <Link href={`/dashboard/vehicles/${car.id}`}>Details</Link>
                                                    </Button>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="default" className="h-10 text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20">Manage</Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-48">
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/dashboard/vehicles/${car.id}/edit`} className="flex items-center gap-2">
                                                                    <Edit className="h-4 w-4" /> Edit Details
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleDeleteVehicle(car.id, car.name)}>
                                                                <Trash className="h-4 w-4 mr-2" /> Delete Vehicle
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {cars.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-6 border-t bg-muted/20 gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Rows per page:</span>
                                    <Select value={rowsPerPage} onValueChange={(val) => { setRowsPerPage(val); setCurrentPage(1); }}>
                                        <SelectTrigger className="w-[80px] h-8 text-xs font-bold">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="20">20</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                                        {startIndex + 1}-{Math.min(startIndex + rows, cars.length)} OF {cars.length}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="w-10 h-10 shadow-sm"
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="w-10 h-10 shadow-sm"
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
