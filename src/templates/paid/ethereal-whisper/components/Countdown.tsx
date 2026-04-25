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

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <section className="py-12 md:py-20 px-6">
      <div className="max-w-6xl mx-auto flex justify-center">
        <motion.div 
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex items-center justify-center bg-white/40 backdrop-blur-xl border border-white/60 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.03)] px-10 md:px-20 py-8 md:py-12"
        >
          {[
            { label: "Ngày", value: timeLeft.days },
            { label: "Giờ", value: timeLeft.hours },
            { label: "Phút", value: timeLeft.minutes },
            { label: "Giây", value: timeLeft.seconds },
          ].map((item, index, arr) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center justify-center w-16 md:w-24">
                <div className={`text-4xl md:text-6xl text-[#5A5050] mb-2 tracking-tight ${serif.className}`}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className={`uppercase tracking-[0.3em] text-[8px] md:text-[10px] text-[#8C7A7A] ${sans.className}`}>
                  {item.label}
                </div>
              </div>
              {index < arr.length - 1 && (
                <div className={`text-3xl md:text-5xl text-[#C9A9A9] mx-2 md:mx-4 -mt-6 ${serif.className}`}>:</div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
