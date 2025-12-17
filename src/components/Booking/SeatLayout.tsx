"use client";

import { useState } from "react";
import Seat, { SeatStatus } from "./Seat";
import { motion } from "framer-motion";

interface SeatLayoutProps {
    rows: number;
    cols: number;
    bookedSeats: string[];
    onSelectionChange: (selectedSeats: string[]) => void;
}

export default function SeatLayout({ rows, cols, bookedSeats, onSelectionChange }: SeatLayoutProps) {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const handleSeatSelect = (id: string) => {
        let newSelection;
        if (selectedSeats.includes(id)) {
            newSelection = selectedSeats.filter((s) => s !== id);
        } else {
            if (selectedSeats.length >= 8) {
                alert("You can only select up to 8 seats.");
                return;
            }
            newSelection = [...selectedSeats, id];
        }
        setSelectedSeats(newSelection);
        onSelectionChange(newSelection);
    };

    const renderSeats = () => {
        const grid = [];
        for (let r = 0; r < rows; r++) {
            const rowSeats = [];
            const rowLabel = String.fromCharCode(65 + r); // A, B, C...

            for (let c = 1; c <= cols; c++) {
                const seatId = `${rowLabel}${c}`;
                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                // Determine price/type based on row (simplified logic)
                const isVip = r >= rows - 2;
                const price = isVip ? 350 : 250;

                let status: SeatStatus = "available";
                if (isBooked) status = "booked";
                else if (isSelected) status = "selected";
                else if (isVip) status = "vip";

                // Add aisle gap
                if (c === 6 || c === 11) {
                    rowSeats.push(<div key={`gap-${c}`} className="w-8" />);
                }

                rowSeats.push(
                    <Seat
                        key={seatId}
                        id={seatId}
                        status={status}
                        price={price}
                        onSelect={handleSeatSelect}
                    />
                );
            }
            grid.push(
                <div key={r} className="flex items-center justify-center mb-2">
                    <span className="w-8 text-center text-gray-600 text-xs font-bold mr-4">{rowLabel}</span>
                    <div className="flex">{rowSeats}</div>
                    <span className="w-8 text-center text-gray-600 text-xs font-bold ml-4">{rowLabel}</span>
                </div>
            );
        }
        return grid;
    };

    return (
        <div className="w-full overflow-x-auto pb-12">
            <div className="min-w-[800px] flex flex-col items-center">
                {/* Screen Container */}
                <div className="relative w-3/4 mb-16 perspective-1000">
                    {/* Screen Glow */}
                    <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -top-10 left-0 right-0 h-32 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none"
                    />

                    {/* Screen Shape */}
                    <div className="h-16 bg-gradient-to-b from-white/20 to-transparent transform rotate-x-12 rounded-t-[50%] border-t-4 border-white/30 shadow-[0_-10px_30px_rgba(255,255,255,0.2)] flex items-end justify-center pb-2">
                        <span className="text-xs text-blue-200 uppercase tracking-[0.5em] font-light">Screen</span>
                    </div>
                </div>

                {/* Seats */}
                <div className="mb-12">
                    {renderSeats()}
                </div>

                {/* Legend */}
                <div className="flex gap-8 text-sm text-gray-400 bg-gray-900/50 px-8 py-4 rounded-full border border-gray-800 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gray-700" />
                        <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gray-800 opacity-50" />
                        <span>Sold</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-purple-900" />
                        <span>VIP</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
