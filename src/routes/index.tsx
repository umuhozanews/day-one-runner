import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroRun from "@/assets/hero-run.jpg";
import shoeImg from "@/assets/shoe.jpg";
import communityImg from "@/assets/community.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "day one® — Every Day Is Day One | Berlin Run Club" },
      {
        name: "description",
        content:
          "day one® is a Berlin-born run club. Pre-dawn miles, weekly city sessions across Germany, and technical gear built for the next first step.",
      },
      { property: "og:title", content: "day one® — Every Day Is Day One" },
      {
        property: "og:description",
        content:
          "Pre-dawn miles, weekly sessions across Germany, and technical gear built for the next first step.",
      },
    ],
  }),
  component: DayOne,
});

/* ---------- heartbeat scroll reveal ---------- */
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
      { threshold: 0.18 },
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

/* ---------- parallax ---------- */
function useParallax<T extends HTMLElement>(speed = 0.2) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-mid * speed).toFixed(2)}px, 0) scale(${1 + Math.abs(speed) * 0.9})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return ref;
}

/* Mask reveal: line slides up from behind an overflow clip */
function MaskLine({
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
    <div ref={ref} data-in={inView ? "true" : "false"} className={`mask-line ${className}`}>
      <span className="mask-inner" style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </span>
    </div>
  );
}

/* Intro curtain */
function Intro() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 2200);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div className="intro-curtain" aria-hidden="true">
      <span className="intro-word display text-6xl md:text-8xl">one day</span>
    </div>
  );
}

/* Scroll progress bar */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setP(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full bg-primary"
        style={{ width: `${p * 100}%`, transition: "width 90ms linear" }}
      />
    </div>
  );
}

/* ---------- data ---------- */
const RUNS = [
  {
    city: "Berlin",
    session: "Dawn Patrol",
    day: "MON",
    time: "05:45",
    dist: "10.4 KM",
    pace: "4:52 /KM",
    coord: "52.5163° N, 13.3777° E",
    spots: "18 / 40",
  },
  {
    city: "Hamburg",
    session: "Harbour Intervals",
    day: "TUE",
    time: "19:15",
    dist: "8.0 KM",
    pace: "4:10 /KM",
    coord: "53.5461° N, 9.9661° E",
    spots: "07 / 30",
  },
  {
    city: "Leipzig",
    session: "Canal Long Run",
    day: "THU",
    time: "06:30",
    dist: "16.2 KM",
    pace: "5:20 /KM",
    coord: "51.3397° N, 12.3731° E",
    spots: "22 / 35",
  },
  {
    city: "Munich",
    session: "Isar Tempo",
    day: "SAT",
    time: "08:00",
    dist: "12.8 KM",
    pace: "4:35 /KM",
    coord: "48.1351° N, 11.5820° E",
    spots: "31 / 50",
  },
  {
    city: "Cologne",
    session: "Bridge Repeats",
    day: "SUN",
    time: "07:15",
    dist: "9.6 KM",
    pace: "4:44 /KM",
    coord: "50.9375° N, 6.9603° E",
    spots: "12 / 25",
  },
];

const SPECS = [
  ["STACK HEIGHT", "38.0 MM"],
  ["DROP", "6.0 MM"],
  ["WEIGHT", "218 G"],
  ["ENERGY RETURN", "84.2 %"],
  ["OUTSOLE", "VULCAN RUBBER"],
  ["PLATE", "CARBON / FULL"],
];

/* ---------- route SVG that draws on scroll ---------- */
function RouteDraw() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height + window.innerHeight;
      const seen = window.innerHeight - r.top;
      setP(Math.min(1, Math.max(0, seen / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const d =
    "M20 260 C 90 250, 110 150, 180 148 C 250 146, 262 214, 330 216 C 402 218, 420 96, 494 92 C 560 88, 580 168, 648 168 C 716 168, 730 60, 800 56 C 858 53, 880 120, 940 124";

  return (
    <div ref={wrapRef} className="relative border border-border bg-card/40 p-6 md:p-10">
      <div className="tech mb-6 flex flex-wrap justify-between gap-3 text-muted-foreground">
        <span>ROUTE / BERLIN-MITTE LOOP</span>
        <span className="text-primary">ELEV +142 M</span>
        <span>{(p * 10.4).toFixed(2)} KM LOGGED</span>
      </div>
      <svg viewBox="0 0 960 300" className="h-auto w-full" role="img" aria-label="Run route profile">
        <g stroke="currentColor" className="text-border" strokeWidth="1">
          {[60, 120, 180, 240].map((y) => (
            <line key={y} x1="0" y1={y} x2="960" y2={y} />
          ))}
        </g>
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          className="text-border"
          strokeWidth="2"
          strokeDasharray="4 8"
        />
        <path
          d={d}
          fill="none"
          stroke="var(--hivis)"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - p}
        />
        {[
          [20, 260],
          [330, 216],
          [648, 168],
          [940, 124],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="6"
            fill="var(--onyx)"
            stroke="#fff"
            strokeWidth="2"
            opacity={p > i / 4 ? 1 : 0.2}
          />
        ))}
      </svg>
      <div className="tech mt-6 grid grid-cols-2 gap-4 text-muted-foreground md:grid-cols-4">
        {["KM 00 — START", "KM 03 — TIERGARTEN", "KM 07 — SPREE", "KM 10 — FINISH"].map((s, i) => (
          <span key={s} className={p > i / 4 ? "text-foreground" : ""}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Image inside a clipped frame that drifts on scroll */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useParallax<HTMLImageElement>(0.08);
  return (
    <div className="relative aspect-4/3 w-full overflow-hidden">
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={1200}
        height={912}
        loading="lazy"
        className="bw parallax-media absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}


function DayOne() {
  const heroRef = useParallax<HTMLImageElement>(0.18);
  return (
    <main className="overflow-x-hidden">
      <Intro />
      <ScrollProgress />
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <a href="#top" className="display text-3xl">
            day one<span className="text-primary">®</span>
          </a>
          <nav className="tech hidden gap-8 text-muted-foreground md:flex">
            <a className="spread-link hover:text-primary" href="#pulse">
              Runs
            </a>
            <a className="spread-link hover:text-primary" href="#core">
              Gear
            </a>
            <a className="spread-link hover:text-primary" href="#belief">
              Belief
            </a>
          </nav>
          <a href="#pulse" className="tech spread-link border border-border px-4 py-2 hover:border-primary hover:text-primary">
            JOIN
          </a>
        </div>
      </header>

      {/* HERO — THE STARTING LINE */}
      <section id="top" className="haze grain relative flex min-h-screen items-end overflow-hidden">
        <img
          ref={heroRef}
          src={heroRun}
          alt="Runners moving through a Berlin street before dawn"
          width={1600}
          height={1104}
          className="bw parallax-media absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/70" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32">
          <div className="tech mb-6 flex flex-wrap gap-6 text-primary">
            <span>EST. 2019 — BERLIN</span>
            <span className="text-muted-foreground">52.5200° N, 13.4050° E</span>
            <span className="text-muted-foreground">05:45 CET / 4°C</span>
          </div>
          <h1 className="display text-[17vw] leading-[0.9] md:text-[13vw]">
            <MaskLine delay={0}>Every day</MaskLine>
            <MaskLine delay={120}>
              is <span className="text-primary">day one</span>
            </MaskLine>
          </h1>
          <div className="mt-10 flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              No PB carries over. No mileage banks. A run club built on the only thing that
              counts — the next first step, taken together, in the dark.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="#pulse" className="snap-btn">
                Find a run
              </a>
              <a href="#belief" className="snap-ghost">
                The belief
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-border bg-primary py-3">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="display flex shrink-0 gap-10 pr-10 text-3xl">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="flex items-center gap-10 whitespace-nowrap">
                  START AGAIN <span className="text-xl">◆</span> ZERO EXCUSES{" "}
                  <span className="text-xl">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* COMMUNITY PULSE */}
      <section id="pulse" className="mx-auto max-w-7xl px-5 py-24 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
            <h2 className="display text-6xl md:text-8xl">
              The community
              <br />
              <span className="text-primary">pulse</span>
            </h2>
            <p className="tech max-w-xs text-muted-foreground">
              LIVE SCHEDULE / 14 CITIES / GERMANY / ALL PACES WELCOME
            </p>
          </div>
        </Reveal>

        <div className="mt-2">
          {RUNS.map((r, i) => (
            <Reveal key={r.city} delay={i * 70}>
              <article className="group grid grid-cols-2 items-center gap-4 border-b border-border py-7 transition-colors hover:bg-card md:grid-cols-12">
                <div className="tech text-primary md:col-span-1">{r.day}</div>
                <div className="md:col-span-3">
                  <h3 className="display text-4xl transition-transform duration-150 group-hover:translate-x-2">
                    {r.city}
                  </h3>
                  <p className="tech mt-1 text-muted-foreground">{r.session}</p>
                </div>
                <div className="tech md:col-span-2">{r.time}</div>
                <div className="tech md:col-span-2">{r.dist}</div>
                <div className="tech md:col-span-2">{r.pace}</div>
                <div className="tech text-muted-foreground md:col-span-2">
                  {r.coord}
                  <div className="mt-2 h-px w-full bg-border">
                    <div
                      className="h-px bg-primary"
                      style={{
                        width: `${(parseInt(r.spots) / parseInt(r.spots.split("/")[1])) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="mt-1 block">{r.spots} SPOTS</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-16 grid gap-10 md:grid-cols-2 md:items-center">
            <ParallaxImage src={communityImg} alt="Runner tying laces on a curb at dawn" />

            <div>
              <p className="tech text-primary">CREW REPORT / Q3</p>
              <div className="mt-6 grid grid-cols-3 gap-6">
                {[
                  ["4,812", "MEMBERS"],
                  ["61,940", "KM LOGGED"],
                  ["14", "CITIES"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="display text-5xl">{n}</div>
                    <div className="tech mt-2 text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
              <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
                Show up once and you're in. No membership, no qualifying time — just a meeting
                point, a pace group, and the same street at the same hour every week.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ROUTE DRAW */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <Reveal>
          <RouteDraw />
        </Reveal>
      </section>

      {/* PERFORMANCE CORE */}
      <section id="core" className="border-y border-border bg-card/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:py-32">
          <Reveal>
            <div className="haze relative">
              <img
                src={shoeImg}
                alt="day one® technical running shoe on asphalt"
                width={1200}
                height={1200}
                loading="lazy"
                className="bw w-full object-cover"
              />
              <span className="tech absolute left-4 top-4 bg-primary px-3 py-1">DROP 01</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <p className="tech text-primary">PERFORMANCE CORE</p>
              <h2 className="display mt-4 text-6xl md:text-7xl">
                The 05:45
                <br />
                Racer
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                Built for cold asphalt and unlit corners. A full-length plate under a
                high-rebound foam core, wrapped in a woven upper that drains and dries between
                sessions.
              </p>
              <dl className="mt-10 border-t border-border">
                {SPECS.map(([k, v]) => (
                  <div
                    key={k}
                    className="tech flex items-center justify-between border-b border-border py-3"
                  >
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-base tracking-normal text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
              <a href="#belief" className="snap-btn mt-10">
                Spec sheet
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE BELIEF */}
      <section id="belief" className="grain relative mx-auto max-w-7xl overflow-hidden px-5 py-28 md:py-40">
        <div className="space-y-2">
          {[
            { t: "You are not", c: "" },
            { t: "your last", c: "text-muted-foreground" },
            { t: "personal best.", c: "text-primary" },
          ].map((l, i) => (
            <h2 key={l.t} className={`display text-[12vw] leading-[0.95] ${l.c}`}>
              <MaskLine delay={i * 110}>{l.t}</MaskLine>
            </h2>
          ))}
        </div>


        <div className="mt-20 grid gap-10 border-t border-border pt-12 md:grid-cols-3">
          {[
            [
              "01 / RESET",
              "Yesterday's split is data, not identity. Every session starts from zero.",
            ],
            [
              "02 / SHOW UP",
              "The hardest kilometre is the one from your door. We run it with you.",
            ],
            [
              "03 / REPEAT",
              "Consistency beats intensity. One day, then one day, then one day again.",
            ],
          ].map(([h, b], i) => (
            <Reveal key={h} delay={i * 90}>
              <div>
                <p className="tech text-primary">{h}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-20 flex flex-wrap items-center gap-6">
            <a href="#pulse" className="snap-btn">
              Start your day one
            </a>
            <span className="tech text-muted-foreground">NEXT SESSION IN 06:12:44</span>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8 px-5 py-12">
          <div className="display text-7xl md:text-9xl">
            day one<span className="text-primary">®</span>
          </div>
          <div className="tech space-y-2 text-muted-foreground">
            <p>BERLIN — HAMBURG — LEIPZIG — MUNICH — COLOGNE</p>
            <p>© {new Date().getFullYear()} DAY ONE RUN CLUB</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
