import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// A soft ring that follows the mouse (desktop only).
export default function Cursor() {
  const ring = useRef(null);

  useGSAP(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const el = ring.current;
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    const move = (e) => {
      gsap.to(el, { opacity: 1, duration: 0.3, overwrite: "auto" });
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e) => {
      const hit = e.target.closest("a, button, input, textarea, [data-cursor]");
      el.classList.toggle("is-active", !!hit);
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return <div className="cursor-ring" ref={ring} aria-hidden="true" />;
}
