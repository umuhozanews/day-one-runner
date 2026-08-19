export interface RunningRoute {
  slug: string;
  name: string;
  distance: string;
  elevation: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  surface: string;
  startPoint: string;
  description: string;
  highlights: string[];
  tips: string[];
  heroImg: string;
}

export const KIGALI_ROUTES: Record<string, RunningRoute> = {
  "car-free-zone": {
    slug: "car-free-zone",
    name: "Kigali Car Free Zone 5K Loop",
    distance: "5.00 KM",
    elevation: "+65m",
    difficulty: "Easy",
    surface: "Smooth Pavement & Cobblestone",
    startPoint: "Car Free Zone / KN 4 Ave, Central Kigali",
    description:
      "A fast, scenic urban loop through the vibrant heart of downtown Kigali. Completely pedestrianized sections provide smooth footing, clean city air, and sweeping morning vistas before city traffic stirs.",
    highlights: [
      "100% vehicle-free central corridor",
      "Wide sidewalks and well-lit morning streets",
      "Gentle rolling elevation ideal for all paces",
      "Prime coffee spots for post-run recovery",
    ],
    tips: [
      "Best run at sunrise (06:00 - 07:00 AM) when the city air is freshest.",
      "Wear standard road running shoes.",
      "Water station available at the finish circle.",
    ],
    heroImg: "/photos/SnapInsta.to_749665105_18037222907815520_6383458047242768862_n.jpg",
  },
  "convention-centre-loop": {
    slug: "convention-centre-loop",
    name: "Kigali Convention Centre 7.5K Loop",
    distance: "7.50 KM",
    elevation: "+120m",
    difficulty: "Moderate",
    surface: "Asphalt & Wide Paved Shoulders",
    startPoint: "Kigali Convention Centre, KG 2 Roundabout",
    description:
      "An iconic Kigali loop circling the dome of the Convention Centre, passing through Kimihurura and Kacyiru. Features rolling inclines that build endurance and strength.",
    highlights: [
      "Panoramic views of the Kigali cityscape and valleys",
      "Clean, modern boulevards with protected pedestrian ways",
      "Moderate hill climbs that build natural strength",
      "Popular gathering spot for local athletic communities",
    ],
    tips: [
      "Pace yourself on the Kimihurura ascent during the middle 2km.",
      "Hydration is key due to moderate altitude (1,520m).",
      "Ample parking available near the Convention Centre grounds.",
    ],
    heroImg: "/photos/SnapInsta.to_748070875_18037222835815520_1503705550880001620_n.jpg",
  },
  "nyarutarama-lake": {
    slug: "nyarutarama-lake",
    name: "Nyarutarama Lake & Golf Course 6K Trail",
    distance: "6.00 KM",
    elevation: "+85m",
    difficulty: "Easy",
    surface: "Packed Dirt & Paved Trails",
    startPoint: "Nyarutarama Tennis Club & Lake Promenade",
    description:
      "A lush, green nature escape wrapped around Lake Nyarutarama and the perimeter of the Kigali Golf Course. Peaceful tree-lined paths and tranquil waters make this Kigali's favorite morning trail.",
    highlights: [
      "Breathtaking wetland and bird-watching scenery",
      "Soft dirt track sections that are gentle on joints",
      "Lush greenery and cool morning microclimate",
      "Serene escape from urban traffic",
    ],
    tips: [
      "Great for recovery runs and conversational pace sessions.",
      "Trail shoes or road-to-trail hybrids work best during wet mornings.",
      "Watch out for early morning birdlife along the boardwalk.",
    ],
    heroImg: "/photos/SnapInsta.to_748985982_18037222781815520_1887800587334956759_n.jpg",
  },
  "kimihurura-ridge": {
    slug: "kimihurura-ridge",
    name: "Kimihurura Ridge & Viewpoint 8.5K",
    distance: "8.50 KM",
    elevation: "+160m",
    difficulty: "Challenging",
    surface: "Smooth Tarmac & Clean Sidewalks",
    startPoint: "Kimihurura Heights / KG 4 Ave",
    description:
      "For runners seeking elevation and panoramic skyline views. This route follows the crest of Kimihurura ridge, offering 360-degree views across Kigali's thousand hills before dropping into scenic residential avenues.",
    highlights: [
      "Exceptional viewpoint overlooking the city bowl",
      "Sustained moderate climbs for cardio conditioning",
      "Quiet, leafy diplomatic residential avenues",
      "Cool breeze along the high ridge",
    ],
    tips: [
      "Take the first kilometer slow to acclimate to the continuous uphill.",
      "Carry a handheld water flask for the longer duration.",
      "Finish with a post-run smoothie at local cafes nearby.",
    ],
    heroImg: "/photos/SnapInsta.to_749567025_18037222802815520_4849214195941431927_n.jpg",
  },
  "remera-stadium-loop": {
    slug: "remera-stadium-loop",
    name: "Amahoro Stadium & Remera Circuit 5.5K",
    distance: "5.50 KM",
    elevation: "+55m",
    difficulty: "Easy",
    surface: "Wide Asphalt & Stadium Concourse",
    startPoint: "Amahoro National Stadium Gate, Remera",
    description:
      "A fast, flat-to-rolling circuit encircling the newly modernized Amahoro Stadium precinct and BK Arena sports district. Wide avenues and vibrant athletic energy inspire fast paces.",
    highlights: [
      "Ultra-wide pedestrian concourses around BK Arena",
      "Flat stretches suitable for speedwork & tempo paces",
      "High energy sports district atmosphere",
      "Secure and bustling with fellow runners and cyclists",
    ],
    tips: [
      "Ideal for beginners wanting flat, predictable terrain.",
      "Multiple water stops and convenience shops along the route.",
    ],
    heroImg: "/photos/SnapInsta.to_729540015_18035340809815520_4338465274389984729_n.jpg",
  },
  "mount-kigali-trail": {
    slug: "mount-kigali-trail",
    name: "Mount Kigali Ascent 10K Challenge",
    distance: "10.00 KM",
    elevation: "+340m",
    difficulty: "Challenging",
    surface: "Cobblestone, Tarmac & Compact Earth",
    startPoint: "Nyamirambo Stadium / Mount Kigali Base",
    description:
      "The definitive hill test in Rwanda's capital. Ascending through eucalyptus forests and pine ridges up Mount Kigali rewards runners with unbeatable sunset and sunrise panoramas of the Nyabarongo River valley.",
    highlights: [
      "Epic 340-meter vertical climb for mountain running enthusiasts",
      "Pine forest scent and unpaved country trails at the summit",
      "Unmatched vistas over Kigali and the surrounding hills",
      "Pure trail running feel within minutes of the city",
    ],
    tips: [
      "Run with a buddy or the club crew for maximum safety and encouragement.",
      "Wear shoes with grippy outsoles for dirt tracks.",
      "Bring at least 750ml of water and electrolyte tablets.",
    ],
    heroImg: "/photos/SnapInsta.to_731093748_18035341016815520_3372942038985659629_n.jpg",
  },
};
