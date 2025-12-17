"use client";

import { motion } from "framer-motion";
import { FaCalendar, FaClock, FaMapMarkerAlt, FaQrcode, FaDownload } from "react-icons/fa";

interface BookingProps {
    id: string;
    movieName: string;
    poster: string;
    date: string;
    time: string;
    theatre: string;
    seats: string[];
    price: number;
    status: "upcoming" | "completed" | "cancelled";
}

export default function BookingCard({ booking }: { booking: BookingProps }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col md:flex-row hover:border-gray-700 transition-colors group"
        >
            {/* Poster */}
            <div className="w-full md:w-32 h-48 md:h-auto relative shrink-0">
                <img src={booking.poster} alt={booking.movieName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white">{booking.movieName}</h3>
                        <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${booking.status === "upcoming" ? "bg-green-500/20 text-green-400" :
                                booking.status === "completed" ? "bg-gray-700 text-gray-400" :
                                    "bg-red-500/20 text-red-400"
                            }`}>
                            {booking.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                            <FaCalendar className="text-red-500" />
                            <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaClock className="text-red-500" />
                            <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2 col-span-2">
                            <FaMapMarkerAlt className="text-red-500" />
                            <span>{booking.theatre}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                        <div className="bg-gray-800 px-3 py-1 rounded">
                            <span className="text-gray-500 mr-2">Seats</span>
                            <span className="text-white font-bold">{booking.seats.join(", ")}</span>
                        </div>
                        <div className="bg-gray-800 px-3 py-1 rounded">
                            <span className="text-gray-500 mr-2">Amount</span>
                            <span className="text-white font-bold">₹{booking.price}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                {booking.status === "upcoming" && (
                    <div className="mt-6 flex gap-4 pt-4 border-t border-gray-800">
                        <button className="flex items-center gap-2 text-sm font-semibold text-white hover:text-red-500 transition-colors">
                            <FaQrcode /> View Ticket
                        </button>
                        <button className="flex items-center gap-2 text-sm font-semibold text-white hover:text-red-500 transition-colors">
                            <FaDownload /> Download Invoice
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
