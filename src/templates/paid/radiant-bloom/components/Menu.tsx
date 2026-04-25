import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { sans } from "./SharedFonts";

export function Menu({ isPublicInviteSnapshot }: { isPublicInviteSnapshot?: boolean }) {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#1a1a1a]/10 px-6 py-4 flex items-center justify-center md:justify-end gap-6 md:gap-10 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#1a1a1a] font-semibold ${sans.className} whitespace-nowrap overflow-x-auto`}
    >
      <a href="#story" className="hover:text-[#FF4D4D] transition-colors duration-300">Story</a>
      <a href="#couple" className="hover:text-[#FF4D4D] transition-colors duration-300 hidden md:block">Couple</a>
      <a href="#events" className="hover:text-[#FF4D4D] transition-colors duration-300">Events</a>
      <a href="#gallery" className="hover:text-[#FF4D4D] transition-colors duration-300">Gallery</a>
      <a href="#rsvp" className="hover:text-[#FF4D4D] transition-colors duration-300">RSVP</a>
      <a href="#gift" className="hover:text-[#FF4D4D] transition-colors duration-300">Registry</a>
      
      {!isPublicInviteSnapshot && (
        <>
          <div className="w-px h-4 bg-[#1a1a1a]/20" />
          <Link href="/" className="hover:text-[#FF4D4D] transition-colors duration-300">
            Trang chủ
          </Link>
        </>
      )}
    </motion.nav>
  );
}
