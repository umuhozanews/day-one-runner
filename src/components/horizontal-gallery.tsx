import { useEffect, useRef } from "react";

const IMG = {
  arda: "/photos/SnapInsta.to_747324725_18037222925815520_1618702269398711337_n.jpg",
  gallery: "/photos/SnapInsta.to_747127098_18037222823815520_2381065393482829694_n.jpg",
  mission1: "/photos/SnapInsta.to_746946968_18037222916815520_1487452782690018971_n.jpg",
  mission2: "/photos/SnapInsta.to_746320328_18037222880815520_6195251949431723290_n.jpg",
  windbreaker: "/photos/SnapInsta.to_745476949_18037222772815520_856157820420781333_n.jpg",
  vest: "/photos/SnapInsta.to_735576709_18035341052815520_2320225975748695476_n.jpg",
  halfzip: "/photos/SnapInsta.to_734545943_18035340827815520_2367846536884391749_n.jpg",
  tee: "/photos/SnapInsta.to_733127115_18035340896815520_2231808219904722718_n.jpg",
};

type ImgItem = {
  kind: "img";
  src: string;
  label: string;
  w: string;
  h: string;
  vAlign: "top" | "center" | "bottom";
  offset: string;
  badge?: string;
};

type QuoteItem = {
  kind: "quote";
  text: string;
  w: string;
  dark?: boolean;
  vAlign: "top" | "center" | "bottom";
  offset: string;
};

type GalleryItem = ImgItem | QuoteItem;

const items: GalleryItem[] = [
  {
    kind: "img",
    src: IMG.gallery,
    label: "Sunday Dawn — Kigali",
    w: "22rem",
    h: "32rem",
    vAlign: "bottom",
    offset: "4rem",
  },
  {
    kind: "img",
    src: IMG.mission1,
    label: "Community Long Run",
    w: "26rem",
    h: "26rem",
    vAlign: "top",
    offset: "5rem",
  },
  {
    kind: "quote",
    text: "Clarity comes with motion. The road is where the mind clears.",
    w: "28rem",
    vAlign: "center",
    offset: "0rem",
  },
  {
    kind: "img",
    src: IMG.mission2,
    label: "All Paces Welcome",
    w: "24rem",
    h: "28rem",
    vAlign: "bottom",
    offset: "2rem",
  },
  {
    kind: "img",
    src: IMG.arda,
    label: "The Crew",
    w: "22rem",
    h: "28rem",
    vAlign: "top",
    offset: "3rem",
  },
  {
    kind: "img",
    src: IMG.windbreaker,
    label: "06:30 Start",
    w: "26rem",
    h: "32rem",
    badge: "SUNDAY",
    vAlign: "bottom",
    offset: "6rem",
  },
  {
    kind: "img",
    src: IMG.halfzip,
    label: "Miles Together",
    w: "24rem",
    h: "24rem",
    vAlign: "top",
    offset: "6rem",
  },
  {
    kind: "quote",
    text: "Kigali, one step at a time. Every single Sunday.",
    w: "26rem",
    dark: true,
    vAlign: "bottom",
    offset: "8rem",
  },
  {
    kind: "img",
    src: IMG.vest,
    label: "Vision Run Club",
    w: "22rem",
    h: "28rem",
    vAlign: "bottom",
    offset: "3rem",
  },
  {
    kind: "img",
    src: IMG.tee,
    label: "Move With Us",
    w: "24rem",
    h: "28rem",
    vAlign: "top",
    offset: "4rem",
  },
];

function itemStyle(vAlign: string, offset: string): React.CSSProperties {
  if (vAlign === "top") return { alignSelf: "flex-start", marginTop: offset };
  if (vAlign === "bottom") return { alignSelf: "flex-end", marginBottom: offset };
  return { alignSelf: "center" };
}

export function HorizontalGallery() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let cleanup = () => {};

    (async () => {
      const [{ default: gsap }, st] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(st.default);

      const ctx = gsap.context(() => {
        const distance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            pin: true,
            scrub: 0.4,
            end: () => "+=" + distance(),
            invalidateOnRefresh: true,
          },
        });

        gsap.to(wrap, {
          backgroundColor: "#050505",
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: true,
          },
        });
      }, wrap);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, []);

  return (
    <section
      ref={wrapRef}
      className="relative h-screen overflow-hidden bg-[#141414] text-white"
    >
      {/* dimmed photo backdrop so the empty areas aren't blank black */}
      <img
        src={IMG.gallery}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover opacity-20 blur-[2px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* section label */}
      <div className="pointer-events-none absolute left-5 top-8 z-10 md:left-8">
        <p className="tech text-white/50">In Motion</p>
        <p className="display mt-1 text-2xl md:text-3xl">Moments from the crew</p>
      </div>

      {/* horizontal track */}
      <div
        ref={trackRef}
        className="flex h-full items-center gap-10 pl-[10vw] pr-[6vw] will-change-transform"
      >
        {items.map((it, i) =>
          it.kind === "img" ? (
            <figure
              key={i}
              className="relative shrink-0 overflow-hidden rounded-2xl"
              style={{
                width: it.w,
                height: it.h,
                ...itemStyle(it.vAlign, it.offset),
              }}
            >
              <img src={it.src} alt={it.label} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
              <figcaption className="tech absolute inset-x-3 bottom-3 flex items-center justify-between text-[0.6rem] text-white">
                <span>{it.label}</span>
                {it.badge && (
                  <span className="rounded-full bg-[#d98b86] px-2 py-0.5 font-bold text-[#0a0a0a]">
                    {it.badge}
                  </span>
                )}
              </figcaption>
            </figure>
          ) : (
            <div
              key={i}
              className="shrink-0"
              style={{ width: it.w, ...itemStyle(it.vAlign, it.offset) }}
            >
              <p
                className={`display text-[1.9rem] leading-[1.1] ${
                  it.dark ? "text-[#d98b86]" : "text-white"
                }`}
              >
                {it.text}
              </p>
              <svg
                viewBox="0 0 180 40"
                className="mt-4 h-8 w-auto text-[#d98b86]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M5 30 C 25 5, 55 5, 75 25 S 130 5, 175 20" />
              </svg>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
