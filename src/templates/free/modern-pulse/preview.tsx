"use client";

import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { gentleHarmonyPreviewMessages } from "@/i18n/messages/template-previews/gentle-harmony";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import Link from "next/link";
import { Oswald, Inter } from "next/font/google";
import styles from "./modern-pulse.module.css";
import { modernPulseDefaultGallery } from "./data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mp-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mp-sans",
});

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function ModernPulsePreview({
  template,
  preview,
  images,
  onPreviewImage,
  isPublicInviteSnapshot = false,
}: TemplatePreviewProps) {
  const { language } = useGlobalPreferences();
  const copy = gentleHarmonyPreviewMessages[language];
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cover = images.coverImage || template.image;
  const galleryCount = parseInt(preview.ghAlbumVisibleCount || "6");
  const gallery = images.galleryImages.length > 0 ? images.galleryImages : modernPulseDefaultGallery;
  const limitedGallery = gallery.slice(0, galleryCount);
  
  const fontVars = `${oswald.variable} ${inter.variable}`;

  return (
    <div className={`${fontVars} ${styles.root}`}>
      <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ""}`}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <div className={styles.navLogo}>{preview.groom} × {preview.bride}</div>
            {!isPublicInviteSnapshot && (
              <Link href="/" className={styles.backBtn}>{copy.back}</Link>
            )}
          </div>
        </div>
      </nav>

      <main>
        {/* Cinematic Hero */}
        <section className={styles.hero}>
          <motion.div 
            className={styles.heroImage} 
            style={{ backgroundImage: `url(${cover})`, opacity: heroOpacity, scale: heroScale }} 
          />
          <div className={styles.heroOverlay} />
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className={styles.container}>
              <span className={styles.heroEyebrow}>Joined as one</span>
              <h1 className={styles.heroTitle}>
                {preview.groom} <span>&</span> {preview.bride}
              </h1>
              <div className={styles.heroDate}>{preview.dateLabel}</div>
            </div>
          </motion.div>
          <div className={styles.scrollIndicator}>
            <span>Scroll</span>
            <div className={styles.scrollLine} />
          </div>
        </section>

        {/* Editorial Intro */}
        <section className={styles.introSection}>
          <div className={styles.container}>
            <motion.div className={styles.introContent} {...fadeInUp}>
              <h2 className={styles.boldTitle}>{copy.invitation}</h2>
              <p className={styles.introText}>
                {preview.ghIntroText || preview.sectionPartyLead || copy.inviteBody}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Compact Couple */}
        <section className={styles.coupleSection}>
          <div className={styles.container}>
            <div className={styles.coupleGrid}>
              <motion.div className={styles.coupleCard} {...fadeInUp}>
                <div className={styles.coupleImageWrapper}>
                  <img src={images.groomPortraitImage || "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800"} alt={preview.groom} />
                </div>
                <div className={styles.coupleMeta}>
                  <h3>{preview.groom}</h3>
                  <p>{preview.ghGroomBio || preview.groomBio || "Chúng tôi tin rằng mỗi người sinh ra đều dành cho một ai đó. Cảm ơn định mệnh đã mang chúng mình đến với nhau."}</p>
                </div>
              </motion.div>

              <div className={styles.coupleDivider}>&</div>

              <motion.div className={styles.coupleCard} {...fadeInUp} transition={{ delay: 0.2 }}>
                <div className={styles.coupleImageWrapper}>
                  <img src={images.bridePortraitImage || "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800"} alt={preview.bride} />
                </div>
                <div className={styles.coupleMeta}>
                  <h3>{preview.bride}</h3>
                  <p>{preview.ghBrideBio || preview.brideBio || "Tình yêu không phải là tìm thấy một ai đó hoàn hảo, mà là học cách để nhìn thấy những điều tuyệt vời từ một người không hoàn hảo."}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Compact Grid Events */}
        <section className={styles.eventsSection}>
          <div className={styles.container}>
            <motion.div className={styles.eventsHeader} {...fadeInUp}>
              <h2 className={styles.boldTitle}>{copy.eventsTitle}</h2>
            </motion.div>
            <div className={styles.eventsGrid}>
              {[
                { title: copy.ceremony, time: preview.ghCeremonyTime || preview.ceremonyTime, venue: preview.ghCeremonyVenue || preview.venue, location: preview.ghCeremonyLocation || preview.location, icon: "⚡" },
                { title: "Tiệc Nhà Trai", time: preview.ghGroomPartyTime || preview.partyTime, venue: preview.ghGroomPartyVenue || preview.venue, location: preview.ghGroomPartyLocation || preview.location, icon: "⦿" },
                { title: "Tiệc Nhà Gái", time: preview.ghBridePartyTime || (preview.ghThirdEventTime || preview.partyTime), venue: preview.ghBridePartyVenue || preview.venue, location: preview.ghBridePartyLocation || preview.location, icon: "◈" },
              ].map((event, i) => (
                <motion.div 
                   key={i} 
                   className={styles.eventCard} 
                   {...fadeInUp} 
                   transition={{ delay: i * 0.1 }}
                >
                  <div className={styles.eventIcon}>{event.icon}</div>
                  <h4>{event.title}</h4>
                  <span className={styles.time}>{event.time}</span>
                  <p className={styles.venue}>{event.venue}</p>
                  <a 
                    href={event.location?.startsWith("http") ? event.location : "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.actionBtn}
                  >
                    {copy.viewMap}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Masonry Album - Reverted Style */}
        <section className={styles.albumSection}>
          <div className={styles.container}>
            <motion.div style={{ textAlign: 'center', marginBottom: '4rem' }} {...fadeInUp}>
              <h2 className={styles.boldTitle}>{copy.albumTitle}</h2>
            </motion.div>
            <div className={styles.albumGrid}>
              {limitedGallery.map((src, i) => (
                <motion.div 
                  key={i} 
                  className={styles.albumItem}
                  onClick={() => onPreviewImage({ src, alt: `Photo ${i+1}` })}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                >
                  <img src={src} alt="" loading="lazy" />
                  <div className={styles.albumOverlay}>
                    <div className={styles.viewIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gift Section */}
        <section className={styles.giftSection}>
          <div className={styles.container}>
            <motion.div style={{ textAlign: 'center', marginBottom: '4rem' }} {...fadeInUp}>
              <h2 className={styles.boldTitle}>{copy.giftTitle || "Mừng Cưới"}</h2>
              <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
                {copy.giftLead || "Sự hiện diện của bạn là món quà lớn nhất đối với chúng tôi."}
              </p>
            </motion.div>
            
            <div className={styles.bankGrid}>
              <motion.div className={styles.bankCard} {...fadeInUp}>
                <div className={styles.bankLabel}>🤵 Chú Rể</div>
                <div className={styles.bankInfo}>
                  <p><strong>{preview.ghGroomBankName || preview.bankName}</strong></p>
                  <p>{preview.ghGroomAccountName || preview.accountName}</p>
                  <p className={styles.accNum}>{preview.ghGroomAccountNumber || preview.accountNumber}</p>
                </div>
              </motion.div>

              <motion.div className={styles.bankCard} {...fadeInUp} transition={{ delay: 0.1 }}>
                <div className={styles.bankLabel}>👰 Cô Dâu</div>
                <div className={styles.bankInfo}>
                  <p><strong>{preview.ghBrideBankName || preview.bankName}</strong></p>
                  <p>{preview.ghBrideAccountName || preview.accountName}</p>
                  <p className={styles.accNum}>{preview.ghBrideAccountNumber || preview.accountNumber}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className={styles.footerNames}>
                {preview.groom} <span>&</span> {preview.bride}
              </h2>
              <p className={styles.footerThanks}>{copy.thanks}</p>
            </motion.div>
            <div className={styles.footerBranding}>Modern Pulse • Premium Collection</div>
          </div>
        </div>
      </footer>



    </div>
  );
}

