import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { process } from "../data";

export default function Process() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The line draws itself as you scroll down the steps.
        gsap.fromTo(
          ".steps-line i",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".steps",
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
            },
          }
        );

        gsap.utils.toArray(".step").forEach((step) => {
          gsap.from(step, {
            x: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 82%" },
          });
          gsap.from(step.querySelector(".step-no"), {
            scale: 0.4,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(2)",
            scrollTrigger: { trigger: step, start: "top 82%" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section className="section process" id="process" ref={root}>
      <div className="wrap process-grid">
        <div className="process-intro">
          <p className="eyebrow" data-fade>
            <b className="dot on" /> How we work
          </p>
          <h2 className="sec-title" data-reveal>
            <span className="line">
              <span>Simple steps,</span>
            </span>
            <span className="line">
              <span>
                <em>no stress.</em>
              </span>
            </span>
          </h2>
          <p className="muted" data-fade>
            You do not need to know anything about technology. I explain every
            step in easy words.
          </p>
        </div>

        <ol className="steps">
          <li className="steps-line" aria-hidden="true">
            <i />
          </li>
          {process.map((s, i) => (
            <li className="step" key={s.title}>
              <span className="step-no">0{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
