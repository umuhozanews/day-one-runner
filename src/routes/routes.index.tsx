import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { KIGALI_ROUTES } from "@/data/routes-data";

export const Route = createFileRoute("/routes/")({
  head: () => ({
    meta: [
      { title: "Best Running Routes in Kigali, Rwanda — Vision Run Club" },
      {
        name: "description",
        content:
          "Discover the best running routes in Kigali, Rwanda: Car Free Zone 5K, Convention Centre 7.5K, Nyarutarama Lake trails, and Kimihurura ridges. Elevation profiles, surface notes, and guides.",
      },
      { property: "og:title", content: "Best Running Routes in Kigali — Vision Run Club" },
      {
        property: "og:description",
        content: "Curated 5K, 7.5K, and 10K running routes through Kigali's iconic hills and car-free boulevards.",
      },
    ],
  }),
  component: RoutesIndexPage,
});

function RoutesIndexPage() {
  const routes = Object.values(KIGALI_ROUTES);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[45vh] flex-col justify-end overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:min-h-[60vh] md:pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
          <span className="tech text-[#ff0000]">Curated Running Trails &amp; Circuits</span>
          <h1 className="display mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-8xl">Kigali Routes</h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-white/70 md:text-xl leading-relaxed">
            From smooth car-free avenues to green lakeside paths and panoramic hill ascents.
            Explore the best curated running routes in the land of a thousand hills.
          </p>
        </div>
      </section>

      {/* Routes Grid */}
      <section className="border-t border-border px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((r) => (
              <div
                key={r.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/50 transition-all hover:border-white/30 hover:bg-card/80"
              >
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={r.heroImg}
                    alt={r.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute right-3 top-3 rounded-full bg-background/85 px-3 py-1 text-xs font-mono backdrop-blur">
                    {r.difficulty}
                  </div>
                  <div className="absolute bottom-3 left-3 rounded-full bg-background/85 px-3 py-1 text-xs font-mono text-[#ff0000] backdrop-blur">
                    {r.distance}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                      <span>Elev: {r.elevation}</span>
                      <span>•</span>
                      <span>{r.surface}</span>
                    </div>

                    <h2 className="display mt-2 sm:mt-3 text-xl sm:text-2xl group-hover:text-[#ff0000] transition-colors">
                      {r.name}
                    </h2>
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/70 line-clamp-3 leading-relaxed">
                      {r.description}
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6 border-t border-border/50 pt-4">
                    <p className="tech text-[0.65rem] text-white/40">Start: {r.startPoint}</p>
                    <Link
                      to="/routes/$slug"
                      params={{ slug: r.slug }}
                      className="snap-ghost mt-3 sm:mt-4 w-full text-center text-xs"
                    >
                      Route Guide &amp; Tips →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Elevation Banner */}
      <section className="border-t border-border bg-card/30 px-4 py-16 sm:px-6 sm:py-20 md:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-6 sm:gap-8 md:flex-row md:items-center">
          <div>
            <span className="tech text-[#ff0000]">Runner Insights</span>
            <h3 className="display mt-2 text-2xl sm:text-3xl md:text-4xl">Running in Kigali's Hills</h3>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-white/60 leading-relaxed">
              Clean air, safe pedestrian corridors, and rewarding panoramic climbs make Kigali one
              of Africa's most runner-friendly capitals.
            </p>
          </div>
          <Link to="/guide" className="snap-btn text-xs sm:text-sm w-full sm:w-auto text-center">
            Read Kigali Runner's Guide
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
