"use client";

import { Movie } from "@/types/movie";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaPlay, FaStar, FaCalendar, FaClock, FaShareAlt, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useRef } from "react";

interface MovieHeroProps {
    movie: Movie;
    onPlayTrailer: () => void;
}

export default function MovieHero({ movie, onPlayTrailer }: MovieHeroProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={ref} className="relative h-[90vh] w-full overflow-hidden">
            {/* Parallax Background */}
            <motion.div style={{ y, opacity }} className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
                <img
                    src={movie.image}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                />
            </motion.div>

            {/* Content */}
            <div className="absolute inset-0 z-20 container mx-auto px-4 flex items-end pb-24">
                <div className="max-w-4xl w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Badges */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded uppercase tracking-wider shadow-[0_0_15px_rgba(229,9,20,0.5)]">
                                {movie.rating}
                            </span>
                            {movie.format.map((fmt) => (
                                <span key={fmt} className="px-3 py-1 border border-white/30 text-white text-sm rounded backdrop-blur-md bg-white/5 uppercase tracking-wider">
                                    {fmt}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-6xl md:text-8xl font-bebas text-white mb-6 leading-none text-glow">
                            {movie.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-8 text-gray-300 mb-8 text-lg font-medium">
                            <span className="flex items-center gap-2 text-yellow-500">
                                <FaStar /> 4.8 (25k Votes)
                            </span>
                            <span className="flex items-center gap-2">
                                <FaClock className="text-red-500" />
                                {movie.duration}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaCalendar className="text-red-500" />
                                {movie.releaseDate || "2024"}
                            </span>
                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                                {movie.language}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl font-light drop-shadow-md">
                            {movie.description}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-6">
                            <Link href={`/book/${movie.id}`}>
                                <button className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(229,9,20,0.4)] hover:shadow-[0_0_50px_rgba(229,9,20,0.6)] flex items-center gap-3">
                                    <FaCalendar /> Book Tickets
                                </button>
                            </Link>
                            <button
                                onClick={onPlayTrailer}
                                className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-lg backdrop-blur-md border border-white/20 transition-all flex items-center gap-3 hover:scale-105"
                            >
                                <FaPlay className="text-sm" />
                                Watch Trailer
                            </button>

                            <div className="flex gap-4 ml-auto md:ml-0">
                                <button className="w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all group">
                                    <FaHeart className="text-xl group-hover:scale-110 transition-transform" />
                                </button>
                                <button className="w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all group">
                                    <FaShareAlt className="text-xl group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
