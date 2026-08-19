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
            <Link to="/" className="inline-flex items-center gap-2.5 sm:gap-3">
              <img src="/logo.png" alt="Vision Run Club" className="h-8 sm:h-9 w-auto" />
              <span className="display text-xl sm:text-2xl">
                Vision<span className="text-[#ff0000]"> Run</span> Club
              </span>
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
            <p className="tech text-white/50 mb-3 sm:mb-4 text-xs">Runs &amp; Formats</p>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-white/70">
              <li>
                <Link to="/runs" className="hover:text-white transition-colors py-0.5 block">
                  All Runs Overview
                </Link>
              </li>
              <li>
                <Link to="/runs/$slug" params={{ slug: "city-run" }} className="hover:text-white transition-colors py-0.5 block">
                  City Run (5K)
                </Link>
              </li>
              <li>
                <Link to="/runs/$slug" params={{ slug: "long-run" }} className="hover:text-white transition-colors py-0.5 block">
                  Long Run (7.5K)
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-white transition-colors py-0.5 block">
                  Upcoming Schedule
                </Link>
              </li>
            </ul>
          </div>

          {/* Kigali Routes */}
          <div>
            <p className="tech text-white/50 mb-3 sm:mb-4 text-xs">Kigali Routes</p>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-white/70">
              <li>
                <Link to="/routes" className="hover:text-white transition-colors py-0.5 block">
                  All Running Routes
                </Link>
              </li>
              <li>
                <Link to="/routes/$slug" params={{ slug: "car-free-zone" }} className="hover:text-white transition-colors py-0.5 block">
                  Car Free Zone 5K
                </Link>
              </li>
              <li>
                <Link to="/routes/$slug" params={{ slug: "convention-centre-loop" }} className="hover:text-white transition-colors py-0.5 block">
                  Convention Centre 7.5K
                </Link>
              </li>
              <li>
                <Link to="/routes/$slug" params={{ slug: "nyarutarama-lake" }} className="hover:text-white transition-colors py-0.5 block">
                  Nyarutarama Lake 6K
                </Link>
              </li>
              <li>
                <Link to="/routes/$slug" params={{ slug: "kimihurura-ridge" }} className="hover:text-white transition-colors py-0.5 block">
                  Kimihurura Ridge 8.5K
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Club */}
          <div>
            <p className="tech text-white/50 mb-3 sm:mb-4 text-xs">Guides &amp; Info</p>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-white/70">
              <li>
                <Link to="/guide" className="hover:text-white transition-colors py-0.5 block">
                  Kigali Running Guide
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-white transition-colors py-0.5 block">
                  Community &amp; Moments
                </Link>
              </li>
              <li>
                <Link to="/gear" className="hover:text-white transition-colors py-0.5 block">
                  Gear &amp; Shoes Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors py-0.5 block">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors py-0.5 block">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors py-0.5 block">
                  Join &amp; Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 sm:mt-16 flex flex-col justify-between gap-4 border-t border-border pt-6 sm:pt-8 text-xs text-white/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Vision Run Club. All rights reserved. Kigali, Rwanda.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/sitemap.xml" className="hover:text-white/80 transition-colors">
              Sitemap
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
