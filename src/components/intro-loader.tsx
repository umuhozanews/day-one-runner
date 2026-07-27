import { useEffect, useRef, useState } from "react";

/**
 * Opening preloader curtain:
 * Black background with animated logo + white "VISION RUN CLUB" text, featuring interactive
 * 3D mouse parallax & curtain wipe effects before revealing the main landing page.
 */
const WORDS = ["VISION", "RUN", "CLUB"];

export function IntroLoader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      return;
    }

    window.scrollTo(0, 0);
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    let cleanup = () => {};

    (async () => {
      const { default: gsap } = await import("gsap");

      const ctx = gsap.context(() => {
        const finish = () => {
          html.style.overflow = prevOverflow;
          setDone(true);
        };

        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });

        tl.set(".intro-logo", { scale: 0.5, opacity: 0, y: 35, rotate: -12 });
        tl.set(".intro-word", { yPercent: 130, opacity: 0, scale: 0.9, rotateX: 25 });
        tl.set(".intro-sub", { opacity: 0, y: 20 });
        tl.set(".intro-bar", { scaleX: 0, transformOrigin: "center center" });

        // Staggered entrance of logo + text
        tl.to(
          ".intro-logo",
          { scale: 1, opacity: 1, y: 0, rotate: 0, duration: 1.15, ease: "back.out(1.7)" },
          0.1,
        );
        tl.to(
          ".intro-word",
          { yPercent: 0, opacity: 1, scale: 1, rotateX: 0, duration: 1.1, stagger: 0.14, ease: "power4.out" },
          0.25,
        );
        tl.to(".intro-sub", { opacity: 1, y: 0, duration: 0.7 }, 0.85);
        tl.to(".intro-bar", { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 0.5);

        // Hold frame
        tl.to({}, { duration: 0.65 });

        // Exit parallax animation: logo scales & lifts, text wipes up, curtain slides off
        tl.to(".intro-logo", { scale: 1.25, opacity: 0, y: -60, duration: 0.65, ease: "power3.in" }, ">-0.1");
        tl.to(".intro-word", { yPercent: -140, opacity: 0, duration: 0.75, stagger: 0.05, ease: "power3.in" }, "<");
        tl.to(".intro-sub", { opacity: 0, y: -30, duration: 0.4 }, "<");
        tl.to(".intro-bar", { scaleX: 0, duration: 0.4 }, "<");
        tl.to(
          ".intro-panel",
          { yPercent: -100, duration: 1.1, ease: "power4.inOut" },
          ">-0.2",
        );
      }, rootRef);

      // Interactive 3D mouse tracking parallax on logo & words
      const handleMouseMove = (e: MouseEvent) => {
        if (!textGroupRef.current) return;
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;

        const logo = rootRef.current?.querySelector<HTMLElement>(".intro-logo");
        if (logo) {
          gsap.to(logo, {
            x: x * 35,
            y: y * 35,
            rotateX: -y * 16,
            rotateY: x * 16,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        const words = rootRef.current?.querySelectorAll<HTMLElement>(".intro-word");
        if (words) {
          words.forEach((word, idx) => {
            const depth = (idx + 1) * 20;
            gsap.to(word, {
              x: x * depth,
              y: y * depth,
              rotateX: -y * 12,
              rotateY: x * 12,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      cleanup = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        ctx.revert();
      };
    })();

    return () => {
      cleanup();
      html.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[200]">
      <div className="intro-panel relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black text-white">
        <div
          ref={textGroupRef}
          className="relative z-10 flex flex-col items-center px-6 text-center [perspective:1000px]"
        >
          {/* Animated Logo */}
          <div className="intro-logo mb-6 inline-block">
            <img
              src="/logo.png"
              alt="Vision Run Club Logo"
              className="h-20 w-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] md:h-28"
            />
          </div>

          <h1 className="display flex flex-wrap justify-center gap-x-[0.32em] gap-y-2 text-[15vw] font-bold uppercase tracking-tight text-white leading-[0.88] md:text-[9.5vw]">
            {WORDS.map((word) => (
              <span key={word} className="inline-block overflow-hidden pb-[0.12em] pt-[0.05em]">
                <span className="intro-word inline-block text-white">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p className="intro-sub tech mt-6 tracking-[0.25em] text-white/70">
            KIGALI · EVERY SUNDAY · 06:30
          </p>
          <div className="intro-bar mt-8 h-[2px] w-36 bg-white md:w-52" />
        </div>
      </div>
    </div>
  );
}


