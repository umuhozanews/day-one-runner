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
  "city-run": {
    slug: "city-run",
    name: "City Run",
    distance: "5.00 KM",
    pace: "Conversational (6:00 - 7:30 /km) & Paced Groups",
    meeting: "Car Free Zone, Kigali",
    time: "06:30 AM",
    schedule: "Every 1st & 3rd Sunday",
    overview:
      "One pace, one community. Join the Vision Run Club crew for an easy, social 5km through the heart of Kigali before the city wakes — all paces and fitness levels welcome.",
    structure: [
      "06:20 AM — Arrival & Introductions",
      "06:30 AM — Guided dynamic warm-up & route briefing",
      "06:40 AM — 5km run across central Kigali avenues",
      "07:25 AM — Group cool-down stretch & post-run community coffee",
    ],
    hero: P.a,
    formatImg: P.b,
  },
  "long-run": {
    slug: "long-run",
    name: "Long Run",
    distance: "7.50 KM",
    pace: "Steady Endurance (5:45 - 7:00 /km)",
    meeting: "Kigali Convention Centre",
    time: "06:30 AM",
    schedule: "Every 2nd & 4th Sunday",
    overview:
      "Go a little further. A 7.5km loop from the Convention Centre at a relaxed, conversational pace — built for connection, endurance conditioning, and a clearer head by the finish.",
    structure: [
      "06:20 AM — Meet at Convention Centre roundabout",
      "06:30 AM — Warm-up & pace group organization",
      "06:40 AM — 7.5km loop through Kimihurura & Kacyiru",
      "07:35 AM — Hydration, recovery mobility & group photos",
    ],
    hero: P.c,
    formatImg: P.d,
  },
  "sunday-social": {
    slug: "sunday-social",
    name: "Sunday Sunrise Social",
    distance: "5.00 KM",
    pace: "Open / Walk-Run Friendly",
    meeting: "Rotating Kigali Landmarks",
    time: "06:30 AM",
    schedule: "Every Sunday Morning",
    overview:
      "Designed specifically for beginners, newcomers to Kigali, and casual runners who want to start their Sunday on the right foot without pressure.",
    structure: [
      "06:25 AM — Welcome circle for first-time runners",
      "06:35 AM — Guided 5K group run with dedicated back-markers",
      "07:20 AM — Post-run connection and community breakfast",
    ],
    hero: P.e,
    formatImg: P.a,
  },
};
