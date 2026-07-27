import { useEffect } from "react";

/**
 * Global Lenis smooth scrolling, wired into GSAP's ticker so ScrollTrigger
 * stays in sync with the smoothed scroll position.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup = () => {};

    (async () => {
      const [{ default: Lenis }, { default: gsap }, st] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const ScrollTrigger = st.default;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const ticker = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(ticker);
        lenis.destroy();
      };
    })();

    return () => cleanup();
  }, []);

  return null;
}
