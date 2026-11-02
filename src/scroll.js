import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenis = null;

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Smooth scrolling, connected to GSAP's ScrollTrigger.
export function initScroll() {
  if (lenis || reduced()) return lenis;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function scrollToTarget(target) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4 });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
