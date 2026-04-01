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
import type { TemplatePreviewProps } from "@/templates/preview-types";
import {
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
      { rootMargin: "0px 0px -2% 0px", threshold: 0.02 },
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

const scrollMediaIo: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px 0px -6% 0px",
  threshold: 0.02,
};

/** Ảnh / ô hiện dần khi từng phần tử vào viewport (kéo tới đâu chạy tới đó). */
function ScrollRevealButton({
  className = "",
  children,
  ...rest
}: ComponentPropsWithoutRef<"button">) {
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
    }, scrollMediaIo);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <button
      ref={ref}
      {...rest}
      className={`${className} ${shown ? styles.scrollMediaShown : styles.scrollMediaPending}`.trim()}
    >
      {children}
    </button>
  );
}

function ScrollRevealArticle({
  className = "",
  children,
  ...rest
}: ComponentPropsWithoutRef<"article">) {
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
    }, scrollMediaIo);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <article
      ref={ref}
      {...rest}
      className={`${className} ${shown ? styles.scrollMediaShown : styles.scrollMediaPending}`.trim()}
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
  ...rest
}: ComponentPropsWithoutRef<"div"> & { variant?: ScrollRevealDivVariant }) {
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
    }, scrollMediaIo);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const pending =
    variant === "title"
      ? styles.scrollTitlePending
      : variant === "pop"
        ? styles.scrollPopPending
        : styles.scrollMediaPending;
  const done =
    variant === "title"
      ? styles.scrollTitleShown
      : variant === "pop"
        ? styles.scrollPopShown
        : styles.scrollMediaShown;
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
      { rootMargin: "0px 0px -2% 0px", threshold: 0.03 },
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
}: TemplatePreviewProps) {
  const { language } = useGlobalPreferences();
  const gallery = images.galleryImages.length ? images.galleryImages : brightlyBasicGallery;
  const cover = images.coverImage || template.image;

  const countdown = useMemo(() => {
    const now = new Date();
    const target = new Date(preview.countdownTarget);
    const diff = Math.max(target.getTime() - now.getTime(), 0);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return [
      { v: String(days).padStart(2, "0"), l: language === "vi" ? "Ngày" : "Days" },
      { v: String(hours).padStart(2, "0"), l: language === "vi" ? "Giờ" : "Hrs" },
      { v: String(minutes).padStart(2, "0"), l: language === "vi" ? "Phút" : "Min" },
      { v: String(seconds).padStart(2, "0"), l: language === "vi" ? "Giây" : "Sec" },
    ];
  }, [language, preview.countdownTarget]);

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            back: "Về trang chủ",
            navCouple: "Cặp đôi",
            navGallery: "Album",
            navEvents: "Sự kiện",
            navRsvp: "Lưu bút",
            navGift: "Mừng cưới",
            saveDate: "Save the Date",
            sendWish: "Gửi lời chúc",
            confirmAttend: "Xác nhận tham dự",
            bigDay: "The Big Day!",
            inviteLead:
              "Một lời chúc của bạn chắc chắn sẽ làm cho đám cưới của chúng tôi có thêm một niềm hạnh phúc!",
            gettingMarried: "We are Getting Married",
            thanksBody:
              "Thật vui vì được gặp và đón tiếp các bạn trong một dịp đặc biệt như đám cưới của chúng mình. Cảm ơn các bạn rất nhiều vì sự hiện diện cùng những lời chúc tốt đẹp!",
            groom: "Chú rể",
            bride: "Cô dâu",
            galleryTitle: "Album Hình Cưới",
            eventsTitle: "Sự Kiện Cưới",
            eventsDesc:
              "Tình yêu đích thực đứng về phía nhau trong những ngày tốt đẹp và sát cánh hơn trong những ngày tồi tệ.",
            ceremony: "Lễ thành hôn",
            reception: "Tiệc cưới",
            addCal: "Thêm vào lịch",
            viewMap: "Xem bản đồ",
            guestbook: "Sổ Lưu Bút",
            namePh: "Tên của bạn*",
            emailPh: "E-mail",
            wishPh: "Nhập lời chúc của bạn*",
            wishHint: "Gợi ý lời chúc",
            submitWish: "Gửi lời chúc",
            giftTitle: "Hộp mừng cưới",
            giftToCouple: "Thông tin chuyển khoản",
            bank: "Ngân hàng",
            accName: "Tên tài khoản",
            accNo: "Số tài khoản",
            copyStk: "Sao chép STK",
            copied: "Đã sao chép",
            parentGroom: "Nhà trai",
            parentBride: "Nhà gái",
            sonOf: "Con ông",
            dauOf: "Con bà",
            tbd: "—",
          }
        : {
            back: "Back home",
            navCouple: "Couple",
            navGallery: "Album",
            navEvents: "Events",
            navRsvp: "Guestbook",
            navGift: "Gift",
            saveDate: "Save the Date",
            sendWish: "Send wishes",
            confirmAttend: "RSVP",
            bigDay: "The Big Day!",
            inviteLead:
              "Your kind wishes will mean the world to us on our wedding day.",
            gettingMarried: "We are Getting Married",
            thanksBody:
              "We are grateful to celebrate this special day with you. Thank you for your presence and your warm wishes!",
            groom: "The Groom",
            bride: "The Bride",
            galleryTitle: "Wedding Album",
            eventsTitle: "Wedding Events",
            eventsDesc:
              "True love stands together in good days and even closer in hard ones.",
            ceremony: "Ceremony",
            reception: "Reception",
            addCal: "Add to calendar",
            viewMap: "View map",
            guestbook: "Guestbook",
            namePh: "Your name*",
            emailPh: "E-mail",
            wishPh: "Your message*",
            wishHint: "Suggested wishes",
            submitWish: "Send wishes",
            giftTitle: "Wedding gift",
            giftToCouple: "Bank transfer",
            bank: "Bank",
            accName: "Account name",
            accNo: "Account number",
            copyStk: "Copy number",
            copied: "Copied",
            parentGroom: "Groom's family",
            parentBride: "Bride's family",
            sonOf: "Son of",
            dauOf: "Daughter of",
            tbd: "—",
          },
    [language],
  );

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
              <Link href="/" className={styles.backHome}>
                {copy.back}
              </Link>
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
              <p className={styles.heroKicker}>{copy.saveDate}</p>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroNameBlock}>{preview.groom}</span>
                <small className={styles.heroAnd}>&amp;</small>
                <span className={styles.heroNameBlock}>{preview.bride}</span>
              </h1>
              <p className={styles.heroDate}>{preview.dateLabel}</p>
              <a href="#rsvp" className={styles.btnHero}>
                {copy.sendWish}
              </a>
            </div>
          </div>
        </section>

        <section id="couple" className={styles.coupleSection}>
          <div className={styles.container}>
            <div className={styles.coupleGrid}>
              <div className={styles.coupleRow}>
                <ScrollRevealArticle className={styles.coupleCard}>
                  <div className={styles.coupleImgWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cover} alt="" className={styles.coupleImg} />
                    <div className={styles.coupleHover}>
                      <span className={styles.coupleHLines} aria-hidden />
                      <span className={styles.coupleVLines} aria-hidden />
                      <div className={styles.coupleHoverContent}>
                        <h3 className={styles.coupleName}>
                          {preview.groom}
                          <small>{copy.groom}</small>
                        </h3>
                        <p className={styles.coupleBio}>{defaultGroomBio}</p>
                      </div>
                    </div>
                  </div>
                </ScrollRevealArticle>
                <ScrollRevealArticle className={styles.coupleCard}>
                  <div className={styles.coupleImgWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={gallery[1] ?? gallery[0]}
                      alt=""
                      className={styles.coupleImg}
                    />
                    <div className={styles.coupleHover}>
                      <span className={styles.coupleHLines} aria-hidden />
                      <span className={styles.coupleVLines} aria-hidden />
                      <div className={styles.coupleHoverContent}>
                        <h3 className={styles.coupleName}>
                          {preview.bride}
                          <small>{copy.bride}</small>
                        </h3>
                        <p className={styles.coupleBio}>{defaultBrideBio}</p>
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

            <ScrollRevealDiv variant="title" className={styles.aboutBlock}>
              <h3 className={styles.aboutTitle}>{copy.gettingMarried}</h3>
              <p className={styles.aboutText}>{copy.thanksBody}</p>
              <p className={styles.signature}>
                <span>{preview.groom}</span>
                {" & "}
                <span>{preview.bride}</span>
              </p>
              <div className={styles.parentGrid}>
                <div className={styles.parentCol}>
                  <p className={styles.parentLabel}>{copy.parentGroom}</p>
                  <p>
                    {copy.sonOf}: <strong>{copy.tbd}</strong>
                  </p>
                  <p>
                    {copy.dauOf}: <strong>{copy.tbd}</strong>
                  </p>
                </div>
                <div className={styles.parentCol}>
                  <p className={styles.parentLabel}>{copy.parentBride}</p>
                  <p>
                    {copy.sonOf}: <strong>{copy.tbd}</strong>
                  </p>
                  <p>
                    {copy.dauOf}: <strong>{copy.tbd}</strong>
                  </p>
                </div>
              </div>
            </ScrollRevealDiv>
          </div>
        </section>

        <RevealSection
          id="invitation"
          className={styles.invitation}
          style={{ backgroundImage: `url(${gallery[2] ?? cover})` }}
        >
          <div className={styles.invitationOverlay} />
          <div className={styles.container}>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>{copy.bigDay}</h2>
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
                  <p>{copy.inviteLead}</p>
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
                  <div className={styles.clockRow}>
                    {countdown.map((c) => (
                      <div key={c.l} className={styles.clockCell}>
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
            <ScrollRevealDiv variant="title">
              <h2 className={styles.sectionTitle}>{copy.galleryTitle}</h2>
            </ScrollRevealDiv>
          </div>
          <div className={styles.galleryMasonry}>
            {gallery.map((src, i) => (
              <ScrollRevealButton
                key={`${src}-${i}`}
                type="button"
                className={styles.galleryItem}
                onClick={() =>
                  onPreviewImage({ src, alt: `${copy.galleryTitle} ${i + 1}` })
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
          style={{ backgroundImage: `url(${gallery[3] ?? cover})` }}
        >
          <div className={styles.eventsOverlay} />
          <div className={styles.container}>
            <div className={styles.eventsBox}>
              <h2 className={styles.eventsTitle}>{copy.eventsTitle}</h2>
              <p className={styles.eventsDesc}>{copy.eventsDesc}</p>
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
                      <div className={styles.eventRow}>
                        <div className={styles.eventAvatar} aria-hidden>
                          ♡
                        </div>
                        <div>
                          <h3 className={styles.eventH3}>{copy.reception}</h3>
                          <p className={styles.eventMeta}>
                            <strong>{preview.partyTime}</strong>
                            {" · "}
                            {preview.dateLabel}
                          </p>
                          <p className={styles.eventPlace}>
                            {preview.venue} · {preview.location}
                          </p>
                        </div>
                      </div>
                      <div className={styles.eventActions}>
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
                <h2 className={styles.sectionTitle}>{copy.guestbook}</h2>
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
            <h2 className={styles.sectionTitle}>{copy.giftTitle}</h2>
            <div className={styles.donateGrid}>
              <div className={styles.donateCard}>
                <span className={styles.hLines} aria-hidden />
                <span className={styles.vLines} aria-hidden />
                <div className={styles.donateInner}>
                  <h4 className={styles.donateH4}>{copy.giftToCouple}</h4>
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
              </div>
            </div>
          </div>
        </RevealSection>
      </main>

      <RevealFooter className={styles.footer}>
        <div className={styles.footerLogo}>
          {preview.groom}
          <small>&amp;</small>
          {preview.bride}
        </div>
        <p className={styles.footerTier}>{template.tier}</p>
      </RevealFooter>
    </div>
  );
}
