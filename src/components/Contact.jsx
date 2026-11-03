import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { site } from "../data";
import { scrollToTarget } from "../scroll";
import Magnetic from "./Magnetic";

export default function Contact() {
  const root = useRef(null);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".contact-form > *", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".contact-form", start: "top 85%" },
        });
        // Footer text slides in from the side.
        gsap.from(".big-word", {
          xPercent: -12,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".footer",
            start: "top bottom",
            end: "top 55%",
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  // No backend needed: the form opens WhatsApp or your email app with the message ready.
  const text = encodeURIComponent(
    `Hi ${site.name}, I'm ${name || "…"}. ${msg}`.trim()
  );
  const wa = `https://wa.me/${site.whatsapp}?text=${text}`;
  const mail = `mailto:${site.email}?subject=${encodeURIComponent(
    "Website project"
  )}&body=${text}`;

  return (
    <section className="section contact" id="contact" ref={root}>
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow" data-fade>
            <b className="dot on" /> Contact
          </p>
          <h2 className="sec-title big" data-reveal>
            <span className="line">
              <span>Let's build</span>
            </span>
            <span className="line">
              <span>
                something <em>great.</em>
              </span>
            </span>
          </h2>
          <ul className="contact-list" data-fade>
            <li>
              <span>Email</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <span>WhatsApp</span>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                +{site.whatsapp}
              </a>
            </li>
            <li>
              <span>Location</span>
              <b>{site.location}</b>
            </li>
          </ul>
        </div>

        <div className="contact-form">
          <label>
            <span>Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </label>
          <label>
            <span>Tell me about your project</span>
            <textarea
              rows="4"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="I have a homestay in Gangtok and I want a website…"
            />
          </label>
          <div className="form-actions">
            <Magnetic>
              <a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer">
                Send on WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href={mail}>
                Send email
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="big-word" aria-hidden="true">
          {site.location.split(",")[0]}
        </div>
        <div className="wrap footer-row">
          <span>
            © {new Date().getFullYear()} {site.name}. Made in {site.location}.
          </span>
          <span className="footer-links">
            {site.github && <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>}
            {site.linkedin && <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            {site.instagram && <a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#top");
              }}
            >
              Back to top ↑
            </a>
          </span>
        </div>
      </footer>
    </section>
  );
}
