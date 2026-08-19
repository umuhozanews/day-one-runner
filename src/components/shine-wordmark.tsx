import { useRef, useState } from "react";

/**
 * Big footer wordmark that "shines" (cursor-tracked gradient) and grows on
 * hover. Adapted to the Vision Run Club palette (white → coral → red) and
 * built with CSS transitions + a little state (no extra dependencies).
 */
export function ShineWordmark({
  text = "Vision Run Club",
  subtitle = "Kigali · Rwanda",
}: {
  text?: string;
  subtitle?: string;
}) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    const touch = e.touches[0];
    if (!touch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100)),
    });
  }

  return (
    <div className="flex select-none flex-col items-center justify-center overflow-hidden px-4 py-6 sm:py-8">
      <img
        src="/logo.png"
        alt="Vision Run Club Logo"
        className="mb-4 h-12 w-auto object-contain transition-transform duration-300 hover:scale-110 sm:h-16 md:h-20"
      />
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setHovered(false)}
        className="group relative cursor-pointer max-w-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform"
        style={{ transform: hovered ? "scale(1.05) translateY(-4px)" : "scale(1) translateY(0)" }}
      >
        {/* ambient glow behind the text on hover */}
        <div
          className="pointer-events-none absolute -inset-6 sm:-inset-10 rounded-full blur-2xl sm:blur-3xl transition-opacity duration-500"
          style={{
            background: "color-mix(in oklab, var(--coral) 22%, transparent)",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* base ghost / outline */}
        <h2
          className="display text-center text-3xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight"
          style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.25)" }}
        >
          {text}
        </h2>

        {/* shining gradient layer */}
        <h2
          className="display pointer-events-none absolute inset-0 text-center text-3xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight"
          style={{
            backgroundImage: `radial-gradient(circle 220px at ${pos.x}% ${pos.y}%, #ffffff 0%, var(--coral) 40%, color-mix(in oklab, var(--hivis) 45%, transparent) 70%, transparent 100%), linear-gradient(135deg, #ffffff 0%, var(--coral) 50%, var(--hivis) 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: `drop-shadow(0 0 20px color-mix(in oklab, var(--coral) ${hovered ? 75 : 40}%, transparent))`,
            transition: "filter 300ms ease",
          }}
        >
          {text}
        </h2>
      </div>

      {subtitle ? (
        <span className="tech mt-3 text-xs sm:text-sm text-accent">{subtitle}</span>
      ) : null}
    </div>
  );
}
