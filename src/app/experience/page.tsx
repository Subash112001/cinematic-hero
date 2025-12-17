"use client";

import { Navbar } from "@/components/Navbar/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaArrowRight, FaGlassCheers, FaUsers, FaCalendarAlt } from "react-icons/fa";

const EXPERIENCES = [
    {
        id: "imax",
        title: "THE DIRECTOR'S VISION",
        subtitle: "IMAX WITH LASER",
        description: "Witness movies exactly as the filmmakers intended. With crystal-clear images and heart-pounding audio, you don't just watch a movie—you become part of it.",
        image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=2560",
        color: "from-blue-600/20"
    },
    {
        id: "4dx",
        title: "FEEL EVERY MOMENT",
        subtitle: "4DX IMMERSION",
        description: "Engage all your senses. Feel the wind in your hair, the rain on your face, and the thrill of the chase. This is cinema that moves you—literally.",
        image: "https://images.unsplash.com/photo-1517604931442-71053e3e2c28?q=80&w=2560",
        color: "from-red-600/20"
    },
    {
        id: "gold",
        title: "ROYALTY REIMAGINED",
        subtitle: "GOLD CLASS LUXURY",
        description: "Elevate your evening with unparalleled luxury. From personal butler service to gourmet dining at your fingertips, we've redefined what it means to go to the movies.",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=2560",
        color: "from-yellow-600/20"
    }
];

function ExperienceSection({ exp, index }: { exp: typeof EXPERIENCES[0], index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
            {/* Background Image with Parallax */}
            <div className="absolute inset-0 z-0">
                <motion.div style={{ y }} className="w-full h-[120%] absolute -top-[10%]">
                    <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover opacity-40"
                    />
                </motion.div>
                <div className={`absolute inset-0 bg-gradient-to-b ${exp.color} via-black/80 to-black`} />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
                <div className={`space-y-8 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-red-500 tracking-[0.3em] font-bold uppercase mb-4 block">
                            {exp.subtitle}
                        </span>
                        <h2 className="text-6xl md:text-8xl font-bebas leading-none mb-6">
                            {exp.title}
                        </h2>
                        <div className="h-1 w-24 bg-white/20 mb-8" />
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-xl">
                            {exp.description}
                        </p>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3"
                    >
                        EXPLORE FORMAT <FaArrowRight />
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}

export default function ExperiencePage() {
    return (
        <div className="bg-black text-white selection:bg-red-600 selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-50"
                    >
                        <source src="/videos/dune.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-7xl md:text-9xl lg:text-[12rem] font-bebas tracking-tighter leading-none mix-blend-overlay opacity-80"
                    >
                        REDEFINING
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-5xl md:text-8xl font-bebas tracking-tight text-white -mt-4 md:-mt-12 relative z-10"
                    >
                        CINEMA
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs tracking-[0.3em] uppercase text-gray-400">Scroll to Explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-red-500 to-transparent" />
                </motion.div>
            </section>

            {/* Experience Sections */}
            <div className="relative z-10 bg-black">
                {EXPERIENCES.map((exp, index) => (
                    <ExperienceSection key={exp.id} exp={exp} index={index} />
                ))}
            </div>

            {/* Private Events Section */}
            <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden py-24">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519567241046-7f570eee3c9f?q=80&w=2560')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-7xl font-bebas mb-8">PRIVATE SCREENINGS</h2>
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-16">
                            Host your own exclusive premiere. Whether it's a corporate event, a birthday celebration, or just a night out with friends, make it unforgettable with a private theater rental.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                                <FaGlassCheers className="text-4xl text-red-500 mx-auto mb-6" />
                                <h3 className="text-xl font-bold mb-2">Cocktail Receptions</h3>
                                <p className="text-sm text-gray-400">Pre-show gatherings in our VIP lounge.</p>
                            </div>
                            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                                <FaUsers className="text-4xl text-red-500 mx-auto mb-6" />
                                <h3 className="text-xl font-bold mb-2">Corporate Events</h3>
                                <p className="text-sm text-gray-400">Presentations on the big screen.</p>
                            </div>
                            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                                <FaCalendarAlt className="text-4xl text-red-500 mx-auto mb-6" />
                                <h3 className="text-xl font-bold mb-2">Special Occasions</h3>
                                <p className="text-sm text-gray-400">Birthdays, anniversaries, and more.</p>
                            </div>
                        </div>

                        <button className="px-12 py-5 bg-red-600 rounded-full text-white font-bold tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30">
                            INQUIRE NOW
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
