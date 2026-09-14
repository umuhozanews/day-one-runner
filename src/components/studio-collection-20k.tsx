import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, ExternalLink, ArrowRight, Check, ShieldCheck, Flame } from "lucide-react";

export type StudioTee = {
  id: string;
  name: string;
  statement: string;
  colorName: string;
  colorHex: string;
  frontImg: string;
  backImg?: string;
  actionImg?: string;
  price: string;
  tag: string;
  description: string;
};

export const STUDIO_20K_TEES: StudioTee[] = [
  {
    id: "tshirt-black",
    name: "Vision Club \"Own Lane\" T-Shirt",
    statement: "OWN LANE. OWN PACE. OWN RACE.",
    colorName: "Obsidian Black",
    colorHex: "#111111",
    frontImg: "/merches/pixieset/vrc-tee-black-front-standing.jpg",
    backImg: "/merches/pixieset/vrc-tee-black-olive-backs.jpg",
    actionImg: "/merches/pixieset/vrc-tee-bw-editorial-duo.jpg",
    price: "20,000 FRW",
    tag: "Official 20k Merch",
    description: "Heavyweight 240 GSM boxy cotton tee in Obsidian Black. Front chest Vision Run Club print with iconic back typography: 'Own Lane. Own Pace. Own Race. — Born in the Land of a Thousand Hills'.",
  },
  {
    id: "tshirt-white",
    name: "Vision Club \"Nightclubs\" T-Shirt",
    statement: "RUN CLUBS ARE THE NEW NIGHTCLUBS",
    colorName: "Summit White",
    colorHex: "#f8f9fa",
    frontImg: "/merches/pixieset/vrc-tee-white-red-front.jpg",
    backImg: "/merches/pixieset/vrc-tee-white-back-nightclubs-pink-front.jpg",
    actionImg: "/merches/pixieset/vrc-tee-white-red-action.jpg",
    price: "20,000 FRW",
    tag: "Bestseller",
    description: "Crisp Summit White heavyweight tee with vibrant Crimson Red Vision Run Club chest logo and bold red statement back graphic.",
  },
  {
    id: "tshirt-olive",
    name: "Vision Club \"Love Language\" T-Shirt",
    statement: "RUNNING IS AWFUL I LOVE IT.",
    colorName: "Forest Olive",
    colorHex: "#636c53",
    frontImg: "/merches/pixieset/vrc-tee-olive-front-standing.jpg",
    backImg: "/merches/pixieset/vrc-tee-trio-black-grey-olive.jpg",
    actionImg: "/merches/pixieset/vrc-tee-olive-front-seated.jpg",
    price: "20,000 FRW",
    tag: "Studio Edition",
    description: "Earthy Forest Olive heavyweight cotton tee featuring crisp white front chest branding and the runners' duality: 'Running is Awful, I Love It / Running is My Love Language'.",
  },
  {
    id: "tshirt-grey",
    name: "Vision Club \"Running Era\" T-Shirt",
    statement: "IN MY RUNNING ERA",
    colorName: "Heather Grey",
    colorHex: "#b5b7b9",
    frontImg: "/merches/pixieset/vrc-tee-grey-front.jpg",
    backImg: "/merches/pixieset/vrc-tee-grey-running-era-back.jpg",
    actionImg: "/merches/pixieset/vrc-tee-grey-black-duo.jpg",
    price: "20,000 FRW",
    tag: "Retro 70s Typography",
    description: "Heather Grey oversized street-to-track tee with retro 70s wavy typography: 'In My Running Era' on back and clean Vision Club front branding.",
  },
  {
    id: "tshirt-pink",
    name: "Vision Club Signature T-Shirt",
    statement: "VISION RUN CLUB KIGALI",
    colorName: "Blush Pink",
    colorHex: "#f5cad4",
    frontImg: "/merches/pixieset/vrc-tee-pink-front.jpg",
    backImg: "/merches/pixieset/vrc-tee-crew-all-colorways.jpg",
    actionImg: "/merches/pixieset/vrc-tee-crew-candid.jpg",
    price: "20,000 FRW",
    tag: "Pastel Fresh Edition",
    description: "Pastel Blush Pink heavyweight tee featuring crisp white minimalist chest branding. Cut for morning loops, post-run coffees, and everyday movement.",
  },
];

const LOOKBOOK_PHOTOS = [
  {
    url: "/merches/pixieset/vrc-tee-crew-all-colorways.jpg",
    caption: "The Full Vision Run Club Crew in all 5 T-Shirt Colorways",
  },
  {
    url: "/merches/pixieset/vrc-tee-black-olive-backs.jpg",
    caption: "Back Statement Typography — 'Own Lane' & 'Love Language'",
  },
  {
    url: "/merches/pixieset/vrc-tee-white-red-action.jpg",
    caption: "High Energy Movement — Kigali Runners in Motion",
  },
  {
    url: "/merches/pixieset/vrc-tee-bw-editorial-duo.jpg",
    caption: "Black & White Studio Editorial Duo",
  },
  {
    url: "/merches/pixieset/vrc-tee-grey-running-era-back.jpg",
    caption: "Heather Grey 'In My Running Era' Statement",
  },
  {
    url: "/merches/pixieset/vrc-tee-crew-candid.jpg",
    caption: "Vision Run Club Community Culture",
  },
];

export function StudioCollection20k() {
  const [activeTeeId, setActiveTeeId] = useState<string>(STUDIO_20K_TEES[0].id);
  const activeTee = STUDIO_20K_TEES.find((t) => t.id === activeTeeId) || STUDIO_20K_TEES[0];
  const [viewAngle, setViewAngle] = useState<"front" | "back" | "action">("front");

  const currentImg =
    viewAngle === "back" && activeTee.backImg
      ? activeTee.backImg
      : viewAngle === "action" && activeTee.actionImg
      ? activeTee.actionImg
      : activeTee.frontImg;

  return (
    <section className="relative border-t border-border bg-[#0a0a0a] px-4 py-16 text-white sm:px-6 sm:py-24 md:px-8 md:py-32 overflow-hidden">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#ff0000]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-white/10 blur-[140px]" />

      <div className="mx-auto max-w-[1400px]">
        {/* Header with Pixieset Badge */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8 sm:pb-12">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="tech text-xs uppercase tracking-widest text-[#ff0000] flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-[#ff0000]" />
                <span>20,000 FRW Studio Collection</span>
              </span>
              <span className="tech rounded-full border border-white/20 bg-white/5 px-3 py-0.5 text-[0.65rem] text-white/70">
                Photographed by Lanez Arts
              </span>
            </div>
            <h2 className="display text-3xl sm:text-5xl md:text-7xl">
              20k Statement Tees
            </h2>
            <p className="max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed">
              Boxy heavyweight silhouettes, bold typography, and Rwandan street-to-track culture.
              Each piece is crafted in 240 GSM combed cotton with statement prints born in the Land of a Thousand Hills.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://lanezarts.pixieset.com/visionrunclub/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-[#ff0000] hover:bg-[#ff0000] hover:text-white"
            >
              <span>View Original Pixieset Gallery</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              to="/checkout"
              search={{ item: activeTee.id }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#ff0000] px-6 py-3 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#0a0a0a]"
            >
              <span>Order for 20,000 FRW</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Big Interactive Showcase: Left Hero Visual, Right Product Selector */}
        <div className="mt-10 sm:mt-16 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Main Visual Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative group aspect-[4/5] sm:aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/15 bg-neutral-900 shadow-2xl">
              <img
                key={currentImg}
                src={currentImg}
                alt={activeTee.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Tag & statement overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="tech rounded-full bg-[#ff0000] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white shadow">
                  {activeTee.tag}
                </span>
                <span className="tech rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs text-white border border-white/15">
                  {activeTee.price}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 space-y-1 text-white">
                <span className="tech text-xs text-[#ff0000] uppercase tracking-wider">
                  Statement Print
                </span>
                <h3 className="display text-xl sm:text-3xl text-white">
                  "{activeTee.statement}"
                </h3>
                <p className="text-xs text-white/70 line-clamp-1">{activeTee.description}</p>
              </div>
            </div>

            {/* Angle Switcher Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <span className="tech text-[0.7rem] text-white/50">Angle View:</span>
                <button
                  type="button"
                  onClick={() => setViewAngle("front")}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                    viewAngle === "front"
                      ? "bg-[#ff0000] text-white"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  Front Chest Logo
                </button>
                {activeTee.backImg && (
                  <button
                    type="button"
                    onClick={() => setViewAngle("back")}
                    className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                      viewAngle === "back"
                        ? "bg-[#ff0000] text-white"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    Statement Back
                  </button>
                )}
                {activeTee.actionImg && (
                  <button
                    type="button"
                    onClick={() => setViewAngle("action")}
                    className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                      viewAngle === "action"
                        ? "bg-[#ff0000] text-white"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    Editorial Shoot
                  </button>
                )}
              </div>

              <Link
                to="/checkout"
                search={{ item: activeTee.id }}
                className="tech text-xs font-bold text-[#ff0000] hover:text-white transition-colors flex items-center gap-1"
              >
                Buy this tee ({activeTee.price}) &rarr;
              </Link>
            </div>
          </div>

          {/* Colorway & Statement Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1 mb-2">
              <span className="tech text-xs text-[#ff0000]">Select Statement &amp; Colorway</span>
              <h3 className="display text-2xl text-white">5 Official Colorways</h3>
            </div>

            <div className="space-y-3">
              {STUDIO_20K_TEES.map((tee) => {
                const isSelected = activeTee.id === tee.id;
                return (
                  <div
                    key={tee.id}
                    onClick={() => {
                      setActiveTeeId(tee.id);
                      setViewAngle("front");
                    }}
                    className={`group relative flex items-center justify-between rounded-2xl border p-3.5 sm:p-4 text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#ff0000] bg-white/10 ring-2 ring-[#ff0000]/40 shadow-lg"
                        : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-black">
                        <img src={tee.frontImg} alt={tee.name} className="h-full w-full object-cover" />
                        <span
                          className="absolute bottom-1 right-1 h-3 w-3 rounded-full border border-white/40"
                          style={{ backgroundColor: tee.colorHex }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-semibold text-white">{tee.name}</span>
                        </div>
                        <p className="tech text-[0.7rem] text-[#ff0000] font-medium mt-0.5">
                          "{tee.statement}"
                        </p>
                        <p className="tech text-[0.65rem] text-white/50 mt-0.5">
                          Color: {tee.colorName} · 240 GSM Cotton
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0 ml-2">
                      <span className="display text-sm sm:text-base text-white">{tee.price}</span>
                      <Link
                        to="/checkout"
                        search={{ item: tee.id }}
                        onClick={(e) => e.stopPropagation()}
                        className={`rounded-full px-3 py-1 text-[0.7rem] font-bold transition-all ${
                          isSelected
                            ? "bg-[#ff0000] text-white hover:bg-white hover:text-black"
                            : "bg-white/10 text-white/80 hover:bg-[#ff0000] hover:text-white"
                        }`}
                      >
                        Order
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quality badge card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs space-y-2 text-white/80">
              <div className="flex items-center gap-2 text-white font-semibold">
                <ShieldCheck className="h-4 w-4 text-[#ff0000]" />
                <span>Kigali Studio Quality Specs</span>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-[0.7rem] text-white/70">
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-[#ff0000]" />
                  <span>240 GSM Combed Cotton</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-[#ff0000]" />
                  <span>Structured Mock-Neck</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-[#ff0000]" />
                  <span>Unisex Oversized Fit</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-[#ff0000]" />
                  <span>Sunday Run Pickup or Delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Editorial Photo Strip Lookbook from Pixieset */}
        <div className="mt-16 sm:mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="tech text-xs text-[#ff0000] uppercase tracking-wider">
                Pixieset Editorial Lookbook
              </span>
              <h3 className="display text-2xl sm:text-4xl text-white mt-1">
                Vision Run Club Shoot Moments
              </h3>
            </div>
            <a
              href="https://lanezarts.pixieset.com/visionrunclub/"
              target="_blank"
              rel="noreferrer"
              className="tech text-xs text-[#ff0000] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore All 16 High-Res Photos</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {LOOKBOOK_PHOTOS.map((item, idx) => (
              <div
                key={idx}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
              >
                <img
                  src={item.url}
                  alt={item.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[0.65rem] font-medium text-white line-clamp-2 leading-tight">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
