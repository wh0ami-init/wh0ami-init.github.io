import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "../data";
import { scrollToTarget } from "../scroll";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const root = useRef(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Reading progress bar at the top.
        gsap.to(".progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
        });

        // Hide the bar when scrolling down, show it when scrolling up.
        let hidden = false;
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const shouldHide = self.direction === 1 && self.scroll() > 240;
            if (shouldHide !== hidden) {
              hidden = shouldHide;
              gsap.to(".nav-bar", {
                yPercent: hidden ? -110 : 0,
                duration: 0.45,
                ease: "power3.out",
              });
            }
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <header className="nav" ref={root}>
      <div className="progress" />
      <div className="nav-bar">
        <a href="#top" className="logo" onClick={(e) => go(e, "#top")}>
          <span className="logo-mark">{site.initials}</span>
          <span className="logo-text">{site.name}</span>
        </a>

        <nav className="nav-links" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="nav-cta"
          onClick={(e) => go(e, "#contact")}
        >
          Let's talk
        </a>

        <button
          className={"menu-btn" + (open ? " is-open" : "")}
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={"menu" + (open ? " is-open" : "")}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
