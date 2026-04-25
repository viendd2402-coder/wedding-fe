import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Rsvp({ preview }: { preview: any }) {
  return (
    <section className="relative w-full py-24 md:py-40 px-6 bg-[#FDFBF7] text-[#1a1a1a] border-t border-[#1a1a1a]/10">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2"
        >
          <span className={`text-[#FF4D4D] text-xs uppercase tracking-[0.4em] font-medium block mb-4 ${sans.className}`}>
            RSVP
          </span>
          <h2 className={`text-5xl md:text-7xl lg:text-8xl mb-8 leading-[0.9] tracking-tighter ${serif.className}`}>
            {preview.rbRsvpTitle || "Will you be there?"}
          </h2>
          <p className={`text-[#1a1a1a]/70 font-light text-lg ${sans.className}`}>
            {preview.rbRsvpLead || "We eagerly await your reply. Please let us know if you can join our celebration."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full md:w-1/2"
        >
          <form className={`flex flex-col gap-8 ${sans.className}`}>
            <div className="relative border-b border-[#1a1a1a]/30 pb-2">
              <input 
                type="text" 
                placeholder="YOUR NAME"
                className="w-full bg-transparent text-[#1a1a1a] placeholder-[#1a1a1a]/50 text-xl md:text-2xl outline-none uppercase tracking-widest"
              />
            </div>
            
            <div className="flex gap-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-6 h-6 rounded-full border border-[#1a1a1a]/50 flex items-center justify-center group-hover:border-[#FF4D4D] transition-colors">
                  <div className="w-3 h-3 rounded-full bg-[#FF4D4D] scale-0 transition-transform" />
                </div>
                <span className="uppercase tracking-widest text-sm text-[#1a1a1a]/80 group-hover:text-[#1a1a1a] transition-colors">Joyfully Accept</span>
                <input type="radio" name="attend" className="hidden" />
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-6 h-6 rounded-full border border-[#1a1a1a]/50 flex items-center justify-center group-hover:border-[#1a1a1a] transition-colors">
                  <div className="w-3 h-3 rounded-full bg-[#1a1a1a] scale-0 transition-transform" />
                </div>
                <span className="uppercase tracking-widest text-sm text-[#1a1a1a]/80 group-hover:text-[#1a1a1a] transition-colors">Regretfully Decline</span>
                <input type="radio" name="attend" className="hidden" />
              </label>
            </div>

            <div className="relative border-b border-[#1a1a1a]/30 pb-2 mt-4">
              <textarea 
                rows={1}
                placeholder="A NOTE FOR THE COUPLE"
                className="w-full bg-transparent text-[#1a1a1a] placeholder-[#1a1a1a]/50 text-xl md:text-2xl outline-none uppercase tracking-widest resize-none"
              />
            </div>

            <button 
              type="button"
              className="mt-8 self-start px-12 py-4 bg-[#1a1a1a] text-[#FDFBF7] uppercase tracking-[0.3em] text-sm hover:bg-[#FF4D4D] transition-colors duration-300"
            >
              Send Reply
            </button>
          </form>
        </motion.div>
        
      </div>
    </section>
  );
}
