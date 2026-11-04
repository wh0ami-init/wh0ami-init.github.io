import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { site, projects } from "../data";
import { scrollToTarget } from "../scroll";
import Photo from "./Photo";
import Marquee from "./Marquee";
import Magnetic from "./Magnetic";

export default function Hero({ ready }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Intro: text lines rise, photo is revealed, details fade in.
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".h-title .line > span", {
          yPercent: 120,
          duration: 1.3,
          stagger: 0.12,
        })
          .from(
            ".hero-photo-frame",
            {
              clipPath: "inset(100% 0% 0% 0%)",
              duration: 1.5,
              ease: "power4.inOut",
            },
            0.1
          )
          .from(
            ".hero-photo-inner",
            { scale: 1.45, duration: 1.9, ease: "power3.out" },
            0.1
          )
          .from(
            ".hero-eyebrow, .hero-sub, .hero-cta > *, .hero-meta > *",
            { y: 28, opacity: 0, duration: 1, stagger: 0.08 },
            0.5
          )
          .from(".corner", { opacity: 0, scale: 0.4, duration: 0.8, stagger: 0.08 }, 1.1)
          .from(
            ".photo-card",
            { y: 40, opacity: 0, duration: 1.1, ease: "power3.out" },
            1.0
          )
          .from(
            ".photo-chip",
            { y: 24, opacity: 0, scale: 0.9, duration: 1, stagger: 0.15, ease: "back.out(1.5)" },
            1.25
          )
          .from(
            ".stat-num",
            {
              textContent: 0,
              duration: 1.4,
              ease: "power2.out",
              snap: { textContent: 1 },
            },
            1.4
          )
          .from(".ridge", { yPercent: 30, opacity: 0, duration: 1.6, stagger: 0.15 }, 0.2)
          .from(".marquee", { opacity: 0, y: 20, duration: 1 }, 1);

        // Parallax while scrolling away from the hero.
        const st = {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        gsap.to(".hero-photo-inner", { yPercent: 6, ease: "none", scrollTrigger: st });
        gsap.to(".hero-text", { yPercent: -12, opacity: 0.2, ease: "none", scrollTrigger: st });
        gsap.to(".ridge-1", { yPercent: -18, ease: "none", scrollTrigger: st });
        gsap.to(".ridge-2", { yPercent: -9, ease: "none", scrollTrigger: st });
        gsap.to(".photo-chip.chip-status", { yPercent: -40, ease: "none", scrollTrigger: st });
        gsap.to(".photo-chip.chip-stat", { yPercent: -20, ease: "none", scrollTrigger: st });

        // A small pointer parallax adds depth without competing with scroll motion.
        const photoFrame = root.current.querySelector(".hero-photo-frame");
        const photoImage = root.current.querySelector(".hero-photo-inner img");

        if (photoFrame && photoImage) {
          const moveX = gsap.quickTo(photoImage, "x", {
            duration: 0.8,
            ease: "power3.out",
          });
          const moveY = gsap.quickTo(photoImage, "y", {
            duration: 0.8,
            ease: "power3.out",
          });

          const tiltX = gsap.quickTo(photoFrame, "rotationY", { duration: 0.9, ease: "power3.out" });
          const tiltY = gsap.quickTo(photoFrame, "rotationX", { duration: 0.9, ease: "power3.out" });
          gsap.set(photoFrame, { transformPerspective: 1100 });

          const onPointerMove = (event) => {
            if (event.pointerType !== "mouse") return;

            const bounds = photoFrame.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            moveX(x * -14);
            moveY(y * -14);
            tiltX(x * 6);
            tiltY(y * -6);
          };
          const resetPhoto = () => {
            moveX(0);
            moveY(0);
            tiltX(0);
            tiltY(0);
          };

          photoFrame.addEventListener("pointermove", onPointerMove);
          photoFrame.addEventListener("pointerleave", resetPhoto);

          return () => {
            photoFrame.removeEventListener("pointermove", onPointerMove);
            photoFrame.removeEventListener("pointerleave", resetPhoto);
          };
        }
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-glow" />
        <svg
          className="ridge ridge-1"
          viewBox="0 0 1440 360"
          preserveAspectRatio="none"
        >
          <path d="M0,250 L110,190 L190,225 L320,120 L420,200 L540,70 L640,170 L760,110 L870,210 L990,130 L1100,215 L1230,150 L1340,225 L1440,185 L1440,360 L0,360 Z" />
        </svg>
        <svg
          className="ridge ridge-2"
          viewBox="0 0 1440 360"
          preserveAspectRatio="none"
        >
          <path d="M0,290 L140,235 L240,270 L370,200 L480,262 L610,170 L720,250 L850,195 L960,270 L1090,205 L1210,265 L1330,225 L1440,270 L1440,360 L0,360 Z" />
        </svg>
      </div>

      <div className="wrap hero-grid">
        <div className="hero-text">
          <p className="hero-eyebrow eyebrow">
            <b className={site.available ? "dot on" : "dot"} />
            {site.available ? "Open for new projects" : "Currently busy"}
            <span>·</span>
            {site.location}
          </p>

          <h1 className="h-title">
            <span className="line">
              <span>I build websites</span>
            </span>
            <span className="line">
              <span>that bring you</span>
            </span>
            <span className="line">
              <span>
                <em>customers.</em>
              </span>
            </span>
          </h1>

          <p className="hero-sub">
            Hi, I'm {site.name}, a {site.role.toLowerCase()} from{" "}
            {site.location}. I use AI together with real coding skills to build
            fast, modern websites for local businesses, homestays and cafés.
          </p>

          <div className="hero-cta">
            <Magnetic>
              <a
                className="btn btn-primary"
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("#work");
                }}
              >
                See my work <span aria-hidden="true">↗</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                className="btn btn-ghost"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("#contact");
                }}
              >
                Start a project
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="hero-photo">
          <div className="hero-photo-frame">
            <div className="hero-photo-inner">
              <Photo />
            </div>
            <div className="photo-shade" aria-hidden="true" />
            <span className="corner tl" aria-hidden="true" />
            <span className="corner tr" aria-hidden="true" />
          </div>

          <div className="photo-card">
            <span className="photo-card-name">{site.name}</span>
            <span className="photo-card-role">
              {site.role} · {site.location}
            </span>
          </div>

          <div className="photo-chip chip-status">
            <b className={site.available ? "dot on" : "dot"} />
            {site.available ? "Available for work" : "Currently busy"}
          </div>
          <div className="photo-chip chip-stat">
            <strong>
              <span className="stat-num">{projects.length}</span>+
            </strong>
            Live projects
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}