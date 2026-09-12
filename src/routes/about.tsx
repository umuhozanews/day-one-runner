import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollFillText } from "@/components/scroll-fill-text";
import { useSitePhotos } from "@/data/site-photos";

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
  const { photos } = useSitePhotos();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] flex-col justify-end overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:min-h-[70vh] md:pb-28">
        <div className="absolute inset-0 z-0">
          <img
            src={photos.about.hero}
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
            <span className="tech text-xs text-white/50">Our Story &amp; Purpose</span>
            <h2 className="display mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl">Born on Kigali's Hills</h2>
          </div>
          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
            <ScrollFillText
              as="p"
              className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed text-white"
              text="Every Sunday morning at 6:30 AM, we meet at Rubia Café, our home base in Kigali. From there, we warm up together, take on the city’s hills, share conversations, and return to Rubia for post-run coffee and connection."
            />
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              Because for us, running isn’t just about the miles. It’s about the people you meet, the
              connections you build, and the clarity you find in motion.
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
                title: "Accessible Community",
                desc: "We believe movement and community should be accessible to everyone. Vision Run Club has no monthly or recurring membership fees. Instead, we ask for a one-time contribution of 10,000 RWF, which directly supports club activities, community initiatives, and charity efforts. As part of that contribution, every member also receives official Vision Run Club merchandise, including a T-shirt giving you something to wear with pride while being part of the movement. One contribution. One community. More impact.",
              },
              {
                num: "03",
                title: "Mental Clarity",
                desc: "Physical endurance is just one benefit. Running together provides headspace, stress relief, and a grounding ritual to start the week.",
              },
              {
                num: "04",
                title: "Community & Connection",
                desc: "Beyond running, Vision Run Club is where professionals, students, visitors, and locals build meaningful friendships.",
              },
              {
                num: "05",
                title: "Consistency",
                desc: "Rain or shine, every Sunday morning at 06:30 AM at Rubia Café. Routine creates momentum, and momentum creates change.",
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
              src={photos.about.story1}
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
              <Link to="/runs" className="snap-btn w-full sm:w-auto text-center text-xs sm:text-sm">
                Explore Runs
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
