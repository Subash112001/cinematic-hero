"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { FEATURED_MOVIES } from "@/data/movies";
import MovieCard from "@/components/Movies/MovieCard";
import { Navbar } from "@/components/Navbar/Navbar";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

export default function MoviesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        languages: [] as string[],
        formats: [] as string[],
    });

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Extract unique options
    const options = useMemo(() => {
        const languages = Array.from(new Set(FEATURED_MOVIES.map((m) => m.language))).filter(Boolean);
        const formats = Array.from(new Set(FEATURED_MOVIES.flatMap((m) => m.format)));
        const genres = ["All", ...Array.from(new Set(FEATURED_MOVIES.flatMap((m) => m.tags)))];
        return { languages, formats, genres };
    }, []);

    const filteredMovies = useMemo(() => {
        return FEATURED_MOVIES.filter((movie) => {
            if (searchQuery && !movie.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (activeCategory !== "All" && !movie.tags.includes(activeCategory)) return false;
            if (selectedFilters.languages.length > 0 && !selectedFilters.languages.includes(movie.language)) return false;
            if (selectedFilters.formats.length > 0 && !movie.format.some(f => selectedFilters.formats.includes(f))) return false;
            return true;
        });
    }, [searchQuery, activeCategory, selectedFilters]);

    const toggleFilter = (type: 'languages' | 'formats', value: string) => {
        setSelectedFilters(prev => ({
            ...prev,
            [type]: prev[type].includes(value)
                ? prev[type].filter(item => item !== value)
                : [...prev[type], value]
        }));
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white" ref={containerRef}>
            <Navbar />

            {/* Immersive 3D Hero Carousel */}
            <div className="relative h-[70vh] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />

                {/* Background Parallax */}
                <motion.div
                    style={{ scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]) }}
                    className="absolute inset-0 opacity-40"
                >
                    <div className="grid grid-cols-3 gap-4 rotate-12 scale-150 opacity-30">
                        {FEATURED_MOVIES.map((movie, i) => (
                            <div key={i} className="aspect-[2/3] rounded-xl overflow-hidden">
                                <img src={movie.image} className="w-full h-full object-cover" alt="" />
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="relative z-20 text-center max-w-4xl px-4">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-bebas tracking-tighter mb-6"
                    >
                        DISCOVER <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">STORIES</span>
                    </motion.h1>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative max-w-xl mx-auto group"
                    >
                        <div className="absolute inset-0 bg-red-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-4 transition-all focus-within:bg-black/80 focus-within:border-red-500">
                            <FaSearch className="text-gray-400 mr-4" />
                            <input
                                type="text"
                                placeholder="Search movies, genres, or formats..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-white w-full placeholder-gray-400"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Filter & Content Section */}
            <div className="container mx-auto px-4 pb-24 relative z-20 -mt-20">
                {/* Category Tabs */}
                <div className="flex items-center justify-center gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
                    {options.genres.slice(0, 6).map((genre, i) => (
                        <button
                            key={genre}
                            onClick={() => setActiveCategory(genre)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeCategory === genre
                                    ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                                }`}
                        >
                            {genre}
                        </button>
                    ))}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`px-4 py-2 rounded-full border transition-all flex items-center gap-2 ${showFilters ? "bg-white text-black border-white" : "bg-transparent text-white border-white/20 hover:border-white"
                            }`}
                    >
                        <FaFilter /> Filters
                    </button>
                </div>

                {/* Advanced Filters Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mb-12"
                        >
                            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Languages</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {options.languages.map(lang => (
                                            <button
                                                key={lang}
                                                onClick={() => toggleFilter('languages', lang)}
                                                className={`px-4 py-2 rounded-lg text-sm transition-all ${selectedFilters.languages.includes(lang)
                                                        ? "bg-red-600/20 text-red-500 border border-red-500/50"
                                                        : "bg-black/40 text-gray-400 border border-white/10 hover:border-white/30"
                                                    }`}
                                            >
                                                {lang}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Formats</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {options.formats.map(fmt => (
                                            <button
                                                key={fmt}
                                                onClick={() => toggleFilter('formats', fmt)}
                                                className={`px-4 py-2 rounded-lg text-sm transition-all ${selectedFilters.formats.includes(fmt)
                                                        ? "bg-red-600/20 text-red-500 border border-red-500/50"
                                                        : "bg-black/40 text-gray-400 border border-white/10 hover:border-white/30"
                                                    }`}
                                            >
                                                {fmt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Movie Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredMovies.map((movie, index) => (
                            <motion.div
                                layout
                                key={movie.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <MovieCard movie={movie} index={index} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredMovies.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-500">No movies found matching your criteria.</h3>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setActiveCategory("All");
                                setSelectedFilters({ languages: [], formats: [] });
                            }}
                            className="mt-4 text-red-500 hover:text-red-400 underline"
                        >
                            Reset all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
