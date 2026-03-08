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
import { useEffect, useState } from "react";
import { initAuth } from "@/store/slices/authSlice";

export default function CarDetailPage() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { dispatch(initAuth()); }, [dispatch]);

    useEffect(() => {
        const fetchCar = async () => {
            const staticCar = browseCars.find((c) => c.id === params.id);
            if (staticCar) {
                setCar(staticCar);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://atlasrentalcar-backend.netlify.app/api'}/cars/${params.id}`);
                if (!res.ok) throw new Error("Car not found");
                const data = await res.json();
                setCar(data);
            } catch (err) {
                console.error(err);
                setCar(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [params.id]);

    const handleBookNow = () => {
        if (car) {
            dispatch(setBookingForm({ carId: car.id, pickupLocation: car.location }));
            router.push(`/booking?carId=${car.id}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar variant="transparent" />
                <div className="flex items-center justify-center py-32">
                    <p className="text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar variant="transparent" />
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
            <Navbar variant="transparent" />
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
                            <button onClick={handleBookNow} className="flex-1 bg-black text-white rounded-full py-4 text-center text-[12px] tracking-[1px] uppercase font-medium hover:bg-gray-800 transition-colors">
                                Book Now
                            </button>
                            <Link href="/cars" className="border border-gray-200 rounded-full px-8 py-4 text-[12px] tracking-[1px] uppercase hover:border-black transition-colors">
                                View Others
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Generated Content Section */}
                <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left: Detailed Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <h3 className="text-[#111827] text-[20px] font-bold mb-6">Detailed Experience</h3>
                        <div className="space-y-6 text-gray-500 text-[15px] leading-[26px]">
                            <p>
                                The {car.name} isn&apos;t just a vehicle; it&apos;s a masterpiece of {car.brand} engineering.
                                Designed for those who demand excellence, this {car.type} offers a perfect blend of power
                                and sophistication. Whether you&apos;re navigating city streets or opening it up on the highway,
                                the responsive handling and {car.fuel} engine provide an unforgettable tactile experience.
                            </p>
                            <p>
                                Inside, you&apos;ll find a cockpit tailored to the driver, featuring premium materials and
                                state-of-the-art technology. Every curve of the exterior is sculpted for aerodynamics,
                                ensuring that the {car.name} looks as fast as it feels. With only {car.mileage} miles,
                                this car is in pristine condition and ready for your next adventure in {car.location}.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-[13px] text-gray-700 font-medium">Full Insurance Coverage included</span>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-[13px] text-gray-700 font-medium">Free Delivery in {car.location}</span>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-[13px] text-gray-700 font-medium">24/7 Roadside Assistance</span>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-[13px] text-gray-700 font-medium">GPS Navigation & Bluetooth</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Reviews */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-[#111827] text-[20px] font-bold mb-6">Latest Reviews</h3>
                        <div className="space-y-8">
                            {[
                                { name: "Marco V.", date: "2 days ago", rating: 5, text: `Renting the ${car.name} was the highlight of my trip. The power is addictive!` },
                                { name: "Sarah K.", date: "1 week ago", rating: 5, text: `Immaculate condition and very smooth pickup process in ${car.location}.` },
                                { name: "Alex Ross", date: "2 weeks ago", rating: 4, text: `Amazing {car.brand} engineering. A bit pricey but worth every cent for the experience.` }
                            ].map((rev, i) => (
                                <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[14px] font-bold text-[#111827]">{rev.name}</span>
                                        <span className="text-[12px] text-gray-400">{rev.date}</span>
                                    </div>
                                    <div className="flex gap-0.5 mb-3">
                                        {[...Array(5)].map((_, star) => (
                                            <svg key={star} className={`w-3 h-3 ${star < rev.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-gray-500 text-[13px] leading-[20px] italic">&quot;{rev.text}&quot;</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
            <FooterSection />
        </div>
    );
}
