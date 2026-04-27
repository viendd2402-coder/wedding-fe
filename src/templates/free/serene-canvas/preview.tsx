"use client";

import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { gentleHarmonyPreviewMessages } from "@/i18n/messages/template-previews/gentle-harmony";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import Link from "next/link";
import { EB_Garamond, Outfit } from "next/font/google";
import styles from "./serene-canvas.module.css";
import { sereneCanvasDefaultGallery } from "./data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sc-display",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sc-sans",
});

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
};

export default function SereneCanvasPreview({
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
  const heroImageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cover = images.coverImage || template.image;
  const gallery = images.galleryImages.length > 0 ? images.galleryImages : sereneCanvasDefaultGallery;
  
  const fontVars = `${ebGaramond.variable} ${outfit.variable}`;

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
        {/* Hero Section */}
        <section className={styles.hero}>
          <motion.div 
            className={styles.heroImageContainer}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img 
              src={cover} 
              alt="Hero" 
              className={styles.heroImage}
              style={{ scale: heroImageScale }}
            />
          </motion.div>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.heroEyebrow}>{preview.scHeroEyebrow || copy.saveDate}</span>
            <h1 className={styles.heroTitle}>
              {preview.groom}<br/>& {preview.bride}
            </h1>
            <p className={styles.heroDate}>{preview.dateLabel}</p>
          </motion.div>
        </section>

        {/* Intro Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <motion.div className={styles.introContent} {...fadeInUp}>
              <span className={styles.sectionEyebrow}>{copy.invitation}</span>
              <p className={styles.introText}>
                {preview.ghIntroText || preview.sectionPartyLead || copy.inviteBody}
              </p>
              <div className={styles.introDivider} />
            </motion.div>
          </div>
        </section>

        {/* Couple Section */}
        <section className={`${styles.section} ${styles.couple}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Our Union</span>
              <h2 className={styles.sectionTitle}>The Couple</h2>
            </div>
            <div className={styles.coupleGrid}>
              <motion.div className={styles.person} {...fadeInUp}>
                <div className={styles.personImage}>
                  <img src={images.groomPortraitImage || "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800"} alt={preview.groom} />
                </div>
                <h3>{preview.groom}</h3>
                <p>{preview.groomBio || "Groom"}</p>
              </motion.div>

              <div className={styles.ampersand}>&</div>

              <motion.div className={styles.person} {...fadeInUp} transition={{ delay: 0.2 }}>
                <div className={styles.personImage}>
                  <img src={images.bridePortraitImage || "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800"} alt={preview.bride} />
                </div>
                <h3>{preview.bride}</h3>
                <p>{preview.brideBio || "Bride"}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>{copy.eventsTitle}</span>
              <h2 className={styles.sectionTitle}>{preview.scBigDayTitle || "The Big Day"}</h2>
            </div>
            <div className={styles.eventList}>
              {[
                { title: copy.ceremony, time: preview.ceremonyTime, venue: preview.venue },
                { title: "Groom's Celebration", time: preview.partyTime, venue: preview.venue },
                { title: "Bride's Celebration", time: preview.ghThirdEventTime || preview.partyTime, venue: preview.ghThirdEventVenue || preview.venue },
              ].map((event, i) => (
                <motion.div 
                   key={i} 
                   className={styles.eventItem} 
                   {...fadeInUp} 
                   transition={{ delay: i * 0.1 }}
                >
                  <div className={styles.eventMeta}>
                    <span className={styles.eventTime}>{event.time}</span>
                    <span className={styles.eventDate}>20.10.2026</span>
                  </div>
                  <div className={styles.eventInfo}>
                    <h4>{event.title}</h4>
                    <p className={styles.eventVenue}>{event.venue}</p>
                    <a href="#" className={styles.mapLink}>{copy.viewMap}</a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Album Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>{copy.albumTitle}</span>
              <h2 className={styles.sectionTitle}>{preview.scMomentsTitle || "Moments Captured"}</h2>
            </div>
            <div className={styles.albumGrid}>
              {gallery.slice(0, 9).map((src, i) => (
                <motion.div 
                  key={i} 
                  className={styles.albumImage}
                  onClick={() => onPreviewImage({ src, alt: `Serene ${i+1}` })}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img src={src} alt="" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <motion.div 
              className={styles.footerImage}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
              <img src={images.coverImage || template.image} alt="" />
            </motion.div>
            
            <motion.div 
              className={styles.footerText}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
              <span className={styles.footerEyebrow}>See you there</span>
              <h2 className={styles.footerTitle}>
                {preview.groom} <span>&</span> {preview.bride}
              </h2>
              <p className={styles.footerThanks}>{copy.thanks}</p>
              <div className={styles.footerDate}>{preview.dateLabel}</div>
              
              <div className={styles.footerBottom}>
                <div>Serene Canvas © 2026</div>
                <div>Premium Wedding Invitation</div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
