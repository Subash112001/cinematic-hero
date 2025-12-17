"use client";

import { motion } from "framer-motion";
import { Movie } from "@/types/movie";
import { Play, Ticket } from "lucide-react";
import clsx from "clsx";

interface ContentLayerProps {
    movie: Movie;
    onBook: () => void;
    onTrailer: () => void;
}

export const ContentLayer = ({ movie, onBook, onTrailer }: ContentLayerProps) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    };

    return (
        <div className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24 z-10 pointer-events-none">
            <motion.div
                key={movie.id}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl w-full flex flex-col gap-8 pointer-events-auto mt-20"
            >
                {/* Badges & Tags */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
                        <span className="text-accent-primary font-bold text-xs tracking-widest uppercase">
                            New Release
                        </span>
                    </div>
                    <span className="px-2 py-0.5 border border-white/30 rounded text-xs font-bold text-white uppercase tracking-wider">
                        {movie.rating}
                    </span>
                    <span className="text-gray-300 text-sm font-medium tracking-wide">{movie.duration}</span>
                    <div className="w-1 h-1 bg-gray-500 rounded-full" />
                    <div className="flex gap-3">
                        {movie.tags.map((tag) => (
                            <span key={tag} className="text-accent-secondary text-sm font-medium tracking-wide drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    variants={itemVariants}
                    className="text-7xl md:text-9xl font-bebas text-white leading-[0.85] tracking-tight drop-shadow-2xl"
                >
                    {movie.title}
                </motion.h1>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-gray-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl line-clamp-3 drop-shadow-md"
                >
                    {movie.description}
                </motion.p>

                {/* CTAs */}
                <motion.div variants={itemVariants} className="flex items-center gap-6 pt-6">
                    <button
                        onClick={onBook}
                        className="group relative px-10 py-5 bg-accent-primary text-white font-bold text-lg rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(229,9,20,0.4)] hover:shadow-[0_0_50px_rgba(229,9,20,0.6)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        <span className="relative flex items-center gap-3">
                            <Ticket className="w-6 h-6" />
                            GET TICKETS
                        </span>
                    </button>

                    <button
                        onClick={onTrailer}
                        className="group px-10 py-5 bg-white/5 border border-white/20 text-white font-bold text-lg rounded-xl backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
                    >
                        <span className="flex items-center gap-3">
                            <Play className="w-6 h-6 fill-white/20 group-hover:fill-white transition-colors" />
                            WATCH TRAILER
                        </span>
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};
