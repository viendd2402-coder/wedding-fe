"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Countdown({ targetDate }: { targetDate: string }) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    if (targetDate) {
      const target = new Date(targetDate).getTime();
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = target - now;
        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          });
        } else {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [targetDate]);

  if (!mounted) return null;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item: import("framer-motion").Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[#C9A9A9]/20 to-transparent z-0" />
        
        <motion.div 
          variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-12 relative z-10"
        >
          {[
            { label: "Ngày", value: timeLeft.days },
            { label: "Giờ", value: timeLeft.hours },
            { label: "Phút", value: timeLeft.minutes },
            { label: "Giây", value: timeLeft.seconds },
          ].map((unit, idx) => (
            <motion.div key={idx} variants={item} className="group">
              <div className="relative w-24 h-24 md:w-36 md:h-36 flex flex-col items-center justify-center">
                {/* Glass Circle */}
                <div className="absolute inset-0 bg-white/30 backdrop-blur-md border border-white/60 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.03)] group-hover:scale-105 group-hover:bg-white/50 transition-all duration-700 ease-out" />
                
                <div className="relative">
                  <div className={`text-4xl md:text-5xl text-[#5A5050] mb-1 font-light tracking-tight ${serif.className}`}>
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className={`uppercase tracking-[0.3em] text-[8px] md:text-[9px] text-[#8C7A7A] text-center ${sans.className}`}>
                    {unit.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
