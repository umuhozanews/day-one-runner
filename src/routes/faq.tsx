import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const REGISTER = "https://forms.gle/P4y9mZSforRjkpJA6";

const FAQ_ITEMS = [
  {
    q: "How much does it cost to join Vision Run Club?",
    a: "It is 100% free! There are no membership fees, monthly subscriptions, or ticket costs. Anyone can show up and run with us.",
  },
  {
    q: "What pace do people run?",
    a: "We cater to all paces. Our weekly runs feature multiple pacing groups ranging from steady endurance (5:45 min/km) to conversational paces (6:30 - 7:30 min/km), plus a walk-run friendly group. We always have dedicated back-markers so nobody is left behind.",
  },
  {
    q: "Do I need to register before attending my first run?",
    a: "Yes, we encourage you to fill out our quick free registration form once so we have your contact details for weekly meeting point announcements, safety briefings, and community updates.",
  },
  {
    q: "Where and when do we meet?",
    a: "We meet every Sunday morning at 06:20 AM for a 06:30 AM prompt start. Our primary alternating meeting points are the Kigali Car Free Zone (CBD) and the Kigali Convention Centre (KG 2 Roundabout).",
  },
  {
    q: "Can complete beginners join?",
    a: "Absolutely! Many of our active members started with zero running experience. The 5K City Run and Sunday Socials are specifically designed to be beginner-friendly.",
  },
  {
    q: "Is there a bag drop or secure place for my belongings?",
    a: "Yes, at most of our organized Sunday runs we have a designated support vehicle or secure check-in area where you can safely leave light bags, jackets, and car keys during the run.",
  },
  {
    q: "What should I wear and bring?",
    a: "Wear comfortable athletic clothing and supportive road running shoes. We recommend bringing a water bottle for pre/post-run hydration. If you run with a phone or keys, a running belt or pocket shorts are handy.",
  },
  {
    q: "What happens if it rains?",
    a: "Kigali's morning rain usually clears quickly. We run rain or shine unless severe weather poses a safety hazard, in which case announcements are posted to our Instagram (@vision.runclub).",
  },
  {
    q: "How do I add the Sunday runs to my calendar?",
    a: "You can visit our Schedule page or individual Run detail pages where you will find one-click 'Add to Google Calendar' buttons for all upcoming sessions.",
  },
  {
    q: "Can visiting tourists or business travelers join for just one weekend?",
    a: "Yes! We love welcoming visitors and travelers from around the world. Running with Vision Run Club is one of the best ways to experience Kigali's culture and sights.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions (FAQ) — Vision Run Club Kigali" },
      {
        name: "description",
        content:
          "Everything you need to know about joining Vision Run Club in Kigali, Rwanda: pacing groups, cost, meeting times, beginner tips, bag drop, and registration.",
      },
      { property: "og:title", content: "FAQ — Vision Run Club Kigali" },
      {
        property: "og:description",
        content: "Answers to common questions about our free Sunday running club in Kigali.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[45vh] flex-col justify-end overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 md:min-h-[60vh] md:pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
          <span className="tech text-[#ff0000] text-xs">Got Questions?</span>
          <h1 className="display mt-3 sm:mt-4 text-4xl sm:text-6xl md:text-8xl">Frequently Asked</h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-white/70 md:text-xl leading-relaxed">
            Here are the most common questions about joining our Sunday morning runs in Kigali,
            pacing, registration, gear, and logistics.
          </p>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="border-t border-border px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1000px]">
          <div className="divide-y divide-border border-y border-border">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="py-4 sm:py-6">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 sm:gap-6 text-left py-1"
                  >
                    <span className="text-base sm:text-xl md:text-2xl font-medium text-white">
                      {item.q}
                    </span>
                    <span
                      className={`text-xl sm:text-2xl text-[#ff0000] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "mt-3 sm:mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl text-xs sm:text-base text-white/75 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Still have questions? */}
          <div className="mt-12 sm:mt-16 rounded-2xl border border-border bg-card p-5 sm:p-8 text-center">
            <h3 className="display text-xl sm:text-2xl md:text-3xl">Still have a question?</h3>
            <p className="mt-2 text-xs sm:text-sm text-white/70">
              Reach out to us directly or fill out the registration form to connect with the team.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a href={REGISTER} target="_blank" rel="noreferrer" className="snap-btn w-full sm:w-auto text-center text-xs sm:text-sm">
                Register Free
              </a>
              <Link to="/contact" className="snap-ghost w-full sm:w-auto text-center text-xs sm:text-sm">
                Contact the Crew
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
