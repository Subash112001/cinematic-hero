"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

// Mock Data
const CAST = [
    { id: 1, name: "Timothée Chalamet", role: "Paul Atreides", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, name: "Zendaya", role: "Chani", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, name: "Rebecca Ferguson", role: "Lady Jessica", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, name: "Oscar Isaac", role: "Duke Leto", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, name: "Jason Momoa", role: "Duncan Idaho", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" },
    { id: 6, name: "Josh Brolin", role: "Gurney Halleck", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1000&auto=format&fit=crop" },
];

export default function CastCarousel() {
    const containerRef = useRef(null);

    return (
        <section className="py-12 relative">
            <div className="container mx-auto px-4 mb-8 flex items-end justify-between">
                <div>
                    <h2 className="text-4xl font-bebas text-white mb-2">Top Cast</h2>
                    <div className="h-1 w-20 bg-red-600" />
                </div>
                <button className="text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-widest">View All Cast</button>
            </div>

            <div
                ref={containerRef}
                className="flex overflow-x-auto gap-6 pb-12 px-4 container mx-auto scrollbar-hide snap-x"
            >
                {CAST.map((actor, index) => (
                    <motion.div
                        key={actor.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative min-w-[200px] md:min-w-[240px] h-[350px] rounded-2xl overflow-hidden group cursor-pointer snap-center"
                    >
                        <img
                            src={actor.image}
                            alt={actor.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-xl font-bold text-white mb-1 leading-tight">{actor.name}</h3>
                            <p className="text-red-500 font-medium text-sm uppercase tracking-wider mb-2">{actor.role}</p>

                            <div className="w-full h-[1px] bg-white/20 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />

                            <p className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 line-clamp-2">
                                Award-winning performance in a leading role.
                            </p>
                        </div>

                        {/* Border Glow on Hover */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600/50 rounded-2xl transition-colors duration-300 pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
