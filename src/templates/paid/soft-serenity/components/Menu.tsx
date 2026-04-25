import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../soft-serenity.module.css";

export function Menu({ isPublicInviteSnapshot }: { isPublicInviteSnapshot?: boolean }) {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={styles.menuRoot}
    >
      <div className={styles.menuLinks}>
        <a href="#intro">Chào mừng</a>
        <a href="#couple">Cặp đôi</a>
        <a href="#story">Hành trình</a>
        <a href="#events">Sự kiện</a>
        <a href="#gallery">Album</a>
        <a href="#rsvp-form">Xác nhận</a>
        <a href="#gift">Mừng cưới</a>
        
        {!isPublicInviteSnapshot && (
          <>
            <div className={styles.menuDivider} />
            <Link href="/" className={styles.homeLink}>Trang chủ</Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}
