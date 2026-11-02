import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { services } from "../data";

export default function Services() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".service", {
          y: 90,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: ".services-grid", start: "top 82%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  // A soft light follows the mouse inside each card.
  const spot = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className="section services" id="services" ref={root}>
      <div className="wrap">
        <p className="eyebrow" data-fade>
          <b className="dot on" /> What I do
        </p>
        <h2 className="sec-title" data-reveal>
          <span className="line">
            <span>Websites that work</span>
          </span>
          <span className="line">
            <span>
              for <em>your business.</em>
            </span>
          </span>
        </h2>

        <div className="services-grid">
          {services.map((s, i) => (
            <article className="service" key={s.title} onMouseMove={spot}>
              <span className="service-no">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
