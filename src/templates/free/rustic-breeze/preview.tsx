"use client";

import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { gentleHarmonyPreviewMessages } from "@/i18n/messages/template-previews/gentle-harmony";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import Link from "next/link";
import { Sacramento, Cormorant_Garamond, Inter } from "next/font/google";
import styles from "./rustic-breeze.module.css";
import { rusticBreezeDefaultGallery } from "./data";
import { motion } from "framer-motion";

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rb-script",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rb-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-rb-sans",
});

import type { HTMLMotionProps } from "framer-motion";
const fadeInUp: HTMLMotionProps<"div"> = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function RusticBreezePreview({
  template,
  preview,
  images,
  onPreviewImage,
  isPublicInviteSnapshot = false,
}: TemplatePreviewProps) {
  const { language } = useGlobalPreferences();
  const copy = gentleHarmonyPreviewMessages[language]; // Reusing messages for consistency in free tier
  
  const cover = (images.coverImage && images.coverImage !== "") 
    ? images.coverImage 
    : (template.image || "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1200");
  const galleryCount = parseInt(preview.ghAlbumVisibleCount || "6");
  const gallery = images.galleryImages.length > 0 ? images.galleryImages : rusticBreezeDefaultGallery;
  const limitedGallery = gallery.slice(0, galleryCount);

  const fontVars = `${sacramento.variable} ${cormorant.variable} ${inter.variable}`;

  return (
    <div className={`${fontVars} ${styles.root}`}>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navBrand}>{preview.groom} & {preview.bride}</div>
          {!isPublicInviteSnapshot && (
            <Link href="/" className={styles.backLink}>{copy.back}</Link>
          )}
        </div>
      </nav>

      <main>
        {/* Rustic Hero - Fixed Banner */}
        <section className={styles.hero}>
          <div className={styles.heroBgContainer}>
            <img 
              src="https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1200" 
              alt="Wedding Banner" 
              className={styles.heroImg}
            />
          </div>
          <div className={styles.heroOverlay} />
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <span className={styles.heroEyebrow}>Joined as one</span>
            <h1 className={styles.heroTitle}>
              {preview.groom} <span className={styles.ampersand}>&</span> {preview.bride}
            </h1>
            <div className={styles.heroDate}>{preview.dateLabel}</div>
            <div className={styles.botanicalIcon}>🌿</div>
          </motion.div>
        </section>

        {/* Introduction */}
        <section className={styles.introSection}>
          <div className={styles.container}>
            <motion.div className={styles.introCard} {...fadeInUp}>
              <h2 className={styles.scriptHeading}>{copy.invitation}</h2>
              <p className={styles.introText}>
                {preview.ghIntroText || preview.sectionPartyLead || copy.inviteBody}
              </p>
              <div className={styles.dividerLine} />
            </motion.div>
          </div>
        </section>

        {/* Couple */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.coupleGrid}>
              <motion.div className={styles.coupleCard} {...fadeInUp}>
                <div className={styles.imageFrame}>
                  <img src={images.groomPortraitImage || "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800"} alt={preview.groom} />
                </div>
                <h3 className={styles.coupleName}>{preview.groom}</h3>
                <p className={styles.coupleBio}>{preview.ghGroomBio || preview.groomBio || "Chúng tôi tin rằng mỗi người sinh ra đều dành cho một ai đó. Cảm ơn định mệnh đã mang chúng mình đến với nhau."}</p>
              </motion.div>

              <div className={styles.coupleSeparator}>
                <span className={styles.scriptAmp}>&</span>
              </div>

              <motion.div className={styles.coupleCard} {...fadeInUp} transition={{ delay: 0.2 }}>
                <div className={styles.imageFrame}>
                  <img src={images.bridePortraitImage || "https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=800"} alt={preview.bride} />
                </div>
                <h3 className={styles.coupleName}>{preview.bride}</h3>
                <p className={styles.coupleBio}>{preview.ghBrideBio || preview.brideBio || "Tình yêu không phải là tìm thấy một ai đó hoàn hảo, mà là học cách để nhìn thấy những điều tuyệt vời từ một người không hoàn hảo."}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Events - 3 parts */}
        <section className={`${styles.section} ${styles.bgCream}`}>
          <div className={styles.container}>
            <motion.h2 className={styles.sectionTitle} {...fadeInUp}>{copy.eventsTitle}</motion.h2>
            <div className={styles.eventsStack}>
              {[
                { title: copy.ceremony, time: preview.ghCeremonyTime || preview.ceremonyTime, venue: preview.ghCeremonyVenue || preview.venue, location: preview.ghCeremonyLocation || preview.location, label: "01" },
                { title: "Tiệc Nhà Trai", time: preview.ghGroomPartyTime || preview.partyTime, venue: preview.ghGroomPartyVenue || preview.venue, location: preview.ghGroomPartyLocation || preview.location, label: "02" },
                { title: "Tiệc Nhà Gái", time: preview.ghBridePartyTime || preview.partyTime, venue: preview.ghBridePartyVenue || preview.venue, location: preview.ghBridePartyLocation || preview.location, label: "03" },
              ].map((event, i) => (
                <motion.div key={i} className={styles.eventItem} {...fadeInUp} transition={{ delay: i * 0.1 }}>
                  <div className={styles.eventLabel}>{event.label}</div>
                  <div className={styles.eventInfo}>
                    <h4>{event.title}</h4>
                    <p className={styles.eventTime}>{event.time}</p>
                    <p className={styles.eventVenue}>{event.venue}</p>
                    <p className={styles.eventLoc}>{event.location}</p>
                  </div>
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

        {/* Album */}
        <section className={styles.section}>
          <div className={styles.container}>
            <motion.h2 className={styles.sectionTitle} {...fadeInUp}>{copy.albumTitle}</motion.h2>
            <div className={styles.galleryGrid}>
              {limitedGallery.map((src, i) => (
                <motion.div 
                  key={i} 
                  className={styles.galleryItem}
                  onClick={() => onPreviewImage({ src, alt: `Photo ${i+1}` })}
                  {...fadeInUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <img src={src} alt="" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Gift Section */}
        <section className={`${styles.section} ${styles.bgCream}`}>
          <div className={styles.container}>
            <motion.div className={styles.sectionTitle} {...fadeInUp}>
              Mừng Cưới
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
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerFloral}>❧</div>
            <h2 className={styles.footerNames}>{preview.groom} & {preview.bride}</h2>
            <p>{copy.thanks}</p>
            <div className={styles.footerLine} />
            <div className={styles.lumiere}>Lumiere Weddings</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
