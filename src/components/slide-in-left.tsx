import { useEffect, useRef } from "react";

/**
 * Scroll-linked "slide in from the left" reveal (inspired by norfcre8ions.com).
 * The content starts offset to the left and translates to its resting position,
 * scrubbed to the scroll as it enters the viewport. Works with Lenis smooth
 * scroll (ScrollTrigger is kept in sync globally by <SmoothScroll />).
 */
export function SlideInLeft({
  children,
  className = "",
  distance = 220,
  fade = true,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  fade?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup = () => {};

    (async () => {
      const [{ default: gsap }, st] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const ScrollTrigger = st.default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const actualDistance = Math.min(
          distance,
          typeof window !== "undefined" ? window.innerWidth * 0.25 : 80,
        );
        gsap.fromTo(
          el,
          { x: -actualDistance, autoAlpha: fade ? 0 : 1 },
          {
            x: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 45%",
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          },
        );
      }, el);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, [distance, fade]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
