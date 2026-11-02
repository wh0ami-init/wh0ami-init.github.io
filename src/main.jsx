import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "lenis/dist/lenis.css";
import "./styles.css";
import App from "./App.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

createRoot(document.getElementById("root")).render(<App />);
