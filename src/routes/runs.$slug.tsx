import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SlideInLeft } from "@/components/slide-in-left";
import { ScrollFillText } from "@/components/scroll-fill-text";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";
const INSTAGRAM = "https://instagram.com/vision.runclub";

const P = {
  a: "/photos/SnapInsta.to_749665105_18037222907815520_6383458047242768862_n.jpg",
  b: "/photos/SnapInsta.to_748985982_18037222781815520_1887800587334956759_n.jpg",
  c: "/photos/SnapInsta.to_748070875_18037222835815520_1503705550880001620_n.jpg",
  d: "/photos/SnapInsta.to_749567025_18037222802815520_4849214195941431927_n.jpg",
  e: "/photos/SnapInsta.to_729540015_18035340809815520_4338465274389984729_n.jpg",
  f: "/photos/SnapInsta.to_730182773_18035340857815520_1122172522890161717_n.jpg",
  g: "/photos/SnapInsta.to_731093748_18035341016815520_3372942038985659629_n.jpg",
};

type Run = {
  slug: string;
  name: string;
  date: string;
  time: string;
  distance: string;
  meeting: string;
  overview: string;
  hero: string;
  formatImg: string;
};

const RUNS: Record<string, Run> = {
  "city-run": {
    slug: "city-run",
    name: "City Run",
    date: "02.08.",
    time: "06:30",
    distance: "5.00 KM",
    meeting: "Car Free Zone, Kigali",
    overview:
      "One pace, one community. Join the Vision Run Club crew for an easy, social 5km through the heart of Kigali before the city wakes — all paces welcome.",
    hero: P.a,
    formatImg: P.b,
  },
  "long-run": {
    slug: "long-run",
    name: "Long Run",
    date: "09.08.",
    time: "06:30",
    distance: "7.50 KM",
    meeting: "Kigali Convention Centre",
    overview:
      "Go a little further. A 7.5km loop from the Convention Centre at a relaxed, conversational pace — built for connection and a clearer head by the finish.",
    hero: P.c,
    formatImg: P.d,
  },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "Who can join the runs?",
    a: "Everyone. All paces and abilities are welcome — from first-timers to seasoned runners. There is no membership and no qualifying time; just show up and move with us.",
  },
  {
    q: "Do I need to register?",
    a: "Yes — please register through the form so we can share the exact meeting point, route details, and session reminders with you before each Sunday.",
  },
  {
    q: "What should I bring?",
    a: "Running shoes, water, and a good attitude. Arrive about 10 minutes early for introductions and a short warm-up before we set off together.",
  },
];

const GALLERY = [P.e, P.f, P.g, P.b];

export const Route = createFileRoute("/runs/$slug")({
  head: ({ params }) => {
    const run = RUNS[params.slug] ?? RUNS["city-run"];
    return {
      meta: [
        { title: `Vision Run Club — ${run.name} | Kigali, Rwanda` },
        {
          name: "description",
          content: `${run.name} with Vision Run Club — ${run.distance}, Sundays ${run.time} from ${run.meeting}, Kigali. All paces welcome.`,
        },
      ],
    };
  },
  component: RunDetail,
});

function gcalUrl(run: Run) {
  const d = new Date();
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7));
  // 06:30 Kigali (UTC+2) -> 04:30 UTC
  const start = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 4, 30, 0));
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const fmt = (x: Date) => x.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Vision Run Club — ${run.name}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${run.name} (${run.distance}) with Vision Run Club. Register: ${REGISTER}`,
    location: `${run.meeting}, Kigali, Rwanda`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function RunDetail() {
  const { slug } = useParams({ from: "/runs/$slug" });
  const run = RUNS[slug] ?? RUNS["city-run"];
  const others = Object.values(RUNS).filter((r) => r.slug !== run.slug);

  return (
    <main className="overflow-x-clip bg-background text-foreground">
      <SmoothScroll />
      <SiteHeader />

      {/* hero */}
      <section className="relative flex h-screen min-h-[640px] w-full flex-col justify-end overflow-hidden">
        <img src={run.hero} alt={`${run.name} — Vision Run Club`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/30" />

        {/* info bar */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-8">
          <div className="flex flex-col gap-6 border-y border-white/15 py-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
              <span className="display text-2xl md:text-3xl">{run.date}</span>
              <span className="display text-2xl md:text-3xl">
                {run.name} <span className="script text-accent">Run</span>
              </span>
              <span className="display flex items-center gap-2 text-2xl md:text-3xl">
                <span className="text-accent">◈</span> {run.distance}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={REGISTER} target="_blank" rel="noreferrer" className="snap-btn">
                Register
              </a>
              <a href={gcalUrl(run)} target="_blank" rel="noreferrer" className="snap-ghost">
                Add to Calendar
              </a>
            </div>
          </div>
        </div>

        {/* small mark + giant name marquee */}
        <div className="relative z-10 mx-auto mt-6 w-full max-w-[1400px] px-5 md:px-8">
          <p className="script text-xl text-white/70 md:text-2xl">
            Vision Run <span className="text-accent">Club</span>
          </p>
        </div>
        <div className="relative z-10 overflow-hidden pb-6 pt-2">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center gap-10 pr-10">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="display whitespace-nowrap text-[18vw] leading-none md:text-[13vw]">
                    {run.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* overview */}
      <section id="overview" className="bg-background px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[1fr_2fr] md:items-start">
          <p className="tech text-white/50">Overview</p>
          <div>
            <ScrollFillText
              as="h2"
              className="text-3xl font-medium leading-tight tracking-tight md:text-5xl"
              text={run.overview}
            />
            <p className="mt-6 text-2xl font-medium leading-tight tracking-tight text-white/35 md:text-3xl">
              Clarity comes with motion — this is your{" "}
              <span className="script text-accent">Sunday</span>.
            </p>
            <a href={REGISTER} target="_blank" rel="noreferrer" className="snap-btn mt-10 inline-flex">
              Register to Join
            </a>
          </div>
        </div>

        {/* details row */}
        <div id="details" className="mx-auto mt-20 grid max-w-[1400px] grid-cols-2 gap-8 border-t border-border pt-10 md:grid-cols-4">
          {[
            ["Meeting point", run.meeting],
            ["Date", `${run.date} — Sunday`],
            ["Time", run.time],
            ["Distance", run.distance],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="tech text-white/50">{label}:</p>
              <p className="mt-2 text-lg font-medium md:text-xl">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* format & schedule */}
      <section className="bg-background px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2 md:items-center">
          <div className="aspect-4/5 overflow-hidden rounded-2xl md:aspect-square">
            <img src={run.formatImg} alt={`${run.name} route`} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="tech text-white/50">Format &amp; Schedule</p>
            <h3 className="mt-5 text-2xl font-medium leading-snug tracking-tight md:text-3xl">
              We meet at {run.meeting} at {run.time} for quick introductions and a short warm-up before
              setting off together. The route covers {run.distance} at a relaxed, conversational pace —
              no one gets left behind. Afterwards we hang back for a cool-down and coffee. Expect to
              finish around 07:45.
            </h3>
            <p className="tech mt-6 text-white/50">— The Vision Run Club crew · Kigali</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SlideInLeft distance={220}>
            <h2 className="display text-[16vw] leading-none md:text-[8vw]">Questions?</h2>
          </SlideInLeft>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {FAQ.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* moments gallery */}
      <section className="bg-background px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="tech text-white/50">In Motion</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-5xl">Moments from the crew</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {GALLERY.map((src, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl ${i % 3 === 0 ? "aspect-4/5" : "aspect-square"}`}
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* other runs */}
      <section id="calendar" className="bg-background px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="display text-[16vw] leading-none md:text-[8vw]">More Runs</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {others.map((r) => (
              <Link
                key={r.slug}
                to="/runs/$slug"
                params={{ slug: r.slug }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.05]"
              >
                <p className="tech text-white/50">{r.date} — Sunday {r.time}</p>
                <h3 className="display mt-4 text-5xl md:text-6xl">{r.name}</h3>
                <div className="mt-8 flex items-center justify-between text-sm">
                  <span className="text-white/60">{r.meeting}</span>
                  <span className="text-accent transition-transform group-hover:translate-x-1">
                    View details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="text-xl font-medium md:text-2xl">{q}</span>
        <span className={`text-2xl text-accent transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-out ${open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl text-white/70">{a}</p>
        </div>
      </div>
    </div>
  );
}
