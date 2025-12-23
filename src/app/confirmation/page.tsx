"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar/Navbar";
import { motion } from "framer-motion";
import { FaCheckCircle, FaDownload, FaHome, FaCalendar, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Link from "next/link";

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("bookingId") || "CINE-X8Y9Z";

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-24 pb-12 container mx-auto px-4 flex flex-col items-center justify-center min-h-[80vh]">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
                >
                    {/* Success Animation */}
                    <div className="mb-6 flex justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                        >
                            <FaCheckCircle className="text-4xl text-white" />
                        </motion.div>
                    </div>

                    <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
                    <p className="text-gray-400 mb-8">Your tickets have been sent to your email.</p>

                    {/* Ticket Card */}
                    <div className="bg-white text-black rounded-xl p-6 mb-8 text-left relative">
                        {/* Cutout circles for ticket effect */}
                        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-gray-900 rounded-full" />
                        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-gray-900 rounded-full" />
                        <div className="absolute top-1/2 left-4 right-4 border-t-2 border-dashed border-gray-300" />

                        <div className="mb-6">
                            <h3 className="text-xl font-black uppercase tracking-wider mb-1">Dune: Part Two</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                <span className="px-2 py-0.5 bg-gray-200 rounded">IMAX</span>
                                <span>English</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                            <div>
                                <p className="text-gray-500 text-xs uppercase">Date</p>
                                <p className="font-bold">Mon, 12 Dec</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs uppercase">Time</p>
                                <p className="font-bold">07:30 PM</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500 text-xs uppercase">Theatre</p>
                                <p className="font-bold truncate">PVR: Nexus Mall, Koramangala</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500 text-xs uppercase">Seats</p>
                                <p className="font-bold text-lg">F10, F11</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <div className="text-center">
                                {/* Mock QR Code */}
                                <div className="w-16 h-16 bg-gray-900 p-1">
                                    <div className="w-full h-full bg-white grid grid-cols-4 gap-0.5 p-0.5">
                                        {[...Array(16)].map((_, i) => (
                                            <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 text-xs uppercase">Booking ID</p>
                                <p className="font-mono font-bold text-lg tracking-widest">{bookingId}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                            <FaDownload /> Ticket
                        </button>
                        <Link href="/" className="flex-1">
                            <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-600/30">
                                <FaHome /> Home
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
            <ConfirmationContent />
        </Suspense>
    );
}
