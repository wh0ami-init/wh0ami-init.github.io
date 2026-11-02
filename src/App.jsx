import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { initScroll, startScroll, stopScroll } from "./scroll";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Process from "./components/Process";
import Contact from "./components/Contact";

export default function App() {
  const main = useRef(null);
  const [ready, setReady] = useState(false);

  // Smooth scroll starts locked while the preloader plays.
  useEffect(() => {
    initScroll();
    stopScroll();
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (ready) startScroll();
  }, [ready]);

  // Re-measure after fonts and images load, so pinned sections are exact.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  // Shared scroll reveals: any [data-reveal] title and any [data-fade] block.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray("[data-reveal]").forEach((el) => {
          gsap.from(el.querySelectorAll(".line > span"), {
            yPercent: 115,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
        gsap.utils.toArray("[data-fade]").forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: main }
  );

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Nav />
      <main ref={main}>
        <Hero ready={ready} />
        <About />
        <Services />
        <Projects />
        <Process />
        <Contact />
      </main>
    </>
  );
}
