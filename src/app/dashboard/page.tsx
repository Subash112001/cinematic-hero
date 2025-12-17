"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar/Navbar";
import BookingCard from "@/components/Dashboard/BookingCard";
import { motion } from "framer-motion";
import { FaTicketAlt, FaHistory, FaCrown, FaStar, FaClock, FaQrcode } from "react-icons/fa";

// Mock Data
const MOCK_BOOKINGS = [
    {
        id: "1",
        movieName: "Dune: Part Two",
        poster: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2560&auto=format&fit=crop",
        date: "Mon, 12 Dec 2024",
        time: "07:30 PM",
        theatre: "PVR: Nexus Mall, Koramangala",
        seats: ["F10", "F11"],
        price: 1200,
        status: "upcoming" as const,
    },
    {
        id: "2",
        movieName: "Oppenheimer",
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2560&auto=format&fit=crop",
        date: "Fri, 15 Aug 2023",
        time: "04:00 PM",
        theatre: "INOX: Garuda Mall",
        seats: ["H5", "H6", "H7"],
        price: 1500,
        status: "completed" as const,
    },
    {
        id: "3",
        movieName: "Spider-Man: Across the Spider-Verse",
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=2560&auto=format&fit=crop",
        date: "Sat, 10 Jun 2023",
        time: "01:00 PM",
        theatre: "Cinepolis: Lulu Mall",
        seats: ["E12", "E13"],
        price: 800,
        status: "completed" as const,
    },
];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");

    const filteredBookings = MOCK_BOOKINGS.filter((booking) =>
        activeTab === "upcoming" ? booking.status === "upcoming" : booking.status !== "upcoming"
    );

    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
            <Navbar />

            <div className="pt-32 pb-12 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Membership Card & Stats */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Membership Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative w-full aspect-[1.58/1] rounded-3xl overflow-hidden group perspective-1000"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-black/50 transform transition-transform duration-500 group-hover:scale-[1.02]">
                                {/* Holographic Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-white/50 text-sm tracking-[0.2em] uppercase mb-1">Cineverse</h3>
                                        <h2 className="text-2xl font-bebas tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">GOLD MEMBER</h2>
                                    </div>
                                    <FaCrown className="text-3xl text-yellow-500" />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                            <span className="font-bold text-lg">SM</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">Subash M</p>
                                            <p className="text-sm text-white/50">Member since 2023</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-xs text-white/30 font-mono">
                                            **** **** **** 8842
                                        </div>
                                        <FaQrcode className="text-3xl text-white/80" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-3 mb-2 text-yellow-500">
                                    <FaStar />
                                    <span className="text-sm font-bold uppercase tracking-wider">Points</span>
                                </div>
                                <div className="text-3xl font-bebas">2,450</div>
                                <div className="text-xs text-white/40 mt-1">Next Reward: 3,000</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-3 mb-2 text-blue-400">
                                    <FaClock />
                                    <span className="text-sm font-bold uppercase tracking-wider">Hours</span>
                                </div>
                                <div className="text-3xl font-bebas">124</div>
                                <div className="text-xs text-white/40 mt-1">Cinematic Bliss</div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column: Bookings */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-8 border-b border-white/10 mb-8">
                            <button
                                onClick={() => setActiveTab("upcoming")}
                                className={`pb-4 flex items-center gap-2 text-sm font-bold transition-all relative ${activeTab === "upcoming" ? "text-white" : "text-gray-500 hover:text-gray-300"
                                    }`}
                            >
                                <FaTicketAlt /> UPCOMING
                                {activeTab === "upcoming" && (
                                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab("history")}
                                className={`pb-4 flex items-center gap-2 text-sm font-bold transition-all relative ${activeTab === "history" ? "text-white" : "text-gray-500 hover:text-gray-300"
                                    }`}
                            >
                                <FaHistory /> HISTORY
                                {activeTab === "history" && (
                                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                                )}
                            </button>
                        </div>

                        <div className="space-y-6">
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((booking, index) => (
                                    <motion.div
                                        key={booking.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <BookingCard booking={booking} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-20 text-gray-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                                    <p>No bookings found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
