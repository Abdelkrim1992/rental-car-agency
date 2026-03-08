"use client";
import { useRef, useState, useEffect } from "react";
import { featuredRide } from "@/data/carsData";
import svgPaths from "@/lib/svgPaths";
import { motion, useInView } from "motion/react";

function AnimatedSpecCounter({ target, inView }: { target: number; inView: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target]);

    return <>{count}</>;
}

export function FeaturedRideSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="featured-ride" ref={sectionRef} className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-0 py-8">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="relative bg-black rounded-3xl overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]"
            >
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 opacity-90"
                >
                    <img loading="lazy" decoding="async" src={featuredRide.img} alt={featuredRide.name} className="w-full h-full object-cover" />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 flex flex-col justify-between p-6 md:p-10 lg:p-12">
                    <div className="flex items-start justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col gap-2"
                        >
                            <span className="text-gray-400 text-[10px] tracking-[0.25px]">05 Featured Ride</span>
                            <h2 className="text-white text-[32px] md:text-[40px] lg:text-[48px] tracking-[1.2px] uppercase leading-[1] font-normal font-['Inter'] pb-4">
                                {featuredRide.name}
                            </h2>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="backdrop-blur-[2px] bg-black/30 border border-gray-600 rounded-full px-5 py-2 w-fit"
                            >
                                <span className="text-white text-[9px] tracking-[0.9px] uppercase">{featuredRide.badge}</span>
                            </motion.div>
                        </motion.div>
                        <motion.a
                            href="#browse"
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <span className="text-white text-[12px]">Book Now</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d={svgPaths.p3fe91380} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                            </svg>
                        </motion.a>
                    </div>

                    <div className="flex items-end justify-end gap-10 md:gap-16 lg:gap-20">
                        {featuredRide.specs.map((spec, i) => (
                            <motion.div
                                key={spec.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
                                className="flex flex-col gap-1"
                            >
                                <div className="flex items-baseline gap-1">
                                    <span className="text-white text-[28px] md:text-[36px] leading-[40px] font-normal font-['Inter']">
                                        <AnimatedSpecCounter target={spec.value} inView={isInView} />
                                    </span>
                                    <span className="text-gray-400 text-[12px]">{spec.unit}</span>
                                </div>
                                <span className="text-gray-500 text-[10px] tracking-[0.5px] uppercase">{spec.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
