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
import { Marmelad, Open_Sans, Oooh_Baby } from "next/font/google";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { brightlyBasicPreviewMessages } from "@/i18n/messages/template-previews/brightly-basic";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import {
  brightlyBasicDefaultBridePortrait,
  brightlyBasicDefaultEventsBg,
  brightlyBasicDefaultFooterBg,
  brightlyBasicDefaultGroomPortrait,
  brightlyBasicDefaultInvitationBg,
  brightlyBasicGallery,
  defaultBrideBio,
  defaultGroomBio,
  wishSuggestionsEn,
  wishSuggestionsVi,
} from "./data";
import styles from "./brightly-basic.module.css";

const marmelad = Marmelad({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-neela-display",
});

const openSans = Open_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-neela-sans",
});

const ooohBaby = Oooh_Baby({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-neela-script",
});

const ioOpts: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px 0px -18% 0px",
  threshold: 0.12,
};

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

/** Fade-in khi cả section vào viewport (invitation, events, …). */
function RevealSection({
  className = "",
  children,
  ...rest
}: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<ElementRef<"section">>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        }
      },
      ioOpts,
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const stateClass = visible ? styles.revealVisible : "";
  return (
    <section
      ref={ref}
      {...rest}
      className={`${styles.reveal} ${stateClass} ${className}`.trim()}
    >
      {children}
    </section>
  );
}

/** Ảnh / ô hiện dần khi từng phần tử vào viewport (kéo tới đâu chạy tới đó). */
function ScrollRevealButton(
  props: ComponentPropsWithoutRef<"button"> & { revealAxis?: RevealAxis },
) {
  const { className = "", children, revealAxis = "up", ...rest } = props;
  const ref = useRef<ElementRef<"button">>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(e.target);
        }
      }
    }, ioOpts);
    io.observe(el);
    return () => io.disconnect();
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

function ScrollRevealArticle(
  props: ComponentPropsWithoutRef<"article"> & { revealAxis?: RevealAxis },
) {
  const { className = "", children, revealAxis = "up", ...rest } = props;
  const ref = useRef<ElementRef<"article">>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(e.target);
        }
      }
    }, ioOpts);
    io.observe(el);
    return () => io.disconnect();
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

type ScrollRevealDivVariant = "media" | "title" | "pop";

function ScrollRevealDiv({
  variant = "media",
  className = "",
  children,
  revealAxis = "up",
  ...rest
}: ComponentPropsWithoutRef<"div"> & {
  variant?: ScrollRevealDivVariant;
  revealAxis?: RevealAxis;
}) {
  const ref = useRef<ElementRef<"div">>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(e.target);
        }
      }
    }, ioOpts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  let pending: string;
  let done: string;
  if (variant === "pop") {
    pending = styles.scrollPopPending;
    done = styles.scrollPopShown;
  } else if (variant === "title") {
    pending = titlePendingClass(revealAxis);
    done = styles.scrollTitleShown;
  } else {
    pending = mediaPendingClass(revealAxis);
    done = styles.scrollMediaShown;
  }
  return (
    <div ref={ref} {...rest} className={`${className} ${shown ? done : pending}`.trim()}>
      {children}
    </div>
  );
}

function RevealFooter({
  className = "",
  children,
  ...rest
}: ComponentPropsWithoutRef<"footer">) {
  const ref = useRef<ElementRef<"footer">>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        }
      },
      ioOpts,
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <footer
      ref={ref}
      {...rest}
      className={`${styles.reveal} ${visible ? styles.revealVisible : ""} ${className}`.trim()}
    >
      {children}
    </footer>
  );
}

export default function BrightlyBasicPreview({
  template,
  preview,
  images,
  onPreviewImage,
  isPublicInviteSnapshot = false,
}: TemplatePreviewProps) {
  const { language } = useGlobalPreferences();
  const copy = brightlyBasicPreviewMessages[language];
  const gallery = images.galleryImages.length ? images.galleryImages : brightlyBasicGallery;
  const cover = images.coverImage || template.image;
  const groomCardPhoto =
    images.groomPortraitImage.trim() || brightlyBasicDefaultGroomPortrait;
  const brideCardPhoto =
    images.bridePortraitImage.trim() || brightlyBasicDefaultBridePortrait;
  const invitationBg =
    images.bbInvitationBgImage.trim() || brightlyBasicDefaultInvitationBg;
  const eventsParallaxBg =
    images.bbEventsBgImage.trim() || brightlyBasicDefaultEventsBg;
  const footerBackdrop =
    images.bbFooterBgImage.trim() || brightlyBasicDefaultFooterBg;

  const brideGiftBank = preview.bbBrideBankName.trim() || preview.bankName;
  const brideGiftName = preview.bbBrideAccountName.trim() || preview.accountName;
  const brideGiftNumber = preview.bbBrideAccountNumber.trim() || preview.accountNumber;

  const heroSaveDateLine = preview.bbHeroSaveDateLine.trim() || copy.saveDate;
  const gettingMarriedTitle = preview.bbGettingMarriedTitle.trim() || copy.gettingMarried;
  const coupleThanksBodyText = preview.bbThanksBody.trim() || copy.thanksBody;
  const inviteBigDayTitle = preview.bbBigDayTitle.trim() || copy.bigDay;
  const inviteLeadText = preview.bbInviteLead.trim() || copy.inviteLead;
  const gallerySectionTitle = preview.bbGalleryTitle.trim() || copy.galleryTitle;
  const eventsSectionTitle = preview.bbEventsTitle.trim() || copy.eventsTitle;
  const eventsSectionDesc = preview.bbEventsDesc.trim() || copy.eventsDesc;
  const guestbookSectionTitle = preview.bbGuestbookTitle.trim() || copy.guestbook;
  const giftSectionTitle = preview.bbGiftTitle.trim() || copy.giftTitle;
  const footerEyebrowText = preview.bbFooterThanksEyebrow.trim() || copy.footerThanksEyebrow;
  const footerThanksText = preview.bbFooterThanks.trim() || copy.footerThanks;

  const [countdownTick, setCountdownTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setCountdownTick((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const countdown = useMemo(() => {
    const now = Date.now();
    const target = new Date(preview.countdownTarget).getTime();
    const diff = Math.max(target - now, 0);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return [
      { v: String(days).padStart(2, "0"), l: copy.countdownDay },
      { v: String(hours).padStart(2, "0"), l: copy.countdownHour },
      { v: String(minutes).padStart(2, "0"), l: copy.countdownMinute },
      { v: String(seconds).padStart(2, "0"), l: copy.countdownSecond },
    ];
  }, [
    copy.countdownDay,
    copy.countdownHour,
    copy.countdownMinute,
    copy.countdownSecond,
    preview.countdownTarget,
    countdownTick,
  ]);

  const neelaCalendar = useMemo(() => {
    const d = new Date(preview.countdownTarget);
    if (Number.isNaN(d.getTime())) return null;
    const y = d.getFullYear();
    const m = d.getMonth();
    const dom = d.getDate();
    const firstDow = new Date(y, m, 1).getDay();
    const lastDate = new Date(y, m + 1, 0).getDate();
    const cells: ({ n: number } | null)[] = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let n = 1; n <= lastDate; n++) cells.push({ n });
    const tail = cells.length % 7;
    if (tail !== 0) for (let i = 0; i < 7 - tail; i++) cells.push(null);
    const monthTitle = new Date(y, m, 1).toLocaleDateString(
      language === "vi" ? "vi-VN" : "en-US",
      { month: "long", year: "numeric" },
    );
    const weekdays =
      language === "vi"
        ? ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
        : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return { dom, cells, monthTitle, weekdays };
  }, [language, preview.countdownTarget]);

  const wishOptions = useMemo(() => {
    const custom = [preview.wishSuggestion1, preview.wishSuggestion2, preview.wishSuggestion3]
      .map((s) => s.trim())
      .filter(Boolean);
    if (custom.length > 0) return custom;
    return language === "vi" ? wishSuggestionsVi : wishSuggestionsEn;
  }, [
    language,
    preview.wishSuggestion1,
    preview.wishSuggestion2,
    preview.wishSuggestion3,
  ]);

  const mapsUrl = useMemo(() => {
    const q = `${preview.venue} ${preview.location}`.trim();
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  }, [preview.location, preview.venue]);

  const groomReceptionTime = preview.bbGroomReceptionTime.trim() || preview.partyTime;
  const groomReceptionVenue = preview.bbGroomReceptionVenue.trim() || preview.venue;
  const groomReceptionLocation =
    preview.bbGroomReceptionLocation.trim() || preview.location;
  const brideReceptionTime = preview.bbBrideReceptionTime.trim() || preview.partyTime;
  const brideReceptionVenue = preview.bbBrideReceptionVenue.trim() || preview.venue;
  const brideReceptionLocation =
    preview.bbBrideReceptionLocation.trim() || preview.location;

  const groomReceptionMapsUrl = useMemo(() => {
    const q = `${groomReceptionVenue} ${groomReceptionLocation}`.trim();
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  }, [groomReceptionLocation, groomReceptionVenue]);

  const brideReceptionMapsUrl = useMemo(() => {
    const q = `${brideReceptionVenue} ${brideReceptionLocation}`.trim();
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  }, [brideReceptionLocation, brideReceptionVenue]);

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

  const [giftCopiedGroom, setGiftCopiedGroom] = useState(false);
  const [giftCopiedBride, setGiftCopiedBride] = useState(false);
  const copyGroomAccount = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(preview.accountNumber.replace(/\s/g, ""));
      setGiftCopiedGroom(true);
      window.setTimeout(() => setGiftCopiedGroom(false), 2000);
    } catch {
      setGiftCopiedGroom(false);
    }
  }, [preview.accountNumber]);
  const copyBrideAccount = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(brideGiftNumber.replace(/\s/g, ""));
      setGiftCopiedBride(true);
      window.setTimeout(() => setGiftCopiedBride(false), 2000);
    } catch {
      setGiftCopiedBride(false);
    }
  }, [brideGiftNumber]);

  const fontVars = `${marmelad.variable} ${openSans.variable} ${ooohBaby.variable}`;

  return (
    <div className={`${fontVars} ${styles.root}`}>
      <header className={styles.header}>
        <div className={styles.navBar}>
          <div className={styles.container}>
            <div className={styles.headerRow}>
              <a href="#hero" className={styles.logo}>
                <span className={styles.logoText}>
                  {preview.groom.charAt(0)}
                  <span className={styles.logoHeart} aria-hidden>
                    ♥
                  </span>
                  {preview.bride.charAt(0)}
                </span>
              </a>
              <nav className={styles.nav} aria-label="Main">
                <a href="#couple">{copy.navCouple}</a>
                <a href="#gallery">{copy.navGallery}</a>
                <a href="#events">{copy.navEvents}</a>
                <a href="#rsvp">{copy.navRsvp}</a>
                <a href="#donate">{copy.navGift}</a>
              </nav>
              {!isPublicInviteSnapshot ? (
                <Link href="/" className={styles.backHome}>
                  {copy.back}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="hero" className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: `url(${cover})` }} />
          <div className={styles.heroOverlay} />
          <div className={styles.container}>
            <div className={styles.heroInner}>
              <ScrollRevealDiv
                revealAxis="left"
                className={`${styles.heroRevealWrap} ${styles.heroRevealStagger0}`}
              >
                <p className={styles.heroKicker}>{heroSaveDateLine}</p>
              </ScrollRevealDiv>
              <ScrollRevealDiv
                revealAxis="right"
                className={`${styles.heroRevealWrap} ${styles.heroRevealStagger1}`}
              >
                <h1 className={styles.heroTitle}>
                  <span className={styles.heroNameBlock}>{preview.groom}</span>
                  <small className={styles.heroAnd}>&amp;</small>
                  <span className={styles.heroNameBlock}>{preview.bride}</span>
                </h1>
              </ScrollRevealDiv>
              <ScrollRevealDiv
                revealAxis="left"
                className={`${styles.heroRevealWrap} ${styles.heroRevealStagger2}`}
              >
                <p className={styles.heroDate}>{preview.dateLabel}</p>
              </ScrollRevealDiv>
              <ScrollRevealDiv
                revealAxis="up"
                className={`${styles.heroRevealWrap} ${styles.heroRevealStagger3}`}
              >
                <a href="#rsvp" className={styles.btnHero}>
                  {copy.sendWish}
                </a>
              </ScrollRevealDiv>
            </div>
          </div>
        </section>

        <section id="couple" className={styles.coupleSection}>
          <div className={styles.container}>
            <div className={styles.coupleGrid}>
              <div className={styles.coupleRow}>
                <ScrollRevealArticle className={styles.coupleCard} revealAxis="left">
                  <div className={styles.coupleImgWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={groomCardPhoto} alt="" className={styles.coupleImg} />
                    <div className={styles.coupleHover}>
                      <span className={styles.coupleHLines} aria-hidden />
                      <span className={styles.coupleVLines} aria-hidden />
                      <div className={styles.coupleHoverContent}>
                        <h3 className={styles.coupleName}>
                          {preview.groom}
                          <small>{copy.groom}</small>
                        </h3>
                        <p className={styles.coupleBio}>
                          {preview.groomBio.trim() ? preview.groomBio : defaultGroomBio}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollRevealArticle>
                <ScrollRevealArticle className={styles.coupleCard} revealAxis="right">
                  <div className={styles.coupleImgWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={brideCardPhoto} alt="" className={styles.coupleImg} />
                    <div className={styles.coupleHover}>
                      <span className={styles.coupleHLines} aria-hidden />
                      <span className={styles.coupleVLines} aria-hidden />
                      <div className={styles.coupleHoverContent}>
                        <h3 className={styles.coupleName}>
                          {preview.bride}
                          <small>{copy.bride}</small>
                        </h3>
                        <p className={styles.coupleBio}>
                          {preview.brideBio.trim() ? preview.brideBio : defaultBrideBio}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollRevealArticle>
                <ScrollRevealDiv variant="pop" className={styles.coupleDivider} aria-hidden>
                  <span className={styles.coupleDividerIcon}>
                    <span className={styles.heartIcon} />
                    <span className={styles.heartIcon} />
                  </span>
                </ScrollRevealDiv>
              </div>
            </div>

            <ScrollRevealDiv variant="title" revealAxis="left" className={styles.aboutBlock}>
              <h3 className={styles.aboutTitle}>{gettingMarriedTitle}</h3>
              <p className={styles.aboutText}>{coupleThanksBodyText}</p>
              <p className={styles.signature}>
                <span>{preview.groom}</span>
                {" & "}
                <span>{preview.bride}</span>
              </p>
              <div className={styles.parentGrid}>
                <div className={styles.parentCol}>
                  <p className={styles.parentLabel}>{copy.parentGroom}</p>
                  <p>
                    {copy.sonOf}:{" "}
                    <strong>{preview.groomParentLine1.trim() || copy.tbd}</strong>
                  </p>
                  <p>
                    {copy.dauOf}:{" "}
                    <strong>{preview.groomParentLine2.trim() || copy.tbd}</strong>
                  </p>
                </div>
                <div className={styles.parentCol}>
                  <p className={styles.parentLabel}>{copy.parentBride}</p>
                  <p>
                    {copy.sonOf}:{" "}
                    <strong>{preview.brideParentLine1.trim() || copy.tbd}</strong>
                  </p>
                  <p>
                    {copy.dauOf}:{" "}
                    <strong>{preview.brideParentLine2.trim() || copy.tbd}</strong>
                  </p>
                </div>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        <RevealSection
          id="invitation"
          className={styles.invitation}
          style={{ backgroundImage: `url(${invitationBg})` }}
        >
          <div className={styles.invitationOverlay} />
          <div className={styles.container}>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>{inviteBigDayTitle}</h2>
            <div className={styles.inviteCard}>
              <span className={styles.hLines} aria-hidden />
              <span className={styles.vLines} aria-hidden />
              <div className={styles.inviteInner}>
                <div className={styles.inviteTitleCol}>
                  <div className={styles.inviteTitleText}>
                    <span>Save</span>
                    <small>the</small>
                    <span>Date</span>
                  </div>
                </div>
                <div className={styles.inviteInfoCol}>
                  <h3 className={styles.inviteNames}>
                    {preview.groom} <small>&amp;</small> {preview.bride}
                  </h3>
                  <p>{inviteLeadText}</p>
                  <div className={styles.inviteBtns}>
                    <a href="#rsvp" className={`${styles.btnOutline} ${styles.btnOutlineLight}`}>
                      {copy.sendWish}
                    </a>
                    {calendarUrl !== "#" ? (
                      <a
                        href={calendarUrl}
                        className={`${styles.btnOutline} ${styles.btnOutlineLight}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {copy.confirmAttend}
                      </a>
                    ) : null}
                  </div>
                  <div className={styles.inviteDate}>{preview.dateLabel}</div>
                  {neelaCalendar ? (
                    <div className={styles.weddingCalShell}>
                      <div className={styles.weddingCalFrame}>
                        <span className={styles.weddingCalCorner} aria-hidden="true" />
                        <span className={styles.weddingCalCorner} aria-hidden="true" />
                        <span className={styles.weddingCalCorner} aria-hidden="true" />
                        <span className={styles.weddingCalCorner} aria-hidden="true" />
                        <p className={styles.weddingCalEyebrow}>{copy.calendarEyebrow}</p>
                        <p className={styles.weddingCalMonth}>{neelaCalendar.monthTitle}</p>
                        <div className={styles.weddingCalWeekdays}>
                          {neelaCalendar.weekdays.map((w) => (
                            <span key={w} className={styles.weddingCalWd}>
                              {w}
                            </span>
                          ))}
                        </div>
                        <div className={styles.weddingCalGrid}>
                          {neelaCalendar.cells.map((cell, idx) => {
                            const isWed = cell?.n === neelaCalendar.dom;
                            return (
                              <div
                                key={idx}
                                className={`${styles.weddingCalCell} ${!cell ? styles.weddingCalCellMuted : ""} ${isWed ? styles.weddingCalCellWed : ""}`.trim()}
                                aria-current={isWed ? "date" : undefined}
                              >
                                {cell ? (
                                  <>
                                    <span className={styles.weddingCalNum}>{cell.n}</span>
                                    {isWed ? (
                                      <span className={styles.weddingCalHeart} aria-hidden="true">
                                        ♥
                                      </span>
                                    ) : null}
                                  </>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                        {neelaCalendar.dom ? (
                          <p className={styles.weddingCalCaption}>
                            <span className={styles.weddingCalDot} aria-hidden="true" />
                            {copy.calendarWeddingDay}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                  <div className={styles.clockRow}>
                    {countdown.map((c, i) => (
                      <div
                        key={c.l}
                        className={`${styles.clockCell} ${i === countdown.length - 1 ? styles.clockCellLive : ""}`.trim()}
                      >
                        <span className={styles.clockNum}>{c.v}</span>
                        <span className={styles.clockLbl}>{c.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <section id="gallery" className={`${styles.section} ${styles.gallerySection}`}>
          <div className={styles.container}>
            <ScrollRevealDiv variant="title" revealAxis="left">
              <h2 className={styles.sectionTitle}>{gallerySectionTitle}</h2>
            </ScrollRevealDiv>
          </div>
          <div className={styles.galleryMasonry}>
            {gallery.map((src, i) => (
              <ScrollRevealButton
                key={`${src}-${i}`}
                type="button"
                className={styles.galleryItem}
                revealAxis={i % 2 === 0 ? "left" : "right"}
                onClick={() =>
                  onPreviewImage({ src, alt: `${gallerySectionTitle} ${i + 1}` })
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className={styles.galleryImg} />
              </ScrollRevealButton>
            ))}
          </div>
        </section>

        <RevealSection
          id="events"
          className={styles.eventsParallax}
          style={{ backgroundImage: `url(${eventsParallaxBg})` }}
        >
          <div className={styles.eventsOverlay} />
          <div className={styles.container}>
            <div className={styles.eventsBox}>
              <h2 className={styles.eventsTitle}>{eventsSectionTitle}</h2>
              <p className={styles.eventsDesc}>{eventsSectionDesc}</p>
              <ul className={styles.eventList}>
                <li className={styles.eventLi}>
                  <div className={styles.eventNeela}>
                    <span className={styles.hLines} aria-hidden />
                    <span className={styles.vLines} aria-hidden />
                    <div className={styles.eventBody}>
                      <div className={styles.eventRow}>
                        <div className={styles.eventAvatar} aria-hidden>
                          ♡
                        </div>
                        <div>
                          <h3 className={styles.eventH3}>{copy.ceremony}</h3>
                          <p className={styles.eventMeta}>
                            <strong>{preview.ceremonyTime}</strong>
                            {" · "}
                            {preview.dateLabel}
                          </p>
                          <p className={styles.eventPlace}>{preview.venue}</p>
                        </div>
                      </div>
                      <div className={styles.eventActions}>
                        {calendarUrl !== "#" ? (
                          <a
                            href={calendarUrl}
                            className={`${styles.btnPrimary} ${styles.btnReverse}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {copy.addCal}
                          </a>
                        ) : null}
                        <a
                          href={mapsUrl}
                          className={`${styles.btnPrimary} ${styles.btnReverse}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {copy.viewMap}
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={styles.eventLi}>
                  <div className={styles.eventNeela}>
                    <span className={styles.hLines} aria-hidden />
                    <span className={styles.vLines} aria-hidden />
                    <div className={styles.eventBody}>
                      <div className={styles.eventReceptionPair}>
                        <article
                          className={`${styles.eventReceptionCard} ${styles.eventReceptionCardGroom}`}
                          aria-label={`${copy.reception} — ${copy.parentGroom}`}
                        >
                          <span className={styles.eventReceptionBadge}>{copy.parentGroom}</span>
                          <h3 className={styles.eventReceptionCardTitle}>{copy.reception}</h3>
                          <p className={styles.eventReceptionWhen}>
                            <strong>{groomReceptionTime}</strong>
                            <span className={styles.eventReceptionWhenSep} aria-hidden>
                              ·
                            </span>
                            <span>{preview.dateLabel}</span>
                          </p>
                          <p className={styles.eventReceptionWhere}>
                            <span className={styles.eventReceptionVenueLine}>{groomReceptionVenue}</span>
                            <span className={styles.eventReceptionWhereSep} aria-hidden>
                              ·
                            </span>
                            <span className={styles.eventReceptionCityLine}>{groomReceptionLocation}</span>
                          </p>
                          <div className={styles.eventReceptionCardActions}>
                            <a
                              href={groomReceptionMapsUrl}
                              className={`${styles.btnPrimary} ${styles.eventReceptionMapBtn}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {copy.viewMap}
                            </a>
                          </div>
                        </article>
                        <article
                          className={`${styles.eventReceptionCard} ${styles.eventReceptionCardBride}`}
                          aria-label={`${copy.reception} — ${copy.parentBride}`}
                        >
                          <span className={`${styles.eventReceptionBadge} ${styles.eventReceptionBadgeBride}`}>
                            {copy.parentBride}
                          </span>
                          <h3 className={styles.eventReceptionCardTitle}>{copy.reception}</h3>
                          <p className={styles.eventReceptionWhen}>
                            <strong>{brideReceptionTime}</strong>
                            <span className={styles.eventReceptionWhenSep} aria-hidden>
                              ·
                            </span>
                            <span>{preview.dateLabel}</span>
                          </p>
                          <p className={styles.eventReceptionWhere}>
                            <span className={styles.eventReceptionVenueLine}>{brideReceptionVenue}</span>
                            <span className={styles.eventReceptionWhereSep} aria-hidden>
                              ·
                            </span>
                            <span className={styles.eventReceptionCityLine}>{brideReceptionLocation}</span>
                          </p>
                          <div className={styles.eventReceptionCardActions}>
                            <a
                              href={brideReceptionMapsUrl}
                              className={`${styles.btnPrimary} ${styles.eventReceptionMapBtn}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {copy.viewMap}
                            </a>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </RevealSection>

        <RevealSection id="rsvp" className={`${styles.section} ${styles.rsvpSection}`}>
          <div className={styles.container}>
            <div className={styles.formNeela}>
              <span className={styles.hLines} aria-hidden />
              <span className={styles.vLines} aria-hidden />
              <div className={styles.formInner}>
                <h2 className={styles.sectionTitle}>{guestbookSectionTitle}</h2>
                <form
                  className={styles.form}
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
                  <label className={styles.srOnly} htmlFor="bb-wish-suggest">
                    {copy.wishHint}
                  </label>
                  <select id="bb-wish-suggest" className={styles.select} defaultValue="">
                    <option value="" disabled>
                      {copy.wishHint}
                    </option>
                    {wishOptions.map((w) => (
                      <option key={w} value={w}>
                        {w.length > 70 ? `${w.slice(0, 70)}…` : w}
                      </option>
                    ))}
                  </select>
                  <textarea
                    className={styles.textarea}
                    name="content"
                    rows={4}
                    placeholder={copy.wishPh}
                  />
                  <div className={styles.formSubmit}>
                    <button type="submit" className={styles.btnPrimary}>
                      {copy.submitWish}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection id="donate" className={styles.section}>
          <div className={styles.container}>
            <ScrollRevealDiv variant="title" revealAxis="right" className={styles.donateTitleWrap}>
              <h2 className={styles.sectionTitle}>{giftSectionTitle}</h2>
            </ScrollRevealDiv>
            <div className={styles.donateGrid}>
              <ScrollRevealDiv revealAxis="left" className={styles.donateCardWrap}>
                <div className={styles.donateCard}>
                  <span className={styles.hLines} aria-hidden />
                  <span className={styles.vLines} aria-hidden />
                  <div className={styles.donateInner}>
                    <h4 className={styles.donateH4}>{copy.giftGroomSide}</h4>
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
                    <button
                      type="button"
                      className={styles.btnGhost}
                      onClick={() => void copyGroomAccount()}
                    >
                      {giftCopiedGroom ? copy.copied : copy.copyStk}
                    </button>
                  </div>
                </div>
              </ScrollRevealDiv>
              <ScrollRevealDiv revealAxis="right" className={styles.donateCardWrap}>
                <div className={styles.donateCard}>
                  <span className={styles.hLines} aria-hidden />
                  <span className={styles.vLines} aria-hidden />
                  <div className={styles.donateInner}>
                    <h4 className={styles.donateH4}>{copy.giftBrideSide}</h4>
                    <p>
                      {copy.bank}: <strong>{brideGiftBank}</strong>
                    </p>
                    <p>
                      {copy.accName}: <strong>{brideGiftName}</strong>
                    </p>
                    <p>
                      {copy.accNo}:{" "}
                      <strong className={styles.mono}>{brideGiftNumber}</strong>
                    </p>
                    <button
                      type="button"
                      className={styles.btnGhost}
                      onClick={() => void copyBrideAccount()}
                    >
                      {giftCopiedBride ? copy.copied : copy.copyStk}
                    </button>
                  </div>
                </div>
              </ScrollRevealDiv>
            </div>
          </div>
        </RevealSection>
      </main>

      <RevealFooter className={styles.footer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.footerBgImg} src={footerBackdrop} alt="" />
        <div className={styles.footerVeil} aria-hidden="true" />
        <div className={styles.footerFrame}>
          <p className={styles.footerEyebrow}>{footerEyebrowText}</p>
          <p className={styles.footerThanks}>{footerThanksText}</p>
          <div className={styles.footerLogo}>
            {preview.groom}
            <small>&amp;</small>
            {preview.bride}
          </div>
          <p className={styles.footerTier}>{template.tier}</p>
        </div>
      </RevealFooter>
    </div>
  );
}
