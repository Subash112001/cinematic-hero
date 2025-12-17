"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TrailerModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export const TrailerModal = ({ isOpen, onClose, title, videoSrc }: { isOpen: boolean; onClose: () => void; title: string; videoSrc?: string }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="w-full h-full flex items-center justify-center bg-black">
                            {videoSrc ? (
                                <video
                                    src={videoSrc}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="text-center text-white">
                                    <p className="text-xl mb-4">Trailer for: {title}</p>
                                    <p className="text-gray-400 text-sm">Video source not found</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
