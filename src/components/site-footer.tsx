import { Link } from "@tanstack/react-router";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";
const INSTAGRAM = "https://instagram.com/vision.runclub";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-5 py-16 md:px-8 md:py-24 text-foreground">
      <div className="mx-auto max-w-[1400px]">
        {/* Top CTA */}
        <div className="mb-16 flex flex-col justify-between gap-8 border-b border-border pb-16 md:flex-row md:items-center">
          <div>
            <span className="tech text-[#ff0000]">Join Kigali's Sunday Community</span>
            <h2 className="display mt-2 text-4xl md:text-6xl">Ready to run?</h2>
            <p className="mt-3 max-w-xl text-white/60">
              Every Sunday at 06:30 AM. No fee, no registration barrier, all paces welcome.
              Clarity comes with motion.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href={REGISTER} target="_blank" rel="noreferrer" className="snap-btn">
              Register Free
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="snap-ghost">
              Follow @vision.runclub
            </a>
          </div>
        </div>

        {/* Directory Columns for SEO & Discovery */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand col */}
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/logo.png" alt="Vision Run Club" className="h-9 w-auto" />
              <span className="display text-2xl">
                Vision<span className="text-[#ff0000]"> Run</span> Club
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/60 leading-relaxed">
              A community running crew based in Kigali, Rwanda. We bring runners of all paces
              together to explore the city's hills, car-free avenues, and scenic ridges every
              Sunday morning.
            </p>
            <p className="tech mt-6 text-white/40">Kigali · Rwanda · Elevation 1,520m</p>
          </div>

          {/* Runs & Formats */}
          <div>
            <p className="tech text-white/50 mb-4">Runs & Formats</p>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              <li>
                <Link to="/runs" className="hover:text-white transition-colors">
                  All Runs Overview
                </Link>
              </li>
              <li>
                <Link to="/runs/$slug" params={{ slug: "city-run" }} className="hover:text-white transition-colors">
                  City Run (5K)
                </Link>
              </li>
              <li>
                <Link to="/runs/$slug" params={{ slug: "long-run" }} className="hover:text-white transition-colors">
                  Long Run (7.5K)
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-white transition-colors">
                  Upcoming Schedule
                </Link>
              </li>
            </ul>
          </div>

          {/* Kigali Routes */}
          <div>
            <p className="tech text-white/50 mb-4">Kigali Routes</p>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              <li>
                <Link to="/routes" className="hover:text-white transition-colors">
                  All Running Routes
                </Link>
              </li>
              <li>
                <Link to="/routes/$slug" params={{ slug: "car-free-zone" }} className="hover:text-white transition-colors">
                  Car Free Zone 5K
                </Link>
              </li>
              <li>
                <Link to="/routes/$slug" params={{ slug: "convention-centre-loop" }} className="hover:text-white transition-colors">
                  Convention Centre 7.5K
                </Link>
              </li>
              <li>
                <Link to="/routes/$slug" params={{ slug: "nyarutarama-lake" }} className="hover:text-white transition-colors">
                  Nyarutarama Lake 6K
                </Link>
              </li>
              <li>
                <Link to="/routes/$slug" params={{ slug: "kimihurura-ridge" }} className="hover:text-white transition-colors">
                  Kimihurura Ridge 8.5K
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Club */}
          <div>
            <p className="tech text-white/50 mb-4">Guides & Info</p>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              <li>
                <Link to="/guide" className="hover:text-white transition-colors">
                  Kigali Running Guide
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-white transition-colors">
                  Community & Moments
                </Link>
              </li>
              <li>
                <Link to="/gear" className="hover:text-white transition-colors">
                  Gear & Shoes Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Join & Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border pt-8 text-xs text-white/40 md:flex-row md:items-center">
          <p>© 2026 Vision Run Club. All rights reserved. Kigali, Rwanda.</p>
          <div className="flex items-center gap-6">
            <Link to="/sitemap.xml" className="hover:text-white/80">
              Sitemap
            </Link>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-white/80">
              Instagram
            </a>
            <a href={REGISTER} target="_blank" rel="noreferrer" className="hover:text-white/80">
              Registration Form
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
