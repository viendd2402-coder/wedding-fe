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
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-full px-8 py-4 flex items-center gap-6 md:gap-8 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#5A5050] font-medium ${sans.className} whitespace-nowrap overflow-x-auto max-w-[90vw] no-scrollbar`}
    >
      <a href="#story" className="hover:text-[#C9A9A9] transition-colors duration-300">Chuyện tình</a>
      <a href="#couple" className="hover:text-[#C9A9A9] transition-colors duration-300 hidden md:block">Cô dâu - Chú rể</a>
      <a href="#events" className="hover:text-[#C9A9A9] transition-colors duration-300">Sự kiện</a>
      <a href="#gallery" className="hover:text-[#C9A9A9] transition-colors duration-300">Kỷ niệm</a>
      <a href="#rsvp" className="hover:text-[#C9A9A9] transition-colors duration-300">Hồi đáp</a>
      <a href="#gift" className="hover:text-[#C9A9A9] transition-colors duration-300">Quà cưới</a>
      
      {!isPublicInviteSnapshot && (
        <>
          <div className="w-px h-4 bg-[#8C7A7A]/30" />
          <Link href="/" className="hover:text-[#C9A9A9] transition-colors duration-300">
            Trang chủ
          </Link>
        </>
      )}
    </motion.nav>
  );
}
