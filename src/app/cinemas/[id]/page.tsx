"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar/Navbar";
import { CINEMAS } from "@/data/cinemas";
import { FEATURED_MOVIES } from "@/data/movies";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaStar, FaPhone, FaClock, FaTicketAlt, FaUtensils, FaWifi, FaParking } from "react-icons/fa";
import Link from "next/link";

export default function CinemaDetailsPage() {
    const params = useParams();
    const cinema = CINEMAS.find(c => c.id === params.id);

    if (!cinema) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Cinema not found</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Immersive Hero */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <img
                    src={cinema.image}
                    alt={cinema.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-12">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded uppercase tracking-wider">
                                {cinema.distance}
                            </span>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <FaStar />
                                <span className="font-bold text-white">{cinema.rating}</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{cinema.name}</h1>
                        <div className="flex items-center gap-2 text-gray-300 text-lg mb-6">
                            <FaMapMarkerAlt className="text-red-500" />
                            {cinema.location}
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* About / Experience */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-8 bg-red-600 rounded-full" />
                            The Experience
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            {cinema.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {cinema.amenities.map((amenity, i) => (
                                <div key={i} className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 flex flex-col items-center justify-center text-center gap-2 hover:border-gray-600 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-red-500">
                                        {i % 4 === 0 ? <FaTicketAlt /> : i % 4 === 1 ? <FaUtensils /> : i % 4 === 2 ? <FaWifi /> : <FaParking />}
                                    </div>
                                    <span className="text-sm font-medium text-gray-300">{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Now Showing */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <span className="w-1 h-8 bg-red-600 rounded-full" />
                            Now Showing
                        </h2>
                        <div className="space-y-6">
                            {FEATURED_MOVIES.slice(0, 3).map((movie) => (
                                <div key={movie.id} className="bg-gray-900/30 border border-gray-800 rounded-xl p-4 flex gap-6 hover:bg-gray-900/50 transition-colors">
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="w-24 h-36 object-cover rounded-lg shadow-lg"
                                    />
                                    <div className="flex-1 py-2">
                                        <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                            <span>{movie.language}</span>
                                            <span>•</span>
                                            <span>{movie.duration}</span>
                                            <span>•</span>
                                            <span className="border border-gray-700 px-1 rounded text-xs">{movie.rating}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            {["10:00 AM", "01:30 PM", "05:00 PM", "09:30 PM"].map((time) => (
                                                <Link
                                                    key={time}
                                                    href={`/book/${movie.id}/seats?theatre=${cinema.id}&time=${time}`}
                                                >
                                                    <button className="px-4 py-2 bg-gray-800 hover:bg-green-600 hover:text-white text-green-500 border border-green-500/30 rounded-lg text-sm font-medium transition-all">
                                                        {time}
                                                    </button>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Contact & Location</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-red-500 shrink-0">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Address</p>
                                    <p className="font-medium">{cinema.location}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-red-500 shrink-0">
                                    <FaPhone />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Phone</p>
                                    <p className="font-medium">+91 80 1234 5678</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-red-500 shrink-0">
                                    <FaClock />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Opening Hours</p>
                                    <p className="font-medium">09:00 AM - 12:00 AM</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                            Get Directions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
