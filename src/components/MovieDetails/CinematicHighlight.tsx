"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Movie } from "@/types/movie";
import { FaQuoteLeft } from "react-icons/fa";

interface CinematicHighlightProps {
    movie: Movie;
}

export default function CinematicHighlight({ movie }: CinematicHighlightProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    if (!movie.quote) return null;

    return (
        <section ref={ref} className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden my-20 rounded-3xl mx-4">
            {/* Parallax Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${movie.image})` }}
                />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 max-w-4xl mx-auto px-6 text-center"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8 text-red-500/80 flex justify-center"
                >
                    <FaQuoteLeft className="text-6xl md:text-8xl" />
                </motion.div>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-8 drop-shadow-2xl"
                >
                    "{movie.quote}"
                </motion.h2>

                {movie.quoteAuthor && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex items-center justify-center gap-4"
                    >
                        <div className="h-[1px] w-12 bg-red-500" />
                        <p className="text-xl md:text-2xl text-gray-300 font-light tracking-widest uppercase">
                            {movie.quoteAuthor}
                        </p>
                        <div className="h-[1px] w-12 bg-red-500" />
                    </motion.div>
                )}
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
    );
}
