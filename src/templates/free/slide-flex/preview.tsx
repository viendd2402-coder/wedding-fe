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
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import {
  defaultBrideBioEn,
  defaultBrideBioVi,
  defaultGroomBioEn,
  defaultGroomBioVi,
  partyEn,
  partyVi,
  slideFlexGallery,
  timelineEn,
  timelineVi,
  wishSuggestionsEn,
  wishSuggestionsVi,
} from "./data";
import styles from "./slide-flex.module.css";

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
  rootMargin: "0px",
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

export default function SlideFlexPreview({
  template,
  preview,
  images,
  onPreviewImage,
}: TemplatePreviewProps) {
  const { language } = useGlobalPreferences();
  const gallery =
    images.galleryImages.length > 0 ? images.galleryImages : slideFlexGallery;
  const cover = images.coverImage || template.image;

  const slides = useMemo(() => {
    const list = [cover, ...gallery].filter(Boolean);
    const uniq = [...new Set(list)];
    return uniq.slice(0, 6);
  }, [cover, gallery]);

  const [slideIdx, setSlideIdx] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [giftCopied, setGiftCopied] = useState(false);

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

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            back: "Về studio",
            navCouple: "Cặp đôi",
            navStory: "Chuyện tình",
            navParty: "Phù dâu/rể",
            navEvents: "Sự kiện",
            navGallery: "Album",
            navVideo: "Video",
            navRsvp: "Lưu bút",
            navGift: "Mừng cưới",
            heroEyebrow: "Wedding",
            gettingMarried: "Chúng mình sắp cưới rồi!",
            rsvp: "Xác nhận tham dự",
            coupleTitle: "Cô dâu & Chú rể",
            storyTitle: "Chuyện tình yêu",
            partyTitle: "Phù dâu & Phù rể",
            partyBrides: "Phù dâu",
            partyGrooms: "Phù rể",
            partyLead:
              "Tình yêu không chỉ là một danh từ — là động từ của sự quan tâm, chia sẻ và đồng hành.",
            eventsTitle: "Sự kiện cưới",
            eventsLead:
              "…tình yêu không phải là nhìn nhau, mà là cùng nhìn về một hướng…",
            galleryTitle: "Album hình cưới",
            videoTitle: "Video cưới",
            videoCap: "Khoảnh khắc của hai chúng mình — demo preview.",
            guestbook: "Sổ lưu bút",
            guestLead:
              "Cảm ơn bạn đã gửi lời chúc đến đám cưới của chúng mình!",
            namePh: "Họ tên*",
            emailPh: "Email",
            wishPh: "Lời chúc*",
            wishHint: "Gợi ý lời chúc",
            submit: "Gửi lời chúc",
            giftTitle: "Hộp mừng cưới",
            giftBride: "Mừng cưới cô dâu",
            giftGroom: "Mừng cưới chú rể",
            bank: "Ngân hàng",
            accName: "Chủ tài khoản",
            accNo: "Số tài khoản",
            copyStk: "Sao chép STK",
            copied: "Đã sao chép",
            ceremony: "Lễ cưới",
            reception: "Tiệc cưới",
            viewMap: "Xem bản đồ",
            addCal: "Thêm vào lịch",
            bride: "Cô dâu",
            groom: "Chú rể",
            sonOf: "Con ông",
            dauOf: "Con bà",
            tbd: "—",
          }
        : {
            back: "Back to studio",
            navCouple: "Couple",
            navStory: "Our story",
            navParty: "Wedding party",
            navEvents: "Events",
            navGallery: "Gallery",
            navVideo: "Video",
            navRsvp: "Guestbook",
            navGift: "Gift",
            heroEyebrow: "Wedding",
            gettingMarried: "We’re getting married!",
            rsvp: "RSVP",
            coupleTitle: "Bride & Groom",
            storyTitle: "Love story",
            partyTitle: "Bridesmaids & groomsmen",
            partyBrides: "Bridesmaids",
            partyGrooms: "Groomsmen",
            partyLead:
              "Love is not just a noun—it is caring, sharing, and showing up for each other.",
            eventsTitle: "Wedding events",
            eventsLead:
              "Love isn’t just gazing at each other—it’s looking in the same direction.",
            galleryTitle: "Wedding album",
            videoTitle: "Wedding film",
            videoCap: "A glimpse of our day — preview placeholder.",
            guestbook: "Guestbook",
            guestLead: "Thank you for your warm wishes on our wedding day!",
            namePh: "Your name*",
            emailPh: "Email",
            wishPh: "Your message*",
            wishHint: "Suggested wishes",
            submit: "Send wishes",
            giftTitle: "Wedding gift",
            giftBride: "Gift to bride",
            giftGroom: "Gift to groom",
            bank: "Bank",
            accName: "Account name",
            accNo: "Account number",
            copyStk: "Copy number",
            copied: "Copied",
            ceremony: "Ceremony",
            reception: "Reception",
            viewMap: "View map",
            addCal: "Add to calendar",
            bride: "Bride",
            groom: "Groom",
            sonOf: "Daughter of",
            dauOf: "Son of",
            tbd: "—",
          },
    [language],
  );

  const timeline = language === "vi" ? timelineVi : timelineEn;
  const party = language === "vi" ? partyVi : partyEn;
  const groomBio = language === "vi" ? defaultGroomBioVi : defaultGroomBioEn;
  const brideBio = language === "vi" ? defaultBrideBioVi : defaultBrideBioEn;
  const wishOptions = language === "vi" ? wishSuggestionsVi : wishSuggestionsEn;

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
            <Link href="/" className={styles.backHome} onClick={() => setNavOpen(false)}>
              {copy.back}
            </Link>
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
            <p className={styles.heroEyebrow}>{copy.heroEyebrow}</p>
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
            <p className={styles.heroSub}>{copy.gettingMarried}</p>
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
              <h2 className={styles.sectionTitle}>{copy.coupleTitle}</h2>
            </ScrollRevealDiv>
            <div className={styles.coupleGrid}>
              <ScrollRevealArticle className={styles.coupleCard} revealAxis="left">
                <div
                  className={styles.coupleImg}
                  style={{ backgroundImage: `url(${cover})` }}
                />
                <div className={styles.coupleBody}>
                  <p className={styles.coupleTag}>{copy.groom}</p>
                  <h3 className={styles.coupleName}>{preview.groom}</h3>
                  <p className={styles.coupleParents}>
                    {copy.sonOf}: <strong>{copy.tbd}</strong>
                    <br />
                    {copy.dauOf}: <strong>{copy.tbd}</strong>
                  </p>
                  <p className={styles.coupleBio}>{groomBio}</p>
                </div>
              </ScrollRevealArticle>
              <ScrollRevealArticle className={styles.coupleCard} revealAxis="right">
                <div
                  className={styles.coupleImg}
                  style={{
                    backgroundImage: `url(${gallery[1] ?? gallery[0]})`,
                  }}
                />
                <div className={styles.coupleBody}>
                  <p className={styles.coupleTag}>{copy.bride}</p>
                  <h3 className={styles.coupleName}>{preview.bride}</h3>
                  <p className={styles.coupleParents}>
                    {copy.sonOf}: <strong>{copy.tbd}</strong>
                    <br />
                    {copy.dauOf}: <strong>{copy.tbd}</strong>
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
              <h2 className={styles.sectionTitle}>{copy.storyTitle}</h2>
            </ScrollRevealDiv>
            <div className={styles.timeline}>
              {timeline.map((item, i) => (
                <ScrollRevealDiv
                  key={item.title}
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
              <h2 className={styles.sectionTitle}>{copy.partyTitle}</h2>
              <p className={styles.sectionLead}>{copy.partyLead}</p>
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
              <h2 className={styles.sectionTitle}>{copy.eventsTitle}</h2>
              <p className={styles.sectionLead}>{copy.eventsLead}</p>
            </ScrollRevealDiv>
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
              <h2 className={styles.sectionTitle}>{copy.galleryTitle}</h2>
            </ScrollRevealDiv>
            <div className={styles.galleryGrid}>
              {gallery.map((src, i) => (
                <ScrollRevealButton
                  key={`${src}-${i}`}
                  type="button"
                  className={styles.galleryBtn}
                  revealAxis={i % 2 === 0 ? "left" : "right"}
                  onClick={() =>
                    onPreviewImage({ src, alt: `${copy.galleryTitle} ${i + 1}` })
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
              <h2 className={styles.sectionTitle}>{copy.videoTitle}</h2>
            </ScrollRevealDiv>
            <ScrollRevealDiv revealAxis="left">
              <div>
                <div className={styles.videoBlock}>
                  <button type="button" className={styles.videoPlay} aria-label="Play">
                    ▶
                  </button>
                </div>
                <p className={styles.videoCaption}>{copy.videoCap}</p>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        <section id="rsvp" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <ScrollRevealDiv variant="title" revealAxis="left">
              <h2 className={styles.sectionTitle}>{copy.guestbook}</h2>
              <p className={styles.sectionLead}>{copy.guestLead}</p>
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
                <select id="sf-wish" className={styles.select} defaultValue="">
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
              <h2 className={styles.sectionTitle}>{copy.giftTitle}</h2>
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

      <footer className={styles.footer}>
        {preview.groom} &amp; {preview.bride} · {template.tier}
      </footer>
    </div>
  );
}
