"use client";

import { Navbar } from "@/components/Navbar/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaMapMarkerAlt, FaStar, FaArrowRight, FaTicketAlt } from "react-icons/fa";
import Link from "next/link";
import { CINEMAS } from "@/data/cinemas";
import { useRef } from "react";

function CinemaCard({ cinema, index }: { cinema: typeof CINEMAS[0], index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative w-full min-h-[500px] rounded-3xl overflow-hidden mb-12 border border-white/10 hover:border-red-500/50 transition-colors duration-500"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <motion.div style={{ scale: 1.1, y }} className="w-full h-full">
                    <img
                        src={cinema.image}
                        alt={cinema.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold tracking-widest uppercase rounded-full">
                            {cinema.distance}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-500">
                            <FaStar />
                            <span className="font-bold">{cinema.rating}</span>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bebas text-white mb-2 leading-none group-hover:text-red-500 transition-colors">
                        {cinema.name}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-400 mb-6">
                        <FaMapMarkerAlt className="text-red-600" />
                        <p className="font-light tracking-wide">{cinema.location}</p>
                    </div>

                    <p className="text-gray-300 max-w-2xl mb-8 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                        {cinema.description}
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {cinema.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                {feature}
                            </div>
                        ))}
                    </div>

                    <Link href={`/cinemas/${cinema.id}`}>
                        <button className="w-full md:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-bold tracking-wider hover:bg-red-600 hover:border-red-600 transition-all duration-300 flex items-center justify-center gap-3 group/btn">
                            <FaTicketAlt />
                            BOOK EXPERIENCE
                            <FaArrowRight className="transform group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export default function CinemasPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
            <Navbar />

            {/* Immersive Hero */}
            <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000')] bg-cover bg-center opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-7xl md:text-9xl font-bebas tracking-tighter mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                                ELITE
                            </span>
                            <span className="text-red-600 ml-4">CINEMAS</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-light tracking-[0.3em] uppercase max-w-3xl mx-auto">
                            Where Technology Meets Luxury
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Cinema List */}
            <div className="container mx-auto px-4 -mt-32 relative z-20 pb-32">
                {CINEMAS.map((cinema, index) => (
                    <CinemaCard key={cinema.id} cinema={cinema} index={index} />
                ))}
            </div>
        </div>
    );
}
