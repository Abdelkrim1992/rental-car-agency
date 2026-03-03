"use client";

import { Menu, Bell } from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    const { user } = useAppSelector((s) => s.auth);

    return (
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="h-full px-4 lg:px-6 flex items-center justify-between">
                {/* Mobile menu button & Breadcrumb */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden text-gray-600 hover:text-gray-900"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Dashboard</span>
                        <span>/</span>
                        <span className="font-medium">Overview</span>
                    </div>
                </div>

                {/* Right side - Notifications & User */}
                <div className="flex items-center gap-4">
                    {/* Notification Bell */}
                    <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-900">
                                {user?.full_name || "Admin"}
                            </p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>
                        <Image
                            src="/images/dashboard/admin-avatar.png"
                            alt="User Avatar"
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
