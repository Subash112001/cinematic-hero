"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FEATURED_MOVIES } from "@/data/movies";
import { THEATRES } from "@/data/theatres";
import { Movie } from "@/types/movie";
import { Navbar } from "@/components/Navbar/Navbar";
import DateSelector from "@/components/Booking/DateSelector";
import TheatreList from "@/components/Booking/TheatreList";
import { motion } from "framer-motion";

export default function BookingPage() {
    const params = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const foundMovie = FEATURED_MOVIES.find((m) => m.id === params.id);
        if (foundMovie) {
            setMovie(foundMovie);
        }
    }, [params.id]);

    if (!movie) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-24 pb-12 container mx-auto px-4">
                {/* Movie Header */}
                <div className="flex flex-col md:flex-row gap-6 mb-8 border-b border-gray-800 pb-8">
                    <div className="w-full md:w-48 aspect-[2/3] relative rounded-lg overflow-hidden shrink-0">
                        <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                        <div className="flex items-center gap-3 text-gray-400 mb-4">
                            <span className="border border-gray-700 px-2 py-0.5 rounded text-sm">{movie.rating}</span>
                            <span>{movie.duration}</span>
                            <span>•</span>
                            <span>{movie.tags.join(", ")}</span>
                        </div>
                        <p className="text-gray-400 max-w-2xl mb-6">{movie.description}</p>
                    </div>
                </div>

                {/* Date Selection */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Select Date</h2>
                    <DateSelector onDateSelect={setSelectedDate} />
                </div>

                {/* Theatres & Showtimes */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Select Theatre & Time</h2>
                    <TheatreList
                        theatres={THEATRES}
                        movieId={movie.id}
                        selectedDate={selectedDate}
                    />
                </div>
            </div>
        </div>
    );
}
