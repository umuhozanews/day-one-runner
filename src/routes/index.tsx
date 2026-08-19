import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { RunsReveal, type RunPanel } from "@/components/runs-reveal";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ShineWordmark } from "@/components/shine-wordmark";
import { SlideInLeft } from "@/components/slide-in-left";
import { Parallax } from "@/components/parallax";
import { ScrollFillText } from "@/components/scroll-fill-text";
import { RouteLine } from "@/components/route-line";
import { GearUp } from "@/components/gear-up";
import { IntroLoader } from "@/components/intro-loader";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vision Run Club — Clarity Comes with Motion | Kigali, Rwanda" },
      {
        name: "description",
        content:
          "Vision Run Club is a community running crew based in Kigali, Rwanda. We run every Sunday at 06:30. Clarity comes with motion — register and join us.",
      },
      { property: "og:title", content: "Vision Run Club — Clarity Comes with Motion" },
      {
        property: "og:description",
        content:
          "A community running crew in Kigali, Rwanda. Sundays, 06:30. Clarity comes with motion.",
      },
    ],
  }),
  component: VisionRunClub,
});

/* ---------------- config ---------------- */
const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";
const INSTAGRAM = "https://instagram.com/vision.runclub";

/* ---------------- imagery ---------------- */
const CDN = "https://cdn.prod.website-files.com";
const A = {
  gallery: "/photos/SnapInsta.to_749665105_18037222907815520_6383458047242768862_n.jpg",
  mission1: "/photos/SnapInsta.to_748985982_18037222781815520_1887800587334956759_n.jpg",
  mission2: "/photos/SnapInsta.to_748070875_18037222835815520_1503705550880001620_n.jpg",
  heroPoster: "/photos/SnapInsta.to_749567025_18037222802815520_4849214195941431927_n.jpg",
  heroVideo: `${CDN}/6a01f769fb0d9bd286987755%2F6a070b5f1143849e34396535_1b9bf193512c46fda8e1fdfc43344378.HD-720p-4.5Mbps-34334206_mp4.mp4`,
};

/* ---------------- helpers ---------------- */
function nextSundays(count: number): { date: string; iso: string }[] {
  const out: { date: string; iso: string }[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7));
  for (let i = 0; i < count; i++) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    out.push({ date: `${dd}.${mm}.`, iso: d.toISOString() });
    d.setDate(d.getDate() + 7);
  }
  return out;
}

/* ---------------- scroll reveal ---------------- */
function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useReveal();
  return (
    <div
      ref={ref}
      data-in={inView ? "true" : "false"}
      style={{ animationDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------- data ---------------- */
const SUNDAYS = nextSundays(5);

const RUN_PANELS: RunPanel[] = [
  {
    date: SUNDAYS[0]?.date ?? "Sun.",
    time: "06:30",
    title: "City Run",
    start: "Car Free Zone, Kigali",
    dist: "5.00 KM",
    register: REGISTER,
    imgL: A.mission1,
    imgR: A.gallery,
  },
  {
    date: SUNDAYS[1]?.date ?? "Sun.",
    time: "06:30",
    title: "Long Run",
    start: "Kigali Convention Centre",
    dist: "7.50 KM",
    register: REGISTER,
    imgL: A.mission2,
    imgR: A.gallery,
  },
];

const CALENDAR = SUNDAYS.map((s, i) => ({
  city: i % 2 === 0 ? "City Run" : "Long Run",
  date: s.date,
  start: i % 2 === 0 ? "Car Free Zone, Kigali" : "Kigali Convention Centre",
  dist: i % 2 === 0 ? "5.00 KM" : "7.50 KM",
}));

/* ---------------- hero ---------------- */
function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-[100dvh] min-h-[580px] w-full flex-col justify-end overflow-hidden bg-background"
    >
      {/* animated gradient fallback behind the hero video */}
      <div className="absolute inset-0 hero-aurora" />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={A.heroPoster}
      >
        <source src={A.heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/40" />

      {/* self-drawing red route to the run (day1-run style) */}
      <RouteLine className="pointer-events-none absolute right-2 top-20 z-10 w-[44vw] max-w-[260px] opacity-90 sm:right-6 sm:top-24 sm:max-w-[380px] md:right-10 md:top-28 md:max-w-[540px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-16 sm:px-6 sm:pb-20 md:px-8 md:pb-28">
        <h1 className="display text-[13vw] leading-[0.88] sm:text-[12vw] md:text-[11vw]">
          Vision
          <br />
          <span className="text-[#ff0000]">Run</span> Club
        </h1>
        <div className="mt-8 flex flex-col gap-6 border-t border-border/80 pt-6 sm:mt-10 sm:pt-8 md:flex-row md:items-end md:justify-end">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a href={REGISTER} target="_blank" rel="noreferrer" className="snap-btn w-full sm:w-auto text-center">
              Register to Join
            </a>
            <a href="#runs" className="snap-ghost w-full sm:w-auto text-center">
              See the Runs
            </a>
          </div>
        </div>
      </div>

      {/* next run bar */}
      <div className="relative z-10 border-t border-border bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3 md:px-8">
          <div className="flex items-center gap-2.5 sm:gap-4">
            <span className="tech text-[0.6rem] text-white/60">Next Run</span>
            <span className="hidden h-2 w-2 rounded-full bg-accent sm:block" />
            <span className="text-xs sm:text-sm font-semibold">Sunday · 06:30</span>
            <span className="tech text-[0.65rem] text-white/60 hidden xs:inline">Kigali</span>
          </div>
          <a href={REGISTER} target="_blank" rel="noreferrer" className="snap-btn shrink-0 text-xs sm:text-sm px-3.5 py-1.5 sm:px-5 sm:py-2">
            Register
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- statement ---------------- */
function Statement() {
  return (
    <section className="relative bg-background px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24 md:px-8 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <SlideInLeft distance={220}>
          <h2 className="display text-[12vw] leading-[0.9] sm:text-[11vw] md:text-[9.5vw]">
            <span className="block">Clarity Comes</span>
            <span className="block text-white/20">with Motion.</span>
          </h2>
        </SlideInLeft>
        <Parallax speed={0.12}>
          <ScrollFillText
            className="mt-8 sm:mt-14 max-w-4xl text-xl sm:text-2xl md:text-4xl font-medium leading-snug tracking-tight"
            text="Every Sunday we meet before the city wakes and move together — all paces welcome. No membership, no qualifying time. Just the road, the crew, and a clearer head by the finish."
          />
        </Parallax>
      </div>
    </section>
  );
}

/* ---------------- ticker row (sliding photo strip) ---------------- */
const STRIP: { src: string; w: string; h: string }[] = [
  { src: "/photos/SnapInsta.to_749665105_18037222907815520_6383458047242768862_n.jpg", w: "w-[260px] sm:w-[360px] md:w-[460px]", h: "h-[180px] sm:h-[260px] md:h-[320px]" },
  { src: "/photos/SnapInsta.to_749132901_18037222934815520_9130006817627317066_n.jpg", w: "w-[200px] sm:w-[280px] md:w-[360px]", h: "h-[260px] sm:h-[380px] md:h-[480px]" },
  { src: "/photos/SnapInsta.to_748963427_18037222790815520_8609935234889006465_n.jpg", w: "w-[300px] sm:w-[440px] md:w-[580px]", h: "h-[190px] sm:h-[270px] md:h-[340px]" },
  { src: "/photos/SnapInsta.to_748883098_18037222844815520_7998156953861385740_n.jpg", w: "w-[220px] sm:w-[320px] md:w-[420px]", h: "h-[220px] sm:h-[320px] md:h-[420px]" },
  { src: "/photos/SnapInsta.to_748480837_18037222730815520_7938681683487494570_n.jpg", w: "w-[190px] sm:w-[260px] md:w-[340px]", h: "h-[240px] sm:h-[360px] md:h-[460px]" },
  { src: "/photos/SnapInsta.to_747723867_18037222760815520_64325537321140384_n.jpg", w: "w-[320px] sm:w-[480px] md:w-[640px]", h: "h-[200px] sm:h-[300px] md:h-[380px]" },
  { src: "/photos/SnapInsta.to_747669615_18037222853815520_9101248681248976266_n.jpg", w: "w-[220px] sm:w-[300px] md:w-[400px]", h: "h-[170px] sm:h-[240px] md:h-[300px]" },
  { src: "/photos/SnapInsta.to_747324727_18037222889815520_1976595068584931511_n.jpg", w: "w-[250px] sm:w-[360px] md:w-[480px]", h: "h-[200px] sm:h-[290px] md:h-[370px]" },
  { src: "/photos/SnapInsta.to_746878251_18037222814815520_8596717709867367410_n.jpg", w: "w-[280px] sm:w-[400px] md:w-[540px]", h: "h-[190px] sm:h-[280px] md:h-[350px]" },
  { src: "/photos/SnapInsta.to_746199001_18037222862815520_8006546965777207715_n.jpg", w: "w-[200px] sm:w-[280px] md:w-[380px]", h: "h-[240px] sm:h-[340px] md:h-[440px]" },
];

function TickerRow() {
  return (
    <div className="overflow-hidden border-y border-border bg-background py-6 sm:py-10">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center gap-3 sm:gap-6 pr-3 sm:pr-6">
            {STRIP.map((f, i) => (
              <div
                key={`${k}-${i}`}
                className={`${f.w} ${f.h} shrink-0 overflow-hidden rounded-xl sm:rounded-2xl bg-white/5`}
              >
                <img
                  src={f.src}
                  alt=""
                  aria-hidden={k === 1}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- calendar ---------------- */
function Calendar() {
  return (
    <section id="calendar" className="relative overflow-hidden bg-black">
      <img
        src={A.gallery}
        alt="Vision Run Club runners"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 md:px-8 md:py-32">
        <SlideInLeft distance={220}>
          <h2 className="display text-[15vw] leading-none sm:text-[12vw] md:text-[10vw]">Calendar</h2>
        </SlideInLeft>
        <p className="mt-4 sm:mt-6 max-w-md text-sm sm:text-base text-white/80">
          We run every Sunday at 06:30 in Kigali. Here are the upcoming sessions — all paces welcome.
        </p>

        <div className="hide-scrollbar mt-8 sm:mt-14 flex snap-x snap-mandatory gap-3 sm:gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CALENDAR.map((r, i) => (
            <article
              key={`${r.city}-${i}`}
              className="min-w-[260px] sm:min-w-[300px] max-w-[85vw] sm:max-w-[340px] flex-1 shrink-0 snap-start rounded-2xl border border-border bg-background/70 p-5 sm:p-6 backdrop-blur"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="display text-2xl sm:text-3xl">{r.city}</h3>
                  <p className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight text-white/40">
                    {r.date}
                  </p>
                </div>
                <a
                  href={REGISTER}
                  target="_blank"
                  rel="noreferrer"
                  className="snap-ghost shrink-0 px-3.5 py-1.5 text-xs sm:px-4 sm:py-2"
                >
                  Register
                </a>
              </div>
              {/* self-drawing red route to the meeting point (day1-run style) */}
              <RouteLine className="mt-4 sm:mt-6 w-full" duration={1.8} />
              <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4 border-t border-border pt-4">
                <div>
                  <p className="tech text-[0.65rem] text-white/50">Start:</p>
                  <p className="mt-1 text-xs">{r.start}</p>
                </div>
                <div>
                  <p className="tech text-[0.65rem] text-white/50">Distance:</p>
                  <p className="mt-1 text-xs">{r.dist}</p>
                </div>
              </div>
              <Link
                to="/runs/$slug"
                params={{ slug: r.city.toLowerCase().replace(/\s+/g, "-") }}
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent transition-transform hover:translate-x-1"
              >
                View details →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- mission ---------------- */
function Mission() {
  return (
    <section id="mission" className="bg-background px-4 py-16 sm:px-6 sm:py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-[1fr_2fr] md:items-start">
          <Parallax speed={0.25}>
            <p className="display text-4xl text-white/25 sm:text-5xl md:text-6xl">Our Mission</p>
          </Parallax>
          <Reveal>
            <h2 className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl md:text-5xl">
              Clarity comes with motion. We believe the road is where the mind clears — so we show up
              every Sunday, move together, and leave lighter than we came. Kigali, one step at a time.
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 sm:mt-16 grid gap-4 md:grid-cols-2">
          <div className="aspect-4/5 overflow-hidden rounded-2xl md:aspect-16/10">
            <img src={A.mission1} alt="Vision Run Club community" className="h-full w-full object-cover" />
          </div>
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl md:aspect-16/10">
            <img src={A.mission2} alt="Vision Run Club runner" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-1/2 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 rounded-2xl sm:rounded-full bg-black/75 p-3 sm:px-5 sm:py-3 backdrop-blur">
              <span className="text-xs sm:text-sm font-semibold text-center sm:text-left">
                Find your Sunday <span className="text-white/50">Vision Run Club</span>
              </span>
              <a
                href={REGISTER}
                target="_blank"
                rel="noreferrer"
                className="snap-btn w-full sm:w-auto px-4 py-1.5 text-xs text-center"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- community ---------------- */
function Community() {
  return (
    <section id="community" className="bg-background px-4 py-16 sm:px-6 sm:py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative text-center">
          <h2 className="display mx-auto max-w-4xl text-3xl leading-tight sm:text-4xl md:text-6xl">
            Join the movement. Run with a crew that shows up, every single Sunday.
          </h2>
          <p className="tech mt-4 sm:mt-6 text-xs sm:text-sm text-white/50">The Community</p>
        </div>

        <div className="mt-10 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a href={REGISTER} target="_blank" rel="noreferrer" className="snap-btn w-full sm:w-auto text-center">
            Register to Join
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="snap-ghost w-full sm:w-auto text-center">
            Follow @vision.runclub
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- final CTA ---------------- */
function FooterCTA() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-28 md:py-40">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center text-center">
        <h2 className="display pointer-events-none absolute top-12 sm:top-16 text-[22vw] leading-none text-white/[0.05] sm:text-[20vw] md:text-[16vw]">
          Ready?
        </h2>
        <div className="relative z-10">
          <ShineWordmark text="Vision Run Club" subtitle="Kigali · Rwanda" />
        </div>
        <p className="relative z-10 mt-4 sm:mt-6 text-base sm:text-lg text-white/70">Clarity comes with motion.</p>
        <a href={REGISTER} target="_blank" rel="noreferrer" className="snap-btn relative z-10 mt-8 sm:mt-10">
          Register to Join
        </a>
      </div>
    </section>
  );
}

function VisionRunClub() {
  return (
    <main className="overflow-x-clip bg-background">
      <IntroLoader />
      <SmoothScroll />
      <SiteHeader transparentOnTop />
      <Hero />
      <Statement />
      <TickerRow />
      <RunsReveal runs={RUN_PANELS} />
      <Calendar />
      <Mission />
      <GearUp />
      <Community />
      <FooterCTA />
      <SiteFooter />
    </main>
  );
}
