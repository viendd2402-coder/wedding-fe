"use client";

import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { gentleHarmonyPreviewMessages } from "@/i18n/messages/template-previews/gentle-harmony";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import Link from "next/link";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import styles from "./noir-editorial.module.css";
import { noirEditorialDefaultGallery } from "./data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ne-display",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ne-sans",
});

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function NoirEditorialPreview({
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
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cover = images.coverImage || template.image;
  const galleryCount = parseInt(preview.ghAlbumVisibleCount || "6");
  const gallery = images.galleryImages.length > 0 ? images.galleryImages : noirEditorialDefaultGallery;
  const limitedGallery = gallery.slice(0, galleryCount);
  
  const fontVars = `${cormorant.variable} ${montserrat.variable}`;

  return (
    <div className={`${fontVars} ${styles.root}`}>
      <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ""}`}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <div className={styles.navLogo}>{preview.groom} & {preview.bride}</div>
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
            style={{ backgroundImage: `url(${cover})`, y: heroImageY }} 
          />
          <div className={styles.heroOverlay} />
          <motion.div 
            className={styles.heroContent}
            style={{ opacity: heroTextOpacity }}
          >
            <div className={styles.container}>
              <span className={styles.heroEyebrow}>{preview.neHeroEyebrow || "Editorial Issue Vol. 01"}</span>
              <h1 className={styles.heroTitle}>

                {preview.groom} <span>&</span> {preview.bride}
              </h1>
              <div className={styles.heroDate}>{preview.dateLabel}</div>
            </div>
          </motion.div>
        </section>

        {/* Intro Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.introGrid}>
              <motion.div className={styles.introImageWrapper} {...fadeInUp}>
                <img src={gallery[1] || cover} alt="Intro" />
              </motion.div>
              <motion.div className={styles.introContent} {...fadeInUp} transition={{ delay: 0.2 }}>
                <h2 className={styles.sectionTitle}>{copy.invitation}</h2>
                <p className={styles.introText}>
                  {preview.ghIntroText || preview.sectionPartyLead || copy.inviteBody}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Couple Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <motion.div style={{ textAlign: 'center', marginBottom: '5rem' }} {...fadeInUp}>
              <h2 className={styles.sectionTitle}>{preview.neProtagonistsTitle || "The Protagonists"}</h2>
            </motion.div>

            <div className={styles.coupleGrid}>
              <motion.div className={styles.coupleCard} {...fadeInUp}>
                <div className={styles.coupleImgBox}>
                  <img src={images.groomPortraitImage || "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800"} alt={preview.groom} />
                </div>
                <div className={styles.coupleInfo}>
                  <h3>{preview.groom}</h3>
                  <p>{preview.ghGroomBio || preview.groomBio || "Chúng tôi tin rằng mỗi người sinh ra đều dành cho một ai đó. Cảm ơn định mệnh đã mang chúng mình đến với nhau."}</p>
                </div>
              </motion.div>

              <motion.div className={styles.coupleCard} {...fadeInUp} transition={{ delay: 0.2 }}>
                <div className={styles.coupleImgBox}>
                  <img src={images.bridePortraitImage || "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800"} alt={preview.bride} />
                </div>
                <div className={styles.coupleInfo}>
                  <h3>{preview.bride}</h3>
                  <p>{preview.ghBrideBio || preview.brideBio || "Tình yêu không phải là tìm thấy một ai đó hoàn hảo, mà là học cách để nhìn thấy những điều tuyệt vời từ một người không hoàn hảo."}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <motion.div style={{ textAlign: 'center', marginBottom: '5rem' }} {...fadeInUp}>
              <h2 className={styles.sectionTitle}>{copy.eventsTitle}</h2>
            </motion.div>
            <div className={styles.eventsGrid}>
              {[
                { title: copy.ceremony, time: preview.ghCeremonyTime || preview.ceremonyTime, venue: preview.ghCeremonyVenue || preview.venue, location: preview.ghCeremonyLocation || preview.location },
                { title: "Groom's Reception", time: preview.ghGroomPartyTime || preview.partyTime, venue: preview.ghGroomPartyVenue || preview.venue, location: preview.ghGroomPartyLocation || preview.location },
                { title: "Bride's Reception", time: preview.ghBridePartyTime || (preview.ghThirdEventTime || preview.partyTime), venue: preview.ghBridePartyVenue || preview.venue, location: preview.ghBridePartyLocation || preview.location },
              ].map((event, i) => (
                <motion.div 
                   key={i} 
                   className={styles.eventCard} 
                   {...fadeInUp} 
                   transition={{ delay: i * 0.1 }}
                >
                  <span className={styles.eventNum}>Part 0{i+1}</span>
                  <h4>{event.title}</h4>
                  <span className={styles.eventTime}>{event.time}</span>
                  <p className={styles.eventVenue}>{event.venue}</p>
                  <a 
                    href={event.location?.startsWith("http") ? event.location : "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.mapBtn}
                  >
                    {copy.viewMap}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Album Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <motion.div style={{ textAlign: 'center', marginBottom: '5rem' }} {...fadeInUp}>
              <h2 className={styles.sectionTitle}>{copy.albumTitle}</h2>
            </motion.div>
            <div className={styles.albumGrid}>
              {limitedGallery.map((src, i) => (
                <motion.div 
                  key={i} 
                  className={`${styles.albumItem} ${i === 0 ? styles.itemLarge : i === 3 ? styles.itemTall : ""}`}
                  onClick={() => onPreviewImage({ src, alt: `Editorial ${i+1}` })}
                  {...fadeInUp}
                  transition={{ delay: (i % 3) * 0.1 }}
                >
                  <img src={src} alt="" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Gift Section */}
        <section className={styles.giftSection}>
          <div className={styles.container}>
            <motion.div style={{ textAlign: 'center', marginBottom: '5rem' }} {...fadeInUp}>
              <h2 className={styles.sectionTitle}>{copy.giftTitle || "Mừng Cưới"}</h2>
            </motion.div>
            
            <div className={styles.bankGrid}>
              <motion.div className={styles.bankCard} {...fadeInUp}>
                <h3 className={styles.bankTitle}>Nhà Chú Rể</h3>
                <div className={styles.bankDetails}>
                  <p><strong>Ngân hàng:</strong> {preview.ghGroomBankName || preview.bankName}</p>
                  <p><strong>Chủ TK:</strong> {preview.ghGroomAccountName || preview.accountName}</p>
                  <p className={styles.accNumber}>{preview.ghGroomAccountNumber || preview.accountNumber}</p>
                </div>
              </motion.div>

              <motion.div className={styles.bankCard} {...fadeInUp} transition={{ delay: 0.1 }}>
                <h3 className={styles.bankTitle}>Nhà Cô Dâu</h3>
                <div className={styles.bankDetails}>
                  <p><strong>Ngân hàng:</strong> {preview.ghBrideBankName || preview.bankName}</p>
                  <p><strong>Chủ TK:</strong> {preview.ghBrideAccountName || preview.accountName}</p>
                  <p className={styles.accNumber}>{preview.ghBrideAccountNumber || preview.accountNumber}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerBg}>
          <img src={images.coverImage || gallery[0]} alt="" />
          <div className={styles.footerOverlay} />
        </div>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <motion.div {...fadeInUp}>
              <span className={styles.footerEyebrow}>{copy.saveDate}</span>
              <h2 className={styles.footerTitle}>
                {preview.groom} <span>&</span> {preview.bride}
              </h2>
              <div className={styles.footerDivider} />
              <p className={styles.footerThanks}>{copy.thanks}</p>
            </motion.div>
            
            <div className={styles.footerBottom}>
              <div className={styles.footerInfo}>
                <span>Noir Editorial</span>
                <span>© 2026</span>
              </div>
              <div className={styles.footerTagline}>Built for the moments that matter</div>
              <div className={styles.footerCredits}>All rights reserved</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
