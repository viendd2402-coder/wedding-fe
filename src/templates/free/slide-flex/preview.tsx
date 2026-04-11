"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import Link from "next/link";
import { Quicksand } from "next/font/google";
import type { AppLanguage } from "@/components/global-preferences-provider";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { slideFlexPreviewMessages } from "@/i18n/messages/template-previews/slide-flex";
import type { PreviewData, TemplatePreviewProps } from "@/templates/preview-types";
import {
  defaultBrideBioEn,
  defaultBrideBioVi,
  defaultGroomBioEn,
  defaultGroomBioVi,
  partyEn,
  partyVi,
  slideFlexBrideCardFallback,
  slideFlexGallery,
  slideFlexGroomCardFallback,
  slideFlexHeroAmbientSlides,
  timelineEn,
  timelineVi,
  type TimelineEntry,
  wishSuggestionsEn,
  wishSuggestionsVi,
} from "./data";
import styles from "./slide-flex.module.css";

function slideFlexTimelineFromPreview(preview: PreviewData, language: AppLanguage): TimelineEntry[] {
  const slots = [1, 2, 3, 4] as const;
  const rows: TimelineEntry[] = slots.map((i) => {
    const r = preview as Record<string, string>;
    return {
      title: (r[`timeline${i}Title`] ?? "").trim(),
      date: (r[`timeline${i}Date`] ?? "").trim(),
      body: (r[`timeline${i}Body`] ?? "").trim(),
    };
  });
  if (rows.some((row) => row.title || row.date || row.body)) {
    return rows.filter((row) => row.title || row.date || row.body);
  }
  return language === "vi" ? timelineVi : timelineEn;
}

function slideFlexPartyFromPreview(preview: PreviewData, language: AppLanguage) {
  const def = language === "vi" ? partyVi : partyEn;
  const bmDefaultRole = def.bridesmaids[0]?.role ?? "Bridesmaid";
  const gmDefaultRole = def.groomsmen[0]?.role ?? "Groomsman";
  const r = preview as Record<string, string>;
  const bms = [1, 2].flatMap((i) => {
    const name = (r[`bm${i}Name`] ?? "").trim();
    if (!name) return [];
    const role = (r[`bm${i}Role`] ?? "").trim() || bmDefaultRole;
    const bio = (r[`bm${i}Bio`] ?? "").trim() || "…";
    return [{ role, name, bio }];
  });
  const gms = [1, 2].flatMap((i) => {
    const name = (r[`gm${i}Name`] ?? "").trim();
    if (!name) return [];
    const role = (r[`gm${i}Role`] ?? "").trim() || gmDefaultRole;
    const bio = (r[`gm${i}Bio`] ?? "").trim() || "…";
    return [{ role, name, bio }];
  });
  if (!bms.length && !gms.length) return def;
  return {
    bridesmaids: bms.length ? bms : def.bridesmaids,
    groomsmen: gms.length ? gms : def.groomsmen,
  };
}

const quicksand = Quicksand({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-slideflex",
});

/**
 * Giao toàn bộ viewport (rootMargin 0): cuộn từ đầu trang, khối chỉ cần chạm mép dưới viewport là bật —
 * không đợi kéo tới “giữa màn” như rootMargin âm đáy.
 * threshold 0 + đo fallback trùng logic giao viewport.
 */
const ioOpts: IntersectionObserverInit = {
  root: null,
  /** Mở rộng vùng giao viewport để scroll-reveal (vd. thẻ cặp đôi) bật ổn định trong khung preview thấp. */
  rootMargin: "140px 0px 180px 0px",
  threshold: 0,
};

function subscribeScrollReveal(el: Element, onVisible: () => void): () => void {
  let finished = false;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          if (finished) return;
          finished = true;
          io.unobserve(el);
          onVisible();
          return;
        }
      }
    },
    ioOpts,
  );

  io.observe(el);

  let raf1 = 0;
  let raf2 = 0;
  const measure = () => {
    if (finished) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    if (vh <= 0) return;
    if (rect.bottom > 0 && rect.top < vh) {
      finished = true;
      io.unobserve(el);
      onVisible();
    }
  };
  raf1 = requestAnimationFrame(() => {
    raf2 = requestAnimationFrame(measure);
  });

  return () => {
    finished = true;
    cancelAnimationFrame(raf1);
    cancelAnimationFrame(raf2);
    io.disconnect();
  };
}

type RevealAxis = "up" | "left" | "right";

function mediaPendingClass(axis: RevealAxis): string {
  if (axis === "left") return styles.scrollMediaPendingLeft;
  if (axis === "right") return styles.scrollMediaPendingRight;
  return styles.scrollMediaPending;
}

function titlePendingClass(axis: RevealAxis): string {
  if (axis === "left") return styles.scrollTitlePendingLeft;
  if (axis === "right") return styles.scrollTitlePendingRight;
  return styles.scrollTitlePending;
}

function ScrollRevealButton(
  props: ComponentPropsWithoutRef<"button"> & { revealAxis?: RevealAxis },
) {
  const { className = "", children, revealAxis = "up", ...rest } = props;
  const ref = useRef<ElementRef<"button">>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return subscribeScrollReveal(el, () => setShown(true));
  }, []);
  const pending = mediaPendingClass(revealAxis);
  return (
    <button
      ref={ref}
      {...rest}
      className={`${className} ${shown ? styles.scrollMediaShown : pending}`.trim()}
    >
      {children}
    </button>
  );
}

function ScrollRevealDiv({
  variant = "media",
  className = "",
  children,
  revealAxis = "up",
  ...rest
}: ComponentPropsWithoutRef<"div"> & {
  variant?: "media" | "title";
  revealAxis?: RevealAxis;
}) {
  const ref = useRef<ElementRef<"div">>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return subscribeScrollReveal(el, () => setShown(true));
  }, []);
  const p =
    variant === "title" ? titlePendingClass(revealAxis) : mediaPendingClass(revealAxis);
  const d = variant === "title" ? styles.scrollTitleShown : styles.scrollMediaShown;
  return (
    <div ref={ref} {...rest} className={`${className} ${shown ? d : p}`.trim()}>
      {children}
    </div>
  );
}

function ScrollRevealArticle(
  props: ComponentPropsWithoutRef<"article"> & { revealAxis?: RevealAxis },
) {
  const { className = "", children, revealAxis = "up", ...rest } = props;
  const ref = useRef<ElementRef<"article">>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return subscribeScrollReveal(el, () => setShown(true));
  }, []);
  const pending = mediaPendingClass(revealAxis);
  return (
    <article
      ref={ref}
      {...rest}
      className={`${className} ${shown ? styles.scrollMediaShown : pending}`.trim()}
    >
      {children}
    </article>
  );
}

/** Khối cảm ơn cuối trang — ảnh nền + thẻ sáng (khác glass panel cũ). */
function SlideFlexThanksFooter({
  cover,
  headline,
  body,
  groom,
  bride,
  tier,
}: {
  cover: string;
  headline: string;
  body: string;
  groom: string;
  bride: string;
  tier: string;
}) {
  const titleId = "slideflex-footer-thanks";
  return (
    <footer className={styles.thanksFooter} aria-labelledby={titleId}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.thanksFooterBg} src={cover} alt="" />
      <div className={styles.thanksFooterDim} aria-hidden="true" />
      <div className={styles.thanksFooterShell}>
        <div className={styles.thanksCard}>
          <h2 id={titleId} className={styles.thanksHeadline}>
            {headline}
          </h2>
          <p className={styles.thanksBody}>{body}</p>
          <div className={styles.thanksRule} aria-hidden="true" />
          <p className={styles.thanksCouple}>
            <span>{groom}</span>
            <span className={styles.thanksHeart} aria-hidden="true">
              ♥
            </span>
            <span>{bride}</span>
          </p>
          <p className={styles.thanksTier}>{tier}</p>
        </div>
      </div>
    </footer>
  );
}

export default function SlideFlexPreview({
  template,
  preview,
  images,
  onPreviewImage,
  isPublicInviteSnapshot = false,
}: TemplatePreviewProps) {
  const { language } = useGlobalPreferences();
  const gallery =
    images.galleryImages.length > 0 ? images.galleryImages : slideFlexGallery;
  const cover = images.coverImage || template.image;

  /**
   * Slider hero: ảnh bìa (hoặc ảnh mẫu template) luôn là slide 1; các slide sau chỉ từ
   * `slideFlexHeroAmbientSlides` — không lấy từ album để album vẫn là phần riêng trên thiệp.
   */
  const slides = useMemo(() => {
    if (!cover) return [];
    const extras = slideFlexHeroAmbientSlides.filter((u) => u !== cover);
    const ordered = [cover, ...extras];
    const uniq: string[] = [];
    for (const u of ordered) {
      if (u && !uniq.includes(u)) uniq.push(u);
    }
    return uniq.slice(0, 6);
  }, [cover]);

  const [slideIdx, setSlideIdx] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [giftCopied, setGiftCopied] = useState(false);
  const [countdownTick, setCountdownTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setCountdownTick((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = window.setInterval(
      () => setSlideIdx((i) => (i + 1) % slides.length),
      5500,
    );
    return () => window.clearInterval(t);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setSlideIdx((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goNext = useCallback(() => {
    setSlideIdx((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const copy = slideFlexPreviewMessages[language];

  const timeline = useMemo(
    () => slideFlexTimelineFromPreview(preview, language),
    [language, preview],
  );
  const party = useMemo(() => slideFlexPartyFromPreview(preview, language), [language, preview]);

  const groomBio =
    preview.groomBio.trim() ||
    (language === "vi" ? defaultGroomBioVi : defaultGroomBioEn);
  const brideBio =
    preview.brideBio.trim() ||
    (language === "vi" ? defaultBrideBioVi : defaultBrideBioEn);
  const wishOptions = useMemo(() => {
    const custom = [preview.wishSuggestion1, preview.wishSuggestion2, preview.wishSuggestion3]
      .map((s) => s.trim())
      .filter(Boolean);
    if (custom.length) return custom;
    return language === "vi" ? wishSuggestionsVi : wishSuggestionsEn;
  }, [
    language,
    preview.wishSuggestion1,
    preview.wishSuggestion2,
    preview.wishSuggestion3,
  ]);

  const groomCardBg =
    images.groomPortraitImage.trim() ||
    preview.groomPhotoUrl.trim() ||
    slideFlexGroomCardFallback;
  const brideCardBg =
    images.bridePortraitImage.trim() ||
    preview.bridePhotoUrl.trim() ||
    slideFlexBrideCardFallback;
  const heroEyebrow = preview.heroEyebrow.trim() || copy.heroEyebrow;
  const heroGettingMarried = preview.heroGettingMarried.trim() || copy.gettingMarried;
  const sectionCoupleTitle = preview.sectionCoupleTitle.trim() || copy.coupleTitle;
  const sectionStoryTitle = preview.sectionStoryTitle.trim() || copy.storyTitle;
  const sectionPartyTitle = preview.sectionPartyTitle.trim() || copy.partyTitle;
  const sectionPartyLead = preview.sectionPartyLead.trim() || copy.partyLead;
  const sectionEventsTitle = preview.sectionEventsTitle.trim() || copy.eventsTitle;
  const sectionEventsLead = preview.sectionEventsLead.trim() || copy.eventsLead;
  const sectionGalleryTitle = preview.sectionGalleryTitle.trim() || copy.galleryTitle;
  const sectionVideoTitle = preview.sectionVideoTitle.trim() || copy.videoTitle;
  const sectionGuestbookTitle = preview.sectionGuestbookTitle.trim() || copy.guestbook;
  const sectionGuestbookLead = preview.sectionGuestbookLead.trim() || copy.guestLead;
  const sectionGiftTitle = preview.sectionGiftTitle.trim() || copy.giftTitle;
  const videoCaption = preview.videoCaption.trim() || copy.videoCap;
  const footerThanksHeadline = preview.footerThanksHeadline.trim() || copy.footerThanksHeadline;
  const footerThanksBody = preview.footerThanksBody.trim() || copy.footerThanksBody;
  const groomParent1 = preview.groomParentLine1.trim() || copy.tbd;
  const groomParent2 = preview.groomParentLine2.trim() || copy.tbd;
  const brideParent1 = preview.brideParentLine1.trim() || copy.tbd;
  const brideParent2 = preview.brideParentLine2.trim() || copy.tbd;

  const mapsUrl = useMemo(() => {
    const q = `${preview.venue} ${preview.location}`.trim();
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  }, [preview.location, preview.venue]);

  const calendarUrl = useMemo(() => {
    const start = new Date(preview.countdownTarget);
    if (Number.isNaN(start.getTime())) return "#";
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `${preview.groom} & ${preview.bride}`,
      dates: `${fmt(start)}/${fmt(end)}`,
      location: `${preview.venue}, ${preview.location}`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, [preview.bride, preview.countdownTarget, preview.groom, preview.location, preview.venue]);

  const countdownLive = useMemo(() => {
    const target = new Date(preview.countdownTarget).getTime();
    if (Number.isNaN(target)) {
      return { past: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      return { past: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      past: false,
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [preview.countdownTarget, countdownTick]);

  const slideCalendarWeek = useMemo(() => {
    const d = new Date(preview.countdownTarget);
    if (Number.isNaN(d.getTime())) return null;
    const dow = d.getDay();
    const monOffset = dow === 0 ? -6 : 1 - dow;
    const start = new Date(d);
    start.setDate(d.getDate() + monOffset);
    start.setHours(0, 0, 0, 0);
    const days: { n: number; isWedding: boolean }[] = [];
    for (let i = 0; i < 7; i++) {
      const x = new Date(start);
      x.setDate(start.getDate() + i);
      const isWedding =
        x.getFullYear() === d.getFullYear() &&
        x.getMonth() === d.getMonth() &&
        x.getDate() === d.getDate();
      days.push({ n: x.getDate(), isWedding });
    }
    const monthShort = d.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
      month: "short",
    });
    const year = d.getFullYear();
    const shortWd =
      language === "vi"
        ? ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
        : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    return { days, monthShort, year, dom: d.getDate(), shortWd };
  }, [language, preview.countdownTarget]);

  const copyAccount = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(preview.accountNumber.replace(/\s/g, ""));
      setGiftCopied(true);
      window.setTimeout(() => setGiftCopied(false), 2000);
    } catch {
      setGiftCopied(false);
    }
  }, [preview.accountNumber]);

  const fontClass = quicksand.variable;

  return (
    <div className={`${fontClass} ${styles.root}`}>
      <nav className={styles.navWrap} aria-label="Main">
        <div className={styles.navInner}>
          <a href="#hero" className={styles.logo}>
            {preview.groom.charAt(0)}
            <span>♥</span>
            {preview.bride.charAt(0)}
          </a>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={navOpen}
            aria-controls="slideflex-nav"
            onClick={() => setNavOpen((o) => !o)}
          >
            ☰
          </button>
          <div
            id="slideflex-nav"
            className={`${styles.navScroll} ${navOpen ? styles.navScrollOpen : ""}`.trim()}
          >
            <a href="#couple" className={styles.navPill} onClick={() => setNavOpen(false)}>
              {copy.navCouple}
            </a>
            <a href="#story" className={styles.navPill} onClick={() => setNavOpen(false)}>
              {copy.navStory}
            </a>
            <a href="#party" className={styles.navPill} onClick={() => setNavOpen(false)}>
              {copy.navParty}
            </a>
            <a href="#events" className={styles.navPill} onClick={() => setNavOpen(false)}>
              {copy.navEvents}
            </a>
            <a href="#gallery" className={styles.navPill} onClick={() => setNavOpen(false)}>
              {copy.navGallery}
            </a>
            <a href="#video" className={styles.navPill} onClick={() => setNavOpen(false)}>
              {copy.navVideo}
            </a>
            <a href="#rsvp" className={styles.navPill} onClick={() => setNavOpen(false)}>
              {copy.navRsvp}
            </a>
            <a href="#gift" className={styles.navPill} onClick={() => setNavOpen(false)}>
              {copy.navGift}
            </a>
            {!isPublicInviteSnapshot ? (
              <Link href="/" className={styles.backHome} onClick={() => setNavOpen(false)}>
                {copy.back}
              </Link>
            ) : null}
          </div>
        </div>
      </nav>

      <header id="hero" className={styles.hero}>
        {slides.map((src, i) => (
          <div
            key={src}
            className={`${styles.slide} ${i === slideIdx ? styles.slideActive : ""}`.trim()}
            style={{ backgroundImage: `url(${src})` }}
            aria-hidden={i !== slideIdx}
          />
        ))}
        <div className={styles.heroOverlay} />
        <div className={styles.sliderArrows}>
          <button type="button" className={styles.arrowBtn} aria-label="Previous" onClick={goPrev}>
            ‹
          </button>
          <button type="button" className={styles.arrowBtn} aria-label="Next" onClick={goNext}>
            ›
          </button>
        </div>
        <div className={styles.heroContent}>
          <ScrollRevealDiv
            revealAxis="left"
            className={`${styles.heroRevealWrap} ${styles.heroRevealStagger0}`}
          >
            <p className={styles.heroEyebrow}>{heroEyebrow}</p>
          </ScrollRevealDiv>
          <ScrollRevealDiv
            revealAxis="right"
            className={`${styles.heroRevealWrap} ${styles.heroRevealStagger1}`}
          >
            <h1 className={styles.heroNames}>
              {preview.groom}
              <span className={styles.heroAmp}>&amp;</span>
              {preview.bride}
            </h1>
          </ScrollRevealDiv>
          <ScrollRevealDiv
            revealAxis="left"
            className={`${styles.heroRevealWrap} ${styles.heroRevealStagger2}`}
          >
            <p className={styles.heroSub}>{heroGettingMarried}</p>
          </ScrollRevealDiv>
          <ScrollRevealDiv
            revealAxis="right"
            className={`${styles.heroRevealWrap} ${styles.heroRevealStagger3}`}
          >
            <p className={styles.heroSub}>{preview.dateLabel}</p>
          </ScrollRevealDiv>
          <ScrollRevealDiv
            revealAxis="up"
            className={`${styles.heroRevealWrap} ${styles.heroRevealStagger4}`}
          >
            <a href="#rsvp" className={styles.btnGradient}>
              {copy.rsvp}
            </a>
          </ScrollRevealDiv>
        </div>
        {slides.length > 1 ? (
          <div className={styles.sliderDots} role="tablist" aria-label="Slides">
            {slides.map((_, i) => (
              <button
                key={String(i)}
                type="button"
                role="tab"
                aria-selected={i === slideIdx}
                className={`${styles.dot} ${i === slideIdx ? styles.dotActive : ""}`.trim()}
                onClick={() => setSlideIdx(i)}
              />
            ))}
          </div>
        ) : null}
      </header>

      <main>
        <section id="couple" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <ScrollRevealDiv variant="title" revealAxis="left">
              <h2 className={styles.sectionTitle}>{sectionCoupleTitle}</h2>
            </ScrollRevealDiv>
            <div className={styles.coupleGrid}>
              <ScrollRevealArticle className={styles.coupleCard} revealAxis="left">
                <div
                  className={styles.coupleImg}
                  style={{ backgroundImage: `url(${groomCardBg})` }}
                />
                <div className={styles.coupleBody}>
                  <p className={styles.coupleTag}>{copy.groom}</p>
                  <h3 className={styles.coupleName}>{preview.groom}</h3>
                  <p className={styles.coupleParents}>
                    {copy.sonOf}: <strong>{groomParent1}</strong>
                    <br />
                    {copy.dauOf}: <strong>{groomParent2}</strong>
                  </p>
                  <p className={styles.coupleBio}>{groomBio}</p>
                </div>
              </ScrollRevealArticle>
              <ScrollRevealArticle className={styles.coupleCard} revealAxis="right">
                <div
                  className={styles.coupleImg}
                  style={{
                    backgroundImage: `url(${brideCardBg})`,
                  }}
                />
                <div className={styles.coupleBody}>
                  <p className={styles.coupleTag}>{copy.bride}</p>
                  <h3 className={styles.coupleName}>{preview.bride}</h3>
                  <p className={styles.coupleParents}>
                    {copy.sonOf}: <strong>{brideParent1}</strong>
                    <br />
                    {copy.dauOf}: <strong>{brideParent2}</strong>
                  </p>
                  <p className={styles.coupleBio}>{brideBio}</p>
                </div>
              </ScrollRevealArticle>
            </div>
          </div>
        </section>

        <section id="story" className={styles.section}>
          <div className={styles.container}>
            <ScrollRevealDiv variant="title" revealAxis="right">
              <h2 className={styles.sectionTitle}>{sectionStoryTitle}</h2>
            </ScrollRevealDiv>
            <div className={styles.timeline}>
              {timeline.map((item, i) => (
                <ScrollRevealDiv
                  key={`${i}-${item.date}-${item.title}`}
                  revealAxis={i % 2 === 0 ? "left" : "right"}
                >
                  <div className={styles.tlItem}>
                    <div className={styles.tlDate}>{item.date}</div>
                    <h3 className={styles.tlTitle}>{item.title}</h3>
                    <p className={styles.tlBody}>{item.body}</p>
                  </div>
                </ScrollRevealDiv>
              ))}
            </div>
          </div>
        </section>

        <section id="party" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <ScrollRevealDiv variant="title" revealAxis="left">
              <h2 className={styles.sectionTitle}>{sectionPartyTitle}</h2>
              <p className={styles.sectionLead}>{sectionPartyLead}</p>
            </ScrollRevealDiv>
            <div className={styles.partyGrid}>
              <ScrollRevealDiv className={styles.partyCol} revealAxis="left">
                <div>
                  <h3>{copy.partyBrides}</h3>
                  {party.bridesmaids.map((p) => (
                    <div key={p.name} className={styles.partyCard}>
                      <p className={styles.partyName}>{p.name}</p>
                      <p className={styles.partyBio}>{p.bio}</p>
                    </div>
                  ))}
                </div>
              </ScrollRevealDiv>
              <ScrollRevealDiv className={styles.partyCol} revealAxis="right">
                <div>
                  <h3>{copy.partyGrooms}</h3>
                  {party.groomsmen.map((p) => (
                    <div key={p.name} className={styles.partyCard}>
                      <p className={styles.partyName}>{p.name}</p>
                      <p className={styles.partyBio}>{p.bio}</p>
                    </div>
                  ))}
                </div>
              </ScrollRevealDiv>
            </div>
          </div>
        </section>

        <section id="events" className={styles.section}>
          <div className={styles.container}>
            <ScrollRevealDiv variant="title" revealAxis="right">
              <h2 className={styles.sectionTitle}>{sectionEventsTitle}</h2>
              <p className={styles.sectionLead}>{sectionEventsLead}</p>
            </ScrollRevealDiv>
            <ScrollRevealDiv revealAxis="up" className={styles.eventsCountWrap}>
              <div className={styles.eventsCountAccent} aria-hidden="true" />
              <p className={styles.eventsCountEyebrow}>{copy.countdownEyebrow}</p>
              {countdownLive.past ? (
                <p className={styles.eventsCountDone}>{copy.countdownDone}</p>
              ) : (
                <div
                  className={styles.eventsCountUnits}
                  role="group"
                  aria-label={copy.countdownEyebrow}
                >
                  <div className={styles.eventsCountUnit}>
                    <span className={styles.eventsCountVal} aria-live="polite">
                      {countdownLive.days}
                    </span>
                    <span className={styles.eventsCountLbl}>{copy.countdownDays}</span>
                  </div>
                  <div className={styles.eventsCountUnit}>
                    <span className={styles.eventsCountVal}>
                      {String(countdownLive.hours).padStart(2, "0")}
                    </span>
                    <span className={styles.eventsCountLbl}>{copy.countdownHours}</span>
                  </div>
                  <div className={styles.eventsCountUnit}>
                    <span className={styles.eventsCountVal}>
                      {String(countdownLive.minutes).padStart(2, "0")}
                    </span>
                    <span className={styles.eventsCountLbl}>{copy.countdownMinutes}</span>
                  </div>
                  <div
                    className={`${styles.eventsCountUnit} ${styles.eventsCountUnitLive}`.trim()}
                  >
                    <span className={styles.eventsCountVal} aria-live="polite">
                      {String(countdownLive.seconds).padStart(2, "0")}
                    </span>
                    <span className={styles.eventsCountLbl}>{copy.countdownSeconds}</span>
                  </div>
                </div>
              )}
            </ScrollRevealDiv>
            {slideCalendarWeek ? (
              <ScrollRevealDiv revealAxis="left" className={styles.eventsWeekCal}>
                <div className={styles.eventsWeekCalHead}>
                  <div className={styles.eventsWeekCalBadge}>
                    <span className={styles.eventsWeekCalDom}>{slideCalendarWeek.dom}</span>
                    <span className={styles.eventsWeekCalMy}>
                      {slideCalendarWeek.monthShort} · {slideCalendarWeek.year}
                    </span>
                  </div>
                  <div className={styles.eventsWeekCalHeadText}>
                    <p className={styles.eventsWeekCalTitle}>{copy.calendarWeekTitle}</p>
                    <p className={styles.eventsWeekCalDate}>{preview.dateLabel}</p>
                  </div>
                </div>
                <div className={styles.eventsWeekTrack}>
                  <ul className={styles.eventsWeekStops} role="list">
                    {slideCalendarWeek.days.map((day, i) => (
                      <li
                        key={`${day.n}-${i}`}
                        className={`${styles.eventsWeekStop} ${day.isWedding ? styles.eventsWeekStopWed : ""}`.trim()}
                      >
                        <span className={styles.eventsWeekWd}>{slideCalendarWeek.shortWd[i]}</span>
                        <span
                          className={`${styles.eventsWeekOrb} ${day.isWedding ? styles.eventsWeekOrbWed : ""}`.trim()}
                        >
                          <span className={styles.eventsWeekOrbNum}>{day.n}</span>
                          {day.isWedding ? (
                            <span className={styles.eventsWeekHeart} aria-hidden="true">
                              ♥
                            </span>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className={styles.eventsWeekHint}>
                  <span className={styles.eventsWeekHintDot} aria-hidden="true" />
                  {copy.calendarWeekHint}
                </p>
              </ScrollRevealDiv>
            ) : null}
            <div className={styles.eventsList}>
              <ScrollRevealDiv revealAxis="left">
                <article className={styles.eventCard}>
                  <h3 className={styles.eventTitle}>{copy.ceremony}</h3>
                  <p className={styles.eventMeta}>
                    <strong>{preview.ceremonyTime}</strong>
                    {" · "}
                    {preview.dateLabel}
                  </p>
                  <p className={styles.eventPlace}>{preview.venue}</p>
                  <div className={styles.eventActions}>
                    {calendarUrl !== "#" ? (
                      <a
                        href={calendarUrl}
                        className={styles.btnOutline}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {copy.addCal}
                      </a>
                    ) : null}
                    <a href={mapsUrl} className={styles.btnOutline} target="_blank" rel="noreferrer">
                      {copy.viewMap}
                    </a>
                  </div>
                </article>
              </ScrollRevealDiv>
              <ScrollRevealDiv revealAxis="right">
                <article className={styles.eventCard}>
                  <h3 className={styles.eventTitle}>{copy.reception}</h3>
                  <p className={styles.eventMeta}>
                    <strong>{preview.partyTime}</strong>
                    {" · "}
                    {preview.dateLabel}
                  </p>
                  <p className={styles.eventPlace}>
                    {preview.venue} · {preview.location}
                  </p>
                  <div className={styles.eventActions}>
                    <a href={mapsUrl} className={styles.btnOutline} target="_blank" rel="noreferrer">
                      {copy.viewMap}
                    </a>
                  </div>
                </article>
              </ScrollRevealDiv>
            </div>
          </div>
        </section>

        <section id="gallery" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <ScrollRevealDiv variant="title" revealAxis="left">
              <h2 className={styles.sectionTitle}>{sectionGalleryTitle}</h2>
            </ScrollRevealDiv>
            <div className={styles.galleryGrid}>
              {gallery.map((src, i) => (
                <ScrollRevealButton
                  key={`${src}-${i}`}
                  type="button"
                  className={styles.galleryBtn}
                  revealAxis={i % 2 === 0 ? "left" : "right"}
                  onClick={() =>
                    onPreviewImage({ src, alt: `${sectionGalleryTitle} ${i + 1}` })
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" />
                </ScrollRevealButton>
              ))}
            </div>
          </div>
        </section>

        <section id="video" className={styles.section}>
          <div className={styles.container}>
            <ScrollRevealDiv variant="title" revealAxis="right">
              <h2 className={styles.sectionTitle}>{sectionVideoTitle}</h2>
            </ScrollRevealDiv>
            <ScrollRevealDiv revealAxis="left">
              <div>
                <div className={styles.videoBlock}>
                  <button type="button" className={styles.videoPlay} aria-label="Play">
                    ▶
                  </button>
                </div>
                <p className={styles.videoCaption}>
                  {videoCaption}
                </p>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        <section id="rsvp" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <ScrollRevealDiv variant="title" revealAxis="left">
              <h2 className={styles.sectionTitle}>{sectionGuestbookTitle}</h2>
              <p className={styles.sectionLead}>{sectionGuestbookLead}</p>
            </ScrollRevealDiv>
            <ScrollRevealDiv revealAxis="right">
              <form
                className={styles.formCard}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  className={styles.input}
                  name="name"
                  placeholder={copy.namePh}
                  autoComplete="name"
                />
                <input
                  className={styles.input}
                  name="email"
                  type="email"
                  placeholder={copy.emailPh}
                  autoComplete="email"
                />
                <label className={styles.srOnly} htmlFor="sf-wish">
                  {copy.wishHint}
                </label>
                <select
                  id="sf-wish"
                  key={wishOptions.join("\u0001")}
                  className={styles.select}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {copy.wishHint}
                  </option>
                  {wishOptions.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
                <textarea
                  className={styles.textarea}
                  name="content"
                  rows={4}
                  placeholder={copy.wishPh}
                />
                <button type="submit" className={`${styles.btnGradient} ${styles.submitBtn}`}>
                  {copy.submit}
                </button>
              </form>
            </ScrollRevealDiv>
          </div>
        </section>

        <section id="gift" className={styles.section}>
          <div className={styles.container}>
            <ScrollRevealDiv variant="title" revealAxis="right">
              <h2 className={styles.sectionTitle}>{sectionGiftTitle}</h2>
            </ScrollRevealDiv>
            <div className={styles.giftGrid}>
              <ScrollRevealDiv revealAxis="left">
                <div className={styles.giftCard}>
                  <h4>{copy.giftBride}</h4>
                  <p>
                    {copy.bank}: <strong>{preview.bankName}</strong>
                  </p>
                  <p>
                    {copy.accName}: <strong>{preview.accountName}</strong>
                  </p>
                  <p>
                    {copy.accNo}:{" "}
                    <strong className={styles.mono}>{preview.accountNumber}</strong>
                  </p>
                  <button type="button" className={styles.btnGhost} onClick={() => void copyAccount()}>
                    {giftCopied ? copy.copied : copy.copyStk}
                  </button>
                </div>
              </ScrollRevealDiv>
              <ScrollRevealDiv revealAxis="right">
                <div className={styles.giftCard}>
                  <h4>{copy.giftGroom}</h4>
                  <p>
                    {copy.bank}: <strong>{preview.bankName}</strong>
                  </p>
                  <p>
                    {copy.accName}: <strong>{preview.accountName}</strong>
                  </p>
                  <p>
                    {copy.accNo}:{" "}
                    <strong className={styles.mono}>{preview.accountNumber}</strong>
                  </p>
                  <button type="button" className={styles.btnGhost} onClick={() => void copyAccount()}>
                    {giftCopied ? copy.copied : copy.copyStk}
                  </button>
                </div>
              </ScrollRevealDiv>
            </div>
          </div>
        </section>
      </main>

      <SlideFlexThanksFooter
        cover={cover}
        headline={footerThanksHeadline}
        body={footerThanksBody}
        groom={preview.groom}
        bride={preview.bride}
        tier={template.tier}
      />
    </div>
  );
}
