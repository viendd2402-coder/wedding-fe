"use client";

import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { gentleHarmonyPreviewMessages } from "@/i18n/messages/template-previews/gentle-harmony";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import styles from "./gentle-harmony.module.css";
import { gentleHarmonyDefaultGallery } from "./data";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gh-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-gh-sans",
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function GentleHarmonyPreview({
  template,
  preview,
  images,
  onPreviewImage,
  isPublicInviteSnapshot = false,
}: TemplatePreviewProps) {
  const { language } = useGlobalPreferences();
  const copy = gentleHarmonyPreviewMessages[language];
  
  const cover = images.coverImage || template.image;
  const gallery = images.galleryImages.length > 0 ? images.galleryImages : gentleHarmonyDefaultGallery;
  const limitedGallery = gallery.slice(0, 9);
  
  // Carousel Images: Cover + first few gallery images
  const carouselImages = [cover, ...gallery.slice(0, 3)];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 6000); // Slower transition for better UX with manual controls
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const fontVars = `${playfair.variable} ${inter.variable}`;

  return (
    <div className={`${fontVars} ${styles.root}`}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.navLogo}>{preview.groom} & {preview.bride}</div>
          {!isPublicInviteSnapshot && (
            <Link href="/" className={styles.backBtn}>{copy.back}</Link>
          )}
        </div>
      </nav>

      <main>
        {/* Hero Carousel */}
        <section className={styles.hero}>
          <div className={styles.heroImageWrapper}>
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentSlide}
                src={carouselImages[currentSlide]} 
                alt={`Wedding Slide ${currentSlide + 1}`} 
                className={styles.heroImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </AnimatePresence>
            <div className={styles.heroOverlay} />
            
            {/* Carousel Controls */}
            <button className={`${styles.carouselBtn} ${styles.prevBtn}`} onClick={handlePrev} aria-label="Previous slide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button className={`${styles.carouselBtn} ${styles.nextBtn}`} onClick={handleNext} aria-label="Next slide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            {/* Carousel Indicators */}
            <div className={styles.carouselIndicators}>
              {carouselImages.map((_, i) => (
                <div 
                  key={i} 
                  className={`${styles.indicator} ${i === currentSlide ? styles.activeIndicator : ""}`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
          </div>
          
          <motion.div 
            className={styles.heroText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className={styles.heroEyebrow}>{copy.saveDate}</span>
            <h1 className={styles.heroTitle}>
              {preview.groom} <span>&</span> {preview.bride}
            </h1>
            <p className={styles.heroDate}>{preview.dateLabel}</p>
          </motion.div>
        </section>

        {/* Intro */}
        <motion.section className={styles.compactSection} {...fadeInUp}>
          <div className={styles.container}>
            <div className={styles.introBox}>
              <div className={styles.introSymbol}>🌿</div>
              <h2 className={styles.sectionTitleSmall}>{copy.invitation}</h2>
              <p className={styles.introText}>
                {preview.ghIntroText || preview.sectionPartyLead || copy.inviteBody}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Couple */}
        <section className={styles.compactSection}>
          <div className={styles.container}>
            <div className={styles.coupleRow}>
              <motion.div className={styles.personCard} {...fadeInUp}>
                <div className={styles.avatarCircle}>
                  <img src={images.groomPortraitImage || "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800"} alt={preview.groom} />
                </div>
                <h3>{preview.groom}</h3>
                <p>{preview.groomBio || "Chú rể"}</p>
              </motion.div>
              
              <div className={styles.coupleDivider}>
                <div className={styles.heartIcon}>&</div>
              </div>

              <motion.div className={styles.personCard} {...fadeInUp} transition={{ delay: 0.1 }}>
                <div className={styles.avatarCircle}>
                  <img src={images.bridePortraitImage || "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800"} alt={preview.bride} />
                </div>
                <h3>{preview.bride}</h3>
                <p>{preview.brideBio || "Cô dâu"}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Events */}
        <section className={`${styles.compactSection} ${styles.bgLight}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeaderCompact}>
              <h2 className={styles.sectionTitleSmall}>{copy.eventsTitle}</h2>
            </div>
            <div className={styles.eventsGridThree}>
              <motion.div className={styles.eventBoxCompact} {...fadeInUp}>
                <span className={styles.eventLabel}>01</span>
                <h4>{copy.ceremony}</h4>
                <div className={styles.eventData}>
                  <p className={styles.time}>{preview.ceremonyTime}</p>
                  <p className={styles.venue}>{preview.venue}</p>
                </div>
                <a href="#" className={styles.mapLinkSmall}>{copy.viewMap}</a>
              </motion.div>

              <motion.div className={styles.eventBoxCompact} {...fadeInUp} transition={{ delay: 0.1 }}>
                <span className={styles.eventLabel}>02</span>
                <h4>Tiệc Nhà Trai</h4>
                <div className={styles.eventData}>
                  <p className={styles.time}>{preview.partyTime}</p>
                  <p className={styles.venue}>{preview.venue}</p>
                </div>
                <a href="#" className={styles.mapLinkSmall}>{copy.viewMap}</a>
              </motion.div>

              <motion.div className={styles.eventBoxCompact} {...fadeInUp} transition={{ delay: 0.2 }}>
                <span className={styles.eventLabel}>03</span>
                <h4>{preview.ghThirdEventTitle || "Tiệc Nhà Gái"}</h4>
                <div className={styles.eventData}>
                  <p className={styles.time}>{preview.ghThirdEventTime || preview.partyTime}</p>
                  <p className={styles.venue}>{preview.ghThirdEventVenue || preview.venue}</p>
                </div>
                <a href="#" className={styles.mapLinkSmall}>{copy.viewMap}</a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Album */}
        <section className={styles.compactSection}>
          <div className={styles.container}>
            <motion.div className={styles.sectionHeaderCompact} {...fadeInUp}>
              <h2 className={styles.sectionTitleSmall}>{copy.albumTitle}</h2>
            </motion.div>
            <div className={styles.bentoGallery}>
              {limitedGallery.map((src, i) => (
                <motion.div 
                  key={i} 
                  className={`${styles.bentoItem} ${styles[`item${i+1}`]}`}
                  onClick={() => onPreviewImage({ src, alt: `Gallery ${i+1}` })}
                  {...fadeInUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <img src={src} alt="" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.newFooter}>
        <div className={styles.container}>
          <div className={styles.footerCircle}>
            <div className={styles.footerBrandNames}>
              <span>{preview.groom}</span>
              <span className={styles.footerAmp}>&</span>
              <span>{preview.bride}</span>
            </div>
          </div>
          <div className={styles.footerInfo}>
            <p className={styles.footerThank}>{copy.thanks}</p>
            <div className={styles.footerDate}>{preview.dateLabel}</div>
            <div className={styles.footerTagline}>Building our future together</div>
          </div>
          <div className={styles.footerCredit}>
            © 2026 Lumiere Wedding Invitations
          </div>
        </div>
      </footer>
    </div>
  );
}
