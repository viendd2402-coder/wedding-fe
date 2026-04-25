import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Story({ preview }: { preview: any }) {
  return (
    <section className="relative w-full py-24 md:py-40 px-6 md:px-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl flex flex-col md:flex-row gap-12 md:gap-24 items-start"
      >
        <div className="w-full md:w-1/3">
          <span className={`text-[#FF4D4D] text-xs uppercase tracking-[0.3em] font-semibold mb-6 block ${sans.className}`}>
            Our Story
          </span>
          <p className={`text-sm md:text-base text-[#1a1a1a]/70 leading-relaxed font-light text-justify md:text-left ${sans.className}`}>
            {preview.rbWelcomeText || "We started our journey with a simple hello, which turned into a million moments we never want to forget. This is the story of us, unscripted and beautifully imperfect."}
          </p>
        </div>

        <div className="w-full md:w-2/3 relative">
          <h2 className={`text-3xl md:text-5xl lg:text-7xl text-[#1a1a1a] leading-[1.1] ${serif.className}`}>
            <span className="text-[#FF4D4D] italic pr-4 font-light">"</span>
            {preview.rbWelcomeTitle || "To love and be loved is to feel the sun from both sides."}
          </h2>
          <div className="w-1/3 h-[1px] bg-[#1a1a1a] mt-12" />
        </div>
      </motion.div>
    </section>
  );
}
