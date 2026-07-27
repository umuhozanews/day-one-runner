import { useEffect, useRef } from "react";

/**
 * Word-by-word color fill tied to scroll position (à la day1-run).
 * Each word scrubs from a dim base color to the accent red as the block
 * moves through the viewport.
 */
export function ScrollFillText({
  text,
  as: Tag = "p",
  className = "",
  from = "rgba(255,255,255,0.18)",
  to = "var(--hivis)",
  start = "top 82%",
  end = "bottom 55%",
}: {
  text: string;
  as?: "p" | "h2" | "h3";
  className?: string;
  from?: string;
  to?: string;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll<HTMLElement>(".fill-word").forEach((w) => {
        w.style.color = to;
      });
      return;
    }

    let cleanup = () => {};

    (async () => {
      const [{ default: gsap }, st] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const ScrollTrigger = st.default;
      gsap.registerPlugin(ScrollTrigger);

      const words = el.querySelectorAll<HTMLElement>(".fill-word");
      const ctx = gsap.context(() => {
        gsap.fromTo(
          words,
          { color: from },
          {
            color: to,
            ease: "none",
            stagger: 1,
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      }, el);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, [from, to, start, end]);

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((w, i) => (
        <span key={i} className="fill-word" style={{ color: from }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
