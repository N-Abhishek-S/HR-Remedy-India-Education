import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/HR-Remedy-India-Education/",
  
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react-router-dom")) return "router";
          if (id.includes("react") || id.includes("react-dom")) return "react";
          if (
            id.includes("gsap") ||
            id.includes("framer-motion") ||
            id.includes("lenis")
          )
            return "animation";
          if (id.includes("@supabase/supabase-js")) return "supabase";
          if (
            id.includes("three") ||
            id.includes("@react-three/fiber") ||
            id.includes("@react-three/drei")
          )
            return "three";
          if (id.includes("swiper")) return "sliders";
        },
      },
    },
  },
});