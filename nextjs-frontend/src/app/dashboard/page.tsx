"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { LayoutDashboard, CalendarDays, Car, MapPin, LogOut, Mail, Phone, User, Clock, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initAuth, logoutUser } from "@/store/slices/authSlice";
import { fetchBookings } from "@/store/slices/bookingSlice";

export default function DashboardPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user, initialized } = useAppSelector((s) => s.auth);
    const { bookings, loading: bookingsLoading } = useAppSelector((s) => s.booking);
    const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

    useEffect(() => { dispatch(initAuth()); }, [dispatch]);
    useEffect(() => {
        if (initialized && !user) router.push("/auth/login");
    }, [initialized, user, router]);
    useEffect(() => {
        if (user) dispatch(fetchBookings());
    }, [user, dispatch]);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        router.push("/");
    };

    if (!initialized || !user) {
        return (
            <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
                <p className="text-gray-400 text-[14px]">Loading...</p>
            </div>
        );
    }

    const stats = [
        { label: "Total Bookings", value: bookings.length, icon: Car, color: "bg-blue-50 text-blue-600" },
        { label: "Pending", value: bookings.filter((b) => b.status === "pending").length, icon: Clock, color: "bg-yellow-50 text-yellow-600" },
        { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, icon: CalendarDays, color: "bg-green-50 text-green-600" },
    ];

    return (
        <div className="min-h-screen bg-[#f5f5f5] font-['Inter',sans-serif] flex">
            {/* Admin Sidebar */}
            <aside className="hidden md:flex flex-col w-[260px] bg-[#111827] min-h-screen p-6 fixed left-0 top-0">
                <Link href="/" className="text-white text-[22px] tracking-[0.75px] font-normal mb-1">Renture</Link>
                <p className="text-gray-500 text-[10px] tracking-[1px] uppercase mb-10">Admin Panel</p>

                <nav className="flex flex-col gap-1 flex-1">
                    <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                        <LayoutDashboard size={16} className="text-white" />
                        <span className="text-white text-[13px]">Dashboard</span>
                    </div>
                    <Link href="/" className="text-gray-400 hover:text-white rounded-xl px-4 py-3 flex items-center gap-3 transition-colors">
                        <Car size={16} />
                        <span className="text-[13px]">View Website</span>
                    </Link>
                </nav>

                <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                            <User size={14} className="text-white" />
                        </div>
                        <div>
                            <p className="text-white text-[13px]">{user.full_name}</p>
                            <p className="text-gray-500 text-[10px]">{user.email}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-[12px] transition-colors">
                        <LogOut size={14} /> Logout
                    </button>
                </div>
            </aside>

            {/* Mobile header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-[#111827] z-50 px-4 py-3 flex items-center justify-between">
                <Link href="/" className="text-white text-[18px]">Renture</Link>
                <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-[11px]">{user.full_name}</span>
                    <button onClick={handleLogout} className="text-gray-400"><LogOut size={16} /></button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-[260px] px-6 md:px-10 py-8 md:py-10 mt-12 md:mt-0">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-[24px] md:text-[32px] font-bold text-[#111827] mb-1">Dashboard</h1>
                    <p className="text-gray-400 text-[13px] mb-8">Manage your car rental bookings</p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                    {stats.map((stat, i) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                                    <stat.icon size={16} />
                                </div>
                                <span className="text-gray-400 text-[11px] tracking-[0.5px] uppercase">{stat.label}</span>
                            </div>
                            <span className="text-[28px] font-bold text-[#111827]">{stat.value}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Bookings List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-[16px] font-semibold text-[#111827]">All Bookings</h2>
                        <span className="text-gray-400 text-[12px]">{bookings.length} total</span>
                    </div>

                    {bookingsLoading ? (
                        <div className="p-12 text-center"><p className="text-gray-400 text-[14px]">Loading bookings...</p></div>
                    ) : bookings.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-gray-400 text-[14px] mb-2">No bookings yet</p>
                            <p className="text-gray-300 text-[12px]">Bookings will appear here when guests submit requests.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {bookings.map((booking, i) => (
                                <motion.div key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                                    <button
                                        onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
                                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <h3 className="text-[14px] font-semibold text-[#111827]">{booking.car_name}</h3>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.5px] uppercase font-medium ${booking.status === "confirmed" ? "bg-green-100 text-green-600" :
                                                            booking.status === "pending" ? "bg-yellow-100 text-yellow-600" :
                                                                booking.status === "completed" ? "bg-blue-100 text-blue-600" :
                                                                    "bg-gray-100 text-gray-500"
                                                        }`}>{booking.status}</span>
                                                </div>
                                                <div className="flex items-center gap-4 mt-1 flex-wrap">
                                                    {booking.guest_name && <span className="text-gray-400 text-[11px] flex items-center gap-1"><User size={10} /> {booking.guest_name}</span>}
                                                    <span className="text-gray-400 text-[11px] flex items-center gap-1"><CalendarDays size={10} /> {booking.pickup_date}</span>
                                                    {booking.pickup_location && <span className="text-gray-400 text-[11px] flex items-center gap-1"><MapPin size={10} /> {booking.pickup_location}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[#111827] text-[14px] font-semibold hidden sm:block">${booking.total_price?.toFixed(2)}</span>
                                            {expandedBooking === booking.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                        </div>
                                    </button>

                                    {/* Expanded Details */}
                                    <AnimatePresence>
                                        {expandedBooking === booking.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                                    <div className="bg-gray-50 rounded-xl p-3">
                                                        <p className="text-gray-400 text-[10px] uppercase tracking-[0.5px] mb-1 flex items-center gap-1"><User size={10} /> Guest Name</p>
                                                        <p className="text-[#111827] text-[13px] font-medium">{booking.guest_name || "—"}</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-xl p-3">
                                                        <p className="text-gray-400 text-[10px] uppercase tracking-[0.5px] mb-1 flex items-center gap-1"><Mail size={10} /> Email</p>
                                                        <p className="text-[#111827] text-[13px] font-medium">{booking.guest_email || "—"}</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-xl p-3">
                                                        <p className="text-gray-400 text-[10px] uppercase tracking-[0.5px] mb-1 flex items-center gap-1"><Phone size={10} /> Phone</p>
                                                        <p className="text-[#111827] text-[13px] font-medium">{booking.guest_phone || "—"}</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-xl p-3">
                                                        <p className="text-gray-400 text-[10px] uppercase tracking-[0.5px] mb-1 flex items-center gap-1"><CalendarDays size={10} /> Period</p>
                                                        <p className="text-[#111827] text-[13px] font-medium">{booking.pickup_date} → {booking.return_date}</p>
                                                    </div>
                                                    {booking.guest_message && (
                                                        <div className="bg-gray-50 rounded-xl p-3 sm:col-span-2 lg:col-span-4">
                                                            <p className="text-gray-400 text-[10px] uppercase tracking-[0.5px] mb-1 flex items-center gap-1"><MessageSquare size={10} /> Message</p>
                                                            <p className="text-[#111827] text-[13px]">{booking.guest_message}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
