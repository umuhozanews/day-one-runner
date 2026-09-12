import { Link } from "@tanstack/react-router";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";
const INSTAGRAM = "https://instagram.com/vision.runclub";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-4 py-12 sm:px-6 md:px-8 md:py-24 text-foreground">
      <div className="mx-auto max-w-[1400px]">
        {/* Top CTA */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border pb-12 sm:mb-16 sm:pb-16 md:flex-row md:items-center">
          <div>
            <span className="tech text-[#ff0000]">Join Kigali's Sunday Community</span>
            <h2 className="display mt-2 text-3xl sm:text-4xl md:text-6xl">Ready to run?</h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-white/60">
              Every Sunday at 06:30 AM. No fee, no registration barrier, all paces welcome.
              Clarity comes with motion.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a href={REGISTER} target="_blank" rel="noreferrer" className="snap-btn w-full sm:w-auto text-center">
              Register Free
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="snap-ghost w-full sm:w-auto text-center">
              Follow @vision.runclub
            </a>
          </div>
        </div>

        {/* Directory Columns for SEO & Discovery */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand col */}
          <div className="sm:col-span-2">
            <Link to="/" className="inline-flex items-center" aria-label="Vision Run Club">
              <img src="/logo.png" alt="Vision Run Club" className="h-8 sm:h-9 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-xs sm:text-sm text-white/60 leading-relaxed">
              A community running crew based in Kigali, Rwanda. We bring runners of all paces
              together to explore the city's hills, car-free avenues, and scenic ridges every
              Sunday morning.
            </p>
            <p className="tech mt-6 text-xs text-white/40">Kigali · Rwanda · Elevation 1,520m</p>
          </div>

          {/* Runs & Formats */}
          <div>
            <p className="tech text-white/50 mb-3 sm:mb-4 text-xs">Weekly Runs</p>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-white/70">
              <li>
                <Link to="/runs" className="hover:text-white transition-colors py-0.5 block">
                  All Runs Overview
                </Link>
              </li>
              <li>
                <Link to="/runs/$slug" params={{ slug: "easy-social-run" }} className="hover:text-white transition-colors py-0.5 block">
                  Easy / Social Run (5K)
                </Link>
              </li>
              <li>
                <Link to="/runs/$slug" params={{ slug: "tempo-run" }} className="hover:text-white transition-colors py-0.5 block">
                  Tempo Run (6-8K)
                </Link>
              </li>
              <li>
                <Link to="/runs/$slug" params={{ slug: "long-run" }} className="hover:text-white transition-colors py-0.5 block">
                  Long Run (8-12K)
                </Link>
              </li>
              <li>
                <Link to="/runs/$slug" params={{ slug: "track-speed-run" }} className="hover:text-white transition-colors py-0.5 block">
                  Track / Speed Run
                </Link>
              </li>
              <li>
                <Link to="/runs/$slug" params={{ slug: "fartlek-run" }} className="hover:text-white transition-colors py-0.5 block">
                  Fartlek Run
                </Link>
              </li>
            </ul>
          </div>

          {/* Club Pages */}
          <div>
            <p className="tech text-white/50 mb-3 sm:mb-4 text-xs">Club Pages</p>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-white/70">
              <li>
                <Link to="/merches" className="hover:text-white transition-colors py-0.5 block">
                  Club Merches &amp; T-Shirt
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-white transition-colors py-0.5 block">
                  Guide &amp; Community
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors py-0.5 block">
                  About Our Mission &amp; Pillars
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors py-0.5 block">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors py-0.5 block">
                  Contacts &amp; Join
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Join */}
          <div>
            <p className="tech text-white/50 mb-3 sm:mb-4 text-xs">Sunday Sessions</p>
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-white/70">
              <p className="font-semibold text-white">Rubia Café, Kimihurura</p>
              <p className="text-white/60">Every Sunday at 06:30 AM</p>
              <p className="text-xs text-white/50 pt-1">
                One-time 10,000 RWF contribution includes official VRC T-shirt.
              </p>
              <div className="pt-2">
                <a
                  href={REGISTER}
                  target="_blank"
                  rel="noreferrer"
                  className="snap-btn text-xs px-3.5 py-1.5 inline-block text-center"
                >
                  Join Vision Run Club
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 sm:mt-16 flex flex-col justify-between gap-4 border-t border-border pt-6 sm:pt-8 text-xs text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Vision Run Club. All rights reserved. Kigali, Rwanda.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/sitemap.xml" className="hover:text-white/80 transition-colors">
              Sitemap
            </Link>
            <Link
              to="/admin"
              className="flex items-center gap-1.5 hover:text-white/80 transition-colors opacity-60 hover:opacity-100"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff0000]" />
              Admin Portal
            </Link>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors">
              Instagram
            </a>
            <a href={REGISTER} target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors">
              Registration Form
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
