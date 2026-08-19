import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollFillText } from "@/components/scroll-fill-text";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Vision Run Club — Story, Mission & Crew | Kigali, Rwanda" },
      {
        name: "description",
        content:
          "Discover the mission and story behind Vision Run Club in Kigali, Rwanda. We run every Sunday at 06:30 AM to foster wellness, community, and clarity through movement.",
      },
      { property: "og:title", content: "About Vision Run Club — Kigali, Rwanda" },
      {
        property: "og:description",
        content: "A community running crew uniting runners across Kigali's iconic hills every Sunday.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] flex-col justify-end overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:min-h-[70vh] md:pb-28">
        <div className="absolute inset-0 z-0">
          <img
            src="/photos/SnapInsta.to_749665105_18037222907815520_6383458047242768862_n.jpg"
            alt="Vision Run Club Kigali"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/40" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
          <p className="tech text-[#ff0000] text-xs">Our Story &amp; Purpose</p>
          <h1 className="display mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-8xl">
            Clarity comes
            <br />
            with <span className="text-[#ff0000]">motion</span>.
          </h1>
        </div>
      </section>

      {/* Origin Story */}
      <section className="border-t border-border px-4 py-16 sm:px-6 sm:py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-8 sm:gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <span className="tech text-xs text-white/50">Origin &amp; Vision</span>
            <h2 className="display mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl">Born on Kigali's Hills</h2>
          </div>
          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
            <ScrollFillText
              as="p"
              className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed text-white"
              text="Vision Run Club started with a simple belief: movement has the power to clear the mind, connect people, and transform the way we experience our city."
            />
            <p>
              In a city defined by rolling hills, clean boulevards, and vibrant morning energy, we
              saw an opportunity to bring people together before the noise of the week begins.
              Whether you are training for your first 5K or logging marathon mileage, our pack runs
              as one.
            </p>
            <p>
              Every Sunday morning at 06:30 AM, we gather at iconic locations like the Car Free Zone
              and the Kigali Convention Centre. We warm up together, tackle the hills, share
              conversation, and finish with post-run coffee.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="border-t border-border bg-card/40 px-4 py-16 sm:px-6 sm:py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 sm:mb-16">
            <span className="tech text-xs text-[#ff0000]">What We Stand For</span>
            <h2 className="display mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-6xl">Our Pillars</h2>
          </div>

          <div className="grid gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                num: "01",
                title: "All Paces Welcome",
                desc: "No qualifying times. No gatekeeping. Whether you sprint, jog, or run-walk, you have a home in our crew. No one gets left behind.",
              },
              {
                num: "02",
                title: "100% Free & Open",
                desc: "We believe community wellness should be universally accessible. There is no subscription, no membership dues, and no barrier to entry.",
              },
              {
                num: "03",
                title: "Urban Exploration",
                desc: "We experience Kigali from street level — discovering new ridges, car-free avenues, sunrise views, and local coffee spots every week.",
              },
              {
                num: "04",
                title: "Mental Clarity",
                desc: "Physical endurance is just one benefit. Running together provides headspace, stress relief, and a grounding ritual to start the week.",
              },
              {
                num: "05",
                title: "Community & Connection",
                desc: "Beyond running, Vision Run Club is where professionals, students, visitors, and locals build meaningful friendships.",
              },
              {
                num: "06",
                title: "Consistency",
                desc: "Rain or shine, every Sunday morning at 06:30 AM. Routine creates momentum, and momentum creates change.",
              },
            ].map((v) => (
              <div
                key={v.num}
                className="group rounded-2xl border border-border bg-background p-5 sm:p-8 transition-colors hover:border-[#ff0000]/50"
              >
                <div className="tech text-xs text-[#ff0000]">{v.num}</div>
                <h3 className="display mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl">{v.title}</h3>
                <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-white/70 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kigali Context Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-8 sm:gap-12 md:grid-cols-2 md:items-center">
          <div className="aspect-4/3 overflow-hidden rounded-2xl">
            <img
              src="/photos/SnapInsta.to_748070875_18037222835815520_1503705550880001620_n.jpg"
              alt="Running in Kigali"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <span className="tech text-xs text-white/50">The Terrain</span>
            <h2 className="display mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-5xl">Running at 1,500m Elevation</h2>
            <p className="mt-4 sm:mt-6 text-xs sm:text-base text-white/75 leading-relaxed">
              Kigali is known as the city of a thousand hills. Training here at 1,500+ meters above sea
              level naturally enhances cardiovascular endurance, strength, and lung capacity.
            </p>
            <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-4 sm:gap-6 border-t border-border pt-5 sm:pt-6">
              <div>
                <p className="tech text-xs text-white/50">Average Elevation</p>
                <p className="display mt-1 text-2xl sm:text-3xl md:text-4xl">1,520 M</p>
              </div>
              <div>
                <p className="tech text-xs text-white/50">Sunday Start</p>
                <p className="display mt-1 text-2xl sm:text-3xl md:text-4xl">06:30 AM</p>
              </div>
            </div>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link to="/routes" className="snap-btn w-full sm:w-auto text-center text-xs sm:text-sm">
                Explore Routes
              </Link>
              <a href={REGISTER} target="_blank" rel="noreferrer" className="snap-ghost w-full sm:w-auto text-center text-xs sm:text-sm">
                Join Next Sunday
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
