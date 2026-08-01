import { useEffect, useRef, useState } from "react";

/**
 * A hand-drawn running "route" that draws itself in when it scrolls into view —
 * modelled on day1-run's red self-drawing hero stroke (they animate it with GSAP
 * DrawSVG / data-stroke-anim). Here we do it dependency-free with an SVG
 * pathLength + stroke-dashoffset transition. Ends on a location pin, so it reads
 * like a GPS route to the run.
 */
export function RouteLine({
  className = "",
  color = "#ff0000",
  duration = 2.1,
}: {
  className?: string;
  color?: string;
  duration?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pinDelay = duration * 0.86;

  return (
    <svg
      ref={ref}
      viewBox="0 0 440 260"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* faint dashed "map" ghost of the full route */}
      <path
        d="M22 236 C 78 236 78 168 126 178 C 182 190 158 96 216 110 C 272 123 248 40 308 54 C 360 66 356 128 392 112"
        stroke={color}
        strokeOpacity="0.18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 9"
      />

      {/* the route that draws in */}
      <path
        pathLength={1}
        d="M22 236 C 78 236 78 168 126 178 C 182 190 158 96 216 110 C 272 123 248 40 308 54 C 360 66 356 128 392 112"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: inView ? 0 : 1,
          transition: `stroke-dashoffset ${duration}s cubic-bezier(0.65, 0, 0.35, 1)`,
        }}
      />

      {/* start dot */}
      <circle
        cx="22"
        cy="236"
        r="8"
        fill={color}
        style={{ opacity: inView ? 1 : 0, transition: "opacity 0.35s ease 0.1s" }}
      />

      {/* end location pin, drops in once the line finishes */}
      <g
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(-10px)",
          transformOrigin: "392px 112px",
          transition: `opacity 0.45s ease ${pinDelay}s, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${pinDelay}s`,
        }}
      >
        <path
          d="M392 84 C 376 84 367 96 367 108 C 367 124 392 146 392 146 C 392 146 417 124 417 108 C 417 96 408 84 392 84 Z"
          fill={color}
        />
        <circle cx="392" cy="107" r="8" fill="#ffffff" />
      </g>
    </svg>
  );
}
