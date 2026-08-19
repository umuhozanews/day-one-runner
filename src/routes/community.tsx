import { createFileRoute } from "@tanstack/react-router";
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
      { title: "The Crew & Community — Vision Run Club Kigali, Rwanda" },
      {
        name: "description",
        content:
          "Meet the Vision Run Club community in Kigali, Rwanda. Photos, runner moments, social connections, and weekly Sunday morning energy.",
      },
      { property: "og:title", content: "Vision Run Club Community — Kigali, Rwanda" },
      {
        property: "og:description",
        content: "Moments from the crew. Connecting Kigali runners through movement every Sunday.",
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
      <section className="relative flex min-h-[50vh] flex-col justify-end overflow-hidden pt-32 pb-16 md:min-h-[60vh] md:pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8">
          <span className="tech text-[#ff0000]">One Pace · One Pack</span>
          <h1 className="display mt-4 text-5xl md:text-8xl">The Community</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/70 md:text-xl">
            Vision Run Club is more than weekly miles — it is a vibrant network of runners,
            creatives, and professionals sharing energy and uplifting one another.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="border-t border-border px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="tech text-[#ff0000]">In Motion</span>
              <h2 className="display mt-2 text-3xl md:text-5xl">Moments from Sunday</h2>
            </div>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="snap-ghost text-sm"
            >
              Follow @vision.runclub on Instagram →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {PHOTOS.map((src, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl bg-card ${
                  i % 3 === 0 ? "aspect-4/5" : "aspect-square"
                }`}
              >
                <img
                  src={src}
                  alt={`Vision Run Club Kigali moment #${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                  <span className="tech text-xs text-white">Sunday Vibes · Kigali</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Ethos */}
      <section className="border-t border-border bg-card/30 px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="tech text-[#ff0000]">Join The Movement</span>
            <h2 className="display mt-2 text-3xl md:text-5xl">Your Sunday Starts Here</h2>
            <p className="mt-6 text-white/75 leading-relaxed">
              No matter where you are on your running journey, there is a spot for you in the pack.
              We run, we chat, we grab coffee, and we celebrate every personal milestone together.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={REGISTER} target="_blank" rel="noreferrer" className="snap-btn">
                Register Free to Join
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="snap-ghost">
                View on Instagram
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background p-8 space-y-6">
            <h3 className="display text-2xl">Community Code</h3>
            <ul className="space-y-4 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <span className="text-[#ff0000] font-bold">1.</span>
                <span><strong>Support Everyone:</strong> High-fives, positive encouragement, and celebrating every runner who shows up.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#ff0000] font-bold">2.</span>
                <span><strong>No One Runs Alone:</strong> Back-markers ensure everyone completes the route safely and comfortably.</span>
              </li>
              <li className="flex items-start gap-3">
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
