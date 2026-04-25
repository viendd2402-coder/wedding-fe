"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../santorini-dream.module.css";

export function Menu({ isPublicInviteSnapshot }: { isPublicInviteSnapshot?: boolean }) {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={styles.menuRoot}
    >
      <div className={styles.menuLinks}>
        <a href="#couple">Cặp đôi</a>
        <a href="#story">Hành trình</a>
        <a href="#events">Sự kiện</a>
        <a href="#gallery">Album</a>
        <a href="#rsvp">Xác nhận</a>
        <a href="#gift">Quà tặng</a>
        
        {!isPublicInviteSnapshot && (
          <Link href="/" className="text-cobalt/40">Trang chủ</Link>
        )}
      </div>
    </motion.nav>
  );
}
