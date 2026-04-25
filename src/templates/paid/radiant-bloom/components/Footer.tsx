import React from "react";
import { serif, sans } from "./SharedFonts";

export function Footer({ preview }: { preview: any }) {
  return (
    <footer className="relative w-full py-32 px-6 flex flex-col items-center bg-[#FDFBF7] text-[#1a1a1a] border-t border-[#1a1a1a]/10">
      <div className="w-full max-w-7xl flex flex-col items-center md:items-start text-center md:text-left gap-12">
        <h2 className={`text-5xl md:text-7xl lg:text-9xl leading-[0.8] tracking-tighter ${serif.className}`}>
          {preview.rbFooterThanks || "Thank You."}
        </h2>
        
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-12 mt-12 md:mt-24 border-t border-[#1a1a1a]/10 pt-12">
          <h1 className={`text-3xl md:text-5xl ${serif.className}`}>
            {preview.groom}
            <span className="text-[#FF4D4D] mx-4 italic">&</span>
            {preview.bride}
          </h1>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className={`text-[#FF4D4D] tracking-[0.4em] uppercase text-xs font-medium ${sans.className}`}>
              Forever Begins
            </p>
            <p className={`text-[#1a1a1a]/50 tracking-widest uppercase text-sm ${sans.className}`}>
              {preview.dateLabel}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
