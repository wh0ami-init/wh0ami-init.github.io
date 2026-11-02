import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "../data";
import { scrollToTarget } from "../scroll";

export default function Projects() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: the section pins and the cards slide sideways as you scroll down.
      mm.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = root.current.querySelector(".work-track");
          const pin = root.current.querySelector(".work-pin");
          const dist = () =>
            Math.max(0, track.scrollWidth - window.innerWidth + 120);

          const common = {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + dist(),
            scrub: 1,
            invalidateOnRefresh: true,
          };

          gsap.to(track, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: { ...common, pin, anticipatePin: 1 },
          });

          gsap.to(".work-progress i", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: common,
          });

          // The coloured visual inside every card drifts a little for depth.
          gsap.utils.toArray(".work-visual-inner").forEach((el) => {
            gsap.fromTo(
              el,
              { xPercent: -8 },
              {
                xPercent: 8,
                ease: "none",
                scrollTrigger: { ...common, scrub: true },
              }
            );
          });
        }
      );

      // Mobile: cards simply fade up one after another.
      mm.add(
        "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils.toArray(".work-card").forEach((card) => {
            gsap.from(card, {
              y: 60,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%" },
            });
          });
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section className="work" id="work" ref={root}>
      <div className="work-pin">
        <div className="wrap work-head">
          <div>
            <p className="eyebrow" data-fade>
              <b className="dot on" /> Selected work
            </p>
            <h2 className="sec-title" data-reveal>
              <span className="line">
                <span>
                  Things I've <em>built.</em>
                </span>
              </span>
            </h2>
          </div>
          <div className="work-progress" aria-hidden="true">
            <span>Scroll</span>
            <div>
              <i />
            </div>
          </div>
        </div>

        <div className="work-track">
          {projects.map((p) => (
            <article
              className="work-card"
              key={p.title}
              style={{ "--hue": p.hue }}
            >
              <div className="work-visual">
                <div className="work-visual-inner">
                  <span className="work-no">{p.no}</span>
                  <div className="mock">
                    <i />
                    <i />
                    <i />
                    <b />
                  </div>
                </div>
                <span className={"work-badge" + (p.live ? " live" : "")}>
                  {p.live && <b className="dot on" />}
                  {p.type}
                </span>
              </div>
              <div className="work-info">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <ul>
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                {p.url && (
                  <a
                    className="link-arrow"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit website <span>↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}

          <article className="work-card work-cta">
            <h3>
              Your business
              <br />
              <em>could be next.</em>
            </h3>
            <a
              className="btn btn-primary"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#contact");
              }}
            >
              Let's talk <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
