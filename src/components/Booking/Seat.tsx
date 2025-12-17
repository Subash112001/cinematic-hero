"use client";

import { motion } from "framer-motion";

export type SeatStatus = "available" | "selected" | "booked" | "vip";

interface SeatProps {
    id: string;
    status: SeatStatus;
    price: number;
    onSelect: (id: string) => void;
}

export default function Seat({ id, status, price, onSelect }: SeatProps) {
    const getSeatColor = () => {
        switch (status) {
            case "available":
                return "text-gray-700 hover:text-white";
            case "selected":
                return "text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]";
            case "booked":
                return "text-gray-800 cursor-not-allowed opacity-50";
            case "vip":
                return "text-purple-900 hover:text-purple-500";
            default:
                return "text-gray-800";
        }
    };

    return (
        <motion.button
            whileHover={status !== "booked" ? { scale: 1.2 } : {}}
            whileTap={status !== "booked" ? { scale: 0.9 } : {}}
            onClick={() => status !== "booked" && onSelect(id)}
            className={`relative m-1 transition-colors duration-300 group ${getSeatColor()}`}
            disabled={status === "booked"}
        >
            {/* Chair SVG Icon */}
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 sm:w-8 sm:h-8"
            >
                <path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v5h-3V10zM2 10h3v5H2V10zm3.5-6H18.5c.83 0 1.5.67 1.5 1.5V10H4V5.5C4 4.67 4.67 4 5.5 4z" />
            </svg>

            {/* Tooltip */}
            {status !== "booked" && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg">
                    {id} • ₹{price}
                </div>
            )}
        </motion.button>
    );
}
