"use client";

import { motion } from "framer-motion";
import { FaHeart, FaFire, FaSadTear, FaLaughSquint, FaBrain, FaUserAstronaut } from "react-icons/fa";
import { useEffect, useState } from "react";

// Mock Data for Emotions
const EMOTIONS = [
    { label: "Adrenaline", value: 85, color: "bg-red-500", icon: FaFire },
    { label: "Heartbreak", value: 45, color: "bg-blue-500", icon: FaSadTear },
    { label: "Mind-Bending", value: 90, color: "bg-purple-500", icon: FaBrain },
    { label: "Humor", value: 30, color: "bg-yellow-500", icon: FaLaughSquint },
];

// Mock Data for Live Reactions
const REACTIONS = [
    { id: 1, user: "SciFi_Fan99", text: "My brain is still recovering! 🤯", emotion: "Mind-Bending" },
    { id: 2, user: "CinemaLover", text: "The visuals are absolutely insane.", emotion: "Adrenaline" },
    { id: 3, user: "DuneWalker", text: "Hans Zimmer does it again. 🎵", emotion: "Heartbreak" },
    { id: 4, user: "SpaceCadet", text: "I need to watch this in IMAX again.", emotion: "Adrenaline" },
    { id: 5, user: "Critic_Joe", text: "A masterpiece of modern cinema.", emotion: "Mind-Bending" },
];

export default function AudiencePulse() {
    const [activeReaction, setActiveReaction] = useState(0);

    // Auto-scroll reactions
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveReaction((prev) => (prev + 1) % REACTIONS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 items-center">

                    {/* Left Column: Emotional DNA */}
                    <div className="flex-1 w-full">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gray-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
                        >
                            <h2 className="text-3xl font-bebas text-white mb-2 flex items-center gap-3">
                                <FaHeart className="text-red-500 animate-pulse" />
                                Audience Pulse
                            </h2>
                            <p className="text-gray-400 mb-8 text-sm uppercase tracking-wider">Emotional DNA Analysis</p>

                            <div className="space-y-6">
                                {EMOTIONS.map((emotion, index) => (
                                    <div key={emotion.label}>
                                        <div className="flex justify-between text-sm font-bold mb-2">
                                            <span className="flex items-center gap-2 text-gray-300">
                                                <emotion.icon className={emotion.color.replace("bg-", "text-")} />
                                                {emotion.label}
                                            </span>
                                            <span className="text-white">{emotion.value}%</span>
                                        </div>
                                        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${emotion.value}%` }}
                                                transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                                                className={`h-full ${emotion.color} shadow-[0_0_10px_currentColor]`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Vibe Tags */}
                            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-white/10">
                                {["#Masterpiece", "#VisualStunner", "#MustWatch", "#OscarWorthy"].map((tag, i) => (
                                    <motion.span
                                        key={tag}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 + i * 0.1 }}
                                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-blue-300 font-mono hover:bg-white/10 hover:border-blue-400 transition-colors cursor-default"
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Live Buzz */}
                    <div className="flex-1 w-full relative h-[400px] flex items-center justify-center">
                        {/* Central Orb */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="w-48 h-48 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse] absolute" />
                            <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full blur-2xl opacity-50 absolute animate-pulse" />
                        </div>

                        {/* Floating Reactions */}
                        <div className="relative w-full h-full">
                            {REACTIONS.map((reaction, index) => {
                                const isActive = index === activeReaction;
                                return (
                                    <motion.div
                                        key={reaction.id}
                                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                                        animate={{
                                            opacity: isActive ? 1 : 0.3,
                                            scale: isActive ? 1.1 : 0.8,
                                            y: isActive ? 0 : -20 * (index - activeReaction),
                                            zIndex: isActive ? 10 : 0,
                                        }}
                                        transition={{ duration: 0.5 }}
                                        className={`absolute left-0 right-0 mx-auto w-full max-w-md ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                        style={{ top: '40%' }}
                                    >
                                        <div className={`bg-gray-900/80 backdrop-blur-md border ${isActive ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]' : 'border-gray-800'} p-4 rounded-2xl flex items-center gap-4 transition-all duration-500`}>
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center shrink-0">
                                                <FaUserAstronaut className="text-xl text-white" />
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className="font-bold text-white text-sm">@{reaction.user}</h4>
                                                    <span className="text-[10px] text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                        {reaction.emotion}
                                                    </span>
                                                </div>
                                                <p className="text-gray-300 text-sm leading-snug">"{reaction.text}"</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
