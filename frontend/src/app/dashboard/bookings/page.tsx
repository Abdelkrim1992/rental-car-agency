"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchBookings, updateBooking, deleteBooking } from "@/store/slices/bookingSlice";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Chip,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Select,
    SelectItem,
    Skeleton
} from "@heroui/react";
import { Phone, MapPin, Plus, MoreVertical, Check, X, Eye, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

export default function BookingsPage() {
    const dispatch = useAppDispatch();
    const { bookings, loading } = useAppSelector((state) => state.booking);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState("10");

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    const rows = parseInt(rowsPerPage);
    const pages = Math.ceil(bookings.length / rows);

    const items = useMemo(() => {
        const start = (currentPage - 1) * rows;
        const end = start + rows;
        return bookings.slice(start, end);
    }, [currentPage, bookings, rows]);

    const handleStatusChange = (id: string, status: "confirmed" | "cancelled") => {
        dispatch(updateBooking({ id, updates: { status } }));
    };

    const handleDeleteBooking = (id: string) => {
        if (window.confirm("Are you sure you want to permanently remove this booking?")) {
            dispatch(deleteBooking(id));
        }
    };

    const getStatusColor = (status: string): "default" | "primary" | "success" | "warning" | "danger" => {
        switch (status) {
            case "confirmed": return "success";
            case "pending": return "warning";
            case "completed": return "primary";
            case "cancelled": return "danger";
            default: return "default";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Reservations</h1>
                    <p className="text-small text-default-500">Customer booking lifecycle management</p>
                </div>
                <Button
                    color="primary"
                    endContent={<Plus size={18} />}
                    as={Link}
                    href="/dashboard/bookings/add"
                >
                    Create New Booking
                </Button>
            </div>

            <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
                    <div>
                        <p className="text-large font-bold">Booking Directory</p>
                        <p className="text-small text-default-500">
                            {bookings.length} total reservations found
                        </p>
                    </div>
                </CardHeader>
                <CardBody>
                    <Table
                        aria-label="Bookings table"
                        removeWrapper
                    >
                        <TableHeader>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Customer</TableColumn>
                            <TableColumn>Vehicle / Location</TableColumn>
                            <TableColumn className="hidden sm:table-cell">Booking Dates</TableColumn>
                            <TableColumn className="text-right hidden lg:table-cell">Revenue</TableColumn>
                            <TableColumn className="text-right">Actions</TableColumn>
                        </TableHeader>
                        <TableBody
                            loadingContent={<Skeleton className="w-full h-20" />}
                            emptyContent={
                                <div className="py-12 flex flex-col items-center justify-center gap-2 text-default-400">
                                    <Calendar size={32} />
                                    <span>No reservations found</span>
                                </div>
                            }
                        >
                            {items.map((b) => (
                                <TableRow key={b.id}>
                                    <TableCell>
                                        <Chip variant="flat" color={getStatusColor(b.status || "pending")} size="sm">
                                            {b.status || "pending"}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/dashboard/bookings/${b.id}`} className="group/customer">
                                            <div className="flex items-center gap-3">
                                                <Avatar name={b.guest_name} size="sm" className="group-hover/customer:ring-2 group-hover/customer:ring-primary transition-all" />
                                                <div>
                                                    <p className="text-sm font-semibold group-hover/customer:text-primary transition-colors">{b.guest_name}</p>
                                                    <p className="text-tiny text-default-400 flex items-center gap-1">
                                                        <Phone size={12} /> {b.guest_phone || "—"}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="text-sm font-semibold">{b.car_name}</p>
                                            <p className="text-tiny text-default-400 flex items-center gap-1">
                                                <MapPin size={12} /> {b.pickup_location}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-xs"><span className="text-default-400">From:</span> {new Date(b.pickup_date).toLocaleDateString()}</p>
                                            <p className="text-xs"><span className="text-default-400">Until:</span> {new Date(b.return_date).toLocaleDateString()}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right hidden lg:table-cell">
                                        <span className="font-semibold">
                                            ${Number(b.total_price || 0).toLocaleString()}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Dropdown placement="bottom-end">
                                            <DropdownTrigger>
                                                <Button isIconOnly variant="light" size="sm">
                                                    <MoreVertical size={18} />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Booking actions">
                                                <DropdownItem key="view" startContent={<Eye size={16} />} href={`/dashboard/bookings/${b.id}`} as={Link}>
                                                    View Details
                                                </DropdownItem>
                                                {b.status === "pending" ? (
                                                    <DropdownItem
                                                        key="confirm"
                                                        color="success"
                                                        className="text-success"
                                                        startContent={<Check size={16} />}
                                                        onPress={() => handleStatusChange(b.id, "confirmed")}
                                                    >
                                                        Confirm Booking
                                                    </DropdownItem>
                                                ) : null}
                                                <DropdownItem
                                                    key="delete"
                                                    color="danger"
                                                    className="text-danger"
                                                    startContent={<X size={16} />}
                                                    onPress={() => handleDeleteBooking(b.id)}
                                                >
                                                    {b.status === "pending" ? "Refuse Booking" : "Delete Record"}
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {!loading && bookings.length > 0 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-small text-default-500">Rows per page</span>
                                <Select
                                    size="sm"
                                    className="w-20"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectedKeys={[rowsPerPage]}
                                    onSelectionChange={(keys) => {
                                        setRowsPerPage(Array.from(keys)[0] as string);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <SelectItem key="5">5</SelectItem>
                                    <SelectItem key="10">10</SelectItem>
                                    <SelectItem key="20">20</SelectItem>
                                    <SelectItem key="50">50</SelectItem>
                                </Select>
                            </div>
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={currentPage}
                                total={pages}
                                onChange={setCurrentPage}
                            />
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}
