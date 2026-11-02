import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { site } from "../data";

export default function Preloader({ onDone }) {
  const root = useRef(null);
  const count = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        root.current.style.display = "none";
        onDone();
        return;
      }

      const num = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          root.current.style.display = "none";
        },
      });

      tl.from(".pre-label span", {
        yPercent: 110,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.1,
      })
        .to(
          num,
          {
            v: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
              count.current.textContent = String(Math.round(num.v)).padStart(
                3,
                "0"
              );
            },
          },
          0.2
        )
        .to(".pre-bar", { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0.2)
        .to(".pre-inner", { opacity: 0, y: -30, duration: 0.5 }, ">0.1")
        .add(onDone, ">-0.1")
        .to(root.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
        });
    },
    { scope: root }
  );

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pre-inner">
        <div className="pre-top">
          <span className="pre-label">
            <span>{site.role}</span>
          </span>
          <span className="pre-label">
            <span>{site.location}</span>
          </span>
        </div>
        <div className="pre-bottom">
          <div className="pre-count" ref={count}>
            000
          </div>
          <div className="pre-bar" />
        </div>
      </div>
    </div>
  );
}
