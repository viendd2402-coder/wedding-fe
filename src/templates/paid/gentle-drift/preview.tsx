"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { useGlobalPreferences, type AppLanguage } from "@/components/global-preferences-provider";
import WeddingCountdown from "@/components/wedding-countdown";
import { gentleDriftPreviewMessages } from "@/i18n/messages/template-previews/gentle-drift";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import {
  gentleDriftGallery,
  gentleDriftStoryEn,
  gentleDriftStoryVi,
} from "./data";
import styles from "./gentle-drift.module.css";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gd-display",
});

const ui = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gd-ui",
});

const ioOpts: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px 0px -10% 0px",
  threshold: 0.08,
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function GdReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
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
  return (
    <div ref={ref} className={`${styles.reveal} ${shown ? styles.revealOn : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}

function gentleCalendar(
  countdownTarget: string,
  language: AppLanguage,
): {
  dom: number;
  cells: ({ n: number } | null)[];
  monthTitle: string;
  weekdays: string[];
} | null {
  const d = new Date(countdownTarget);
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
}

export default function GentleDriftPreview({
  template,
  preview,
  images,
  onPreviewImage,
  isPublicInviteSnapshot = false,
}: TemplatePreviewProps) {
  const { language, theme } = useGlobalPreferences();
  const reducedMotion = usePrefersReducedMotion();
  const isDark = theme === "dark";
  const copy = gentleDriftPreviewMessages[language];
  const gallery = images.galleryImages.length ? images.galleryImages : [...gentleDriftGallery];
  const cover = images.coverImage || template.image;
  const story = language === "vi" ? gentleDriftStoryVi : gentleDriftStoryEn;

  const [introLeaving, setIntroLeaving] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (!reducedMotion) return;
    queueMicrotask(() => {
      setIntroDone(true);
      setIntroLeaving(false);
    });
  }, [reducedMotion]);

  const cal = useMemo(
    () => gentleCalendar(preview.countdownTarget, language),
    [language, preview.countdownTarget],
  );

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

  useEffect(() => {
    if (!introLeaving || reducedMotion) return;
    const id = window.setTimeout(() => {
      setIntroDone(true);
      setIntroLeaving(false);
    }, 1180);
    return () => window.clearTimeout(id);
  }, [introLeaving, reducedMotion]);

  const [giftCopied, setGiftCopied] = useState(false);
  const copyAccount = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(preview.accountNumber.replace(/\s/g, ""));
      setGiftCopied(true);
      window.setTimeout(() => setGiftCopied(false), 2000);
    } catch {
      setGiftCopied(false);
    }
  }, [preview.accountNumber]);

  const [attending, setAttending] = useState<"yes" | "no" | null>(null);

  const heroCover = useMemo(
    () =>
      ({
        ["--gd-hero-cover" as string]: `url("${cover.replace(/"/g, '\\"')}")`,
      }) as CSSProperties,
    [cover],
  );

  return (
    <div
      className={`${display.variable} ${ui.variable} ${styles.root}`}
      data-theme={isDark ? "dark" : "light"}
      data-gd-open={introDone ? "true" : "false"}
    >
      {!introDone ? (
        <div
          className={`${styles.intro} ${introLeaving ? styles.introLeaving : ""}`.trim()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gd-intro-names"
        >
          <div className={styles.introBackdrop} aria-hidden />
          <div className={styles.introFlash} aria-hidden />
          <div className={styles.introGrain} aria-hidden />
          <div className={styles.introStage}>
            <div className={styles.introLuxInvite}>
              <div
                className={styles.introLuxPhoto}
                style={{
                  backgroundImage: `url("${cover.replace(/"/g, '\\"')}")`,
                }}
                aria-hidden
              />
              <div className={styles.introLuxScrim} aria-hidden />
              <div className={styles.introLuxSheen} aria-hidden />
              <div className={styles.introLuxInset} aria-hidden />
              <div className={styles.introLuxBody}>
                <span className={styles.introKicker}>{copy.saveLine}</span>
                <p id="gd-intro-names" className={styles.introNames}>
                  {preview.groom}
                  <span className={styles.introAmp}>&amp;</span>
                  {preview.bride}
                </p>
                <p className={styles.introDate}>{preview.dateLabel}</p>
                <div className={styles.introActions}>
                  <button type="button" className={styles.introBtn} onClick={() => setIntroLeaving(true)}>
                    {copy.openInvite}
                  </button>
                  {!reducedMotion ? (
                    <button type="button" className={styles.introSkip} onClick={() => setIntroDone(true)}>
                      {copy.skipIntro}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className={`${styles.shell} ${introDone ? styles.shellUnveiled : ""}`.trim()}>
        <header className={styles.navBar}>
          <div className={styles.navInner}>
            <nav className={styles.navLinks} aria-label="Mục thiệp">
              <a href="#save">{copy.navSave}</a>
              <span className={styles.navDot} aria-hidden />
              <a href="#couple">{copy.navCouple}</a>
              <span className={styles.navDot} aria-hidden />
              <a href="#story">{copy.navStory}</a>
              <span className={styles.navDot} aria-hidden />
              <a href="#events">{copy.navDay}</a>
              <span className={styles.navDot} aria-hidden />
              <a href="#album">{copy.navAlbum}</a>
              <span className={styles.navDot} aria-hidden />
              <a href="#guestbook">{copy.navRsvp}</a>
              <span className={styles.navDot} aria-hidden />
              <a href="#gift">{copy.navGift}</a>
            </nav>
            {!isPublicInviteSnapshot ? (
              <Link href="/" className={styles.backHome}>
                {copy.backHome}
              </Link>
            ) : (
              <span className={styles.backHome} style={{ visibility: "hidden" }} aria-hidden>
                ·
              </span>
            )}
          </div>
        </header>

        <main className={styles.main}>
          <section className={styles.hero} id="save" style={heroCover} aria-labelledby="gd-hero-names">
            <div className={styles.heroScrim} aria-hidden />
            <div className={styles.heroContent}>
              <p className={styles.heroEyebrow}>{copy.forTheWeddingOf}</p>
              <h1 id="gd-hero-names" className={styles.heroNames}>
                {preview.groom}
                <span className={styles.heroLine} aria-hidden />
                {preview.bride}
              </h1>
              <p className={styles.heroDate}>{preview.dateLabel}</p>
              <p className={styles.heroLead}>{copy.wishLead}</p>
              <a href="#guestbook" className={styles.heroCta}>
                {copy.wishCta}
              </a>
            </div>
            <div className={styles.heroLuxBar} aria-hidden />
          </section>

          <div className={styles.detailShell}>
          {cal ? (
            <div className={styles.calBand}>
              <GdReveal>
                <div className={styles.calTicket}>
                  <div className={styles.calTicketHead}>
                    <p className={styles.calMonth}>{cal.monthTitle}</p>
                    <p className={styles.calCaption}>
                      <span className={styles.calDot} aria-hidden />
                      {copy.calendarWeddingDay}
                    </p>
                  </div>
                  <div className={styles.calWeekdays}>
                    {cal.weekdays.map((w) => (
                      <span key={w}>{w}</span>
                    ))}
                  </div>
                  <div className={styles.calGrid}>
                    {cal.cells.map((cell, idx) => {
                      const isWed = cell?.n === cal.dom;
                      return (
                        <div
                          key={idx}
                          className={`${styles.calCell} ${!cell ? styles.calCellMuted : ""} ${isWed ? styles.calCellWed : ""}`.trim()}
                          aria-current={isWed ? "date" : undefined}
                        >
                          {cell ? <span>{cell.n}</span> : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </GdReveal>
            </div>
          ) : null}

          <section className={styles.sectionInvite}>
            <GdReveal>
              <div className={`${styles.luxBlock} ${styles.luxBlockPlainTop}`}>
                <div className={styles.inviteBlock}>
                  <div className={styles.inviteRule} aria-hidden />
                  <div className={styles.inviteCopy}>
                    <p className={styles.inviteKicker}>{copy.saveLine}</p>
                    <p className={styles.inviteBody}>{copy.inviteBody}</p>
                    <div className={styles.ctaRow}>
                      <a href="#guestbook" className={styles.ctaPrimary}>
                        {copy.ctaRsvp}
                      </a>
                      <a href="#guestbook" className={styles.ctaGhost}>
                        {copy.wishCta}
                      </a>
                      <a href="#gift" className={styles.ctaGhost}>
                        {copy.ctaGift}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </GdReveal>
          </section>

          <section className={styles.sectionDuo} id="couple">
            <div className={styles.luxBlock}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{copy.coupleTitle}</h2>
                <p className={styles.sectionQuote}>{copy.coupleQuote}</p>
              </div>
              <GdReveal>
                <div className={styles.duo}>
                <article className={styles.duoCard}>
                  <div className={styles.duoFigure}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cover} alt="" className={styles.duoImg} />
                    <span className={styles.duoLabel}>{copy.groom}</span>
                  </div>
                  <div className={styles.duoBody}>
                    <h3 className={styles.duoName}>{preview.groom}</h3>
                    <p className={styles.duoParents}>
                      {copy.sonOf}: <strong>{copy.tbd}</strong>
                    </p>
                    <p className={styles.duoParents}>
                      {copy.dauOf}: <strong>{copy.tbd}</strong>
                    </p>
                    <p className={styles.duoBio}>{copy.groomBio}</p>
                  </div>
                </article>
                <article className={`${styles.duoCard} ${styles.duoCardAlt}`}>
                  <div className={styles.duoFigure}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={gallery[1] ?? gallery[0]} alt="" className={styles.duoImg} />
                    <span className={styles.duoLabel}>{copy.bride}</span>
                  </div>
                  <div className={styles.duoBody}>
                    <h3 className={styles.duoName}>{preview.bride}</h3>
                    <p className={styles.duoParents}>
                      {copy.sonOf}: <strong>{copy.tbd}</strong>
                    </p>
                    <p className={styles.duoParents}>
                      {copy.dauOf}: <strong>{copy.tbd}</strong>
                    </p>
                    <p className={styles.duoBio}>{copy.brideBio}</p>
                  </div>
                </article>
                </div>
              </GdReveal>
            </div>
          </section>

          <section className={styles.sectionStory} id="story">
            <div className={styles.luxBlock}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{copy.storyTitle}</h2>
                <p className={styles.lead}>{copy.storyLead}</p>
              </div>
              <GdReveal>
                <ol className={styles.timeline}>
                {story.map((s, i) => (
                  <li key={s.year + s.title} className={styles.timelineItem}>
                    <span className={styles.timelineIndex} aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={styles.timelineCard}>
                      <p className={styles.timelineYear}>{s.year}</p>
                      <h3 className={styles.timelineH}>{s.title}</h3>
                      <p className={styles.timelineP}>{s.body}</p>
                    </div>
                  </li>
                ))}
                </ol>
              </GdReveal>
            </div>
          </section>

          <section className={styles.sectionEvents} id="events">
            <div className={styles.luxBlock}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{copy.eventsTitle}</h2>
                <p className={styles.sectionQuote}>{copy.eventsQuote}</p>
                <p className={styles.lead}>{copy.eventsLead}</p>
              </div>
              <GdReveal>
                <div className={styles.eventDeck}>
                <article className={styles.eventCard}>
                  <span className={styles.eventNum} aria-hidden>
                    01
                  </span>
                  <div className={styles.eventBody}>
                    <span className={styles.eventBadge}>{copy.dressCode}</span>
                    <h3 className={styles.eventH}>{copy.ceremony}</h3>
                    <p className={styles.eventTime}>
                      {preview.ceremonyTime} · {preview.dateLabel}
                    </p>
                    <p className={styles.eventPlace}>{preview.venue}</p>
                    <p className={styles.eventDressHint}>{copy.dressHint}</p>
                    <div className={styles.eventActions}>
                      {calendarUrl !== "#" ? (
                        <a href={calendarUrl} className={styles.eventBtn} target="_blank" rel="noreferrer">
                          {copy.addCalendar}
                        </a>
                      ) : null}
                      <a
                        href={mapsUrl}
                        className={`${styles.eventBtn} ${styles.eventBtnGhost}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {copy.mapCta}
                      </a>
                    </div>
                  </div>
                </article>
                <article className={styles.eventCard}>
                  <span className={styles.eventNum} aria-hidden>
                    02
                  </span>
                  <div className={styles.eventBody}>
                    <span className={styles.eventBadge}>{copy.dressCode}</span>
                    <h3 className={styles.eventH}>{copy.reception}</h3>
                    <p className={styles.eventTime}>
                      {preview.partyTime} · {preview.dateLabel}
                    </p>
                    <p className={styles.eventPlace}>
                      {preview.venue} · {preview.location}
                    </p>
                    <p className={styles.eventDressHint}>{copy.dressHint}</p>
                    <div className={styles.eventActions}>
                      <a href={mapsUrl} className={styles.eventBtn} target="_blank" rel="noreferrer">
                        {copy.mapCta}
                      </a>
                    </div>
                  </div>
                </article>
                </div>
              </GdReveal>
            </div>
          </section>

          <section className={styles.sectionAlbum} id="album">
            <div className={styles.luxBlock}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{copy.albumTitle}</h2>
                <p className={styles.lead}>{copy.albumLead}</p>
              </div>
              <GdReveal>
                <div className={styles.bento}>
                {gallery.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    className={`${styles.bentoCell} ${i === 0 ? styles.bentoHero : ""}`.trim()}
                    onClick={() =>
                      onPreviewImage({
                        src,
                        alt: `${copy.albumTitle} ${i + 1}`,
                      })
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" />
                  </button>
                ))}
                </div>
              </GdReveal>
            </div>
          </section>

          <section className={styles.sectionCount}>
            <GdReveal>
              <div className={`${styles.countInner} ${styles.luxCountFrame}`}>
                <div className={styles.countCopy}>
                  <h2 className={styles.countTitle}>{copy.countdownTitle}</h2>
                  <p className={styles.countLead}>{copy.countdownLead}</p>
                  <div className={styles.countMap}>
                    <a href={mapsUrl} className={styles.mapLink} target="_blank" rel="noreferrer">
                      {copy.mapCta}
                    </a>
                    <span className={styles.mapHint}>{copy.mapHint}</span>
                  </div>
                </div>
                <div className={styles.countWidget}>
                  <WeddingCountdown
                    targetDate={preview.countdownTarget}
                    variant="gentleDrift"
                    gentleDriftTone={isDark ? "midnight" : "warm"}
                  />
                </div>
              </div>
            </GdReveal>
          </section>

          <section className={styles.sectionForms} id="guestbook">
            <div className={styles.luxBlock}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>{copy.guestbookTitle}</h2>
                <p className={styles.lead}>{copy.guestbookLead}</p>
              </div>
              <GdReveal>
                <div className={styles.twin}>
                <div className={styles.panel}>
                  <h3 className={styles.panelTitle}>{copy.rsvpTitle}</h3>
                  <p className={`${styles.lead} ${styles.panelLead}`}>{copy.rsvpLead}</p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <input className={styles.field} name="name" autoComplete="name" placeholder={copy.namePh} />
                    <input
                      className={styles.field}
                      name="contact"
                      autoComplete="email"
                      placeholder={copy.contactPh}
                    />
                    <textarea className={styles.field} name="wish" rows={3} placeholder={copy.wishPh} />
                    <div className={styles.rsvpToggleRow}>
                      <button
                        type="button"
                        className={styles.toggle}
                        data-on={attending === "yes" ? "true" : undefined}
                        onClick={() => setAttending("yes")}
                      >
                        {copy.attending}
                      </button>
                      <button
                        type="button"
                        className={styles.toggle}
                        data-on={attending === "no" ? "true" : undefined}
                        onClick={() => setAttending("no")}
                      >
                        {copy.decline}
                      </button>
                    </div>
                    <button type="submit" className={styles.submitBtn}>
                      {copy.submit}
                    </button>
                  </form>
                </div>

                <div className={styles.panel} id="gift">
                  <h3 className={styles.panelTitle}>{copy.giftTitle}</h3>
                  <p className={`${styles.lead} ${styles.panelLead}`}>{copy.giftLead}</p>
                  <p className={styles.bankLine}>
                    <strong className={styles.bankStrong}>{preview.bankName}</strong>
                  </p>
                  <p className={styles.bankLine}>
                    {preview.accountName} · {preview.accountNumber}
                  </p>
                  <button type="button" className={styles.copyBtn} onClick={copyAccount}>
                    {giftCopied ? copy.copied : copy.copyNumber}
                  </button>
                </div>
                </div>
              </GdReveal>
            </div>
          </section>

          <footer className={styles.footer}>
            <p>{copy.footerThanks}</p>
          </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
