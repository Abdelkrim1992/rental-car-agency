"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutGrid,
    Car,
    Calendar,
    CreditCard,
    BarChart2,
    Link as LinkIcon,
    Settings,
    ChevronDown,
    LogOut,
    User,
    X,
    Leaf,
    MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/store/slices/authSlice";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAppSelector((s) => s.auth);

    const [vehiclesOpen, setVehiclesOpen] = useState(pathname.includes("/vehicles"));
    const [paymentsOpen, setPaymentsOpen] = useState(pathname.includes("/payments"));

    const handleLogout = async () => {
        await dispatch(logoutUser());
        router.push("/");
    };

    const isActive = (path: string) => {
        if (path === "/dashboard" && pathname === "/dashboard") return true;
        if (path !== "/dashboard" && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 lg:hidden z-40 transition-opacity"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-full bg-slate-50 border-r border-slate-200 z-50 transition-transform duration-300",
                    "w-64 flex flex-col",
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0 bg-white">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="text-green-700 text-2xl">
                            <Leaf className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-normal text-slate-900">Renture</span>
                    </Link>
                    <button
                        onClick={onToggle}
                        className="lg:hidden text-slate-400 hover:text-slate-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 overflow-y-auto flex-1 space-y-6">

                    {/* HOME SECTION */}
                    <div className="space-y-1">
                        <p className="px-2 text-xs font-medium text-slate-400 mb-2">Home</p>
                        <Link
                            href="/dashboard"
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive("/dashboard")
                                    ? "bg-orange-100/50 text-slate-900 shadow-sm"
                                    : "text-slate-600 hover:bg-slate-100"
                            )}
                        >
                            <LayoutGrid className={cn("w-4 h-4", isActive("/dashboard") ? "text-orange-500" : "text-slate-500")} />
                            <span>Overview</span>
                        </Link>

                        {/* Vehicles Collapsible */}
                        <Collapsible
                            open={vehiclesOpen}
                            onOpenChange={setVehiclesOpen}
                            className="w-full"
                        >
                            <CollapsibleTrigger asChild>
                                <button
                                    className={cn(
                                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                        pathname.includes("/vehicles")
                                            ? "text-slate-900"
                                            : "text-slate-600 hover:bg-slate-100"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <Car className="w-4 h-4 text-slate-500" />
                                        <span>Vehicles</span>
                                    </div>
                                    <ChevronDown
                                        className={cn(
                                            "w-4 h-4 text-slate-400 transition-transform",
                                            vehiclesOpen && "rotate-180"
                                        )}
                                    />
                                </button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1 pl-10 pr-2 py-1">
                                <Link
                                    href="/dashboard/vehicles/all"
                                    className={cn(
                                        "block px-2 py-1.5 text-sm rounded-md transition-colors relative before:absolute before:left-[-1.5rem] before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-[3px] before:rounded-full before:bg-slate-300",
                                        isActive("/dashboard/vehicles/all") ? "text-slate-900 font-medium" : "text-slate-500 hover:text-slate-900"
                                    )}
                                >
                                    All Vehicles
                                </Link>
                                <Link
                                    href="/dashboard/vehicles/maintenance"
                                    className={cn(
                                        "block px-2 py-1.5 text-sm rounded-md transition-colors relative before:absolute before:left-[-1.5rem] before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-[3px] before:rounded-full before:bg-slate-300",
                                        isActive("/dashboard/vehicles/maintenance") ? "text-slate-900 font-medium" : "text-slate-500 hover:text-slate-900"
                                    )}
                                >
                                    Maintenance
                                </Link>
                                <Link
                                    href="/dashboard/vehicles/add"
                                    className={cn(
                                        "block px-2 py-1.5 text-sm rounded-md transition-colors relative before:absolute before:left-[-1.5rem] before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-[3px] before:rounded-full before:bg-slate-300",
                                        isActive("/dashboard/vehicles/add") ? "text-slate-900 font-medium" : "text-slate-500 hover:text-slate-900"
                                    )}
                                >
                                    Add Vehicle
                                </Link>
                            </CollapsibleContent>
                        </Collapsible>

                        <Link
                            href="/dashboard/bookings"
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive("/dashboard/bookings")
                                    ? "bg-slate-200 text-slate-900"
                                    : "text-slate-600 hover:bg-slate-100"
                            )}
                        >
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <span>Bookings</span>
                        </Link>

                        <Collapsible
                            open={paymentsOpen}
                            onOpenChange={setPaymentsOpen}
                            className="w-full"
                        >
                            <CollapsibleTrigger asChild>
                                <button
                                    className={cn(
                                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                                        pathname.includes("/payments")
                                            ? "text-slate-900"
                                            : "text-slate-600 hover:bg-slate-100"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="w-4 h-4 text-slate-500" />
                                        <span>Payments</span>
                                    </div>
                                    <ChevronDown
                                        className={cn(
                                            "w-4 h-4 text-slate-400 transition-transform",
                                            paymentsOpen && "rotate-180"
                                        )}
                                    />
                                </button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1 pl-10 pr-2 py-1">
                                <Link
                                    href="/dashboard/payments"
                                    className={cn(
                                        "block px-2 py-1.5 text-sm rounded-md transition-colors relative before:absolute before:left-[-1.5rem] before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-[3px] before:rounded-full before:bg-slate-300",
                                        isActive("/dashboard/payments") ? "text-slate-900 font-medium" : "text-slate-500 hover:text-slate-900"
                                    )}
                                >
                                    Payment History
                                </Link>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>

                    {/* OTHER SECTION */}
                    <div className="space-y-1">
                        <p className="px-2 text-xs font-medium text-slate-400 mb-2 mt-6">Other</p>

                        <Link
                            href="/dashboard/messages"
                            className={cn(
                                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive("/dashboard/messages")
                                    ? "bg-slate-200 text-slate-900"
                                    : "text-slate-600 hover:bg-slate-100"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-4 h-4 text-slate-500" />
                                <span>Messages</span>
                            </div>
                        </Link>

                        <Link
                            href="/dashboard/reports"
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive("/dashboard/reports")
                                    ? "bg-slate-200 text-slate-900"
                                    : "text-slate-600 hover:bg-slate-100"
                            )}
                        >
                            <BarChart2 className="w-4 h-4 text-slate-500" />
                            <span>Reports & Insights</span>
                        </Link>

                        <Link
                            href="/dashboard/integrations"
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive("/dashboard/integrations")
                                    ? "bg-slate-200 text-slate-900"
                                    : "text-slate-600 hover:bg-slate-100"
                            )}
                        >
                            <LinkIcon className="w-4 h-4 text-slate-500" />
                            <span>Integrations</span>
                        </Link>

                        <Link
                            href="/dashboard/settings"
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive("/dashboard/settings")
                                    ? "bg-slate-200 text-slate-900"
                                    : "text-slate-600 hover:bg-slate-100"
                            )}
                        >
                            <Settings className="w-4 h-4 text-slate-500" />
                            <span>Settings</span>
                        </Link>
                    </div>
                </nav>

                {/* User Info & Logout Component in a separate card container at bottom */}
                <div className="border-t border-slate-200 p-4 shrink-0 bg-white">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-slate-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">
                                {user?.full_name || "Admin"}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                                {user?.email || "admin@renture.com"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-slate-500 hover:text-red-500 text-xs transition-colors w-full px-2 py-2 rounded-lg hover:bg-red-50"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
