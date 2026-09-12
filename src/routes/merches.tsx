import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { GearUp } from "@/components/gear-up";
import { useSitePhotos } from "@/data/site-photos";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";

export const Route = createFileRoute("/merches")({
  head: () => ({
    meta: [
      { title: "Official Merch & Performance Gear — Vision Run Club Kigali" },
      {
        name: "description",
        content:
          "Official Vision Run Club Kigali merchandise and running apparel. Receive our signature VRC T-shirt with your one-time membership contribution, plus high-performance gear.",
      },
      { property: "og:title", content: "Official Merch — Vision Run Club Kigali" },
      {
        property: "og:description",
        content: "Official VRC T-Shirts, running apparel, and gear for Kigali runners.",
      },
    ],
  }),
  component: MerchesPage,
});

function MerchesPage() {
  const { photos } = useSitePhotos();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[45vh] flex-col justify-end overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:min-h-[60vh] md:pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
          <span className="tech text-[#ff0000] text-xs">Official Apparel &amp; Goods</span>
          <h1 className="display mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-8xl">Club Merches</h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-white/70 md:text-xl leading-relaxed">
            Wear your crew with pride. Every new member receives our official Vision Run Club
            T-shirt with their 10,000 RWF one-time membership contribution.
          </p>
        </div>
      </section>

      {/* Signature T-Shirt Banner */}
      <section className="border-t border-border px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="overflow-hidden rounded-3xl border border-[#ff0000]/40 bg-card/70 p-6 sm:p-10 md:p-14 backdrop-blur-lg">
            <div className="grid gap-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7 space-y-4 sm:space-y-6">
                <span className="tech text-xs text-[#ff0000] uppercase tracking-wider">
                  Included with Membership · 10,000 RWF
                </span>
                <h2 className="display text-3xl sm:text-4xl md:text-6xl">
                  Official Vision Run Club T-Shirt
                </h2>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                  A badge of belonging and commitment to movement. Crafted with breathable, lightweight
                  fabrics engineered for Kigali's morning temperatures and challenging hills.
                  Your 10,000 RWF contribution directly supports club activities, community runs,
                  and charitable efforts.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href={REGISTER}
                    target="_blank"
                    rel="noreferrer"
                    className="snap-btn text-center text-xs sm:text-sm"
                  >
                    Claim with Membership (10,000 RWF)
                  </a>
                  <Link
                    to="/about"
                    className="snap-ghost text-center text-xs sm:text-sm"
                  >
                    Learn About The Club
                  </Link>
                </div>
              </div>

              <div className="md:col-span-5 aspect-square overflow-hidden rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center p-4">
                <img
                  src={photos.merches.signatureBanner}
                  alt="Official Vision Run Club T-Shirt — White & Black Editions"
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Apparel Showcase Component */}
      <GearUp />

      <SiteFooter />
    </main>
  );
}
