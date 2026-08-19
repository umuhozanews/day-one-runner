import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";
const INSTAGRAM = "https://instagram.com/vision.runclub";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Join & Contact Vision Run Club — Kigali, Rwanda" },
      {
        name: "description",
        content:
          "Connect with Vision Run Club in Kigali, Rwanda. Register for free Sunday runs, find meeting locations, join our WhatsApp and Instagram community, or send an inquiry.",
      },
      { property: "og:title", content: "Contact & Join Vision Run Club Kigali" },
      {
        property: "og:description",
        content: "Register free and join our Sunday morning runs in Kigali, Rwanda.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[45vh] flex-col justify-end overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:min-h-[60vh] md:pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
          <span className="tech text-[#ff0000] text-xs">Connect With Us</span>
          <h1 className="display mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-8xl">Join the Club</h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-white/70 md:text-xl leading-relaxed">
            Have a question, want to partner, or ready to join your first Sunday run? Here is how
            to get in touch.
          </p>
        </div>
      </section>

      {/* Contact & Registration Options */}
      <section className="border-t border-border px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-6 sm:gap-12 md:grid-cols-2">
          {/* Direct Registration Box */}
          <div className="rounded-2xl sm:rounded-3xl border border-border bg-card/60 p-5 sm:p-8 md:p-12 flex flex-col justify-between">
            <div>
              <span className="tech text-xs text-[#ff0000]">Step 01</span>
              <h2 className="display mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl">Free Runner Registration</h2>
              <p className="mt-3 sm:mt-4 text-xs sm:text-base text-white/75 leading-relaxed">
                Sign up once through our official Google form to receive weekly route maps,
                meeting coordinates, and session updates.
              </p>
              <div className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/80">
                  <span className="tech text-[#ff0000]">◈</span>
                  <span>100% Free registration</span>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/80">
                  <span className="tech text-[#ff0000]">◈</span>
                  <span>Weekly location notifications</span>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/80">
                  <span className="tech text-[#ff0000]">◈</span>
                  <span>Open to all fitness and experience levels</span>
                </div>
              </div>
            </div>
            <a
              href={REGISTER}
              target="_blank"
              rel="noreferrer"
              className="snap-btn mt-6 sm:mt-8 w-full text-center text-xs sm:text-sm"
            >
              Open Google Registration Form →
            </a>
          </div>

          {/* Locations & Socials */}
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-2xl sm:rounded-3xl border border-border bg-card/60 p-5 sm:p-8">
              <span className="tech text-xs text-[#ff0000]">Locations</span>
              <h3 className="display mt-2 text-xl sm:text-2xl md:text-3xl">Meeting Points in Kigali</h3>
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/80">
                <div className="border-b border-border/50 pb-3 sm:pb-4">
                  <strong className="text-white block text-sm sm:text-base">Kigali Car Free Zone</strong>
                  <p className="text-white/60 mt-1">KN 4 Ave, Commercial District, Downtown Kigali</p>
                </div>
                <div>
                  <strong className="text-white block text-sm sm:text-base">Kigali Convention Centre</strong>
                  <p className="text-white/60 mt-1">KG 2 Roundabout, Kimihurura, Kigali</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-border bg-card/60 p-5 sm:p-8">
              <span className="tech text-xs text-[#ff0000]">Social &amp; Inquiries</span>
              <h3 className="display mt-2 text-xl sm:text-2xl md:text-3xl">Follow &amp; Message</h3>
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="snap-ghost text-xs sm:text-sm w-full sm:w-auto text-center"
                >
                  Instagram: @vision.runclub
                </a>
                <Link to="/faq" className="snap-ghost text-xs sm:text-sm w-full sm:w-auto text-center">
                  View FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
