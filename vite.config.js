import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages serves project sites from a repository subpath.
  base: process.env.VITE_BASE_PATH
    ? `${process.env.VITE_BASE_PATH.replace(/\/$/, "")}/`
    : "/",
  plugins: [react()],
});
