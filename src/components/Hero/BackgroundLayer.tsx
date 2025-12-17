"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Movie } from "@/types/movie";

interface BackgroundLayerProps {
    movies: Movie[];
    currentIndex: number;
}

export const BackgroundLayer = ({ movies, currentIndex }: BackgroundLayerProps) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]); // Parallax effect

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={movies[currentIndex].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <motion.div
                        style={{ y }}
                        className="absolute inset-0 w-full h-[120%] -top-[10%]" // Taller for parallax
                    >
                        {movies[currentIndex].video ? (
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover scale-110" // Slight scale to prevent edges showing
                                key={movies[currentIndex].video}
                            >
                                <source src={movies[currentIndex].video} type="video/mp4" />
                            </video>
                        ) : (
                            <motion.div
                                initial={{ scale: 1 }}
                                animate={{ scale: 1.1 }}
                                transition={{ duration: 10, ease: "linear" }}
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${movies[currentIndex].image})` }}
                            />
                        )}
                    </motion.div>

                    {/* Cinematic Overlays - Reduced Opacity for Clarity */}
                    {/* 1. Dark overlay for overall dimming - Reduced from 30% to 10% */}
                    <div className="absolute inset-0 bg-black/10" />

                    {/* 2. Gradient from bottom (Deep blend) - Kept for text readability but slightly reduced */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent bottom-0 h-full" />

                    {/* 3. Gradient from left (Text readability) - Reduced intensity */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent w-full md:w-3/4" />

                    {/* 4. Top Gradient for Navbar visibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent h-32" />

                    {/* 5. Film Grain Texture - Reduced opacity */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
