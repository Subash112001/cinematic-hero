"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        // Sequence:
        // 0s: Start (Zoom out text)
        // 2.5s: Flash Start
        // 3.0s: Flash Peak (White screen) -> Reveal
        // 4.0s: Complete
        const timer1 = setTimeout(() => setPhase(1), 2500);
        const timer2 = setTimeout(onComplete, 3500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
            animate={{ opacity: phase === 1 ? 0 : 1, pointerEvents: phase === 1 ? "none" : "auto" }}
            transition={{ duration: 1, delay: 0.5 }}
        >
            {/* Ethereal Text Reveal */}
            <div className="relative z-20 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ scale: 3, filter: "blur(20px)", opacity: 0 }}
                    animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="relative"
                >
                    <h1 className="text-8xl md:text-[10rem] font-bebas text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 tracking-tighter">
                        CINEVERSE
                    </h1>
                    {/* Text Glow */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute inset-0 blur-2xl bg-white/20 -z-10"
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, letterSpacing: "0em" }}
                    animate={{ opacity: 1, letterSpacing: "0.5em" }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="text-accent-primary mt-6 text-xl font-light uppercase"
                >
                    Every Ticket Tells a Story
                </motion.p>
            </div>

            {/* Flash Effect Overlay */}
            {/*<motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 1 ? [0, 1, 0] : 0 }}
                transition={{ duration: 0.8, times: [0, 0.1, 1] }}
                className="absolute inset-0 bg-white z-50 pointer-events-none"
            />*/}

            {/* Background Atmosphere */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 z-10"
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
            </motion.div>
        </motion.div>
    );
};
