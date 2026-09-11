export interface RunType {
  slug: string;
  name: string;
  distance: string;
  pace: string;
  meeting: string;
  time: string;
  schedule: string;
  overview: string;
  structure: string[];
  hero: string;
  formatImg: string;
}

const P = {
  a: "/photos/SnapInsta.to_749665105_18037222907815520_6383458047242768862_n.jpg",
  b: "/photos/SnapInsta.to_748985982_18037222781815520_1887800587334956759_n.jpg",
  c: "/photos/SnapInsta.to_748070875_18037222835815520_1503705550880001620_n.jpg",
  d: "/photos/SnapInsta.to_749567025_18037222802815520_4849214195941431927_n.jpg",
  e: "/photos/SnapInsta.to_729540015_18035340809815520_4338465274389984729_n.jpg",
};

export const RUNS_CATALOG: Record<string, RunType> = {
  "easy-social-run": {
    slug: "easy-social-run",
    name: "Easy / Social Run",
    distance: "5.00 KM",
    pace: "Conversational & Social (6:30 - 7:30 /km)",
    meeting: "Rubia Café, Kimihurura",
    time: "06:30 AM",
    schedule: "Every Sunday",
    overview:
      "A gentle jog about connecting, talking and sharing the process together. Ideals for everyone to have a great fitness level.",
    structure: [
      "06:20 AM — Arrival at Rubia Café & Introductions",
      "06:30 AM — Dynamic group warm-up & briefing",
      "06:40 AM — 5km conversational jog through Kigali",
      "07:25 AM — Group stretch & post-run coffee at Rubia Café",
    ],
    hero: P.a,
    formatImg: P.b,
  },
  "tempo-run": {
    slug: "tempo-run",
    name: "Tempo Run",
    distance: "6.00 - 8.00 KM",
    pace: "Controlled Threshold (5:00 - 5:45 /km)",
    meeting: "Rubia Café, Kimihurura",
    time: "06:30 AM",
    schedule: "Weekly Session",
    overview:
      "A structured, more intense running session to develop running capacity, increase running speeds and test your limits.",
    structure: [
      "06:20 AM — Check-in at Rubia Café",
      "06:30 AM — Dynamic mobility & progressive warm-up",
      "06:40 AM — Structured tempo intervals and sustained threshold blocks",
      "07:30 AM — Recovery cool-down & coffee connection",
    ],
    hero: P.b,
    formatImg: P.c,
  },
  "long-run": {
    slug: "long-run",
    name: "Long Run",
    distance: "8.00 - 12.00 KM",
    pace: "Steady Aerobic Base (5:45 - 6:45 /km)",
    meeting: "Rubia Café, Kimihurura",
    time: "06:30 AM",
    schedule: "Weekly Session",
    overview:
      "A longer distance session aimed at developing endurance and endurance for larger running goals, whether this be your first 10K or a marathon.",
    structure: [
      "06:20 AM — Crew meet-up at Rubia Café",
      "06:30 AM — Briefing & pace group lineup",
      "06:40 AM — Extended route across Kigali ridges and hills",
      "07:45 AM — Post-run hydration, mobility stretch & coffee",
    ],
    hero: P.c,
    formatImg: P.d,
  },
  "track-speed-run": {
    slug: "track-speed-run",
    name: "Track / Speed Run",
    distance: "5.00 - 7.00 KM",
    pace: "Fast Intervals & Sprint Pacing",
    meeting: "Rubia Café, Kimihurura",
    time: "06:30 AM",
    schedule: "Weekly Session",
    overview:
      "Focused intervals at increasing speed with the aim of enhancing pace and running efficiency and overall performance.",
    structure: [
      "06:20 AM — Warm-up arrival & shoe tie",
      "06:30 AM — Activation drills, stride work & technique coaching",
      "06:45 AM — High-intensity interval sets with recovery recoveries",
      "07:30 AM — Full cool-down routine & Rubia Café social",
    ],
    hero: P.d,
    formatImg: P.e,
  },
  "fartlek-run": {
    slug: "fartlek-run",
    name: "Fartlek Run",
    distance: "5.00 - 6.50 KM",
    pace: "Dynamic Speedplay (Alternating Paces)",
    meeting: "Rubia Café, Kimihurura",
    time: "06:30 AM",
    schedule: "Weekly Session",
    overview:
      "A workout which alternates between high intensity and easy recovery paced running. The aim of the run is to improve speed, endurance and adaptability while maintaining the run fun and dynamic.",
    structure: [
      "06:20 AM — Gathering & crew briefing",
      "06:30 AM — Guided warm-up & speedplay instructions",
      "06:40 AM — Alternating high-intensity surges and easy recovery jogs",
      "07:25 AM — Group recovery stretches & morning brew",
    ],
    hero: P.e,
    formatImg: P.a,
  },
};

// Aliases for backwards compatibility with earlier links
RUNS_CATALOG["city-run"] = RUNS_CATALOG["easy-social-run"];
RUNS_CATALOG["sunday-social"] = RUNS_CATALOG["easy-social-run"];
