import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { RUNS_CATALOG } from "@/data/runs-data";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";

export const Route = createFileRoute("/runs/")({
  head: () => ({
    meta: [
      { title: "Weekly Runs & Formats — Vision Run Club | Kigali, Rwanda" },
      {
        name: "description",
        content:
          "Explore Vision Run Club's weekly running sessions in Kigali: City Run (5K), Long Run (7.5K), and Sunday Morning Socials. Discover pace groups, meeting spots, and routes.",
      },
      { property: "og:title", content: "Weekly Runs — Vision Run Club Kigali" },
      {
        property: "og:description",
        content: "Discover 5K City Runs, 7.5K Long Runs, and Sunday Social paces in Kigali.",
      },
    ],
  }),
  component: RunsIndexPage,
});

function RunsIndexPage() {
  const runs = Object.values(RUNS_CATALOG);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[45vh] flex-col justify-end overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:min-h-[60vh] md:pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
          <span className="tech text-[#ff0000]">Format &amp; Sessions</span>
          <h1 className="display mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-8xl">Our Weekly Runs</h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-white/70 md:text-xl leading-relaxed">
            We meet every Sunday morning at 06:30 AM across Kigali. Each session features
            guided warm-ups, paced running groups, and post-run community coffee.
          </p>
        </div>
      </section>

      {/* Runs Catalog */}
      <section className="border-t border-border px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1400px] space-y-8 sm:space-y-12">
          {runs.map((run) => (
            <div
              key={run.slug}
              className="grid overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card/60 transition-colors hover:border-white/25 md:grid-cols-12"
            >
              {/* Image */}
              <div className="relative aspect-16/10 md:col-span-5 md:aspect-auto">
                <img
                  src={run.hero}
                  alt={`${run.name} Kigali`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-3 top-3 sm:left-4 sm:top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-mono backdrop-blur">
                  {run.schedule}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between p-5 sm:p-8 md:col-span-7 md:p-12">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                    <span className="tech text-[#ff0000]">Distance: {run.distance}</span>
                    <span className="tech text-white/50">{run.time}</span>
                  </div>

                  <h2 className="display mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl">{run.name}</h2>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/75 leading-relaxed">{run.overview}</p>

                  {/* Quick specs */}
                  <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 border-t border-border/60 pt-5 sm:pt-6 sm:grid-cols-3">
                    <div>
                      <p className="tech text-xs text-white/40">Meeting Spot</p>
                      <p className="mt-1 text-xs sm:text-sm font-medium">{run.meeting}</p>
                    </div>
                    <div>
                      <p className="tech text-xs text-white/40">Pace</p>
                      <p className="mt-1 text-xs sm:text-sm font-medium">{run.pace}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="tech text-xs text-white/40">Frequency</p>
                      <p className="mt-1 text-xs sm:text-sm font-medium">{run.schedule}</p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                  <Link
                    to="/runs/$slug"
                    params={{ slug: run.slug }}
                    className="snap-btn text-xs sm:text-sm text-center"
                  >
                    View Run Details →
                  </Link>
                  <a
                    href={REGISTER}
                    target="_blank"
                    rel="noreferrer"
                    className="snap-ghost text-xs sm:text-sm text-center"
                  >
                    Register for Run
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preparation Box */}
      <section className="border-t border-border bg-card/30 px-4 py-16 sm:px-6 sm:py-20 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border p-5 sm:p-8 bg-background">
              <div className="tech text-xs text-[#ff0000]">01. Timing</div>
              <h3 className="display mt-2 sm:mt-3 text-xl sm:text-2xl">Arrive by 06:20 AM</h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                We kick off right at 06:30 AM with a dynamic group warm-up. Arriving 10 minutes
                early gives you time to meet the crew and hear the morning briefing.
              </p>
            </div>
            <div className="rounded-2xl border border-border p-5 sm:p-8 bg-background">
              <div className="tech text-xs text-[#ff0000]">02. Gear</div>
              <h3 className="display mt-2 sm:mt-3 text-xl sm:text-2xl">Road Shoes &amp; Water</h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                Standard road running shoes work wonderfully on Kigali's asphalt. Bring a bottle
                for pre/post hydration.
              </p>
            </div>
            <div className="rounded-2xl border border-border p-5 sm:p-8 bg-background">
              <div className="tech text-xs text-[#ff0000]">03. Pace</div>
              <h3 className="display mt-2 sm:mt-3 text-xl sm:text-2xl">Conversational &amp; Inclusive</h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                We have group leaders and back-markers on every route. No one runs alone and no
                one is left behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
