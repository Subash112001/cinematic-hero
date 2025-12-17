"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { FEATURED_MOVIES } from "@/data/movies";
import { THEATRES } from "@/data/theatres";
import { Navbar } from "@/components/Navbar/Navbar";
import SeatLayout from "@/components/Booking/SeatLayout";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SeatSelectionPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const theatreId = searchParams.get("theatre");
    const showtimeId = searchParams.get("showtime");

    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const movie = FEATURED_MOVIES.find((m) => m.id === params.id);
    const theatre = THEATRES.find((t) => t.id === theatreId);
    const showtime = theatre?.showtimes.find((s) => s.id === showtimeId);

    // Mock booked seats
    const bookedSeats = ["D5", "D6", "E4", "E5", "F10", "F11"];

    useEffect(() => {
        // Calculate price (simplified)
        let total = 0;
        selectedSeats.forEach(seat => {
            const row = seat.charAt(0);
            // Assuming rows I, J are VIP
            const isVip = row >= 'I';
            total += isVip ? 350 : 250;
        });
        setTotalPrice(total);
    }, [selectedSeats]);

    if (!movie || !theatre || !showtime) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-24 pb-32 container mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-400">
                        {theatre.name} | {showtime.time} | {showtime.type}
                    </p>
                </div>

                <SeatLayout
                    rows={10}
                    cols={15}
                    bookedSeats={bookedSeats}
                    onSelectionChange={setSelectedSeats}
                />
            </div>

            {/* Bottom Bar */}
            <AnimatePresence>
                {selectedSeats.length > 0 && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-50"
                    >
                        <div className="container mx-auto flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-400 mb-1">
                                    Selected Seats: <span className="text-white font-bold">{selectedSeats.join(", ")}</span>
                                </div>
                                <div className="text-2xl font-bold text-white">
                                    ₹{totalPrice}
                                </div>
                            </div>
                            <Link href={`/checkout?movieId=${movie.id}&theatreId=${theatre.id}&showtimeId=${showtime.id}&seats=${selectedSeats.join(",")}&price=${totalPrice}`}>
                                <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-600/30">
                                    Proceed to Pay
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
