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
      className={`fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-[#F4F1EA] px-6 py-4 flex items-center justify-center md:justify-end gap-6 md:gap-10 text-[9px] md:text-xs uppercase tracking-[0.4em] text-[#1a1a1a] font-bold ${sans.className} whitespace-nowrap overflow-x-auto`}
    >
      <a href="#couple" className="hover:text-[#FF4D4D] transition-colors duration-300">Cặp Đôi</a>
      <a href="#story" className="hover:text-[#FF4D4D] transition-colors duration-300">Câu Chuyện</a>
      <a href="#events" className="hover:text-[#FF4D4D] transition-colors duration-300">Sự Kiện</a>
      <a href="#gallery" className="hover:text-[#FF4D4D] transition-colors duration-300">Hình Ảnh</a>
      <a href="#rsvp" className="hover:text-[#FF4D4D] transition-colors duration-300">Xác Nhận</a>
      <a href="#gift" className="hover:text-[#FF4D4D] transition-colors duration-300">Mừng Cưới</a>
      
      {!isPublicInviteSnapshot && (
        <>
          <div className="w-px h-3 bg-[#1a1a1a]/10" />
          <Link href="/" className="hover:text-[#FF4D4D] transition-colors duration-300">
            Trang chủ
          </Link>
        </>
      )}
    </motion.nav>
  );
}
