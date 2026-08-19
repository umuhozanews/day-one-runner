import { Link } from "@tanstack/react-router";
import { useState } from "react";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";

interface NavLinkItem {
  label: string;
  to: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "Runs", to: "/runs" },
  { label: "Routes", to: "/routes" },
  { label: "Schedule", to: "/schedule" },
  { label: "Guide", to: "/guide" },
  { label: "Community", to: "/community" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="inline-flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Vision Run Club"
            className="h-9 w-auto shrink-0 object-contain"
          />
          <span className="display text-xl leading-none tracking-tight">
            Vision<span className="text-[#ff0000]"> Run</span> Club
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
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

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={REGISTER}
            target="_blank"
            rel="noreferrer"
            className="snap-btn text-sm"
          >
            Register Free
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-white md:hidden"
          aria-label="Toggle navigation menu"
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

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-b border-border bg-background px-5 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-white/80 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border">
              <a
                href={REGISTER}
                target="_blank"
                rel="noreferrer"
                className="snap-btn w-full text-center"
              >
                Register to Join
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
