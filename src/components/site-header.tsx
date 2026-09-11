import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";
const INSTAGRAM = "https://instagram.com/vision.runclub";

interface NavLinkItem {
  label: string;
  to: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "Runs", to: "/runs" },
  { label: "Merches", to: "/merches" },
  { label: "Guide & Community", to: "/community" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Contacts", to: "/contact" },
];

export function SiteHeader({ transparentOnTop = false }: { transparentOnTop?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isHeaderSolid = !transparentOnTop || scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        isHeaderSolid
          ? "border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={{
        backgroundColor: isHeaderSolid ? "rgba(10, 10, 10, 0.96)" : "transparent",
      }}
    >
      <div className="relative z-50 mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6 md:px-8 md:py-4">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="inline-flex items-center focus:outline-none"
          aria-label="Vision Run Club"
        >
          <img
            src="/logo.png"
            alt="Vision Run Club"
            className="h-8 w-auto shrink-0 object-contain sm:h-9"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-4 text-sm font-medium xl:gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-[#ff0000] font-semibold" }}
              className="text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={REGISTER}
            target="_blank"
            rel="noreferrer"
            className="snap-btn text-sm"
          >
            Register Free
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={REGISTER}
            target="_blank"
            rel="noreferrer"
            className="snap-btn px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
          >
            Register
          </a>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMobileOpen((prev) => !prev);
            }}
            className="relative z-50 flex h-10 w-10 cursor-pointer touch-manipulation items-center justify-center rounded-xl border border-white/15 bg-[#141414] text-white transition-colors hover:bg-white/10 active:bg-white/20 focus:outline-none"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Fullscreen Overlay */}
      {mobileOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 top-[56px] sm:top-[64px] z-40 flex flex-col justify-between overflow-y-auto bg-[#0a0a0a] px-5 py-6 backdrop-blur-2xl border-t border-white/10 lg:hidden"
          style={{
            backgroundColor: "#0a0a0a",
            height: "calc(100dvh - 56px)",
          }}
        >
          <div className="flex flex-col space-y-1">
            <span className="tech text-[#ff0000] mb-2 px-3 text-[0.65rem] uppercase tracking-wider font-semibold">Navigation</span>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                activeProps={{ className: "text-[#ff0000] bg-white/5 font-semibold" }}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-lg font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-white active:bg-white/10"
              >
                <span>{link.label}</span>
                <span className="text-xs text-white/30">→</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 space-y-4 border-t border-white/10 pt-6 pb-6">
            <div className="flex items-center justify-between px-2 text-xs text-white/60">
              <span>Next Run: Sunday · 06:30</span>
              <span className="text-white/40">Kigali, Rwanda</span>
            </div>
            <a
              href={REGISTER}
              target="_blank"
              rel="noreferrer"
              className="snap-btn w-full text-center py-3 text-sm font-semibold block"
              onClick={() => setMobileOpen(false)}
            >
              Register Free to Join
            </a>
            <div className="flex items-center justify-center gap-6 pt-2 text-xs text-white/50">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors py-2"
              >
                Instagram @vision.runclub
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
