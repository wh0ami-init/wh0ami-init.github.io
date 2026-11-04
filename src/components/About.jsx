import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { about, site } from "../data";
import Photo from "./Photo";

export default function About() {
  const root = useRef(null);
  const words = about.text.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Words light up one by one as you scroll.
        gsap.fromTo(
          ".about-text .w",
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".about-text",
              start: "top 78%",
              end: "bottom 45%",
              scrub: true,
            },
          }
        );

        // Portrait: curtain reveal, then a slow zoom-out while scrolling past.
        gsap.from(".about-portrait-frame", {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { trigger: ".about-portrait", start: "top 82%" },
        });
        gsap.fromTo(
          ".about-portrait img",
          { scale: 1.3, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-portrait",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        gsap.from(".about-portrait-cap > *", {
          y: 20,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-portrait", start: "top 70%" },
        });

        gsap.from(".fact", {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".facts", start: "top 88%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section className="section about" id="about" ref={root}>
      <div className="wrap">
        <p className="eyebrow" data-fade>
          <b className="dot on" /> About me
        </p>

        <div className="about-grid">
          <figure className="about-portrait">
            <div className="about-portrait-frame">
              <Photo />
            </div>
            <figcaption className="about-portrait-cap">
              <span className="cap-name">{site.name}</span>
              <span className="cap-role">{site.role}</span>
            </figcaption>
          </figure>

          <p className="about-text">
            {words.map((w, i) => (
              <span className="w" key={i}>
                {w}{" "}
              </span>
            ))}
          </p>
        </div>

        <dl className="facts">
          {about.facts.map((f) => (
            <div className="fact" key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}