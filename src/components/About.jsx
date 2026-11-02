import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { about } from "../data";

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

        <p className="about-text">
          {words.map((w, i) => (
            <span className="w" key={i}>
              {w}{" "}
            </span>
          ))}
        </p>

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
