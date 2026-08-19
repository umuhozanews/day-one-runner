import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";

function nextSundaysList(count: number) {
  const out = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7));
  for (let i = 0; i < count; i++) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const isCity = i % 2 === 0;
    out.push({
      dateStr: `${dd}.${mm}.${yyyy}`,
      dayName: "Sunday",
      time: "06:30 AM",
      title: isCity ? "City Run 5K" : "Long Run 7.5K",
      location: isCity ? "Car Free Zone, Central Kigali" : "Kigali Convention Centre",
      distance: isCity ? "5.00 KM" : "7.50 KM",
      slug: isCity ? "city-run" : "long-run",
      paceGroups: ["6:00 min/km", "6:45 min/km", "7:30 min/km", "Social / Walk-Run"],
    });
    d.setDate(d.getDate() + 7);
  }
  return out;
}

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Sunday Run Schedule & Calendar — Vision Run Club Kigali" },
      {
        name: "description",
        content:
          "Check the upcoming Sunday morning run schedule for Vision Run Club in Kigali, Rwanda. Find meeting times, start locations, distance breakdowns, and pacing groups.",
      },
      { property: "og:title", content: "Sunday Run Schedule — Vision Run Club Kigali" },
      {
        property: "og:description",
        content: "Every Sunday at 06:30 AM in Kigali. Free and open to all runners.",
      },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  const sessions = nextSundaysList(8);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[45vh] flex-col justify-end overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:min-h-[60vh] md:pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
          <span className="tech text-[#ff0000]">Every Sunday · 06:30 AM</span>
          <h1 className="display mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-8xl">Upcoming Schedule</h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-white/70 md:text-xl leading-relaxed">
            Never miss a stride. We run every Sunday morning across Kigali. No fees, no RSVP
            deadlines — just show up ready to move.
          </p>
        </div>
      </section>

      {/* Calendar List */}
      <section className="border-t border-border px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="space-y-4 sm:space-y-6">
            {sessions.map((s, idx) => (
              <div
                key={s.dateStr}
                className="grid items-center gap-4 sm:gap-6 rounded-2xl border border-border bg-card/60 p-5 sm:p-6 md:grid-cols-12 md:p-8"
              >
                {/* Date & Tag */}
                <div className="md:col-span-3">
                  <span className="tech text-[#ff0000] text-xs">Session #{idx + 1}</span>
                  <p className="display mt-1 text-2xl sm:text-3xl md:text-4xl">{s.dateStr}</p>
                  <p className="tech text-xs text-white/50">{s.dayName} · {s.time}</p>
                </div>

                {/* Info */}
                <div className="md:col-span-6 space-y-2">
                  <h2 className="display text-xl sm:text-2xl md:text-3xl">{s.title}</h2>
                  <p className="text-xs sm:text-sm text-white/70">
                    <strong className="text-white">Start:</strong> {s.location}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                    <span className="tech text-[0.65rem] sm:text-xs text-white/40">Paces:</span>
                    {s.paceGroups.map((p) => (
                      <span
                        key={p}
                        className="rounded-full bg-background border border-border px-2 py-0.5 text-[0.65rem] sm:text-xs font-mono text-white/80"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 sm:gap-3 md:col-span-3 md:items-end">
                  <a
                    href={REGISTER}
                    target="_blank"
                    rel="noreferrer"
                    className="snap-btn w-full text-center text-xs md:w-auto"
                  >
                    Register
                  </a>
                  <Link
                    to="/runs/$slug"
                    params={{ slug: s.slug }}
                    className="snap-ghost w-full text-center text-xs md:w-auto"
                  >
                    Route Info
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routine breakdown */}
      <section className="border-t border-border bg-card/30 px-4 py-16 sm:px-6 sm:py-20 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <span className="tech text-[#ff0000]">Sunday Flow</span>
          <h2 className="display mt-2 text-2xl sm:text-3xl md:text-5xl">How Sunday Morning Runs</h2>

          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                time: "06:15 - 06:25",
                title: "Crew Arrival",
                desc: "Arrive at the meeting point, drop bags in support vehicle if available, and meet fellow runners.",
              },
              {
                time: "06:30 - 06:38",
                title: "Dynamic Warm-up",
                desc: "Joint mobility, leg swings, glute activation, and route safety announcements.",
              },
              {
                time: "06:40 - 07:30",
                title: "The Run",
                desc: "Runners split into guided pace groups (5:45 to 7:30 min/km) with lead navigators and sweeps.",
              },
              {
                time: "07:30+",
                title: "Coffee & Hangout",
                desc: "Cool-down stretches, hydration, group photos, and breakfast at a nearby local cafe.",
              },
            ].map((step, i) => (
              <div key={i} className="rounded-2xl border border-border bg-background p-5 sm:p-6">
                <span className="tech text-xs text-[#ff0000]">{step.time}</span>
                <h3 className="display mt-2 text-lg sm:text-xl">{step.title}</h3>
                <p className="mt-2 sm:mt-3 text-xs text-white/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
