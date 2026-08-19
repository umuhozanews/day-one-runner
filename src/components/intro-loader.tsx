import { useEffect, useRef, useState } from "react";

/**
 * Opening preloader curtain:
 * Pitch black background with animated logo centerpiece, featuring 3D entrance,
 * mouse depth tracking, and curtain wipe reveal.
 */
export function IntroLoader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      return;
    }

    window.scrollTo(0, 0);
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    let cleanup = () => {};

    (async () => {
      const { default: gsap } = await import("gsap");

      const ctx = gsap.context(() => {
        const finish = () => {
          html.style.overflow = prevOverflow;
          setDone(true);
        };

        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });

        tl.set(".intro-logo", { scale: 0.45, opacity: 0, y: 40, rotate: -15 });
        tl.set(".intro-sub", { opacity: 0, y: 18 });
        tl.set(".intro-bar", { scaleX: 0, transformOrigin: "center center" });

        // Smooth spring entrance of logo centerpiece
        tl.to(
          ".intro-logo",
          { scale: 1, opacity: 1, y: 0, rotate: 0, duration: 1.25, ease: "back.out(1.8)" },
          0.15,
        );
        tl.to(".intro-sub", { opacity: 1, y: 0, duration: 0.7 }, 0.75);
        tl.to(".intro-bar", { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0.45);

        // Hold frame to show logo
        tl.to({}, { duration: 0.7 });

        // Exit parallax animation: logo lifts and scales off as curtain wipes up
        tl.to(".intro-logo", { scale: 1.3, opacity: 0, y: -70, duration: 0.7, ease: "power3.in" }, ">-0.1");
        tl.to(".intro-sub", { opacity: 0, y: -30, duration: 0.4 }, "<");
        tl.to(".intro-bar", { scaleX: 0, duration: 0.4 }, "<");
        tl.to(
          ".intro-panel",
          { yPercent: -100, duration: 1.1, ease: "power4.inOut" },
          ">-0.2",
        );
      }, rootRef);

      // Interactive 3D mouse tracking parallax on the logo centerpiece
      const handleMouseMove = (e: MouseEvent) => {
        if (!logoGroupRef.current) return;
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;

        const logo = rootRef.current?.querySelector<HTMLElement>(".intro-logo");
        if (logo) {
          gsap.to(logo, {
            x: x * 40,
            y: y * 40,
            rotateX: -y * 18,
            rotateY: x * 18,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      cleanup = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        ctx.revert();
      };
    })();

    return () => {
      cleanup();
      html.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[200]">
      <div className="intro-panel relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black text-white">
        <div
          ref={logoGroupRef}
          className="relative z-10 flex flex-col items-center px-6 text-center [perspective:1000px]"
        >
          {/* Animated Logo Centerpiece */}
          <div className="intro-logo inline-block">
            <img
              src="/logo.png"
              alt="Vision Run Club Logo"
              className="h-24 w-auto object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.35)] sm:h-36 md:h-48"
            />
          </div>

          <p className="intro-sub tech mt-6 sm:mt-8 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-white/70">
            KIGALI · EVERY SUNDAY · 06:30
          </p>
          <div className="intro-bar mt-4 sm:mt-6 h-[2px] w-28 bg-white/80 sm:w-36 md:w-52" />
        </div>
      </div>
    </div>
  );
}



