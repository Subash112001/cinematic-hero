"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FEATURED_MOVIES } from "@/data/movies";
import { Movie } from "@/types/movie";
import { Navbar } from "@/components/Navbar/Navbar";
import MovieHero from "@/components/MovieDetails/MovieHero";
import CastCarousel from "@/components/MovieDetails/CastCarousel";
import AudiencePulse from "@/components/MovieDetails/AudiencePulse";
import CinematicHighlight from "@/components/MovieDetails/CinematicHighlight";
import StorylineSection from "@/components/MovieDetails/StorylineSection";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function MovieDetailsPage() {
    const params = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [showTrailer, setShowTrailer] = useState(false);

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

            <MovieHero movie={movie} onPlayTrailer={() => setShowTrailer(true)} />

            <div className="container mx-auto px-4">
                <StorylineSection movie={movie} />

                <CastCarousel />

                <AudiencePulse />

                <CinematicHighlight movie={movie} />
            </div>

            {/* Trailer Modal */}
            <AnimatePresence>
                {showTrailer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                    >
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                        >
                            <FaTimes size={32} />
                        </button>
                        <div className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                            <video
                                src={movie.video}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
