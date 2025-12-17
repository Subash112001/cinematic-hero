"use client";

import { motion } from "framer-motion";
import { Movie } from "@/types/movie";

interface StorylineSectionProps {
    movie: Movie;
}

export default function StorylineSection({ movie }: StorylineSectionProps) {
    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Left: The Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-2/3"
                    >
                        <div className="flex items-baseline gap-4 mb-8">
                            <h2 className="text-6xl font-bebas text-white leading-none">THE STORY</h2>
                            <div className="h-1 flex-1 bg-gradient-to-r from-red-600 to-transparent opacity-50" />
                        </div>

                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                            <span className="text-6xl float-left mr-4 mt-[-10px] font-bebas text-red-600">
                                {movie.description.charAt(0)}
                            </span>
                            {movie.description.slice(1)}
                        </p>

                        <p className="mt-6 text-gray-400 text-lg leading-relaxed">
                            Experience the ultimate cinematic journey with state-of-the-art visual effects and sound design.
                            This masterpiece pushes the boundaries of storytelling and immerses you in a world like no other.
                        </p>

                        {/* Quotes or Tagline */}
                        <div className="mt-10 border-l-4 border-red-600 pl-6 py-2">
                            <p className="text-2xl italic text-white font-serif">
                                "A visual spectacle that defines a generation."
                            </p>
                            <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">— Empire Magazine</p>
                        </div>
                    </motion.div>

                    {/* Right: Key Specs (Dossier Style) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3"
                    >
                        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-8 rounded-3xl relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center rotate-12">
                                    <span className="text-[10px] uppercase font-bold">Verified</span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bebas text-white mb-8 flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                Production Intel
                            </h3>

                            <div className="space-y-6">
                                <div className="group">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Director</p>
                                    <p className="text-lg text-white font-bold group-hover:text-red-500 transition-colors">Denis Villeneuve</p>
                                </div>
                                <div className="group">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Writers</p>
                                    <p className="text-lg text-white font-bold group-hover:text-red-500 transition-colors">Jon Spaihts, Denis Villeneuve</p>
                                </div>
                                <div className="group">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Release Date</p>
                                    <p className="text-lg text-white font-bold group-hover:text-red-500 transition-colors">{movie.releaseDate || "2024"}</p>
                                </div>
                                <div className="group">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Box Office</p>
                                    <p className="text-lg text-white font-bold group-hover:text-red-500 transition-colors">$1.2 Billion</p>
                                </div>
                                <div className="group">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Studio</p>
                                    <p className="text-lg text-white font-bold group-hover:text-red-500 transition-colors">Warner Bros. Pictures</p>
                                </div>
                            </div>

                            {/* Barcode Decoration */}
                            <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-end opacity-50">
                                <div className="h-8 w-32 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png')] bg-cover bg-center grayscale" />
                                <span className="text-[10px] font-mono">ID: {movie.id.toUpperCase()}</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
