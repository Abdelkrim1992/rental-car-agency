"use client";

import { useState, useMemo } from "react";
import { Bell, MessageSquare, Car } from "lucide-react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { markMessageRead } from "@/store/slices/messagesSlice";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function Header() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((s) => s.auth);
    const { bookings } = useAppSelector((s) => s.booking);
    const { messages } = useAppSelector((s) => s.messages);

    // Combine and sort notifications
    const { unreadNotifications, allNotifications } = useMemo(() => {
        const mappedBookings = bookings.map(b => ({
            id: b.id,
            type: "booking" as const,
            isNew: b.status === "pending",
            title: b.status === "pending" ? "New Booking Request" : "Booking Updated",
            description: `${b.guest_name} booked ${b.car_name}`,
            time: b.created_at,
            link: `/dashboard/bookings/${b.id}`,
            status: b.status
        }));

        const mappedMessages = messages.map(m => ({
            id: m.id,
            type: "message" as const,
            isNew: m.status === "unread",
            title: m.status === "unread" ? "New Message Received" : "Message",
            description: `From ${m.name}: ${m.message.slice(0, 40)}...`,
            time: m.created_at,
            link: `/dashboard/messages`,
            status: m.status
        }));

        const combined = [...mappedBookings, ...mappedMessages].sort(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        return {
            unreadNotifications: combined.filter(n => n.isNew),
            allNotifications: combined.slice(0, 8)
        };
    }, [bookings, messages]);

    const displayList = unreadNotifications.length > 0 ? unreadNotifications : allNotifications;

    const handleMarkAllRead = () => {
        unreadNotifications.forEach(n => {
            if (n.type === "message") {
                dispatch(markMessageRead(n.id));
            }
        });
    };

    return (
        <header className="h-16 bg-background border-b sticky top-0 z-30 w-full">
            <div className="h-full px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Overview</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="flex items-center gap-2">
                    {/* Notifications Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
                                <Bell className="h-4 w-4" />
                                {unreadNotifications.length > 0 && (
                                    <span className="absolute top-2 right-2 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                                    </span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[320px] p-0">
                            <DropdownMenuLabel className="p-4 flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">Notifications</span>
                                    <span className="text-xs font-normal text-muted-foreground">
                                        {unreadNotifications.length > 0
                                            ? `You have ${unreadNotifications.length} unread alerts`
                                            : "No new notifications"}
                                    </span>
                                </div>
                                {unreadNotifications.length > 0 && (
                                    <Button variant="ghost" className="h-auto p-0 text-xs font-semibold text-primary hover:bg-transparent" onClick={handleMarkAllRead}>
                                        Mark all as read
                                    </Button>
                                )}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-[300px] overflow-y-auto">
                                {displayList.length === 0 ? (
                                    <div className="p-8 text-center flex flex-col items-center justify-center gap-1">
                                        <Bell className="h-8 w-8 text-muted-foreground/20 mb-2" />
                                        <p className="text-sm font-medium">Nothing yet!</p>
                                        <p className="text-xs text-muted-foreground">Any updates will appear here.</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        {displayList.map((n) => (
                                            <DropdownMenuItem key={`${n.type}-${n.id}`} asChild>
                                                <Link
                                                    href={n.link}
                                                    className={cn(
                                                        "flex gap-4 p-4 cursor-pointer focus:bg-accent",
                                                        n.isNew && "bg-accent/40"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-sm",
                                                        n.type === 'booking' ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-white'
                                                    )}>
                                                        {n.type === 'booking' ? <Car className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                                                    </div>
                                                    <div className="flex flex-col gap-1 overflow-hidden">
                                                        <div className="flex justify-between items-center gap-2">
                                                            <p className="text-xs font-semibold truncate">{n.title}</p>
                                                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                                                {new Date(n.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                        </div>
                                                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                                                            {n.description}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <DropdownMenuSeparator />
                            <div className="p-2">
                                <Button variant="ghost" className="w-full h-8 text-xs font-bold uppercase tracking-widest" asChild>
                                    <Link href="/dashboard/messages">View Activity Log</Link>
                                </Button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Profile */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center gap-3 h-9 px-2 hover:bg-accent rounded-full">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-bold leading-none">
                                        {user?.full_name || "Admin"}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-tighter font-bold">Administrator</p>
                                </div>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/images/dashboard/admin-avatar.png" alt="Admin" />
                                    <AvatarFallback>{user?.full_name?.charAt(0) || "A"}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/settings">Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
