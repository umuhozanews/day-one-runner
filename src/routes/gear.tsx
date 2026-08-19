import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { GearUp } from "@/components/gear-up";

export const Route = createFileRoute("/gear")({
  head: () => ({
    meta: [
      { title: "Running Gear & Footwear Guide for Kigali — Vision Run Club" },
      {
        name: "description",
        content:
          "Discover the recommended running gear, road shoes, hydration packs, and apparel tailored for Kigali's asphalt, hills, and morning climate.",
      },
      { property: "og:title", content: "Running Gear & Footwear Guide — Kigali" },
      {
        property: "og:description",
        content: "Recommended running shoes and gear for conquering Kigali's thousand hills.",
      },
    ],
  }),
  component: GearPage,
});

function GearPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[45vh] flex-col justify-end overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:min-h-[60vh] md:pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
          <span className="tech text-[#ff0000] text-xs">Equipment &amp; Footwear</span>
          <h1 className="display mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-8xl">Gear Up for Kigali</h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-white/70 md:text-xl leading-relaxed">
            Tackling elevation gain and paved avenues requires the right balance of cushioning,
            breathability, and traction. Here is our crew guide to gear.
          </p>
        </div>
      </section>

      {/* Shoe Recommendations */}
      <section className="border-t border-border px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 sm:mb-12">
            <span className="tech text-[#ff0000] text-xs">Footwear Matrix</span>
            <h2 className="display mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-5xl">Shoes for Kigali Terrain</h2>
          </div>

          <div className="grid gap-4 sm:gap-8 md:grid-cols-3">
            {[
              {
                category: "Daily Hill Trainers",
                idealFor: "Sunday 5K & 7.5K Runs",
                desc: "High-cushion road shoes with durable rubber outsoles. Provides joint protection during downhill descents while offering responsive energy return on climbs.",
                features: ["Moderate-to-high stack height", "Durable rubber traction", "Breathable mesh upper"],
              },
              {
                category: "Road-to-Trail Hybrids",
                idealFor: "Nyarutarama & Mount Kigali",
                desc: "Low-profile lugs that seamlessly transition from paved roads to packed dirt trails, golf course perimeters, and damp morning terrain.",
                features: ["3mm - 4mm versatile lugs", "Reinforced toe rand", "Grip on wet asphalt and dirt"],
              },
              {
                category: "Tempo & Speed Shoes",
                idealFor: "Fast Morning Avenues",
                desc: "Lightweight, propulsive shoes for runners aiming for fast paces on Car Free Zone circuits and flat Remera concourses.",
                features: ["Ultra-lightweight foam", "Snappy transition", "Streamlined lockdown"],
              },
            ].map((shoe, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-card/60 p-5 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="tech text-xs text-[#ff0000]">{shoe.idealFor}</span>
                  <h3 className="display mt-2 text-xl sm:text-2xl">{shoe.category}</h3>
                  <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">{shoe.desc}</p>
                </div>
                <div className="mt-6 sm:mt-8 border-t border-border pt-4 sm:pt-6">
                  <p className="tech text-[0.65rem] sm:text-xs text-white/50 mb-2">Key Specs:</p>
                  <ul className="space-y-1.5 text-xs text-white/80">
                    {shoe.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[#ff0000]">◈</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Gear Showcase Component */}
      <GearUp />

      <SiteFooter />
    </main>
  );
}
