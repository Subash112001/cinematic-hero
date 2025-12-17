"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bell, User, Menu, X, Clock } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "Cinemas", href: "/cinemas" },
    { name: "Experience", href: "/experience" },
];

const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        title: "Booking Confirmed",
        message: "Your tickets for Dune: Part Two are ready!",
        time: "2 mins ago",
        read: false
    },
    {
        id: 2,
        title: "New Offer",
        message: "Get 20% off on F&B with your next booking",
        time: "1 hour ago",
        read: false
    },
    {
        id: 3,
        title: "Coming Soon",
        message: "Tickets for Furiosa open tomorrow!",
        time: "5 hours ago",
        read: true
    }
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const notificationRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-accent-primary rounded flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(229,9,20,0.5)] group-hover:shadow-[0_0_25px_rgba(229,9,20,0.8)] transition-shadow">
                            C
                        </div>
                        <span className="text-2xl font-bebas text-white tracking-wide">CINEVERSE</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-300 hover:text-white text-sm font-medium transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="text-gray-300 hover:text-white transition-colors relative"
                            >
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-primary rounded-full animate-pulse" />
                            </button>

                            {/* Notifications Dropdown */}
                            <AnimatePresence>
                                {isNotificationsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-4 w-80 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                                    >
                                        <div className="p-4 border-b border-white/10 flex justify-between items-center">
                                            <h3 className="font-bold text-white">Notifications</h3>
                                            <span className="text-xs text-accent-primary cursor-pointer hover:underline">Mark all read</span>
                                        </div>
                                        <div className="max-h-[300px] overflow-y-auto">
                                            {MOCK_NOTIFICATIONS.map((notif) => (
                                                <div
                                                    key={notif.id}
                                                    className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${!notif.read ? 'bg-white/[0.02]' : ''}`}
                                                >
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h4 className={`text-sm font-medium ${!notif.read ? 'text-white' : 'text-gray-400'}`}>
                                                            {notif.title}
                                                        </h4>
                                                        <span className="text-xs text-gray-500">{notif.time}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-400 line-clamp-2">{notif.message}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-3 text-center border-t border-white/10">
                                            <button className="text-xs text-gray-400 hover:text-white transition-colors">
                                                View All Notifications
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/dashboard">
                            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/20 flex items-center justify-center overflow-hidden">
                                    <User className="w-4 h-4" />
                                </div>
                            </button>
                        </Link>
                        <button className="md:hidden text-white">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center pt-32 px-4"
                    >
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="w-full max-w-3xl"
                        >
                            <div className="relative mb-12">
                                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search movies, cinemas, or experiences..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="w-full bg-transparent border-b-2 border-gray-800 text-3xl md:text-5xl font-bebas tracking-wide text-white py-4 pl-12 focus:outline-none focus:border-accent-primary transition-colors placeholder:text-gray-700"
                                />
                            </div>

                            {/* Recent Searches / Suggestions */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Trending Now</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {["Dune: Part Two", "Oppenheimer", "IMAX Experience", "PVR Director's Cut"].map((tag) => (
                                            <button
                                                key={tag}
                                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Recent</h3>
                                    <div className="space-y-3">
                                        {[
                                            { text: "Inception - IMAX", type: "Movie" },
                                            { text: "PVR Gold Class", type: "Cinema" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-3 text-gray-400 group-hover:text-white">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{item.text}</span>
                                                </div>
                                                <span className="text-xs text-gray-600 uppercase tracking-wider">{item.type}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
