"use client";

import { Movie } from "@/types/movie";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaClock, FaTicketAlt } from "react-icons/fa";

interface MovieCardProps {
    movie: Movie;
    index: number;
}

export default function MovieCard({ movie, index }: MovieCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative aspect-[2/3] w-full rounded-xl bg-gray-900 cursor-pointer perspective-1000"
        >
            <Link href={`/movies/${movie.id}`} className="block w-full h-full">
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_20px_50px_rgba(229,9,20,0.3)]">
                    <Image
                        src={movie.image}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 transition-all duration-300 transform translate-z-20">
                        <div className="transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                            {/* Badges */}
                            <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0">
                                <span className="px-2 py-0.5 text-[10px] font-bold bg-yellow-500 text-black rounded uppercase tracking-wider">
                                    {movie.rating}
                                </span>
                                {movie.format.includes("IMAX") && (
                                    <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded uppercase tracking-wider">
                                        IMAX
                                    </span>
                                )}
                            </div>

                            <h3 className="text-2xl font-bebas text-white mb-1 leading-none text-glow-red group-hover:text-red-500 transition-colors">
                                {movie.title}
                            </h3>

                            <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                                <span className="flex items-center gap-1 text-yellow-500">
                                    <FaStar /> 4.8
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaClock /> {movie.duration}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4 opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300">
                                {movie.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="text-[10px] text-gray-300 border border-gray-700 px-2 py-1 rounded-full backdrop-blur-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)]">
                                <FaTicketAlt /> Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
