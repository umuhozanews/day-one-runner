import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Kigali Runner's Guide — Altitude, Hills & Running Tips | Vision Run Club" },
      {
        name: "description",
        content:
          "The complete guide to running in Kigali, Rwanda. Tips for managing altitude (1,500m+), hill training techniques, Kigali Car Free Days, safety, hydration, and best morning routes.",
      },
      { property: "og:title", content: "The Complete Guide to Running in Kigali, Rwanda" },
      {
        property: "og:description",
        content: "Altitude tips, hill running techniques, safety, and Kigali Car Free Day essentials.",
      },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[45vh] flex-col justify-end overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:min-h-[60vh] md:pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
          <span className="tech text-[#ff0000]">Community Knowledge Base</span>
          <h1 className="display mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-8xl">Kigali Runner's Guide</h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-white/70 md:text-xl leading-relaxed">
            Everything you need to know about running in the city of a thousand hills — from
            altitude adaptation and hill climbing mechanics to morning weather and safety.
          </p>
        </div>
      </section>

      {/* Main Guide Content */}
      <section className="border-t border-border px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-8 sm:gap-12 md:grid-cols-12">
          {/* Article Body */}
          <div className="md:col-span-8 space-y-10 sm:space-y-16">
            {/* Chapter 1: Altitude */}
            <article className="space-y-4 sm:space-y-6">
              <span className="tech text-xs text-[#ff0000]">Chapter 01</span>
              <h2 className="display text-2xl sm:text-3xl md:text-4xl">Running at 1,500m Altitude</h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Kigali sits at an average elevation of 1,520 meters (approx. 5,000 feet) above sea
                level. For runners new to the city or visiting from sea level, the thinner air means
                you may experience a higher heart rate and quicker breathlessness during the first 1–2
                weeks.
              </p>
              <div className="rounded-2xl border border-border bg-card/50 p-5 sm:p-6 space-y-3">
                <h4 className="font-semibold text-sm sm:text-base text-white">How to Acclimate:</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-white/70 list-disc list-inside leading-relaxed">
                  <li>Start by running by effort/heart rate rather than strict pace per km.</li>
                  <li>Increase your daily water and electrolyte intake before and after runs.</li>
                  <li>Incorporate 30-second walk breaks when cresting steep hills.</li>
                </ul>
              </div>
            </article>

            {/* Chapter 2: Hills */}
            <article className="space-y-4 sm:space-y-6 border-t border-border pt-8 sm:pt-12">
              <span className="tech text-xs text-[#ff0000]">Chapter 02</span>
              <h2 className="display text-2xl sm:text-3xl md:text-4xl">Mastering the Thousand Hills</h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Almost every route in Kigali involves gradients. Rather than resisting the hills,
                embrace them as built-in strength training that improves your running cadence, glute
                power, and overall cardiovascular fitness.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card/40 p-5 sm:p-6">
                  <h4 className="font-semibold text-sm sm:text-base text-white">Uphill Technique:</h4>
                  <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                    Shorten your stride, pump your arms forward and back, keep your chest open, and
                    focus your gaze 5–10 meters ahead rather than at your toes.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card/40 p-5 sm:p-6">
                  <h4 className="font-semibold text-sm sm:text-base text-white">Downhill Technique:</h4>
                  <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                    Avoid heavy heel braking. Lean slightly forward from your ankles, keep your knees
                    soft and springy, and maintain a quick, light turnover.
                  </p>
                </div>
              </div>
            </article>

            {/* Chapter 3: Car Free Days */}
            <article className="space-y-4 sm:space-y-6 border-t border-border pt-8 sm:pt-12">
              <span className="tech text-xs text-[#ff0000]">Chapter 03</span>
              <h2 className="display text-2xl sm:text-3xl md:text-4xl">Kigali Car Free Day</h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Rwanda hosts the world-famous <em>Kigali Car Free Day</em> twice a month on Sunday
                mornings from 07:00 AM to 10:00 AM. Major arterial roads across the capital are
                closed to motorized traffic, turning the city into a massive running and cycling haven.
              </p>
              <div className="rounded-2xl border border-border bg-card/50 p-5 sm:p-6">
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Vision Run Club runs every single Sunday, including Car Free Days! On Car Free
                  Sundays, we take full advantage of wide, traffic-free boulevards through the CBD,
                  Kimihurura, and Remera.
                </p>
              </div>
            </article>

            {/* Chapter 4: Safety & Etiquette */}
            <article className="space-y-4 sm:space-y-6 border-t border-border pt-8 sm:pt-12">
              <span className="tech text-xs text-[#ff0000]">Chapter 04</span>
              <h2 className="display text-2xl sm:text-3xl md:text-4xl">Safety, Lighting &amp; Etiquette</h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Kigali is widely recognized as one of the cleanest and safest metropolitan cities in
                Africa. Sidewalks are well-maintained and morning runners are a frequent, welcomed
                sight across all neighborhoods.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#ff0000] font-bold">✔</span>
                  <span><strong>Early Morning Start:</strong> 06:00 to 07:30 AM offers cool temperatures (17°C - 20°C) and minimal vehicle traffic.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#ff0000] font-bold">✔</span>
                  <span><strong>Sidewalks:</strong> Use designated pedestrian walkways where available, especially along major avenues.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#ff0000] font-bold">✔</span>
                  <span><strong>Clean City:</strong> Keep Kigali clean — never drop gel wrappers or bottle caps on the street.</span>
                </li>
              </ul>
            </article>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-8">
                <span className="tech text-xs text-[#ff0000]">Quick Links</span>
                <h3 className="display mt-2 text-xl sm:text-2xl">Explore More</h3>
                <div className="mt-4 flex flex-col gap-2.5 text-xs sm:text-sm text-white/80">
                  <Link to="/routes" className="hover:text-[#ff0000] transition-colors py-1 block">
                    → Curated Kigali Routes
                  </Link>
                  <Link to="/runs" className="hover:text-[#ff0000] transition-colors py-1 block">
                    → Weekly Run Formats
                  </Link>
                  <Link to="/schedule" className="hover:text-[#ff0000] transition-colors py-1 block">
                    → Sunday Schedule
                  </Link>
                  <Link to="/faq" className="hover:text-[#ff0000] transition-colors py-1 block">
                    → Frequently Asked Questions
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
                <span className="tech text-xs text-[#ff0000]">Join Us This Sunday</span>
                <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                  Ready to put these tips into practice? Join our crew next Sunday at 06:30 AM.
                </p>
                <a
                  href={REGISTER}
                  target="_blank"
                  rel="noreferrer"
                  className="snap-btn mt-4 w-full text-center text-xs sm:text-sm"
                >
                  Register Free
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
