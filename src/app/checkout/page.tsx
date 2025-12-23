"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FEATURED_MOVIES } from "@/data/movies";
import { THEATRES } from "@/data/theatres";
import { Navbar } from "@/components/Navbar/Navbar";
import { motion } from "framer-motion";
import { FaCreditCard, FaGooglePay, FaApplePay, FaCheckCircle, FaLock, FaShieldAlt } from "react-icons/fa";

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const movieId = searchParams.get("movieId");
    const theatreId = searchParams.get("theatreId");
    const showtimeId = searchParams.get("showtimeId");
    const seats = searchParams.get("seats")?.split(",") || [];
    const price = searchParams.get("price");

    const movie = FEATURED_MOVIES.find((m) => m.id === movieId);
    const theatre = THEATRES.find((t) => t.id === theatreId);
    const showtime = theatre?.showtimes.find((s) => s.id === showtimeId);

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card");

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            router.push(`/confirmation?bookingId=${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
        }, 2000);
    };

    if (!movie || !theatre || !showtime) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-32 pb-12 container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Order Summary - Ticket Style */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-8 bg-red-600 rounded-full" />
                            Order Summary
                        </h2>

                        <div className="relative bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                            {/* Movie Header */}
                            <div className="relative h-48">
                                <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                                <div className="absolute bottom-4 left-6">
                                    <h3 className="text-3xl font-bebas text-white mb-1">{movie.title}</h3>
                                    <p className="text-gray-300 text-sm">{movie.rating} • {movie.language} • {movie.duration}</p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-6 space-y-6 relative">
                                {/* Perforated Line */}
                                <div className="absolute top-0 left-0 right-0 border-t-2 border-dashed border-gray-700" />
                                <div className="absolute top-0 -left-3 w-6 h-6 bg-black rounded-full -translate-y-1/2" />
                                <div className="absolute top-0 -right-3 w-6 h-6 bg-black rounded-full -translate-y-1/2" />

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Theatre</p>
                                        <p className="font-semibold text-white">{theatre.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Showtime</p>
                                        <p className="font-semibold text-white">{showtime.time} ({showtime.type})</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Seats</p>
                                        <p className="font-bold text-xl text-red-500">{seats.join(", ")}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Date</p>
                                        <p className="font-semibold text-white">Today</p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-800 pt-4 space-y-3">
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>Subtotal</span>
                                        <span>₹{price}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>Convenience Fee</span>
                                        <span>₹40</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                                        <span className="font-bold text-lg">Total Payable</span>
                                        <span className="font-bold text-2xl text-white">₹{Number(price) + 40}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-8 bg-red-600 rounded-full" />
                            Payment Method
                        </h2>

                        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-3xl p-8">
                            <div className="flex items-center gap-2 text-green-400 text-sm mb-6 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                                <FaShieldAlt />
                                <span>100% Secure Payment with 256-bit Encryption</span>
                            </div>

                            <div className="space-y-4 mb-8">
                                <label className={`group flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-300 ${paymentMethod === "card" ? "border-red-500 bg-red-500/5 shadow-[0_0_20px_rgba(229,9,20,0.1)]" : "border-gray-700 hover:border-gray-500 hover:bg-gray-800"}`}>
                                    <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="hidden" />
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors ${paymentMethod === "card" ? "bg-red-500 text-white" : "bg-gray-800 text-gray-400"}`}>
                                        <FaCreditCard />
                                    </div>
                                    <div className="flex-1">
                                        <span className="font-bold block text-lg">Credit/Debit Card</span>
                                        <span className="text-xs text-gray-500">Visa, Mastercard, Amex</span>
                                    </div>
                                    {paymentMethod === "card" && <FaCheckCircle className="text-xl text-red-500" />}
                                </label>

                                <label className={`group flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-300 ${paymentMethod === "upi" ? "border-red-500 bg-red-500/5 shadow-[0_0_20px_rgba(229,9,20,0.1)]" : "border-gray-700 hover:border-gray-500 hover:bg-gray-800"}`}>
                                    <input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} className="hidden" />
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors ${paymentMethod === "upi" ? "bg-red-500 text-white" : "bg-gray-800 text-gray-400"}`}>
                                        <FaGooglePay />
                                    </div>
                                    <div className="flex-1">
                                        <span className="font-bold block text-lg">UPI</span>
                                        <span className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</span>
                                    </div>
                                    {paymentMethod === "upi" && <FaCheckCircle className="text-xl text-red-500" />}
                                </label>

                                <label className={`group flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-300 ${paymentMethod === "wallet" ? "border-red-500 bg-red-500/5 shadow-[0_0_20px_rgba(229,9,20,0.1)]" : "border-gray-700 hover:border-gray-500 hover:bg-gray-800"}`}>
                                    <input type="radio" name="payment" value="wallet" checked={paymentMethod === "wallet"} onChange={() => setPaymentMethod("wallet")} className="hidden" />
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors ${paymentMethod === "wallet" ? "bg-red-500 text-white" : "bg-gray-800 text-gray-400"}`}>
                                        <FaApplePay />
                                    </div>
                                    <div className="flex-1">
                                        <span className="font-bold block text-lg">Wallets</span>
                                        <span className="text-xs text-gray-500">Apple Pay, Amazon Pay</span>
                                    </div>
                                    {paymentMethod === "wallet" && <FaCheckCircle className="text-xl text-red-500" />}
                                </label>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full py-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(229,9,20,0.4)] hover:shadow-[0_0_50px_rgba(229,9,20,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg transform hover:scale-[1.02]"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                        Processing Securely...
                                    </>
                                ) : (
                                    <>
                                        <FaLock className="text-sm" />
                                        Pay ₹{Number(price) + 40}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
