import { useState } from "react";
import { Link } from "@tanstack/react-router";

export type RunPanel = {
  date: string;
  time: string;
  title: string;
  desc: string;
  start: string;
  dist: string;
  register: string;
  imgL: string;
  imgR: string;
  slug?: string;
};

/**
 * RunsSection / RunsReveal:
 * Features real, crisp, unblurred photography of Vision Run Club runners
 * with the exact titles, descriptions, and formats matching the club review.
 * Features an interactive featured showcase plus a multi-card gallery of all 5 runs.
 */
export function RunsReveal({ runs }: { runs: RunPanel[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeRun = runs[activeIdx] ?? runs[0];

  return (
    <section id="runs" className="relative bg-background border-t border-border">
      {/* Header & Tab Selector */}
      <div className="mx-auto max-w-[1400px] px-4 pt-16 sm:px-6 sm:pt-24 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-border">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#ff0000]" />
              <span className="tech text-[#ff0000] text-xs uppercase tracking-widest font-bold">
                Weekly Club Formats
              </span>
            </div>
            <h2 className="display mt-2 text-4xl sm:text-6xl md:text-8xl tracking-tight">RUNS</h2>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
              Every Sunday morning at 06:30 AM at Rubia Café, Kimihurura. All paces and fitness levels welcome.
            </p>
          </div>

          {/* Quick tab switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {runs.map((r, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeIdx === i
                    ? "bg-[#ff0000] text-white shadow-lg scale-105"
                    : "bg-card text-white/70 hover:text-white hover:bg-white/10 border border-border"
                }`}
              >
                {r.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Run Showcase with Real Crisp Unblurred Photos */}
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12 md:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-card/70 md:grid-cols-12 shadow-2xl transition-all duration-300">
          {/* Real Photo Column — completely sharp and unblurred */}
          <div className="relative aspect-4/3 md:aspect-auto md:col-span-6 overflow-hidden bg-black/40">
            <img
              src={activeRun.imgL}
              alt={`${activeRun.title} - Vision Run Club Kigali`}
              className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
            />
            {/* Real photo overlay badges */}
            <div className="absolute top-4 left-4 rounded-full bg-black/80 px-3.5 py-1 text-xs font-mono text-white backdrop-blur-md border border-white/20">
              {activeRun.dist} · Sunday {activeRun.time}
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/75 p-3 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs text-white">
              <span>📍 {activeRun.start}</span>
              <span className="tech text-[#ff0000] text-[0.65rem] uppercase">Real Runner Moments</span>
            </div>
          </div>

          {/* Content Column */}
          <div className="flex flex-col justify-between p-6 sm:p-10 md:p-12 md:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="tech text-[#ff0000] text-xs uppercase tracking-wider">
                  Session 0{activeIdx + 1} of 0{runs.length}
                </span>
                <span className="tech text-xs text-white/40">Kigali · Rwanda</span>
              </div>

              <h3 className="display mt-3 text-3xl sm:text-5xl md:text-6xl text-white leading-tight">
                {activeRun.title}
              </h3>

              {/* Exact Description from Review Specification */}
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-normal">
                {activeRun.desc}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                <div>
                  <p className="tech text-xs text-white/50">Meeting Location</p>
                  <p className="mt-1 text-sm font-semibold text-white">{activeRun.start}</p>
                </div>
                <div>
                  <p className="tech text-xs text-white/50">Distance</p>
                  <p className="mt-1 text-sm font-semibold text-white">{activeRun.dist}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <a
                href={activeRun.register}
                target="_blank"
                rel="noreferrer"
                className="snap-btn text-xs sm:text-sm px-6 py-3 text-center"
              >
                Register for this Run ↗
              </a>
              <Link
                to="/runs/$slug"
                params={{ slug: activeRun.slug ?? activeRun.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") }}
                className="snap-ghost text-xs sm:text-sm px-5 py-3 text-center"
              >
                View Full Details →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of All 5 Runs with Real Photos */}
      <div className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6 sm:pb-24 md:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-t border-border/80 pt-10">
          <span className="tech text-xs text-white/60">
            Browse All 5 Formats · Real Club Photography
          </span>
          <span className="tech text-xs text-[#ff0000]">
            Click any run to view details above
          </span>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {runs.map((r, i) => (
            <div
              key={i}
              onClick={() => {
                setActiveIdx(i);
                const el = document.getElementById("runs");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 flex flex-col group ${
                activeIdx === i
                  ? "border-[#ff0000] bg-card shadow-xl ring-2 ring-[#ff0000]/60 scale-[1.02]"
                  : "border-border bg-card/50 hover:border-white/30 hover:bg-card/90"
              }`}
            >
              {/* Real crisp photo */}
              <div className="aspect-4/3 overflow-hidden relative bg-black/40">
                <img
                  src={r.imgL}
                  alt={r.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 right-2.5 rounded-full bg-black/80 px-2 py-0.5 text-[0.65rem] font-mono text-white border border-white/10">
                  {r.dist}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="display text-lg sm:text-xl text-white group-hover:text-[#ff0000] transition-colors">
                    {r.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-white/75 leading-relaxed line-clamp-3">
                    {r.desc}
                  </p>
                </div>

                <div className="border-t border-border/60 pt-2.5 flex items-center justify-between text-[0.7rem]">
                  <span className="text-white/50">{r.dist}</span>
                  <span className="text-[#ff0000] font-medium">Select ↑</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
