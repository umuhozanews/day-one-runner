import { useEffect, useRef } from "react";

/**
 * Scroll parallax: the content drifts vertically at a different rate than the
 * page as it passes through the viewport, scrubbed to the scroll. Positive
 * `speed` makes the text lag (move slower/downward); higher values = stronger.
 * Wired to the global Lenis + ScrollTrigger setup.
 */
export function Parallax({
  children,
  className = "",
  speed = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
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

      const shift = speed * 100;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { yPercent: shift },
          {
            yPercent: -shift,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      }, el);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
