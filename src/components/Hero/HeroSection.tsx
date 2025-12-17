"use client";

import { useState, useEffect, useCallback } from "react";
import { BackgroundLayer } from "./BackgroundLayer";
import { ContentLayer } from "./ContentLayer";
import { TrailerModal } from "./TrailerModal";

import { FEATURED_MOVIES } from "@/data/movies";

export const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    // Auto-rotation logic
    useEffect(() => {
        if (isPaused || isTrailerOpen) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % FEATURED_MOVIES.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [isPaused, isTrailerOpen]);

    const handleBook = useCallback(() => {
        console.log("Booking ticket for:", FEATURED_MOVIES[currentIndex].title);
        // Navigate to booking page
    }, [currentIndex]);

    const handleTrailer = useCallback(() => {
        setIsTrailerOpen(true);
    }, []);

    return (
        <section
            className="relative w-full h-screen overflow-hidden bg-background"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <BackgroundLayer movies={FEATURED_MOVIES} currentIndex={currentIndex} />



            <ContentLayer
                movie={FEATURED_MOVIES[currentIndex]}
                onBook={handleBook}
                onTrailer={handleTrailer}
            />

            <TrailerModal
                isOpen={isTrailerOpen}
                onClose={() => setIsTrailerOpen(false)}
                title={FEATURED_MOVIES[currentIndex].title}
                videoSrc={FEATURED_MOVIES[currentIndex].video}
            />

            {/* Progress Indicators */}
            <div className="absolute bottom-8 right-8 md:right-16 flex gap-2 z-20">
                {FEATURED_MOVIES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-accent-primary" : "w-2 bg-white/30 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};
