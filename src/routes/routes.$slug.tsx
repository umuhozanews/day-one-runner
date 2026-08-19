import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { KIGALI_ROUTES } from "@/data/routes-data";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";

export const Route = createFileRoute("/routes/$slug")({
  head: ({ params }) => {
    const route = KIGALI_ROUTES[params.slug] ?? KIGALI_ROUTES["car-free-zone"];
    return {
      meta: [
        { title: `${route.name} (${route.distance}) — Kigali Running Route | Vision Run Club` },
        {
          name: "description",
          content: `${route.name} in Kigali, Rwanda: ${route.distance}, ${route.elevation} elevation, ${route.surface}. Start point: ${route.startPoint}. Full guide, tips, and highlights.`,
        },
        { property: "og:title", content: `${route.name} — Kigali Running Route` },
        {
          property: "og:description",
          content: `${route.distance} route in Kigali with ${route.elevation} elevation gain. Tips and surface guide.`,
        },
      ],
    };
  },
  component: RouteDetailPage,
});

function RouteDetailPage() {
  const { slug } = useParams({ from: "/routes/$slug" });
  const route = KIGALI_ROUTES[slug] ?? KIGALI_ROUTES["car-free-zone"];
  const otherRoutes = Object.values(KIGALI_ROUTES).filter((r) => r.slug !== route.slug);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[65vh] flex-col justify-end overflow-hidden pt-32 pb-16 md:min-h-[75vh] md:pb-24">
        <div className="absolute inset-0 z-0">
          <img
            src={route.heroImg}
            alt={`${route.name} Kigali`}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="tech rounded-full bg-background/80 px-3 py-1 text-xs backdrop-blur">
              {route.difficulty}
            </span>
            <span className="tech text-[#ff0000]">Kigali Running Route</span>
          </div>

          <h1 className="display mt-4 text-4xl md:text-7xl">{route.name}</h1>

          {/* Quick Specs Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border/80 py-4 text-sm md:gap-10">
            <div>
              <span className="tech text-white/50 block">Distance</span>
              <span className="display text-xl md:text-2xl text-[#ff0000]">{route.distance}</span>
            </div>
            <div>
              <span className="tech text-white/50 block">Elevation Gain</span>
              <span className="display text-xl md:text-2xl">{route.elevation}</span>
            </div>
            <div>
              <span className="tech text-white/50 block">Surface</span>
              <span className="text-sm font-medium">{route.surface}</span>
            </div>
            <div>
              <span className="tech text-white/50 block">Starting Point</span>
              <span className="text-sm font-medium">{route.startPoint}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Route Overview & Description */}
      <section className="border-t border-border px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-12">
          <div className="md:col-span-8 space-y-10">
            <div>
              <span className="tech text-[#ff0000]">Overview</span>
              <h2 className="display mt-2 text-3xl md:text-4xl">About This Route</h2>
              <p className="mt-4 text-lg text-white/80 leading-relaxed">{route.description}</p>
            </div>

            {/* Highlights */}
            <div className="rounded-2xl border border-border bg-card/40 p-8">
              <h3 className="display text-2xl">Key Highlights</h3>
              <ul className="mt-6 space-y-4">
                {route.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <span className="tech text-[#ff0000] mt-1">◈</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips for Runners */}
            <div className="rounded-2xl border border-border bg-card/40 p-8">
              <h3 className="display text-2xl">Runner Tips &amp; Safety</h3>
              <ul className="mt-6 space-y-4">
                {route.tips.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <span className="tech text-[#ff0000] mt-1">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="md:col-span-4 space-y-6">
            <div className="sticky top-28 rounded-2xl border border-border bg-card p-6 md:p-8">
              <span className="tech text-[#ff0000]">Join the Crew</span>
              <h3 className="display mt-2 text-2xl">Run With Us This Sunday</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                Vision Run Club tackles this route and many more every Sunday morning at 06:30 AM.
                Free, inclusive, and fun.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href={REGISTER}
                  target="_blank"
                  rel="noreferrer"
                  className="snap-btn w-full text-center"
                >
                  Register Free
                </a>
                <Link
                  to="/schedule"
                  className="snap-ghost w-full text-center text-xs"
                >
                  View Sunday Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More Routes */}
      <section className="border-t border-border bg-card/30 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="display text-3xl md:text-4xl">More Kigali Routes</h2>
            <Link to="/routes" className="tech text-[#ff0000] hover:underline">
              View All Routes →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherRoutes.slice(0, 3).map((r) => (
              <Link
                key={r.slug}
                to="/routes/$slug"
                params={{ slug: r.slug }}
                className="group rounded-2xl border border-border bg-background p-6 transition-all hover:border-white/40"
              >
                <span className="tech text-white/40">{r.distance} · {r.difficulty}</span>
                <h3 className="display mt-2 text-xl group-hover:text-[#ff0000] transition-colors">
                  {r.name}
                </h3>
                <p className="mt-2 text-xs text-white/60 line-clamp-2">{r.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
