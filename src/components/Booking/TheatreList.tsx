"use client";

import { Theatre } from "@/types/theatre";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaHamburger, FaParking, FaWheelchair } from "react-icons/fa";
import Link from "next/link";

interface TheatreListProps {
    theatres: Theatre[];
    movieId: string;
    selectedDate: Date;
}

export default function TheatreList({ theatres, movieId, selectedDate }: TheatreListProps) {
    return (
        <div className="space-y-8">
            {theatres.map((theatre, index) => (
                <motion.div
                    key={theatre.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">
                                    {theatre.name}
                                </h3>
                                <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                                    M-Ticket
                                </span>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                                <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                                    <FaMapMarkerAlt className="text-red-500" />
                                    {theatre.location}
                                    <span className="text-xs bg-gray-800 px-1.5 py-0.5 rounded ml-1">{theatre.distance}</span>
                                </span>
                            </div>

                            <div className="flex gap-4 text-gray-500">
                                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider hover:text-white transition-colors">
                                    <FaHamburger /> F&B
                                </div>
                                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider hover:text-white transition-colors">
                                    <FaParking /> Parking
                                </div>
                                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider hover:text-white transition-colors">
                                    <FaWheelchair /> Accessibility
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {theatre.showtimes.map((showtime) => (
                            <Link
                                key={showtime.id}
                                href={showtime.available ? `/book/${movieId}/seats?theatre=${theatre.id}&showtime=${showtime.id}&date=${selectedDate.toISOString()}` : "#"}
                                className={`group/time relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${showtime.available
                                        ? "border-gray-700 bg-gray-800/30 hover:border-green-500 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] cursor-pointer"
                                        : "border-gray-800 bg-gray-900/30 opacity-40 cursor-not-allowed"
                                    }`}
                            >
                                <div className={`text-lg font-bold mb-1 ${showtime.available ? "text-white group-hover/time:text-green-400" : "text-gray-500"}`}>
                                    {showtime.time}
                                </div>
                                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{showtime.type}</div>

                                {/* Hover Details */}
                                {showtime.available && (
                                    <div className="absolute inset-0 bg-green-600 rounded-xl flex flex-col items-center justify-center opacity-0 group-hover/time:opacity-100 transition-opacity duration-200 z-10">
                                        <span className="text-white font-bold text-lg">₹{showtime.price}</span>
                                        <span className="text-[10px] text-white/80 uppercase tracking-wider">Book</span>
                                    </div>
                                )}

                                {!showtime.available && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-full h-[1px] bg-red-500/50 rotate-45 absolute" />
                                        <div className="w-full h-[1px] bg-red-500/50 -rotate-45 absolute" />
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
