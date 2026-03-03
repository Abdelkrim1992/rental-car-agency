"use client";
import { useState, useRef } from "react";
import { reviews } from "@/data/carsData";
import { Star } from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";

export function ReviewsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const review = reviews[currentIndex];

    const handlePrev = () => setCurrentIndex((p) => (p === 0 ? reviews.length - 1 : p - 1));
    const handleNext = () => setCurrentIndex((p) => (p === reviews.length - 1 ? 0 : p + 1));

    return (
        <section id="reviews" ref={sectionRef} className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-0 py-12 md:py-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="flex flex-col lg:flex-row items-center gap-12 md:gap-16 lg:gap-20"
            >
                <div className="w-full lg:flex-1 h-[350px] md:h-[450px] rounded-3xl overflow-hidden bg-gray-100">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentIndex}
                            src={review.photo}
                            alt={review.name}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </AnimatePresence>
                </div>

                <div className="w-full lg:flex-1 flex flex-col">
                    <span className="text-gray-400 text-[10px] tracking-[0.25px] uppercase pb-3">06 Customer Reviews</span>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="text-[#111827] text-[24px] leading-[32px] font-normal font-['Inter'] pb-4">{review.title}</h3>

                            <div className="flex items-center gap-1 pb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} className={`${i < review.rating ? "text-orange-400 fill-orange-400" : "text-gray-300"}`} />
                                ))}
                            </div>

                            <p className="text-gray-500 text-[14px] leading-[22.75px] max-w-[448px] mb-8">
                                {review.text}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 max-w-[512px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                                </div>
                                <div>
                                    <p className="text-[#111827] text-[14px] leading-[20px] font-normal font-['Inter']">{review.name}</p>
                                    <p className="text-gray-400 text-[10px]">{review.location}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handlePrev}
                                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M7 13L2 8M2 8L7 3M2 8H14" stroke="#9CA3AF" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNext}
                                className="w-10 h-10 rounded-full border border-[#111827] flex items-center justify-center hover:bg-black hover:text-white transition-colors group"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M9 3L14 8M14 8L9 13M14 8H2" stroke="#111827" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors" />
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
