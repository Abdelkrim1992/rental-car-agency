"use client";
import { useParams } from "next/navigation";
import { browseCars } from "@/data/carsData";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fuel, MapPin, Gauge } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/FooterSection";
import { useAppDispatch } from "@/store/hooks";
import { setBookingForm } from "@/store/slices/bookingSlice";
import { useEffect } from "react";
import { initAuth } from "@/store/slices/authSlice";

export default function CarDetailPage() {
    const params = useParams();
    const car = browseCars.find((c) => c.id === params.id);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => { dispatch(initAuth()); }, [dispatch]);

    const handleBookNow = () => {
        if (car) {
            dispatch(setBookingForm({ carId: car.id, pickupLocation: car.location }));
            router.push(`/booking?carId=${car.id}`);
        }
    };

    if (!car) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex items-center justify-center py-32">
                    <div className="text-center">
                        <h1 className="text-[48px] font-bold text-[#111827] mb-4">404</h1>
                        <p className="text-gray-500 mb-6">Car not found</p>
                        <Link href="/cars" className="bg-black text-white rounded-full px-8 py-3 text-[12px] tracking-[1px] uppercase">Browse Fleet</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-['Inter',sans-serif]">
            <Navbar />
            <div className="px-6 md:px-12 lg:px-24 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="bg-gray-100 rounded-3xl overflow-hidden">
                        <img src={car.img} alt={car.name} className="w-full h-[400px] lg:h-[500px] object-cover" />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[11px] tracking-[0.5px] uppercase">{car.type}</span>
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[11px] tracking-[0.5px] uppercase">{car.brand}</span>
                            </div>
                            <h1 className="text-[#111827] text-[32px] md:text-[40px] font-bold leading-tight mb-2">{car.name}</h1>
                            <p className="text-[#111827] text-[28px] font-semibold mb-6">{car.price}</p>
                            <p className="text-gray-500 text-[14px] leading-[24px] mb-8 max-w-[500px]">
                                {car.description || "Experience the thrill of driving this premium vehicle. Every detail has been crafted for performance and luxury."}
                            </p>
                            <div className="grid grid-cols-3 gap-6 mb-10">
                                <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
                                    <Fuel size={20} className="text-gray-400 mb-2" />
                                    <span className="text-[#111827] text-[14px] font-semibold">{car.fuel}</span>
                                    <span className="text-gray-400 text-[10px] uppercase tracking-[0.5px]">Fuel Type</span>
                                </div>
                                <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
                                    <Gauge size={20} className="text-gray-400 mb-2" />
                                    <span className="text-[#111827] text-[14px] font-semibold">{car.mileage}</span>
                                    <span className="text-gray-400 text-[10px] uppercase tracking-[0.5px]">Mileage</span>
                                </div>
                                <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
                                    <MapPin size={20} className="text-gray-400 mb-2" />
                                    <span className="text-[#111827] text-[14px] font-semibold">{car.location}</span>
                                    <span className="text-gray-400 text-[10px] uppercase tracking-[0.5px]">Location</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={handleBookNow} className="flex-1 bg-black text-white rounded-full py-4 text-center text-[12px] tracking-[1px] uppercase hover:bg-gray-800 transition-colors">
                                Book Now
                            </button>
                            <Link href="/cars" className="border border-gray-300 rounded-full px-8 py-4 text-[12px] tracking-[1px] uppercase hover:border-black transition-colors">
                                View Others
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
            <FooterSection />
        </div>
    );
}
