import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";
const INSTAGRAM = "https://instagram.com/vision.runclub";

const PHOTOS = [
  "/photos/SnapInsta.to_749665105_18037222907815520_6383458047242768862_n.jpg",
  "/photos/SnapInsta.to_748985982_18037222781815520_1887800587334956759_n.jpg",
  "/photos/SnapInsta.to_748070875_18037222835815520_1503705550880001620_n.jpg",
  "/photos/SnapInsta.to_749567025_18037222802815520_4849214195941431927_n.jpg",
  "/photos/SnapInsta.to_729540015_18035340809815520_4338465274389984729_n.jpg",
  "/photos/SnapInsta.to_730182773_18035340857815520_1122172522890161717_n.jpg",
  "/photos/SnapInsta.to_731093748_18035341016815520_3372942038985659629_n.jpg",
  "/photos/SnapInsta.to_688521411_18028405289815520_2070995861615674477_n.jpg",
];

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Guide & Community — Moments from our last runs | Vision Run Club Kigali" },
      {
        name: "description",
        content:
          "Vision Run Club isn't just about weekly miles, it's a thriving community of runners, creatives, and professionals who run, meet, share energy and inspire each other.",
      },
      { property: "og:title", content: "Guide & Community — Vision Run Club Kigali" },
      {
        property: "og:description",
        content: "Moments from our last runs & Runner's Guide for Kigali.",
      },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[45vh] flex-col justify-end overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:min-h-[60vh] md:pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
          <span className="tech text-[#ff0000]">Guide &amp; Community</span>
          <h1 className="display mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-8xl">
            Moments from our last runs
          </h1>
          <p className="mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg text-white/80 md:text-xl leading-relaxed">
            Vision Run Club isn't just about weekly miles, it's a thriving community of runners, creatives, and
            professionals who run, meet, share energy and inspire each other. VRC is all about doing, being active
            and meaningful relationships,where every run is a run to grow together.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="border-t border-border px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 sm:mb-12 flex flex-col justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
            <div>
              <span className="tech text-[#ff0000] text-xs">Sunday Energy in Kigali</span>
              <h2 className="display mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-5xl">Photo Highlights</h2>
            </div>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="snap-ghost text-xs sm:text-sm self-start md:self-auto"
            >
              Follow @vision.runclub on Instagram →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {PHOTOS.map((src, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card ${
                  i % 3 === 0 ? "aspect-4/5" : "aspect-square"
                }`}
              >
                <img
                  src={src}
                  alt={`Vision Run Club Kigali moment #${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3 sm:p-4">
                  <span className="tech text-[0.65rem] sm:text-xs text-white">Sunday Vibes · Rubia Café</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kigali Runner's Essentials Guide */}
      <section className="border-t border-border bg-card/20 px-4 py-16 sm:px-6 sm:py-24 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 sm:mb-16">
            <span className="tech text-[#ff0000] text-xs">The Field Guide</span>
            <h2 className="display mt-2 text-3xl sm:text-4xl md:text-6xl">Running in Kigali</h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-white/70">
              Essential knowledge for running across Kigali's thousand hills at 1,500m elevation.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
              <span className="tech text-xs text-[#ff0000]">01. Elevation &amp; Air</span>
              <h3 className="display mt-2 text-xl sm:text-2xl">1,520m Altitude</h3>
              <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                Kigali sits at high altitude. During your first few runs, pace yourself by effort rather than
                strict times. Hydrate with electrolytes before and after Sunday morning sessions.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
              <span className="tech text-xs text-[#ff0000]">02. Hill Running Technique</span>
              <h3 className="display mt-2 text-xl sm:text-2xl">Master the Gradients</h3>
              <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                Shorten your uphill stride and keep a high cadence. On downhills, maintain soft knees and avoid
                hard heel-braking to protect your joints and stay nimble.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
              <span className="tech text-xs text-[#ff0000]">03. Rubia Café Base</span>
              <h3 className="display mt-2 text-xl sm:text-2xl">Sundays at 06:30 AM</h3>
              <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                We meet at Rubia Café in Kimihurura at 06:30 AM sharp. Warm-up together, take on the route, and
                reconvene at Rubia for post-run coffee and conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Ethos & Membership */}
      <section className="border-t border-border px-4 py-16 sm:px-6 sm:py-20 md:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-8 sm:gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="tech text-[#ff0000] text-xs">Join The Movement</span>
            <h2 className="display mt-2 text-2xl sm:text-3xl md:text-5xl">Your Sunday Starts Here</h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-white/75 leading-relaxed">
              Membership is a simple one-time contribution of 10,000 RWF which includes your official Vision Run Club
              T-shirt and directly funds community running initiatives. No monthly fees. All paces welcome.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a href={REGISTER} target="_blank" rel="noreferrer" className="snap-btn w-full sm:w-auto text-center text-xs sm:text-sm">
                Join Vision Run Club (10,000 RWF)
              </a>
              <Link to="/runs" className="snap-ghost w-full sm:w-auto text-center text-xs sm:text-sm">
                View Weekly Runs
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/60 p-5 sm:p-8 space-y-4 sm:space-y-6">
            <h3 className="display text-xl sm:text-2xl">Community Code</h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/75 leading-relaxed">
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="text-[#ff0000] font-bold">1.</span>
                <span><strong>Support Everyone:</strong> High-fives, positive encouragement, and celebrating every runner who shows up.</span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="text-[#ff0000] font-bold">2.</span>
                <span><strong>No One Runs Alone:</strong> Back-markers ensure everyone completes the route safely and comfortably.</span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="text-[#ff0000] font-bold">3.</span>
                <span><strong>Respect the City:</strong> Clean streets, friendly greetings to early-morning locals, and safe road etiquette.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
