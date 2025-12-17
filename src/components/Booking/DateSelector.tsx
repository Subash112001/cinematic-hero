"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface DateSelectorProps {
    onDateSelect: (date: Date) => void;
}

export default function DateSelector({ onDateSelect }: DateSelectorProps) {
    const [selectedDate, setSelectedDate] = useState(0);

    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date;
    });

    const handleSelect = (index: number, date: Date) => {
        setSelectedDate(index);
        onDateSelect(date);
    };

    return (
        <div className="w-full">
            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
                {dates.map((date, index) => {
                    const isSelected = selectedDate === index;
                    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                    const dayNumber = date.getDate();
                    const month = date.toLocaleDateString("en-US", { month: "short" });

                    return (
                        <motion.button
                            key={index}
                            onClick={() => handleSelect(index, date)}
                            className={`relative flex flex-col items-center justify-center min-w-[80px] h-24 rounded-2xl border transition-all duration-300 snap-center group ${isSelected
                                    ? "bg-gradient-to-br from-red-600 to-red-800 border-red-500 text-white shadow-[0_0_20px_rgba(229,9,20,0.4)] scale-105"
                                    : "bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-600 hover:bg-gray-800 hover:text-white"
                                }`}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isSelected && (
                                <motion.div
                                    layoutId="activeDateGlow"
                                    className="absolute inset-0 rounded-2xl bg-red-600 blur-md -z-10 opacity-50"
                                />
                            )}

                            <span className="text-xs font-medium uppercase tracking-wider mb-1 opacity-80">{dayName}</span>
                            <span className="text-2xl font-bold mb-1">{dayNumber}</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-60">{month}</span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
