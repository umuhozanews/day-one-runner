import { useEffect, useRef } from "react";

export type RunPanel = {
  date: string;
  time: string;
  title: string;
  start: string;
  dist: string;
  register: string;
  imgL: string;
  imgR: string;
};

/**
 * Pinned, full-screen "project reveal" sequence (inspired by glitch&grit):
 * each run is a split two-column image panel with a large title. Scrolling
 * wipes the next panel in — left column up, right column down — while the
 * content fades through. Works best with Lenis smooth scroll enabled.
 */
export function RunsReveal({ runs }: { runs: RunPanel[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    let cleanup = () => {};

    (async () => {
      const [{ default: gsap }, st] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const ScrollTrigger = st.default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(".rr-panel", stage);
        const n = panels.length;
        if (n === 0) return;

        panels.forEach((panel, i) => {
          const L = panel.querySelector(".rr-half-l");
          const R = panel.querySelector(".rr-half-r");
          const C = panel.querySelector(".rr-content");
          gsap.set(panel, { zIndex: i + 1 });
          if (i > 0) {
            gsap.set(L, { yPercent: 100 });
            gsap.set(R, { yPercent: -100 });
            gsap.set(C, { autoAlpha: 0, y: 60 });
          }
        });

        // reduced motion / single panel: no scroll-jacking
        if (n < 2) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => "+=" + window.innerHeight * (n - 1 + 0.6),
            scrub: 0.4,
            pin: stage,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        for (let i = 1; i < n; i++) {
          const prevC = panels[i - 1].querySelector(".rr-content");
          const L = panels[i].querySelector(".rr-half-l");
          const R = panels[i].querySelector(".rr-half-r");
          const C = panels[i].querySelector(".rr-content");
          const s = i - 1;
          tl.to(prevC, { autoAlpha: 0, y: -60, duration: 0.35 }, s + 0.05);
          tl.to([L, R], { yPercent: 0, duration: 0.6, ease: "power3.inOut" }, s + 0.1);
          tl.to(C, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, s + 0.45);
        }
        tl.to({}, { duration: 0.6 });
      }, wrap);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, [runs]);

  return (
    <section id="runs" ref={wrapRef} className="relative bg-background">
      <div ref={stageRef} className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden">
        {/* fixed section chrome */}
        <div className="pointer-events-none absolute left-4 top-16 z-[60] sm:left-6 sm:top-20 md:left-8 md:top-24">
          <p className="tech text-xs text-white/60">Upcoming Runs</p>
        </div>
        <div className="pointer-events-none absolute bottom-3 left-1/2 z-[60] -translate-x-1/2 sm:bottom-6">
          <p className="tech text-[0.65rem] text-white/40 tracking-widest">Scroll ↓</p>
        </div>

        {runs.map((r, i) => (
          <div key={i} className="rr-panel absolute inset-0">
            {/* split image columns */}
            <div className="absolute inset-0 grid grid-cols-2">
              <div className="rr-half-l relative h-full w-full overflow-hidden">
                <img src={r.imgL} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="rr-half-r relative h-full w-full overflow-hidden">
                <img src={r.imgR} alt="" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/60" />

            {/* content */}
            <div className="rr-content absolute inset-0 z-10 flex flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
              <span className="tech text-xs sm:text-sm text-accent">
                {r.date} — Sunday {r.time}
              </span>
              <h3 className="display mt-2 sm:mt-4 text-4xl sm:text-6xl md:text-7xl lg:text-[8vw] leading-[0.9]">
                {r.title}
              </h3>

              <div className="mt-4 sm:mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-10 sm:gap-y-4">
                <div>
                  <p className="tech text-[0.65rem] sm:text-xs text-white/50">Start</p>
                  <p className="mt-0.5 text-xs sm:text-sm font-medium">{r.start}</p>
                </div>
                <span className="hidden h-6 w-px bg-white/20 sm:block" />
                <div>
                  <p className="tech text-[0.65rem] sm:text-xs text-white/50">Distance</p>
                  <p className="mt-0.5 text-xs sm:text-sm font-medium">{r.dist}</p>
                </div>
              </div>

              <a
                href={r.register}
                target="_blank"
                rel="noreferrer"
                className="snap-btn mt-5 sm:mt-7 text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3"
              >
                Register for this Run
                <span aria-hidden>↗</span>
              </a>
              <p className="tech mt-4 text-[0.65rem] text-white/40">Vision Run Club · Kigali</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
