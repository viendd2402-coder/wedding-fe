"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../midnight-bloom.module.css";

export function Menu({ isPublicInviteSnapshot }: { isPublicInviteSnapshot?: boolean }) {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={styles.menuRoot}
    >
      <div className={styles.menuLinks}>
        <a href="#couple" className="hover:opacity-50 transition-opacity">Cặp đôi</a>
        <a href="#story" className="hover:opacity-50 transition-opacity">Hành trình</a>
        <a href="#events" className="hover:opacity-50 transition-opacity">Sự kiện</a>
        <a href="#gallery" className="hover:opacity-50 transition-opacity">Album</a>
        <a href="#rsvp" className="hover:opacity-50 transition-opacity">Tham dự</a>
        <a href="#gift" className="hover:opacity-50 transition-opacity">Quà tặng</a>
        
        {!isPublicInviteSnapshot && (
          <Link href="/" className="text-gray-400">Trang chủ</Link>
        )}
      </div>
    </motion.nav>
  );
}
