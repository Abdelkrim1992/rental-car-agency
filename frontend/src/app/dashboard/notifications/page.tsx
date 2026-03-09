"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNotifications, markNotificationRead, markAllRead } from "@/store/slices/notificationsSlice";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Divider,
    Chip,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell
} from "@heroui/react";
import { Bell, MessageSquare, Car, CheckCheck, Trash2, Clock, Eye } from "lucide-react";
import Link from "next/link";

export default function NotificationsPage() {
    const dispatch = useAppDispatch();
    const { notifications, loading } = useAppSelector((state) => state.notifications);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    const handleMarkRead = (id: string) => {
        dispatch(markNotificationRead(id));
    };

    const handleMarkAllRead = () => {
        dispatch(markAllRead());
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Notifications</h1>
                    <p className="text-small text-default-500">Manage all your system alerts and activities</p>
                </div>
                <Button
                    color="primary"
                    variant="flat"
                    startContent={<CheckCheck size={18} />}
                    onPress={handleMarkAllRead}
                    isDisabled={notifications.length === 0}
                >
                    Mark all as read
                </Button>
            </div>

            <Card>
                <CardHeader className="flex justify-between items-center px-6 py-4">
                    <div className="flex items-center gap-2">
                        <Bell className="text-primary size-5" />
                        <span className="font-bold text-lg">Activity Stream</span>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className="p-0">
                    <Table
                        aria-label="Notifications table"
                        removeWrapper
                        className="min-h-[400px]"
                    >
                        <TableHeader>
                            <TableColumn>Source</TableColumn>
                            <TableColumn>Notification</TableColumn>
                            <TableColumn>Date & Time</TableColumn>
                            <TableColumn className="text-right">Status</TableColumn>
                            <TableColumn className="text-right">Actions</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={loading ? "Loading notifications..." : "No notifications found."}>
                            {notifications.map((n) => (
                                <TableRow key={n.id} className={n.status === "unread" ? "bg-primary-50/30" : ""}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-default-100 rounded-lg">
                                                {n.type === 'booking' ? <Car size={18} /> : <MessageSquare size={18} />}
                                            </div>
                                            <Chip size="sm" variant="flat" color={n.type === 'booking' ? 'primary' : 'success'}>
                                                {n.type}
                                            </Chip>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-0.5">
                                            <p className="font-semibold text-sm">{n.title}</p>
                                            <p className="text-tiny text-default-500 line-clamp-1">{n.description}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-default-400">
                                            <Clock size={12} />
                                            <span className="text-tiny">
                                                {new Date(n.created_at).toLocaleDateString()} at {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Chip
                                            size="sm"
                                            variant="dot"
                                            color={n.status === "unread" ? "primary" : "default"}
                                        >
                                            {n.status}
                                        </Chip>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                as={Link}
                                                href={n.type === 'booking' ? `/dashboard/bookings/${n.resource_id}` : `/dashboard/messages`}
                                                onPress={() => handleMarkRead(n.id)}
                                            >
                                                <Eye size={16} />
                                            </Button>
                                            {n.status === "unread" && (
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="primary"
                                                    onPress={() => handleMarkRead(n.id)}
                                                >
                                                    <CheckCheck size={16} />
                                                </Button>
                                            )}
                                        </div>
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
