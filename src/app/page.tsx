"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/Hero/HeroSection";
import { Navbar } from "@/components/Navbar/Navbar";
import { IntroAnimation } from "@/components/Intro/IntroAnimation";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Check if intro has already been shown in this session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("hasSeenIntro", "true");
  };

  return (
    <main className="min-h-screen bg-background text-white">
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {!showIntro && (
        <>
          <Navbar />
          <HeroSection />
        </>
      )}
    </main>
  );
}
